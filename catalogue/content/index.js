'use strict';
// Offline content handoff. No production imports this module.
const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process'),vm=require('node:vm');
const K=require('../traits/importer/knowledge'),S=require('../traits/importer/store'),N=require('../novelty'),I=require('../traits/importer'),F=require('../../power-level/scheduling/fresh'),V=require('../../power-level/versioning'),C=require('../../power-level/core'),P=require('../public-data');
const hash=require('../verification/model').hash,repo=path.resolve(__dirname,'../..'),defs=require('../traits/data/definitions.json');
function date(s){F.plus(s,0);return s;}
function csv(text){
 text=text.replace(/^\uFEFF/,'');const rows=[];let row=[],cell='',quote=false,closed=false;
 for(let i=0;i<text.length;i++){const c=text[i];if(quote){if(c==='"'&&text[i+1]==='"'){cell+='"';i++;}else if(c==='"'){quote=false;closed=true;}else cell+=c;}
 else if(c==='"'){if(cell||closed)throw Error('Malformed CSV quoting');quote=true;}
 else if(c===','||c==='\n'||c==='\r'){row.push(cell);cell='';closed=false;if(c!==','){if(c==='\r'&&text[i+1]==='\n')i++;if(row.some(v=>v!==''))rows.push(row);row=[];}}
 else{if(closed)throw Error('Unexpected text after CSV quote');cell+=c;}}
 if(quote)throw Error('Unterminated CSV quote');if(cell||row.length){row.push(cell);rows.push(row);}const headers=rows.shift();if(!headers||new Set(headers.map(h=>h.trim())).size!==headers.length)throw Error('Unique CSV headers required');
 return rows.map(r=>{if(r.length!==headers.length)throw Error('CSV column mismatch');return Object.fromEntries(headers.map((h,i)=>[h.trim(),r[i]]));});
}
function json(s,fallback){return s?JSON.parse(s):fallback;}
function fromCSV(text,mode,questionMap={}){const groups=new Map();for(let r of csv(text)){
 const documentary=!!r.canonical_answer,entry=questionMap[r.question_number]||{};
 r={...r,question_id:r.question_id||entry.id,question:r.question||r.question_text,kind:r.kind||entry.kind,answer:r.answer||r.canonical_answer,rarity:r.rarity??r.rarity_value,character_id:r.character_id||r.existing_database_id,anime_title:r.anime_title||(documentary?r.anime:undefined),anime:documentary?(entry.anime||'mixed'):r.anime,knowledge:r.knowledge||(entry.knowledge?JSON.stringify(entry.knowledge):undefined),evidence:r.evidence||(r.source_url?JSON.stringify([{url:r.source_url,note:r.eligibility_reason||'',submittedStatus:r.verification_status||'pending',independentlyVerified:false}]):undefined)};
 if(!r.question_id||!r.question||!['char','title'].includes(r.kind)||!r.answer||r.rarity===''||r.rarity===undefined)throw Error('CSV requires question_id, question, kind, answer, rarity');
 const q={id:r.question_id,text:r.question,anime:r.anime||'mixed',category:r.category||'Daily content',note:r.note||'',...(mode==='descent'?{descent:r.kind}:{wide:r.kind}),...(r.concept_id?{conceptId:r.concept_id}:{}),knowledge:json(r.knowledge,null),answers:[]};
 if(!groups.has(q.id))groups.set(q.id,q);const old=groups.get(q.id);if(hash({...old,answers:[]})!==hash(q))throw Error('Inconsistent CSV question metadata');
 old.answers.push({name:r.answer,rarity:Number(r.rarity),aliases:json(r.aliases,[]),...(r.character_id?{characterId:r.character_id}:{}),...(r.anime_id?{animeId:r.anime_id}:{}),...(r.anime_title?{animeTitle:r.anime_title}:{}),...(r.clever==='true'?{clever:true}:{}),evidence:json(r.evidence,[]),context:json(r.context,null)});
 }return [...groups.values()];}
function trustedBank(ref='HEAD'){
 // Only an explicitly selected tracked repository bank is executable, never a submitted JS file.
 const commit=cp.execFileSync('git',['rev-parse','--verify',ref+'^{commit}'],{cwd:repo,encoding:'utf8'}).trim();
 const text=cp.execFileSync('git',['show',commit+':power-level/questions.js'],{cwd:repo,encoding:'utf8',maxBuffer:32*1024*1024});
 const sandbox=Object.create(null);sandbox.module={exports:null};vm.runInNewContext(text,sandbox,{timeout:5000,contextCodeGeneration:{strings:false,wasm:false}});
 return {bank:JSON.parse(JSON.stringify(sandbox.module.exports)),revision:commit,sourceHash:hash(text)};
}
function release(directory){
 directory=fs.realpathSync(directory);const manifest=JSON.parse(fs.readFileSync(path.join(directory,'manifest.json'),'utf8')),bank=fs.readFileSync(path.join(directory,'bank.json'));
 const sha=b=>require('node:crypto').createHash('sha256').update(b).digest('hex');if(manifest.files?.['bank.json']!==sha(bank)||path.basename(directory)!==sha(JSON.stringify(manifest)))throw Error('Immutable bank checksum/version mismatch');
 // Read bank data only: do not execute source code supplied with external releases.
 return {bank:JSON.parse(bank),bankVersion:path.basename(directory),sourceHash:sha(bank)};
}
function mapping(q){
 if(q.knowledge){const k=structuredClone(q.knowledge);if(!Array.isArray(k.all)||!k.all.length||!['character','anime'].includes(k.entity))throw Error('Invalid explicit knowledge mapping');
 if(k.entity==='character')for(const x of k.all){const d=defs.find(d=>d.id===x.trait);if(!d||typeof x.value!==d.valueType||d.allowedValues.length&&!d.allowedValues.includes(x.value))throw Error('Unknown trait/value mapping');}
 else for(const x of k.all)if(!['genres','themes','studios','year','type','episodes','source'].includes(x.field))throw Error('Unknown anime metadata field');return {...k,basis:'explicit_editorial_proposal'};}
 // Exact, deliberately narrow templates. Complex/exclusion/OR prompts require an explicit mapping.
 const t=q.text.replace(/\.$/,'').toLowerCase();let m;
 const exact={
 'name any anime character who uses a sword':['equipment.weapon','sword'],
 'name any cat character':['identity.species','cat'],
 'name any chef or cook':['occupation.role','chef'],
 'name any assassin':['occupation.role','assassin'],
 'name any demon character from an anime':['identity.species','demon'],
 'name any anime character who has horns':['appearance.ear_or_horn_feature','horns'],
 'name any anime character who uses water-based abilities':['ability.element','water'],
 'name any anime character who uses fire-based abilities':['ability.element','fire']};
 if(exact[t])return {entity:'character',all:[{trait:exact[t][0],value:exact[t][1]}],basis:'exact_template'};
 if(t==='name any anime animated by madhouse')return {entity:'anime',all:[{field:'studios',value:'Madhouse'}],basis:'exact_template'};
 if(t==='name any anime first released in the 1980s')return {entity:'anime',all:[{field:'year',operator:'range',min:1980,max:1989}],basis:'exact_template'};
 if((m=/^name (?:any |an? )?(?:anime )?character with (red|white|silver|blonde|black|blue|pink|green|brown|orange|purple|gray) hair$/.exec(t)))return {entity:'character',all:[{trait:'appearance.hair_color',value:m[1]}],basis:'exact_template'};
 if((m=/^name (?:any |an? )?anime (assassin|chef|ninja|pirate|swordsman|detective|cat)$/.exec(t)))return {entity:'character',all:[{trait:m[1]==='cat'?'identity.species':'occupation.role',value:m[1]==='detective'?'investigator':m[1]}],basis:'exact_template'};
 if((m=/^name (?:any |an? )?anime character (?:who wears|with) (?:a )?(mask|glasses|eyepatch|hat)$/.exec(t)))return {entity:'character',all:[{trait:m[1]==='glasses'?'appearance.eyewear':'appearance.accessory',value:m[1]}],basis:'exact_template'};
 return {entity:(q.descent||q.wide)==='title'?'anime':'character',all:[],basis:'unmapped_requires_review'};
}
function packet({bank,mode,challengeDate,sourceHash,revision=null,bankVersion=null,evidence={}}){
 if(!['ascent','descent'].includes(mode))throw Error('Choose ascent or descent');date(challengeDate);V.validateBank(bank,C);
 const questions=bank.map(q=>{if(mode==='descent'?!q.descent:!!q.descent)throw Error('Mixed game mode in packet');const map=mapping(q),kind=q.descent||q.wide||'char';if(map.entity!==(kind==='title'?'anime':'character'))throw Error('Character/title mapping mismatch');
 return {question:structuredClone(q),concept:F.conceptOf({...q,wide:kind}),mapping:map,answers:q.answers.map(a=>({...structuredClone(a),evidence:[...(a.evidence||[]),...(evidence[q.id]?.[a.name]||[])]}))};});
 const body={format:'anime-daily-enrichment-v1',mode,challengeDate,sourceHash,revision,bankVersion,questions,usage:'proposed',publicationAuthorized:false};return {...body,id:hash(body)};
}
function validatePacket(p){
 const {id,...body}=p;if(p.format!=='anime-daily-enrichment-v1'||id!==hash(body)||p.usage!=='proposed'||p.publicationAuthorized!==false)throw Error('Invalid or changed enrichment packet');
 const rebuilt=packet({bank:p.questions.map(x=>x.question),mode:p.mode,challengeDate:p.challengeDate,sourceHash:p.sourceHash,revision:p.revision,bankVersion:p.bankVersion});
 for(let i=0;i<rebuilt.questions.length;i++){const q=rebuilt.questions[i],r=p.questions[i];if(q.concept!==r.concept||hash(q.mapping)!==hash(r.mapping)||q.answers.length!==r.answers.length)throw Error('Packet question metadata mismatch');
 for(let j=0;j<q.answers.length;j++){const strip=a=>{const b={...a};delete b.evidence;return b;};if(hash(strip(q.answers[j]))!==hash(strip(r.answers[j]))||!Array.isArray(r.answers[j].evidence))throw Error('Packet answer mismatch');}}
 return p;
}
function catalogueView(identities){const anime=new Map(),appearances=[],characters=identities.map(c=>({...c,aliases:c.aliases||[]}));
 for(const c of characters)for(const a of c.appearances||[]){const id=a.externalTitleId?(String(a.externalTitleId).includes('-')?String(a.externalTitleId):'acdb-anime-'+a.externalTitleId):a.wikidataId?'wikidata-anime-'+a.wikidataId:null;if(id&&a.media==='anime'){anime.set(id,{id,name:a.title,aliases:[]});appearances.push({characterId:c.id,animeId:id});}}
 for(const c of characters)for(const a of c.canonicalAppearances||[]){if(!appearances.some(x=>x.characterId===c.id&&x.animeId===a.animeId))appearances.push({characterId:c.id,animeId:a.animeId});if(!anime.has(a.animeId))anime.set(a.animeId,{id:a.animeId,name:a.animeId,aliases:[]});}
 return {characters,anime:[...anime.values()],appearances};}
function existingDatabase(file){file=S.privateFile(file);if(!fs.existsSync(file)||!fs.statSync(file).isFile())throw Error('Existing private knowledge database required; bootstrap it first');return file;}
function resolver(file,extra=[]){file=existingDatabase(file);const all=new Map(K.store('identities',file).map(c=>[c.id,c]));for(const c of extra)if(c&&!all.has(c.id))all.set(c.id,c);const identities=[...all.values()],catalogue=catalogueView(identities),deps={catalogue,characters:new Map(identities.map(c=>[c.id,c])),appearances:new Set(catalogue.appearances.map(a=>a.characterId+'/'+a.animeId))},idx=I.identityIndex(deps),bindings=K.store('bindings',file);
 return p=>p.questions.map(q=>({...q,answers:q.answers.map(a=>{if(q.mapping.entity==='anime')return {...a,resolution:{reason:'Title metadata uses existing anime metadata schema; never character traits'}};
 const canonical=a.characterId&&(bindings[a.characterId]||a.characterId);const r=I.resolve({name:a.name,canonicalId:canonical,animeId:a.animeId,animeName:a.animeTitle},deps,idx);
 return {...a,resolution:r};})}));}
function reconcile(p,file){return resolver(file)(p);}
function python(command,file,input){file=S.privateFile(file);const r=cp.spawnSync(process.env.ASCENT_PYTHON||(process.platform==='win32'?'python':'python3'),['-B',path.join(__dirname,'store.py'),command,file],{input:JSON.stringify(input),encoding:'utf8',env:{...process.env,PYTHONIOENCODING:'utf-8:strict'},maxBuffer:128*1024*1024});if(r.error)throw r.error;if(r.status)throw Error(r.stderr.trim()||'Daily enrichment failed');return JSON.parse(r.stdout);}
function apply(p,{database,output,sources=[],catalogue,legacy,dryRun=false,failAt,publicDirectory,metadata={}}){
 validatePacket(p);database=existingDatabase(database);output=S.privateFile(path.join(output,'receipt.json'));const directory=path.dirname(output);fs.mkdirSync(directory,{recursive:true,mode:0o700});S.snapshot(path.join(directory,'packet.json'),p);
 // Source imports go through established adapters; evidence URLs and CSV labels alone confer no trust.
 const dailyIdentities=sources.some(s=>s.provider==='jvmg')?[...new Set(reconcile(p,database).flatMap(q=>q.answers.flatMap(a=>[a.resolution.characterId,...(/^(acdb|animeclick|vndb)-character-\d+$/.test(a.characterId||'')?[a.characterId]:[])]).filter(Boolean)))]:[];
 const prepared=[];if(sources.length){if(sources.some(source=>source.provider!=='jvmg'))catalogue||=require('../team-data').read('catalogue.json');for(const src of sources){if(!['acdb','acdb-profile','wikidata','jvmg'].includes(src.provider))throw Error('Unsupported source policy');const input=S.privateFile(src.input),out=path.join(directory,'source-'+hash(src)+'.ndjson');K.prepare({...src,input,dailyIdentities,manifest:typeof src.manifest==='string'?JSON.parse(fs.readFileSync(S.privateFile(src.manifest),'utf8')):src.manifest,catalogue,legacy,file:database,output:out});prepared.push(out);}}
 const extra=prepared.flatMap(f=>fs.readFileSync(f,'utf8').trim().split('\n').slice(1).map(line=>JSON.parse(line)).filter(r=>!r.hold&&r.identity).map(r=>r.identity));
 require('../metadata').validateAll(metadata);const resolved=resolver(database,extra)(p),target=publicDirectory?S.privateFile(path.join(publicDirectory,'manifest.json')):path.resolve(__dirname,'../public-data/v1/manifest.json'),result=python(dryRun?'preview':'apply',database,{packet:p,resolved,prepared,metadata,output:directory,publicTarget:path.dirname(target),nodeExecutable:process.execPath,failAt});
 if(!dryRun){const verified=P.read(path.dirname(target));if(legacy){catalogue||=require('../team-data').read('catalogue.json');let review=legacy;for(const source of prepared){const header=JSON.parse(fs.readFileSync(source,'utf8').split('\n',1)[0]);if(header.provider==='jvmg-reviewed-pending')review=require('../jvmg/adapter').reviewPreview({prepared:source,catalogue,state:review}).state;}reviewPreview(directory,result,catalogue,review); }S.snapshot(output,{...result,status:'ENRICHED_NOT_PUBLISHED'});fs.writeFileSync(path.join(directory,'reviewed-bank.NOT-PUBLISHED.json'),JSON.stringify(p.questions.map(q=>q.question),null,2)+'\n',{mode:0o600});return {...result,verifiedCurrentPublicDatasetVersion:verified.manifest.datasetVersion};}return result;
}
function reviewPreview(directory,result,catalogue,legacy){
 const deps=require('../verification/model').index({catalogue,definitions:defs,questions:require('../../power-level/questions'),policy:require('../enrichment/eligibility.json')});
 const claims=JSON.parse(fs.readFileSync(path.join(directory,'pending-review.json'),'utf8')),records=[];
 for(const c of claims){if(!c.traitId||!deps.characters.has(c.characterId)||!c.animeId||!c.submittedEvidence?.some(e=>typeof e.url==='string'&&e.url.startsWith('https://')))continue;
 const ev=c.submittedEvidence.find(e=>e.url?.startsWith('https://'));records.push({externalId:c.claimKey,name:deps.characters.get(c.characterId).name,canonicalId:c.characterId,animeId:c.animeId,facts:[{traitId:c.traitId,value:c.value,context:c.context,url:ev.url,locator:'Daily content submission '+c.questionId,fact:'Unverified submitted answer asserts this trait; linked source requires maintainer examination.',extraction:'editorial_summary'}]});}
 const source={provider:'daily-content',identityNamespace:'daily-content',license:'unresolved',revision:result.packetId,retrievedAt:result.importedAt,originFamily:'daily-content',permission:'unresolved',publicationHold:true,records};
 const planned=I.plan(legacy,source,deps);S.snapshot(path.join(directory,'maintainer-review-preview.json'),planned.state);return planned.summary;
}
function inventory({ref='origin/main',database,output,research=[]}){
 const current=trustedBank(ref),all=new Map();for(const q of current.bank)all.set(hash(q),{question:q,origins:[{type:'tracked_bank',revision:current.revision}]});
 const releases=path.join(repo,'power-level/versioning/releases');for(const dir of fs.readdirSync(releases)){if(!/^[a-f0-9]{64}$/.test(dir))continue;const r=release(path.join(releases,dir));for(const q of r.bank){const key=hash(q);if(all.has(key))all.get(key).origins.push({type:'immutable_release',bankVersion:dir});else all.set(key,{question:q,origins:[{type:'immutable_release',bankVersion:dir}]});}}
 const researchRows=require('./research').rows(research,csv,hash);const questions=[...all.values()],runs=[],groups=new Map(),answerKeys=new Set(),resolve=database?resolver(database):null;for(const mode of ['ascent','descent']){const bank=questions.filter(x=>mode==='descent'?x.question.descent:!x.question.descent).map(x=>x.question); // One packet per revision avoids colliding historical IDs.
 for(let n=0;n<bank.length;n++){const p=packet({bank:[bank[n]],mode,challengeDate:'2026-11-11',sourceHash:hash(bank[n]),revision:current.revision});const resolved=resolve?resolve(p)[0]:p.questions[0],groupKey=hash([mode,resolved.question.id,resolved.concept]);if(!groups.has(groupKey))groups.set(groupKey,{...resolved,answers:[]});
 for(let a of resolved.answers){if(resolve&&researchRows.length&&resolved.mapping.entity==='character')a=require('./research').attach(resolved.question,a,researchRows,resolve,hash);const key=hash([mode,resolved.question.id,resolved.concept,a.characterId||C.normalize(a.name),a.animeId||a.animeTitle||null]);if(!answerKeys.has(key)){answerKeys.add(key);groups.get(groupKey).answers.push(a);}}
 runs.push({id:p.questions[0].question.id,mode,answerCount:p.questions[0].answers.length,mapping:p.questions[0].mapping});}}
 const out={format:'daily-content-history-inventory-v1',revision:current.revision,historyConfidence:'Repository snapshots, not production deployment proof',uniqueQuestionRevisions:questions.length,questionIds:new Set(questions.map(x=>x.question.id)).size,answerRevisions:questions.reduce((n,x)=>n+x.question.answers.length,0),questions,runs,uniqueQuestionAnswerPairs:answerKeys.size,...(database?{dryRun:python('preview',database,{packet:{mode:'historical_inventory',challengeDate:null,sourceHash:current.sourceHash,id:hash(current.revision)},resolved:[...groups.values()]}).summary}:{}),researchRows:researchRows.length,confirmedUsageRecords:0,backfillApplied:false};
 const answers=[...groups.values()].flatMap(g=>g.answers.map(a=>({questionId:g.question.id,name:a.name,resolution:a.resolution||null,identityResearch:a.identityResearch||[]})));out.reconciliation={secureMatches:answers.filter(a=>a.resolution?.characterId).length,ambiguousMatches:answers.filter(a=>a.resolution?.classification==='ambiguous_identity').length,unresolvedOccurrences:answers.filter(a=>!a.resolution?.characterId).length,genuineNewIdentitiesConfirmed:0,answers};
 if(output)S.snapshot(output,out);return out;
}
module.exports={resolver,csv,fromCSV,trustedBank,release,mapping,packet,validatePacket,reconcile,apply,inventory,python,hash};

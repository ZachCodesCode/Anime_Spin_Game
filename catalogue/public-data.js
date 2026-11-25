'use strict';
// Offline adapter around the existing indexed store, generator and scheduler.
const fs=require('node:fs'),path=require('node:path'),zlib=require('node:zlib'),crypto=require('node:crypto');
const K=require('./traits/importer/knowledge'),S=require('./traits/importer/store'),F=require('../power-level/scheduling/fresh'),C=require('../power-level/core');
const root=path.join(__dirname,'public-data/v1'),hash=b=>crypto.createHash('sha256').update(b).digest('hex');
function read(directory=root){
 directory=fs.realpathSync(directory);const manifest=JSON.parse(fs.readFileSync(path.join(directory,'manifest.json'),'utf8'));
 if(manifest.format!=='anime-ascent-public-knowledge-v1'||manifest.schemaVersion!==1||manifest.databaseLicense!=='ODbL-1.0')throw Error('Unsupported public manifest');
 const policy=require('./public-policy.json');const canon=x=>JSON.stringify(x&&typeof x==='object'&&!Array.isArray(x)?Object.fromEntries(Object.keys(x).sort().map(k=>[k,JSON.parse(canon(x[k]))])):Array.isArray(x)?x.map(v=>JSON.parse(canon(v))):x);
 if(manifest.policySHA256!==hash(Buffer.from(canon(policy))))throw Error('Public policy checksum mismatch');
 const unsigned={...manifest};delete unsigned.datasetVersion;if(hash(Buffer.from(canon(unsigned)))!==manifest.datasetVersion)throw Error('Public manifest version mismatch');
 const definitions=new Map(require('./traits/data/definitions.json').map(d=>[d.id,d]));
 if(fs.readdirSync(directory).some(n=>n!=='manifest.json'&&!Object.hasOwn(manifest.files,n)))throw Error('Unexpected file in public dataset directory');
 const records=[],ids=new Set(),triples=new Set();let assertions=0;
 for(const [name,entry] of Object.entries(manifest.files)){
  if(!/^characters-[0-9a-f]{2}\.jsonl\.gz$/.test(name)||entry.bytes>8*1024*1024)throw Error('Invalid public partition path/size');
  const file=path.join(directory,name);if(fs.lstatSync(file).isSymbolicLink())throw Error('Public partition symlink refused');const bytes=fs.readFileSync(file);
  if(hash(bytes)!==entry.sha256||bytes.length!==entry.bytes)throw Error('Public checksum mismatch: '+name);
  const raw=zlib.gunzipSync(bytes,{maxOutputLength:64*1024*1024});if(hash(raw)!==entry.uncompressedSHA256)throw Error('Public content checksum mismatch');const decoded=new TextDecoder('utf-8',{fatal:true}).decode(raw).trim(),lines=decoded?decoded.split('\n'):[];if(lines.length!==entry.records)throw Error('Public partition count mismatch');
  for(const line of lines){const c=JSON.parse(line);if(!/^(acdb-character-\d+|wikidata-character-Q\d+)$/.test(c.id)||ids.has(c.id)||typeof c.name!=='string'||!Array.isArray(c.aliases)||!Array.isArray(c.facts)||!Array.isArray(c.identitySources))throw Error('Invalid/duplicate public identity');if(c.aliases.some(a=>typeof a!=='string'||!a.length)||new Set(c.aliases).size!==c.aliases.length)throw Error('Invalid/duplicate public aliases');ids.add(c.id);
   const allowed=['id','name','aliases','appearances','canonicalAppearances','providerIds','sourceProvider','canonicalId','identityStatus','facts','identitySources','formLinks','independentlyVerified','publicationAuthorized','ambiguousCanonicalName'];if(Object.keys(c).some(k=>!allowed.includes(k))||c.independentlyVerified!==false||c.publicationAuthorized!==false||c.canonicalId!==null||c.canonicalAppearances.length)throw Error('Restricted/approved identity content refused');
   for(const a of c.appearances){if(Object.keys(a).some(k=>!['id','name','sourceProvider','sourceId','media'].includes(k))||a.media!=='anime'||!policy.sources[a.sourceProvider]||typeof a.name!=='string')throw Error('Restricted anime assignment');}
   const providers=new Set();for(const source of c.identitySources){const rule=policy.sources[source.sourceProvider];if(Object.keys(source).some(k=>!['providerId','sourceProvider','sourceId','revision','license','acquisition','url','externalIds'].includes(k))||!rule||source.acquisition!==rule.acquisition||source.license!==rule.license||!c.providerIds.includes(source.providerId)||providers.has(source.providerId))throw Error('Restricted identity source');providers.add(source.providerId);}
   if(providers.size!==c.providerIds.length)throw Error('Missing identity source');
   const facts=new Set(),groupKeys=new Set();for(const group of c.facts){
    if(Object.keys(group).some(k=>!['characterId','traitId','value','sourceEvidence','independentlyVerified','publicationAuthorized'].includes(k))||group.characterId!==c.id||group.independentlyVerified!==false||group.publicationAuthorized!==false||!Array.isArray(group.sourceEvidence)||!group.sourceEvidence.length)throw Error('Invalid public trait group');
    const groupKey=JSON.stringify([c.id,group.traitId,group.value]);if(groupKeys.has(groupKey))throw Error('Duplicate public trait triple');groupKeys.add(groupKey);
    for(const f of group.sourceEvidence){if(f.traitId!==group.traitId||JSON.stringify(f.value)!==JSON.stringify(group.value))throw Error('Trait evidence mismatch');const source=policy.sources[f.sourceProvider];if(!source||f.characterId!==c.id||f.license!==source.license||f.acquisition!==source.acquisition||!c.providerIds.includes(f.providerId)||f.independentlyVerified!==false||f.publicationAuthorized!==false||f.hold!==null)throw Error('Restricted fact source/identity');
    const keys=['traitId','value','characterId','providerId','sourceProvider','sourceType','acquisition','license','url','locator','context','trustStatus','hold','independentlyVerified','publicationAuthorized','rawField','rawValue','rawLabel','property','statementId','entityRevision','valueId','relationship','normalizationBasis'];if(Object.keys(f).some(k=>!keys.includes(k)))throw Error('Unexpected public fact field');
    if(f.sourceProvider==='ACDB'&&!['hair_color','eye_color','hair_length','age','sex','mimikko','clothing','role'].includes(f.rawField))throw Error('Non-dump ACDB fact refused');
    const def=definitions.get(f.traitId);if(!def||typeof f.value!==def.valueType||def.allowedValues.length&&!def.allowedValues.includes(f.value))throw Error('Unknown public trait/value');
    if(f.sourceProvider==='Wikidata'&&(f.sourceType!=='wikidata_statement'||!f.statementId?.toUpperCase().startsWith(f.providerId.replace('wikidata-character-','').toUpperCase()+'$')))throw Error('Missing Wikidata statement');
    if(Object.keys(f.context).some(k=>!['animeId','form','persistence','scope','temporal'].includes(k))||f.context.animeId!==null)throw Error('Private/inferred context refused');
    if(f.relationship&&Object.keys(f.relationship).some(k=>!['type','targetId','targetQid'].includes(k)))throw Error('Restricted relationship');
    if(f.normalizationBasis&&Object.keys(f.normalizationBasis).some(k=>!['property','statementId','valueId','entityId','entityRevision','url','rank'].includes(k)))throw Error('Restricted normalization evidence');
    const key=JSON.stringify(f);if(facts.has(key))throw Error('Duplicate public assertion');facts.add(key);triples.add(JSON.stringify([c.id,f.traitId,f.value]));assertions++;
   }}records.push(c);
  }
 }
 for(const c of records)for(const f of c.facts.flatMap(g=>g.sourceEvidence))if(f.relationship&&(!ids.has(f.relationship.targetId)||f.value!==f.relationship.type+'|'+f.relationship.targetId))throw Error('Dangling public relationship');
 if(records.length!==manifest.characterCount||triples.size!==manifest.uniqueTraitTriples||assertions!==manifest.positiveAssertions)throw Error('Public manifest totals mismatch');
 return {manifest,records,directory};
}
function view(data){
 const anime=new Map(),appearances=[];for(const c of data.records)for(const a of c.appearances){anime.set(a.id,{id:a.id,name:a.name,aliases:[]});appearances.push({characterId:c.id,animeId:a.id,role:'Unknown'});}
 return {characters:data.records.map(({id,name,aliases})=>({id,name,aliases})),anime:[...anime.values()],appearances};
}
function bootstrap(data,directory){
 const file=S.privateFile(path.join(directory,'knowledge.sqlite')),prepared=S.privateFile(path.join(directory,'public-prepared.ndjson'));
 if(fs.existsSync(file)||fs.existsSync(prepared))throw Error('Use a new private index directory; never overwrite existing knowledge');fs.mkdirSync(path.dirname(file),{recursive:true,mode:0o700});
 const rows=[];for(const c of data.records){const {facts,identitySources,formLinks,ambiguousCanonicalName,...identity}=c;const converted={...identity,appearances:c.appearances.map(a=>({title:a.name,media:'anime',externalTitleId:a.id})),canonicalAppearances:[]};
  for(const s of identitySources){const factsForSource=facts.flatMap(g=>g.sourceEvidence).filter(f=>f.providerId===s.providerId);rows.push({providerId:s.providerId,identity:converted,sourceIdentity:{id:s.sourceId,name:c.name},sourceRevision:s.revision,license:s.license,acquisition:s.acquisition,hold:null,facts:factsForSource,profile:{},publicationAuthorized:false});}
 }
 const header={format:'anime-ascent-prepared-knowledge-v1',provider:'public-license-scoped-export',total:rows.length,datasetVersion:data.manifest.datasetVersion,policyId:data.manifest.policyId};header.hash=hash(Buffer.from(JSON.stringify(header)));
 const fd=fs.openSync(prepared,'wx',0o600);try{fs.writeSync(fd,JSON.stringify(header)+'\n');for(const r of rows)fs.writeSync(fd,JSON.stringify(r)+'\n');}finally{fs.closeSync(fd);}
 K.store('ingest',file,[prepared,500]);const checked=K.store('validate',file);fs.writeFileSync(path.join(path.dirname(file),'public-index.json'),JSON.stringify({datasetVersion:data.manifest.datasetVersion}),{flag:'wx',mode:0o600});
 return {database:file,datasetVersion:data.manifest.datasetVersion,integrity:checked.sqliteIntegrity,publicationAuthorized:false};
}
function checkIndex(data,file){const info=JSON.parse(fs.readFileSync(path.join(path.dirname(file),'public-index.json'),'utf8'));if(info.datasetVersion!==data.manifest.datasetVersion)throw Error('Index belongs to another public version; bootstrap a new directory');}
function generate(data,file,spec,limitBreakCharacterId){
 checkIndex(data,file);const draft=K.generate({file,spec,catalogue:view(data),metadata:{},limitBreakCharacterId});
 const known=new Set(data.records.filter(c=>c.appearances.length).map(c=>c.id)),unknown=draft.candidates.filter(c=>!known.has(c.characterId));
 draft.candidates=draft.candidates.filter(c=>known.has(c.characterId));draft.question.answers=draft.question.answers.filter(a=>draft.candidates.some(c=>c.name===a.name));draft.held.push(...unknown.map(c=>({characterId:c.characterId,reason:'No redistributable anime-assignment evidence'})));
 if(limitBreakCharacterId&&!draft.candidates.some(c=>c.characterId===limitBreakCharacterId))throw Error('Limit Break lacks public anime-assignment eligibility');
 const bank=require('../power-level/questions');draft.conceptAudit={concept:F.conceptOf(draft.question),existingQuestionIds:bank.filter(q=>F.conceptOf(q)===F.conceptOf(draft.question)).map(q=>q.id),note:'Answer research only. Use existing scheduler with actual reviewed inventory/history for duplicate concepts and 14-day cooldown; no dates assigned.'};return draft;
}
function plan(input){return F.plan(input);}
function main(args=process.argv.slice(2)){
 const command=args.shift(),o={};for(let i=0;i<args.length;i+=2){if(!['--dataset','--name','--id','--query','--database','--directory','--input','--limit','--offset','--limit-break-character'].includes(args[i])||args[i+1]===undefined)throw Error('Unknown/missing public-data option');o[args[i].slice(2)]=args[i+1];}
 if(command==='export'){
  if(!o.database)throw Error('Export requires --database pointing to the existing private SQLite store');
  const r=require('node:child_process').spawnSync(process.env.ASCENT_PYTHON||(process.platform==='win32'?'python':'python3'),['-B',path.join(__dirname,'team-export.py'),'public',o.database,root],{encoding:'utf8',env:{...process.env,PYTHONIOENCODING:'utf-8:strict'},stdio:['ignore','pipe','inherit'],maxBuffer:4*1024*1024});if(r.error)throw r.error;if(r.status)throw Error('Public export failed; inspect stderr before committing');return JSON.parse(r.stdout);
 }
 if(command==='plan')return plan(JSON.parse(fs.readFileSync(o.input,'utf8')));
 const data=read(o.dataset||root);
 if(command==='validate'||command==='stats')return data.manifest;
 if(command==='bootstrap')return bootstrap(data,o.directory||path.join(__dirname,'private/public-v1'));
 if(command==='generate')return generate(data,o.database,JSON.parse(fs.readFileSync(o.query,'utf8')),o['limit-break-character']);
 if(command==='search'&&o.query){checkIndex(data,o.database);return K.store('search',o.database,[],JSON.parse(fs.readFileSync(o.query,'utf8')));}
 let rows=data.records;if(command==='search'){const needle=String(o.name||'').normalize('NFKC').toLowerCase();if(!needle)throw Error('Supply --name or --query');rows=rows.filter(c=>[c.name,...c.aliases].some(n=>n.normalize('NFKC').toLowerCase().includes(needle)));}
 else if(command==='profile'){rows=rows.filter(c=>c.id===o.id);}else if(command!=='list')throw Error('Commands: validate, stats, list, search, profile, bootstrap, generate, plan');
 const limit=Number(o.limit||20),offset=Number(o.offset||0);if(!Number.isSafeInteger(limit)||limit<1||limit>1000||!Number.isSafeInteger(offset)||offset<0)throw Error('Invalid pagination');return {total:rows.length,offset,results:rows.slice(offset,offset+limit).map(c=>command==='profile'?c:{id:c.id,name:c.name,aliases:c.aliases,traits:c.facts.length,anime:c.appearances})};
}
if(require.main===module){try{console.log(JSON.stringify(main(),null,2));}catch(e){console.error(e.message);process.exitCode=1;}}
module.exports={read,view,bootstrap,generate,plan,main};

'use strict';
// Indexed storage adapter for the existing private catalogue/importer. Never used by gameplay.
const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process'),crypto=require('node:crypto'),A=require('./adapters'),I=require('./index'),P=require('./profiles'),V=require('../../verification/model'),N=require('../../novelty'),C=require('../../../power-level/core'),G=require('../../generator'),S=require('./store');
const policy=require('./trust-policy.json'),defs=require('../data/definitions.json');
function store(command,file,args=[],input){file=S.privateFile(file);const r=cp.spawnSync(process.env.ASCENT_PYTHON||(process.platform==='win32'?'python':'python3'),['-B',path.join(__dirname,'knowledge-store.py'),command,file,...args.map(String)],{input:input===undefined?undefined:JSON.stringify(input),encoding:'utf8',maxBuffer:512*1024*1024});if(r.error)throw r.error;if(r.status)throw Error(r.stderr.trim()||'Knowledge storage failed');return JSON.parse(r.stdout);}
const hashFile=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
function descriptionFacts(text,name,url){
 // Narrow labelled fields and exact-subject templates only; no free-form NLP or negation guessing.
 if(typeof text!=='string')return [];
 const labels={Occupation:'occupation.role',Position:'occupation.role',Affiliation:'affiliation.membership',Species:'identity.species',Weapon:'equipment.weapon',Personality:'profile.personality',Goal:'profile.goal'};
 const facts=[];
 for(const line of text.split(/\r?\n/)){
  const m=/^(Occupation|Position|Affiliation|Species|Weapon|Personality|Goal): ([^\n.;]{1,120})\.?$/.exec(line.trim());if(!m)continue;
  let value=m[2].trim(),traitId=labels[m[1]];if(['occupation.role','identity.species'].includes(traitId))value=value.toLowerCase().replaceAll(' ','_');
  facts.push({traitId,value,rawField:'description.'+m[1],rawValue:m[2],sourceType:'profile',descriptionDerived:true,extraction:'structured_field',url,locator:'Explicit labelled description field: '+m[1],fact:'Source explicitly reports '+m[1].toLowerCase()+': '+m[2]+'.',context:{animeId:null,scope:'Explicit description field; period/outfit unknown',persistence:'unknown',form:null}});
 }
 // Exact-subject templates can yield multiple discrete facts without interpreting arbitrary prose.
 const escaped=name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 const emit=(traitId,value,label)=>facts.push({traitId,value,rawField:'description.'+label,rawValue:value,sourceType:'profile',descriptionDerived:true,extraction:'structured_field',url,locator:'Exact-subject '+label+' sentence',fact:name+' explicitly has '+label+': '+value+'.',context:{animeId:null,scope:'Explicit description sentence; period unknown',persistence:'unknown',form:null}});
 for(const sentence of text.trim().split(/\n|(?<=\.)\s+/)){
  const crewRole=new RegExp('^'+escaped+' is the (sniper|doctor|musician|chef) of (?:the )?([^.;]{2,100})\\.$','i').exec(sentence.trim());if(crewRole){emit('occupation.role',crewRole[1].toLowerCase(),'occupation');emit('affiliation.membership',crewRole[2],'affiliation');}
  const role=new RegExp('^'+escaped+' is (?:a|an) (sniper|pirate|doctor|teacher|ninja|samurai|musician)\\.$','i').exec(sentence.trim());if(role)emit('occupation.role',role[1].toLowerCase(),'occupation');
  const service=new RegExp('^'+escaped+' serves as (?:a|an) (sniper|doctor|musician|chef) for (?:the )?([^.;]{2,100})\\.$','i').exec(sentence.trim());if(service){emit('occupation.role',service[1].toLowerCase(),'occupation');emit('affiliation.membership',service[2],'affiliation');}
  const equipment=new RegExp('^'+escaped+' uses (?:a|an) (slingshot|sword|bow|gun|staff|shield)\\.$','i').exec(sentence.trim());if(equipment)emit('equipment.weapon',equipment[1].toLowerCase(),'equipment');
 }

 return facts;
}
function safeName(name){const n=C.normalize(name);return n.length>=2&&!/^(unknown|unnamed|none|n a|boy|girl|man|woman|soldier|villager|extra|mother|father|student|teacher)( \d+)?$/.test(n);}
function prepare({input,provider,mappings,manifest,catalogue,legacy,output,file}){
 if(provider==='wikidata')return require('./wikidata-knowledge').prepare({input,output,catalogue,file,legacy});
 if(!['acdb','acdb-profile'].includes(provider))throw Error('Source trust is configured only for ACDB');
 input=S.privateFile(input);output=S.privateFile(output);const raw=JSON.parse(fs.readFileSync(input)),d=V.index({catalogue,definitions:defs,questions:require('../../../power-level/questions'),policy:require('../../enrichment/eligibility.json')}),idx=I.identityIndex(d),novel=N.index(catalogue),definition=new Map(defs.map(x=>[x.id,x]));
 if(provider==='acdb-profile'&&(raw.sourceProvider&&raw.sourceProvider!=='ACDB'||!policy.allowedAcquisitions.includes(raw.acquisition)))throw Error('Explicit ACDB source and permitted acquisition required');
 const rows=provider==='acdb'?raw.records:raw.profiles;if(!Array.isArray(rows))throw Error('Source record array required');if(provider==='acdb'&&A.acdbMappingHash(JSON.parse(fs.readFileSync(S.privateFile(mappings))))!==raw.mappingHash)throw Error('ACDB mapping hash mismatch');
 const header={format:'anime-ascent-prepared-knowledge-v1',total:rows.length,inputSha256:hashFile(input),catalogueHash:V.hash(catalogue),definitionsHash:V.hash(defs),trustPolicy:policy,normalizerVersion:1,provider,sourceRevision:raw.version||raw.revision,legacyHash:legacy?V.hash(legacy):null,...(manifest?{permissionManifestHash:V.hash(manifest)}:{})};if(!header.sourceRevision)throw Error('Source revision required');header.hash=V.hash(header);
 if(fs.existsSync(output)){const handle=fs.openSync(output,'r'),buf=Buffer.alloc(65536);const read=fs.readSync(handle,buf,0,buf.length,0);fs.closeSync(handle);const existing=JSON.parse(buf.subarray(0,read).toString().split('\n',1)[0]);if(V.hash(existing)!==V.hash(header))throw Error('Use a new prepared output for changed source or policy');return header;}
 const sourceIds=new Map(),duplicates=new Set();for(const row of rows){const id=String(provider==='acdb'?row.acdbId:row.externalId),prior=sourceIds.get(id);if(prior&&V.hash(prior)!==V.hash(row))duplicates.add(id);sourceIds.set(id,row);}
 const rejected=new Set((legacy?.traits?.associations||[]).filter(a=>a.history.at(-1).after.status==='rejected').map(a=>{const c=a.history.at(-1).after.claim;return V.hash([c.characterId,c.traitId,c.value]);}));
 const fd=fs.openSync(output+'.tmp','wx',0o600);try{
 fs.writeSync(fd,JSON.stringify(header)+'\n');
 for(let start=0;start<rows.length;start+=500){const part=rows.slice(start,start+500);let source;
 if(provider==='acdb')source=A.adapt(provider,{...raw,records:part},catalogue,{acdbMappings:JSON.parse(fs.readFileSync(S.privateFile(mappings)))});
 else {
  if(raw.acquisition!=='user-supplied'&&(!manifest?.enabled||!manifest.reviewedBy?.trim()||!manifest.permissionUrl||!Number.isFinite(Date.parse(manifest.reviewedAt))))throw Error('Actual extended-export permission configuration required');
  const preparedRows=[];for(let n=0;n<part.length;n++){try{const one=A.adapt(provider,{...raw,profiles:[part[n]]},catalogue,manifest);source=one;preparedRows.push(one.records[0]);}catch(e){preparedRows.push({externalId:String(part[n]?.externalId||'unresolved-row-'+(start+n)),name:part[n]?.name||'Unresolved source identity',animeNames:[],facts:[],ingestionError:e.message,profileMetadata:{identifiers:{name:part[n]?.name||null},appearances:[],rawHeldRecord:P.redact(part[n])}});}}
  source={provider:'acdb-profile',identityNamespace:'acdb',originFamily:'acdb-community',acquisition:raw.acquisition,license:'ODbL-1.0 + DbCL-1.0',revision:raw.revision,...source,records:preparedRows};
 }
 if(source.identityNamespace!=='acdb'||source.originFamily!=='acdb-community'||!policy.allowedAcquisitions.includes(source.acquisition))throw Error('ACDB provenance required for source trust');
 for(let n=0;n<source.records.length;n++){
  const row=source.records[n],original=part[n],externalId=String(row.externalId),providerId='acdb-character-'+externalId,appearances=row.profileMetadata.appearances||[],anime=appearances.filter(a=>a.media==='anime'),primary=anime.filter(a=>a.primary),target=primary.length===1?primary:anime;
  const resolved=I.resolve({...row,animeNames:target.map(a=>a.title),...(provider==='acdb'?{animeId:undefined}:{})},d,idx);
  let hold=row.ingestionError||(duplicates.has(externalId)?'Within-source provider identity collision':null),identity;
  if(!/^\d+$/.test(externalId)||!safeName(row.name))hold||='Missing or generic source identity';
  if(!anime.length)hold||='No explicit anime assignment';
  if(row.identityWarnings?.some(x=>/form|clone|ambiguous|conflicting/i.test(x)))hold||='Source form or identity ambiguity';
  if(resolved.characterId){const c=d.characters.get(resolved.characterId);identity={id:c.id,canonicalId:c.id,providerIds:[providerId],name:G.names(c,novel).name||c.name,aliases:c.aliases,appearances,canonicalAppearances:catalogue.appearances.filter(a=>a.characterId===c.id),identityStatus:'matched_existing',sourceProvider:'ACDB'};}
  else {
   const possible=anime.flatMap(a=>catalogue.anime.filter(x=>[x.name,...x.aliases].some(t=>C.normalize(t)===C.normalize(a.title))).flatMap(x=>N.resolve({name:row.name},novel,x.id).ids));
   if(possible.length||row.canonicalId||row.malId)hold||='Possible or conflicting canonical identity; reconcile before admission';
   identity={id:providerId,canonicalId:null,providerIds:[providerId],name:row.name,aliases:row.profileMetadata.identifiers.aliases||[],appearances,canonicalAppearances:[],identityStatus:'source_identity',sourceProvider:'ACDB'};
  }
  const text=original?.description||original?.fields?.description||original?.biography||original?.fields?.biography;
  const extracted=descriptionFacts(text,row.name,original?.sourceUrl||row.facts[0]?.url);
  const facts=[...row.facts,...extracted].map(f=>{
   let traitId=f.traitId,value=f.value,reason=f.normalizationHold||null;
   if(f.sourceType==='tag'&&traitId==='source.unmapped_tag'){traitId='source.tag';value=f.rawLabel;reason=null;}
   const def=definition.get(traitId);if(!def||typeof value!==def.valueType||def.allowedValues.length&&!def.allowedValues.includes(value))reason||='Unknown or incompatible source value';
   if(value==null||typeof value==='string'&&/^(unknown|not visible|n\/a|unsorted|unassigned)$/i.test(value))reason||='Missing source value';
   let url;try{url=new URL(f.url);}catch{reason||='Missing source URL';}
   if(url&&(!['animecharactersdatabase.com','www.animecharactersdatabase.com'].includes(url.hostname)||url.protocol!=='https:'||url.searchParams.get('id')!==externalId))reason||='Source URL/provider ID mismatch';
   if(!f.locator||!f.fact)reason||='Missing provenance locator';
   if(f.relationship){const t=f.relationship.target;let match=I.resolve({...t,animeId:t.animeId||resolved.animeId},d,idx);if(!match.characterId&&t.externalId){const other=sourceIds.get(String(t.externalId));const otherTitles=provider==='acdb'?(other?.titles||[]).filter(x=>x.mt==='2').map(x=>x.english):[...(other?.appearances||[]).filter(x=>x.media==='anime').map(x=>x.title),...(other?.primaryAnime?[typeof other.primaryAnime==='string'?other.primaryAnime:other.primaryAnime.media==='anime'?other.primaryAnime.title:null]:[])].filter(Boolean);if(other&&other.name===t.name&&!duplicates.has(String(t.externalId))&&anime.some(a=>otherTitles.some(x=>C.normalize(x)===C.normalize(a.title))))match={characterId:'acdb-character-'+t.externalId};}
    if(match.characterId===identity.id)match={};if(!match.characterId||!f.relationship.type)reason||='Unresolved relationship target';else value=f.relationship.type+'|'+match.characterId;
   }
   if(rejected.has(V.hash([identity.id,traitId,value])))reason||='Existing rejected fact requires reopening';
   const trustStatus=reason?'held':policy.excludeExtractions.includes(f.extraction)?'proposal':'source_trusted';
   return {...f,traitId,value,context:{...f.context,animeId:f.context?.animeId||resolved.animeId||null},category:traitId==='source.tag'?'source_tag':def?.category||'unmapped',sourceTagId:f.sourceType==='tag'?'acdb-tag-'+crypto.createHash('sha256').update(String(f.rawLabel).normalize('NFKC').trim().toLowerCase().replace(/\s+/g,' ')).digest('hex').slice(0,20):null,trustStatus,hold:reason,sourceProvider:'ACDB',acquisition:source.acquisition,license:source.license,publicationRights:'hold-ODbL-DbCL',publicationAuthorized:false,independentlyVerified:false,trustPolicyId:policy.id};
  });
  const exclusive=new Set(['appearance.hair_color','appearance.eye_color','identity.species']),values=new Map();for(const f of facts){if(!exclusive.has(f.traitId))continue;const k=V.hash([f.traitId,f.context]);if(!values.has(k))values.set(k,new Set());values.get(k).add(f.value);}for(const f of facts)if(exclusive.has(f.traitId)&&values.get(V.hash([f.traitId,f.context]))?.size>1){f.hold='Conflicting values in the same source context';f.trustStatus='held';}
  let description=null;if(text){const permit=manifest?.descriptionReuse;if(permit?.allowed===true&&permit.permissionReference?.trim()&&permit.reviewedBy?.trim()&&Number.isFinite(Date.parse(permit.reviewedAt)))description={text,license:permit.license||source.license,permissionReference:permit.permissionReference,reviewedBy:permit.reviewedBy,reviewedAt:permit.reviewedAt};else description={sha256:crypto.createHash('sha256').update(text).digest('hex'),characters:text.length,retained:false};}
  const out={providerId,identity:hold?null:identity,sourceIdentity:{id:providerId,name:row.name},hold,facts,profile:row.profileMetadata,description,presentGroups:provider==='acdb-profile'&&Object.hasOwn(original||{},'tags')?['tags']:[],sourceRevision:source.revision,license:source.license,acquisition:source.acquisition,publicationAuthorized:false};
  fs.writeSync(fd,JSON.stringify(out)+'\n');
 }
 }
 fs.fsyncSync(fd);
 }catch(e){fs.closeSync(fd);fs.unlinkSync(output+'.tmp');throw e;}fs.closeSync(fd);fs.renameSync(output+'.tmp',output);return header;
}
function generate({file,spec,catalogue,metadata,limitBreakCharacterId}){
 const rows=store('search',file,[],spec),byId=new Map(catalogue.characters.map(c=>[c.id,c])),ni=N.index(catalogue),recognition=new Map();for(const q of require('../../../power-level/questions'))for(const a of q.answers){const r=N.resolve({name:a.name},ni);if(r.ids.length===1)recognition.set(r.ids[0],(recognition.get(r.ids[0])||0)+1);}
 const forms=new Map(),add=(name,id)=>{const k=C.normalize(name);if(!forms.has(k))forms.set(k,new Set());forms.get(k).add(id);};for(const identity of store('identities',file))for(const form of [identity.name,...identity.aliases])add(form,identity.id);for(const c of catalogue.characters)for(const form of [c.name,...c.aliases])add(form,c.id);
 const sourceRoles=store('prominence',file),animeByName=new Map();for(const a of catalogue.anime)for(const name of [a.name,...a.aliases]){const key=C.normalize(name);if(!animeByName.has(key))animeByName.set(key,new Set());animeByName.get(key).add(a.id);}
 const candidates=[],held=[],rejections=new Set();const reviewFile=process.env.ASCENT_TRAIT_REVIEW_STATE;if(reviewFile&&fs.existsSync(S.privateFile(reviewFile))){const ledger=JSON.parse(fs.readFileSync(reviewFile));for(const a of ledger.traits.associations){const x=a.history.at(-1).after;if(x.status==='rejected')rejections.add(V.hash([x.claim.characterId,x.claim.traitId,x.claim.value]));}}
 for(const row of rows){if(row.matches.some(f=>rejections.has(V.hash([row.character.id,f.traitId,f.value])))){held.push({characterId:row.character.id,reason:'Existing maintainer rejection requires reopening'});continue;}const c=row.character,id=c.id,name=c.name;if(!safeName(name)||C.normalize(name).length<4||forms.get(C.normalize(name)).size!==1){held.push({characterId:id,name,reason:'Ambiguous/generic/short answer name'});continue;}const aliases=c.aliases.filter(a=>C.normalize(a).length>=4&&forms.get(C.normalize(a))?.size===1&&C.normalize(a)!==C.normalize(name));
  const knownApps=c.appearances.filter(a=>a.media==='anime').flatMap(a=>{const ids=animeByName.get(C.normalize(a.title));return ids?.size===1?[{animeId:[...ids][0],role:'Unknown'}]:[];}),apps=c.canonicalAppearances.length?c.canonicalAppearances:knownApps;let app=apps[0]||{role:'Unknown'};if(app.role==='Unknown'&&['Main Character','Protagonist'].includes(sourceRoles[id]))app={...app,role:'Main'};const meta=app.animeId?metadata[app.animeId.replace('mal-anime-','')]||{popularity:null}:{popularity:null};
  if(spec.genre){const genreApps=new Set(apps.filter(a=>(metadata[a.animeId.replace('mal-anime-','')]?.genres||[]).some(g=>g.name===spec.genre)).map(a=>a.animeId));if(!spec.all.every(condition=>row.matches.some(f=>f.traitId===condition.trait&&(condition.value===undefined||f.value===condition.value)&&genreApps.has(f.context?.animeId))))continue;}
  const rarityContextKnown=!!(app.role==='Main'||recognition.has(id)||meta.popularity!==null);const rarity=G.rarity(byId.get(id)||c,app,meta,recognition);
  candidates.push({characterId:id,name,aliases:[...new Map(aliases.map(a=>[C.normalize(a),a])).values()],rarity,rarityContextKnown,rarityInputs:{role:app.role,acdbStoryRole:sourceRoles[id]||null,animePopularity:meta.popularity,existingBankMentions:recognition.get(id)||0,playerResponseFrequency:null},rarityCaveat:rarityContextKnown?null:'Insufficient prominence/popularity evidence; 85 is existing heuristic fallback, not editorial approval',anime:c.appearances.filter(a=>a.media==='anime'),trustStatus:[...new Set(row.matches.flatMap(f=>(f.sourceEvidence||[f]).map(e=>e.trustStatus)))].length===1?row.matches[0].trustStatus:'mixed_source_trusted',sourceTrustStatuses:[...new Set(row.matches.flatMap(f=>(f.sourceEvidence||[f]).map(e=>e.trustStatus)))],evidence:row.matches,eligibility:'Matches explicit draft conditions; contextual exclusions require question-specific review',rightsStatus:row.matches.some(f=>(f.sourceEvidence||[f]).some(e=>e.sourceProvider==='ACDB'))?'hold-ODbL-DbCL':c.sourceProvider==='ACDB'?'CC0-facts; ACDB-identity-provenance-hold':'CC0-facts; final-release-pending',publicationAuthorized:false});
 }
 if(limitBreakCharacterId){const c=candidates.find(a=>a.characterId===limitBreakCharacterId);if(!c)throw Error('Explicit Limit Break must identify a noncolliding candidate');c.rarity=100;c.limitBreakEditorialProposal=true;}
 const question={id:spec.id||'draft-source-traits',anime:'mixed',wide:'char',text:spec.text||'PRIVATE DRAFT: supply exact question wording',category:'Source-trusted character research',answers:candidates.map(({name,aliases,rarity})=>({name,aliases,rarity}))};if(limitBreakCharacterId)require('../../../power-level/versioning').validateBank([question],C);
 return {format:'anime-ascent-source-trusted-draft-v1',question,eligibilityRules:spec,candidates,held,proposedLimitBreak:limitBreakCharacterId||null,status:limitBreakCharacterId?'EDITORIAL_PROPOSAL':'MISSING_EDITORIAL_LIMIT_BREAK',publicationAuthorized:false,approvedPlayableAdditions:0};
}
module.exports={store,prepare,generate,descriptionFacts,hashFile,policy};

'use strict';
const V=require('../../verification/model');
const acdbFields={hair_color:['appearance.hair_color',{'Black':'black','Blonde / Yellow':'blonde','Blue':'blue','Brown':'brown','Green':'green','Gray':'gray','Orange':'orange','Purple':'purple','Red':'red','White':'white','Pink':'pink','Maroon':'maroon','Blue / Green':'blue_green'}],eye_color:['appearance.eye_color',{'Black':'black','Blue':'blue','Brown':'brown','Green':'green','Gray':'gray','Orange':'orange','Purple':'purple','Red':'red','Yellow':'yellow','White':'white','Pink':'pink','Blue / Green':'blue_green','Heterochromia':'heterochromia'}],hair_length:['appearance.hair_length',{'No Hair':'hairless','To Ears':'to_ears','To Neck':'to_neck','To Shoulders':'to_shoulders','To Chest':'to_chest','To Waist':'to_waist','Hip / Past Hip':'past_hip'}],age:['profile.apparent_age',{'Child':'child','Teenager':'teenager','Adult':'adult','Senior':'senior','Ageless':'ageless'}],sex:['identity.gender',{'Male':'male','Female':'female','Androgynous':'androgynous','None':'genderless'}],mimikko:['appearance.ear_or_horn_feature',{'Elf':'elf_like_ears','Animal':'animal_like_ears','Horns':'horns'}]};
function acdbMappingHash(mappings){
 const py=x=>Array.isArray(x)?'['+x.map(py).join(', ')+']':x&&typeof x==='object'?'{'+Object.keys(x).sort().map(k=>JSON.stringify(k)+': '+py(x[k])).join(', ')+'}':JSON.stringify(x);
 return require('node:crypto').createHash('sha256').update(py(mappings).replace(/[\u007f-\uffff]/g,c=>'\\u'+c.charCodeAt(0).toString(16).padStart(4,'0'))).digest('hex');
}
function acdb(snapshot,manifest){
 const mappings=manifest?.acdbMappings;if(!mappings)throw Error('ACDB requires the separately reviewed private SQL code-mapping file (--mappings)');
 if(snapshot.mappingHash!==acdbMappingHash(mappings))throw Error('ACDB mapping hash mismatch');
 if(!/^[a-f0-9]{64}$/.test(snapshot.version||'')||snapshot.sourceManifest?.license!=='ODbL-1.0 + DbCL-1.0'||snapshot.notPublishable!==true||!Array.isArray(snapshot.records))throw Error('Use a private validated ACDB SQL staging export');
 return {provider:'acdb',identityNamespace:'acdb',originFamily:'acdb-community',acquisition:'official-sql-export',license:'ODbL-1.0 + DbCL-1.0',permission:'unresolved',permissionUrl:'https://www.animecharactersdatabase.com/databasedumps.php',publicationHold:true,revision:snapshot.version,retrievedAt:snapshot.sourceManifest.importedAt||(snapshot.retrievalBasis==='local-cache-read'?snapshot.localReadAt:undefined),retrievalBasis:snapshot.sourceManifest.importedAt?'staging-import-timestamp':snapshot.retrievalBasis,originalRemoteRetrievedAt:snapshot.originalRemoteRetrievedAt||null,records:snapshot.records.map(r=>{
  // Reconcile against the CURRENT catalogue again; imported matches are not an identity authority.
  const validTitles=(r.titles||[]).filter(t=>t.mt==='2').map(t=>t.english);
  const attrs=r.attributes||{},facts=[];
  for(const [field,a]of Object.entries(attrs)){
   if(!a)continue;if(a.known&&mappings[field]?.[String(a.code)]!==a.label)throw Error('ACDB code/label does not match inspected mapping');
   const spec=acdbFields[field];let traitId=spec?.[0],value=spec&&a.known?spec[1][a.label]:undefined;
   if(field==='clothing'&&a.known&&a.label!=='Other'){traitId='appearance.clothing';value=a.label;}
   if(field==='role'&&a.known){traitId='identity.story_role';value=a.label;}
   // lightdark is retained without inferring skin/colour semantics from an undocumented field.
   facts.push({traitId:value===undefined?'source.unmapped_acdb_field':traitId,value:value===undefined?String(a.label??a.code??'unknown'):value,sourceType:'profile',rawField:field,rawValue:a.code,rawLabel:a.label??null,normalizationHold:value===undefined?'Unknown code or source-field semantics require review':null,url:r.sourceUrl,locator:`characters.id=${r.acdbId}; ${field}`,fact:`ACDB structured ${field}: ${a.label||'unmapped code '+a.code}. Community assertion, not confirmation.`,context:{animeId:null,scope:'ACDB source appearance; anime correspondence proposed; recurrence unresolved',persistence:'unknown',form:null}});
  }
  return {externalId:String(r.acdbId),name:r.name,animeNames:validTitles,identityWarnings:r.warnings||[],facts,profileMetadata:{identifiers:{name:r.name,aliases:[],japaneseName:r.names?.japanese||null,sourceReadings:r.names||{}},appearances:(r.titles||[]).map(t=>({externalTitleId:t.id,title:t.english,media:t.mt==='2'?'anime':'non-anime-or-unresolved',sourceMediaCode:t.mt,primary:t.id===r.primaryPublisherId})),formLinks:r.formLinks||{},coverage:Object.keys(attrs).map(field=>({field,available:true})),missingFields:require('./profiles').fields.filter(f=>!['hairColour','eyeColour','hairLength','apparentAge','gender','clothing','characterRole',...(r.names?.japanese?['japaneseName']:[])].includes(f)),acquisition:'official-sql-cache'}};})};
}
function wikidata(snapshot,catalogue){
 if(snapshot.provider!=='Wikidata'||snapshot.license!=='CC0-1.0')throw Error('Wikidata CC0 snapshot required');
 const result=require('../../enrichment/wikidata').candidates(snapshot.entities,catalogue,{limit:50000,perAnime:50000,at:snapshot.retrievedAt});
 const rows=new Map();for(const row of result.candidates){const c=row.suggestion.claim,s=row.source;if(!rows.has(row.entity))rows.set(row.entity,{externalId:row.entity,malId:s.malId,facts:[]});rows.get(row.entity).facts.push({traitId:c.traitId,value:c.value,context:c.context,url:c.evidence[0].url,locator:s.statementId,fact:c.evidence[0].explanation,rawField:s.property,rawValue:s.value,revision:s.revision,qualifiers:s.qualifiers,references:s.references});}
 return {provider:'wikidata',license:'CC0-1.0',permission:'CC0-1.0',permissionUrl:'https://www.wikidata.org/wiki/Wikidata:Licensing',publicationHold:false,revision:V.hash(snapshot),retrievedAt:snapshot.retrievedAt,records:[...rows.values()],skipped:result.skipped,inspected:Object.keys(snapshot.entities||{}).length};
}
function authorized(snapshot,manifest){
 if(!manifest?.enabled||!['CC0-1.0','authorized-feed','individual-fact-review'].includes(manifest.permission)||!manifest.id||['acdb','wikidata'].includes(manifest.id)||!manifest.reviewedBy?.trim()||!Number.isFinite(Date.parse(manifest.reviewedAt))||!/^https:\/\//.test(manifest.permissionUrl||''))throw Error('Trusted local permission manifest required; a source payload cannot authorize itself');
 if(snapshot.format!=='anime-ascent-trait-source-v1'||!Array.isArray(snapshot.records)||!snapshot.revision)throw Error('Invalid authorized source snapshot');
 const aliases={'hair colour':'appearance.hair_color','hair color':'appearance.hair_color','hairstyle':'appearance.hairstyle','eye colour':'appearance.eye_color','species':'identity.species','occupation':'occupation.role','accessory':'appearance.accessory'};
 const exact={'blond':'blonde','grey':'gray','twin-tails':'twin_tails','half-elf':'half_elf','dark elf':'dark_elf','police officer':'police_officer'};
 if(!['primary','licensed','dataset','secondary'].includes(manifest.kind||'dataset'))throw Error('Invalid source kind');
 return {provider:manifest.id,structured:manifest.structured===true,kind:manifest.kind||'dataset',originFamily:manifest.originFamily||manifest.id,license:manifest.permission,permission:manifest.permission,permissionUrl:manifest.permissionUrl,publicationHold:manifest.publicationCleared!==true,revision:String(snapshot.revision),retrievedAt:snapshot.retrievedAt,records:snapshot.records.map(r=>({...r,facts:(r.facts||[]).map(f=>{if(!manifest.hosts?.includes(new URL(f.url).hostname))throw Error('Evidence outside authorized source hosts');return {...f,traitId:aliases[f.traitId]||f.traitId,value:exact[f.value]||f.value};})}))};
}
function adapt(provider,snapshot,catalogue,manifest){if(provider==='acdb-profile')return require('./profiles').profileSource(snapshot,manifest);if(provider==='acdb')return acdb(snapshot,manifest);if(provider==='wikidata')return wikidata(snapshot,catalogue);if(provider==='authorized')return authorized(snapshot,manifest);throw Error('Providers: acdb, acdb-profile, wikidata, authorized');}
module.exports={adapt,acdb,wikidata,authorized,acdbFields,acdbMappingHash};

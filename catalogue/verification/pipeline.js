'use strict';
// Trusted local permission manifest + normalized, bounded source snapshots.
// AI proposals retain provenance but cannot satisfy the deterministic batch gate.
const V=require('./model'),M=require('../traits/model'),E=require('../enrichment/eligibility');
function eligibility(claim,rule){
 const ordinary=['permanent','recurring'].includes(claim.context.persistence)&&!claim.context.form;
 const simple=['appearance.hair_color','appearance.eyewear','appearance.accessory','identity.species','occupation.detective','occupation.role'];
 if(!ordinary||!simple.includes(claim.traitId))return 'needs_context';
 if(rule.questionId.endsWith('wide-ninjas')&&['mal-anime-20','mal-anime-1735'].includes(claim.context.animeId))return 'recommend_exclude';
 if(claim.traitId==='occupation.role'&&claim.value==='investigator')return 'needs_context';
 return 'recommend_include';
}
function extract(snapshot,source,deps){
 if(!source||!source.enabled||!['CC0-1.0','authorized-feed','individual-fact-review'].includes(source.permission)||!/^https?:\/\//.test(source.permissionUrl||'')||!Number.isFinite(Date.parse(source.reviewedAt))||!source.originFamily||!source.id)throw Error('Source permission not established');
 if(!snapshot.revision||!Number.isFinite(Date.parse(snapshot.retrievedAt))||!Array.isArray(snapshot.items)||snapshot.items.length>50000)throw Error('Invalid bounded snapshot');
 const result=[],skipped=[];
 const mal=new Map(deps.catalogue.characters.map(c=>[c.malId,c]));
 const sourceBindings=new Map();
 for(const item of snapshot.items){const ids=sourceBindings.get(item.externalId)||new Set();ids.add(item.malId);sourceBindings.set(item.externalId,ids);}
 for(const item of snapshot.items){
  const character=mal.get(item.malId);
  if(!character||!item.externalId||sourceBindings.get(item.externalId).size!==1||!deps.appearances.has(character.id+'/'+item.context?.animeId)){skipped.push({externalId:item.externalId,reason:'Stable identity or adaptation conflict'});continue;}
  const mapping=source.fields?.[item.field];if(!mapping||!Object.hasOwn(mapping.values,item.value)){skipped.push({externalId:item.externalId,reason:'Unmapped exact field/value'});continue;}
  const [traitId,value]=[mapping.traitId,mapping.values[item.value]];
  if(!item.fact?.trim()||!item.locator?.trim()||!item.url||!source.hosts.includes(new URL(item.url).hostname))throw Error('Source reference outside authorized scope');
  const extraction=item.extraction==='ai_proposal'?'ai_proposal':source.structured===true?'structured':'editorial_summary';
  const claim={characterId:character.id,traitId,value,context:item.context,evidence:[{url:item.url,sourceName:source.name,explanation:item.fact,kind:['primary','licensed'].includes(source.kind)?'official':source.kind==='dataset'?'dataset':'secondary',accessedAt:snapshot.retrievedAt}],provenance:{provider:source.name,externalCharacterId:'mal:'+item.malId,basis:extraction==='ai_proposal'?'ai_inferred_suggestion':'source_fact',uncertainty:'Automatically extracted candidate; no approval. Check source context and eligibility.'}};
  M.propose({version:1,associations:[]},[{id:'check',claim,status:'needs_review'}],deps.definitions,deps.catalogue);
  const ev={url:item.url,fact:item.fact,locator:item.locator,revision:String(snapshot.revision),accessedAt:snapshot.retrievedAt,kind:source.kind,permission:source.permission,originFamily:source.originFamily,extraction,supports:item.contradiction?'contradicts':'trait',characterId:character.id,traitId,value,animeId:item.context.animeId,contextHash:V.hash(item.context),sourceId:source.id,sourceSnapshotHash:V.hash(snapshot)};ev.id=V.hash(ev);
  for(const rule of deps.policy.questions.filter(r=>E.matches(r,claim)))result.push({claim,questionId:rule.questionId,evidence:ev,identity:'corroborated',eligibility:eligibility(claim,rule)});
 }
 return {candidates:result,skipped,snapshotHash:V.hash(snapshot),sourceId:source.id,bindings:snapshot.items.filter(i=>sourceBindings.get(i.externalId).size===1&&mal.has(i.malId)).map(i=>({sourceId:source.id,externalId:i.externalId,malId:i.malId}))};
}
function ingest(state,batch,deps){
 V.validate(state,deps);const next=structuredClone(state),beforeHash=V.hash(state);
 next.identityBindings||={};
 for(const b of batch.bindings||[]){const key=V.hash([b.sourceId,b.externalId]);if(next.identityBindings[key]&&next.identityBindings[key].malId!==b.malId)throw Error('Persistent source identity conflict');next.identityBindings[key]=b;}
 for(const item of batch.candidates){
  if(next.traits.associations.some(a=>{const s=M.latest(a);return s.status==='rejected'&&s.claim.characterId===item.claim.characterId&&s.claim.traitId===item.claim.traitId&&s.claim.value===item.claim.value;}))throw Error('Explicit reopening required for rejected trait');
  const key=V.hash([item.claim.characterId,item.claim.traitId,item.claim.value,item.claim.context]);
  const existing=next.traits.associations.find(a=>V.hash([M.latest(a).claim.characterId,M.latest(a).claim.traitId,M.latest(a).claim.value,M.latest(a).claim.context])===key);
  const claimId=existing?.id||'auto-'+key.slice(0,24),id=claimId+':'+item.questionId;
  if(!existing)next.traits=M.propose(next.traits,[{id:claimId,status:'needs_review',claim:item.claim}],deps.definitions,deps.catalogue);
  const record=next.records.find(r=>r.claimId===claimId&&r.questionId===item.questionId);
  if(record){
   if(record.evidence.some(e=>e.id===item.evidence.id))continue;
   if(M.latest(next.traits.associations.find(a=>a.id===claimId)).status!=='needs_review')throw Error('Explicit reopening required before evidence update');
   record.evidence.push(item.evidence);record.evidenceRevisions.push({snapshotHash:batch.snapshotHash,evidenceIds:record.evidence.map(e=>e.id)});
  }else{
   const c=deps.characters.get(item.claim.characterId),q=deps.questionsById.get(item.questionId);
   const match=require('../enrichment/report').accepted(q,c,[]);
   next.records.push({id,claimId,questionId:item.questionId,claim:item.claim,identity:item.identity,eligibility:item.eligibility,evidence:[item.evidence],evidenceRevisions:[{snapshotHash:batch.snapshotHash,evidenceIds:[item.evidence.id]}],...match,aliases:[],origin:'automatic-permitted-source'});
  }
 }
 if(V.hash(next)===beforeHash)return state;
 next.imports||=[];next.imports.push({beforeHash,snapshotHash:batch.snapshotHash,sourceId:batch.sourceId,at:new Date().toISOString(),recordsHash:V.hash(next.records)});next.revision++;
 return V.validate(next,deps);
}
// Community statements enter the queue automatically, but never establish adaptation,
// persistence or independent verification. Preserve the complete source snapshot separately.
function wikidata(snapshot,deps){
 if(snapshot.provider!=='Wikidata'||snapshot.license!=='CC0-1.0'||!Number.isFinite(Date.parse(snapshot.retrievedAt)))throw Error('Invalid Wikidata provenance');
 const adapted=require('../enrichment/wikidata').candidates(snapshot.entities,deps.catalogue,{at:snapshot.retrievedAt,limit:200,perAnime:5});
 const snapshotHash=V.hash(snapshot),candidates=[],bindings=[];
 for(const row of adapted.candidates){
  const claim=row.suggestion.claim,source=row.source;
  bindings.push({sourceId:'wikidata',externalId:source.entityId,malId:source.malId});
  const e={url:claim.evidence[0].url,fact:claim.evidence[0].explanation,locator:source.statementId,revision:String(source.revision),accessedAt:snapshot.retrievedAt,kind:'dataset',permission:'CC0-1.0',originFamily:'wikidata-community',extraction:'structured',supports:'trait',characterId:claim.characterId,traitId:claim.traitId,value:claim.value,animeId:null,contextHash:V.hash(claim.context),sourceId:'wikidata',sourceSnapshotHash:snapshotHash,references:source.references,qualifiers:source.qualifiers};e.id=V.hash(e);
  for(const rule of deps.policy.questions.filter(r=>E.matches(r,claim)))candidates.push({claim,questionId:rule.questionId,evidence:e,identity:'catalogue_only',eligibility:'needs_context'});
 }
 return {candidates,bindings,snapshotHash,sourceId:'wikidata',skipped:adapted.skipped,available:adapted.available};
}
module.exports={extract,ingest,wikidata};

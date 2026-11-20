'use strict';
const fs=require('node:fs'),path=require('node:path'),V=require('../verification/model'),P=require('../verification/pipeline'),S=require('../verification/store');
const colors={'Red':'red','Blonde / Yellow':'blonde','White':'white','Pink':'pink','Green':'green'};
function batch(snapshot,deps){
 if(!/^[a-f0-9]{64}$/.test(snapshot.version)||snapshot.sourceManifest?.license!=='ODbL-1.0 + DbCL-1.0'||snapshot.notPublishable!==true)throw Error('Invalid private ACDB snapshot');
 const candidates=[],held=[],seen=new Set();
 for(const r of snapshot.records){
  const ids=Object.keys(r.matches);if(ids.length!==1){held.push({acdbId:r.acdbId,reason:ids.length?'ambiguous identity':'no anime identity match'});continue;}
  const characterId=ids[0],aids=r.matches[characterId],color=colors[r.attributes.hair_color.label];
  if(!color)continue;
  // Multiple adaptations and forms remain individual-review proposals, never confident joins.
  for(const animeId of aids){
   if(!deps.appearances.has(characterId+'/'+animeId))throw Error('Unknown catalogue appearance');
   const context={animeId,scope:'ACDB apparent hair colour; anime recurrence and depiction unresolved',persistence:'unknown',form:null};
   const source={url:r.sourceUrl,sourceName:'ACDB structured dump',explanation:`ACDB ${r.acdbId}: hair_color=${r.attributes.hair_color.code} (${r.attributes.hair_color.label}). Community classification, not independent confirmation. ${r.warnings.join('; ')}`,kind:'dataset',accessedAt:snapshot.sourceManifest.importedAt||'2026-11-20T00:00:00Z'};
   const claim={characterId,traitId:'appearance.hair_color',value:color,context,evidence:[source],provenance:{provider:'ACDB ODbL private import',externalCharacterId:'acdb:'+r.acdbId,basis:'source_fact',uncertainty:'Name+franchise proposal, not a cross-ID authority. '+r.warnings.join('; ')}};
   const e={url:r.sourceUrl,fact:source.explanation,locator:'characters.id='+r.acdbId+'; hair_color',revision:snapshot.version,accessedAt:source.accessedAt,kind:'dataset',permission:'unresolved',originFamily:'acdb-community',extraction:'structured',supports:'trait',characterId,traitId:claim.traitId,value:color,animeId,contextHash:V.hash(context),acdbId:r.acdbId,sourceSnapshotHash:snapshot.version,mappingHash:snapshot.mappingHash,license:'ODbL-1.0 + DbCL-1.0',publicationHold:true,identityMatch:'name_and_anime_title',warnings:r.warnings};e.id=V.hash(e);
   for(const rule of deps.policy.questions.filter(q=>require('../enrichment/eligibility').matches(q,claim))){const key=[r.acdbId,rule.questionId,animeId].join('/');if(seen.has(key))continue;seen.add(key);candidates.push({claim,questionId:rule.questionId,evidence:e,identity:'catalogue_only',eligibility:'needs_context'});}
  }
 }
 return {sourceId:'acdb',snapshotHash:snapshot.version,candidates,held,bindings:[]};
}
function merge(state,b,deps){
 // Preserve already reviewed claims; conflicting/rejected/approved claims go to a hold report.
 const held=[...b.held],safe=[];
 for(const item of b.candidates){const related=state.traits.associations.filter(a=>{const x=a.history.at(-1).after;return x.claim.characterId===item.claim.characterId&&x.claim.traitId===item.claim.traitId&&x.claim.value===item.claim.value&&x.status!=='needs_review';});
  const old=state.records.flatMap(r=>r.evidence).filter(e=>e.acdbId===item.evidence.acdbId);
  if(related.length||old.some(e=>e.characterId!==item.claim.characterId)){held.push({acdbId:item.evidence.acdbId,reason:'existing decision or identity reassignment requires individual review'});continue;}safe.push(item);
 }
 return {state:safe.length?P.ingest(state,{...b,candidates:safe},deps):state,held};
}
if(require.main===module){const [file,mode]=process.argv.slice(2),snapshot=JSON.parse(fs.readFileSync(file)),b=batch(snapshot,S.deps),before=S.read(),result=merge(before,b,S.deps),view=V.view(result.state,S.deps),directory=path.join(S.directory,'../phase5d');fs.mkdirSync(directory,{recursive:true});
 const records=view.records.filter(r=>r.evidence.some(e=>e.originFamily==='acdb-community'));
 const pairs=new Map();for(const r of records)pairs.set(r.questionId+'/'+r.claim.characterId,r);
 const summary={snapshot:snapshot.version,sourceCharacters:snapshot.records.length,matchedRows:snapshot.records.filter(r=>Object.keys(r.matches).length===1).length,uniqueMatchedCharacters:new Set(snapshot.records.filter(r=>Object.keys(r.matches).length===1).map(r=>Object.keys(r.matches)[0])).size,proposals:b.candidates.length,associations:result.state.traits.associations.length-before.traits.associations.length,distinctPairs:pairs.size,potentialNewPairs:[...pairs.values()].filter(r=>!r.alreadyAccepted).length,existingPairs:[...pairs.values()].filter(r=>r.alreadyAccepted).length,strictBatch:records.filter(r=>r.assessment.queue==='high-evidence').length,individual:records.length,held:result.held.length,byQuestion:S.deps.policy.questions.map(q=>({id:q.questionId,current:S.deps.questionsById.get(q.questionId).answers.length,new:[...pairs.values()].filter(r=>r.questionId===q.questionId&&!r.alreadyAccepted).length,existing:[...pairs.values()].filter(r=>r.questionId===q.questionId&&r.alreadyAccepted).length}))};
 for(const [name,value]of Object.entries({summary,held:result.held,'preview-state':result.state})){const f=path.join(directory,name+'.json');fs.writeFileSync(f+'.tmp',JSON.stringify(value,null,2)+'\n',{mode:0o600});fs.renameSync(f+'.tmp',f);}
 if(mode==='--apply')S.update(current=>{if(V.hash(current)!==V.hash(before))throw Error('Review state changed; retry');return result.state;});else if(mode)throw Error('Use --apply or omit for preview');
 console.log(JSON.stringify(summary));
}
module.exports={batch,merge};

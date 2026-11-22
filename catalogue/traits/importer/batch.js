'use strict';
const V=require('../../verification/model'),I=require('./index'),S=require('./store');
function preflight(source,deps){const idx=I.identityIndex(deps),bindings=new Map();for(const row of source.records){const r=I.resolve(row,deps,idx),key=String(row.externalId);if(!bindings.has(key))bindings.set(key,new Set());if(r.characterId)bindings.get(key).add(r.characterId);}return {...source,importContext:{catalogueHash:V.hash(deps.catalogue),definitionsHash:V.hash(deps.definitions),policyHash:V.hash(deps.policy)},records:source.records.map(r=>bindings.get(String(r.externalId)).size>1?{...r,identityWarnings:[...r.identityWarnings||[],'conflicting source identities across import batches']}:r)};}
function apply({file,source,deps,initial,batchSize=100,stopAfter}){
 if(stopAfter!==undefined&&(!Number.isInteger(stopAfter)||stopAfter<1))throw Error('Stop-after batches must be a positive integer');
 if(!Number.isInteger(batchSize)||batchSize<1||batchSize>1000)throw Error('Batch size must be 1–1000');
 const root=V.hash(source),read=()=>require('node:fs').existsSync(file)?JSON.parse(require('node:fs').readFileSync(file)):initial();let state=read();V.validate(state,deps);
 const checkpoint=state.importBatchCheckpoints?.[root];if(checkpoint&&(!Number.isInteger(checkpoint.processed)||checkpoint.processed<0||checkpoint.processed>source.records.length||checkpoint.total!==source.records.length||checkpoint.sourceHash!==root))throw Error('Invalid import checkpoint');const start=checkpoint&&checkpoint.processed<source.records.length?checkpoint.processed:0;let batches=0;const summaries=[];
 for(let offset=start;offset<source.records.length;offset+=batchSize){const records=source.records.slice(offset,offset+batchSize),end=offset+records.length;let result;
  state=S.update(file,current=>{const actual=current||initial();result=I.plan(actual,{...source,records,rootSnapshotHash:root},deps);const next=structuredClone(result.state);next.importBatchCheckpoints||={};const prior=next.importBatchCheckpoints[root];const job={sourceHash:root,total:source.records.length,processed:Math.max(prior?.processed||0,end)};if(V.hash(prior||null)!==V.hash(job)){next.importBatchCheckpoints[root]=job;if(next.revision===actual.revision)next.revision++;}return V.validate(next,deps);});
  summaries.push(result.summary);batches++;if(stopAfter&&batches>=stopAfter)break;
 }
 const current=state.importBatchCheckpoints?.[root];return {state,summary:{sourceRecords:source.records.length,resumedAt:start,batches,processed:current?.processed||0,complete:(current?.processed||0)===source.records.length,claimsAdded:summaries.reduce((n,s)=>n+s.claimsAdded,0),duplicateClaimsAvoided:summaries.reduce((n,s)=>n+s.duplicateClaimsAvoided,0),duplicateObservationsAvoided:summaries.reduce((n,s)=>n+(s.duplicateObservationsAvoided||0),0),identityConflicts:summaries.reduce((n,s)=>n+s.identityConflicts,0)},snapshotHash:root};
}
module.exports={preflight,apply};

'use strict';
// Append a real maintainer's source reading. Never relabel AI evidence or approve a claim.
const V=require('./model'),P=require('./pipeline'),M=require('../traits/model');
const {authorize}=require('../expansion/private-admission');
function history(state){
 let previous='genesis';const operations=new Set();
 for(const e of state.sourceReviews||[]){const body={...e};delete body.hash;const record=state.records.find(r=>r.id===e.recordId),evidence=record?.evidence.find(x=>x.id===e.evidenceId);
  if(e.previousHash!==previous||e.hash!==V.hash(body)||operations.has(e.operationId)||!evidence||evidence.sourceSnapshotHash!==e.sourceHash||evidence.quote!==e.quote||evidence.reviewedBy!==e.reviewer)throw Error('Broken source-review history');operations.add(e.operationId);previous=e.hash;}
}
function prepare(state,input,action,deps,maintainers){
 authorize(action,maintainers);V.validate(state,deps);history(state);
 if(input.expectedStateHash!==V.hash(state))throw Error('Stale review state');
 const r=state.records.find(r=>r.id===input.recordId),a=r&&state.traits.associations.find(a=>a.id===r.claimId);
 if(!r||M.latest(a).revision!==input.expectedClaimRevision||M.latest(a).status!=='needs_review')throw Error('Unreviewed current claim required; rejected/reviewed claims need explicit reopening');
 const s=input.source;
 if(!s||!['primary','licensed'].includes(s.kind)||!['individual-fact-review','authorized-feed','CC0-1.0'].includes(s.permission)||!s.originFamily?.trim()||!s.revision?.trim()||!s.locator?.trim()||!Number.isFinite(Date.parse(s.accessedAt)))throw Error('Explicit source provenance required');
 try{if(new URL(s.url).protocol!=='https:'||new URL(s.permissionUrl).protocol!=='https:')throw Error();}catch{throw Error('Invalid source URL');}
 if(typeof input.snapshotText!=='string'||input.snapshotText.length>50000||input.expectedSourceHash!==V.hash(input.snapshotText)||typeof input.quote!=='string'||!input.quote.trim()||input.quote.length>500||!input.snapshotText.includes(input.quote)||!input.interpretation?.trim()||input.inspectedOriginal!==true)throw Error('Actual source inspection, matching bounded quote and snapshot hash required');
 if(!['needs_context','recommend_include','recommend_exclude'].includes(input.eligibilityRecommendation)||!input.eligibilityReason?.trim())throw Error('Separate eligibility recommendation required');
 const result={input:structuredClone(input),action:structuredClone(action),claimHash:V.hash(r.claim),catalogueHash:V.hash(deps.catalogue),policyHash:V.hash(deps.policy),publicationHold:true,factsApproved:false,eligibilityApproved:false};return {...result,digest:V.hash(result)};
}
function commit(state,plan,operationId,confirmed,deps,maintainers){
 authorize(plan.action,maintainers);V.validate(state,deps);history(state);
 if(confirmed!==true||typeof operationId!=='string'||!operationId.trim())throw Error('Explicit source-review confirmation required');
 const body={...plan};delete body.digest;if(plan.digest!==V.hash(body))throw Error('Source review plan changed');
 const repeat=(state.sourceReviews||[]).find(e=>e.operationId===operationId);if(repeat){if(repeat.planDigest!==plan.digest)throw Error('Operation ID conflict');return state;}
 if(prepare(state,plan.input,plan.action,deps,maintainers).digest!==plan.digest)throw Error('Stale source review');
 const i=plan.input,s=i.source,r=state.records.find(r=>r.id===i.recordId);
 const evidence={url:s.url,fact:i.interpretation,locator:s.locator,revision:s.revision,accessedAt:s.accessedAt,kind:s.kind,permission:s.permission,originFamily:s.originFamily,extraction:'editorial_summary',supports:'trait',characterId:r.claim.characterId,traitId:r.claim.traitId,value:r.claim.value,animeId:r.claim.context.animeId,contextHash:V.hash(r.claim.context),sourceId:'maintainer-source-review',sourceSnapshotHash:i.expectedSourceHash,quote:i.quote,reviewedBy:plan.action.reviewer};evidence.id=V.hash(evidence);
 const batch={candidates:[{claim:r.claim,questionId:r.questionId,evidence,identity:r.identity,eligibility:r.eligibility}],sourceId:evidence.sourceId,snapshotHash:i.expectedSourceHash};
 const next=structuredClone(P.ingest(state,batch,deps)),record=next.records.find(x=>x.id===i.recordId);
 // This is a review recommendation, not a per-question approval decision.
 record.eligibility=i.eligibilityRecommendation;
 const event={operationId,planDigest:plan.digest,reviewer:plan.action.reviewer,reason:plan.action.reason,at:plan.action.at,recordId:r.id,evidenceId:evidence.id,sourceHash:i.expectedSourceHash,quote:i.quote,interpretation:i.interpretation,eligibilityReason:i.eligibilityReason,beforeRecommendation:r.eligibility,afterRecommendation:i.eligibilityRecommendation,previousHash:state.sourceReviews?.at(-1)?.hash||'genesis',beforeStateHash:V.hash(state),publicationHold:true};event.hash=V.hash(event);
 next.sourceReviews=[...(state.sourceReviews||[]),event];next.revision++;V.validate(next,deps);history(next);return next;
}
module.exports={prepare,commit,history};

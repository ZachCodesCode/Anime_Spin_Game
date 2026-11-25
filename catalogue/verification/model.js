'use strict';
const crypto=require('node:crypto'),M=require('../traits/model'),E=require('../enrichment/eligibility');
const canonical=x=>Array.isArray(x)?x.map(canonical):x&&typeof x==='object'?Object.fromEntries(Object.keys(x).sort().map(k=>[k,canonical(x[k])])):x;
const hash=x=>crypto.createHash('sha256').update(JSON.stringify(canonical(x))).digest('hex');
const url=u=>{try{return ['https:','http:'].includes(new URL(u).protocol);}catch{return false;}};
const latest=a=>a.history.at(-1).after;
function index(deps){return {...deps,characters:new Map(deps.catalogue.characters.map(c=>[c.id,c])),appearances:new Set(deps.catalogue.appearances.map(a=>a.characterId+'/'+a.animeId)),questionsById:new Map(deps.questions.map(q=>[q.id,q])),rules:new Map(deps.policy.questions.map(q=>[q.questionId,q]))};}
function literalValid(e){return !!e.literal && typeof e.literal.text==='string' && e.literal.text.length<=500 && !/\b(?:not|never|no|isn't|isn’t)\b|ではない|じゃない/i.test(e.literal.text) && Array.isArray(e.literal.terms) && e.literal.terms.length>=2 && e.literal.terms.every(t=>typeof t==='string'&&t.length&&e.literal.text.includes(t)) && e.literal.snapshotHash===hash(e.literal.text);}
function assess(record,deps){
 const claim=record.claim,rule=deps.rules.get(record.questionId),reasons=[];
 const identity=deps.characters.has(claim.characterId)&&deps.appearances.has(claim.characterId+'/'+claim.context.animeId)&&record.identity==='corroborated';
 if(!identity)reasons.push('Stable identity/adaptation needs corroboration');
 if(!rule||!E.matches(rule,claim))reasons.push('Trait does not match question rule');
 if(claim.context.persistence==='unknown')reasons.push('Persistence unresolved');
 if(['temporary','transformation_specific'].includes(claim.context.persistence))reasons.push('Form-specific eligibility needs individual review');
 if(record.eligibility!=='recommend_include')reasons.push('Question eligibility needs individual review');
 if(record.questionId.endsWith('wide-ninjas')&&['mal-anime-20','mal-anime-1735'].includes(claim.context.animeId))reasons.push('Naruto exclusion');
 const evidence=record.evidence.filter(e=>e.supports==='trait'&&e.animeId===claim.context.animeId&&e.characterId===claim.characterId&&e.traitId===claim.traitId&&e.value===claim.value&&e.contextHash===hash(claim.context)&&e.permission!=='unresolved');
 const reliable=evidence.filter(e=>['primary','licensed'].includes(e.kind)&&e.extraction!=='ai_proposal');
 // Family is provenance origin, not website hostname. Syndicated copies count once.
 const independent=new Set(reliable.filter(e=>(e.extraction==='structured'||e.extraction==='literal_rule'&&literalValid(e))).map(e=>e.originFamily));
 const conflicting=record.identity==='conflict'||record.evidence.some(e=>e.supports==='contradicts');
 if(!reliable.length)reasons.push('No direct, exact-context supporting evidence');
 if(independent.size<2)reasons.push('Fewer than two independently originated deterministic sources');
 return {queue:conflicting?'conflicting':reasons.length?'uncertain':'high-evidence',reasons,direct:reliable.length>0,independentSources:independent.size,canIndividuallyApprove:!conflicting&&identity&&reliable.length>0&&claim.context.persistence!=='unknown'&&!!rule&&E.matches(rule,claim)&&!reasons.includes('Naruto exclusion')};
}
function validate(state,deps){
 if(state.version!==1||!Array.isArray(state.records)||!Array.isArray(state.decisions)||!Number.isSafeInteger(state.revision))throw Error('Invalid review state');
 M.validate(state.traits,deps.definitions,deps.catalogue);
 const records=new Set(),associations=new Map(state.traits.associations.map(a=>[a.id,a]));
 for(const r of state.records){
  if(records.has(r.id)||!r.id)throw Error('Duplicate record');records.add(r.id);
  const base=associations.get(r.claimId);if(!base)throw Error('Unknown claim');
  const prior=latest(base).claim;
  if(['characterId','traitId','value'].some(k=>prior[k]!==r.claim[k]))throw Error('Identity/trait conflict');
  if(!deps.questionsById.has(r.questionId)||!E.matches(deps.rules.get(r.questionId),r.claim))throw Error('Invalid eligibility mapping');
  // Run canonical claim checks without mutating any ledger.
  const temporary={version:1,associations:[]};M.propose(temporary,[{id:'validation',status:'needs_review',claim:r.claim}],deps.definitions,deps.catalogue);
  if(!Array.isArray(r.evidence)||!r.evidence.length)throw Error('Missing evidence');
  const ids=new Set();for(const e of r.evidence){
   if(ids.has(e.id)||e.id!==hash(Object.fromEntries(Object.entries(e).filter(([k])=>k!=='id'))))throw Error('Evidence integrity mismatch');ids.add(e.id);
   if(e.extraction==='literal_rule'&&!literalValid(e))throw Error('Invalid literal evidence extraction');
   if(!url(e.url)||!e.fact?.trim()||!e.originFamily?.trim()||!e.locator?.trim()||!e.revision||!Number.isFinite(Date.parse(e.accessedAt)))throw Error('Invalid evidence reference');
   if(!['trait','identity','contradicts'].includes(e.supports)||!['primary','licensed','secondary','dataset'].includes(e.kind)||!['structured','literal_rule','editorial_summary','ai_proposal'].includes(e.extraction)||!['CC0-1.0','individual-fact-review','authorized-feed','unresolved'].includes(e.permission))throw Error('Invalid evidence classification');
  }
 }
 let prev='genesis';const operations=new Set();for(const d of state.decisions){const body={...d};delete body.hash;if(d.previousHash!==prev||d.hash!==hash(body)||operations.has(d.operationId))throw Error('Broken decision history');operations.add(d.operationId);prev=d.hash;}
 if(state.sourceReviews)require('./source-review').history(state);
 if(state.sourceProfiles||state.profileRelations)require('../traits/importer/profiles').validateState(state,deps);
 return state;
}
function view(state,deps){
 validate(state,deps);const associations=new Map(state.traits.associations.map(a=>[a.id,a]));
 const importedConflicts=state.importObservations?new Set(require('../traits/importer').conflictPairs(state).flatMap(c=>c.claimIds)):new Set();
 const records=state.records.map(r=>{const a=associations.get(r.claimId),status=latest(a).status,history=state.decisions.filter(d=>d.changes.some(c=>c.recordId===r.id));const change=history.at(-1)?.changes.find(c=>c.recordId===r.id);const assessment=assess(r,deps);
 const eligibility=change?.eligibility||'unresolved';
 const importedConflict=importedConflicts.has(r.claimId);
 if(importedConflict){assessment.queue='conflicting';assessment.canIndividuallyApprove=false;assessment.reasons.push('Imported conflicting characteristics require review');}
 const bucket=status==='rejected'?'conflicting_or_rejected':assessment.queue==='conflicting'?'conflicting_or_rejected':r.aliasOnly?'alias_only':status==='verified'&&eligibility==='eligible'?'approved_eligible':status==='verified'?'verified_unresolved':'pending';
 return {...r,character:deps.characters.get(r.claim.characterId).name,anime:deps.catalogue.anime.find(a=>a.id===r.claim.context.animeId)?.title||deps.catalogue.anime.find(a=>a.id===r.claim.context.animeId)?.name||null,question:deps.questionsById.get(r.questionId).text,status,revision:latest(a).revision,assessment,eligibility,bucket,history};});
 const priority=r=>(/mix-glasses|wide-detectives|wide-cats/.test(r.questionId)?0:10)+(r.alreadyAccepted?5:0);
 records.sort((a,b)=>priority(a)-priority(b)||a.questionId.localeCompare(b.questionId)||a.character.localeCompare(b.character));
 return {revision:state.revision,stateHash:hash(state),records,summary:{total:records.length,highEvidence:records.filter(r=>r.assessment.queue==='high-evidence'&&r.status!=='rejected').length,uncertain:records.filter(r=>r.assessment.queue==='uncertain').length,conflicting:records.filter(r=>r.assessment.queue==='conflicting').length,approved:records.filter(r=>r.status==='verified').length}};
}
function plan(state,request,deps,reviewers){
 validate(state,deps);
 if(!reviewers.includes(request.reviewer)||!request.reviewer.trim()||/^(codex|assistant|import:)/i.test(request.reviewer)||!request.note?.trim())throw Error('Authorized maintainer and reasoning required');
 if(!['verified','rejected','needs_review'].includes(request.status)||!['eligible','ineligible','unresolved'].includes(request.eligibility)||!Array.isArray(request.ids)||!request.ids.length||request.ids.length>100||new Set(request.ids).size!==request.ids.length)throw Error('Invalid batch');
 if(request.stateHash!==hash(state))throw Error('Stale state; reload');
 const associations=new Map(state.traits.associations.map(a=>[a.id,a])),seen=new Set();
 const changes=request.ids.map(id=>{
  const r=state.records.find(r=>r.id===id);if(!r)throw Error('Unknown record');if(seen.has(r.claimId))throw Error('Same claim selected more than once');seen.add(r.claimId);
  const before=latest(associations.get(r.claimId)),assessment=assess(r,deps);
  if(request.status==='verified'&&state.importObservations&&require('../traits/importer').conflictPairs(state).some(c=>c.claimIds.includes(r.claimId)))throw Error('Conflicting imported traits require review before approval');
  if(before.status==='rejected'&&!(request.status==='needs_review'&&request.reopen===true&&request.ids.length===1))throw Error('Rejected claim requires explicit individual reopening');
  if(request.status==='verified'&&(!assessment.canIndividuallyApprove||request.ids.length>1&&assessment.queue!=='high-evidence'))throw Error('Evidence gate: investigate individually or provide stronger sources');
  if(request.status==='verified'&&request.eligibility==='eligible'&&(r.eligibility!=='recommend_include'||assessment.reasons.includes('Form-specific eligibility needs individual review')))throw Error('Eligibility unresolved');
  return {recordId:id,claimId:r.claimId,before:structuredClone(before),after:{status:request.status,claim:structuredClone(r.claim)},eligibility:request.status==='verified'?request.eligibility:'unresolved',evidenceIds:r.evidence.map(e=>e.id),evidenceHash:hash(r.evidence)};
 });
 const result={stateHash:hash(state),policyHash:hash(deps.policy),reviewer:request.reviewer,note:request.note,request:structuredClone(request),changes};return {...result,digest:hash(result)};
}
function commit(state,prepared,operationId,confirmed,deps,reviewers){
 if(confirmed!==true||!operationId?.trim())throw Error('Explicit confirmation required');
 const repeated=state.decisions.find(d=>d.operationId===operationId);
 if(repeated){if(repeated.planDigest!==prepared.digest)throw Error('Operation ID conflict');return state;}
 const fresh=plan(state,prepared.request,deps,reviewers);if(fresh.digest!==prepared.digest)throw Error('Plan changed');
 let next=structuredClone(state);
 for(const c of fresh.changes)next.traits=M.review(next.traits,{operationId:operationId+':'+c.claimId,claimId:c.claimId,expectedRevision:c.before.revision,status:c.after.status,reviewer:fresh.reviewer,note:fresh.note,claim:c.after.claim},deps.definitions,deps.catalogue);
 const event={operationId,planDigest:fresh.digest,reviewer:fresh.reviewer,note:fresh.note,at:new Date().toISOString(),previousHash:next.decisions.at(-1)?.hash||'genesis',changes:fresh.changes};event.hash=hash(event);next.decisions.push(event);next.revision++;
 return validate(next,deps);
}
function exported(state,deps){
 const v=view(state,deps),groups={existingAccepted:[],approvedEligible:[],verifiedUnresolved:[],pending:[],aliasOnly:[],conflictingOrRejected:[]},names={approved_eligible:'approvedEligible',verified_unresolved:'verifiedUnresolved',pending:'pending',alias_only:'aliasOnly',conflicting_or_rejected:'conflictingOrRejected'};
 const seen=new Set();for(const r of v.records){const key=r.questionId+'/'+r.claim.characterId;if(r.bucket==='approved_eligible'&&r.alreadyAccepted){groups.existingAccepted.push(r);continue;}if(r.bucket==='approved_eligible'&&seen.has(key))continue;if(r.bucket==='approved_eligible')seen.add(key);groups[names[r.bucket]].push({recordId:r.id,questionId:r.questionId,characterId:r.claim.characterId,claim:r.claim,evidence:r.evidence,eligibility:r.eligibility,status:r.status,history:r.history});}
 return {format:'anime-ascent-offline-review-v1',notPublishable:true,policyHash:hash(deps.policy),stateHash:hash(state),...groups};
}
module.exports={hash,index,assess,validate,view,plan,commit,exported};

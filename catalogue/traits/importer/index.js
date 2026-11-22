'use strict';
const V=require('../../verification/model'),T=require('../model'),E=require('../../enrichment/eligibility'),P=require('../../verification/pipeline'),N=require('../../novelty'),C=require('../../../power-level/core');
const unicodeKey=s=>String(s||'').normalize('NFKD').replace(/\p{M}/gu,'').toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
function identityIndex(deps){const idx=N.index(deps.catalogue);idx.unicodeNames=new Map();for(const c of deps.catalogue.characters)for(const name of [c.name,...c.aliases,c.japaneseName].filter(Boolean)){const key=unicodeKey(name);if(!key)continue;if(!idx.unicodeNames.has(key))idx.unicodeNames.set(key,new Set());idx.unicodeNames.get(key).add(c.id);}return idx;}
function named(row,idx,animeId){const ids=N.resolve({name:row.name},idx,animeId).ids;if(ids.length)return ids;return [...idx.unicodeNames.get(unicodeKey(row.name))||[]].filter(id=>!animeId||idx.anime.get(id)?.has(animeId));}
function resolve(row,deps,idx=identityIndex(deps)){let animeIds=[];
 if(row.animeId){if(!deps.catalogue.anime.some(a=>a.id===row.animeId))return {reason:'Unknown adaptation'};animeIds=[row.animeId];}
 else if(row.animeNames?.length||row.animeName){const names=new Set([...(row.animeNames||[]),row.animeName].filter(Boolean).map(unicodeKey));animeIds=deps.catalogue.anime.filter(a=>[a.name,...a.aliases,a.japaneseName].filter(Boolean).some(n=>names.has(unicodeKey(n)))).map(a=>a.id);if(animeIds.length!==1)return {reason:'Missing or ambiguous adaptation',animeIds};}
 let ids=[];if(row.canonicalId||row.malId){const id=row.canonicalId||'mal-character-'+row.malId;if(row.canonicalId&&row.malId&&id!=='mal-character-'+row.malId)return {reason:'Conflicting stable IDs'};if(!deps.characters.has(id))return {reason:'Stable identity absent from catalogue'};ids=[id];}
 else {if(!row.name||animeIds.length!==1)return {reason:'Name-only matching requires an unambiguous anime appearance'};ids=named(row,idx,animeIds[0]);}
 if(ids.length!==1)return {reason:'Missing or ambiguous character identity',candidates:ids};const id=ids[0];
 if(animeIds.length&&animeIds.some(a=>!deps.appearances.has(id+'/'+a)))return {reason:'Character/adaptation mismatch'};
 if(row.name&&row.malId){const names=named(row,idx,animeIds[0]);if(!names.includes(id))return {reason:'Source name conflicts with stable identity'};}
 if(row.identityWarnings?.some(w=>/form|clone|ambiguous|conflicting/i.test(w)))return {reason:'Source identity or form requires review',warnings:row.identityWarnings};
 return {characterId:id,animeId:animeIds[0]||null,identity:row.malId||row.canonicalId?'corroborated':'catalogue_only'};
}
function conflictPairs(state){
 const exclusive=new Set(['appearance.hair_color','appearance.eye_color','appearance.hair_length','identity.species']),groups=new Map(),out=[];
 for(const entry of state.traits.associations){const c=T.latest(entry);if(c.status==='rejected'||!exclusive.has(c.claim.traitId))continue;const key=c.claim.characterId+'/'+c.claim.traitId;if(!groups.has(key))groups.set(key,[]);groups.get(key).push(entry);}
 for(const active of groups.values())for(let i=0;i<active.length;i++)for(let j=i+1;j<active.length;j++){const a=T.latest(active[i]).claim,b=T.latest(active[j]).claim;if(a.value===b.value)continue;const x=a.context,y=b.context;if(x.animeId&&y.animeId&&x.animeId!==y.animeId||x.form&&y.form&&x.form!==y.form)continue;out.push({id:V.hash([active[i].id,active[j].id].sort()),claimIds:[active[i].id,active[j].id],characterId:a.characterId,traitId:a.traitId,status:'needs_review',reason:'Potentially conflicting values; period/form/adaptation may explain the difference. No automatic factual verdict.'});}
 return out;
}
function initial(traits){return {version:1,revision:0,traits:structuredClone(traits),records:[],decisions:[]};}
function plan(state,source,deps){
 V.validate(state,deps);if(!source.provider||!source.license||!source.revision||!Number.isFinite(Date.parse(source.retrievedAt))||!Array.isArray(source.records)||source.records.length>50000)throw Error('Invalid bounded provider snapshot');
 const next=structuredClone(state),before=V.hash(state),snapshotHash=V.hash(source);next.importObservations||=[];next.identityQueue||=[];next.identityBindings||={};
 const summary={charactersInspected:source.inspected||source.records.length,sourceRecords:source.records.length,charactersMatched:0,claimsAdded:0,duplicateClaimsAvoided:0,identityConflicts:0,unsupportedFacts:0,reviewHolds:0};const matched=new Set(),batchBindings=new Map();
 const nameIndex=identityIndex(deps);
 const resolved=source.records.map(row=>{const identity=resolve(row,deps,nameIndex),key=V.hash([source.provider,String(row.externalId)]);if(identity.characterId){const ids=batchBindings.get(key)||new Set();ids.add(identity.characterId);batchBindings.set(key,ids);}return {row,identity,key};});
 for(let {row,identity,key}of resolved){
  if(!row.externalId||!Array.isArray(row.facts))throw Error('External source ID and facts required');
  const old=next.identityBindings[key];if(batchBindings.get(key)?.size>1||old&&identity.characterId&&old.malId!==deps.characters.get(identity.characterId).malId)identity={reason:'Persistent or within-batch external-ID collision'};
  if(!identity.characterId){summary.identityConflicts++;const hold={provider:source.provider,externalId:String(row.externalId),snapshotHash,license:source.license,retrievedAt:source.retrievedAt,reason:identity.reason,row};hold.id=V.hash(hold);if(!next.identityQueue.some(x=>x.id===hold.id))next.identityQueue.push(hold);continue;}
  matched.add(identity.characterId);next.identityBindings[key]={sourceId:source.provider,externalId:String(row.externalId),malId:deps.characters.get(identity.characterId).malId};
  for(const fact of row.facts){
   const context=structuredClone(fact.context||{animeId:identity.animeId,scope:'Source assertion; recurrence unresolved',persistence:'unknown',form:null});
   if(!context.animeId&&identity.animeId)context.animeId=identity.animeId;
   const obs={provider:source.provider,externalId:String(row.externalId),characterId:identity.characterId,snapshotHash,license:source.license,permissionUrl:source.permissionUrl,publicationHold:source.publicationHold,retrievedAt:source.retrievedAt,fact};obs.id=V.hash(obs);
   const knownObservation=next.importObservations.some(x=>x.id===obs.id);if(knownObservation)summary.duplicateClaimsAvoided++;else next.importObservations.push(obs);
   const claim={characterId:identity.characterId,traitId:fact.traitId,value:fact.value,context,evidence:[{url:fact.url,sourceName:source.provider,explanation:fact.fact,kind:['primary','licensed'].includes(source.kind)?'official':'dataset',accessedAt:source.retrievedAt}],provenance:{provider:source.provider,externalCharacterId:source.provider+':'+row.externalId,basis:fact.extraction==='ai_proposal'?'ai_inferred_suggestion':'source_fact',uncertainty:'Imported candidate, not verified. Source licence: '+source.license+'; adaptation and context require review.'}};
   try {if(!fact.locator||!fact.fact?.trim())throw Error('Source locator/fact required');if(fact.value==null||typeof fact.value==='string'&&/^(unknown|not visible|n\/a)$/i.test(fact.value))throw Error('Unspecified source value remains unknown');if(context.animeId&&!deps.appearances.has(claim.characterId+'/'+context.animeId))throw Error('Fact adaptation conflict');if(claim.traitId==='relationship.family'&&!/^[a-z_]+\|mal-character-\d+$/.test(claim.value))throw Error('Family relation must reference a canonical character');if(claim.traitId==='relationship.family'&&!deps.characters.has(claim.value.split('|')[1]))throw Error('Unknown family identity');T.propose({version:1,associations:[]},[{id:'validate',status:'needs_review',claim}],deps.definitions,deps.catalogue);}catch(e){obs.hold=e.message;summary.unsupportedFacts++;continue;}
   const claimKey=c=>V.hash([c.characterId,c.traitId,c.value,c.context]),oldClaim=next.traits.associations.find(a=>claimKey(T.latest(a).claim)===claimKey(claim));
   if(next.traits.associations.some(a=>{const s=T.latest(a);return s.status==='rejected'&&s.claim.characterId===claim.characterId&&s.claim.traitId===claim.traitId&&s.claim.value===claim.value;})){obs.hold='Explicit reopening required for rejected trait';summary.reviewHolds++;continue;}
   const claimId=oldClaim?.id||'import-'+claimKey(claim).slice(0,24);obs.claimId=claimId;
   if(!oldClaim){next.traits=T.propose(next.traits,[{id:claimId,status:'needs_review',claim}],deps.definitions,deps.catalogue);summary.claimsAdded++;}else if(!knownObservation)summary.duplicateClaimsAvoided++;
   if(oldClaim&&T.latest(oldClaim).status!=='needs_review'){obs.hold='Existing review preserved; new evidence needs explicit reopening';summary.reviewHolds++;continue;}
   for(const rule of deps.policy.questions.filter(r=>E.matches(r,claim))){
    const ev={url:fact.url,fact:fact.fact,locator:fact.locator,revision:String(fact.revision||source.revision),accessedAt:source.retrievedAt,kind:source.kind||'dataset',permission:source.permission,originFamily:source.originFamily||source.provider,extraction:fact.extraction==='ai_proposal'?'ai_proposal':source.structured===true||['acdb','wikidata'].includes(source.provider)?'structured':'editorial_summary',supports:'trait',characterId:claim.characterId,traitId:claim.traitId,value:claim.value,animeId:context.animeId,contextHash:V.hash(context),sourceSnapshotHash:snapshotHash,license:source.license,externalId:String(row.externalId),publicationHold:source.publicationHold,qualifiers:fact.qualifiers||{},references:fact.references||[]};ev.id=V.hash(ev);
    const record=next.records.find(r=>r.claimId===claimId&&r.questionId===rule.questionId);
    if(record){if(!record.evidence.some(e=>e.id===ev.id))record.evidence.push(ev);}else next.records.push({id:claimId+':'+rule.questionId,claimId,questionId:rule.questionId,claim,identity:identity.identity,eligibility:P.eligibility(claim,rule),evidence:[ev],origin:'persistent-trait-import',aliases:[],...require('../../enrichment/report').accepted(deps.questionsById.get(rule.questionId),deps.characters.get(claim.characterId),[])});
   }
  }
 }
 summary.charactersMatched=matched.size;next.importConflicts=conflictPairs(next);summary.potentialContradictions=next.importConflicts.length;
 // Reimporting the same immutable input must not create audit churn or reopen decisions.
 if(V.hash(next)!==before){next.importRuns||=[];next.importRuns.push({sourceId:source.provider,snapshotHash,license:source.license,at:new Date().toISOString(),beforeHash:before,summary});next.revision++;}
 V.validate(next,deps);summary.pending=next.traits.associations.filter(a=>T.latest(a).status==='needs_review').length;summary.verified=next.traits.associations.filter(a=>T.latest(a).status==='verified').length;summary.questionEligible=V.view(next,deps).records.filter(r=>r.bucket==='approved_eligible').length;
 return {state:V.hash(next)===before?state:next,summary,snapshotHash};
}
module.exports={initial,plan,resolve,conflictPairs};

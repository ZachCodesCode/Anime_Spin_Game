'use strict';
const P=require('../verification/pipeline'),V=require('../verification/model'),Q=require('./questions');
function route(state,batch,deps){
 for(const item of batch.candidates){if(!deps.characters.has(item.claim.characterId))throw Error('Identity admission required');if(!deps.definitions.some(d=>d.id===item.claim.traitId))throw Error('Unsupported trait');if(!deps.rules.has(item.questionId))throw Error('Question mapping requires editorial rule');}
 return P.ingest(state,batch,deps);
}
function knowledge(state,deps){const histories=new Map(state.traits.associations.map(a=>[a.id,a.history]));return V.view(state,deps).records.map(r=>({characterId:r.claim.characterId,canonicalName:r.character,aliases:deps.characters.get(r.claim.characterId).aliases,anime:r.claim.context.animeId,trait:r.claim.traitId,value:r.claim.value,questionId:r.questionId,evidence:r.evidence,context:r.claim.context,revision:r.revision,history:r.history,traitHistory:histories.get(r.claimId),traitStatus:r.status,eligibility:Q.evaluate(deps.rules.get(r.questionId),r.claim),maintainerApproved:r.status==='verified',publicationRights:'unresolved unless separately documented',rarityApproved:false,releaseAuthorized:false}));}
module.exports={route,knowledge};

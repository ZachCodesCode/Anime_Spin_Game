'use strict';
// Offline only: a deterministic materialization of existing identities, not an importer or approval system.
const C=require('../../power-level/core'),N=require('../novelty'),M=require('../metadata'),T=require('../traits/model'),crypto=require('node:crypto');
const hash=x=>crypto.createHash('sha256').update(JSON.stringify(x)).digest('hex');
const generic=/^(?:unnamed|unknown|unidentified|background|extra|villager|villagers|soldier|soldiers|policeman|police officer|waiter|waitress|woman|man|boy|girl|child|mother|father|grandmother|grandfather|old man|old woman|narrator|shopkeeper|customer|announcer|reporter|teacher|doctor|student|students)(?:\s|$)/i;
const display=c=>c.name.includes(', ')?c.name.split(', ').reverse().join(' '):c.name;
function matches(rule,metadata,appearance){
 if(!rule||!rule.metadata||!Object.keys(rule.metadata).length)throw Error('Explicit metadata predicate required');
 if(rule.role&&appearance.role!==rule.role)return false;
 return Object.entries(rule.metadata).every(([field,values])=>{
  if(!['genres','themes','source','demographics'].includes(field)||!Array.isArray(values)||!values.length)throw Error('Unsupported predicate');
  const value=metadata?.[field];return field==='source'?values.includes(value):Array.isArray(value)&&value.some(t=>values.includes(t.name));
 });
}
function names(c,idx){
 const resolved=N.resolve({name:c.name},idx),name=display(c);
 if(resolved.ids.length!==1||resolved.ids[0]!==c.id||C.normalize(name).length<4||generic.test(name)||/^(?:young|adult|future|fake|clone of|alternate)\b/i.test(name))return {held:'Ambiguous, generic, short or possible alternate identity'};
 const aliases=[],withheldAliases=[],seen=new Set([C.normalize(name)]);
 for(const form of [c.name,...c.aliases||[]]){const key=C.normalize(form);if(seen.has(key))continue;seen.add(key);const r=N.resolve({name:form},idx);
  if(r.ids.length===1&&r.ids[0]===c.id&&key.length>=4&&!generic.test(form))aliases.push(form);else withheldAliases.push(form);
 }
 return {name,aliases,withheldAliases};
}
// Per-answer proposal, no percentile/quota allocation. It is not an approval or measured response frequency.
function rarity(c,appearance,meta,recognition){
 const known=recognition.get(c.id)||0,pop=meta.popularity;
 if(appearance.role==='Main'&&(known>=2||pop!==null&&pop<=300))return 10;
 if(appearance.role==='Main'||known>=2)return 30;
 if(known||pop!==null&&pop<=1500)return 60;
 return 85;
}
function generate({catalogue,metadata,definitions,existingBank=[],traits,traitDefinitions}){
 require('../validate').validate(catalogue);M.validateAll(metadata);
 if(traits)T.validate(traits,traitDefinitions,catalogue);
 const hashCatalogue=hash(catalogue);
 const idx=N.index(catalogue),apps=new Map(),recognition=new Map();
 for(const a of catalogue.appearances){if(!apps.has(a.characterId))apps.set(a.characterId,[]);apps.get(a.characterId).push(a);}
 for(const q of existingBank)for(const a of q.answers){const r=N.resolve({name:a.name},idx);if(r.ids.length===1)recognition.set(r.ids[0],(recognition.get(r.ids[0])||0)+1);}
 if(new Set(definitions.map(d=>d.id)).size!==definitions.length)throw Error('Duplicate question definition');
 const questions=[],held=[],evaluations=[];
 for(const def of definitions){if(def.wide!=='char'||!def.eligibilityRules?.include||!def.eligibilityRules?.exclude)throw Error('Missing curated eligibility rules');
  const answers=[];
  for(const c of catalogue.characters){const appearances=(apps.get(c.id)||[]).filter(a=>matches(def.predicate,metadata[a.animeId.replace('mal-anime-','')],a));
   if(!appearances.length){evaluations.push({questionId:def.id,characterId:c.id,status:'unassessed_outside_qualifying_catalogued_appearances'});continue;}
   const n=names(c,idx);if(n.held){held.push({questionId:def.id,characterId:c.id,status:'ambiguous',reason:n.held});continue;}
   appearances.sort((a,b)=>a.animeId.localeCompare(b.animeId));const chosen=appearances[0],meta=metadata[chosen.animeId.replace('mal-anime-','')],score=c.id===def.limitBreakCharacterId?100:rarity(c,chosen,meta,recognition);
   answers.push({...n,rarity:score,...(def.tooCleverCharacterIds?.includes(c.id)?{clever:true}:{}),characterId:c.id,canonicalName:c.name,animeId:chosen.animeId,eligibleAppearances:appearances,eligibility:{predicate:def.predicate,source:meta.sourceUrl,retrievedAt:meta.retrievedAt,metadataHash:hash(meta),identitySource:c.sourceUrl,catalogueHash:hashCatalogue},proposedTier:C.grade({rarity:score,clever:def.tooCleverCharacterIds?.includes(c.id)}).name,status:'supported_candidate',editoriallyApproved:false,rarityApproved:false,rightsStatus:def.rightsStatus||'unresolved'});
  }
  // Remove alias collisions across the actual complete bank; never silently merge identities.
  const forms=new Map();for(const a of answers)for(const f of [a.name,...a.aliases]){const k=C.normalize(f);if(!forms.has(k))forms.set(k,new Set());forms.get(k).add(a.characterId);}
  for(const a of answers)a.aliases=a.aliases.filter(f=>{if(forms.get(C.normalize(f)).size===1)return true;a.withheldAliases.push(f);return false;});
  const q={id:def.id,anime:'mixed',wide:'char',category:def.category,text:def.text,note:def.note,eligibilityRules:def.eligibilityRules,answers:answers.sort((a,b)=>a.characterId.localeCompare(b.characterId)),historyStatus:def.historyStatus||'UNKNOWN',publicationAuthorized:false,scheduledDate:null};
  require('../../power-level/versioning').validateBank([q],C);
  for(const a of q.answers)for(const form of [a.name,...a.aliases]){const result=C.validate(q,form);if(result.status!=='valid'||result.answer.characterId!==a.characterId)throw Error('Matcher identity collision');}
  questions.push(q);
 }
 return {format:'anime-ascent-candidates-v1',publicationAuthorized:false,catalogueHash:hashCatalogue,questions,held,evaluations,counts:{questions:questions.length,pairs:questions.reduce((n,q)=>n+q.answers.length,0),held:held.length}};
}
function existingCoverage({catalogue,bank,policy,traits,traitDefinitions,reviewState,metadata={}}){
 T.validate(traits,traitDefinitions,catalogue);
 const idx=N.index(catalogue),rules=new Map(policy.questions.map(r=>[r.questionId,r]));
 const review=require('../verification/model');
 const reviewed=reviewState?review.view(reviewState,review.index({catalogue,questions:bank,policy,definitions:traitDefinitions})).records:[];
 return bank.filter(q=>q.wide==='char').map(q=>{
  const rule=rules.get(q.id);
  const relevant=traits.associations.map(a=>T.latest(a)).filter(a=>rule?.traitChecks.some(t=>t.traitId===a.claim.traitId&&(!t.values.length||t.values.includes(a.claim.value))));
  const existingForms=new Set(q.answers.flatMap(a=>[a.name,...a.aliases||[]]).map(C.normalize));
  const candidates=reviewed.filter(r=>r.questionId===q.id&&r.bucket==='approved_eligible').map(r=>{
   const characterId=r.claim.characterId,animeId=r.claim.context.animeId,identity=idx.characters.get(characterId),n=names(identity,idx);
   const novelty=N.audit({characterId,animeId},q,idx);
   const conflicts=n.held?[]:[n.name,...n.aliases].filter(form=>existingForms.has(C.normalize(form)));
   const appearance=catalogue.appearances.find(a=>a.characterId===characterId&&a.animeId===animeId);
   return {characterId,animeId,reviewRecordId:r.id,novelty,evidence:r.evidence,
    status:'approved_question_eligibility_still_requires_rights_and_rarity',
    ...(n.held?{held:n.held}:{proposedAnswer:{name:n.name,aliases:n.aliases,characterId,canonicalName:identity.name,
     rarity:rarity(identity,appearance,metadata[animeId.replace('mal-anime-','')]||{popularity:null},new Map()),
     status:'candidate_requires_rarity_rights_and_release_review',editoriallyApproved:false}}),
    conflicts:novelty.classification==='genuinely_new_answer_candidate'?conflicts:[]};
  });
  return {questionId:q.id,text:q.text,existingAnswers:q.answers.length,originalQuestionHash:hash(q),
   ruleStatus:rule?.status||'missing_curated_question_rule',
   pendingTraits:relevant.filter(x=>x.status!=='verified').length,verifiedTraits:relevant.filter(x=>x.status==='verified').length,
   pendingReviewRecords:reviewed.filter(r=>r.questionId===q.id&&r.bucket==='pending').length,
   aliasOnlyReviewRecords:reviewed.filter(r=>r.questionId===q.id&&r.bucket==='alias_only').length,
   eligibleReviewedCandidates:candidates,
   additiveCandidateCount:candidates.filter(c=>c.novelty.classification==='genuinely_new_answer_candidate'&&!c.held&&!c.conflicts.length).length,
   limitation:'Identity presence never proves a personal trait. Verified traits require separate question eligibility, rights and rarity review.',
   preservedQuestion:q};
 });
}
function playable(questions){return questions.map(q=>({id:q.id,anime:q.anime,wide:q.wide,category:q.category,text:q.text,note:q.note,answers:q.answers.map(a=>({name:a.name,rarity:a.rarity,...(a.aliases.length?{aliases:a.aliases}:{}),...(a.clever?{clever:true}:{})}))}));}
module.exports={generate,matches,names,rarity,existingCoverage,playable,hash};

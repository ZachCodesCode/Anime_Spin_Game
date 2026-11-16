'use strict';
function validate(policy,questions){
 const expected=questions.filter(q=>q.wide).map(q=>q.id),ids=policy.questions.map(q=>q.questionId);
 if(ids.length!==expected.length||new Set(ids).size!==ids.length||expected.some(id=>!ids.includes(id)))throw Error('Eligibility inventory mismatch');
 const definitions=new Map(require('../traits/data/definitions.json').map(d=>[d.id,d]));
 for(const r of policy.questions){const q=questions.find(q=>q.id===r.questionId);if(r.type!==(q.wide==='char'?'character':'non_character'))throw Error('Wrong eligibility entity type');for(const t of r.traitChecks||[]){const d=definitions.get(t.traitId);if(!d||!Array.isArray(t.values)||t.values.some(v=>d.allowedValues.length&&!d.allowedValues.includes(v)))throw Error('Unknown trait rule');}if(r.status!=='draft_requires_maintainer_approval'||!r.include||!r.exclude||!Array.isArray(r.traitChecks)||!r.requiredContext?.length)throw Error('Missing eligibility guidance');if(r.type==='non_character'&&r.traitChecks.length)throw Error('Non-character trait rule');}
 return policy;
}
const matches=(rule,claim)=>rule.type==='character'&&rule.traitChecks.some(t=>t.traitId===claim.traitId&&(!t.values.length||t.values.includes(claim.value)));
function assess(rule,association){const state=association.history.at(-1).after,c=state.claim;return {relevant:matches(rule,c),eligible:false,decision:'requires_authorized_question_review',concerns:[...(state.status==='verified'?[]:['Trait is not verified']),...(!c.context.animeId?['Anime adaptation unresolved']:[]),...(c.context.persistence==='unknown'?['Persistence/temporal scope unresolved']:[]),rule.exclude]};}
module.exports={validate,matches,assess};

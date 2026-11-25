'use strict';
// Complete offline inventory. Draft mappings never become factual eligibility decisions.
const special=new Set(['naruto-beasts','tokyoghoul-codenames','mix-fruit-codenames']);
function inventory(questions,policy,definitions){const baseline=new Map(require('../coverage').coverage({characters:[],appearances:[],anime:[]},{associations:[]}).map(r=>[r.questionId,r]));const defs=new Set(definitions.map(d=>d.id));return questions.map(q=>{
 const rule=policy.questions.find(r=>r.questionId===q.id),suffix=q.id.replace('timed-v4-','');let type,traits=[],category,specialHandling;
 if(rule){type=rule.type;traits=rule.traitChecks;category=type==='character'?'cross-anime character traits':'non-character/specialized';specialHandling=type!=='character'||rule.requiredContext.length>0;}
 else if(baseline.get(q.id)?.entityType==='non_character_entity'||['jjk-tools','mix-beasts-tools'].includes(suffix)){type='non_character';category='named entities, techniques, places or finite groups';specialHandling=true;}
 else if(special.has(suffix)){type='specialized_character';category='mixed entity/form or codename';specialHandling=true;traits=[{traitId:suffix.includes('codename')?'identity.codename':'ability.transformation',values:[]}];}
 else {type='character';category='franchise-specific membership/identity/role';specialHandling=true;
 traits=[{traitId:suffix==='onepiece-fruit'?'ability.named_power':suffix==='naruto-outsiders'||suffix==='aot-marley'?'identity.origin':suffix==='bleach-quincy'||suffix==='hxh-ants'||suffix.includes('ghoul')?'identity.creature':'affiliation.membership',values:[]}];}
 if(suffix==='wide-starters'){type='specialized_character';category='finite Pokemon starter universe';specialHandling=true;}
 for(const t of traits)if(!defs.has(t.traitId))throw Error('Missing trait definition');
 return {questionId:q.id,wording:q.text,active:!!q.wide,type,category,legacyCoverageCategory:baseline.get(q.id)?.category||null,acceptedAnswers:q.answers.length,traits,specialHandling,broadExpansion:type==='character'&&!!q.wide,finiteOrScoped:!q.wide||type!=='character',eligibility:rule?structuredClone(rule):{status:'draft_requires_maintainer_approval',include:'Exact franchise/adaptation and all conditions in question wording must be documented',exclude:'Do not infer membership from profession, power from name, negative membership from missing evidence, or expand a finite roster beyond canon',requiredContext:['named adaptation','period/form','explicit group/role/ability','question-specific AND/OR and exclusions']},mappingStatus:rule?'existing draft guidance preserved':'draft planning relationship; franchise rule not executable',unknowns:rule?[]:['Exact membership vocabulary and compound conditions need editorial rule before deterministic routing']};});}
function evaluate(rule,claim){const match=rule.traitChecks?.some(t=>t.traitId===claim.traitId&&(!t.values.length||t.values.includes(claim.value)));const concerns=[];
 if(!match)concerns.push('unsupported_trait_for_question');if(!claim.context.animeId)concerns.push('adaptation_unknown');if(claim.context.persistence==='unknown')concerns.push('persistence_unknown');
 if(['temporary','transformation_specific'].includes(claim.context.persistence)||claim.context.form)concerns.push('form_specific_individual_decision');
 if(rule.questionId.endsWith('wide-ninjas')&&['mal-anime-20','mal-anime-1735'].includes(claim.context.animeId))concerns.push('explicit_naruto_exclusion');
 return {relevant:!!match,eligible:false,decision:'requires_authorized_question_review',concerns,include:rule.include,exclude:rule.exclude,traitFactDoesNotApproveQuestion:true};}
module.exports={inventory,evaluate};

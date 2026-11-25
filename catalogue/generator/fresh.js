'use strict';
const G=require('./index'),C=require('../../power-level/core'),F=require('../../power-level/scheduling/fresh');
function definitions(){return require('./fresh-definitions.json').map(d=>({id:'draft-fresh-'+d.key,anime:'mixed',wide:d.kind,text:d.text,category:'Documented anime metadata',predicate:d.predicate,
 note:'Specific catalogue adaptation/season and provider classification; no personal trait inference. Editorial and rights review pending.',
 eligibilityRules:{include:'Explicit '+JSON.stringify(d.predicate)+' classification of the named anime adaptation'+(d.kind==='char'?' and confirmed character appearance':'')+'.',exclude:'Missing metadata, other adaptations and inferred characteristics do not qualify. Cast credits and episode counts apply to the named entry, not its whole franchise.'},
 tooCleverCharacterIds:[],rightsStatus:'unresolved',historyStatus:'UNKNOWN'}));}
function titles(def,{catalogue,metadata,existingBank}){
 const names=new Map();for(const a of catalogue.anime)for(const f of [a.name,...a.aliases||[]]){const key=C.normalize(f);if(!names.has(key))names.set(key,new Set());names.get(key).add(a.id);}
 const answers=[],held=[];
 for(const a of catalogue.anime){const m=metadata[a.malId];if(!G.matches(def.predicate,m,{}))continue;
  if(!C.normalize(a.name)||names.get(C.normalize(a.name)).size!==1){held.push({animeId:a.id,reason:'Ambiguous adaptation title'});continue;}
  const aliases=[],withheldAliases=[],seen=new Set([C.normalize(a.name)]);for(const f of a.aliases||[]){const k=C.normalize(f);if(seen.has(k))continue;seen.add(k);if(k.length>=4&&names.get(k)?.size===1)aliases.push(f);else withheldAliases.push(f);}
  const recognition=existingBank.filter(q=>q.wide==='title').reduce((n,q)=>n+Number(q.answers.some(answer=>[answer.name,...answer.aliases||[]].some(f=>C.normalize(f)===C.normalize(a.name)))),0);
  const rarity=recognition>=2&&m.popularity<=300?10:recognition?30:m.members>=500000?60:85;
  answers.push({name:a.name,aliases,rarity,animeId:a.id,canonicalName:a.name,withheldAliases,eligibility:{predicate:def.predicate,metadataHash:G.hash(m),source:m.sourceUrl,retrievedAt:m.retrievedAt},status:'supported_candidate',editoriallyApproved:false,rarityApproved:false,rightsStatus:'unresolved',recognitionContext:recognition});
 }
 if(!answers.length)return {question:null,held,shortfall:'No supported anime entries'};
 const lb=[...answers].sort((a,b)=>a.recognitionContext-b.recognitionContext||b.rarity-a.rarity||(metadata[b.animeId.replace('mal-anime-','')]?.popularity||0)-(metadata[a.animeId.replace('mal-anime-','')]?.popularity||0)||a.animeId.localeCompare(b.animeId))[0];lb.rarity=100;
 for(const a of answers)a.proposedTier=C.grade(a).name;
 const question={...def,answers,publicationAuthorized:false,scheduledDate:null};require('../../power-level/versioning').validateBank([question],C);
 for(const a of answers)for(const f of [a.name,...a.aliases])if(C.validate(question,f).answer?.animeId!==a.animeId)throw Error('Title alias identity collision');
 return {question,held,shortfall:answers.length<150?'Below previous 150-answer target; valid limited corpus count, not padded':null};
}
function generate(input){
 const questions=[],held=[],excluded=[],counts=[];const previous=require('./questions.json');
 const known=new Set([...input.existingBank,...previous].map(F.conceptOf));
 for(const def of definitions()){
  const source=def.predicate.metadata.source;const existingSources=Object.values(require('../../power-level/scheduling/concepts.json').metadataByQuestionId).map(p=>p.metadata.source).filter(Boolean);
  if(def.wide==='title'&&source&&Object.keys(def.predicate.metadata).length===1&&existingSources.some(values=>source.every(s=>values.includes(s)))){excluded.push({id:def.id,reason:'Covered source subset of an existing production question; hold rather than pad fresh inventory'});continue;}
  const conceptId=F.conceptOf(def);if(known.has(conceptId)){excluded.push({id:def.id,reason:'Existing equivalent concept'});continue;}known.add(conceptId);
  let result;if(def.wide==='title')result=titles(def,input);
  else {const possible=input.catalogue.appearances.filter(a=>G.matches(def.predicate,input.metadata[a.animeId.replace('mal-anime-','')],a));if(!possible.length){counts.push({id:def.id,text:def.text,kind:'char',supported:0,status:'INSUFFICIENT_EVIDENCE'});continue;}
   const generated=G.generate({...input,definitions:[def]});result={question:generated.questions[0],held:generated.held};}
  held.push(...result.held);if(!result.question)continue;
  const q={...result.question,conceptId,conceptReviewed:false,noveltyStatus:'Distinct curated predicate/current inventory; historical production novelty UNKNOWN'};questions.push(q);counts.push({id:q.id,text:q.text,kind:q.wide,supported:q.answers.length,status:'DRAFT_NOT_APPROVED',shortfall:q.answers.length<150?'Limited observed corpus; no padding':null});
 }
 return {questions,held,excluded,counts,approved:0,published:0,traitQuestionBottleneck:'No new personal-trait banks generated: existing approved eligible claims are insufficient. Identity records alone do not establish roles, appearance, powers or relationships.'};
}
module.exports={definitions,titles,generate};

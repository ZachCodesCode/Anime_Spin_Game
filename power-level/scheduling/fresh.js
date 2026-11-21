'use strict';
const {repeatAssessment}=require('./performance');
const PLAN=['char','char','title','char','char','title','char'];
const date=value=>{if(!/^\d{4}-\d{2}-\d{2}$/.test(value)||new Date(value+'T00:00:00Z').toISOString().slice(0,10)!==value)throw Error('Invalid Toronto calendar date');return value;};
const ordinal=value=>Date.parse(date(value)+'T00:00:00Z')/864e5;
const daysBetween=(earlier,later)=>ordinal(later)-ordinal(earlier);
const plus=(value,n)=>new Date((ordinal(value)+n)*864e5).toISOString().slice(0,10);
function canonical(value){if(Array.isArray(value))return value.map(canonical).sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b)));if(value&&typeof value==='object')return Object.fromEntries(Object.keys(value).sort().map(k=>[k,canonical(value[k])]));return value;}
// Explicit predicate identity or bounded deterministic word rules; no live semantic AI.
function conceptOf(question){
 if(question.conceptId)return question.conceptId;
 const predicate=question.predicate||require('./concepts.json').metadataByQuestionId[question.id];
 if(predicate)return question.wide+':predicate:'+JSON.stringify(canonical(predicate));
 const words=question.text.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/red[- ]haired/g,'with red hair').replace(/\banime character\b/g,'character').replace(/\b(?:name|any|an|a)\b/g,'').replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
 if(question.wide==='char'&&['character with red hair','with red hair character'].includes(words))return 'char:appearance:hair:red';
 return (question.wide||'legacy')+':wording:'+words;
}
function plan({inventory,history=[],performance=[],pins=[],start,days=90,protectedThrough,compare,policy={},concepts={}}){
 date(start);if(!Number.isInteger(days)||days<1||days>366)throw Error('Simulation horizon must be 1–366 days');if(protectedThrough&&start<=date(protectedThrough))throw Error('Cannot replace protected production dates');
 const items=new Map();for(const item of inventory){const q=item.question;if(items.has(q.id))throw Error('Duplicate inventory ID');if(!['char','title'].includes(q.wide)||q.descent)throw Error('Only Ascent char/title inventory');const predicate=q.predicate||require('./concepts.json').metadataByQuestionId[q.id];const topicGroups=item.topicGroups||Object.entries(predicate?.metadata||{}).flatMap(([key,values])=>values.map(value=>key+':'+value));items.set(q.id,{...item,topicGroups,concept:conceptOf(q)});}
 const uses=new Map(),idUses=new Map(),repeatCounts=new Map(),stats=new Map(performance.map(s=>[s.questionId,s]));
 function record(dateValue,id,concept,source){date(dateValue);if(!uses.has(concept))uses.set(concept,[]);uses.get(concept).push({date:dateValue,questionId:id,source});if(!idUses.has(id))idUses.set(id,[]);idUses.get(id).push(dateValue);}
 for(const h of history){if(h.date>=start)throw Error('History must precede planning start');record(h.date,h.questionId,concepts[h.questionId]||items.get(h.questionId)?.concept||h.conceptId||('unknown-id:'+h.questionId),h.source||'provided_history');}
 const latest=(id,concept,on)=>{const all=[...(uses.get(concept)||[]).map(x=>x.date),...(idUses.get(id)||[])].filter(d=>d<on);return all.sort().at(-1)||null;};
 const approved=item=>item.approval==='approved'&&item.conceptReviewed===true&&item.rightsCleared===true;
 const available=(item,on)=>approved(item)&&(!item.question.since||item.question.since<=on);
 for(const [concept,events]of uses)repeatCounts.set(concept,Math.max(0,new Set(events.map(x=>x.date)).size-1));
 const rows=[];let shortage=null;
 for(let n=0;n<days;n++){
  const on=plus(start,n),prior=compare?compare(on):null;
  if(shortage){rows.push({date:on,status:'NOT_PLANNED_AFTER_SHORTAGE',production:prior,proposed:null});continue;}
  const eligible=[...items.values()].filter(i=>available(i,on)),fresh=eligible.filter(i=>!latest(i.question.id,i.concept,on)&&i.usageStatus==='never_used'),repeats=eligible.filter(i=>{const last=latest(i.question.id,i.concept,on);return last&&daysBetween(last,on)>=14&&repeatAssessment(stats.get(i.question.id),i.quality,policy).eligible;});
  fresh.sort((a,b)=>(a.priority||0)-(b.priority||0)||a.question.id.localeCompare(b.question.id));
  repeats.sort((a,b)=>{const pa=stats.get(a.question.id),pb=stats.get(b.question.id);return Math.floor(pa.wilson95.upper*10)-Math.floor(pb.wilson95.upper*10)||(repeatCounts.get(a.concept)||0)-(repeatCounts.get(b.concept)||0)||String(latest(a.question.id,a.concept,on)).localeCompare(String(latest(b.question.id,b.concept,on)))||pa.wilson95.upper-pb.wilson95.upper||a.question.id.localeCompare(b.question.id);});
  const pinMatches=pins.filter(p=>p.date===on);if(pinMatches.length>1)throw Error('Duplicate immutable date pin');
  const sameDay=(a,b)=>a.concept===b.concept||a.topicGroups.some(group=>b.topicGroups.includes(group))||(a.question.from||[]).includes(b.question.id)||(b.question.from||[]).includes(a.question.id)||(a.conflicts||[]).includes(b.concept)||(b.conflicts||[]).includes(a.concept);
  // Backtrack over slot candidates so greedy ordering cannot create a false kind/concept shortage.
  function choose(slot,chosen,repeatCount,allowRepeat){if(slot===PLAN.length)return chosen;const remaining=PLAN.slice(slot),pool=[...fresh,...(allowRepeat&&repeatCount<1?repeats:[])].filter(item=>!chosen.some(x=>sameDay(x.item,item)));for(const kind of ['char','title'])if(new Set(pool.filter(i=>i.question.wide===kind).map(i=>i.concept)).size<remaining.filter(k=>k===kind).length)return null;const kind=PLAN[slot];for(const item of pool){const repeated=!fresh.includes(item);if(item.question.wide!==kind||chosen.some(x=>sameDay(x.item,item)))continue;const found=choose(slot+1,[...chosen,{item,repeated}],repeatCount+(repeated?1:0),allowRepeat);if(found)return found;}return null;}
  let chosen;
  if(pinMatches.length){const p=pinMatches[0];chosen=p.questionIds.map(id=>{const item=items.get(id);return item?{item,repeated:Boolean(latest(id,item.concept,on))}:null;});if(chosen.some(x=>!x)||chosen.length!==7||chosen.some((x,i)=>x.item.question.wide!==PLAN[i]||x.item.bankVersion&&x.item.bankVersion!==p.bankVersion||!available(x.item,on)||x.repeated&&!repeats.includes(x.item)||!x.repeated&&!fresh.includes(x.item)||chosen.slice(0,i).some(y=>sameDay(y.item,x.item)))||chosen.filter(x=>x.repeated).length>1){shortage={date:on,reason:'IMMUTABLE_PIN_CONFLICT_WITH_NEW_POLICY',pin:p,action:'Preserve pin; block release rather than rewrite it'};rows.push({date:on,status:'BLOCKED_IMMUTABLE_PIN',production:prior,proposed:p.questionIds,shortage});continue;}}
  else chosen=choose(0,[],0,false)||choose(0,[],0,true);
  if(!chosen){const count=kind=>fresh.filter(i=>i.question.wide===kind).length,repeatCount=kind=>repeats.filter(i=>i.question.wide===kind).length;shortage={date:on,reason:'INSUFFICIENT_APPROVED_UNUSED_INVENTORY',fresh:{char:count('char'),title:count('title')},eligibleDifficultRepeats:{char:repeatCount('char'),title:repeatCount('title')},requiredSlots:{char:5,title:2},minimumFreshTotal:6,withoutEligibleRepeatRequired:{char:Math.max(0,5-count('char')),title:Math.max(0,2-count('title'))},note:'Counts are upper bounds before same-day semantic conflicts. No unrestricted LRU fallback.'};rows.push({date:on,status:'BLOCKED_SHORTAGE',production:prior,proposed:null,shortage});continue;}
  const selections=chosen.map(({item,repeated})=>{const q=item.question,last=latest(q.id,item.concept,on),s=stats.get(q.id);return {id:q.id,text:q.text,kind:q.wide,conceptId:item.concept,status:repeated?'REPEATED':'NEW',previousUsage:last,daysSincePrevious:last?daysBetween(last,on):null,completedRunSuccessPercentage:s?.successPercentage??null,reason:repeated?repeatAssessment(s,item.quality,policy).reason:'Approved unused concept; freshness priority',cooldown:'PASS',semanticDuplicate:'PASS'};});
  for(const s of selections){if(s.status==='REPEATED')repeatCounts.set(s.conceptId,(repeatCounts.get(s.conceptId)||0)+1);record(on,s.id,s.conceptId,'offline_proposal');}
  rows.push({date:on,status:'PROPOSED_NOT_PUBLISHED',selections,production:prior,proposed:selections.map(s=>s.id),changesProduction:JSON.stringify(prior)!==JSON.stringify(selections.map(s=>s.id)),slotValidation:'PASS',unusedRemaining:{char:fresh.filter(i=>i.question.wide==='char'&&!latest(i.question.id,i.concept,plus(on,1))).length,title:fresh.filter(i=>i.question.wide==='title'&&!latest(i.question.id,i.concept,plus(on,1))).length},immutablePin:pinMatches[0]||null});
 }
 return {policy:{name:'freshness-first-v1',cooldownTorontoDays:14,minimumNew:6,maximumRepeats:1,minimumRepeatSamples:policy.minSamples||50,maximumRepeatWilsonUpper:policy.maxUpper??.5},start,end:plus(start,days-1),days:rows,shortage,releaseValid:!shortage,assignmentsPublished:0};
}
function capacity(days){return {days,withoutReliableRepeats:{char:5*days,title:2*days,total:7*days},withOneQualifiedRepeatEachDay:{totalNew:6*days,charRange:[4*days,5*days],titleRange:[days,2*days],coupling:'For r character-repeat days: new char=5D-r; new title=D+r. Ranges cannot both take their minimum.'}};}
module.exports={PLAN,daysBetween,plus,conceptOf,plan,capacity};

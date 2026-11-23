(function(root){
'use strict';
const C=typeof module!=='undefined'?require('./core'):root.PowerLevelCore;
// Seven prompts a day, 30 seconds each; a question's clock starts the moment it appears.
const CONFIG={count:7,seconds:30,revealMs:1900};
// Ascent #1 (Toronto date). Each day takes the next questions from the fixed schedule.
const EPOCH='2026-11-11';
// From this ascent on, the last question each day spans two or more anime (Ascent #1 stays as it was played).
const MIX_FROM=2;
// From Ascent #3 on: seven any-anime questions a day — five about characters, two about whole shows or films.
// Append new multi-anime questions with since:'YYYY-MM-DD' (a future date) so days already played never change.
const SEVEN_FROM=3,DAY_PLAN=['char','char','title','char','char','title','char'];
const boost=answer=>C.points(answer);
const total=state=>state.outcomes.reduce((sum,o)=>sum+o.boost,0);
// Run tier follows the share of the summit reached (same bands as the results card).
const visualTier=(power,count=CONFIG.count)=>{const p=power/(count*100);return p>=1?'Limit Break':p>=.75?'Deep Cut':p>=.5?'Rare':p>=.25?'Side Character':'Fodder';};
const dayNumber=date=>Math.round((Date.parse(date+'T00:00:00Z')-Date.parse(EPOCH+'T00:00:00Z'))/864e5)+1;
// One question per anime per round, rounds in bank order. Each round rotates the anime order
// (anime as first listed in the bank) so the daily mix varies; a day never repeats an anime.
// Add questions a full round (one per anime) at a time, after the existing ones, so past and current days keep their questions.
function schedule(bank){bank=bank.filter(q=>q.anime!=='mixed');const anime=[...new Set(bank.map(q=>q.anime))],lists=anime.map(a=>bank.filter(q=>q.anime===a)),out=[];for(let r=0;r<Math.max(...lists.map(l=>l.length));r++)for(let i=0;i<lists.length;i++){const l=lists[(i+r*3)%lists.length];if(l[r])out.push(l[r]);}return out;}
// Dates follow the schedule; any other seed (tests, tools) picks a deterministic pseudo-day.
const isDate=x=>/^\d{4}-\d{2}-\d{2}$/.test(x);
const countFor=date=>isDate(date)&&dayNumber(date)<SEVEN_FROM?5:CONFIG.count;
const kindOf=q=>q.wide||null;
const dateOf=k=>new Date(Date.parse(EPOCH+'T00:00:00Z')+k*864e5).toISOString().slice(0,10);
// Each slot takes the least recently used question of its kind that doesn't reuse a list already in the day.
function general(bank,d){const pool=bank.filter(kindOf).sort((a,b)=>(a.order??1e9)-(b.order??1e9)),last=new Map(),used=x=>last.has(x.id)?last.get(x.id):-2;if(SEVEN_FROM>1)legacy(bank,SEVEN_FROM-2).forEach(id=>last.set(id,-1));let day=[];for(let k=SEVEN_FROM-1;k<=d;k++){const date=dateOf(k);day=[];for(const kind of DAY_PLAN){const ok=pool.filter(x=>kindOf(x)===kind&&(!x.since||x.since<=date)&&!day.some(y=>y===x||(y.from||[]).includes(x.id)||(x.from||[]).includes(y.id)));if(ok.length)day.push(ok.reduce((a,x)=>used(x)<used(a)?x:a));}day.forEach(x=>last.set(x.id,k));}return day.map(x=>x.id);}
function select(bank,seed){let d;if(isDate(seed))d=dayNumber(seed)-1;else{let h=2166136261;for(const c of String(seed))h=Math.imul(h^c.charCodeAt(0),16777619);d=SEVEN_FROM-1+(h>>>0)%400;}let ids=d<SEVEN_FROM-1?null:general(bank,d);if(!ids||ids.length<CONFIG.count)ids=legacy(bank,d);if(new Set(ids).size!==ids.length||ids.length<5)throw Error('Not enough unique prompts');return ids;}
function legacy(bank,d){const count=5,list=schedule(bank);const at=i=>list[((i%list.length)+list.length)%list.length],mixed=bank.filter(q=>q.anime==='mixed'&&!q.since&&q.legacy),m=d-(MIX_FROM-1),ids=[];if(m<0||!mixed.length){for(let k=0;k<count;k++)ids.push(at(d*count+k).id);}else{const base=k=>{const out=[],seen=new Set();for(let i=(MIX_FROM-1)*count+k*(count-1);out.length<count-1;i++){const x=at(i);if(!seen.has(x.anime)){seen.add(x.anime);out.push(x.id);}}return out;};const last=new Map();let pick;for(let k=0;k<=m;k++){const day=base(k);pick=mixed.filter(x=>!(x.from||[]).some(f=>day.includes(f))).reduce((a,x)=>(last.get(x.id)??-1)<(last.get(a.id)??-1)?x:a);last.set(pick.id,k);if(k===m)ids.push(...day);}ids.push(pick.id);}return ids;}
const create=(ids,date)=>({version:4,date,ids,outcomes:[],phase:'ready',opensAt:null,deadline:null,revealUntil:null});
function start(s,now){if(s.phase==='ready'){s.phase='active';s.opensAt=now;s.deadline=now+CONFIG.seconds*1000;}return s;}
// Reveals and results retain the last completed question; active play uses the next ID.
const questionIndex=s=>s.outcomes.length-(['reveal','done'].includes(s.phase)?1:0);
function resolve(s,bank,kind,value,now){if(s.phase!=='active'||now<s.opensAt)return {status:'locked'};const q=bank.find(q=>q.id===s.ids[questionIndex(s)]);if(now>=s.deadline)kind='timeout';let answer=null;if(kind==='answer'){const result=C.validate(q,value);if(result.status!=='valid')return result;answer=result.answer;}if(!['answer','skip','timeout'].includes(kind))return {status:'invalid'};const outcome={id:q.id,kind,answer:answer?.name||null,tier:answer?C.grade(answer).name:null,boost:answer?boost(answer):0};s.outcomes.push(outcome);s.phase='reveal';s.opensAt=null;s.deadline=null;s.revealUntil=now+CONFIG.revealMs;return {status:'resolved',outcome};}
function advance(s){if(s.phase==='reveal'){s.phase=s.outcomes.length===s.ids.length?'done':'ready';s.revealUntil=null;}return s;}
function restore(raw,bank,date,expectedIds){try{const s=JSON.parse(raw);if(s.version!==4||s.date!==date||!Array.isArray(s.ids)||![5,7].includes(s.ids.length)||new Set(s.ids).size!==s.ids.length||s.ids.some(id=>!bank.some(q=>q.id===id))||expectedIds&&s.ids.join()!==expectedIds.join()||!Array.isArray(s.outcomes)||s.outcomes.length>s.ids.length) return null;const clean=create(s.ids,date);for(let i=0;i<s.outcomes.length;i++){const o=s.outcomes[i],q=bank.find(q=>q.id===s.ids[i]);if(o.id!==q.id||!['answer','skip','timeout'].includes(o.kind))return null;const a=o.kind==='answer'?q.answers.find(a=>a.name===o.answer):null;if(o.kind==='answer'&&!a)return null;clean.outcomes.push({id:q.id,kind:o.kind,answer:a?.name||null,submitted:a?(typeof o.submitted==='string'?o.submitted.slice(0,100):a.name):null,tier:a?C.grade(a).name:null,boost:a?boost(a):0});}if(!['ready','active','reveal','done'].includes(s.phase)||s.phase==='done'&&clean.outcomes.length!==s.ids.length||clean.outcomes.length===s.ids.length&&!['done','reveal'].includes(s.phase)||s.phase==='reveal'&&!clean.outcomes.length)return null;if(s.phase==='active'&&(!Number.isFinite(s.deadline)||!Number.isFinite(s.opensAt)||s.deadline-s.opensAt!==CONFIG.seconds*1000)||s.phase==='reveal'&&!Number.isFinite(s.revealUntil))return null;clean.phase=s.phase;clean.opensAt=s.phase==='active'?s.opensAt:null;clean.deadline=s.phase==='active'?s.deadline:null;clean.revealUntil=s.phase==='reveal'?s.revealUntil:null;return clean;}catch{return null;}}
// A perfect run (100 per question) reaches the 5,000 m summit.
const MOUNTAIN={summit:5000,worldHeight:2400,baseY:2250,summitY:200};
function maximum(state,bank){return state.ids.reduce((sum,id)=>sum+Math.max(...bank.find(q=>q.id===id).answers.map(boost)),0);}
function climb(power,maxPower){const progress=Math.max(0,Math.min(1,power/maxPower));return {progress,altitude:Math.round(progress*MOUNTAIN.summit),y:MOUNTAIN.baseY-progress*(MOUNTAIN.baseY-MOUNTAIN.summitY)};}
const api={questionIndex,MOUNTAIN,EPOCH,maximum,climb,CONFIG,boost,total,visualTier,dayNumber,countFor,schedule,select,create,start,resolve,advance,restore};if(typeof module!=='undefined')module.exports=api;else root.PowerLevelRun=api;
})(globalThis);

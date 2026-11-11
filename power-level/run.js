(function(root){
'use strict';
const C=typeof module!=='undefined'?require('./core'):root.PowerLevelCore;
// Five prompts a day. Each clock starts after a short countdown with the prompt already on screen.
const CONFIG={count:5,seconds:30,countdownMs:3000,revealMs:1900};
// Ascent #1 (Toronto date). Each day takes the next five questions from the fixed schedule.
const EPOCH='2026-11-11';
const boost=answer=>C.points(answer);
const total=state=>state.outcomes.reduce((sum,o)=>sum+o.boost,0);
// Run tier follows the share of the summit reached (same bands as the results card).
const visualTier=power=>{const p=power/(CONFIG.count*100);return p>=1?'Limit Break':p>=.75?'Deep Cut':p>=.5?'Rare':p>=.25?'Side Character':'Fodder';};
const dayNumber=date=>Math.round((Date.parse(date+'T00:00:00Z')-Date.parse(EPOCH+'T00:00:00Z'))/864e5)+1;
// One question per anime per round, rounds in bank order. Each round rotates the anime order
// (anime as first listed in the bank) so the daily mix varies; a day never repeats an anime.
// Add questions a full round (one per anime) at a time, after the existing ones, so past and current days keep their questions.
function schedule(bank){const anime=[...new Set(bank.map(q=>q.anime))],lists=anime.map(a=>bank.filter(q=>q.anime===a)),out=[];for(let r=0;r<Math.max(...lists.map(l=>l.length));r++)for(let i=0;i<lists.length;i++){const l=lists[(i+r*3)%lists.length];if(l[r])out.push(l[r]);}return out;}
// Dates follow the schedule; any other seed (tests, tools) picks a deterministic pseudo-day.
function select(bank,seed){const list=schedule(bank);let d;if(/^\d{4}-\d{2}-\d{2}$/.test(seed))d=dayNumber(seed)-1;else{let h=2166136261;for(const c of String(seed))h=Math.imul(h^c.charCodeAt(0),16777619);d=(h>>>0)%100000;}const ids=[];for(let k=0;k<CONFIG.count;k++)ids.push(list[(((d*CONFIG.count+k)%list.length)+list.length)%list.length].id);if(new Set(ids).size<CONFIG.count)throw Error('Need five unique prompts');return ids;}
const create=(ids,date)=>({version:4,date,ids,outcomes:[],phase:'ready',opensAt:null,deadline:null,revealUntil:null});
function start(s,now){if(s.phase==='ready'){s.phase='active';s.opensAt=now+CONFIG.countdownMs;s.deadline=s.opensAt+CONFIG.seconds*1000;}return s;}
function resolve(s,bank,kind,value,now){if(s.phase!=='active'||now<s.opensAt)return {status:'locked'};const q=bank.find(q=>q.id===s.ids[s.outcomes.length]);if(now>=s.deadline)kind='timeout';let answer=null;if(kind==='answer'){const result=C.validate(q,value);if(result.status!=='valid')return result;answer=result.answer;}if(!['answer','skip','timeout'].includes(kind))return {status:'invalid'};const outcome={id:q.id,kind,answer:answer?.name||null,tier:answer?C.grade(answer).name:null,boost:answer?boost(answer):0};s.outcomes.push(outcome);s.phase='reveal';s.opensAt=null;s.deadline=null;s.revealUntil=now+CONFIG.revealMs;return {status:'resolved',outcome};}
function advance(s){if(s.phase==='reveal'){s.phase=s.outcomes.length===CONFIG.count?'done':'ready';s.revealUntil=null;}return s;}
function restore(raw,bank,date,expectedIds){try{const s=JSON.parse(raw);if(s.version!==4||s.date!==date||!Array.isArray(s.ids)||s.ids.length!==5||new Set(s.ids).size!==5||s.ids.some(id=>!bank.some(q=>q.id===id))||expectedIds&&s.ids.join()!==expectedIds.join()||!Array.isArray(s.outcomes)||s.outcomes.length>5) return null;const clean=create(s.ids,date);for(let i=0;i<s.outcomes.length;i++){const o=s.outcomes[i],q=bank.find(q=>q.id===s.ids[i]);if(o.id!==q.id||!['answer','skip','timeout'].includes(o.kind))return null;const a=o.kind==='answer'?q.answers.find(a=>a.name===o.answer):null;if(o.kind==='answer'&&!a)return null;clean.outcomes.push({id:q.id,kind:o.kind,answer:a?.name||null,submitted:a?(typeof o.submitted==='string'?o.submitted.slice(0,100):a.name):null,tier:a?C.grade(a).name:null,boost:a?boost(a):0});}if(!['ready','active','reveal','done'].includes(s.phase)||s.phase==='done'&&clean.outcomes.length!==5||clean.outcomes.length===5&&!['done','reveal'].includes(s.phase)||s.phase==='reveal'&&!clean.outcomes.length)return null;if(s.phase==='active'&&(!Number.isFinite(s.deadline)||!Number.isFinite(s.opensAt)||s.deadline-s.opensAt!==CONFIG.seconds*1000)||s.phase==='reveal'&&!Number.isFinite(s.revealUntil))return null;clean.phase=s.phase;clean.opensAt=s.phase==='active'?s.opensAt:null;clean.deadline=s.phase==='active'?s.deadline:null;clean.revealUntil=s.phase==='reveal'?s.revealUntil:null;return clean;}catch{return null;}}
// Every point climbs 10 m: a perfect run (100 per question) reaches the 5,000 m summit.
const MOUNTAIN={summit:5000,worldHeight:2400,baseY:2250,summitY:200};
function maximum(state,bank){return state.ids.reduce((sum,id)=>sum+Math.max(...bank.find(q=>q.id===id).answers.map(boost)),0);}
function climb(power,maxPower){const progress=Math.max(0,Math.min(1,power/maxPower));return {progress,altitude:Math.round(progress*MOUNTAIN.summit),y:MOUNTAIN.baseY-progress*(MOUNTAIN.baseY-MOUNTAIN.summitY)};}
const api={MOUNTAIN,EPOCH,maximum,climb,CONFIG,boost,total,visualTier,dayNumber,schedule,select,create,start,resolve,advance,restore};if(typeof module!=='undefined')module.exports=api;else root.PowerLevelRun=api;
})(globalThis);

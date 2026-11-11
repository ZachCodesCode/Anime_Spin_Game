(function(root){
'use strict';
// Krillion-style answer tiers with fixed points. "Too Clever" is the go-to obscure pick that
// everyone reaches for: it's flagged per question and scores below an ordinary side character.
const TIERS = [{name:'Fodder',points:10},{name:'Too Clever',points:15},{name:'Side Character',points:30},{name:'Rare',points:60},{name:'Deep Cut',points:85},{name:'Limit Break',points:100}];
const grade = answer => answer.clever ? TIERS[1] : TIERS[answer.rarity>=100?5:answer.rarity>=75?4:answer.rarity>=45?3:answer.rarity>=20?2:0];
const points = answer => grade(answer).points;
// Tier name for a points value; in-between values (run averages) round down, skipping Too Clever.
const tier = value => (TIERS.find(t=>t.points===value) || [...TIERS].reverse().find(t=>t.name!=='Too Clever'&&value>=t.points) || TIERS[0]).name;
const normalize = value => String(value).normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');
const words = value => String(value).normalize('NFKD').replace(/[̀-ͯ]/g,'').toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
const dateKey = (date=new Date()) => new Intl.DateTimeFormat('en-CA',{timeZone:'America/Toronto',year:'numeric',month:'2-digit',day:'2-digit'}).format(date);
function daily(bank,date=dateKey()){let hash=2166136261;for(const c of date) hash=Math.imul(hash^c.charCodeAt(0),16777619);return bank[(hash>>>0)%bank.length];}
function distance(a,b){let row=Array.from({length:b.length+1},(_,i)=>i);for(let i=1;i<=a.length;i++){const next=[i];for(let j=1;j<=b.length;j++)next[j]=Math.min(next[j-1]+1,row[j]+1,row[j-1]+(a[i-1]!==b[j-1]));row=next;}return row[b.length];}
function validate(question,value,guesses=[]){
const n=normalize(value),forms=a=>[a.name,...(a.aliases||[])];
const typed=words(value),partial=typed.length&&typed.every(w=>w.length>=3)?question.answers.filter(a=>forms(a).some(v=>{const parts=words(v);return typed.every(w=>parts.includes(w));})):[];
const answer=question.answers.find(a=>forms(a).some(v=>normalize(v)===n))||(partial.length===1?partial[0]:null);
if(answer)return {status:guesses.includes(answer.name)?'repeat':'valid',answer};
// A shared family name fits several answers, and listing them would give away the rare ones.
if(partial.length>1)return {status:'ambiguous',suggestions:[]};
const ranked=n.length<4?[]:question.answers.map(answer=>{let best=Infinity;for(const form of forms(answer)){const f=normalize(form),length=Math.max(n.length,f.length),d=distance(n,f),limit=length<=5?1:length<=10?2:3;if(d<=limit&&d/length<=.23&&Math.abs(n.length-f.length)<=limit)best=Math.min(best,d/length);}return {answer,rank:best};}).filter(v=>Number.isFinite(v.rank)).sort((a,b)=>a.rank-b.rank);
const suggestions=ranked.filter(v=>v.rank<=ranked[0].rank+.045).slice(0,3).map(v=>v.answer);
return {status:'invalid',suggestions};
}
function restore(raw,q,date){const empty={date,questionId:q.id,guesses:[],done:false};try{const s=JSON.parse(raw);if(s.date!==date||s.questionId!==q.id||!Array.isArray(s.guesses)||typeof s.done!=='boolean'||s.guesses.length>5)return empty;const guesses=[];for(const n of s.guesses){if(typeof n!=='string'||validate(q,n,guesses).status!=='valid')return empty;guesses.push(n);}return {...empty,guesses,done:s.done||guesses.length===5||guesses.some(n=>points(q.answers.find(a=>a.name===n))===Math.max(...q.answers.map(points)))};}catch{return empty;}}
function practice(bank,anime,previous,random=Math.random){const pool=bank.filter(q=>anime==='all'||q.anime===anime);const choices=pool.filter(q=>q.id!==previous);return (choices.length?choices:pool)[Math.floor(random()*(choices.length||pool.length))];}
const api={TIERS,grade,points,tier,normalize,dateKey,daily,validate,restore,practice};if(typeof module!=='undefined')module.exports=api;else root.PowerLevelCore=api;
})(globalThis);

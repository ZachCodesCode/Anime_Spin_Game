(function(root){
'use strict';
const TIERS = [{min:1,name:'Common'},{min:2000,name:'Uncommon'},{min:4000,name:'Rare'},{min:7000,name:'Legendary'},{min:10000,name:'Limit Break'}];
const score = rarity => Math.round(1 + Math.max(0,Math.min(100,rarity))*9999/100);
const tier = value => [...TIERS].reverse().find(t=>value>=t.min)?.name || 'Common';
const normalize = value => String(value).normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');
const dateKey = (date=new Date()) => new Intl.DateTimeFormat('en-CA',{timeZone:'America/Toronto',year:'numeric',month:'2-digit',day:'2-digit'}).format(date);
function daily(bank,date=dateKey()){let hash=2166136261;for(const c of date) hash=Math.imul(hash^c.charCodeAt(0),16777619);return bank[(hash>>>0)%bank.length];}
function distance(a,b){let row=Array.from({length:b.length+1},(_,i)=>i);for(let i=1;i<=a.length;i++){const next=[i];for(let j=1;j<=b.length;j++)next[j]=Math.min(next[j-1]+1,row[j]+1,row[j-1]+(a[i-1]!==b[j-1]));row=next;}return row[b.length];}
function validate(question,value,guesses=[]){
const n=normalize(value),forms=a=>[a.name,...(a.aliases||[])];
const answer=question.answers.find(a=>forms(a).some(v=>normalize(v)===n));
if(answer)return {status:guesses.includes(answer.name)?'repeat':'valid',answer};
const ranked=n.length<4?[]:question.answers.map(answer=>{let best=Infinity;for(const form of forms(answer)){const f=normalize(form),length=Math.max(n.length,f.length),d=distance(n,f),limit=length<=5?1:length<=10?2:3;if(d<=limit&&d/length<=.23&&Math.abs(n.length-f.length)<=limit)best=Math.min(best,d/length);}return {answer,rank:best};}).filter(v=>Number.isFinite(v.rank)).sort((a,b)=>a.rank-b.rank);
const suggestions=ranked.filter(v=>v.rank<=ranked[0].rank+.045).slice(0,3).map(v=>v.answer);
return {status:'invalid',suggestions};
}
function restore(raw,q,date){const empty={date,questionId:q.id,guesses:[],done:false};try{const s=JSON.parse(raw);if(s.date!==date||s.questionId!==q.id||!Array.isArray(s.guesses)||typeof s.done!=='boolean'||s.guesses.length>5)return empty;const guesses=[];for(const n of s.guesses){if(typeof n!=='string'||validate(q,n,guesses).status!=='valid')return empty;guesses.push(n);}return {...empty,guesses,done:s.done||guesses.length===5||guesses.some(n=>score(q.answers.find(a=>a.name===n).rarity)===Math.max(...q.answers.map(a=>score(a.rarity))))};}catch{return empty;}}
function practice(bank,anime,previous,random=Math.random){const pool=bank.filter(q=>anime==='all'||q.anime===anime);const choices=pool.filter(q=>q.id!==previous);return (choices.length?choices:pool)[Math.floor(random()*(choices.length||pool.length))];}
const api={TIERS,score,tier,normalize,dateKey,daily,validate,restore,practice};if(typeof module!=='undefined')module.exports=api;else root.PowerLevelCore=api;
})(globalThis);

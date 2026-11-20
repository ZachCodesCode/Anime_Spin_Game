/* Anime Descent: the reverse of Ascent. Name the MOST common answer.
   It reuses the Ascent engine by flipping each answer's rarity, so the usual tiers, timer and results all work:
   the single most obvious answer per question scores 100, obscure picks barely count.
   Launch scores are our curated ratings flipped; the picks players make are stored so questions can later
   be re-scored from real pick rates once they have enough plays. */
(function(root){
'use strict';
const R=typeof module!=='undefined'?require('./run'):root.PowerLevelRun;
// Anime Descent #1 (Toronto date).
const EPOCH='2026-11-20';
// Descent names for the shared tier keys (keys stay the same so colours and squares still work).
const NAMES={'Limit Break':'Top Answer','Deep Cut':'Crowd Favourite','Rare':'Popular','Side Character':'Niche','Fodder':'Obscure','Too Clever':'Obscure'};
// Flipped rarity: the first-listed most common answer becomes the one 100; then common → 80 (85 pts), mid → 50 (60 pts),
// rare → 25 (30 pts), deep cuts and the Ascent Limit Break → 5 (10 pts).
const flip=r=>r<20?80:r<45?50:r<75?25:5;
// Descent has its own questions (q.descent = 'char' | 'title', defined in questions.js) that Ascent never schedules.
// Each names its Top Answer in q.top; without one, the first-listed most common answer is used.
const kindOf=q=>q.descent||null;
function question(q){const min=Math.min(...q.answers.map(a=>a.rarity)),pick=q.top,top=pick?q.answers.find(a=>a.name===pick):q.answers.find(a=>a.rarity===min);
 if(!top)throw Error('Unknown Descent top answer for '+q.id+': '+pick);
 return {...q,answers:q.answers.map(a=>{const rarity=a===top?100:flip(a.rarity);return a.aliases?{name:a.name,aliases:a.aliases,rarity}:{name:a.name,rarity};})};}
const cache=new WeakMap();
function bank(src){if(!cache.has(src))cache.set(src,src.map(q=>q.descent?question(q):q));return cache.get(src);}
const dayNumber=date=>Math.round((Date.parse(date+'T00:00:00Z')-Date.parse(EPOCH+'T00:00:00Z'))/864e5)+1;
// Seven a day from Descent's own questions (five character, two "thing"), least recently used first, in bank order.
// Append new Descent questions with since:'YYYY-MM-DD' (a future date) so days already played never change.
function select(src,date){const k0=R.dayNumber(EPOCH)-1,d=Math.max(k0,R.dayNumber(date)-1),
 pool=src.filter(kindOf),last=new Map(),used=x=>last.has(x.id)?last.get(x.id):-1;let day=[];
 for(let k=k0;k<=d;k++){const on=R.dateOf(k);day=[];
  for(const kind of R.DAY_PLAN){const ok=pool.filter(x=>kindOf(x)===kind&&(!x.since||x.since<=on)&&!day.includes(x));
   if(ok.length)day.push(ok.reduce((a,x)=>used(x)<used(a)?x:a));}
  day.forEach(x=>last.set(x.id,k));}
 const ids=day.map(x=>x.id);if(ids.length!==R.CONFIG.count||new Set(ids).size!==ids.length)throw Error('Not enough Descent prompts');return ids;}
const api={kindOf,EPOCH,NAMES,bank,select,dayNumber,flip};if(typeof module!=='undefined')module.exports=api;else root.PowerLevelDescent=api;
})(globalThis);

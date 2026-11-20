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
// The Top Answer is the first-listed most common answer unless set here (question id without 'timed-v4-').
const TOP={'mix-masks':'Kakashi Hatake','mix-glasses':'Satoru Gojo','mix-companions':'Pikachu','mix-royalty':'Vegeta','mix-twins':'Rem',
 'wide-starters':'Pikachu','wide-eyepatch':'Ken Kaneki','wide-ice':'Shoto Todoroki','wide-wind':'Temari','wide-guns':'Spike Spiegel','wide-ponytails':'Shikamaru Nara'};
function question(q){const min=Math.min(...q.answers.map(a=>a.rarity)),pick=TOP[q.id.replace('timed-v4-','')],top=pick?q.answers.find(a=>a.name===pick):q.answers.find(a=>a.rarity===min);
 if(!top)throw Error('Unknown Descent top answer for '+q.id+': '+pick);
 return {...q,answers:q.answers.map(a=>{const rarity=a===top?100:flip(a.rarity);return a.aliases?{name:a.name,aliases:a.aliases,rarity}:{name:a.name,rarity};})};}
const cache=new WeakMap();
function bank(src){if(!cache.has(src))cache.set(src,src.map(q=>q.wide?question(q):q));return cache.get(src);}
const dayNumber=date=>Math.round((Date.parse(date+'T00:00:00Z')-Date.parse(EPOCH+'T00:00:00Z'))/864e5)+1;
// Its own seven a day (same five-character, two-title shape), never using a question from the previous, same or
// next day's Ascent, and least-recently-used across Descent days. Questions with a future since date wait as in Ascent.
function select(src,date){const k0=R.dayNumber(EPOCH)-1,d=Math.max(k0,R.dayNumber(date)-1),hist=R.history(src,d+1),
 pool=src.filter(R.kindOf).sort((a,b)=>(a.order??1e9)-(b.order??1e9)),last=new Map(),used=x=>last.has(x.id)?last.get(x.id):-1;let day=[];
 for(let k=k0;k<=d;k++){const on=R.dateOf(k),block=new Set([...(hist[k-1]||[]),...(hist[k]||[]),...(hist[k+1]||[])]);day=[];
  for(const kind of R.DAY_PLAN){const ok=pool.filter(x=>R.kindOf(x)===kind&&(!x.since||x.since<=on)&&!block.has(x.id)&&!day.some(y=>y===x||(y.from||[]).includes(x.id)||(x.from||[]).includes(y.id)));
   if(ok.length)day.push(ok.reduce((a,x)=>used(x)<used(a)?x:a));}
  day.forEach(x=>last.set(x.id,k));}
 const ids=day.map(x=>x.id);if(ids.length!==R.CONFIG.count||new Set(ids).size!==ids.length)throw Error('Not enough Descent prompts');return ids;}
const api={TOP,EPOCH,NAMES,bank,select,dayNumber,flip};if(typeof module!=='undefined')module.exports=api;else root.PowerLevelDescent=api;
})(globalThis);

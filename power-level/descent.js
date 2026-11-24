/* Anime Descent: the reverse of Ascent. Name the MOST common answer.
   It reuses the Ascent engine by flipping each answer's rarity, so the usual tiers, timer and results all work:
   the single most obvious answer per question scores 100, obscure picks barely count.
   Launch scores are our curated ratings flipped; the picks players make are stored so questions can later
   be re-scored from real pick rates once they have enough plays. */
(function(root){
'use strict';
const R=typeof module!=='undefined'?require('./run'):root.PowerLevelRun;
const A=typeof module!=='undefined'?require('./descent-assignments'):root.PowerLevelDescentAssignments;
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
const dayMs=864e5;
const daysBetween=(a,b)=>Math.round((Date.parse(b+'T00:00:00Z')-Date.parse(a+'T00:00:00Z'))/dayMs);
const conceptOf=q=>q.conceptId||q.id;
const sameConcept=(a,b)=>conceptOf(a)===conceptOf(b)||a.text.trim().toLowerCase()===b.text.trim().toLowerCase();
function reuseEligible(record,policy=A.policy){return !!record&&typeof record.approvedBy==='string'&&record.approvedBy.trim()&&
 typeof record.reviewedAt==='string'&&record.reviewedAt.trim()&&typeof record.evidence==='string'&&record.evidence.trim()&&
 Number.isInteger(record.runs)&&record.runs>=policy.minRuns&&
 Number.isFinite(record.acceptedRate)&&record.acceptedRate>=0&&record.acceptedRate<=1&&
 Number.isFinite(record.topRate)&&record.topRate>=0&&record.topRate<=1&&
 (record.acceptedRate<=policy.maxAcceptedRate||record.topRate<=policy.maxTopRate);}
function validate(src,date,config=A){
 const errors=[],ids=config.assignments[date],pool=src.filter(kindOf),byId=new Map(pool.map(q=>[q.id,q]));
 if(byId.size!==pool.length)errors.push('Duplicate Descent question ID in bank');
 if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||!Number.isFinite(Date.parse(date+'T00:00:00Z')))errors.push('Invalid date');
 if(!Array.isArray(ids)){errors.push('Missing assignment for '+date);return {date,ids:[],questions:[],errors,ready:false};}
 if(ids.length!==7)errors.push('Expected exactly seven questions');
 const seenIds=new Set(),seenConcepts=new Set(),counts={char:0,title:0};
 const questions=ids.map(id=>byId.get(id));
 ids.forEach((id,i)=>{const q=questions[i];if(seenIds.has(id))errors.push('Duplicate question ID: '+id);seenIds.add(id);
  if(!q){errors.push('Unknown Descent question: '+id);return;}
  if(!['char','title'].includes(q.descent))errors.push('Invalid question kind: '+id);else counts[q.descent]++;
  if(!id.startsWith('timed-v4-descent-')&&(typeof q.conceptId!=='string'||!q.conceptId.trim()))errors.push('Missing concept ID: '+id);
  const concept=conceptOf(q);if(seenConcepts.has(concept)||questions.slice(0,i).some(other=>other&&sameConcept(other,q)))errors.push('Semantic duplicate on '+date+': '+concept);seenConcepts.add(concept);
  if(!q.top||!Array.isArray(q.answers)||q.answers.filter(a=>a.name===q.top).length!==1)errors.push('Invalid Top Answer: '+id);
  if(!Array.isArray(q.answers)||!q.answers.length)errors.push('Missing accepted answers: '+id);
  else if(date>'2026-11-24'&&!id.startsWith('timed-v4-descent-')){const forms=new Set();for(const answer of q.answers)for(const form of [answer.name,...(answer.aliases||[])]){const key=form.trim().toLowerCase();if(forms.has(key))errors.push('Duplicate answer or alias: '+id+' / '+form);forms.add(key);}}
  if(Array.isArray(q.answers)&&!id.startsWith('timed-v4-descent-')&&!q.answers.every(a=>Array.isArray(a.aliases)))errors.push('Missing aliases array: '+id);
  if(q.since&&q.since>date)errors.push('Question unavailable before '+q.since+': '+id);
 });
 if(counts.char!==5||counts.title!==2)errors.push('Expected five character and two title questions; got '+counts.char+'/'+counts.title);
 for(const [previous,priorIds] of Object.entries(config.assignments)){
  if(date<='2026-11-24')break; // Preserve the original live schedule, including its November 24 repeat.
  if(previous>=date||!Array.isArray(priorIds))continue;
  for(const oldId of priorIds){const old=byId.get(oldId);if(!old)continue;
   for(let i=0;i<ids.length;i++){const q=questions[i];if(!q||!sameConcept(old,q))continue;
    const gap=daysBetween(previous,date);if(gap<=14)errors.push('Cooldown: '+q.id+' repeats concept '+conceptOf(q)+' from '+previous+'; earliest '+new Date(Date.parse(previous+'T00:00:00Z')+15*dayMs).toISOString().slice(0,10));
    else if(!reuseEligible(config.reuse?.[date]?.[q.id],config.policy))errors.push('Reuse needs approved difficulty evidence: '+q.id);
   }
  }
 }
 return {date,ids,questions,errors,ready:errors.length===0};
}
function select(src,date){const result=validate(src,date);if(!result.ready)throw Error(result.errors.join('; '));return result.ids.slice();}
const api={kindOf,EPOCH,NAMES,bank,select,validate,reuseEligible,daysBetween,conceptOf,dayNumber,flip};if(typeof module!=='undefined')module.exports=api;else root.PowerLevelDescent=api;
})(globalThis);

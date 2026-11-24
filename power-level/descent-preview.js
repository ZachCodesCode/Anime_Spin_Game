#!/usr/bin/env node
// Offline editorial preview. Optional --runs points to a private JSON export of
// descent_scores rows: [{day,guest,answers}] with canonical answer names/null.
const fs=require('node:fs');
const C=require('./core'),D=require('./descent'),A=require('./descent-assignments'),bank=[...require('./questions'),...require('./descent-questions')];
const args=process.argv.slice(2),flag=name=>{const i=args.indexOf(name);return i<0?null:args[i+1];};
const today=C.dateKey();
const date=flag('--date')||new Date(Date.parse(today+'T00:00:00Z')+864e5).toISOString().slice(0,10);
const result=D.validate(bank,date),issues=[...result.errors];
console.log(`Anime Descent assignment: ${date}`);
if(!result.ids.length)console.log('No assignment found.');
for(let i=0;i<result.ids.length;i++){
 const q=result.questions[i];console.log(`${i+1}. ${q?q.text:'UNKNOWN '+result.ids[i]} | ${q?.descent||'?'} | ${q?.answers?.length||0} accepted answers | ${q?.conceptId||'no concept ID'}`);
}
const runFile=flag('--runs');
if(runFile){
 const rows=JSON.parse(fs.readFileSync(runFile,'utf8'));
 if(!Array.isArray(rows))throw Error('Run export must be an array');
 const unique=new Map();
 for(const row of rows){if(typeof row.day!=='string'||typeof row.guest!=='string')continue;const key=row.day+'|'+row.guest;if(unique.has(key)){issues.push('Duplicate player run in export: '+key);continue;}let answers=row.answers;try{if(typeof answers==='string')answers=JSON.parse(answers);}catch{}if(Array.isArray(answers))unique.set(key,{day:row.day,answers});}
 for(const [id,approval] of Object.entries(A.reuse[date]||{})){
  const q=bank.find(q=>q.id===id);if(!q){issues.push('Unknown reuse question: '+id);continue;}
  let runs=0,accepted=0,top=0;
  for(const row of unique.values()){const ids=A.assignments[row.day];if(!ids||row.answers.length!==7)continue;
   const index=ids.findIndex(oldId=>{const old=bank.find(x=>x.id===oldId);return old&&(D.conceptOf(old)===D.conceptOf(q)||old.text.trim().toLowerCase()===q.text.trim().toLowerCase());});
   if(index<0)continue;const old=bank.find(x=>x.id===ids[index]);runs++;const answer=row.answers[index];
   if(answer!=null&&old.answers.some(a=>a.name===answer)){accepted++;if(answer===old.top)top++;}}
  const acceptedRate=runs?accepted/runs:0,topRate=runs?top/runs:0;
  console.log(`Reuse ${id}: ${runs} unique runs, accepted ${(acceptedRate*100).toFixed(1)}%, Top Answer ${(topRate*100).toFixed(1)}%`);
  if(approval.runs!==runs||Math.abs(approval.acceptedRate-acceptedRate)>0.000001||Math.abs(approval.topRate-topRate)>0.000001)issues.push('Reuse evidence does not match exported runs: '+id);
 }
}
for(const error of issues)console.error('ISSUE: '+error);
console.log(issues.length?'NOT READY FOR RELEASE':'READY FOR RELEASE');
process.exitCode=issues.length?1:0;

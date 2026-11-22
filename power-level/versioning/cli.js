'use strict';
const fs=require('node:fs');
const path=require('node:path');
const V=require('./index');
const [command,input]=process.argv.slice(2);
try {
  if(command==='publish') {
    if(!input)throw Error('Provide a reviewed bank JSON path');
    console.log(V.publish(JSON.parse(fs.readFileSync(input))));
  } else if(command==='assign') {
    if(!input)throw Error('Provide a future assignment JSON path');
    const file=path.join(__dirname,'assignments.json'),lock=file+'.lock';
    const handle=fs.openSync(lock,'wx');
    try {
      const updated=V.assign(JSON.parse(fs.readFileSync(file)),JSON.parse(fs.readFileSync(input)));
      fs.writeFileSync(file+'.tmp',JSON.stringify(updated,null,2)+'\n');fs.renameSync(file+'.tmp',file);
    } finally {fs.closeSync(handle);fs.unlinkSync(lock);}
  } else if(command==='release-check') {
    const plan=require('./release-plan.json'),assignments=require('./assignments.json');
    for(const day of plan.dates){const actual=assignments.filter(a=>a.date===day.date);if(actual.length!==1)throw Error('RELEASE BLOCKED: no reviewed immutable assignment for '+day.date);const p=V.resolve(day.date,{enabled:true}).payload;if(JSON.stringify(p.questionIds)!==JSON.stringify(day.questions.map(q=>q.id)))throw Error('Release order differs from reviewed plan');if(day.questions.some(q=>!q.contentReviewed||!q.rarityApproved||!q.rightsCleared||!q.noveltyReviewed))throw Error('RELEASE BLOCKED: content, rarity, rights and novelty review incomplete');}
    console.log('Target assignments present; verify actual maintainer receipts and hosted staging before activation.');
  } else if(command==='check') {
    for(const version of fs.readdirSync(path.join(__dirname,'releases')).filter(v=>/^[a-f0-9]{64}$/.test(v)))V.load(version);
    const assignments=require('./assignments.json');
    if(new Set(assignments.map(a=>a.date)).size!==assignments.length)throw Error('Duplicate assignment date');
    for(const a of assignments)V.resolve(a.date,{enabled:true});
    console.log('Release hashes and assignments valid. This check does not inspect or change deployment activation.');
  } else throw Error('Commands: publish BANK.json, assign ASSIGNMENT.json, check, release-check');
} catch(error){console.error(error.message);process.exitCode=1;}

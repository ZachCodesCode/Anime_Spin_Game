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
    // Browser-first content gate. Immutable assignment tables are not a release prerequisite.
    const plan=require('./release-plan.json'),bank=require('../questions'),R=require('../run');
    for(const day of plan.dates){
      if(day.questions.some(q=>!q.contentReviewed||!q.rarityApproved||!q.rightsCleared||!q.noveltyReviewed))throw Error('RELEASE BLOCKED: content, rarity, rights and novelty review incomplete for '+day.date);
      const ids=day.questions.map(q=>q.id);
      if(ids.some(id=>!bank.some(q=>q.id===id))||JSON.stringify(R.select(bank,day.date))!==JSON.stringify(ids))throw Error('RELEASE BLOCKED: reviewed browser bank/order not integrated for '+day.date);
    }
    console.log('Reviewed browser-first content/order present; actual maintainer receipts and release review still required.');
  } else if(command==='check') {
    for(const version of fs.readdirSync(path.join(__dirname,'releases')).filter(v=>/^[a-f0-9]{64}$/.test(v)))V.load(version);
    const assignments=require('./assignments.json');
    if(new Set(assignments.map(a=>a.date)).size!==assignments.length)throw Error('Duplicate assignment date');
    for(const a of assignments)V.resolve(a.date,{enabled:true});
    console.log('Release hashes and assignments valid. This check does not inspect or change deployment activation.');
  } else throw Error('Commands: publish BANK.json, assign ASSIGNMENT.json, check, release-check');
} catch(error){console.error(error.message);process.exitCode=1;}

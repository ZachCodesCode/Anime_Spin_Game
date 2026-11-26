const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),vm=require('node:vm');
const V=require('./versioning'),runtime=require('./versioning/runtime');
const bank=require('./questions'),C=require('./core'),R=require('./run');
const version=require('./versioning/legacy.json').bankVersion;
function assignment(day='2026-11-20'){return {date:day,bankVersion:version,questionIds:R.select(bank,day)};}
function enabled(day){return {enabled:true,assignments:[assignment(day)]};}
test('legacy snapshot exactly preserves questions, names, aliases and every score',()=>{
 const frozen=V.load(version);assert.equal(frozen.bank.length,bank.length);
 for(let i=0;i<bank.length;i++){
  const q=bank[i],old=frozen.bank[i];assert.deepEqual(old,{...JSON.parse(JSON.stringify(q)),answers:JSON.parse(JSON.stringify(q.answers.slice(0,old.answers.length)))});
  for(const a of old.answers){assert.equal(frozen.core.points(a),C.points(a));for(const name of [a.name,...a.aliases||[]])assert.equal(frozen.core.validate(old,name).answer.name,a.name);}
 }
 assert.equal(Object.isFrozen(frozen.bank[0].answers),true);
});
test('disabled defaults and rollback retain historical five and current seven orders',()=>{
 for(const day of ['2026-11-11','2026-11-12','2026-11-13','2026-11-15']){
 const result=V.resolve(day);assert.deepEqual(result.payload.questionIds,R.select(bank,day));assert.equal(result.payload.questions.length,day<'2026-11-13'?5:7);
 assert.deepEqual(V.resolve(day,{enabled:false,assignments:[]}).payload,result.payload);
 }
});
test('future assignments are append-only and require valid versions and IDs',()=>{
 const a=assignment();const now=new Date('2026-11-15T12:00:00Z');
 const list=V.assign([],a,{now});assert.deepEqual(V.assign(list,a,{now}),list);
 assert.throws(()=>V.assign(list,{...a,questionIds:[...a.questionIds].reverse()},{now}));
 assert.throws(()=>V.assign([],{...a,date:'2026-11-15'},{now}));
 assert.throws(()=>V.resolve(a.date,{enabled:true}));assert.throws(()=>V.load('../bad'));
 assert.throws(()=>V.resolve(a.date,{enabled:true,assignments:[{...a,bankVersion:'a'.repeat(64)}]}));
 assert.throws(()=>V.assign([],{...a,questionIds:['missing',...a.questionIds.slice(1)]},{now}));
 assert.throws(()=>V.date('2026-02-30'));
});
test('Toronto boundary and late submissions preserve the existing window',()=>{
 assert.equal(C.dateKey(new Date('2026-11-16T04:59:59Z')),'2026-11-15');
 assert.equal(C.dateKey(new Date('2026-11-16T05:00:00Z')),'2026-11-16');
 const day='2026-11-15',answers=Array(7).fill(null);
 assert.equal(V.submit({date:day,answers},{now:new Date('2026-11-16T05:00:00Z')}).score,0);
 assert.throws(()=>V.submit({date:day,answers},{now:new Date('2026-11-17T05:00:00Z')}));
});
test('browser and server use identical frozen runtime and reject deployment mismatches',()=>{
 const day='2026-11-20',selected=V.resolve(day,enabled(day));
 const context=vm.createContext({Intl,Date});
 for(const file of ['core.js','run.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'versioning/releases',version,file),'utf8'),context);
 vm.runInContext(fs.readFileSync(path.join(__dirname,'versioning/runtime.js'),'utf8'),context);
 const browser=context.AscentVersionedRuntime.create(selected.payload,context.PowerLevelCore,context.PowerLevelRun);
 const answers=selected.payload.questions.map(q=>q.answers[0].name),body={...assignment(day),answers};
 const options={...enabled(day),now:new Date(day+'T12:00:00Z')};
 assert.equal(browser.score(answers),V.submit(body,options).score);
 assert.throws(()=>V.submit({...body,bankVersion:'stale'},options));
 assert.throws(()=>V.submit({...body,questionIds:[...body.questionIds].reverse()},options));
 assert.throws(()=>V.submit({...body,answers:['invalid',...answers.slice(1)]},options));
});
test('versioned saves preserve deadlines, all phases and five/seven counts',()=>{
 for(const day of ['2026-11-11','2026-11-20']){
 const selected=V.resolve(day,enabled(day)),p=selected.payload;
 const api=runtime.create(p,selected.core,selected.run);let state=R.create(p.questionIds,day);
 for(let i=0;i<p.questionIds.length;i++){
 R.start(state,1000);state=api.restore(api.save(state));assert.equal(state.deadline,31000);
 R.resolve(state,p.questions,'skip','',2000);state=api.restore(api.save(state));assert.equal(state.phase,'reveal');R.advance(state);
 }
 assert.equal(api.restore(api.save(state)).phase,'done');
 assert.equal(api.restore(JSON.stringify({...JSON.parse(api.save(state)),bankVersion:'wrong'})),null);
 }
});
test('historical picks use recorded IDs and retain recorded scores',()=>{
 assert.equal(V.picks({score:123,answers:['Luna']}).picks,null);
 assert.deepEqual(V.picks({score:123,bankVersion:version,questionIds:['original'],answers:['Luna']}).picks,[{questionId:'original',answer:'Luna'}]);
 assert.equal(V.picks({score:123,bankVersion:version,questionIds:['original'],answers:['Luna']}).score,123);
});
test('published release detects mutation; publishing is idempotent',()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'ascent-banks-'));
 try {const id=V.publish(bank,root);assert.equal(V.publish(bank,root),id);
 fs.appendFileSync(path.join(root,id,'bank.json'),' ');assert.throws(()=>V.load(id,root),/changed/);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});

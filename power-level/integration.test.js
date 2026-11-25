const {test}=require('node:test');
const assert=require('node:assert/strict');
const {fileDatabase}=require('./test-helpers/sqlite');
const {service}=require('../api/_ascent-versioning');
const fs=require('node:fs'),path=require('node:path');
const C=require('./core'),R=require('./run'),bank=require('./questions');
async function fixture(fn){
 const owned=await fileDatabase('ascent-integration-'),{db}=owned;
 const ensureAscent=async()=>{await db.execute('CREATE TABLE IF NOT EXISTS ascent_scores (day TEXT,guest TEXT,score INTEGER,answers TEXT,created_at INTEGER,PRIMARY KEY(day,guest))');};
 try{await fn(db,ensureAscent);}finally{await owned.dispose();}
}
test('legacy API contract and existing rows survive additive setup',()=>fixture(async(db,ensureAscent)=>{
 const api=service({db,ensureAscent}),day='2026-11-15',now=new Date(day+'T12:00:00Z');
 assert.deepEqual(await api.challenge(day),{mode:'legacy',date:day});
 const answers=R.select(bank,day).map(id=>bank.find(q=>q.id===id).answers[0].name);
 const first=await api.submit({date:day,answers},'guest',now);
 assert.equal(first.recorded,true);assert.equal(first.score,answers.reduce((n,a,i)=>n+C.points(bank.find(q=>q.id===R.select(bank,day)[i]).answers.find(x=>x.name===a)),0));
 const repeated=await api.submit({date:day,answers:Array(7).fill(null)},'guest',now);
 assert.equal(repeated.recorded,false);assert.equal(repeated.score,first.score);
 assert.equal((await db.execute('SELECT * FROM ascent_score_versions')).rows.length,0);
}));
test('versioned challenge pins order and scores transactionally across retries and rollback',()=>fixture(async(db,ensureAscent)=>{
 const api=service({db,ensureAscent,policy:null,activation:'2026-11-16'}),day='2026-11-16',now=new Date(day+'T12:00:00Z');
 const challenge=await api.challenge(day);
 assert.equal(challenge.mode,'versioned');assert.deepEqual(challenge.questionIds,R.select(bank,day));
 assert.deepEqual(challenge.questions,JSON.parse(JSON.stringify(challenge.questionIds.map(id=>bank.find(q=>q.id===id)))));
 const answers=challenge.questions.map(q=>q.answers[0].name),body={date:day,bankVersion:challenge.bankVersion,questionIds:challenge.questionIds,answers};
 await assert.rejects(api.submit({date:day,answers},'old',now),{status:409});
 await assert.rejects(api.submit({...body,bankVersion:'bad'},'old',now),{status:409});
 const first=await api.submit(body,'guest',now);assert.equal(first.recorded,true);
 const second=await api.submit(body,'guest',now);assert.equal(second.recorded,false);
 assert.equal((await db.execute('SELECT * FROM ascent_score_versions')).rows.length,1);
 assert.deepEqual(await service({db,ensureAscent}).challenge(day),challenge);
 assert.equal((await api.stats(day,await api.resolve(day))).players,1);
 await db.execute({sql:'INSERT INTO ascent_scores VALUES (?, ?, ?, ?, ?)',args:[day,'historical',999,JSON.stringify(answers),0]});
 const stats=await api.stats(day,await api.resolve(day));assert.equal(stats.scores[999],1);
 assert.equal(stats.picks[challenge.questionIds[0]][answers[0]],1);
}));
test('unknown stored versions fail closed and late submissions retain their pinned date',()=>fixture(async(db,ensureAscent)=>{
 const api=service({db,ensureAscent,policy:null,activation:'2026-11-11'}),day='2026-11-11';
 const p=await api.challenge(day);assert.equal(p.questions.length,5);
 const body={date:day,bankVersion:p.bankVersion,questionIds:p.questionIds,answers:Array(5).fill(null)};
 assert.equal((await api.submit(body,'late',new Date('2026-11-12T12:00:00Z'))).score,0);
 await assert.rejects(api.submit(body,'too-late',new Date('2026-11-13T12:00:00Z')),{status:400});
 await db.execute({sql:'UPDATE ascent_challenges SET bank_version = ? WHERE day = ?',args:['a'.repeat(64),day]});
 await assert.rejects(api.challenge(day));
}));

test('browser resolver loads matching frozen rules and restores the actual saved deadline',()=>fixture(async(db,ensureAscent)=>{
 const vm=require('node:vm'),crypto=require('node:crypto');
 const day='2026-11-16',payload=await service({db,ensureAscent,policy:null,activation:day}).challenge(day);
 const loaded=[];
 const context=vm.createContext({AbortSignal,fetch:async()=>({ok:true,json:async()=>payload}),document:{
  createElement:()=>({remove(){}}),head:{append(script){
   const bytes=fs.readFileSync(path.join(__dirname,'..',script.src));
   assert.equal(script.integrity,'sha256-'+crypto.createHash('sha256').update(bytes).digest('base64'));
   loaded.push(script.src);vm.runInContext(bytes.toString(),context);script.onload();
  }}
 }});
 for(const file of ['versioning/runtime.js','challenge-client.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,file),'utf8'),context);
 const selected=await context.AscentChallengeClient.resolve(day);
 assert.equal(loaded.length,2);
 const now=Date.now(),state=selected.run.create(payload.questionIds,day);
 selected.run.start(state,now);
 const raw=selected.engine.save(state),restored=selected.engine.restore(raw);
 assert.equal(restored.deadline,state.deadline);
 assert.equal(restored.phase,'active');
 assert.equal(selected.engine.score(payload.questions.map(q=>q.answers[0].name)),payload.questions.reduce((n,q)=>n+C.points(q.answers[0]),0));
}));

test('browser resolver preserves legacy mode and rejects a mismatched date',async()=>{
 const vm=require('node:vm');let response={mode:'legacy',date:'2026-11-15'};
 const context=vm.createContext({AbortSignal,fetch:async()=>({ok:true,json:async()=>response})});
 vm.runInContext(fs.readFileSync(path.join(__dirname,'challenge-client.js'),'utf8'),context);
 assert.equal(await context.AscentChallengeClient.resolve('2026-11-15'),null);
 response={...response,date:'2026-11-16'};
 await assert.rejects(context.AscentChallengeClient.resolve('2026-11-15'),/date mismatch/);
});

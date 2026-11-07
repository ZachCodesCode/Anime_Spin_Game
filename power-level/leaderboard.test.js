const {test}=require('node:test'),assert=require('node:assert/strict');
const {createClient}=require('@libsql/client');
const {createHandler,questions,VERSION}=require('../api/_power-level');
const C=require('./core');
function request(handler,{date=C.dateKey(),cookie='',body,id,offset,origin}={}){return new Promise(resolve=>{const headers={};const res={setHeader(k,v){headers[k]=v;},status(code){this.code=code;return this;},json(data){resolve({code:this.code,data,headers});}};handler({method:body?'POST':'GET',headers:{host:'localhost',cookie,...(origin?{origin}:{})},query:{date,id,offset},body},res);});}
function payload(date=C.dateKey()){return {mode:'daily',phase:'done',version:VERSION,date,name:'Test guest',power:999999,outcomes:questions(date).map(q=>({id:q.id,kind:'answer',answer:q.answers[0].name,submitted:q.answers[0].name}))};}
test('daily API validates scores, identity, rank ties, spoilers, history, pagination and retries',async()=>{
 const db=createClient({url:':memory:'}),handler=createHandler(db);try{
 const first=await request(handler),cookie=first.headers['Set-Cookie'].split(';')[0];assert.ok(first.headers['Set-Cookie'].includes('HttpOnly'));
 const p=payload();const saved=await request(handler,{cookie,body:p});assert.equal(saved.code,200);assert.notEqual(saved.data.entry.power,p.power);
 const id=saved.data.entry.id;const duplicate=await request(handler,{cookie,body:{...p,name:'Changed'}});assert.equal(duplicate.data.entry.id,id);assert.equal(duplicate.data.entry.name,'Test guest');
 const publicList=await request(handler);assert.equal(publicList.data.entries[0].rank,1);assert.equal(publicList.data.unlocked,false);assert.ok(!JSON.stringify(publicList.data).includes('player_key'));assert.ok(!JSON.stringify(publicList.data).includes('submitted'));
 const denied=await request(handler,{id});assert.equal(denied.code,403);assert.ok(!denied.data.details);
 const own=await request(handler,{cookie,id});assert.equal(own.data.details.length,5);assert.equal(own.data.details[0].question,questions(p.date)[0].text);
 const forged=structuredClone(p);forged.outcomes[0].submitted='not a character';assert.equal((await request(handler,{body:forged})).code,400);
 assert.equal((await request(handler,{body:{...p,mode:'practice'}})).code,400);
 assert.equal((await request(handler,{body:{...p,phase:'active'}})).code,400);
 assert.equal((await request(handler,{body:{...p,version:'future'}})).code,400);
 assert.equal((await request(handler,{body:{...p,outcomes:p.outcomes.slice(1)}})).code,400);
 assert.equal((await request(handler,{body:p,origin:'https://evil.example'})).code,403);
 const mixed=structuredClone(p);mixed.name='<img onerror=alert(1)>';mixed.outcomes[0]={id:mixed.outcomes[0].id,kind:'skip',answer:null};mixed.outcomes[1]={id:mixed.outcomes[1].id,kind:'timeout',answer:null};
 const second=await request(handler),cookie2=second.headers['Set-Cookie'].split(';')[0];const m=await request(handler,{cookie:cookie2,body:mixed});assert.equal(m.data.entry.answered,3);
 assert.equal((await request(handler,{cookie,id:m.data.entry.id})).data.details[0].kind,'skip');
 for(let i=0;i<21;i++){const c=(await request(handler)).headers['Set-Cookie'].split(';')[0];await request(handler,{cookie:c,body:p});}
 const page=await request(handler,{cookie});assert.equal(page.data.entries.length,20);assert.equal(page.data.more,true);assert.equal(page.data.entries[1].rank,1);assert.equal(page.data.entries[0].id,id);
 const next=await request(handler,{cookie,offset:'20'});assert.equal(next.data.entries.at(-1).rank,23);assert.equal(next.data.more,false);
 // Ended dates are public; the stored details remain byte-for-byte unchanged after bank edits.
 const past='2020-01-01';await db.execute({sql:'UPDATE power_level_daily SET date=? WHERE id=?',args:[past,id]});
 await db.execute({sql:'UPDATE power_level_challenges SET questions=? WHERE date=?',args:['[]',p.date]});
 const old=await request(handler,{date:past,id});assert.equal(old.code,200);assert.deepEqual(old.data.details,own.data.details);
 assert.equal((await request(handler,{date:past})).data.entries.length,1);
 // A temporary database outage can be retried without losing/duplicating the entry.
 let fail=true;const retryHandler=createHandler({batch:(...a)=>db.batch(...a),execute:(...a)=>{if(fail){fail=false;throw Error('offline');}return db.execute(...a);}});
 assert.equal((await request(retryHandler)).code,500);assert.equal((await request(retryHandler)).code,200);
 }finally{db.close();}
});
test('spelling correction preserves submitted and canonical answers',async()=>{const {validate}=require('../api/_power-level');const p=payload();const q=questions(p.date);p.outcomes[0].submitted=q[0].answers[0].name.slice(0,-1);const r=validate(p,{version:VERSION,questions:JSON.stringify(q)});assert.equal(r.details[0].submitted,p.outcomes[0].submitted);assert.equal(r.details[0].accepted,p.outcomes[0].answer);});
test('saving needs an existing guest cookie, and a repeat is reported as a duplicate',async()=>{
 const db=createClient({url:':memory:'}),handler=createHandler(db);try{
 const p=payload();assert.equal((await request(handler,{body:p})).code,401);
 const cookie=(await request(handler)).headers['Set-Cookie'].split(';')[0];
 assert.equal((await request(handler,{cookie,body:p})).data.duplicate,false);
 assert.equal((await request(handler,{cookie,body:p})).data.duplicate,true);
 }finally{db.close();}
});
test('frozen v3-1 scoring matches the live game',()=>{const S=require('./versions/scoring-v3-1');for(const r of [0,1,37,50,99,100]){assert.equal(S.boost(r),C.score(r));assert.equal(S.tier(S.boost(r)),C.tier(S.boost(r)));}});

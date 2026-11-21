const {test}=require('node:test'),assert=require('node:assert/strict');
const C=require('./core'),R=require('./run'),D=require('./descent'),bank=require('./questions');
const day=k=>new Date(Date.parse(D.EPOCH+'T00:00:00Z')+k*864e5).toISOString().slice(0,10);

test('Descent questions are its own: flipped scoring, one Top Answer each, never in Ascent',()=>{
 const before=JSON.stringify(bank),flipped=D.bank(bank),own=flipped.filter(q=>q.descent);
 assert.ok(own.length>=28);assert.ok(own.every(q=>!q.wide),'Descent questions must not be Ascent questions');
 for(const q of own){
  assert.equal(q.answers.filter(a=>a.rarity===100).length,1,'one Top Answer in '+q.id);
  assert.equal(q.answers.find(a=>a.rarity===100).name,q.top,'Top Answer matches q.top in '+q.id);
  for(const a of q.answers)for(const f of [a.name,...(a.aliases||[])])assert.equal(C.validate(q,f).answer?.name,a.name,q.id+': '+f);}
 assert.equal(JSON.stringify(bank),before);
 // "Who isn't a Straw Hat": the obvious pick is ruled out, so Luffy is not accepted and Shanks is the Top Answer.
 const op=flipped.find(q=>q.id==='timed-v4-descent-one-piece');
 assert.equal(C.points(op.answers.find(a=>a.name==='Shanks')),100);
 assert.equal(C.validate(op,'Luffy').status,'invalid');
 assert.equal(C.points(op.answers.find(a=>a.name==='Buggy')),60);
 for(let d=0;d<120;d++)assert.ok(R.select(bank,new Date(Date.parse('2026-11-13T00:00:00Z')+d*864e5).toISOString().slice(0,10)).every(id=>!id.includes('-descent-')));
});

test('Descent has seven a day from its own bank, five character and two thing questions, no back-to-back repeats',()=>{
 let prev=[];
 for(let k=0;k<120;k++){const date=day(k),ids=D.select(bank,date);
  assert.equal(ids.length,7);assert.equal(new Set(ids).size,7);assert.deepEqual(ids,D.select(bank,date));
  const qs=ids.map(id=>bank.find(q=>q.id===id));assert.ok(qs.every(q=>q.descent));assert.equal(qs.filter(q=>q.descent==='title').length,2);
  for(const id of ids)assert.ok(!prev.includes(id),'Descent repeats yesterday: '+id);prev=ids;
  assert.equal(D.dayNumber(date),k+1);}
});

test('a Descent run scores with the flipped bank through the shared engine',()=>{
 const flipped=D.bank(bank),date=D.EPOCH,ids=D.select(bank,date),s=R.create(ids,date);
 for(const id of ids){R.start(s,1000);const q=flipped.find(q=>q.id===id);R.resolve(s,flipped,'answer',q.top,1001);R.advance(s);}
 assert.equal(s.phase,'done');assert.equal(R.total(s),700);assert.equal(R.maximum(s,flipped),700);
});

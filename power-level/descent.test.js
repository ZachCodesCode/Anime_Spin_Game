const {test}=require('node:test'),assert=require('node:assert/strict');
const C=require('./core'),R=require('./run'),D=require('./descent'),bank=require('./questions');
const day=k=>new Date(Date.parse(D.EPOCH+'T00:00:00Z')+k*864e5).toISOString().slice(0,10);

test('Descent flips scoring: exactly one Top Answer per question and the Ascent bank is untouched',()=>{
 const before=JSON.stringify(bank),flipped=D.bank(bank);
 for(const q of flipped.filter(q=>q.wide)){
  assert.equal(q.answers.filter(a=>a.rarity===100).length,1,'one Top Answer in '+q.id);
  assert.equal(q.answers.length,bank.find(x=>x.id===q.id).answers.length);
  assert.ok(q.answers.every(a=>!a.clever));}
 assert.equal(JSON.stringify(bank),before);
 for(const [id,name] of Object.entries(D.TOP))assert.equal(flipped.find(q=>q.id==='timed-v4-'+id).answers.find(a=>a.rarity===100).name,name);
 const pirates=flipped.find(q=>q.id==='timed-v4-wide-pirates');
 assert.equal(C.points(pirates.answers.find(a=>a.name==='Monkey D. Luffy')),100);
 assert.equal(C.points(pirates.answers.find(a=>a.name==='Bluejam')),10);
});

test('Descent has its own seven a day and never reuses a nearby Ascent question',()=>{
 let prev=[];
 for(let k=0;k<120;k++){const date=day(k),ids=D.select(bank,date),a=R.dayNumber(date)-1,h=R.history(bank,a+1);
  assert.equal(ids.length,7);assert.equal(new Set(ids).size,7);assert.deepEqual(ids,D.select(bank,date));
  const qs=ids.map(id=>bank.find(q=>q.id===id));assert.ok(qs.every(q=>q.wide));assert.equal(qs.filter(q=>q.wide==='title').length,2);
  for(const id of ids)assert.ok(![...(h[a-1]||[]),...h[a],...(h[a+1]||[])].includes(id),'overlaps Ascent near '+date+': '+id);
  for(const id of ids)assert.ok(!prev.includes(id),'Descent repeats yesterday: '+id);prev=ids;
  assert.equal(D.dayNumber(date),k+1);}
});

test('a Descent run scores with the flipped bank through the shared engine',()=>{
 const flipped=D.bank(bank),date=D.EPOCH,ids=D.select(bank,date),s=R.create(ids,date);
 for(const id of ids){R.start(s,1000);const q=flipped.find(q=>q.id===id),top=q.answers.find(a=>a.rarity===100);R.resolve(s,flipped,'answer',top.name,1001);R.advance(s);}
 assert.equal(s.phase,'done');assert.equal(R.total(s),700);assert.equal(R.maximum(s,flipped),700);
});

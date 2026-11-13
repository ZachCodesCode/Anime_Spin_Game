const {test}=require('node:test'),assert=require('node:assert/strict'),R=require('./run'),C=require('./core'),bank=require('./questions');
const make=()=>R.create(R.select(bank,'2026-11-11'),'2026-11-11');
const open=(s,now)=>{R.start(s,now);return now;};   // start; the clock opens immediately
const best=q=>q.answers.reduce((a,b)=>C.points(b)>C.points(a)?b:a);
test('daily schedule: Ascents #1-2 frozen, then seven any-anime questions a day',()=>{
 assert.equal(R.dayNumber(R.EPOCH),1);assert.equal(R.dayNumber('2026-11-12'),2);assert.deepEqual([R.countFor('2026-11-12'),R.countFor('2026-11-13')],[5,7]);
 const byId=Object.fromEntries(bank.map(q=>[q.id,q])),day=d=>new Date(Date.parse(R.EPOCH)+d*864e5).toISOString().slice(0,10),t=x=>'timed-v4-'+x;
 assert.deepEqual(R.select(bank,day(0)),['naruto-leaf','onepiece-fruit','bleach-gotei','hxh-troupe','tokyoghoul-ghouls'].map(t));
 assert.deepEqual(R.select(bank,day(1)),['mha-classes','blackclover-knights','demonslayer-ranks','aot-scouts','mix-jutsu-quirks'].map(t));
 const general=bank.filter(q=>q.wide),seen=new Set();let prev=[];
 for(let d=2;d<200;d++){const ids=R.select(bank,day(d)),qs=ids.map(id=>byId[id]);
  assert.equal(ids.length,7);assert.equal(new Set(ids).size,7);assert.deepEqual(ids,R.select(bank,day(d)));
  assert.ok(qs.every(q=>q.wide),'only any-anime questions');assert.equal(qs.filter(q=>q.wide==='title').length,2);
  for(const q of qs)assert.ok(!(q.from||[]).some(f=>ids.includes(f)),'reuses a same-day list: '+q.id);
  for(const id of ids)assert.ok(!prev.includes(id),'repeated from yesterday: '+id);prev=ids;
  if(d<7)ids.forEach(id=>seen.add(id));}
 assert.equal(seen.size,general.length,'every any-anime question shows up within five days');});
test('appending a dated question keeps earlier days the same',()=>{
 const day=d=>new Date(Date.parse(R.EPOCH)+d*864e5).toISOString().slice(0,10);
 const more=[...bank,{...bank.find(q=>q.id==='timed-v4-wide-cats'),id:'timed-v4-wide-extra',order:undefined,since:day(40)}];
 for(let d=0;d<40;d++)assert.deepEqual(R.select(more,day(d)),R.select(bank,day(d)));
 assert.ok(Array.from({length:30},(_,i)=>R.select(more,day(40+i))).flat().includes('timed-v4-wide-extra'));});
test('the clock starts with the question: 30 seconds, answerable at once',()=>{const s=make(),opened=open(s,1000),q=bank.find(q=>q.id===s.ids[0]);
 assert.equal(s.deadline,opened+30000);assert.equal(R.resolve(s,bank,'answer',q.answers[0].name,opened).status,'resolved');});
test('invalid answers keep deadline; skip and timeout award zero exactly once',()=>{const s=make(),t=open(s,1000);
 assert.equal(R.resolve(s,bank,'answer','wrong',t+1000).status,'invalid');assert.equal(s.deadline,t+30000);assert.equal(s.outcomes.length,0);
 R.resolve(s,bank,'skip','',t+2000);assert.equal(R.total(s),0);assert.equal(R.resolve(s,bank,'timeout','',t+3000).status,'locked');
 R.advance(s);const t2=open(s,t+5000);R.resolve(s,bank,'answer',bank.find(q=>q.id===s.ids[1]).answers[0].name,t2+30000);assert.equal(s.outcomes[1].kind,'timeout');assert.equal(R.total(s),0);});
test('five Limit Break answers reach the 500-point, 5,000 m summit',()=>{const s=make();let expected=0;
 for(let i=0;i<5;i++){const q=bank.find(q=>q.id===s.ids[i]),a=best(q),t=open(s,i*100000);R.resolve(s,bank,'answer',a.name,t+1000);
  expected+=100;assert.equal(s.outcomes[i].tier,'Limit Break');assert.equal(R.total(s),expected);assert.equal(s.phase,'reveal');R.advance(s);assert.equal(s.phase,i===4?'done':'ready');}
 assert.equal(R.maximum(s,bank),500);assert.deepEqual([R.climb(R.total(s),500).altitude,R.climb(250,500).altitude],[5000,2500]);assert.equal(R.resolve(s,bank,'skip','',999999).status,'locked');});
test('refresh preserves countdown, deadline and reveal; recomputes points',()=>{const s=make(),t=open(s,1000);
 let restored=R.restore(JSON.stringify(s),bank,s.date,s.ids);assert.deepEqual([restored.opensAt,restored.deadline],[t,t+30000]);
 const a=bank.find(q=>q.id===s.ids[0]).answers[0];R.resolve(restored,bank,'answer',a.name,t+1000);restored.outcomes[0].boost=999999;restored.outcomes[0].tier='Limit Break';
 const again=R.restore(JSON.stringify(restored),bank,s.date,s.ids);assert.equal(again.outcomes[0].boost,C.points(a));assert.equal(again.outcomes[0].tier,C.grade(a).name);
 assert.equal(again.revealUntil,t+1000+R.CONFIG.revealMs);assert.equal(R.resolve(again,bank,'answer',a.name,t+2000).status,'locked');R.advance(again);assert.equal(again.deadline,null);});
test('old, malformed, wrong-day and invalid saves rejected',()=>{for(const raw of ['null','{','{"version":3}',JSON.stringify({...make(),version:3}),JSON.stringify({...make(),date:'old'}),JSON.stringify({...make(),phase:'active',deadline:null}),JSON.stringify({...make(),phase:'active',opensAt:0,deadline:5})])assert.equal(R.restore(raw,bank,'2026-11-11'),null);});

test('seven-question cat fixture keeps questions 5–7 aligned through reveals and refreshes',()=>{
 const date='2026-11-13';let s=R.create(R.select(bank,date),date);
 assert.equal(s.ids.length,7);
 assert.match(bank.find(q=>q.id===s.ids[4]).text,/cat/i);
 for(let i=0;i<s.ids.length;i++){
  const now=100000*i;R.start(s,now);
  assert.equal(R.questionIndex(s),i);
  const q=bank.find(q=>q.id===s.ids[R.questionIndex(s)]);
  const deadline=s.deadline;
  s=R.restore(JSON.stringify(s),bank,date,s.ids);
  assert.ok(s,`question ${i+1} must restore`);
  assert.equal(s.deadline,deadline);
  const answer=i===4?'Luna':q.answers[0].name;
  const result=R.resolve(s,bank,'answer',answer,now+1000);
  assert.equal(result.status,'resolved');assert.equal(result.outcome.id,q.id);
  if(i===4)assert.equal(result.outcome.boost,10);
  assert.equal(R.questionIndex(s),i);
  s=R.restore(JSON.stringify(s),bank,date,s.ids);
  assert.ok(s);assert.equal(R.questionIndex(s),i);
  R.advance(s);
  assert.equal(s.phase,i===6?'done':'ready');
  assert.ok(R.restore(JSON.stringify(s),bank,date,s.ids));
 }
 assert.equal(s.outcomes.length,7);assert.equal(R.questionIndex(s),6);
 assert.equal(R.restore(JSON.stringify({...s,phase:'active',opensAt:0,deadline:30000}),bank,date,s.ids),null);
 assert.equal(R.restore(JSON.stringify({...s,outcomes:s.outcomes.slice(0,5)}),bank,date,s.ids),null);
});

const {test}=require('node:test'),assert=require('node:assert/strict'),R=require('./run'),C=require('./core'),bank=require('./questions');
const make=()=>R.create(R.select(bank,'2026-11-11'),'2026-11-11');
const open=(s,now)=>{R.start(s,now);return now;};   // start; the clock opens immediately
const best=q=>q.answers.reduce((a,b)=>C.points(b)>C.points(a)?b:a);
test('daily schedule: Ascent #1 frozen, then four anime plus one multi-anime question a day',()=>{
 assert.equal(R.dayNumber(R.EPOCH),1);assert.equal(R.dayNumber('2026-11-12'),2);
 const byId=Object.fromEntries(bank.map(q=>[q.id,q])),day=d=>new Date(Date.parse(R.EPOCH)+d*864e5).toISOString().slice(0,10);
 assert.deepEqual(R.select(bank,R.EPOCH),['naruto-leaf','onepiece-fruit','bleach-gotei','hxh-troupe','tokyoghoul-ghouls'].map(x=>'timed-v4-'+x));
 const base=new Set(),mixed=new Set(),mixCount=bank.filter(q=>q.anime==='mixed').length;let prev;
 for(let d=0;d<120;d++){const ids=R.select(bank,day(d)),qs=ids.map(id=>byId[id]);
  assert.equal(new Set(ids).size,5);assert.deepEqual(ids,R.select(bank,day(d)));
  const regular=d===0?qs:qs.slice(0,4);assert.equal(new Set(regular.map(q=>q.anime)).size,regular.length);assert.ok(regular.every(q=>q.anime!=='mixed'));
  if(d<12)for(const q of regular){assert.ok(!base.has(q.id),'repeated in first cycle: '+q.id);base.add(q.id);}
  if(d>0){const m=qs[4];assert.equal(m.anime,'mixed');assert.ok(!(m.from||[]).some(f=>ids.includes(f)),'mixed reuses a same-day list: '+m.id);assert.notEqual(m.id,prev);prev=m.id;if(d<=mixCount)mixed.add(m.id);}}
 assert.equal(mixed.size,mixCount);assert.equal(new Set(bank.filter(q=>q.anime!=='mixed').map(q=>q.anime)).size,10);});
test('appending questions keeps earlier days the same',()=>{
 const day=d=>new Date(Date.parse(R.EPOCH)+d*864e5).toISOString().slice(0,10);
 const extra=[...new Set(bank.filter(q=>q.anime!=='mixed').map(q=>q.anime))].map(anime=>({...bank.find(q=>q.anime===anime),id:'extra-'+anime}));
 for(let d=0;d<12;d++)assert.deepEqual(R.select([...bank,...extra],day(d)),R.select(bank,day(d)));
 const moreMixed=[...bank,{...bank.find(q=>q.anime==='mixed'),id:'extra-mixed',from:[]}];assert.deepEqual(R.select(moreMixed,R.EPOCH),R.select(bank,R.EPOCH));});
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

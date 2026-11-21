const {test}=require('node:test');
const assert=require('node:assert/strict');
const {createHash}=require('node:crypto');
const fs=require('node:fs'),vm=require('node:vm');
const C=require('./core'),R=require('./run'),D=require('./descent'),bank=require('./questions');
const digest=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
// Frozen exported values from production main 1a1f5008, after both rarity boosts.
// Each tuple is [old answer count, appended count, digest of the complete old answers].
const baseline={
 'maids':[40,11,'b40408c608bc506c70dabcfdb7f2e367728ce229b7e998a62101109d8af107a2'],
 'ponytails':[81,4,'88071150322a3bf0fbdfd79444a18265cafa1d7f023b0c252c0e7a3c789381b7'],
 'game-adaptations':[64,11,'fe1f5939f91e3e01e52045cfabbd58bf87ac6c1e6b679553ed0b972d4b9e7c15'],
 'ghosts':[94,9,'e10324f48f9bd3b0cc74371370f2037b875f184508d872b975cd6b393773ed80'],
 'giants':[52,4,'4f79aea4c924987ffe3d037bc00a1995a8431ab7bf3be87b671992f3fea7b2bb'],
 'number-titles':[76,12,'839daf512c4b67b68b328b17ec0f8154b96fd34c8f16afdf4371c4b16894b0d9'],
 'witches':[151,21,'dc5450ef43becca7d2a54cb677b7af0fc0b3ac8386819df8af57f9739978b1a8'],
 'orange-hair':[46,5,'71ffc10411024d52ffb61ef8fa337821a4acff98284626ba6a29b81694f88e61'],
 'police':[33,9,'8827ba2960958b5a18af670693c1773950eab289083fd6fbc8c769c64403c8a8'],
 '90s':[61,6,'ed0e87c09b94f4739b290d940e17ec3323246a4e6a890f43cf98ff304d8b03dd'],
 'assassins':[63,28,'0fa043f49a10024b39547ee74f2db18d248e0d5567d50ee80ff4aae61f914882'],
 'thieves':[43,4,'aaeaa50bf1962b8051d68e0ebf0d8de268901a5b056d45c0937b7fd88b318bce'],
 'films':[73,11,'648260e0debeb1794ce0c70d4f357b28da8877e4ee5d128953769b277fbdcc3e'],
 'elves':[24,6,'2e1d1669ba65ba6f6074944251adbc0207e12b25123f20c0b5e9018c9e71eaeb'],
};
const id=slug=>'timed-v4-wide-'+slug;
const targets=new Map(Object.entries(baseline).map(([slug,values])=>[id(slug),values]));
const originalAnswers=q=>q.answers.slice(0,targets.get(q.id)[0]).map(a=>{
 if(q.id!==id('ghosts')||a.name!=='Polteregeist')return a;
 const copy={...a};delete copy.aliases;return copy;
});
const oldBank=bank.map(q=>targets.has(q.id)?{...q,answers:originalAnswers(q)}:q);
const newAnswers=q=>q.answers.slice(targets.get(q.id)[0]);
const days={
 '2026-11-22':['maids','ponytails','game-adaptations','ghosts','giants','number-titles','witches'],
 '2026-11-23':['orange-hair','police','90s','assassins','thieves','films','elves'],
};

test('answer-only expansion preserves all production metadata, other banks and existing scored answers',()=>{
 assert.equal(digest(bank.map(({answers,...meta})=>meta)),'a2bb574f9c18fe39258c059353152ddc777a962adabe31558f1b67b941ed47f4');
 assert.equal(digest(bank.filter(q=>!targets.has(q.id))),'f8f0b1ce17e61290f46c4d4f5a4e320fd25a0736997c7b231640fc1cea1dc307');
 for(const q of bank.filter(q=>targets.has(q.id))){
  const [count,added,hash]=targets.get(q.id);
  assert.equal(q.answers.length,count+added,q.id);
  assert.equal(digest(originalAnswers(q)),hash,q.id+' old canonical names/aliases/rarities/flags/order');
  assert.equal(q.answers.filter(a=>C.grade(a).name==='Limit Break').length,1,q.id);
  for(const a of originalAnswers(q))for(const typed of [a.name,...a.aliases||[]]){
   const result=C.validate(q,typed);assert.equal(result.answer?.name,a.name);
   assert.equal(C.points(result.answer),C.points(a));
  }
 }
 const ghost=bank.find(q=>q.id===id('ghosts'));
 assert.deepEqual(ghost.answers.find(a=>a.name==='Polteregeist').aliases,['Polteageist']);
 assert.equal(C.validate(ghost,'Polteageist').answer.name,'Polteregeist');
});

test('both requested dates and ten years of schedule history retain the same ordered IDs',()=>{
 for(const [date,slugs]of Object.entries(days))assert.deepEqual(R.select(bank,date),slugs.map(id));
 // Answers are not selection inputs: metadata is frozen above and run.js is unchanged.
 assert.deepEqual(R.history(bank,3650),R.history(oldBank,3650));
 for(const date of ['2026-11-11','2026-11-12','2026-11-21','2036-11-21'])assert.deepEqual(R.select(bank,date),R.select(oldBank,date));
 assert.deepEqual(D.bank(bank).filter(q=>q.descent),D.bank(oldBank).filter(q=>q.descent));
 for(const date of ['2026-11-20','2026-11-22','2026-11-23','2027-01-01'])assert.deepEqual(D.select(bank,date),D.select(oldBank,date));
});

test('all appended names and aliases resolve uniquely at final-scale tiers without new special scores',()=>{
 for(const q of bank.filter(q=>targets.has(q.id))){
  const owner=new Map();
  for(const a of q.answers)for(const f of [a.name,...a.aliases||[]]){
   const key=C.normalize(f);assert.ok(!owner.has(key)||owner.get(key)===a.name,q.id+': '+f);owner.set(key,a.name);
  }
  for(const a of newAnswers(q)){
   assert.ok(a.rarity>=0&&a.rarity<100&&!a.clever);
   for(const f of [a.name,...a.aliases||[]])assert.equal(C.validate(q,f).answer?.name,a.name,q.id+': '+f);
  }
 }
 for(const [slug,name,tier,points]of [
  ['90s','One Piece','Fodder',10],['orange-hair','Emma','Side Character',30],
  ['films','Cowboy Bebop: The Movie','Rare',60],['maids','Kogarashi','Deep Cut',85],
  ['ponytails','Crusch Karsten','Rare',60],['ghosts','Pecharunt','Deep Cut',85],
 ]){const a=C.validate(bank.find(q=>q.id===id(slug)),name).answer;assert.equal(C.grade(a).name,tier);assert.equal(C.points(a),points);}
 // Full forms preserve two distinct Petras; the old explicit short alias retains priority.
 const orange=bank.find(q=>q.id===id('orange-hair'));
 assert.equal(C.validate(orange,'Petra').answer.name,'Petra Ral');
 assert.equal(C.validate(orange,'Petra Leyte').answer.name,'Petra Leyte');
 assert.equal(C.validate(bank.find(q=>q.id===id('witches')),'Silva').status,'ambiguous');
});

test('in-progress and finished production saves restore with identical scores, answers and clocks',()=>{
 for(const date of Object.keys(days)){
  const s=R.create(R.select(oldBank,date),date);
  for(let i=0;i<s.ids.length;i++){
   const now=100000+i*100000,q=oldBank.find(q=>q.id===s.ids[i]);R.start(s,now);
   const active=R.restore(JSON.stringify(s),bank,date,s.ids);
   assert.equal(active.opensAt,s.opensAt);assert.equal(active.deadline,s.deadline);
   R.resolve(s,oldBank,'answer',q.answers[i%q.answers.length].name,now+500);
   const restored=R.restore(JSON.stringify(s),bank,date,s.ids);
   assert.equal(R.total(restored),R.total(s));assert.equal(restored.revealUntil,s.revealUntil);
   assert.equal(restored.outcomes[i].answer,s.outcomes[i].answer);R.advance(s);
  }
  assert.equal(s.phase,'done');const restored=R.restore(JSON.stringify(s),bank,date,s.ids);
  assert.equal(restored.phase,'done');assert.equal(R.total(restored),R.total(s));
 }
});

// Exercise the REAL submission handler with isolated in-memory storage; no Turso or credentials.
function api(date){
 const calls=[];let serial=0;
 class Clock extends Date{static now(){return Date.parse(date+'T17:00:00Z');}}
 const context={module:{exports:{}},Date:Clock,console,require(name){
  if(name==='./_db.js')return {cors(){},ensureAscent:async()=>{},db:{execute:async request=>{
   calls.push(request);return request.sql.startsWith('INSERT')?{rowsAffected:1}:{rows:[]};
  }}};
  if(name==='./_guest.js')return {guest:()=> 'test-player-'+(++serial)};
  if(name==='../power-level/core.js')return C;
  if(name==='../power-level/run.js')return R;
  if(name==='../power-level/questions.js')return bank;
  throw Error('Unexpected dependency '+name);
 }};
 vm.runInNewContext(fs.readFileSync(require.resolve('../api/ascent.js'),'utf8'),context);
 return {calls,async submit(answers){const res={code:200,setHeader(){},status(code){this.code=code;return this;},json(value){this.value=value;return this;}};
  await context.module.exports({method:'POST',body:{date,answers}},res);return res;
 }};
}
test('every new answer and client-canonicalized alias passes the actual API scoring handler',async()=>{
 for(const date of Object.keys(days)){
  const ids=R.select(bank,date),qs=ids.map(i=>bank.find(q=>q.id===i)),handler=api(date);
  for(let i=0;i<qs.length;i++)for(const a of newAnswers(qs[i]))for(const f of [a.name,...a.aliases||[]]){
   const answers=qs.map(()=>null);answers[i]=C.validate(qs[i],f).answer.name;
   const res=await handler.submit(answers);assert.equal(res.code,200,a.name);assert.equal(res.value.score,C.points(a));
   const insert=handler.calls.findLast(c=>c.sql.startsWith('INSERT'));
   assert.equal(insert.args[2],C.points(a));assert.equal(JSON.parse(insert.args[3])[i],a.name);
  }
  const invalid=qs.map(()=>null);invalid[0]='not a canonical answer';assert.equal((await handler.submit(invalid)).code,400);
  const skipped=await handler.submit(qs.map(()=>null));assert.equal(skipped.code,200);assert.equal(skipped.value.score,0);
 }
});

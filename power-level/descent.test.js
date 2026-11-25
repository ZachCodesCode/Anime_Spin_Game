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

test('historical Descent dates remain pinned; missing future dates fail closed',()=>{
 for(let k=0;k<5;k++){const date=day(k),ids=D.select(bank,date);assert.equal(ids.length,7);assert.deepEqual(ids,D.select(bank,date));}
 assert.deepEqual(D.select(bank,'2026-11-20'),D.select(bank,'2026-11-24'));
 assert.throws(()=>D.select(bank,'2026-11-25'),/Missing assignment/);
});

test('strict cooldown, semantic conflicts, daily append and approved difficult reuse over 30 days',()=>{
 const A=require('./descent-assignments');const config={assignments:{...A.assignments},reuse:{},policy:A.policy};
 const pool=[...bank],base=Date.parse('2026-11-25T00:00:00Z');
 for(let n=0;n<30;n++){
  const date=new Date(base+n*864e5).toISOString().slice(0,10);
  const ids=[];
  for(let i=0;i<7;i++){
   const id='manual-'+n+'-'+i,kind=i<5?'char':'title';
   pool.push({id,conceptId:id,descent:kind,text:'Question '+id,top:'Top',answers:[{name:'Top',aliases:[],rarity:0},{name:'Other',aliases:[],rarity:50}]});ids.push(id);
  }
  config.assignments[date]=ids;
  assert.equal(D.validate(pool,date,config).ready,true,date);
  if(n<29)assert.match(D.validate(pool,new Date(base+(n+1)*864e5).toISOString().slice(0,10),config).errors.join(),/Missing assignment/);
 }
 const first='2026-11-25',early='2026-12-09',eligible='2026-12-10',old=config.assignments[first][0];
 config.assignments[early][0]=old;assert.match(D.validate(pool,early,config).errors.join(),/Cooldown/);
 config.assignments[early][0]='manual-14-0';
 config.assignments[eligible][0]=old;assert.match(D.validate(pool,eligible,config).errors.join(),/Reuse needs approved/);
 config.reuse[eligible]={[old]:{approvedBy:'editor',reviewedAt:eligible,evidence:'offline run export',runs:30,acceptedRate:.6,topRate:.5}};
 assert.equal(D.validate(pool,eligible,config).ready,true);
 config.reuse[eligible][old].runs=29;assert.equal(D.validate(pool,eligible,config).ready,false);
 config.reuse[eligible][old].runs=30;config.reuse[eligible][old].acceptedRate=.61;assert.equal(D.validate(pool,eligible,config).ready,false);
 config.reuse[eligible][old].topRate=.3;assert.equal(D.validate(pool,eligible,config).ready,true);
 const duplicate={...pool.find(q=>q.id===old),id:'semantic-copy'};pool.push(duplicate);config.assignments[early][0]=duplicate.id;
 assert.match(D.validate(pool,early,config).errors.join(),/Cooldown/);
 config.assignments[early][1]=duplicate.id;
 assert.match(D.validate(pool,early,config).errors.join(),/Duplicate question ID|Semantic duplicate/);
 config.assignments[early][1]='manual-14-1';
 config.assignments[early][6]='manual-14-2';
 assert.match(D.validate(pool,early,config).errors.join(),/five character and two title/);
});

test('a Descent run scores with the flipped bank through the shared engine',()=>{
 const flipped=D.bank(bank),date=D.EPOCH,ids=D.select(bank,date),s=R.create(ids,date);
 for(const id of ids){R.start(s,1000);const q=flipped.find(q=>q.id===id);R.resolve(s,flipped,'answer',q.top,1001);R.advance(s);}
 assert.equal(s.phase,'done');assert.equal(R.total(s),700);assert.equal(R.maximum(s,flipped),700);
});

test('browser and server share the same pinned schedule and new question bank',()=>{
 const fs=require('node:fs'),vm=require('node:vm');
 const context=vm.createContext({});
 for(const name of ['questions','descent-questions','run','descent-assignments','descent'])vm.runInContext(fs.readFileSync(require('node:path').join(__dirname,name+'.js'),'utf8'),context,{filename:name+'.js'});
 const browserIds=vm.runInContext("PowerLevelDescent.select([...POWER_LEVEL_QUESTIONS,...PowerLevelDescentQuestions],'2026-11-23')",context);
 assert.deepEqual([...browserIds],D.select([...bank,...require('./descent-questions')],'2026-11-23'));
 assert.throws(()=>vm.runInContext("PowerLevelDescent.select([...POWER_LEVEL_QUESTIONS,...PowerLevelDescentQuestions],'2026-11-25')",context),/Missing assignment/);
});

test('Toronto midnight changes the day across daylight saving time',()=>{
 assert.equal(C.dateKey(new Date('2027-03-14T04:59:59Z')),'2027-03-13');
 assert.equal(C.dateKey(new Date('2027-03-14T05:00:00Z')),'2027-03-14');
 assert.equal(C.dateKey(new Date('2027-11-07T03:59:59Z')),'2027-11-06');
 assert.equal(C.dateKey(new Date('2027-11-07T04:00:00Z')),'2027-11-07');
});

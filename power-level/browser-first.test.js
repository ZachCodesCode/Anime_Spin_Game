const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const R=require('./run'),C=require('./core'),bank=require('./questions');
test('the actual browser question selector and seven local questions work without any challenge API',()=>{const source=fs.readFileSync(__dirname+'/game.js','utf8');assert(!source.includes('AscentChallengeClient'));assert(!fs.readFileSync(__dirname+'/../index.html','utf8').includes('src="power-level/challenge-client.js"'));const selector=source.match(/const question=([^;]+);/)[1];let state=R.create(R.select(bank,'2026-11-13'),'2026-11-13');const context=vm.createContext({bank,R,state,fetch(){throw Error('Turso/API offline');}});const q=vm.runInContext(selector,context);let score=0;for(let i=0;i<7;i++){R.start(state,i*100000);const current=q();assert.equal(current.id,state.ids[i]);const deadline=state.deadline;state=R.restore(JSON.stringify(state),bank,state.date,state.ids);context.state=state;assert.equal(q().text,current.text);assert.equal(state.deadline,deadline);const result=R.resolve(state,bank,'answer',current.answers[0].name,i*100000+1000);assert.equal(result.status,'resolved');score+=C.points(current.answers[0]);assert.equal(q().id,current.id);R.advance(state);}assert.equal(state.phase,'done');assert.equal(R.total(state),score);assert.equal(R.restore(JSON.stringify(state),bank,state.date,state.ids).phase,'done');});
test('same-day additions use the new bank while recorded outcomes and deadlines survive corrections/removals',()=>{let state=R.create(R.select(bank,'2026-11-13'),'2026-11-13');R.start(state,1000);const q=bank.find(q=>q.id===state.ids[0]);R.resolve(state,bank,'answer',q.answers[0].name,2000);const score=R.total(state);R.advance(state);R.start(state,3000);const updated=structuredClone(bank);updated.find(x=>x.id===q.id).answers=updated.find(x=>x.id===q.id).answers.filter(a=>a.name!==q.answers[0].name);state=R.restore(JSON.stringify(state),updated,state.date,state.ids);assert(state);assert.equal(R.total(state),score);assert.equal(state.deadline,33000);const next=updated.find(x=>x.id===state.ids[1]);next.answers.push({name:'New valid correction fixture',rarity:30});assert.equal(R.resolve(state,updated,'answer','New valid correction fixture',4000).status,'resolved');assert.equal(R.total(state),score+30);});
test('same-day rarity and alias edits preserve completed and legacy outcomes without resetting active timers',()=>{
 for(const legacy of [false,true]){
  let s=R.create(R.select(bank,'2026-11-13'),'2026-11-13');R.start(s,1000);
  const first=bank.find(q=>q.id===s.ids[0]);R.resolve(s,bank,'answer',first.answers[0].name,2000);const originalScore=R.total(s);
  if(legacy)delete s.outcomes[0].accepted;
  R.advance(s);R.start(s,3000);const updated=structuredClone(bank);
  updated.find(q=>q.id===first.id).answers.find(a=>a.name===first.answers[0].name).rarity=85;
  const next=updated.find(q=>q.id===s.ids[1]);next.answers[0].aliases=[...(next.answers[0].aliases||[]),'New alternate spelling fixture'];
  s=R.restore(JSON.stringify(s),updated,s.date,s.ids);assert(s);assert.equal(R.total(s),originalScore);assert.equal(s.deadline,33000);
  assert.equal(R.resolve(s,updated,'answer','New alternate spelling fixture',4000).outcome.answer,next.answers[0].name);
  R.advance(s);while(s.phase!=='done'){R.start(s,5000);R.resolve(s,updated,'skip',null,6000);R.advance(s);}
  const finalScore=R.total(s);const reloaded=R.restore(JSON.stringify(s),updated,s.date,s.ids);assert.equal(reloaded.phase,'done');assert.equal(R.total(reloaded),finalScore);
 }
});

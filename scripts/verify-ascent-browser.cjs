'use strict';
// Optional real-browser check: install playwright-core outside the game repo and set NODE_PATH.
const fs=require('fs'),os=require('os'),path=require('path'),assert=require('assert/strict');
const {chromium}=require('playwright-core');
const root=path.resolve(__dirname,'..'),C=require(root+'/power-level/core'),R=require(root+'/power-level/run'),bank=require(root+'/power-level/questions');
const day='2026-11-23',date=new Date(day+'T17:00:00Z'),ids=R.select(bank,day),questions=ids.map(id=>bank.find(q=>q.id===id));
const server=require('./dev').createServer(),output=process.env.ASCENT_BROWSER_OUTPUT||os.tmpdir();
const saved=()=>Object.values(localStorage).map(v=>{try{return JSON.parse(v);}catch{return null;}}).find(v=>Array.isArray(v?.ids)&&v.date==='2026-11-23'&&v.ids.length===7);
(async()=>{let browser;try{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
 browser=await chromium.launch({headless:true,...(process.env.ASCENT_BROWSER_EXECUTABLE?{executablePath:process.env.ASCENT_BROWSER_EXECUTABLE}:{})});const results=[];
 for(const mobile of [false,true]){
  const context=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1440,height:1000},timezoneId:'America/Toronto',reducedMotion:'reduce'});let blocked=0,challengeRequests=0;
  await context.route('**/*',route=>{const u=new URL(route.request().url());if(u.pathname.startsWith('/api/')){blocked++;if(u.searchParams.has('challenge'))challengeRequests++;return route.abort();}return u.origin===origin?route.continue():route.abort();});
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));page.setDefaultTimeout(10000);await page.clock.install({time:date});await page.goto(origin+'/#power-level',{waitUntil:'networkidle'});
  await page.locator('#plBegin').click();const transitions=[];
  for(let i=0;i<7;i++){
   const q=questions[i];assert.equal(await page.locator('#plQuestion').innerText(),q.text);assert((await page.locator('#plCategory').textContent()).includes(q.note));let state=await page.evaluate(saved);assert.equal(state.ids[state.outcomes.length],q.id);assert.equal(state.deadline-state.opensAt,30000);
   if(i===5){const deadline=state.deadline;await page.reload({waitUntil:'networkidle'});await page.locator('#plInput:not([disabled])').waitFor();assert.equal(await page.locator('#plQuestion').innerText(),q.text);state=await page.evaluate(saved);assert.equal(state.deadline,deadline);}
   await page.locator('#plInput').fill(q.answers[0].aliases?.[0]||q.answers[0].name);await page.locator('#plSubmit').click();assert.equal(await page.locator('#powerLevel').getAttribute('data-phase'),'reveal');assert.equal(await page.locator('#plQuestion').innerText(),q.text);state=await page.evaluate(saved);assert.equal(state.outcomes.at(-1).id,q.id);assert.equal(state.outcomes.at(-1).answer,q.answers[0].name);transitions.push({id:q.id,text:q.text,answer:q.answers[0].name});
   await page.clock.fastForward(2500);if(i<6)await page.locator('#plBegin').click();
  }
  await page.locator('#plResults').waitFor({state:'visible'});assert.match(await page.locator('#plSummary').innerText(),/7\/7 answered/);const state=await page.evaluate(saved),expected=questions.reduce((s,q)=>s+C.points(q.answers[0]),0);assert.equal(R.total(state),expected);for(const q of questions)assert((await page.locator('#plTop').innerText()).includes(q.text));
  await page.reload({waitUntil:'networkidle'});await page.locator('#plResults').waitFor({state:'visible'});assert.equal((await page.evaluate(saved)).phase,'done');assert.equal(challengeRequests,0);assert.deepEqual(errors,[]);
  await page.screenshot({path:path.join(output,'ascent-outage-'+(mobile?'mobile':'desktop')+'.png'),fullPage:true});
  await page.goto(origin+'/descent',{waitUntil:'networkidle'});await page.locator('#plBegin').click();assert.equal(await page.locator('#powerLevel').getAttribute('data-mode'),'descent');
  results.push({viewport:mobile?'mobile':'desktop',questions:transitions,score:expected,question6DeadlinePreserved:true,completedRestored:true,apiRequestsBlocked:blocked,challengeRequests,descent:true,consoleErrors:errors});await context.close();
 }
 fs.writeFileSync(path.join(output,'browser-outage-results.json'),JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
}finally{if(browser)await browser.close();await new Promise(r=>server.close(r));}})().catch(e=>{console.error(e);process.exitCode=1;});

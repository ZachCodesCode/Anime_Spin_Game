'use strict';
// Run with NODE_PATH pointing to a separately installed playwright-core.
const assert=require('node:assert/strict');
const path=require('node:path');
const {chromium}=require('playwright-core');
const root=path.resolve(__dirname,'..');
const C=require(root+'/power-level/core'),R=require(root+'/power-level/run'),D=require(root+'/power-level/descent');
const ascent=require(root+'/power-level/questions'),descent=require(root+'/power-level/descent-questions');
const all=[...ascent,...descent],day='2026-11-27',server=require('./dev').createServer();
const output=process.env.ASCENT_BROWSER_OUTPUT||'/private/tmp';
const saved=(ids)=>Object.values(localStorage).map(v=>{try{return JSON.parse(v);}catch{return null;}}).find(v=>Array.isArray(v?.ids)&&v.ids.length===7&&v.ids[0]===ids[0]&&v.date==='2026-11-27');
(async()=>{let browser;try{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const origin='http://127.0.0.1:'+server.address().port;
 browser=await chromium.launch({headless:true,executablePath:process.env.ASCENT_BROWSER_EXECUTABLE||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 const results=[];
 for(const mode of ['ascent','descent'])for(const mobile of [false,true]){
  const context=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1440,height:1000},timezoneId:'America/Toronto',reducedMotion:'reduce'});
  await context.route('**/*',route=>{const url=new URL(route.request().url());return url.pathname.startsWith('/api/')||url.origin!==origin?route.abort():route.continue();});
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.clock.install({time:new Date(day+'T17:00:00Z')});
  await page.goto(origin+(mode==='descent'?'/descent':'/#power-level'),{waitUntil:'networkidle'});
  const ids=mode==='descent'?D.select(all,day):R.select(ascent,day),bank=mode==='descent'?D.bank(all):ascent;
  assert.equal(await page.locator('#powerLevel').getAttribute('data-mode'),mode);
  await page.locator('#plBegin').click();let expected=0;
  for(let i=0;i<7;i++){
   const q=bank.find(q=>q.id===ids[i]);assert.equal(await page.locator('#plQuestion').innerText(),q.text);
   const answer=mode==='descent'?q.answers.find(a=>a.name===q.top):q.answers[0];
   const input=answer.aliases?.[0]||answer.name;
   await page.locator('#plInput').fill(input);await page.locator('#plSubmit').click();
   const state=await page.evaluate(saved,ids);assert.equal(state.outcomes.at(-1).id,q.id);assert.equal(state.outcomes.at(-1).answer,answer.name);
   expected+=C.points(answer);await page.clock.fastForward(2500);
   if(i<6)await page.locator('#plBegin').click();
  }
  await page.locator('#plResults').waitFor({state:'visible'});
  const state=await page.evaluate(saved,ids);assert.equal(R.total(state),expected);assert.match(await page.locator('#plSummary').innerText(),/7\/7 answered/);
  await page.reload({waitUntil:'networkidle'});await page.locator('#plResults').waitFor({state:'visible'});
  assert.equal((await page.evaluate(saved,ids)).phase,'done');assert.deepEqual(errors,[]);
  const screenshot=path.join(output,`nov27-${mode}-${mobile?'mobile':'desktop'}.png`);
  await page.screenshot({path:screenshot,fullPage:true});
  results.push({mode,viewport:mobile?'mobile':'desktop',questions:ids.length,score:expected,screenshot});
  await context.close();
 }
 console.log(JSON.stringify(results,null,2));
}finally{if(browser)await browser.close();await new Promise(r=>server.close(r));}})().catch(e=>{console.error(e);process.exitCode=1;});

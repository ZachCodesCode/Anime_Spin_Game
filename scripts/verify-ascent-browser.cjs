'use strict';
const fs=require('fs'),os=require('os'),path=require('path'),http=require('http'),assert=require('assert/strict');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),C=require(root+'/power-level/core'),R=require(root+'/power-level/run'),bank=require(root+'/power-level/questions');
const {service}=require(root+'/api/_ascent-versioning'),day='2026-11-24',date=new Date(day+'T17:00:00Z');
const work=fs.mkdtempSync(path.join(os.tmpdir(),'ascent-browser-staging-'));
const db=require(root+'/node_modules/@libsql/client').createClient({url:'file:'+path.join(work,'db')});
const ensureAscent=()=>db.execute('CREATE TABLE IF NOT EXISTS ascent_scores(day TEXT,guest TEXT,score INTEGER,answers TEXT,created_at INTEGER,PRIMARY KEY(day,guest))');
const registry=[{date:day,bankVersion:require(root+'/power-level/versioning/legacy.json').bankVersion,questionIds:R.select(bank,day)}];
const api=service({db,ensureAscent,activation:day,registry});
const staticServer=require(root+'/scripts/dev').createServer(),staticHandler=staticServer.listeners('request')[0];
let activeGuest='browser-desktop';
const server=http.createServer(async(req,res)=>{
 const url=new URL(req.url,'http://local');if(url.pathname==='/api/ascent'){
  res.setHeader('Content-Type','application/json');res.setHeader('Cache-Control','no-store');
  try{let data;if(req.method==='POST'){let bytes='';for await(const b of req)bytes+=b;data=await api.submit(JSON.parse(bytes),activeGuest,date);}else{const d=url.searchParams.get('date')||day;data=url.searchParams.has('challenge')?await api.challenge(d):await api.stats(d,await api.resolve(d));}res.end(JSON.stringify(data));}catch(e){res.statusCode=e.status||503;res.end(JSON.stringify({error:e.message}));}return;
 }
 staticHandler(req,res);
});
(async()=>{
 let browser;const watchdog=setTimeout(()=>{console.error('Browser smoke timeout');process.exit(1);},90000);
 try{
  console.log('Starting staging server');await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
  console.log('Launching Chrome');browser=await chromium.launch({...(process.env.ASCENT_BROWSER_EXECUTABLE?{executablePath:process.env.ASCENT_BROWSER_EXECUTABLE}:{}),headless:true});
  console.log('Fetching frozen challenge');const payload=await api.challenge(day),results=[];
  for(const mobile of [false,true]){
   activeGuest='browser-'+(mobile?'mobile':'desktop');
   const context=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1440,height:1000},timezoneId:'America/Toronto',reducedMotion:'reduce'});
   await context.route('**/*',route=>new URL(route.request().url()).origin===origin?route.continue():route.abort());
   const page=await context.newPage(),errors=[];page.setDefaultTimeout(10000);console.log('Viewport',mobile);page.on('pageerror',e=>errors.push(e.message));
   console.log('Installing clock');await page.clock.install({time:date});console.log('Navigating');await page.goto(origin,{waitUntil:'networkidle'});console.log('Loaded');
   await page.locator('#plBegin').waitFor({state:'visible'});assert.equal(await page.locator('#powerLevel').getAttribute('data-phase'),'ready');
   await page.locator('#plBegin').click();
   let deadline;
   for(let i=0;i<7;i++){
    console.log('Question',i+1);const q=payload.questions[i];assert.equal(await page.locator('#plQuestion').innerText(),q.text);
    if(i===5){
     const before=await page.evaluate(()=>Object.values(localStorage).map(v=>{try{return JSON.parse(v);}catch{return null;}}).find(v=>v?.bankVersion&&v.state?.phase==='active'));
     assert(before);deadline=before.state.deadline;
     await page.reload({waitUntil:'networkidle'});await page.locator('#plInput:not([disabled])').waitFor();
     assert.equal(await page.locator('#plQuestion').innerText(),q.text);
     const after=await page.evaluate(()=>Object.values(localStorage).map(v=>{try{return JSON.parse(v);}catch{return null;}}).find(v=>v?.bankVersion&&v.state?.phase==='active'));
     assert.equal(after.state.deadline,deadline);
    }
    const answer=q.answers[0];await page.locator('#plInput').fill(answer.aliases?.[0]||answer.name);await page.locator('#plSubmit').click();
    assert.equal(await page.locator('#powerLevel').getAttribute('data-phase'),'reveal');assert.equal(await page.locator('#plQuestion').innerText(),q.text);
    await page.clock.fastForward(2500);
    if(i<6)await page.locator('#plBegin').click();
   }
   await page.locator('#plResults').waitFor({state:'visible'});assert.match(await page.locator('#plSummary').innerText(),/7\/7 answered/);
   await page.waitForFunction(()=>Object.keys(localStorage).some(k=>k.includes('sent:versioned:')));
   await page.reload({waitUntil:'networkidle'});await page.locator('#plResults').waitFor({state:'visible'});assert.equal(await page.locator('#powerLevel').getAttribute('data-phase'),'done');
   assert.equal((await db.execute({sql:'SELECT count(*) n FROM ascent_scores WHERE guest=?',args:[activeGuest]})).rows[0].n,1);
   const expected=payload.questions.reduce((n,q)=>n+C.points(q.answers[0]),0);assert.equal((await db.execute({sql:'SELECT score FROM ascent_scores WHERE guest=?',args:[activeGuest]})).rows[0].score,expected);assert.equal(Number((await page.locator('#plScore').innerText()).replaceAll(',','')),expected);
   assert.equal((await page.request.get(origin+'/catalogue/private/state.json')).status(),403);
   await page.screenshot({path:path.join(os.tmpdir(),'ascent-browser-'+(mobile?'mobile':'desktop')+'.png'),fullPage:true});
   await page.goto(origin+'/descent',{waitUntil:'networkidle'});await page.locator('#plBegin').click();assert.equal(await page.locator('#powerLevel').getAttribute('data-mode'),'descent');
   assert.equal(await page.locator('#plQuestion').innerText(),require(root+'/power-level/descent').bank(bank).find(q=>q.id===require(root+'/power-level/descent').select(bank,day)[0]).text);
   assert.deepEqual(errors,[]);results.push({viewport:mobile?'mobile':'desktop',questions:7,refreshAtQuestion:6,completedRestored:true,duplicateRows:0,descent:true,consoleErrors:errors.length});await context.close();
  }
  console.log(JSON.stringify({database:'local file-backed libSQL, NOT hosted Turso',content:'existing production questions as technical fixture; no new content approval',results},null,2));
 }finally{clearTimeout(watchdog);if(browser)await browser.close();await new Promise(r=>server.close(r));db.close();fs.rmSync(work,{recursive:true,force:true});}
})().catch(e=>{console.error(e);process.exitCode=1;});

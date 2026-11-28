const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const C=require('./core'),R=require('./run'),D=require('./descent');
const ascent=require('./questions'),descent=require('./descent-questions');
const day='2026-11-27';
const approvedChoices={
 ascent:['Mira Dianus Artemina','Hyakkimaru','She and Her Cat: Their Standing Points','Goku','Bulbasaur','Renkin San-kyuu Magical? Pokaan','Menthuthuyoupi'],
 descent:['Akatsuchi','Yor Forger','The Girl I Like Forgot Her Glasses','Zubat','Charizard','Yowamushi Pedal: New Generation','Vegeta']
};
const aIds=['spear','prosthetic','nonhuman-main','teleport','poison','female-main','shapeshift'].map(x=>'timed-v4-wide-ascent-17-'+x);
const dIds=['headband','sibling','school','wings','fly','games','parent'].map(x=>'timed-v4-descent-8-'+x);

test('November 27 selects the seven new questions in both required orders without changing earlier days',()=>{
 assert.deepEqual(R.select(ascent,day),aIds);
 assert.deepEqual(D.select([...ascent,...descent],day),dIds);
 const frozen=require('./versioning').load(require('./versioning/legacy.json').bankVersion);
 for(let n=11;n<=26;n++){
  const date=`2026-11-${n}`;
  assert.deepEqual(R.select(ascent,date),frozen.run.select(frozen.bank,date),date);
 }
});

test('November 27 banks have unique forms, one Ascent Limit Break, and one Descent Top Answer',()=>{
 const ids=new Set();
 for(const q of [...ascent.filter(q=>aIds.includes(q.id)),...descent.filter(q=>dIds.includes(q.id))]){
  assert(!ids.has(q.id));ids.add(q.id);
  assert(q.answers.length>0,q.id);
  const forms=new Map();
  for(const answer of q.answers){
   assert(Number.isInteger(answer.rarity)&&answer.rarity>=0&&answer.rarity<=100,q.id+': '+answer.name);
   for(const form of [answer.name,...answer.aliases||[]]){
    const key=C.normalize(form);
    assert(!forms.has(key),q.id+': '+form+' collides with '+forms.get(key));forms.set(key,answer.name);
    assert.equal(C.validate(q,form).answer?.name,answer.name,q.id+': '+form);
   }
  }
  if(q.wide)assert.equal(q.answers.filter(a=>a.rarity===100).length,1,q.id);
  if(q.descent){
   assert.equal(q.answers.filter(a=>a.name===q.top).length,1,q.id);
   const flipped=D.question?D.question(q):D.bank([q])[0];
   assert.equal(flipped.answers.filter(a=>C.points(a)===100).length,1,q.id);
   assert.equal(flipped.answers.find(a=>C.points(a)===100).name,q.top,q.id);
  }
 }
 assert.equal(ids.size,14);
});

test('November 27 poison question accepts the complete Poison-type species roster with form-specific names',()=>{
 const q=ascent.find(q=>q.id==='timed-v4-wide-ascent-17-poison');
 assert.equal(q.text,'Name any anime character who uses poison as a weapon or ability, or any Poison-type Pokémon.');
 assert.equal(q.answers.length,158); // 156 approved, two duplicate entries merged, four obvious answers added (Nov 26 review)
 for(const name of ['Bulbasaur','Sneasler','Iron Moth','Galarian Slowbro','Galarian Slowking','Paldean Wooper','Hisuian Sneasel','Arceus (Poison Form)','Silvally (Poison Form)'])
  assert.equal(C.validate(q,name).answer?.name,name);
 for(const name of ['Slowbro','Slowking','Wooper','Sneasel','Arceus','Silvally'])
  assert.equal(C.validate(q,name).answer,undefined,name+' requires its Poison-type form');
 assert.equal(C.validate(q,'Weezing').answer?.name,'Matadogas');
 assert.equal(C.validate(q,'Arbok').answer?.name,'Arbok');
});

test('browser scripts accept the same November 27 answers and compute the same scores as Node',()=>{
 const context=vm.createContext({});
 for(const name of ['core','questions','run','descent-questions','descent-assignments','descent'])
  vm.runInContext(fs.readFileSync(path.join(__dirname,name+'.js'),'utf8'),context,{filename:name+'.js'});
 for(const id of [...aIds,...dIds]){
  const q=[...ascent,...descent].find(q=>q.id===id),name=q.answers[0].name;
  const browser=vm.runInContext(`PowerLevelCore.validate([...POWER_LEVEL_QUESTIONS,...PowerLevelDescentQuestions].find(q=>q.id===${JSON.stringify(id)}),${JSON.stringify(name)})`,context);
  assert.equal(browser.answer.name,C.validate(q,name).answer.name);
  assert.equal(vm.runInContext(`PowerLevelCore.points(${JSON.stringify(q.answers[0])})`,context),C.points(q.answers[0]));
 }
});

test('Ascent and Descent server handlers accept November 27 canonical answers and score them',async()=>{
 const realDate=global.Date,dbPath=require.resolve('../api/_db.js'),guestPath=require.resolve('../api/_guest.js');
 const savedDb=require.cache[dbPath],savedGuest=require.cache[guestPath],tables={ascent_scores:[],descent_scores:[]};
 const db={execute:async query=>{const sql=query.sql,table=sql.includes('descent_scores')?'descent_scores':'ascent_scores';
  if(sql.startsWith('INSERT')){tables[table].push({score:query.args[2],answers:query.args[3]});return {rowsAffected:1};}
  if(sql.startsWith('SELECT'))return {rows:tables[table]};
  throw Error('Unexpected SQL: '+sql);
 }};
 class ClockDate extends realDate{constructor(...args){super(...(args.length?args:[realDate.parse(day+'T17:00:00Z')]))}static now(){return realDate.parse(day+'T17:00:00Z')}}
 const response=()=>({code:200,setHeader(){},status(code){this.code=code;return this},json(body){this.body=body;return this},end(){return this}});
 try{
  global.Date=ClockDate;
  require.cache[dbPath]={id:dbPath,filename:dbPath,loaded:true,exports:{db,ensureAscent:async()=>{},ensureDescent:async()=>{},cors:()=>{}}};
  require.cache[guestPath]={id:guestPath,filename:guestPath,loaded:true,exports:{guest:()=> 'nov27-fixture'}};
  for(const [mode,ids,bank] of [['ascent',aIds,ascent],['descent',dIds,D.bank([...ascent,...descent])]]){
   const handler=require('../api/'+mode+'.js'),answers=ids.map((id,i)=>{const q=bank.find(q=>q.id===id);return C.validate(q,approvedChoices[mode][i]).answer?.name});
   assert(answers.every(Boolean));
   const res=response();await handler({method:'POST',body:{date:day,answers}},res);
   assert.equal(res.code,200,mode+': '+JSON.stringify(res.body));
   assert.equal(res.body.score,ids.reduce((sum,id,i)=>sum+C.points(bank.find(q=>q.id===id).answers.find(a=>a.name===answers[i])),0));
   assert.equal(res.body.recorded,true);
  }
 }finally{
  global.Date=realDate;
  if(savedDb)require.cache[dbPath]=savedDb;else delete require.cache[dbPath];
  if(savedGuest)require.cache[guestPath]=savedGuest;else delete require.cache[guestPath];
  delete require.cache[require.resolve('../api/ascent.js')];delete require.cache[require.resolve('../api/descent.js')];
 }
});

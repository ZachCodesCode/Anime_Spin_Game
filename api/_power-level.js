const C=require('../power-level/core'), R=require('../power-level/run');
const BANK=require('../power-level/versions/questions-v3-1');
const VERSION='v3-1';
const DDL=[`CREATE TABLE IF NOT EXISTS power_level_challenges(date TEXT PRIMARY KEY,version TEXT NOT NULL,questions TEXT NOT NULL)`,
`CREATE TABLE IF NOT EXISTS power_level_daily(id INTEGER PRIMARY KEY AUTOINCREMENT,date TEXT NOT NULL,player_key TEXT NOT NULL,name TEXT NOT NULL,power INTEGER NOT NULL,answered INTEGER NOT NULL,version TEXT NOT NULL,details TEXT NOT NULL,created_at INTEGER NOT NULL,UNIQUE(date,player_key))`,
`CREATE INDEX IF NOT EXISTS power_level_daily_rank ON power_level_daily(date,power DESC,created_at,id)`];
const validDate=d=>typeof d==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(d)&&!isNaN(Date.parse(d))&&new Date(d).toISOString().slice(0,10)===d;
const questions=date=>R.select(BANK,date).map(id=>BANK.find(q=>q.id===id));
function validate(body,challenge){
 if(body.mode!=='daily'||body.phase!=='done'||body.version!==challenge.version||!Array.isArray(body.outcomes)||body.outcomes.length!==5)throw Error('A completed five-question daily run with the correct scoring version is required.');
 const bank=JSON.parse(challenge.questions);
 const details=bank.map((q,i)=>{const o=body.outcomes[i];if(!o||o.id!==q.id||!['answer','skip','timeout'].includes(o.kind))throw Error('Invalid challenge answers.');
 let a=null;let submitted=null;
 if(o.kind==='answer'){
 if(typeof o.submitted!=='string'||o.submitted.length>100||!o.submitted.trim())throw Error('Invalid submitted answer.');
 a=q.answers.find(a=>a.name===o.answer);if(!a)throw Error('Invalid canonical answer.');
 const result=C.validate(q,o.submitted);if(result.answer?.name!==a.name&&!result.suggestions?.some(s=>s.name===a.name))throw Error('Submitted and accepted answers do not match.');submitted=o.submitted;
 }else if(o.answer!=null)throw Error('Skipped questions cannot award power.');
 const boost=a?R.boost(a.rarity):0;
 return {id:q.id,question:q.text,kind:o.kind,submitted,accepted:a?.name||null,rarity:a?.rarity??null,tier:a?C.tier(boost):null,boost};});
 return {details,power:100+details.reduce((n,o)=>n+o.boost,0),answered:details.filter(o=>o.kind==='answer').length};
}
function createHandler(db){let ready;
 const setup=()=>ready||(ready=db.batch(DDL,'write').catch(e=>{ready=null;throw e;}));
 return async(req,res)=>{
 res.setHeader('Cache-Control','no-store');
 const {guest,sameOrigin}=require('./_guest');
 if(!['GET','POST'].includes(req.method))return res.status(405).json({error:'Method not allowed'});
 if(req.method==='POST'&&!sameOrigin(req))return res.status(403).json({error:'Same-origin requests required'});
 try{
 await setup();const today=C.dateKey(),date=req.query.date||today;
 if(!validDate(date)||date>today)return res.status(400).json({error:'Choose a valid challenge date, no later than today.'});
 const player=guest(req,res,true);
 if(date===today)await db.execute({sql:'INSERT OR IGNORE INTO power_level_challenges(date,version,questions) VALUES(?,?,?)',args:[date,VERSION,JSON.stringify(questions(date))]});
 if(req.method==='POST'){
 const body=typeof req.body==='string'?JSON.parse(req.body):req.body||{};
 if(body.date!==date)return res.status(400).json({error:'Challenge date does not match.'});
 // Reject practice even when an entry already exists.
 if(body.mode!=='daily'||body.phase!=='done')return res.status(400).json({error:'Only completed Daily Challenge runs can be ranked.'});
 const challenge=(await db.execute({sql:'SELECT * FROM power_level_challenges WHERE date=?',args:[date]})).rows[0];
 if(!challenge)return res.status(400).json({error:'This challenge was not registered. Start a new daily challenge while online.'});
 let result;try{result=validate(body,challenge);}catch(e){return res.status(400).json({error:e.message});}
 const name=String(body.name||'Anonymous').replace(/\s+/g,' ').trim().slice(0,20)||'Anonymous';
 await db.execute({sql:'INSERT OR IGNORE INTO power_level_daily(date,player_key,name,power,answered,version,details,created_at) VALUES(?,?,?,?,?,?,?,?)',args:[date,player,name,result.power,result.answered,challenge.version,JSON.stringify(result.details),Date.now()]});
 const row=(await db.execute({sql:'SELECT id,name,power,answered FROM power_level_daily WHERE date=? AND player_key=?',args:[date,player]})).rows[0];
 return res.status(200).json({ok:true,entry:row});
 }
 const completed=!!(await db.execute({sql:'SELECT 1 FROM power_level_daily WHERE date=? AND player_key=?',args:[date,player]})).rows.length;
 const unlocked=date<today||completed;
 if(req.query.id){
 if(!unlocked)return res.status(403).json({error:'Complete and save today’s Daily Challenge to unlock player answers. Past challenges are open to everyone.'});
 const row=(await db.execute({sql:'SELECT id,date,name,power,answered,details FROM power_level_daily WHERE date=? AND id=?',args:[date,String(req.query.id)]})).rows[0];
 if(!row)return res.status(404).json({error:'Run not found.'});
 return res.status(200).json({...row,details:JSON.parse(row.details)});
 }
 const offset=Math.max(0,Math.min(100000,parseInt(req.query.offset,10)||0)),limit=20;
 const rows=(await db.execute({sql:`SELECT id,name,power,answered,CASE WHEN player_key=? THEN 1 ELSE 0 END AS mine,RANK() OVER(ORDER BY power DESC) AS rank FROM power_level_daily WHERE date=? ORDER BY power DESC,created_at ASC,id ASC LIMIT ? OFFSET ?`,args:[player,date,limit+1,offset]})).rows;
 return res.status(200).json({date,today,version:VERSION,unlocked,entries:rows.slice(0,limit),more:rows.length>limit});
 }catch(e){return res.status(500).json({error:'Leaderboard unavailable. Your completed run is kept on this device; please retry.'});}
 };
}
module.exports={createHandler,validate,questions,VERSION,DDL,validDate};

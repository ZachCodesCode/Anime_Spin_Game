'use strict';
// Explicit opt-in, SELECT-only export. Never imports api/_db (which bootstraps tables).
async function readOnlyExport({db,from,to,maxRows=50000}){
 const {plus}=require('./fresh');plus(from,0);plus(to,0);if(from>to||!Number.isInteger(maxRows)||maxRows<1||maxRows>1000000)throw Error('Invalid export bounds');
 const tables=new Set((await db.execute("SELECT name FROM sqlite_master WHERE type = 'table'")).rows.map(r=>r.name));if(!tables.has('ascent_scores'))throw Error('Ascent scores unavailable');
 const scores=await db.execute({sql:'SELECT day, guest, answers, score, created_at FROM ascent_scores WHERE day >= ? AND day <= ? ORDER BY day, guest LIMIT ?',args:[from,to,maxRows+1]});
 const versions=tables.has('ascent_score_versions')?(await db.execute({sql:'SELECT day, guest, bank_version, question_ids FROM ascent_score_versions WHERE day >= ? AND day <= ? ORDER BY day, guest LIMIT ?',args:[from,to,maxRows+1]})).rows:[];
 const pins=tables.has('ascent_challenges')?(await db.execute({sql:'SELECT day, bank_version, question_ids FROM ascent_challenges WHERE day >= ? AND day <= ? ORDER BY day LIMIT ?',args:[from,to,maxRows+1]})).rows:[];
 const crypto=require('node:crypto'),salt=crypto.randomBytes(32),metadata=new Map(versions.map(v=>[v.day+'\0'+v.guest,v]));
 return {source:{available:true,readOnly:true,table:'ascent_scores',completedSubmittedRunsOnly:true,from,to,exportedAt:new Date().toISOString(),guestRedactionScope:'per-export; do not concatenate independently salted exports without deduplication',truncated:scores.rows.length>maxRows||versions.length>maxRows||pins.length>maxRows},rows:scores.rows.slice(0,maxRows).map(row=>{const v=metadata.get(row.day+'\0'+row.guest);return {day:row.day,guest:crypto.createHmac('sha256',salt).update(String(row.guest)).digest('hex'),answers:row.answers,score:row.score,...(v?{bankVersion:v.bank_version,questionIds:JSON.parse(v.question_ids)}:{})};}),assignments:pins.slice(0,maxRows).map(p=>({date:p.day,bankVersion:p.bank_version,questionIds:JSON.parse(p.question_ids)}))};
}
module.exports={readOnlyExport};

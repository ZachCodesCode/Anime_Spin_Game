'use strict';
const V = require('../power-level/versioning');
const C = require('../power-level/core');
const baseline = require('../power-level/versioning/legacy.json').bankVersion;
const assignments = require('../power-level/versioning/assignments.json');
const fs = require('node:fs');
const path = require('node:path');
const TABLES = [
 `CREATE TABLE IF NOT EXISTS ascent_challenges (day TEXT PRIMARY KEY, bank_version TEXT NOT NULL, question_ids TEXT NOT NULL)`,
 `CREATE TABLE IF NOT EXISTS ascent_score_versions (day TEXT NOT NULL, guest TEXT NOT NULL, bank_version TEXT NOT NULL, question_ids TEXT NOT NULL, PRIMARY KEY(day, guest))`
];
function service({ db, ensureAscent, activation = process.env.ASCENT_VERSIONING_FROM, releaseRoot=path.join(__dirname,'../power-level/versioning/releases'), baselineVersion=baseline, registry=assignments, policy=require('../power-level/versioning/release-policy.json') }) {
  let ready;
  async function ensure() {
    await ensureAscent();
    if (!ready) ready = db.batch(TABLES, 'write').catch(error => { ready = null; throw error; });
    await ready;
  }
  async function resolve(day) {
    V.date(day);
    await ensure();
    let row = (await db.execute({sql:'SELECT bank_version, question_ids FROM ascent_challenges WHERE day = ?',args:[day]})).rows[0];
    if (!row && activation && policy && V.date(activation)<=policy.protectedThrough)throw Object.assign(Error('Activation must follow the protected Toronto horizon'),{status:503});
    if (!row && activation && day >= V.date(activation)) {
      const explicit = registry.filter(a => a.date === day);
      if (explicit.length > 1) throw Error('Duplicate assignment');
      if(policy&&day>=policy.explicitAssignmentsFrom&&!explicit.length)throw Object.assign(Error('No reviewed assignment published for this Toronto date'),{status:503});
      const release = V.load(baselineVersion,releaseRoot);
      const planned = explicit[0] || {bankVersion:baselineVersion,questionIds:release.run.select(release.bank,day)};
      // Validate before publication. Every server then reads the winning immutable row.
      V.resolve(day,{enabled:true,root:releaseRoot,assignments:[{date:day,...planned}]});
      await db.execute({sql:'INSERT OR IGNORE INTO ascent_challenges (day, bank_version, question_ids) VALUES (?, ?, ?)',args:[day,planned.bankVersion,JSON.stringify(planned.questionIds)]});
      row = (await db.execute({sql:'SELECT bank_version, question_ids FROM ascent_challenges WHERE day = ?',args:[day]})).rows[0];
    }
    if (!row) return {mode:'legacy',...V.resolve(day)};
    const assignment = {date:day,bankVersion:row.bank_version,questionIds:JSON.parse(row.question_ids)};
    return {mode:'versioned',...V.resolve(day,{enabled:true,root:releaseRoot,assignments:[assignment]})};
  }
  async function challenge(day) {
    const selected = await resolve(day);
    if (selected.mode === 'legacy') return {mode:'legacy',date:day};
    const version=selected.payload.bankVersion;
    const manifest=JSON.parse(fs.readFileSync(path.join(releaseRoot,version,'manifest.json')));
    return {mode:'versioned',...selected.payload,rules:['core.js','run.js'].map(name=>({url:`/power-level/versioning/releases/${version}/${name}`,integrity:'sha256-'+Buffer.from(manifest.files[name],'hex').toString('base64')}))};
  }
  async function stats(day,selected) {
    await ensure();
    const rows=(await db.execute({sql:'SELECT s.score, s.answers, v.bank_version, v.question_ids FROM ascent_scores s LEFT JOIN ascent_score_versions v ON s.day = v.day AND s.guest = v.guest WHERE s.day = ?',args:[day]})).rows;
    const ids=selected.payload.questionIds;
    const scores={},picks=Object.fromEntries(ids.map(id=>[id,{}]));
    for(const row of rows) {
      scores[row.score]=(scores[row.score]||0)+1;
      let answers,recordedIds;
      try {answers=JSON.parse(row.answers);recordedIds=row.question_ids?JSON.parse(row.question_ids):null;} catch {continue;}
      if (!Array.isArray(answers)) continue;
      if (selected.mode==='versioned' && row.bank_version!==selected.payload.bankVersion) continue;
      const order=recordedIds || (selected.mode==='legacy'?ids:[]);
      order.forEach((id,i)=>{if(picks[id] && typeof answers[i]==='string')picks[id][answers[i]]=(picks[id][answers[i]]||0)+1;});
    }
    return {date:day,players:rows.length,scores,picks};
  }
  async function submit(body,guest,now=new Date()) {
    if(![C.dateKey(now),C.dateKey(new Date(+now-864e5))].includes(body.date))throw Object.assign(Error('Not a current ascent'),{status:400});
    const selected=await resolve(body.date);
    const p=selected.payload;
    if(selected.mode==='versioned' && (body.bankVersion!==p.bankVersion || JSON.stringify(body.questionIds)!==JSON.stringify(p.questionIds)))throw Object.assign(Error('Challenge changed. Refresh to load the matching version.'),{status:409});
    if(selected.mode==='legacy' && body.bankVersion && body.bankVersion!=='legacy')throw Object.assign(Error('Challenge version mismatch'),{status:409});
    let score;
    try {score=require('../power-level/versioning/runtime').create(p,selected.core,selected.run).score(body.answers);}catch {throw Object.assign(Error('Invalid run'),{status:400});}
    const statements=[{sql:'INSERT OR IGNORE INTO ascent_scores (day, guest, score, answers, created_at) VALUES (?, ?, ?, ?, ?)',args:[body.date,guest,score,JSON.stringify(body.answers),+now]}];
    if(selected.mode==='versioned')statements.push({sql:'INSERT INTO ascent_score_versions (day, guest, bank_version, question_ids) SELECT ?, ?, ?, ? WHERE changes() = 1',args:[body.date,guest,p.bankVersion,JSON.stringify(p.questionIds)]});
    const result=await db.batch(statements,'write');
    const stored=(await db.execute({sql:'SELECT score FROM ascent_scores WHERE day = ? AND guest = ?',args:[body.date,guest]})).rows[0];
    return {...await stats(body.date,selected),score:Number(stored.score),recorded:result[0].rowsAffected===1};
  }
  return {resolve,challenge,stats,submit};
}
module.exports={service,TABLES};

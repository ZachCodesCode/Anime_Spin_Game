'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const {fileDatabase}=require('./test-helpers/sqlite');
const V=require('./versioning'),R=require('./run'),C=require('./core'),bank=require('./questions');
const {service}=require('../api/_ascent-versioning');
async function fixture(run){const owned=await fileDatabase('ascent-release-policy-'),{db}=owned;const ensureAscent=()=>db.execute('CREATE TABLE IF NOT EXISTS ascent_scores(day TEXT,guest TEXT,score INTEGER,answers TEXT,created_at INTEGER,PRIMARY KEY(day,guest))');try{await run(db,ensureAscent);}finally{await owned.dispose();}}
test('production baseline includes all current answers and immutable releases remain loadable',()=>{
 const frozen=V.load(require('./versioning/legacy.json').bankVersion),historical=bank.filter(q=>!q.since||q.since<'2026-11-27');
 assert.equal(frozen.bank.length,historical.length);
 for(let i=0;i<historical.length;i++)assert.deepEqual(frozen.bank[i],{...JSON.parse(JSON.stringify(historical[i])),answers:JSON.parse(JSON.stringify(historical[i].answers.slice(0,frozen.bank[i].answers.length)))});
 for(const dir of fs.readdirSync(path.join(__dirname,'versioning/releases')))V.load(dir);
});
test('November 11–26 legacy selections and November 23 protection remain unchanged',()=>fixture(async(db,ensureAscent)=>{
 const off=service({db,ensureAscent});
 for(let day=11;day<=26;day++){const date=`2026-11-${day}`,resolved=await off.resolve(date);assert.equal(resolved.mode,'legacy');assert.deepEqual(resolved.payload.questionIds,R.select(bank,date));}
 assert.equal((await db.execute('SELECT count(*) AS n FROM ascent_challenges')).rows[0].n,0);
 const on=service({db,ensureAscent,activation:'2026-11-24'});
 for(let day=11;day<=23;day++)assert.equal((await on.resolve(`2026-11-${day}`)).mode,'legacy');
 for(const day of [24,25,26,27])await assert.rejects(on.resolve(`2026-11-${day}`),/No reviewed assignment/);
 await assert.rejects(service({db,ensureAscent,activation:'2026-11-23'}).resolve('2026-11-24'),/protected Toronto horizon/);
}));
test('explicit assignments use frozen canonical answers; existing pins win and survive rollback',()=>fixture(async(db,ensureAscent)=>{
 const day='2026-11-24',bankVersion=require('./versioning/legacy.json').bankVersion,questionIds=R.select(bank,day),registry=[{date:day,bankVersion,questionIds}];
 // Existing production content is a technical integration fixture, never new-content approval.
 const api=service({db,ensureAscent,activation:day,registry}),challenge=await api.challenge(day);
 assert.deepEqual(challenge.questionIds,questionIds);const answers=challenge.questions.map(q=>q.answers[0].name);
 const body={date:day,bankVersion,questionIds,answers},saved=await api.submit(body,'test-only',new Date(day+'T17:00:00Z'));
 assert.equal(saved.score,challenge.questions.reduce((n,q)=>n+C.points(q.answers[0]),0));
 assert.equal((await api.submit(body,'test-only',new Date(day+'T17:00:00Z'))).recorded,false);
 const conflicting=service({db,ensureAscent,activation:day,registry:[{date:day,bankVersion:'bad',questionIds:[]}]});assert.deepEqual(await conflicting.challenge(day),challenge);
 assert.deepEqual(await service({db,ensureAscent}).challenge(day),challenge);
}));

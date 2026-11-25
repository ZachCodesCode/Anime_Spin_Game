'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const I=require('../import'),{validate}=require('../validate'),{benchmark}=require('../benchmark');
const {ingest}=require('../traits/ingest'),M=require('../traits/model');
const definitions=require('../traits/data/definitions.json'),catalogue=require('./fixtures').catalogue,pilot=require('./fixtures').pilot;
const request=async p=>p.endsWith('/characters')?{data:Array.from({length:5000},(_,i)=>({character:{mal_id:i+1,name:'Synthetic '+i},role:'Supporting'}))}:{data:{mal_id:Number(p.split('/').at(-1)),title:'Synthetic anime'}};
test('large cast import, stable ID dedup, incremental passes and resumable no-op',async()=>{
 const d=I.empty();await I.run({animeIds:[1,2],characterDetails:false,passId:'test'},d,request);
 assert.equal(d.characters.length,5000);assert.equal(d.appearances.length,10000);validate(d);
 const before=JSON.stringify(d.characters);
 await I.run({animeIds:[1,2],characterDetails:false,passId:'test'},d,()=>{throw Error('Already complete');});
 await I.run({animeIds:[1],characterDetails:false,passId:'update'},d,request);
 assert.equal(JSON.stringify(d.characters),before);assert.equal(d.appearances.length,10000);
 const b=benchmark(d);assert.equal(b.lookupHits,100000);assert.equal(b.deduplicated,5000);assert.ok(b.prettyBytes<10e6);assert.ok(b.validationMs<10000);
});
test('failed anime retains partial identities, reports failure, resumes incomplete pass',async()=>{
 const d=I.empty();let interrupted=true;
 const req=async p=>{if(p==='/anime/2'&&interrupted)throw Error('network');return request(p);};
 await I.run({animeIds:[1,2],characterDetails:false,passId:'p',maxCharactersPerAnime:3,continueOnError:true},d,req);
 assert.deepEqual(d.importPasses,['p:1']);assert.match(d.review[0],/anime 2/);
 interrupted=false;await I.run({animeIds:[1,2],characterDetails:false,passId:'p',maxCharactersPerAnime:3},d,req);
 assert.equal(d.characters.length,3);assert.equal(d.appearances.length,6);
});
test('cap and target are configurable; rate interval cannot exceed public request allowance',async()=>{
 assert.throws(()=>I.client({intervalMs:0}));
 const d=I.empty();await I.run({animeIds:[1,2],characterDetails:false,maxCharactersPerAnime:50,targetCharacters:30},d,request);
 assert.equal(d.characters.length,50);assert.equal(d.anime.length,1);
 await assert.rejects(I.run({animeIds:[1],passId:'bad:pass'},d,request));
});
function bundle(){const suggestions=structuredClone(pilot);for(const s of suggestions)s.claim.provenance.basis='source_fact';return {source:{license:'individual-evidence-review',url:'https://example.org/source',permissionUrl:'https://example.org/terms',reviewedBy:'test-only',reviewedAt:new Date().toISOString()},suggestions};}
test('local candidate adapter enforces provenance, evidence, IDs, and unverified initial states',()=>{
 const empty={version:1,associations:[]},b=bundle();
 const s=ingest(empty,b,definitions,catalogue);assert.deepEqual(ingest(s,b,definitions,catalogue),s);
 for(const mutate of [b=>b.source.license='unknown',b=>b.suggestions[0].claim.evidence=[],b=>b.suggestions[0].claim.provenance.basis=undefined,b=>b.suggestions[0].claim.provenance.externalCharacterId='mal:9999999',b=>b.suggestions[0].status='verified']){
  const invalid=structuredClone(b);mutate(invalid);assert.throws(()=>ingest(empty,invalid,definitions,catalogue));
 }
});
test('candidate reingestion preserves approved and rejected history',()=>{
 const b=bundle();let s=ingest({version:1,associations:[]},b,definitions,catalogue);
 for(const [i,status] of ['verified','rejected'].entries())s=M.review(s,{operationId:'decision-'+i,claimId:s.associations[i].id,expectedRevision:0,status,reviewer:'test-human',note:'Test fixture only',claim:M.latest(s.associations[i]).claim},definitions,catalogue);
 assert.deepEqual(ingest(s,b,definitions,catalogue),s);
});
test('empty casts remain retryable and malformed cast identities are reported',async()=>{
 const d=I.empty();await I.run({animeIds:[1],passId:'empty',characterDetails:false},d,async p=>p.endsWith('/characters')?{data:[]}:{data:{mal_id:1,title:'Missing cast'}});
 assert.equal(d.importPasses.length,0);assert.match(d.review[0],/empty cast/);
 await I.run({animeIds:[1],characterDetails:false},d,async p=>p.endsWith('/characters')?{data:[{character:{mal_id:3,name:null}}]}:{data:{mal_id:1,title:'Missing cast'}});
 assert.equal(d.characters.length,0);assert.ok(d.review.some(x=>/Missing name/.test(x)));
});
test('coverage inventory includes the current bank and preserves historical daily coverage',()=>{
 const {coverage,distribution}=require('../coverage'),rows=coverage(catalogue,{version:1,associations:[]});
 const bank=require('../../power-level/questions'),historical=require('../../power-level/versioning/releases/32fb7940214ef6a3e3615e039fa5b5da1e07ed058af118ceafc268be5c65671d/bank.json'),oldIds=new Set(historical.map(q=>q.id));
 assert.equal(rows.length,bank.length);assert.deepEqual(new Set(rows.map(r=>r.questionId)),new Set(bank.map(q=>q.id)));
 assert.equal(rows.filter(x=>x.dailyPriority).length,bank.filter(q=>q.wide).length);
 assert.equal(rows.filter(x=>oldIds.has(x.questionId)).length,174);assert.equal(rows.filter(x=>oldIds.has(x.questionId)&&x.dailyPriority).length,71);
 assert.equal(rows.find(x=>x.questionId.endsWith('wide-studios')).entityType,'anime_or_studio');
 assert.equal(rows.find(x=>x.questionId.endsWith('wide-cats')).requiredAttribute.traitId,'identity.species');
 assert.equal(distribution(catalogue,{}).byPopularity.unknown,catalogue.characters.length);
});
test('lock recovery never removes a lock owned by a live importer',()=>{
 const fs=require('node:fs'),os=require('node:os'),path=require('node:path');const dir=fs.mkdtempSync(path.join(os.tmpdir(),'ascent-lock-')),file=path.join(dir,'lock');
 const handle=I.acquireLock(file);
 try{assert.throws(()=>I.acquireLock(file,true),/still running/);assert.throws(()=>I.acquireLock(file));}finally{fs.closeSync(handle);fs.rmSync(dir,{recursive:true,force:true});}
});
test('coverage metadata retains source facts and rejects invalid or mismatched fields',()=>{
 const {extract,validateAll}=require('../metadata');
 const m=extract({mal_id:1,title:'Fixture',genres:[{mal_id:4,name:'Comedy'}]});assert.equal(m.popularity,null);assert.equal(m.year,null);
 assert.equal(validateAll({'1':m})['1'],m);assert.throws(()=>validateAll({'2':m}));
 for(const patch of [{genres:'invented'},{popularity:'mainstream'},{year:'1990s'},{genres:[{mal_id:1}]}])assert.throws(()=>extract({mal_id:1,title:'Fixture',...patch}));
});

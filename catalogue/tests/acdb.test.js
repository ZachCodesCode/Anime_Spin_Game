'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),{spawnSync}=require('node:child_process');
const A=require('../acdb/review'),S=require('../verification/store'),V=require('../verification/model');
test('ACDB parser handles quoted delimiters, escapes, nulls and malformed tuples',()=>{
 const p=spawnSync('python3',['-B','-c',`from catalogue.acdb.stage import tuples,norm
assert list(tuples("(1,'a,b','it\\\\'s',NULL),(2,'x(y)','z',3)"))==[['1','a,b',"it's",None],['2','x(y)','z','3']]
try: list(tuples("(1,'broken")); raise AssertionError('accepted')
except ValueError: pass
assert norm('Kurosaki, Ichigo')==norm('Ichigo Kurosaki')
`],{encoding:'utf8'});assert.equal(p.status,0,p.stderr);
});
function fixture(){const c=S.deps.catalogue.characters[0],a=S.deps.catalogue.appearances.find(a=>a.characterId===c.id);return {version:'a'.repeat(64),sourceManifest:{license:'ODbL-1.0 + DbCL-1.0'},mappingHash:'test',notPublishable:true,records:[{acdbId:'test-1',sourceUrl:'https://www.animecharactersdatabase.com/characters.php?id=1',matches:{[c.id]:[a.animeId]},attributes:{hair_color:{code:'9',label:'Red'}},warnings:[]}]};}
test('ACDB metadata yields only unverified review proposals with publication holds',()=>{const b=A.batch(fixture(),S.deps);assert.ok(b.candidates.length);for(const r of b.candidates){assert.equal(r.identity,'catalogue_only');assert.equal(r.claim.context.persistence,'unknown');assert.equal(r.evidence.publicationHold,true);assert.equal(r.evidence.permission,'unresolved');}});
test('ambiguous identities, unknown colours and missing anime appearances never auto-match',()=>{const f=fixture();f.records[0].matches.other=['wrong'];assert.equal(A.batch(f,S.deps).candidates.length,0);delete f.records[0].matches.other;f.records[0].attributes.hair_color.label='Gray';assert.equal(A.batch(f,S.deps).candidates.length,0);f.records[0].attributes.hair_color.label='Red';f.records[0].matches[Object.keys(f.records[0].matches)[0]]=['wrong'];assert.throws(()=>A.batch(f,S.deps));});
test('ACDB repeats preserve history and cannot qualify for strict batch approval',()=>{const b=A.batch(fixture(),S.deps),empty={version:1,revision:0,traits:{version:1,associations:[]},records:[],decisions:[]};const first=A.merge(empty,b,S.deps);assert.deepEqual(A.merge(first.state,b,S.deps).state,first.state);assert.equal(empty.records.length,0);for(const r of V.view(first.state,S.deps).records)assert.equal(r.assessment.canIndividuallyApprove,false);});
test('ACDB private staging transactions resume, deduplicate and retain versions',()=>{const p=spawnSync('python3',['-B','catalogue/acdb/test_stage.py'],{encoding:'utf8'});assert.equal(p.status,0,p.stderr);});
test('ACDB reviewed claims are held without rewriting history',()=>{
 const b=A.batch(fixture(),S.deps),empty={version:1,revision:0,traits:{version:1,associations:[]},records:[],decisions:[]};const first=A.merge(empty,b,S.deps).state;
 const M=require('../traits/model');for(const a of first.traits.associations)first.traits=M.review(first.traits,{operationId:'reject:'+a.id,claimId:a.id,expectedRevision:a.history.at(-1).after.revision,status:'rejected',reviewer:'Synthetic test maintainer',note:'Synthetic rejection',claim:a.history.at(-1).after.claim},S.deps.definitions,S.deps.catalogue);
 const next=A.merge(first,b,S.deps);assert.deepEqual(next.state,first);assert.equal(next.held.length,b.candidates.length);
});

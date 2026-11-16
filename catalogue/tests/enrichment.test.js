'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const W=require('../enrichment/wikidata'),A=require('../enrichment/aliases'),E=require('../enrichment/eligibility'),M=require('../traits/model'),{ingest}=require('../traits/ingest');
const at='2026-11-16T12:00:00Z';
const catalogue={characters:[{id:'mal-character-1',malId:1,name:'Alpha, Red',aliases:[],japaneseName:null},{id:'mal-character-2',malId:2,name:'Beta, Red',aliases:['Shared'],japaneseName:null}],anime:[{id:'mal-anime-1',name:'Fixture'}],appearances:[{characterId:'mal-character-1',animeId:'mal-anime-1'},{characterId:'mal-character-2',animeId:'mal-anime-1'}]};
const claim=(id,value,extra={})=>({id,rank:'normal',mainsnak:{snaktype:'value',datavalue:{value}},...extra});
function entity(){return {id:'Q1',lastrevid:100,labels:{en:{value:'Red Alpha'}},aliases:{en:[{value:'Shared'},{value:'Documented nickname'}]},claims:{P4085:[claim('Q1$id','1')],P1884:[claim('Q1$hair',{id:'Q152357'},{qualifiers:{P580:[{snaktype:'value',datavalue:{value:'fixture-context'}}]},references:[{hash:'fixture',snaks:{P854:[{datavalue:{value:'https://example.org/evidence'}}]}}]})]}};}
const defs=require('../traits/data/definitions.json');
function bundle(suggestions){return {source:{license:'CC0-1.0',url:'https://www.wikidata.org',permissionUrl:'https://www.wikidata.org/wiki/Wikidata:Licensing',reviewedBy:'test-source-review',reviewedAt:at},suggestions};}
test('statement candidates retain revision, qualifiers and reference provenance without approval',()=>{
 const r=W.candidates({Q1:entity()},catalogue,{at});assert.equal(r.candidates.length,1);const c=r.candidates[0];
 assert.equal(c.source.revision,100);assert.ok(c.source.qualifiers.P580);assert.equal(c.source.references.length,1);assert.match(c.suggestion.claim.evidence[0].url,/oldid=100/);
 assert.equal(c.suggestion.status,'needs_review');assert.equal(c.suggestion.claim.context.animeId,null);
 assert.equal(W.candidates({Q1:entity()},catalogue,{at}).candidates[0].suggestion.id,c.suggestion.id);
});
test('missing revisions, unknown values, deprecated claims and ambiguous identity links fail closed',()=>{
 for(const mutate of [e=>delete e.lastrevid,e=>e.claims.P1884[0].rank='deprecated',e=>e.claims.P1884[0].mainsnak.datavalue.value.id='Q999',e=>e.claims.P4085.push(claim('Q1$other','2')),e=>e.id='not-an-entity']){const e=entity();mutate(e);assert.equal(W.candidates({Q1:e},catalogue,{at}).candidates.length,0);}
 const e=entity(),other={...structuredClone(e),id:'Q2'};assert.equal(W.candidates({Q1:e,Q2:other},catalogue,{at}).candidates.length,0);
});
test('trait ingestion is idempotent and preserves rejected review history',()=>{
 const b=bundle(W.candidates({Q1:entity()},catalogue,{at}).candidates.map(c=>c.suggestion));
 let s=ingest({version:1,associations:[]},b,defs,catalogue);assert.deepEqual(ingest(s,b,defs,catalogue),s);
 s=M.review(s,{claimId:s.associations[0].id,operationId:'fixture-rejection',expectedRevision:0,status:'rejected',reviewer:'test-reviewer',note:'Synthetic rejection',claim:M.latest(s.associations[0]).claim},defs,catalogue);
 assert.deepEqual(ingest(s,b,defs,catalogue),s);
 const duplicate=structuredClone(b);duplicate.suggestions[0].id='new-id-same-claim';assert.throws(()=>ingest(s,duplicate,defs,catalogue));
});
test('missing evidence and missing source licensing are rejected',()=>{
 const b=bundle(W.candidates({Q1:entity()},catalogue,{at}).candidates.map(c=>c.suggestion));
 const noEvidence=structuredClone(b);noEvidence.suggestions[0].claim.evidence=[];assert.throws(()=>ingest({version:1,associations:[]},noEvidence,defs,catalogue));
 delete b.source.permissionUrl;assert.throws(()=>ingest({version:1,associations:[]},b,defs,catalogue));
});
test('aliases preserve separate IDs and flag collisions; rejected suggestions survive reruns',()=>{
 const rows=A.propose(catalogue,{Q1:entity()});const shared=rows.find(x=>x.name==='Shared');assert.equal(shared.status,'ambiguous');assert.deepEqual(shared.collidesWith,['mal-character-2']);
 assert.ok(rows.some(x=>x.name==='Red Alpha'&&x.kind==='reversed_name_order'));
 const rejected=rows.map(x=>({...x,status:'rejected'}));assert.deepEqual(A.merge(rejected,rows),rejected);
 assert.equal(A.merge(rows,rows).length,rows.length);assert.equal(catalogue.characters[0].aliases.length,0);
 const ambiguous=A.propose(catalogue,{Q1:entity(),Q2:{...entity(),id:'Q2'}});assert.ok(!ambiguous.some(x=>x.name==='Documented nickname'));
});
test('eligibility inventory covers all active questions and never treats verification as approval',()=>{
 const questions=require('../../power-level/questions'),policy=E.validate(require('../enrichment/eligibility.json'),questions);
 assert.equal(policy.questions.length,34);assert.equal(policy.questions.filter(q=>q.type==='character').length,24);assert.equal(policy.questions.filter(q=>q.type==='non_character').length,10);
 const s={history:[{after:{status:'verified',claim:{traitId:'appearance.hair_color',value:'red',context:{animeId:'mal-anime-1',persistence:'recurring'}}}}]};
 const r=policy.questions.find(x=>x.questionId.endsWith('mix-red-hair'));assert.equal(E.assess(r,s).relevant,true);assert.equal(E.assess(r,s).eligible,false);
 const invalid=structuredClone(policy);invalid.questions.pop();assert.throws(()=>E.validate(invalid,questions));
});
test('context-specific forms cannot be silently approved without episode/form details',()=>{
 const suggestion=W.candidates({Q1:entity()},catalogue,{at}).candidates[0].suggestion;
 suggestion.claim.context.persistence='transformation_specific';assert.throws(()=>ingest({version:1,associations:[]},bundle([suggestion]),defs,catalogue));
 suggestion.claim.context.form='Test-only episode/form';const s=ingest({version:1,associations:[]},bundle([suggestion]),defs,catalogue);
 assert.throws(()=>M.review(s,{claimId:s.associations[0].id,operationId:'test-verify',expectedRevision:0,status:'verified',reviewer:'test-reviewer',note:'Test',claim:suggestion.claim},defs,catalogue));
});
test('bounded selection respects per-anime limits and rejects invalid options',()=>{
 const e=entity(),e2=structuredClone(e);e2.id='Q2';e2.claims.P4085=[claim('Q2$id','2')];e2.claims.P1884[0].id='Q2$hair';
 assert.equal(W.candidates({Q1:e,Q2:e2},catalogue,{at,perAnime:1}).candidates.length,1);
 assert.throws(()=>W.candidates({},catalogue,{limit:0}));
});
test('invalid eligibility definitions do not silently widen question scope',()=>{
 const policy=structuredClone(require('../enrichment/eligibility.json')),questions=require('../../power-level/questions');
 policy.questions.find(r=>r.type==='character').traitChecks[0].traitId='made-up-trait';assert.throws(()=>E.validate(policy,questions));
});
test('Wikidata lowercase statement entity prefixes are valid',()=>{
 const e=entity();e.claims.P1884[0].id='q1$hair';assert.equal(W.candidates({Q1:e},catalogue,{at}).candidates.length,1);
});

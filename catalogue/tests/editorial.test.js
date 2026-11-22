'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const E=require('../editorial/model'),M=require('../traits/model');
const definitions=require('../traits/data/definitions.json');
const catalogue={characters:[{id:'c1',name:'Test, Alpha',aliases:[]},{id:'c2',name:'Other, Alpha',aliases:[]}],anime:[{id:'a1',name:'Original'},{id:'a2',name:'Remake'}],appearances:[{characterId:'c1',animeId:'a1'},{characterId:'c2',animeId:'a1'}]};
const q={id:'q1',text:'Name a character with red hair.',answers:[{name:'Existing Person',aliases:['Existing Alias'],rarity:1}]};
const policy={questions:[{questionId:'q1',type:'character',traitChecks:[{traitId:'appearance.hair_color',values:['red']}]}]};
function fixture(){
 const claim={characterId:'c1',traitId:'appearance.hair_color',value:'red',context:{animeId:'a1',scope:'Original series',persistence:'recurring',form:null},evidence:[{url:'https://example.org/official',sourceName:'Synthetic official fixture',explanation:'Explicit red hair in original anime.',kind:'official',accessedAt:'2026-11-16T00:00:00Z'}],provenance:{provider:'synthetic fixture',externalCharacterId:null,uncertainty:'No actual character data.'}};
 const store=M.propose({version:1,associations:[]},[{id:'claim1',status:'needs_review',claim}],definitions,catalogue);
 const row={id:'review1',claimId:'claim1',questionId:'q1',characterId:'c1',animeId:'a1',batch:'category',identity:{status:'corroborated',note:'Synthetic matching identity'},evidence:[{url:'https://example.org/official',kind:'primary',supports:'trait',fact:'Red hair explicitly stated',animeId:'a1',locator:'Synthetic profile',accessedAt:'2026-11-16T00:00:00Z'}],eligibility:{status:'recommend_include',note:'Recurring red hair in original series'},note:'Synthetic only'};
 return {claim,store,row};
}
const preview=(rows,store,aliases=[])=>E.preview(rows,store,catalogue,aliases,policy,[q]).questions[0];
test('editorial evidence distinguishes exact trait support from mentions, remakes and inference',()=>{
 const {row}=fixture();assert.equal(E.quality(row),'direct');
 row.evidence[0].supports='identity';assert.equal(E.quality(row),'insufficient');
 row.evidence[0].supports='trait';row.evidence[0].animeId='a2';assert.equal(E.quality(row),'insufficient');
 row.evidence[0].kind='secondary';assert.equal(E.quality(row),'secondary');
 row.evidence[0].kind='dataset';assert.equal(E.quality(row),'unreferenced');
 row.evidence[0].supports='contradicts';assert.equal(E.quality(row),'conflicting');
});
test('identity conflicts and uncorroborated identity cannot count as direct evidence',()=>{
 const {row,store}=fixture();row.identity.status='conflict';assert.equal(E.quality(row),'conflicting');
 row.identity.status='catalogue_only';assert.equal(E.quality(row),'insufficient');
 row.characterId='c2';assert.throws(()=>E.validate([row],store,definitions,catalogue,policy,[q]),/identity conflict/);
});
test('editorial validation rejects invalid claims, adaptation mappings and evidence URLs',()=>{
 const {row,store}=fixture();assert.deepEqual(E.validate([row],store,definitions,catalogue,policy,[q]),[row]);
 for(const mutate of [r=>r.claimId='missing',r=>r.animeId='a2',r=>r.questionId='unknown',r=>r.evidence[0].url='javascript:bad',r=>r.evidence[0].fact='',r=>r.evidence[0].supports='genre_tag']) {const r=structuredClone(row);mutate(r);assert.throws(()=>E.validate([r],store,definitions,catalogue,policy,[q]));}
 const invalid=structuredClone(store);invalid.associations[0].history[0].after.claim.value='blue';assert.throws(()=>E.validate([row],invalid,definitions,catalogue,policy,[q]));
});
test('question-specific eligibility remains independent from direct trait evidence',()=>{
 const {row,store}=fixture();assert.equal(preview([row],store).estimatedIncreaseIfApproved,1);
 row.eligibility.status='needs_context';assert.equal(preview([row],store).estimatedIncreaseIfApproved,0);
 row.eligibility.status='recommend_exclude';assert.equal(preview([row],store).entries[0].classification,'invalid_for_question');
 const wrong=structuredClone(policy);wrong.questions[0].traitChecks[0].values=['white'];assert.throws(()=>E.validate([row],store,definitions,catalogue,wrong,[q]));
});
test('duplicate character/question coverage is counted once using strongest evidence',()=>{
 const {row,store}=fixture(),weak=structuredClone(row);weak.id='weak';weak.evidence[0].kind='secondary';
 for(const rows of [[weak,row],[row,weak]]){const p=preview(rows,store);assert.equal(p.estimatedIncreaseIfApproved,1);assert.equal(p.entries.filter(e=>e.classification==='duplicate').length,1);}
 assert.throws(()=>E.validate([row,row],store,definitions,catalogue,policy,[q]),/Duplicate/);
});
test('aliases identify current accepted names while colliding aliases stay withheld',()=>{
 const {row,store}=fixture(),alias={id:'a',characterId:'c1',name:'Existing Alias',kind:'source_alias',collidesWith:[],status:'needs_review'};
 assert.equal(preview([row],store,[alias]).entries[0].classification,'existing_answer_or_alias');
 alias.collidesWith=['c2'];const p=preview([row],store,[alias]);assert.equal(p.entries[0].alreadyAccepted,false);assert.ok(p.entries[0].warnings.some(w=>w.includes('Ambiguous')));
 const report=E.aliasReport([row],catalogue,[alias],[q]);assert.equal(report[0].recommendation,'hold_collision');assert.equal(report[0].applied,false);
});
test('maintainer templates are deliberately non-executable and generation preserves histories',()=>{
 const {row,store}=fixture(),before=structuredClone(store);const t=E.decisionTemplate(row,store);
 assert.equal(t.action.status,null);assert.equal(t.action.reviewer,null);assert.throws(()=>E.applyDecision(store,t.action,definitions,catalogue));
 preview([row],store);assert.deepEqual(store,before);
});
test('explicit offline decisions retain history, enforce revision and support retry idempotency',()=>{
 const {store,claim}=fixture(),action={claimId:'claim1',operationId:'synthetic-review',expectedRevision:0,status:'needs_review',reviewer:'fixture-maintainer',note:'Synthetic request for further evidence',claim};
 const after=E.applyDecision(store,action,definitions,catalogue);assert.deepEqual(after.associations[0].history[0],store.associations[0].history[0]);assert.equal(after.associations[0].history.length,2);
 assert.deepEqual(E.applyDecision(after,action,definitions,catalogue),after);
 assert.throws(()=>E.applyDecision(after,{...action,operationId:'stale'},definitions,catalogue),/Stale/);
 assert.throws(()=>E.applyDecision(store,{...action,reviewer:'import:automatic'},definitions,catalogue));
});
test('rejected claims do not contribute estimated coverage after regeneration',()=>{
 const {row,store,claim}=fixture();const after=E.applyDecision(store,{claimId:'claim1',operationId:'reject',expectedRevision:0,status:'rejected',reviewer:'fixture-maintainer',note:'Synthetic rejection',claim},definitions,catalogue);
 assert.equal(preview([row],after).estimatedIncreaseIfApproved,0);assert.equal(preview([row],after).entries[0].classification,'rejected_claim');
});
test('offline previews do not export rarity or approved answers; direct support is not approval',()=>{
 const {row,store}=fixture(),p=preview([row],store);assert.equal(p.currentAcceptedCount,1);assert.equal(p.approvedIncrease,0);assert.equal(p.entries[0].status,'needs_review');assert.equal(p.pending,1);
 assert.ok(!JSON.stringify(p).includes('rarity'));assert.ok(!JSON.stringify(p).includes('Limit Break'));
});
test('editorial processing leaves live answer bank and scoring inputs unchanged',()=>{
 const questions=require('../../power-level/questions'),core=require('../../power-level/core');const before=E.hash(questions);
 const answers=questions.map(q=>q.answers?.[0]?core.validate(q,q.answers[0].name):null);
 const {row,store}=fixture();preview([row],store);E.decisionTemplate(row,store);
 assert.equal(E.hash(questions),before);assert.deepEqual(questions.map(q=>q.answers?.[0]?core.validate(q,q.answers[0].name):null),answers);
});
test('an existing alias match cannot hide conflicting trait evidence',()=>{
 const {row,store}=fixture();row.evidence[0].supports='contradicts';
 const aliases=[{characterId:'c1',name:'Existing Alias',kind:'source_alias',collidesWith:[],status:'needs_review'}];
 assert.equal(preview([row],store,aliases).entries[0].classification,'conflicting');
 assert.equal(preview([row],store,aliases).estimatedIncreaseIfApproved,0);
});
test('even an explicit trait verification cannot authorize live question inclusion',()=>{
 const {row,store,claim}=fixture();const after=E.applyDecision(store,{claimId:'claim1',operationId:'synthetic-verify',expectedRevision:0,status:'verified',reviewer:'fixture-maintainer',note:'Synthetic trait verification, no question decision',claim},definitions,catalogue);
 const p=preview([row],after);assert.equal(p.entries[0].status,'verified');assert.equal(p.approvedIncrease,0);
 assert.equal(store.associations[0].history.length,1);
});

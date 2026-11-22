'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const A=require('../expansion/private-admission'),E=require('../verification/source-review'),V=require('../verification/model'),P=require('../verification/pipeline');
const date='2026-11-20T00:00:00Z',roster=['fixture-only-maintainer'];
const action={reviewer:roster[0],reason:'Synthetic unit-test source inspection only',at:date};
function fixture(){
 const catalogue={version:1,anime:[],characters:[],appearances:[],completedAnime:[],review:[],apiFailures:0};
 const anime={provider:'Tenrai',url:'https://api.tenrai.org/v1/anime/1',retrievedAt:date,response:{data:{mal_id:1,title:'Synthetic anime',year:2000}}};
 const character={provider:'Tenrai',retrievedAt:date,sourceUrl:'https://api.tenrai.org/v1/characters/2',expectedMalId:2,expectedName:'Example, Synthetic',character:{mal_id:2,name:'Example, Synthetic',nicknames:[]},animeIds:[1],animeAssociations:[{anime:{mal_id:1,title:'Synthetic anime'},role:'Main'}],associationSourceUrl:'https://api.tenrai.org/v1/characters/2/anime',publicationRights:'unresolved'};
 const state=A.initial(catalogue,{}),request={expectedStateHash:V.hash(state),characters:[{snapshot:character,sourceHash:V.hash(character)}],anime:[{snapshot:anime,sourceHash:V.hash(anime)}]};
 return {state,request};
}
function planned(state,request){const p=A.inspect(state,request);return A.prepare(state,request,{...action,expectedPreviewDigest:p.digest,rights:{scope:'private-review-only',publication:'unresolved',basis:'Synthetic fixture; no real rights decision',references:['https://example.org/test-only']}},roster);}
test('bounded admission previews exact private changes; confirmation is audited and idempotent',()=>{
 const {state,request}=fixture(),before=V.hash(state),plan=planned(state,request);
 assert.equal(plan.preview.changes.anime.length,1);assert.equal(plan.preview.changes.characters.length,1);assert.equal(plan.preview.changes.appearances.length,1);assert.equal(plan.preview.changes.metadata.length,1);
 assert.throws(()=>A.commit(state,plan,'fixture-op',false,roster));const out=A.commit(state,plan,'fixture-op',true,roster);
 assert.equal(V.hash(state),before);assert.equal(out.audit.length,1);assert.equal(out.audit[0].publicationHold,true);assert.deepEqual(A.commit(out,plan,'fixture-op',true,roster),out);assert.equal(out.catalogue.characters[0].id,'mal-character-2');
 assert.throws(()=>A.commit(out,{...plan,digest:'changed'},'fixture-op',true,roster));
 const bad=structuredClone(out);bad.catalogue.characters[0].name='changed';assert.throws(()=>A.validateState(bad));
 const nextRequest=structuredClone(request);nextRequest.expectedStateHash=V.hash(out);nextRequest.anime=[];
 assert.throws(()=>A.commit(out,planned(out,nextRequest),'fixture-op',true,roster),/Operation ID conflict/);
});
test('admission rejects unauthorized identities, stale revisions, source tampering and missing rights acknowledgement',()=>{
 const {state,request}=fixture(),plan=planned(state,request);
 assert.throws(()=>A.prepare(state,request,plan.action,[]));assert.throws(()=>A.prepare(state,request,{...plan.action,reviewer:'assistant'},['assistant']));
 assert.throws(()=>A.prepare(state,request,{...plan.action,reviewer:' assistant'},[' assistant']));
 assert.throws(()=>A.prepare(state,request,{...plan.action,rights:{scope:'public',publication:'cleared'}},roster));
 for(const mutate of [r=>r.expectedStateHash='stale',r=>r.characters[0].snapshot.expectedMalId=999,r=>r.anime[0].sourceHash='bad',r=>r.characters.push(r.characters[0]),r=>r.anime=[],r=>{r.characters[0].snapshot.sourceUrl='https://api.tenrai.org/v1/characters/999';r.characters[0].sourceHash=V.hash(r.characters[0].snapshot);},r=>{r.characters[0].snapshot.animeAssociations[0].anime.title='Wrong adaptation';r.characters[0].sourceHash=V.hash(r.characters[0].snapshot);}]){const r=structuredClone(request);mutate(r);assert.throws(()=>A.prepare(state,r,plan.action,roster));}
 const changed=structuredClone(plan);changed.preview.changes.characters[0].name='tampered';assert.throws(()=>A.commit(state,changed,'fixture-op',true,roster));
 const stale=structuredClone(state);stale.catalogue.review.push('changed');assert.throws(()=>A.prepare(stale,request,plan.action,roster));
});
test('existing stable identity appearance admission preserves aliases; new collisions remain held',()=>{
 const f=fixture(),out=A.commit(f.state,planned(f.state,f.request),'fixture-op',true,roster);
 const state=A.initial({...out.catalogue,characters:[...out.catalogue.characters,{...out.catalogue.characters[0],id:'mal-character-3',malId:3,name:'Generic nickname'}]},out.metadata);
 const r=structuredClone(f.request);r.expectedStateHash=V.hash(state);r.anime=[];r.characters[0].snapshot.character.nicknames=['Generic nickname'];r.characters[0].sourceHash=V.hash(r.characters[0].snapshot);
 const p=A.inspect(state,r);assert.equal(p.collisions.length,1);assert.equal(p.warnings.length,0);assert.deepEqual(p.changes.characters,[]);
 const next=A.commit(state,planned(state,r),'fixture-existing',true,roster);assert.deepEqual(next.catalogue.characters,state.catalogue.characters);
 const collision=structuredClone(r);collision.characters[0].snapshot.expectedMalId=4;collision.characters[0].snapshot.character.mal_id=4;collision.characters[0].snapshot.associationSourceUrl='https://api.tenrai.org/v1/characters/4/anime';collision.characters[0].sourceHash=V.hash(collision.characters[0].snapshot);assert.throws(()=>planned(state,collision));
});
test('new alias subsets are previewed and audited, never silently removed or invented',()=>{
 const {state,request}=fixture();request.characters[0].snapshot.character.nicknames=['Shared alias'];request.characters[0].sourceHash=V.hash(request.characters[0].snapshot);
 request.characters[0].aliasSelection={aliases:[],reason:'Fixture maintainer proposes excluding an ambiguous alias'};
 const p=planned(state,request);assert.equal(p.preview.aliasSelections.length,1);assert.deepEqual(p.preview.changes.characters[0].aliases,[]);assert.deepEqual(p.preview.request.characters[0].snapshot.character.nicknames,['Shared alias']);
 const out=A.commit(state,p,'fixture-subset',true,roster);assert.deepEqual(out.audit[0].aliasSelections[0].providerAliases,['Shared alias']);
 const bad=structuredClone(request);bad.characters[0].aliasSelection.aliases=['Invented'];assert.throws(()=>A.inspect(state,bad));
});
function reviewFixture(){
 const f=fixture(),admitted=A.commit(f.state,planned(f.state,f.request),'fixture-op',true,roster);
 const deps=V.index({catalogue:admitted.catalogue,definitions:require('../traits/data/definitions.json'),questions:[{id:'twins',text:'Twins',answers:[]}],policy:{questions:[{questionId:'twins',type:'character',traitChecks:[{traitId:'identity.multiple_birth',values:['twin']}]}]}});
 const context={animeId:'mal-anime-1',scope:'Synthetic adaptation',persistence:'permanent',form:null};
 const source={id:'fixture',name:'Synthetic publisher',enabled:true,permission:'individual-fact-review',permissionUrl:'https://example.org/terms',reviewedAt:date,originFamily:'fixture-publisher',kind:'primary',hosts:['example.org'],fields:{trait:{traitId:'identity.multiple_birth',values:{twin:'twin'}}}};
 const snap={revision:'1',retrievedAt:date,items:[{externalId:'mal:2',malId:2,context,field:'trait',value:'twin',fact:'Synthetic AI suggestion',locator:'character profile',url:'https://example.org/fact',extraction:'ai_proposal'}]};
 const empty={version:1,revision:0,traits:{version:1,associations:[]},records:[],decisions:[]};const state=P.ingest(empty,P.extract(snap,source,deps),deps);
 const snapshotText='Synthetic Example has a twin sibling.';
 const input={recordId:state.records[0].id,expectedStateHash:V.hash(state),expectedClaimRevision:0,source:{url:'https://example.org/fact',permissionUrl:'https://example.org/terms',kind:'primary',permission:'individual-fact-review',originFamily:'fixture-publisher',revision:'2',locator:'profile',accessedAt:date},snapshotText,expectedSourceHash:V.hash(snapshotText),quote:snapshotText,interpretation:'Fixture only: explicit twin sibling',inspectedOriginal:true,eligibilityRecommendation:'recommend_include',eligibilityReason:'Synthetic multiple-birth example'};
 return {state,input,deps};
}
test('maintainer extraction appends evidence without relabeling AI or approving facts/eligibility',()=>{
 const {state,input,deps}=reviewFixture(),before=structuredClone(state),plan=E.prepare(state,input,action,deps,roster);
 assert.equal(V.view(state,deps).records[0].assessment.canIndividuallyApprove,false);
 const out=E.commit(state,plan,'fixture-source',true,deps,roster);assert.deepEqual(state,before);assert.deepEqual(out.traits,state.traits);assert.deepEqual(out.decisions,[]);assert.deepEqual(out.records[0].evidence[0],state.records[0].evidence[0]);
 const view=V.view(out,deps).records[0];assert.equal(view.evidence.length,2);assert.equal(view.status,'needs_review');assert.equal(view.eligibility,'unresolved');assert.equal(view.assessment.canIndividuallyApprove,true);assert.equal(view.assessment.queue,'uncertain');assert.equal(view.evidence[0].extraction,'ai_proposal');
 assert.deepEqual(E.commit(out,plan,'fixture-source',true,deps,roster),out);assert.throws(()=>E.commit(state,plan,'fixture-source',false,deps,roster));
});
test('source endorsement denies fabricated identity, altered quotes, stale claims and history tampering',()=>{
 const {state,input,deps}=reviewFixture();assert.throws(()=>E.prepare(state,input,action,deps,[]));assert.throws(()=>E.prepare(state,input,{...action,reviewer:'codex'},deps,['codex']));
 for(const mutate of [i=>i.quote='not in source',i=>i.expectedSourceHash='bad',i=>i.expectedStateHash='stale',i=>i.expectedClaimRevision=99,i=>i.inspectedOriginal=false,i=>i.eligibilityRecommendation='eligible']){const i=structuredClone(input);mutate(i);assert.throws(()=>E.prepare(state,i,action,deps,roster));}
 const p=E.prepare(state,input,action,deps,roster),out=E.commit(state,p,'fixture-source',true,deps,roster);const bad=structuredClone(out);bad.sourceReviews[0].reviewer='changed';assert.throws(()=>E.history(bad));assert.throws(()=>V.validate(bad,deps));
 const changed=structuredClone(p);changed.input.interpretation='changed';assert.throws(()=>E.commit(state,changed,'fixture-source',true,deps,roster));
 const changedDeps=V.index({...deps,policy:structuredClone(deps.policy)});changedDeps.policy.questions[0].include='changed guidance';assert.throws(()=>E.commit(state,p,'fixture-source',true,changedDeps,roster),/Stale/);
});
test('private CLI refuses public state writes; no runtime coupling',()=>{
 const fs=require('fs'),os=require('os'),path=require('path'),{privateFile}=require('../expansion/review-cli');const dir=fs.mkdtempSync(path.join(os.tmpdir(),'ascent-readiness-'));try{const f=path.join(dir,'public.json');fs.writeFileSync(f,'{}');assert.throws(()=>privateFile(f));}finally{fs.rmSync(dir,{recursive:true,force:true});}
 for(const f of ['power-level/game.js','power-level/questions.js','api/ascent.js'])assert.doesNotMatch(fs.readFileSync(f,'utf8'),/private-admission|source-review|review-cli/);
});
test('private file adapter keeps state intact on failure and honors writer locks',()=>{
 const fs=require('fs'),path=require('path'),{update}=require('../expansion/review-cli');const root=path.resolve(__dirname,'../private');fs.mkdirSync(root,{recursive:true});const dir=fs.mkdtempSync(path.join(root,'unit-test-only-')),file=path.join(dir,'state.json');
 try{fs.writeFileSync(file,'{"revision":0}');assert.throws(()=>update(file,()=>{throw Error('fixture abort');}));assert.deepEqual(JSON.parse(fs.readFileSync(file)),{revision:0});assert(!fs.existsSync(file+'.lock'));
  fs.writeFileSync(file+'.lock','test lock');assert.throws(()=>update(file,()=>({revision:1})));fs.unlinkSync(file+'.lock');update(file,s=>({revision:s.revision+1}));assert.deepEqual(JSON.parse(fs.readFileSync(file)),{revision:1});
  const link=path.join(dir,'link.json');fs.symlinkSync(file,link);assert.throws(()=>update(link,()=>({revision:2})));assert.deepEqual(JSON.parse(fs.readFileSync(file)),{revision:1});
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});

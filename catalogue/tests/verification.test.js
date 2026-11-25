'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const V=require('../verification/model'),P=require('../verification/pipeline'),M=require('../traits/model'),{create}=require('../verification/server');
function fixture(){
 const catalogue={characters:[{id:'c1',malId:1,name:'First',aliases:[]},{id:'c2',malId:2,name:'Second',aliases:[]}],anime:[{id:'a1',name:'Fixture'}],appearances:[{characterId:'c1',animeId:'a1'},{characterId:'c2',animeId:'a1'}]};
 const deps=V.index({catalogue,definitions:require('../traits/data/definitions.json'),questions:[{id:'cats',text:'Name a cat',answers:[]}],policy:{questions:[{questionId:'cats',type:'character',traitChecks:[{traitId:'identity.species',values:['cat']}]}]}});
 let traits={version:1,associations:[]};const records=[];
 for(let i=1;i<=2;i++){
  const context={animeId:'a1',scope:'Original series',persistence:'recurring',form:null};
  const claim={characterId:'c'+i,traitId:'identity.species',value:'cat',context,evidence:[{url:'https://example.org/'+i,sourceName:'Synthetic fixture',explanation:'Synthetic cat evidence',kind:'official',accessedAt:'2026-11-16T00:00:00Z'}],provenance:{provider:'synthetic',externalCharacterId:'mal:'+i,uncertainty:'Test only'}};
  traits=M.propose(traits,[{id:'claim'+i,status:'needs_review',claim}],deps.definitions,catalogue);
  const evidence=['producer','distributor'].map(originFamily=>{const e={url:'https://example.org/'+originFamily+'/'+i,fact:'Synthetic named cat',locator:'character species field',accessedAt:'2026-11-16T00:00:00Z',revision:'1',kind:'primary',permission:'authorized-feed',originFamily,extraction:'structured',supports:'trait',characterId:'c'+i,traitId:'identity.species',value:'cat',animeId:'a1',contextHash:V.hash(context)};return {...e,id:V.hash(e)};});
  records.push({id:'r'+i,claimId:'claim'+i,questionId:'cats',claim,identity:'corroborated',eligibility:'recommend_include',evidence,alreadyAccepted:false,aliases:[],evidenceRevisions:[]});
 }
 return {deps,state:{version:1,revision:0,traits,records,decisions:[]},reviewers:['Test maintainer']};
}
const request=state=>({ids:['r1','r2'],status:'verified',eligibility:'eligible',reviewer:'Test maintainer',note:'Synthetic fixture review',stateHash:V.hash(state)});
const rehash=e=>{delete e.id;e.id=V.hash(e);};
test('two independent exact-context sources qualify; syndicated copies do not',()=>{
 const {state,deps}=fixture(),r=state.records[0];assert.equal(V.assess(r,deps).queue,'high-evidence');r.evidence[1].originFamily='producer';assert.equal(V.assess(r,deps).queue,'uncertain');
});
test('AI confidence, mention-only evidence and wrong adaptations do not qualify',()=>{
 for(const mutate of [e=>{e.extraction='ai_proposal';e.confidence=.9999;},e=>e.supports='identity',e=>e.animeId='wrong',e=>e.contextHash='wrong',e=>e.characterId='c2',e=>e.permission='unresolved']){const {state,deps}=fixture();state.records[0].evidence.forEach(mutate);assert.notEqual(V.assess(state.records[0],deps).queue,'high-evidence');}
});
test('contradictions and stable identity conflicts are routed away from approval',()=>{
 const {state,deps}=fixture();state.records[0].evidence[0].supports='contradicts';assert.equal(V.assess(state.records[0],deps).queue,'conflicting');state.records[1].identity='conflict';assert.equal(V.assess(state.records[1],deps).canIndividuallyApprove,false);
});
test('evidence integrity, literal spans and invalid identity bindings fail validation',()=>{
 const {state,deps}=fixture();V.validate(state,deps);
 for(const mutate of [s=>s.records[0].evidence[0].fact='changed',s=>s.records[0].claim.characterId='c2',s=>s.records[0].questionId='unknown',s=>{const e=s.records[0].evidence[0];e.extraction='literal_rule';e.literal={text:'not a cat',terms:['absent','cat'],snapshotHash:V.hash('not a cat')};rehash(e);}]){const s=structuredClone(state);mutate(s);assert.throws(()=>V.validate(s,deps));}
});
test('batch approval is atomic, explicit and includes evidence and previous state',()=>{
 const {state,deps,reviewers}=fixture(),before=structuredClone(state),p=V.plan(state,request(state),deps,reviewers);
 assert.throws(()=>V.commit(state,p,'op',false,deps,reviewers));assert.equal(state.decisions.length,0);
 const next=V.commit(state,p,'op',true,deps,reviewers);assert.equal(next.decisions.length,1);assert.equal(next.decisions[0].changes.length,2);assert.equal(next.decisions[0].changes[0].before.status,'needs_review');assert.equal(next.decisions[0].changes[0].evidenceIds.length,2);assert.deepEqual(state,before);
 assert.equal(V.exported(next,deps).approvedEligible.length,2);
});
test('unauthorized identities, duplicate selections, stale state and changed policy fail closed',()=>{
 const {state,deps,reviewers}=fixture();for(const override of [{reviewer:'Assistant'},{reviewer:'Someone else'},{ids:['r1','r1']},{stateHash:'stale'},{ids:['missing']}])assert.throws(()=>V.plan(state,{...request(state),...override},deps,reviewers));
 const p=V.plan(state,request(state),deps,reviewers),changed=V.index({...deps,policy:{questions:[{...deps.policy.questions[0],revision:2}]}});assert.throws(()=>V.commit(state,p,'op',true,changed,reviewers),/Plan changed/);
});
test('idempotent retries preserve history; conflicting operation IDs are rejected',()=>{
 const {state,deps,reviewers}=fixture(),p=V.plan(state,request(state),deps,reviewers),next=V.commit(state,p,'op',true,deps,reviewers);assert.deepEqual(V.commit(next,p,'op',true,deps,reviewers),next);assert.throws(()=>V.commit(next,{...p,digest:'changed'},'op',true,deps,reviewers));
 assert.deepEqual(next.traits.associations[0].history[0],state.traits.associations[0].history[0]);
 const broken=structuredClone(next);broken.decisions[0].reviewer='forged';assert.throws(()=>V.validate(broken,deps),/history/);
});
test('rejections are sticky and require explicit individual reopening',()=>{
 const {state,deps,reviewers}=fixture();const p=V.plan(state,{...request(state),ids:['r1'],status:'rejected'},deps,reviewers),next=V.commit(state,p,'reject',true,deps,reviewers);
 assert.throws(()=>V.plan(next,{...request(next),ids:['r1']},deps,reviewers),/reopening/);
 const reopen=V.plan(next,{...request(next),ids:['r1'],status:'needs_review',reopen:true},deps,reviewers);const reopened=V.commit(next,reopen,'reopen',true,deps,reviewers);assert.equal(M.latest(reopened.traits.associations[0]).status,'needs_review');assert.equal(reopened.decisions.length,2);
});
test('single direct sources permit individual review but never multi-claim verification',()=>{
 const {state,deps,reviewers}=fixture();state.records[0].evidence.pop();assert.throws(()=>V.plan(state,request(state),deps,reviewers),/Evidence gate/);assert.ok(V.plan(state,{...request(state),ids:['r1']},deps,reviewers));
 state.records[0].evidence[0].kind='secondary';assert.throws(()=>V.plan(state,{...request(state),ids:['r1']},deps,reviewers));
});
test('trait approval and eligibility remain separate; no rarity or live export',()=>{
 const {state,deps,reviewers}=fixture();const p=V.plan(state,{...request(state),eligibility:'unresolved'},deps,reviewers),next=V.commit(state,p,'op',true,deps,reviewers),out=V.exported(next,deps);assert.equal(out.approvedEligible.length,0);assert.equal(out.verifiedUnresolved.length,2);assert.equal(out.notPublishable,true);assert.ok(!JSON.stringify(out).includes('rarity'));
 state.records[0].claim.context.persistence='transformation_specific';state.records[0].claim.context.form='Episode form';assert.notEqual(V.assess(state.records[0],deps).queue,'high-evidence');
});
function sourceFixture(){return {source:{id:'licensed-test',name:'Synthetic licensed feed',enabled:true,permission:'authorized-feed',permissionUrl:'https://example.org/terms',reviewedAt:'2026-11-16T00:00:00Z',originFamily:'producer',kind:'primary',structured:true,hosts:['example.org'],fields:{species:{traitId:'identity.species',values:{cat:'cat'}}}},snapshot:{revision:'v1',retrievedAt:'2026-11-16T00:00:00Z',items:[{externalId:'cat-1',malId:1,field:'species',value:'cat',url:'https://example.org/1',fact:'Synthetic cat',locator:'species',context:{animeId:'a1',scope:'Feed context',persistence:'recurring',form:null}}]}};}
test('permission-gated deterministic extraction checks exact values and stable IDs',()=>{
 const {deps}=fixture(),{source,snapshot}=sourceFixture();const result=P.extract(snapshot,source,deps);assert.equal(result.candidates.length,1);assert.equal(result.candidates[0].eligibility,'recommend_include');
 assert.throws(()=>P.extract(snapshot,{...source,enabled:false},deps));assert.throws(()=>P.extract(snapshot,{...source,permission:'unresolved'},deps));
 const duplicate=structuredClone(snapshot);duplicate.items.push({...duplicate.items[0],malId:2});assert.equal(P.extract(duplicate,source,deps).candidates.length,0);
 const unknown=structuredClone(snapshot);unknown.items[0].value='catlike';assert.equal(P.extract(unknown,source,deps).candidates.length,0);
});
test('ingestion preserves decisions and evidence; retries are idempotent',()=>{
 const {state,deps}=fixture(),{source,snapshot}=sourceFixture();const batch=P.extract(snapshot,source,deps),next=P.ingest(state,batch,deps);assert.equal(next.records.length,3);assert.equal(next.decisions.length,0);assert.deepEqual(P.ingest(next,batch,deps),next);assert.deepEqual(next.traits.associations[0],state.traits.associations[0]);
});
test('private server enforces loopback host, token, same origin and route allowlist',async t=>{
 const f=fixture();let state=f.state;const {server,token}=create({read:()=>state,update:fn=>(state=fn(state)),deps:f.deps,reviewers:f.reviewers});await new Promise(r=>server.listen(0,'127.0.0.1',r));t.after(()=>server.close());const base='http://127.0.0.1:'+server.address().port;
 assert.equal((await fetch(base+'/api/review')).status,401);
 assert.equal((await fetch(base+'/api/review',{headers:{authorization:'Bearer '+token,origin:'https://evil.example'}})).status,403);
 assert.equal(await new Promise((resolve,reject)=>{require('node:http').get(base+'/api/review',{headers:{authorization:'Bearer '+token,host:'evil.example'}},r=>{r.resume();resolve(r.statusCode);}).on('error',reject);}),403);
 assert.equal((await fetch(base+'/api/prepare',{method:'POST',headers:{authorization:'Bearer '+token,'content-type':'application/json'},body:'{}'})).status,403);
 assert.equal((await fetch(base+'/catalogue/private/state.json',{headers:{authorization:'Bearer '+token}})).status,404);
 const r=await fetch(base+'/api/review',{headers:{authorization:'Bearer '+token}});assert.equal(r.status,200);assert.equal((await r.json()).records.length,2);
});
test('review UI serves without private data; two-step API saves only confirmed decisions',async t=>{
 const f=fixture();let state=f.state;const {server,token}=create({read:()=>state,update:fn=>(state=fn(state)),deps:f.deps,reviewers:f.reviewers});await new Promise(r=>server.listen(0,'127.0.0.1',r));t.after(()=>server.close());const base='http://127.0.0.1:'+server.address().port;
 const html=await(await fetch(base)).text();assert.ok(html.includes('Preview selected decisions'));assert.ok(!html.includes('Synthetic named cat'));
 const post=(route,body)=>fetch(base+'/api/'+route,{method:'POST',headers:{authorization:'Bearer '+token,origin:base,'content-type':'application/json'},body:JSON.stringify(body)});
 const p=await(await post('prepare',request(state))).json();assert.equal(state.decisions.length,0);
 assert.equal((await post('commit',{planId:p.id,operationId:'ui-test',confirmed:false})).status,400);
 assert.equal((await post('commit',{planId:p.id,operationId:'ui-test',confirmed:true})).status,200);
 assert.equal((await post('commit',{planId:p.id,operationId:'ui-test',confirmed:true})).status,200);assert.equal(state.decisions.length,1);
});
test('permitted Wikidata statements queue automatically without implying verification',()=>{
 const {deps,state}=fixture();deps.policy.questions[0].traitChecks=[{traitId:'appearance.hair_color',values:['red']}];
 const snapshot={provider:'Wikidata',license:'CC0-1.0',retrievedAt:'2026-11-16T00:00:00Z',entities:{Q1:{id:'Q1',lastrevid:12,claims:{P4085:[{mainsnak:{snaktype:'value',datavalue:{value:'1'}}}],P1884:[{id:'Q1$test',mainsnak:{snaktype:'value',datavalue:{value:{id:'Q152357'}}}}]}}}};
 const batch=P.wikidata(snapshot,deps);assert.equal(batch.candidates.length,1);assert.equal(batch.candidates[0].claim.context.animeId,null);assert.equal(batch.candidates[0].eligibility,'needs_context');
 const empty={version:1,revision:0,traits:{version:1,associations:[]},records:[],decisions:[]};
 const next=P.ingest(empty,batch,deps);assert.equal(V.view(next,deps).summary.uncertain,1);assert.equal(next.decisions.length,0);assert.deepEqual(P.ingest(next,batch,deps),next);
 assert.throws(()=>P.wikidata({...snapshot,license:'unknown'},deps));
});
test('persistent source identities cannot be reassigned between imports',()=>{
 const {deps,state}=fixture();const batch={sourceId:'fixture',snapshotHash:'one',candidates:[],bindings:[{sourceId:'fixture',externalId:'stable',malId:1}]};
 const next=P.ingest(state,batch,deps);assert.throws(()=>P.ingest(next,{...batch,bindings:[{sourceId:'fixture',externalId:'stable',malId:2}]},deps),/identity conflict/);
});
test('AI proposals alone cannot authorize even individual verification',()=>{
 const {deps,state,reviewers}=fixture();state.records[0].evidence.forEach(e=>{e.extraction='ai_proposal';rehash(e);});
 assert.equal(V.assess(state.records[0],deps).canIndividuallyApprove,false);
 assert.throws(()=>V.plan(state,{...request(state),ids:['r1']},deps,reviewers),/Evidence gate/);
});
test('approved existing answers remain auditable without inflating additions',()=>{
 const {deps,state,reviewers}=fixture();state.records[0].alreadyAccepted=true;
 const next=V.commit(state,V.plan(state,request(state),deps,reviewers),'test-existing',true,deps,reviewers),output=V.exported(next,deps);
 assert.equal(output.approvedEligible.length,1);assert.equal(output.existingAccepted.length,1);assert.equal(output.existingAccepted[0].history.length,1);
});
test('negated literal snippets cannot become deterministic positive evidence',()=>{
 const {deps,state}=fixture(),e=state.records[0].evidence[0];e.extraction='literal_rule';e.literal={text:'First is not a cat',terms:['First','cat'],snapshotHash:V.hash('First is not a cat')};rehash(e);assert.throws(()=>V.validate(state,deps),/literal evidence/);
});

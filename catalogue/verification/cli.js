'use strict';
const fs=require('node:fs'),path=require('node:path'),S=require('./store'),V=require('./model'),P=require('./pipeline');
const read=file=>JSON.parse(fs.readFileSync(file,'utf8'));
async function main(){const [command,file,sourceId]=process.argv.slice(2);
 if(command==='initialize'){
  const state=V.validate(read(file),S.deps);fs.mkdirSync(S.directory,{recursive:true});
  fs.writeFileSync(path.join(S.directory,'state.json'),JSON.stringify(state,null,2)+'\n',{flag:'wx',mode:0o600});
  for(const [name,value] of [['maintainers.json',{reviewers:[]}],['sources.json',[]]])if(!fs.existsSync(path.join(S.directory,name)))fs.writeFileSync(path.join(S.directory,name),JSON.stringify(value,null,2)+'\n',{flag:'wx',mode:0o600});
  console.log('Initialized private review state. No identities authorized.');
 }else if(command==='collect-wikidata'){
  const dir=path.join(S.directory,'sources','wikidata-'+Date.now());
  const snapshot=await require('../enrichment/wikidata').collect(dir);console.log('Preserved permitted snapshot: '+dir+'; '+Object.keys(snapshot.entities).length+' entities. Use adapt-wikidata to prepare uncertain candidates.');
 }else if(command==='adapt-wikidata'){
  const snapshot=read(file),batch=P.wikidata(snapshot,S.deps);
  const dir=path.join(S.directory,'sources');fs.mkdirSync(dir,{recursive:true});const output=path.join(dir,batch.snapshotHash+'.json');
  if(!fs.existsSync(output))fs.writeFileSync(output,JSON.stringify(snapshot,null,2)+'\n',{flag:'wx',mode:0o600});
  S.update(state=>P.ingest(state,batch,S.deps));console.log(JSON.stringify({queued:batch.candidates.length,available:batch.available,skipped:batch.skipped,snapshot:output,note:'Adaptation and persistence unresolved; no approvals.'}));
 }else if(command==='ingest'){
  const sources=read(path.join(S.directory,'sources.json')),source=sources.find(s=>s.id===sourceId),snapshot=read(file),batch=P.extract(snapshot,source,S.deps);
  const dir=path.join(S.directory,'sources');fs.mkdirSync(dir,{recursive:true});const target=path.join(dir,batch.snapshotHash+'.json');
  if(!fs.existsSync(target))fs.writeFileSync(target,JSON.stringify(snapshot,null,2)+'\n',{flag:'wx',mode:0o600});
  S.update(state=>P.ingest(state,batch,S.deps));console.log(JSON.stringify({extracted:batch.candidates.length,skipped:batch.skipped,snapshotHash:batch.snapshotHash}));
 }else if(command==='report'||command==='export'){
  const state=S.read(),v=V.view(state,S.deps),result=V.exported(state,S.deps);
  const counts={...v.summary,batchReviewPercent:Number((100*v.summary.highEvidence/v.summary.total).toFixed(1)),individualPercent:Number((100*(v.summary.total-v.summary.highEvidence)/v.summary.total).toFixed(1)),byQuestion:Object.fromEntries(S.deps.policy.questions.map(q=>[q.questionId,{currentAnswers:S.deps.questionsById.get(q.questionId).answers.length,candidates:v.records.filter(r=>r.questionId===q.questionId).length,approvedAdditions:result.approvedEligible.filter(r=>r.questionId===q.questionId).length}]))};
  fs.writeFileSync(path.join(S.directory,'preview.json'),JSON.stringify(result,null,2)+'\n',{mode:0o600});fs.writeFileSync(path.join(S.directory,'summary.json'),JSON.stringify(counts,null,2)+'\n',{mode:0o600});console.log(JSON.stringify(counts,null,2));
 }else throw Error('Commands: initialize STATE.json | collect-wikidata | adapt-wikidata SNAPSHOT | ingest SNAPSHOT SOURCE_ID | report | export');
}
if(require.main===module)main().catch(e=>{console.error(e.message);process.exitCode=1;});

'use strict';
const cp=require('node:child_process'),path=require('node:path'),S=require('../traits/importer/store');
function prepare({input,output,file,manifest,dailyIdentities}){
 const spec={input:S.privateFile(input),output:S.privateFile(output),file:S.privateFile(file),dailyIdentities:dailyIdentities||[],manifest:manifest?{...manifest,grant:S.privateFile(manifest.grant),maintainers:S.privateFile(manifest.maintainers)}:null};
 const request=JSON.parse(require('node:fs').readFileSync(spec.input,'utf8'));S.privateFile(request.stage);
 const r=cp.spawnSync(process.env.ASCENT_PYTHON||(process.platform==='win32'?'python':'python3'),['-B',path.join(__dirname,'prepare.py')],{input:JSON.stringify(spec),encoding:'utf8',env:{...process.env,PYTHONIOENCODING:'utf-8:strict'},maxBuffer:4*1024*1024});
 if(r.error)throw r.error;if(r.status!==0)throw Error(r.stderr.trim()||'JVMG scoped preparation failed');return JSON.parse(r.stdout);
}
module.exports={prepare};

// Optional preview for the EXISTING maintainer review model; never writes/approves its state.
function reviewPreview({prepared,catalogue,state}){
 const fs=require('node:fs'),I=require('../traits/importer'),V=require('../verification/model'),T=require('../traits/data/definitions.json');
 const lines=fs.readFileSync(S.privateFile(prepared),'utf8').trim().split('\n'),header=JSON.parse(lines.shift());if(header.provider!=='jvmg-reviewed-pending')throw Error('Scoped JVMG preparation required');
 const deps=V.index({catalogue,definitions:T,questions:require('../../power-level/questions'),policy:require('../enrichment/eligibility.json')}),groups=new Map();
 for(const line of lines){const row=JSON.parse(line);if(!row.facts?.length)continue;const family=row.facts[0].originFamily||'jvmg-unresolved';if(!groups.has(family))groups.set(family,[]);
 groups.get(family).push({externalId:row.providerId,name:row.identity?.name||row.sourceIdentity.name,canonicalId:row.identity?.id,facts:row.facts.map(f=>({...f,url:f.provenance?.uri||row.sourceIdentity.id,locator:f.provenance?.predicate||f.rawField||f.traitId,fact:'Structured RDF proposal for '+f.traitId+': '+JSON.stringify(f.value)+'. Context, factual and rights decisions remain pending.',extraction:'structured'}))});}
 let next=state;const summaries=[];for(const [originFamily,records] of groups){const result=I.plan(next,{provider:'jvmg',identityNamespace:'jvmg',license:'scoped-private-permission; publication unresolved',revision:header.sourceRevision,retrievedAt:header.preparedAt,rootSnapshotHash:V.hash([header.hash,originFamily]),originFamily,permission:'unresolved',publicationHold:true,structured:true,records},deps);next=result.state;summaries.push(result.summary);}return {state:next,summaries,approved:0,publicationAuthorized:false};
}
module.exports.reviewPreview=reviewPreview;

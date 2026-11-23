'use strict';
const fs=require('node:fs'),path=require('node:path'),K=require('./knowledge'),S=require('./store'),D=require('../../team-data');
function options(args){const o={};for(let i=0;i<args.length;i+=2){if(!['--database','--provider','--input','--mappings','--manifest','--state','--prepared','--batch-size','--stop-after-batches','--query','--character','--output','--limit-break-character','--authorization'].includes(args[i])||!args[i+1])throw Error('Use knowledge command with named --database, --input, --query or --output options');o[args[i].slice(2)]=args[i+1];}return o;}
function main(args=process.argv.slice(2)){
 const command=args.shift(),o=options(args),file=S.privateFile(o.database||process.env.ASCENT_KNOWLEDGE_DATABASE||path.join(D.directory(),'knowledge.sqlite'));
 if(command==='metrics'||command==='validate')return K.store(command,file);
 if(command==='profile')return K.store('profile',file,[o.character]);
 if(command==='search'||command==='generate'){
  const spec=JSON.parse(fs.readFileSync(S.privateFile(o.query)));const result=command==='search'?K.store('search',file,[],spec):K.generate({file,spec,catalogue:D.read('catalogue.json'),metadata:D.read('anime-metadata.json'),limitBreakCharacterId:o['limit-break-character']});
  if(o.output){S.snapshot(o.output,result);return {output:o.output,candidates:result.candidates?.length??result.length,held:result.held?.length||0,status:result.status||'source_trusted',publicationAuthorized:false};}return result;
 }
 if(command==='import'){
  if(!o.input||!o.provider)throw Error('Import requires --provider and --input');const legacyFile=o.state||process.env.ASCENT_TRAIT_REVIEW_STATE,legacy=legacyFile?JSON.parse(fs.readFileSync(S.privateFile(legacyFile))):undefined;
  if(legacy){const cli=require('./cli');require('../../verification/model').validate(legacy,cli.deps());K.store('legacy',file,[],legacy);}
  const prepared=o.prepared||path.join(path.dirname(file),'prepared',K.hashFile(S.privateFile(o.input))+'.ndjson');fs.mkdirSync(path.dirname(S.privateFile(prepared)),{recursive:true,mode:0o700});
  const h=K.prepare({input:o.input,provider:o.provider,mappings:o.mappings,manifest:o.manifest?JSON.parse(fs.readFileSync(S.privateFile(o.manifest))):undefined,catalogue:D.read('catalogue.json'),legacy,output:prepared,file});
  const batch=Number(o['batch-size']||500),stop=o['stop-after-batches']?Number(o['stop-after-batches']):undefined;
  if(!Number.isInteger(batch)||batch<1||batch>5000||stop!==undefined&&(!Number.isInteger(stop)||stop<1))throw Error('Invalid batch/stop count');
  return {...K.store('ingest',file,[prepared,batch,...(stop?[stop]:[])]),prepared,sourceHash:h.hash,database:file};
 }
 if(command==='bundle'){
  if(!o.authorization||!o.output)throw Error('Actual owner --authorization and new private --output required');const a=JSON.parse(fs.readFileSync(S.privateFile(o.authorization)));
  if(a.purpose!=='private-team-use'||!a.authorizedBy?.trim()||!a.reference?.trim()||a.publicRedistribution!==false||a.includeKnowledgeState!==true)throw Error('Explicit actual owner authorization for knowledge transfer required');
  return K.store('bundle',file,[S.privateFile(o.output)],a);
 }
 if(command==='bootstrap'){
  if(fs.existsSync(file))throw Error('Bootstrap requires a new knowledge database; never overwrite');const input=S.privateFile(o.input),expected=process.env.ASCENT_KNOWLEDGE_BUNDLE_SHA256;
  if(!/^[a-f0-9]{64}$/.test(expected||'')||K.hashFile(input)!==expected)throw Error('Trusted owner-channel SHA-256 required');  const stage=file+'.bootstrap';if(fs.existsSync(stage))throw Error('Inspect existing incomplete bootstrap first');try{const result=K.store('restore-bundle',stage,[input]);if(result.integrity!=='ok')throw Error('Restored integrity failed');fs.linkSync(stage,file);fs.unlinkSync(stage);return result;}catch(e){for(const suffix of ['','-wal','-shm'])fs.rmSync(stage+suffix,{force:true});throw e;}
 }
 throw Error('Commands: import, metrics, profile, search, generate, bundle, bootstrap');
}
if(require.main===module){try{console.log(JSON.stringify(main(),null,2));}catch(e){console.error(e.message);process.exitCode=1;}}
module.exports={main,options};

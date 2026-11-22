'use strict';
const fs=require('node:fs'),path=require('node:path'),A=require('./adapters'),I=require('./index'),S=require('./store'),V=require('../../verification/model'),T=require('../model');
const read=p=>JSON.parse(fs.readFileSync(p));
function options(args){const o={};for(let i=0;i<args.length;i++){if(['--write','--dry-run'].includes(args[i])){o[args[i].slice(2)]=true;continue;}if(!['--provider','--input','--state','--manifest','--mappings','--limit','--output','--character','--trait','--value','--anime','--text','--question-id','--limit-break-character','--batch-size','--stop-after-batches'].includes(args[i])||!args[i+1])throw Error('Use --provider acdb|acdb-profile|wikidata|authorized --input PRIVATE-FILE [--state PRIVATE-STATE] [--dry-run|--write] [--limit N] [--manifest PRIVATE-PERMISSION] [--mappings PRIVATE-CODE-MAPPINGS] [--output PRIVATE-PREVIEW]');o[args[i].slice(2)]=args[++i];}if(o.write&&o['dry-run'])throw Error('Choose --write OR --dry-run');return o;}
function deps(){return V.index({catalogue:require('../../team-data').read('catalogue.json'),definitions:require('../data/definitions.json'),policy:require('../../enrichment/eligibility.json'),questions:require('../../../power-level/questions')});}
function defaultFile(){return require('../../verification/store').file;}
function main(args=process.argv.slice(2)){
 const command=args[0]&&!args[0].startsWith('--')?args.shift():'import',o=options(args),d=deps(),file=S.privateFile(o.state||defaultFile());
 const existing=()=>fs.existsSync(file)?V.validate(read(file),d):I.initial(require('../../team-data').read('associations.json'));
 if(command==='inspect'||command==='validate'||command==='conflicts'||command==='identity-review'){
  if(!fs.existsSync(file))throw Error('No persisted import/review state');const s=existing();
  const counts={characters:d.catalogue.characters.length,appearances:d.catalogue.appearances.length,claims:s.traits.associations.length,pending:s.traits.associations.filter(a=>T.latest(a).status==='needs_review').length,verified:s.traits.associations.filter(a=>T.latest(a).status==='verified').length,questionEligible:V.view(s,d).records.filter(r=>r.bucket==='approved_eligible').length,identityReview:s.identityQueue?.length||0,conflicts:I.conflictPairs(s).length};
  return command==='conflicts'?I.conflictPairs(s):command==='identity-review'?s.identityQueue||[]:counts;
 }
 if(['metrics','profile','search','generate-trait'].includes(command)){
  const Q=require('./query'),state=existing();
  if(command==='metrics')return Q.metrics(state,d);
  if(command==='profile')return Q.profile(state,d,o.character);
  if(command==='search')return Q.search(state,d,{traitId:o.trait,value:o.value,animeId:o.anime});
  if(!o.output)throw Error('New private --output file required');const out=Q.generate(state,d,{traitId:o.trait,value:o.value,animeId:o.anime,text:o.text,id:o['question-id'],limitBreakCharacterId:o['limit-break-character']},require('../../team-data').read('anime-metadata.json'));S.snapshot(o.output,out);return {candidates:out.candidates.length,status:out.status,publicationAuthorized:false};
 }
 if(command==='generate'){
  if(!o.output)throw Error('Private --output file required');const state=existing(),rows=require('../../generator').existingCoverage({catalogue:d.catalogue,bank:d.questions,policy:d.policy,traits:state.traits,traitDefinitions:d.definitions,reviewState:state,metadata:require('../../team-data').read('anime-metadata.json')});
  const pending=V.view(state,d).records.filter(r=>r.bucket==='pending').map(r=>({questionId:r.questionId,characterId:r.claim.characterId,animeId:r.claim.context.animeId,claimId:r.claimId,proposedName:require('../../generator').names(d.characters.get(r.claim.characterId),require('../../novelty').index(d.catalogue)).name,trait:r.claim.traitId,value:r.claim.value,evidence:r.evidence.map(e=>({url:e.url,locator:e.locator,license:e.license||e.permission})),eligible:false,hold:r.assessment.reasons}));
  const out={format:'anime-ascent-trait-expansion-review-v1',questionEligibleAnswerCandidates:rows.flatMap(r=>r.eligibleReviewedCandidates.filter(c=>c.novelty.classification==='genuinely_new_answer_candidate'&&!c.held&&!c.conflicts.length).map(c=>({...c,questionId:r.questionId}))),pendingResearchCandidates:pending,publicationAuthorized:false,rows};S.snapshot(o.output,out);return {questions:rows.length,approvedEligibleCandidates:out.questionEligibleAnswerCandidates.length,pendingResearchCandidates:pending.length,liveChanges:0};
 }
 if(command!=='import'||!o.input||!o.provider)throw Error('Commands: import, inspect, validate, conflicts, identity-review, generate');
 const input=read(S.privateFile(o.input)),manifest=o.manifest?read(S.privateFile(o.manifest)):o.mappings?{acdbMappings:read(S.privateFile(o.mappings))}:undefined;let source=A.adapt(o.provider,input,d.catalogue,manifest);
 if(o.limit){const n=Number(o.limit);if(!Number.isInteger(n)||n<1||n>1000)throw Error('Bounded --limit must be 1–1000 source character records');source={...source,records:source.records.slice(0,n),selection:{recordLimit:n,originalRecords:source.records.length}};}
 if(o['batch-size']){source=require('./batch').preflight(source,d);if(!o.write){const out=I.plan(existing(),source,d);return {...out.summary,written:false};}const retained=o.provider==='acdb-profile'?require('./profiles').redact(input):input;S.snapshot(path.join(path.dirname(file),'import-snapshots',V.hash(input)+'.raw.json'),retained);S.snapshot(path.join(path.dirname(file),'import-snapshots',V.hash(source)+'.json'),source);const result=require('./batch').apply({file,source,deps:d,initial:()=>I.initial(require('../../team-data').read('associations.json')),batchSize:Number(o['batch-size']),stopAfter:o['stop-after-batches']?Number(o['stop-after-batches']):undefined});return {...result.summary,written:true,state:file,snapshotHash:result.snapshotHash,readBackHash:V.hash(result.state)};}
 const before=existing(),preview=I.plan(before,source,d);if(!o.write)return {...preview.summary,written:false,state:file,snapshotHash:preview.snapshotHash};
 // Preserve the exact normalized source alongside its original raw input before touching claims.
 const retainedInput=o.provider==='acdb-profile'?require('./profiles').redact(input):input;
 S.snapshot(path.join(path.dirname(file),'import-snapshots',V.hash(input)+'.raw.json'),retainedInput);S.snapshot(path.join(path.dirname(file),'import-snapshots',preview.snapshotHash+'.json'),source);
 let result;const saved=S.update(file,current=>{const actual=current||I.initial(require('../../team-data').read('associations.json'));if(V.hash(actual)!==V.hash(before))throw Error('Review state changed; rerun import');result=I.plan(actual,source,d);return result.state;});V.validate(saved,d);
 return {...result.summary,written:true,state:file,snapshotHash:result.snapshotHash,readBackHash:V.hash(saved)};
}
if(require.main===module){try{console.log(JSON.stringify(main(),null,2));}catch(e){console.error(e.message);process.exitCode=1;}}
module.exports={main,options,deps};

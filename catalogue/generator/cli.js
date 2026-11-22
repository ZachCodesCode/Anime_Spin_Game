'use strict';
const fs=require('node:fs'),path=require('node:path'),G=require('./index'),M=require('../metadata');
function privatePath(value){
 const target=path.resolve(value),root=path.resolve(__dirname,'../private'),prefix=root+path.sep;
 if(!target.startsWith(prefix))throw Error('Use a private catalogue output directory');
 fs.mkdirSync(root,{recursive:true,mode:0o700});let ancestor=target;while(!fs.existsSync(ancestor))ancestor=path.dirname(ancestor);
 const realRoot=fs.realpathSync(root),realAncestor=fs.realpathSync(ancestor);
 if(realRoot!==root)throw Error('Private root symlink refused');
 if(realAncestor!==realRoot&&!realAncestor.startsWith(realRoot+path.sep))throw Error('Output symlink escapes private storage');
 fs.mkdirSync(target,{recursive:true,mode:0o700});return target;
}
function run({output,snapshots,reviewState,since='2026-11-24',protectedThrough='2026-11-23'}){
 const versioning=require('../../power-level/versioning');versioning.date(since);versioning.date(protectedThrough);if(since<=protectedThrough)throw Error('Cutover must follow the protected horizon');
 const out=privatePath(output);if(fs.readdirSync(out).length)throw Error('Use a new empty output directory; never overwrite review history');
 const activeFile=reviewState||process.env.ASCENT_TRAIT_REVIEW_STATE;
 const activeReview=activeFile?JSON.parse(fs.readFileSync(require('../traits/importer/store').privateFile(activeFile))):undefined;
 const catalogue=require('../team-data').read('catalogue.json'),metadata=structuredClone(require('../team-data').read('anime-metadata.json')),questions=require('../../power-level/questions'),definitions=require('./questions.json'),traits=activeReview?activeReview.traits:require('../team-data').read('associations.json'),traitDefinitions=require('../traits/data/definitions.json'),policy=require('../enrichment/eligibility.json');
 if(snapshots){const dir=path.resolve(snapshots);if(!dir.startsWith(path.resolve(__dirname,'../private')+path.sep))throw Error('Snapshots must remain private');for(const file of fs.readdirSync(dir).filter(f=>/^anime-\d+\.json$/.test(f))){const raw=JSON.parse(fs.readFileSync(path.join(dir,file))),a=raw.response?.data;if(!a||!metadata[a.mal_id]||raw.url!==`https://api.tenrai.org/v1/anime/${a.mal_id}`||!Number.isFinite(Date.parse(raw.retrievedAt)))throw Error('Invalid bounded anime snapshot');const record=M.extract(a);record.retrievedAt=raw.retrievedAt;record.fieldProvenance={sourceUrl:record.sourceUrl,retrievedAt:raw.retrievedAt,snapshotHash:G.hash(raw),publicationRights:'unresolved'};metadata[a.mal_id]=M.validate(record);}}
 const draft=G.generate({catalogue,metadata,definitions,existingBank:questions,traits,traitDefinitions}),coverage=G.existingCoverage({catalogue,bank:questions,policy,traits,traitDefinitions,metadata,reviewState:activeReview});
 const sanitized=G.playable(draft.questions).map(q=>({...q,since})),V=require('../../power-level/versioning'),baseline=V.load(require('../../power-level/versioning/legacy.json').bankVersion);
 // Private artifact only. These releases cannot be resolved by the public API's retained release root.
 const version=V.publish([...baseline.bank,...sanitized],path.join(out,'immutable-preview'));const original=V.publish(baseline.bank,path.join(out,'immutable-preview'));
 const R=baseline.run,D=require('../../power-level/descent'),combined=[...baseline.bank,...sanitized.map(q=>({...q,since}))],schedule=[];
 for(let n=0;n<Math.max(45,R.dayNumber(since)+14);n++){const day=R.dateOf(n),before=R.select(baseline.bank,day),after=R.select(combined,day);if(day<since&&JSON.stringify(before)!==JSON.stringify(after))throw Error('Protected schedule changed');if(JSON.stringify(D.select(baseline.bank,day))!==JSON.stringify(D.select(combined,day)))throw Error('Descent changed');schedule.push({date:day,protected:day<=protectedThrough,before,after,changed:JSON.stringify(before)!==JSON.stringify(after),assigned:false});}
 const summary={...draft.counts,approved:0,published:0,rightsCleared:0,assignmentsWritten:0,previewVersion:version,baselineVersion:original,existingQuestions:coverage.length,eligibleExistingNewPairs:coverage.reduce((n,r)=>n+r.additiveCandidateCount,0),metadataFieldsPrivate:true,productionVersioningActivated:false};
 for(const [name,value]of Object.entries({'drafts.json':draft,'anime-metadata.json':metadata,'existing-coverage.json':coverage,'playable-preview.NOT-APPROVED.json':sanitized,'schedule-hypothetical.NOT-ASSIGNED.json':schedule,'assignment-proposals.NOT-AUTHORIZED.json':schedule.filter(r=>r.changed).map(r=>({date:r.date,bankVersion:version,questionIds:r.after})), 'summary.json':summary}))fs.writeFileSync(path.join(out,name),JSON.stringify(value,null,2)+'\n',{flag:'wx',mode:0o600});
 return summary;
}
if(require.main===module && process.argv[2]==='knowledge'){try{console.log(JSON.stringify(require('../traits/importer/knowledge-cli').main(['generate',...process.argv.slice(3)]),null,2));}catch(e){console.error(e.message);process.exitCode=1;}}
else if(require.main===module){try{const args=process.argv.slice(2),options={};for(let i=0;i<args.length;i+=2){if(!['--output','--snapshots','--review-state','--since','--protected-through'].includes(args[i])||!args[i+1])throw Error('Usage: --output catalogue/private/NEW-DIRECTORY [--snapshots PRIVATE-DIR] [--review-state PRIVATE-STATE]');options[{'--output':'output','--snapshots':'snapshots','--review-state':'reviewState','--since':'since','--protected-through':'protectedThrough'}[args[i]]]=args[i+1];}if(!options.output)throw Error('Private --output required');console.log(JSON.stringify(run(options),null,2));}catch(e){console.error(e.message);process.exitCode=1;}}
module.exports={run,privatePath};

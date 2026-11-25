'use strict';
const fs=require('node:fs'),path=require('node:path');
const E=require('./model'),M=require('../traits/model');
const read=file=>JSON.parse(fs.readFileSync(file,'utf8'));
const root=path.resolve(__dirname,'../..');
const directory=path.join(root,'catalogue/private/phase5b2');
const definitions=require('../traits/data/definitions.json'),catalogue=require('../team-data').read('catalogue.json');
const policy=require('../enrichment/eligibility.json'),questions=require('../../power-level/questions');
function inputs(){return {rows:read(path.join(directory,'assessments.json')),store:read(path.join(directory,'associations.json')),aliases:[...read(path.join(root,'catalogue/private/phase5b1/aliases.json')),...read(path.join(directory,'alias-supplements.json'))]};}
const write=(name,value)=>fs.writeFileSync(path.join(directory,name),typeof value==='string'?value:JSON.stringify(value,null,2)+'\n');
const count=(rows,fn)=>rows.reduce((o,r)=>(o[fn(r)]=(o[fn(r)]||0)+1,o),{});
const safe=s=>String(s).replaceAll('|','/').replaceAll('\n',' ');
function build(){
 const {rows,store,aliases}=inputs();
 E.validate(rows,store,definitions,catalogue,policy,questions);
 const prior=read(path.join(root,'catalogue/private/phase5b1/associations.json'));
 // Phase 5B-2 must retain complete prior event prefixes, even after explicit later reviews.
 for(const a of prior.associations){const b=store.associations.find(b=>b.id===a.id);if(!b||E.hash(b.history.slice(0,a.history.length))!==E.hash(a.history))throw Error('Prior review history changed');}
 const expected=read(path.join(root,'catalogue/private/phase5b1/answer-candidates.json')).filter(r=>r.newInPhase5B1&&!r.alreadyAccepted);
 if(expected.length!==38||rows.filter(r=>r.batch==='priority_38').length!==38||expected.some(r=>!rows.some(x=>x.batch==='priority_38'&&x.claimId===r.claimId&&x.questionId===r.questionId)))throw Error('Priority review inventory mismatch');
 const originals=require('../team-data').read('associations.json').associations;
 if(rows.filter(r=>r.batch==='original_five').length!==5||originals.some(a=>!rows.some(r=>r.batch==='original_five'&&r.claimId===a.id)))throw Error('Original review inventory mismatch');
 const result=E.preview(rows,store,catalogue,aliases,policy,questions),entries=result.questions.flatMap(q=>q.entries);
 const existing=entries.filter(e=>e.batch!=='category');
 const metadata=require('../team-data').read('anime-metadata.json');
 const diversity=require('../coverage').distribution(catalogue,metadata);
 const group=e=>diversity.anime.find(a=>a.id===e.animeId);
 const uniqueAnime=[...new Set(entries.map(e=>e.animeId))];
 const summary={existingClaimsReviewed:existing.length,priorityCandidatesReviewed:38,originalClaimsReviewed:5,existingEvidenceQuality:count(existing,e=>e.evidenceQuality),allEvidenceQuality:count(entries,e=>e.evidenceQuality),aliasOnlyCorrections:entries.filter(e=>e.alreadyAccepted && !require('../enrichment/report').accepted(questions.find(q=>q.id===e.questionId),catalogue.characters.find(c=>c.id===e.characterId),aliases.filter(a=>!a.id.startsWith('editorial-'))).alreadyAccepted).length,newCategoryClaims:rows.filter(r=>r.batch==='category').length,classifications:count(entries,e=>e.classification),estimatedNewAnswersIfApproved:result.questions.reduce((n,q)=>n+q.estimatedIncreaseIfApproved,0),explicitlyApproved:store.associations.filter(a=>M.latest(a).status==='verified').length,liveChanges:0,diversity:{note:'Popularity bands are planning proxies, not objective mainstream/niche labels. Counts below are assessment rows; distinctAnime counts each selected adaptation once.',byPopularity:count(entries,e=>group(e)?.popularityGroup||'unknown'),byDecade:count(entries,e=>group(e)?.year?Math.floor(group(e).year/10)*10+'s':'unknown'),distinctAnime:uniqueAnime.length},byAnime:count(entries,e=>catalogue.anime.find(a=>a.id===e.animeId)?.name||'Unresolved'),coverage:result.questions.filter(q=>q.entries.length).map(({questionId,currentAcceptedCount,estimatedIncreaseIfApproved,pending})=>({questionId,currentAcceptedCount,estimatedIncreaseIfApproved,pending})),baselineHashes:{catalogue:E.hash(catalogue),priorLedger:E.hash(prior),questions:E.hash(questions),aliases:E.hash(aliases)}};
 write('preview.json',result);write('summary.json',summary);write('alias-review.json',E.aliasReport(rows,catalogue,aliases,questions));
 // Templates deliberately invalid as decisions; never overwrite a maintainer's decision files.
 write('decision-templates.json',rows.map(r=>E.decisionTemplate(r,store)));
 let md='# Phase 5B-2 private editorial review\n\nRecommendations only. No approvals, rarity, scores or live-bank export. “Direct” describes source support, not verified status. Identity checks are editorial recommendations, never cross-ID merges.\n\n';
 md+='## Coverage preview\n\nThe estimate counts unique characters with direct adaptation-specific support, an include recommendation, and no current-validator name match. It is conditional on trait **and question** approval. Secondary evidence contributes zero to the conservative estimate. Existing matches are provisional identity matches, not additional answers.\n\n| Question | Current | Conditional additions | Pending rows |\n|---|---:|---:|---:|\n';
 for(const q of result.questions)md+=`| ${q.questionId}: ${safe(q.title)} | ${q.currentAcceptedCount} | ${q.estimatedIncreaseIfApproved} | ${q.pending} |\n`;
 md+='\n## Diversity\n\n'+summary.diversity.note+'\n\nPopularity bands: '+JSON.stringify(summary.diversity.byPopularity)+'.\n\nDecades: '+JSON.stringify(summary.diversity.byDecade)+'.\n\nDistinct selected anime: '+summary.diversity.distinctAnime+'.\n\n';
 md+='\n## Individual assessments\n\n';
 for(const r of entries){md+=`### ${r.character} — ${r.questionId}\n\n- Claim: ${r.claimId}; stable character: ${r.characterId}; adaptation: ${r.animeId}.\n- Batch: ${r.batch}; evidence: **${r.evidenceQuality}**; state: **${r.status}**; classification: **${r.classification}**.\n- Identity: ${r.identity.status}. ${r.identity.note}\n- Eligibility recommendation: ${r.eligibility.status}. ${r.eligibility.note}\n- Current accepted names: ${r.acceptedNames.join(', ')||'none matched (not proof of canonical novelty)'}.\n- Warnings: ${r.warnings.join('; ')}\n`;
 for(const e of r.evidence)md+=`- [${e.kind} source](${e.url}): ${e.fact} Scope: ${e.animeId||'not established for this catalogue adaptation'}; supports ${e.supports}. Locator: ${e.locator}. Accessed ${e.accessedAt.slice(0,10)}.\n`;
 md+='\n';}
 md+='## Decisions and preservation\n\nSee ../../editorial/README.md. Templates contain null decision fields and cannot be applied. The ledger copies all 80 original histories and adds unverified category suggestions. Original ledgers, statements, revisions, aliases and release files remain untouched. Review commands write only this private ledger. Eligibility recommendations never activate answers.\n\n## Evidence gaps and rights\n\nSee research-gaps.json and alias-notes.md. Official merchandise, newer adaptations and identity-only pages are insufficient for claims beyond their scope. Community pages may repeat Wikidata or each other; independence is not guaranteed. No biographies or images are copied. Source URLs and short original fact summaries are retained for individual review; this is not a redistribution licence. Joined catalogue rights remain unresolved. Keep this entire directory private, including generated reports.\n';
 write('REVIEW.md',md);return summary;
}
function review(file){
 const lock=path.join(directory,'.review.lock');let fd;
 try{fd=fs.openSync(lock,'wx');const {store}=inputs();const updated=E.applyDecision(store,read(file),definitions,catalogue);const target=path.join(directory,'associations.json');fs.writeFileSync(target+'.tmp',JSON.stringify(updated,null,2)+'\n');fs.renameSync(target+'.tmp',target);}
 finally{if(fd!==undefined){fs.closeSync(fd);fs.unlinkSync(lock);}}
}
if(require.main===module){
 const [command='build',file]=process.argv.slice(2);
 try{if(command==='build'){const lock=path.join(directory,'.review.lock');let fd;try{fd=fs.openSync(lock,'wx');console.log(JSON.stringify(build(),null,2));}finally{if(fd!==undefined){fs.closeSync(fd);fs.unlinkSync(lock);}}}
 else if(command==='review'&&file){review(file);console.log('Explicit local trait review recorded. Rebuild preview; no live integration.');}
 else throw Error('Usage: node catalogue/editorial/package.js build | review DECISION.json');}
 catch(e){console.error(e.message);process.exitCode=1;}
}
module.exports={build};

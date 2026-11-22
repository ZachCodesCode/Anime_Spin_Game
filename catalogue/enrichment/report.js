'use strict';
const fs=require('node:fs'),path=require('node:path');
const W=require('./wikidata'),A=require('./aliases'),E=require('./eligibility'),M=require('../traits/model'),{ingest}=require('../traits/ingest');
const questions=require('../../power-level/questions'),core=require('../../power-level/core');
function accepted(question,character,aliases){
 const names=[character.name,character.name.split(', ').reverse().join(' '),...character.aliases,...aliases.filter(a=>a.characterId===character.id&&a.status!=='rejected'&&!a.collidesWith.length).map(a=>a.name)];
 const matches=new Set();for(const name of names){const match=core.validate(question,name);if(match.status==='valid')matches.add(match.answer.name);}
 return {alreadyAccepted:matches.size>0,acceptedNames:[...matches],caveat:'Current validator name match only. Identity, collisions and eligibility still need review.'};
}
function build(snapshot,catalogue,originalStore,existingAliases=[]){
 if(snapshot.provider!=='Wikidata'||snapshot.license!=='CC0-1.0'||!Number.isFinite(Date.parse(snapshot.retrievedAt)))throw Error('Invalid source provenance');
 const policy=E.validate(require('./eligibility.json'),questions),draft=W.candidates(snapshot.entities,catalogue,{at:snapshot.retrievedAt});
 const bundle={source:{name:'Wikidata structured statements',url:'https://www.wikidata.org',permissionUrl:'https://www.wikidata.org/wiki/Wikidata:Licensing',license:'CC0-1.0',reviewedBy:'Phase 5B-1 source-license inspection; not a trait approval',reviewedAt:snapshot.retrievedAt},suggestions:draft.candidates.map(c=>c.suggestion)};
 const store=ingest(originalStore,bundle,require('../traits/data/definitions.json'),catalogue);
 const aliases=A.merge(existingAliases,A.propose(catalogue,snapshot.entities));
 const chars=new Map(catalogue.characters.map(c=>[c.id,c])),anime=new Map(catalogue.anime.map(a=>[a.id,a.name]));
 const sourceByClaim=new Map(draft.candidates.map(r=>[r.suggestion.id,r.source]));
 const rows=[];
 for(const rule of policy.questions){const q=questions.find(q=>q.id===rule.questionId);for(const association of store.associations){const state=M.latest(association);if(!E.matches(rule,state.claim))continue;const c=chars.get(state.claim.characterId);rows.push({questionId:q.id,prompt:q.text,curatedAnswers:q.answers.length,claimId:association.id,characterId:c.id,character:c.name,anime:catalogue.appearances.filter(a=>a.characterId===c.id).map(a=>({id:a.animeId,name:anime.get(a.animeId)})),trait:state.claim.traitId,value:state.claim.value,status:state.status,newInPhase5B1:sourceByClaim.has(association.id),...accepted(q,c,aliases),evidence:state.claim.evidence,source:sourceByClaim.get(association.id)||{provider:state.claim.provenance.provider,license:'Individual evidence review; source-specific restrictions'},assessment:E.assess(rule,association),potentialAliasCollisions:aliases.filter(a=>a.characterId===c.id&&a.collidesWith.length)});}}
 rows.sort((a,b)=>Number(a.alreadyAccepted)-Number(b.alreadyAccepted)||a.questionId.localeCompare(b.questionId)||a.character.localeCompare(b.character));
 const count=(items,fn)=>items.reduce((o,x)=>(o[fn(x)]=(o[fn(x)]||0)+1,o),{});
 const fresh=rows.filter(r=>r.newInPhase5B1),summary={generatedClaims:bundle.suggestions.length,existingClaims:originalStore.associations.length,totalClaims:store.associations.length,verified:store.associations.filter(a=>M.latest(a).status==='verified').length,pending:store.associations.filter(a=>['proposed','needs_review'].includes(M.latest(a).status)).length,newAnswerRows:fresh.filter(r=>!r.alreadyAccepted).length,alreadyAcceptedRows:fresh.filter(r=>r.alreadyAccepted).length,answerRows:fresh.length,byQuestion:count(fresh,r=>r.questionId),byAnime:count(draft.candidates.flatMap(r=>r.animeIds.map(id=>({id}))),r=>anime.get(r.id)),withReferenceBlocks:draft.candidates.filter(r=>r.source.references.length).length,withoutReferenceBlocks:draft.candidates.filter(r=>!r.source.references.length).length,aliases:{proposed:aliases.length,withCollisions:aliases.filter(a=>a.collidesWith.length).length,byKind:count(aliases,a=>a.kind),canonicalAliasesAdded:0},queryTruncated:snapshot.queryTruncated,availableStatements:draft.available,identitySkips:draft.skipped};
 const inventory=policy.questions.map(rule=>({questionId:rule.questionId,prompt:rule.requirement,type:rule.type,curatedAnswers:questions.find(q=>q.id===rule.questionId).answers.length,candidateRows:rows.filter(r=>r.questionId===rule.questionId).length,guidance:rule}));
 return {bundle,store,aliases,rows,summary,policy,inventory};
}
function write(directory){
 const read=f=>JSON.parse(fs.readFileSync(f));
 const snapshot=read(path.join(directory,'wikidata-snapshot.json')),catalogue=require('../team-data').read('catalogue.json');
 const storeFile=path.join(directory,'associations.json'),aliasFile=path.join(directory,'aliases.json');
 const result=build(snapshot,catalogue,fs.existsSync(storeFile)?read(storeFile):require('../team-data').read('associations.json'),fs.existsSync(aliasFile)?read(aliasFile):[]);
 // Report existing count means pre-pilot baseline, even after idempotent reruns.
 result.summary.existingClaims=require('../team-data').read('associations.json').associations.length;
 for(const [name,value] of Object.entries({bundle:result.bundle,associations:result.store,aliases:result.aliases,'answer-candidates':result.rows,summary:result.summary,'question-inventory':result.inventory})){
  const file=path.join(directory,name+'.json');fs.writeFileSync(file+'.tmp',JSON.stringify(value,null,2)+'\n');fs.renameSync(file+'.tmp',file);
 }
 let md='# Phase 5B-1 private answer-candidate review\n\nNo rows are approved or scored. New means no current-validator name match, not guaranteed canonical novelty. Question eligibility remains a separate authorized decision.\n\n';
 md+='## All 34 active prompts\n\n| Question | Type | Curated answers | Review rows |\n|---|---|---:|---:|\n';for(const q of result.inventory)md+=`| ${q.prompt} | ${q.type} | ${q.curatedAnswers} | ${q.candidateRows} |\n`;md+='\n## Candidate details (potential new answers first)\n\n';
 md+='| Question | Character / anime | Existing answer match | State | Evidence / limitations |\n|---|---|---|---|---|\n';
 const safe=s=>String(s).replaceAll('|','/').replaceAll('\n',' ');
 for(const r of result.rows)md+=`| ${safe(r.prompt)} | ${safe(r.character)} — ${safe(r.anime.map(a=>a.name).join(', '))} | ${r.alreadyAccepted?safe(r.acceptedNames.join(', ')):'Potential new candidate'} | ${r.status} | ${r.evidence.map(e=>`[source](${e.url})`).join(' ')}; ${safe(r.assessment.concerns.join('; '))} |\n`;
 md+='\n## Active questions with no matching claim in this pilot\n\n';for(const rule of result.policy.questions.filter(q=>!result.rows.some(r=>r.questionId===q.questionId)))md+=`- ${rule.questionId}: ${rule.requirement} — ${rule.type==='non_character'?'separate non-character data project':'no evidence candidate collected; no inference or approval'}.\n`;
 fs.writeFileSync(path.join(directory,'REVIEW.md'),md);return result.summary;
}
if(require.main===module){
 const directory=path.resolve('catalogue/private/phase5b1'),lock=path.join(directory,'.review.lock');
 let fd;try{fd=fs.openSync(lock,'wx');console.log(JSON.stringify(write(directory),null,2));}finally{if(fd!==undefined){fs.closeSync(fd);fs.unlinkSync(lock);}}
}
module.exports={build,accepted,write};

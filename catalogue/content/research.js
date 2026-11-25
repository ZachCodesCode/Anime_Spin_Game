'use strict';
// Documentary identity annotations only. A research CSV is not factual verification.
const fs=require('node:fs'),path=require('node:path'),C=require('../../power-level/core'),S=require('../traits/importer/store');
function rows(files,parse,hash){return files.flatMap(file=>{file=S.privateFile(file);const raw=new TextDecoder('utf-8',{fatal:true}).decode(fs.readFileSync(file)),sourceHash=hash(raw);return parse(raw).map((row,i)=>({row,file:path.basename(file),sourceHash,line:i+2}));});}
function attach(question,answer,records,resolve,hash){
 const candidates=records.filter(({row:r})=>C.normalize(r.question_text||r.question||'')===C.normalize(question.text)&&[answer.name,...answer.aliases||[]].some(n=>C.normalize(n)===C.normalize(r.canonical_answer||r.answer||'')));
 const resolved=candidates.map(record=>{const r=record.row;let stable=r.existing_database_id||r.character_id||null;const url=r.source_url||'';
 if(!stable){const m=/^https:\/\/(?:www\.)?myanimelist.net\/character\/(\d+)(?:\/|$)/.exec(url),a=/^https:\/\/(?:www\.)?animecharactersdatabase.com\/characters.php\?id=(\d+)$/.exec(url);stable=m?'mal-character-'+m[1]:a?'acdb-character-'+a[1]:null;}
 const q={question,mapping:{entity:'character'},answers:[{...answer,...(stable?{characterId:stable}:{}),...(r.anime_title?{animeTitle:r.anime_title}:{})}]};
 // Explicit assignment avoids accidentally spreading a title string as object properties.
 if(r.anime)q.answers[0].animeTitle=r.anime;
 const result=resolve({questions:[q]})[0].answers[0].resolution;return {result,provenance:{file:record.file,sourceHash:record.sourceHash,line:record.line,rowHash:hash(r),sourceUrl:url,sourceIdentity:stable,anime:r.anime||r.anime_title||null},suppliedStatus:r.verification_status||'pending'};
 });
 const ids=new Set(resolved.flatMap(x=>x.result.characterId?[x.result.characterId]:[]));
 if(ids.size>1)return {...answer,resolution:{reason:'Conflicting documentary identity annotations',classification:'ambiguous_identity'},identityResearch:resolved};
 if(ids.size===1)return {...answer,resolution:{...resolved.find(x=>x.result.characterId).result,basis:'matching_question_and_accepted_name_with_source_documented_identity_or_franchise',factuallyVerified:false},identityResearch:resolved};
 return {...answer,identityResearch:resolved};
}
module.exports={rows,attach};

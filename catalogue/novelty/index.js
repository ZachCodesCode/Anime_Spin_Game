'use strict';
// Offline audit only. These keys must never replace gameplay matching.
function tokens(s){return String(s).normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);}
const key=s=>tokens(s).sort().join(' ');
// Deliberately limited romanization equivalence, not arbitrary edit distance.
const roman=s=>tokens(s).map(w=>w.replace(/ou/g,'o').replace(/oo/g,'o').replace(/uu/g,'u')).sort().join(' ');
const forms=c=>[c.name,...c.aliases||[]];
function index(catalogue){const exact=new Map(),variants=new Map(),characters=new Map(catalogue.characters.map(c=>[c.id,c])),anime=new Map();
 for(const a of catalogue.appearances){if(!anime.has(a.characterId))anime.set(a.characterId,new Set());anime.get(a.characterId).add(a.animeId);}
 for(const c of catalogue.characters)for(const name of forms(c)){for(const [map,k]of [[exact,key(name)],[variants,roman(name)]]){if(!k)continue;if(!map.has(k))map.set(k,new Set());map.get(k).add(c.id);}}
 return {exact,variants,characters,anime};}
function resolve(answer,idx,animeId){
 // Explicit IDs, if editorially supplied, outrank strings. Invalid IDs fail closed.
 if(answer.characterId){if(!idx.characters.has(answer.characterId))return {ids:[],basis:'invalid_stable_id'};if(animeId&&!idx.anime.get(answer.characterId)?.has(animeId))return {ids:[],basis:'incompatible_franchise'};return {ids:[answer.characterId],basis:'stable_id'};}
 let ids=new Set(),basis='exact_name_or_documented_alias';
 for(const n of forms(answer))for(const id of idx.exact.get(key(n))||[])ids.add(id);
 if(animeId)ids=new Set([...ids].filter(id=>idx.anime.get(id)?.has(animeId)));
 if(!ids.size){basis='romanization_proposal';for(const n of forms(answer)){// Full multi-token forms only: no broad single-name vowel merging.
 if(tokens(n).length<2)continue;for(const id of idx.variants.get(roman(n))||[])ids.add(id);}}
 if(animeId)ids=new Set([...ids].filter(id=>idx.anime.get(id)?.has(animeId)));
 return {ids:[...ids].sort(),basis};
}
function audit(candidate,question,idx){
 const c=idx.characters.get(candidate.characterId),animeId=candidate.animeId;
 if(!c||!idx.anime.get(c.id)?.has(animeId))return {classification:'ambiguous_identity',reason:'Unknown stable identity or incompatible adaptation',matches:[]};
 if(candidate.ineligible===true)return {classification:'ineligible_for_question',reason:candidate.reason||'Explicit editorial eligibility finding',matches:[]};
 const matches=[],uncertain=[];
 for(const a of question.answers){const r=resolve(a,idx,animeId);if(r.ids.includes(c.id)){const row={acceptedName:a.name,aliases:a.aliases||[],basis:r.basis,identities:r.ids};(r.ids.length===1?matches:uncertain).push(row);}}
 if(uncertain.length||matches.length>1)return {classification:'ambiguous_identity',reason:'Accepted name maps to multiple identities or answers',matches,uncertain};
 if(matches.length){const m=matches[0],accepted=new Set([m.acceptedName,...m.aliases].map(key)),missing=forms(c).map(n=>n.includes(', ')?n.split(', ').reverse().join(' '):n).filter(n=>!accepted.has(key(n)));return {classification:missing.length?'alias_only_improvement':'already_accepted_other_spelling',reason:'Accepted answer resolves to same stable catalogue identity within adaptation',matches,missingAliases:missing,identityEvidence:'Catalogue identity resolution; romanization proposals still need human review'};}
 // Detect similar accepted forms without a secure identity mapping; never call them new.
 const unresolved=question.answers.filter(a=>forms(a).some(n=>(tokens(n).length>=2||key(n).length>=4)&&forms(c).some(f=>roman(n)===roman(f))));
 if(unresolved.length)return {classification:'needs_additional_investigation',reason:'Name resemblance without secure franchise/identity resolution',matches:unresolved.map(a=>({acceptedName:a.name}))};
 return {classification:'genuinely_new_answer_candidate',reason:'No accepted answer resolves to this stable identity in this question; factual eligibility and rights remain unverified',matches:[]};
}
module.exports={tokens,key,roman,index,resolve,audit};

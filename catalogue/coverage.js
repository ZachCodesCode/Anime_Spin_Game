'use strict';
const fs=require('node:fs');
const questions=require('../power-level/questions'),M=require('./traits/model');
const mapping={
 'mix-red-hair':['appearance.hair_color',['red']], 'mix-white-hair':['appearance.hair_color',['white','silver']], 'mix-blonde':['appearance.hair_color',['blonde']], 'mix-pink-hair':['appearance.hair_color',['pink']], 'mix-green-hair':['appearance.hair_color',['green']],
 'mix-masks':['appearance.accessory',['mask']], 'wide-eyepatch':['appearance.accessory',['eyepatch']], 'wide-hats':['appearance.accessory',['hat']], 'mix-glasses':['appearance.eyewear',['glasses','sunglasses']],
 'mix-healers':['occupation.role',['doctor','medic','healer']], 'mix-mentors':['occupation.role',['teacher','mentor']], 'wide-ninjas':['occupation.role',['ninja']], 'wide-shinigami':['occupation.role',['shinigami']],
 'mix-fire':['ability.element',['fire','lava']], 'mix-lightning':['ability.element',['lightning','electricity']], 'mix-companions':['affiliation.companion',[]], 'mix-royalty':['identity.royalty',[]], 'mix-twins':['identity.multiple_birth',[]],
 'wide-cats':['identity.species',['cat']], 'wide-detectives':['occupation.detective',[]], 'wide-vampires':['identity.creature',['vampire']], 'wide-dragons':['identity.creature',['dragon']], 'wide-robots':['identity.synthetic',[]], 'wide-starters':['identity.pokemon_starter',[]]
};
const other=new Set(['onepiece-places','naruto-jutsu','bleach-zanpakuto','demonslayer-breathing','hxh-nen','mha-quirks','aot-places','blackclover-magic','tokyoghoul-world','blackclover-squads','naruto-clans','onepiece-weapons','hxh-places','mha-moves','blackclover-places','demonslayer-places','jjk-techniques','jjk-tools','jjk-places','mix-jutsu-quirks','mix-swords-breathing','mix-nen-magic','mix-techniques-moves','mix-places-op-hxh','mix-places-aot-tg','mix-places-ds-jjk','mix-clans-squads','mix-weapons-kingdoms']);
const key=s=>s.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
function coverage(catalogue,store){
 const names=new Map();for(const c of catalogue.characters)for(const n of [c.name,...c.aliases,c.name.split(', ').reverse().join(' ')]){const k=key(n);if(!names.has(k))names.set(k,new Set());names.get(k).add(c.id);}
 return questions.map(q=>{
  const suffix=q.id.replace('timed-v4-',''),trait=mapping[suffix],type=q.wide==='title'?'anime_or_studio':other.has(suffix)?'non_character_entity':suffix==='mix-beasts-tools'?'mixed_character_and_object':'character';
  const related=trait?store.associations.map(M.latest).filter(a=>a.claim.traitId===trait[0]&&(!trait[1].length||trait[1].includes(a.claim.value))):[];
  const candidateIds=new Set();if(type==='character'||type.startsWith('mixed'))for(const a of q.answers)for(const n of [a.name,...(a.aliases||[])])for(const id of names.get(key(n))||[])candidateIds.add(id);
  return {questionId:q.id,dailyPriority:!!q.wide,category:q.category,prompt:q.text,entityType:type,requiredAttribute:trait?{traitId:trait[0],values:trait[1]}:{editorialRequirement:q.text},curatedAnswers:q.answers.length,verifiedAssociations:related.filter(a=>a.status==='verified').length,pendingAssociations:related.filter(a=>['needs_review','proposed'].includes(a.status)).length,pendingCharacterIds:[...new Set(related.filter(a=>['needs_review','proposed'].includes(a.status)).map(a=>a.claim.characterId))],curatedNameCandidateIds:[...candidateIds],limitations:trait?'Trait counts are potential evidence only, not approved question eligibility. Confirm adaptation, exclusions and recurrence. Name matches are review leads, not new trait claims.':type==='character'?'Franchise-specific compound membership, exclusions and temporal rules need dedicated eligibility review; generic affiliation traits do not prove them.':'Requires a separate title/studio/object/location ontology; character records alone cannot resolve this prompt.'};
 }).sort((a,b)=>Number(b.dailyPriority)-Number(a.dailyPriority));
}
function distribution(c,m){
 const byAnime=new Map(c.anime.map(a=>[a.id,new Set()]));for(const a of c.appearances)byAnime.get(a.animeId).add(a.characterId);
 const genres={},themes={},decades={},popularity={};
 const add=(obj,k,ids)=>{obj[k]||=new Set();for(const id of ids)obj[k].add(id);};
 const anime=c.anime.map(a=>{const x=m[a.malId],ids=byAnime.get(a.id);const group=!Number.isInteger(x?.popularity)||x.popularity<1?'unknown':x.popularity<=500?'rank_1_500':x.popularity<=2000?'rank_501_2000':'rank_above_2000';add(popularity,group,ids);add(decades,x?.year?Math.floor(x.year/10)*10+'s':'unknown',ids);for(const g of x?.genres?.length?x.genres:[{name:'unknown'}])add(genres,g.name,ids);for(const t of x?.themes||[])add(themes,t.name,ids);return {id:a.id,name:a.name,characters:ids.size,genres:x?.genres?.map(g=>g.name)||[],themes:x?.themes?.map(g=>g.name)||[],year:x?.year??null,popularityRank:x?.popularity??null,popularityGroup:group};});
 const counts=x=>Object.fromEntries(Object.entries(x).map(([k,s])=>[k,s.size]));return {note:'Distinct MAL characters per bucket; characters may occur in multiple buckets. Popularity bands are transparent planning proxies, not an objective mainstream/cult classification. Missing metadata stays unknown.',anime,byGenre:counts(genres),byTheme:counts(themes),byDecade:counts(decades),byPopularity:counts(popularity)};
}
if(require.main===module){const c=require('./data/catalogue.json'),s=require('./traits/data/associations.json');fs.writeFileSync('catalogue/reports/coverage.json',JSON.stringify(coverage(c,s),null,2)+'\n');fs.writeFileSync('catalogue/reports/distribution.json',JSON.stringify(distribution(c,require('./data/anime-metadata.json')),null,2)+'\n');}
module.exports={coverage,distribution};

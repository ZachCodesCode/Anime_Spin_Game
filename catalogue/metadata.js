'use strict';
const positive=n=>Number.isSafeInteger(n)&&n>0;
function validate(record){
 if(!record||!positive(record.malId)||typeof record.title!=='string'||!record.title.trim())throw Error('Invalid anime metadata identity');
 if(record.year!==null&&(!Number.isSafeInteger(record.year)||record.year<1800||record.year>2200))throw Error('Invalid release year');
 for(const k of ['popularity','members'])if(record[k]!==null&&!positive(record[k])&&!(k==='members'&&record[k]===0))throw Error('Invalid '+k);
 for(const k of ['genres','themes',...['demographics','studios'].filter(k=>record[k]!==undefined)])if(!Array.isArray(record[k])||record[k].some(x=>!positive(x.id)||typeof x.name!=='string'||!x.name.trim()))throw Error('Invalid '+k);
 if(record.type!==undefined&&record.type!==null&&(typeof record.type!=='string'||!record.type.trim()))throw Error('Invalid anime type');
 if(record.episodes!==undefined&&record.episodes!==null&&(!Number.isSafeInteger(record.episodes)||record.episodes<1))throw Error('Invalid episode count');
 if(record.source!==undefined&&record.source!==null&&(typeof record.source!=='string'||!record.source.trim()))throw Error('Invalid source classification');
 if(record.fieldProvenance!==undefined){const p=record.fieldProvenance;if(!p||p.sourceUrl!==record.sourceUrl||!Number.isFinite(Date.parse(p.retrievedAt))||!/^[a-f0-9]{64}$/.test(p.snapshotHash)||p.publicationRights!=='unresolved')throw Error('Invalid metadata field provenance');}
 if(record.sourceUrl!==`https://api.tenrai.org/v1/anime/${record.malId}`||!Number.isFinite(Date.parse(record.retrievedAt)))throw Error('Invalid metadata provenance');
 return record;
}
function extract(a){
 return validate({malId:a.mal_id,title:a.title,genres:(a.genres||[]).map(g=>({id:g.mal_id,name:g.name})),themes:(a.themes||[]).map(g=>({id:g.mal_id,name:g.name})),year:a.year??(a.aired?.from?Number(a.aired.from.slice(0,4)):null),popularity:a.popularity??null,members:a.members??null,sourceUrl:`https://api.tenrai.org/v1/anime/${a.mal_id}`,retrievedAt:new Date().toISOString(),...(Object.hasOwn(a,'type')?{type:a.type}:{}),...(Object.hasOwn(a,'episodes')?{episodes:a.episodes>0?a.episodes:null}:{}),...(Array.isArray(a.studios)?{studios:a.studios.map(g=>({id:g.mal_id,name:g.name}))}:{}),...(Object.hasOwn(a,'source')?{source:a.source}:{}),...(Array.isArray(a.demographics)?{demographics:a.demographics.map(g=>({id:g.mal_id,name:g.name}))}:{})});
}
function validateAll(records){for(const [key,record] of Object.entries(records)){validate(record);if(key!==String(record.malId))throw Error('Metadata key mismatch');}return records;}
module.exports={extract,validate,validateAll};

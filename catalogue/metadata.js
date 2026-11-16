'use strict';
const positive=n=>Number.isSafeInteger(n)&&n>0;
function validate(record){
 if(!record||!positive(record.malId)||typeof record.title!=='string'||!record.title.trim())throw Error('Invalid anime metadata identity');
 if(record.year!==null&&(!Number.isSafeInteger(record.year)||record.year<1800||record.year>2200))throw Error('Invalid release year');
 for(const k of ['popularity','members'])if(record[k]!==null&&!positive(record[k])&&!(k==='members'&&record[k]===0))throw Error('Invalid '+k);
 for(const k of ['genres','themes'])if(!Array.isArray(record[k])||record[k].some(x=>!positive(x.id)||typeof x.name!=='string'||!x.name.trim()))throw Error('Invalid '+k);
 if(record.sourceUrl!==`https://api.tenrai.org/v1/anime/${record.malId}`||!Number.isFinite(Date.parse(record.retrievedAt)))throw Error('Invalid metadata provenance');
 return record;
}
function extract(a){
 return validate({malId:a.mal_id,title:a.title,genres:(a.genres||[]).map(g=>({id:g.mal_id,name:g.name})),themes:(a.themes||[]).map(g=>({id:g.mal_id,name:g.name})),year:a.year??(a.aired?.from?Number(a.aired.from.slice(0,4)):null),popularity:a.popularity??null,members:a.members??null,sourceUrl:`https://api.tenrai.org/v1/anime/${a.mal_id}`,retrievedAt:new Date().toISOString()});
}
function validateAll(records){for(const [key,record] of Object.entries(records)){validate(record);if(key!==String(record.malId))throw Error('Metadata key mismatch');}return records;}
module.exports={extract,validate,validateAll};

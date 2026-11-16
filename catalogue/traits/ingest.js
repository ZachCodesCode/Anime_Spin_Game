'use strict';
// Optional local adapter; no scraping or automatic review. Existing model owns history.
const fs=require('node:fs'),M=require('./model');
function ingest(store,bundle,definitions,catalogue){
 const s=bundle?.source;
 if(!s || !['CC0-1.0','CC-BY-4.0','individual-evidence-review'].includes(s.license) || !s.reviewedBy?.trim() || !Number.isFinite(Date.parse(s.reviewedAt)))throw Error('Source permission review required');
 for(const url of [s.url,s.permissionUrl]){if(typeof url!=='string'||!/^https:\/\//.test(url))throw Error('Source URL required');}
 if(!Array.isArray(bundle.suggestions))throw Error('Suggestions required');
 for(const row of bundle.suggestions){
  const c=row.claim;
  if(!c?.evidence?.length || !['source_fact','ai_inferred_suggestion'].includes(c.provenance?.basis))throw Error('Evidence and source/inference distinction required');
  if(c.provenance.externalCharacterId!==c.characterId.replace('mal-character-','mal:'))throw Error('Explicit MAL identity match required');
 }
 return M.propose(store,bundle.suggestions,definitions,catalogue);
}
if(require.main===module){
 const bundle=JSON.parse(fs.readFileSync(process.argv[2]));
 const file=require.resolve('./data/associations.json');
 let handle;
 try {
  if(process.argv.includes('--write'))handle=fs.openSync(file+'.lock','wx');
  const result=ingest(JSON.parse(fs.readFileSync(file)),bundle,require('./data/definitions.json'),require('../data/catalogue.json'));
  if(process.argv.includes('--write')){fs.writeFileSync(file+'.tmp',JSON.stringify(result,null,2)+'\n');fs.renameSync(file+'.tmp',file);}
  console.log(JSON.stringify({associations:result.associations.length,written:process.argv.includes('--write')}));
 } finally {if(handle!==undefined){fs.closeSync(handle);fs.unlinkSync(file+'.lock');}}
}
module.exports={ingest};

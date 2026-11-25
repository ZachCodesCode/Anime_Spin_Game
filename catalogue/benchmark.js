'use strict';
const fs=require('node:fs'),{performance}=require('node:perf_hooks');
const {validate}=require('./validate');
function benchmark(data){
 const timed=fn=>{const start=performance.now();const result=fn();return {ms:performance.now()-start,result};};
 const serialized=JSON.stringify(data);
 const validation=timed(()=>validate(data));
 const dir=fs.mkdtempSync(require('node:path').join(require('node:os').tmpdir(),'ascent-benchmark-'));
 let checkpoint;try{checkpoint=timed(()=>{fs.writeFileSync(dir+'/catalogue.tmp',JSON.stringify(data,null,2)+'\n');fs.renameSync(dir+'/catalogue.tmp',dir+'/catalogue.json');});}finally{fs.rmSync(dir,{recursive:true,force:true});}
 const index=timed(()=>new Map(data.characters.map(c=>[c.malId,c])));
 const lookup=timed(()=>{let hits=0;for(let i=0;i<100000;i++)if(index.result.has(data.characters[i%data.characters.length]?.malId))hits++;return hits;});
 const dedup=timed(()=>new Set([...data.characters,...data.characters].map(c=>c.malId)));
 return {characters:data.characters.length,anime:data.anime.length,appearances:data.appearances.length,compactBytes:Buffer.byteLength(serialized),prettyBytes:Buffer.byteLength(JSON.stringify(data,null,2)+'\n'),validationMs:validation.ms,atomicWriteMs:checkpoint.ms,indexBuildMs:index.ms,lookup100kMs:lookup.ms,lookupHits:lookup.result,deduplicateDoubleInputMs:dedup.ms,deduplicated:dedup.result.size,rssBytes:process.memoryUsage().rss,heapUsedBytes:process.memoryUsage().heapUsed,node:process.version};
}
if(require.main===module)console.log(JSON.stringify(benchmark(process.argv[2]?JSON.parse(fs.readFileSync(process.argv[2])):require('./team-data').read('catalogue.json')),null,2));
module.exports={benchmark};

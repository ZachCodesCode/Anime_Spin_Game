'use strict';
// Synthetic performance fixtures only. Never writes identities to the catalogue.
const {performance}=require('node:perf_hooks'),I=require('./import'),{benchmark}=require('./benchmark');
(async()=>{const output=[];const original=console.log;console.log=()=>{};
for(const n of [10000,50000]){
 const data=I.empty();let calls=0;
 const request=async p=>{calls++;return p.endsWith('/characters')?{data:Array.from({length:n},(_,i)=>({character:{mal_id:i+1,name:'Synthetic fixture '+i},role:'Supporting'}))}:{data:{mal_id:Number(p.split('/').at(-1)),title:'Synthetic fixture anime'}};};
 const begin=performance.now();await I.run({animeIds:[1],characterDetails:false},data,request);const importMs=performance.now()-begin;
 const next=performance.now();await I.run({animeIds:[1,2],characterDetails:false},data,request);const incrementalMs=performance.now()-next;
 const resume=performance.now();await I.run({animeIds:[1,2],characterDetails:false},data,()=>{throw Error('Unexpected request');});const noOpResumeMs=performance.now()-resume;
 output.push({synthetic:true,network:false,importMs,incrementalMs,noOpResumeMs,requests:calls,...benchmark(data)});
}
console.log=original;console.log(JSON.stringify(output,null,2));})();

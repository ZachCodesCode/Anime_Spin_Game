'use strict';
const fs=require('node:fs'),path=require('node:path'),P=require('./pages'),K=require('../traits/importer/knowledge'),S=require('../traits/importer/store'),D=require('../team-data');
async function main(args=process.argv.slice(2)){
 const command=args.shift(),o={};for(let i=0;i<args.length;i+=2){if(!['--input','--output','--database','--manifest','--character','--tag','--trait','--value','--authorization'].includes(args[i])||!args[i+1])throw Error('Use named --input/--output/--character/--tag/--trait/--value options');o[args[i].slice(2)]=args[i+1];}
 const file=S.privateFile(o.database||process.env.ASCENT_KNOWLEDGE_DATABASE||path.join(D.directory(),'knowledge.sqlite'));
 if(command==='import'){if(!o.input)throw Error('Local --input required');return P.importPages({input:o.input,file,output:o.output,manifest:o.manifest});}
 if(command==='inspect'){if(!o.character)throw Error('Canonical or acdb-character-ID required');const bindings=K.store('bindings',file),ids=bindings[o.character]?[o.character]:Object.keys(bindings).filter(p=>bindings[p]===o.character),profiles=K.store('active-profiles',file,[],{providerIds:ids});return {identity:Object.values(profiles)[0]?.identity||[],observations:Object.values(profiles).flatMap(p=>p.observations),currentSources:Object.entries(profiles).map(([providerId,p])=>({providerId,source:p.currentSourceRecord})),warnings:Object.values(profiles).filter(p=>p.currentSourceRecord?.hold).map(p=>p.currentSourceRecord.hold),historicalInspection:'Use catalogue:knowledge profile for full historical source records'};}
 if(command==='coverage'){
  if(!o.input)throw Error('Coverage requires saved import report --input');return JSON.parse(fs.readFileSync(S.privateFile(o.input)));
 }
 if(command==='search'||command==='generate'){
  const mapping=o.tag?require('../traits/importer/profiles').tags[o.tag.normalize('NFKC').trim().toLowerCase()]:null;
  const trait=o.trait||mapping?.[0]||'source.tag',value=o.value||mapping?.[1]||o.tag;if(!value)throw Error('Use --tag LABEL or --trait ID --value VALUE');const spec={id:'draft-acdb-pages-'+String(value).toLowerCase().replace(/[^a-z0-9]+/g,'-'),text:'PRIVATE DRAFT: Name an anime character with '+value+'.',all:[{trait,value}]};
  const result=command==='search'?K.store('search',file,[],spec):K.generate({file,spec,catalogue:D.read('catalogue.json'),metadata:D.read('anime-metadata.json')});if(o.output){S.snapshot(o.output,result);return {output:o.output,candidates:result.candidates?.length??result.length,publicationAuthorized:false};}return result;
 }
 if(command==='acquire'){if(!o.authorization||!o.output)throw Error('Explicit documented --authorization and new private --output required');return P.acquire({authorization:o.authorization,output:o.output});}
 throw Error('Commands: import, inspect, search, generate, coverage, acquire (permission-gated)');
}
if(require.main===module)main().then(r=>console.log(JSON.stringify(r,null,2))).catch(e=>{console.error(e.message);process.exitCode=1;});module.exports={main};

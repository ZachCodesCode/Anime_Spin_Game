'use strict';
// Scoped, checkpointed acquisition only. Existing adapters/store do normalization and persistence.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),S=require('../traits/importer/store');
const properties=['P4085','P7013'],factProperties=['P31','P106','P21','P1884','P1340','P2563','P463','P102','P108','P69','P1876','P2283','P4675','P9652','P569','P2048','P25','P22','P40','P3373','P26','P451','P1066','P3342','P1080','P1441','P3828','P1552','P1416'];
const UA='AnimeAscentKnowledge/1.0 (https://www.shonenspin.com/; offline character enrichment)';
const sha=x=>crypto.createHash('sha256').update(JSON.stringify(x)).digest('hex'),pause=ms=>new Promise(r=>setTimeout(r,ms));
function write(file,data){const temp=file+'.tmp';fs.writeFileSync(temp,JSON.stringify(data),{mode:0o600});fs.renameSync(temp,file);}
async function get(url,fetcher=fetch){
 for(let attempt=0;attempt<5;attempt++){
  await pause(1200);const response=await fetcher(url,{headers:{'User-Agent':UA,'Accept':'application/json','Accept-Encoding':'gzip,deflate'},signal:AbortSignal.timeout(55000)});
  let payload;if(response.ok)payload=await response.json();
  if(response.ok&&!payload.error)return payload;
  if(![429,502,503,504].includes(response.status)&&payload?.error?.code!=='maxlag')throw Error('Wikidata HTTP '+response.status+' '+(payload?.error?.code||''));
  const raw=response.headers.get('retry-after'),seconds=Number(raw),retry=raw?(Number.isFinite(seconds)?seconds*1000:Date.parse(raw)-Date.now()):0;
  const delay=Math.max(2000*2**attempt,Number.isFinite(retry)?retry:0);console.log('Backoff',response.status,payload?.error?.code||'',delay,'ms');await pause(delay);
 }throw Error('Wikidata bounded retries exhausted; cached batches can resume');
}
async function collect(directory,fetcher=fetch){
 directory=S.privateFile(path.join(directory,'checkpoint.json')).replace(/[/\\]checkpoint\.json$/,'');fs.mkdirSync(directory,{recursive:true,mode:0o700});const lock=path.join(directory,'collector.lock'),fd=fs.openSync(lock,'wx',0o600);fs.writeSync(fd,JSON.stringify({pid:process.pid}));
 try{
  const checkpointFile=path.join(directory,'checkpoint.json'),checkpoint=fs.existsSync(checkpointFile)?JSON.parse(fs.readFileSync(checkpointFile)):{format:'anime-ascent-wikidata-acquisition-v1',properties:{},queries:[],retrievedAt:new Date().toISOString()};
  for(const property of properties){let state=checkpoint.properties[property]||{ids:[],cursor:null,complete:false};while(!state.complete){
   const filter=state.cursor?`FILTER(STR(?item) > "http://www.wikidata.org/entity/${state.cursor}")`:'';
   const query=`SELECT DISTINCT ?item WHERE { ?item wdt:${property} ?externalId . ${filter} } ORDER BY ?item LIMIT 500`;
   const result=await get('https://query.wikidata.org/sparql?'+new URLSearchParams({query,format:'json'}),fetcher),rows=result.results?.bindings;if(!Array.isArray(rows))throw Error('Invalid discovery response');const ids=rows.map(r=>r.item?.value?.split('/').at(-1));if(ids.some(id=>!/^Q\d+$/.test(id)))throw Error('Invalid entity ID');
   if(ids.length&&ids.at(-1)===state.cursor)throw Error('Discovery failed to advance');state={ids:[...new Set([...state.ids,...ids])],cursor:ids.at(-1)||state.cursor,complete:ids.length<500};checkpoint.properties[property]=state;checkpoint.queries.push({property,query,rows:rows.length});write(checkpointFile,checkpoint);console.log('Discovered',property,state.ids.length,'complete',state.complete);
  }}
  const ids=[...new Set(Object.values(checkpoint.properties).flatMap(p=>p.ids))].sort(),entities={};
  async function batches(list,phase,props){for(let start=0;start<list.length;start+=40){const batch=list.slice(start,start+40),file=path.join(directory,phase+'-'+sha(batch).slice(0,24)+'.json');let packet;if(fs.existsSync(file))packet=JSON.parse(fs.readFileSync(file));else{packet=await get('https://www.wikidata.org/w/api.php?'+new URLSearchParams({action:'wbgetentities',ids:batch.join('|'),props,languages:'en|ja|mul',format:'json',maxlag:'5'}),fetcher);if(!packet.entities)throw Error('Missing entity data');write(file,packet);}Object.assign(entities,packet.entities);if(start%400===0||start+40>=list.length)console.log('Fetched',phase,Math.min(start+40,list.length),list.length);}}
  await batches(ids,'characters','claims|labels|aliases|info');
  for(const cached of fs.readdirSync(directory).filter(f=>/^(values|classes)-.*\.json$/.test(f)))Object.assign(entities,JSON.parse(fs.readFileSync(path.join(directory,cached))).entities);
  const targets=new Set();for(const id of ids)for(const property of factProperties)for(const s of entities[id]?.claims?.[property]||[]){const value=s.mainsnak?.datavalue?.value;if(value?.id)targets.add(value.id);for(const snaks of Object.values(s.qualifiers||{}))for(const snak of snaks)if(snak.datavalue?.value?.id)targets.add(snak.datavalue.value.id);}
  await batches([...targets].filter(id=>!entities[id]).sort(),'values','claims|labels|aliases|info');
  const ancestors=new Set();for(const id of targets)for(const property of ['P31','P279'])for(const s of entities[id]?.claims?.[property]||[])if(s.mainsnak?.datavalue?.value?.id)ancestors.add(s.mainsnak.datavalue.value.id);
  await batches([...ancestors].filter(id=>!entities[id]).sort(),'classes','labels|claims|info');
  const contentHash=sha([ids,entities]),latest=path.join(directory,'wikidata-snapshot.json');if(fs.existsSync(latest)){const prior=JSON.parse(fs.readFileSync(latest));if((prior.contentHash||sha([prior.characterIds,prior.entities]))===contentHash){console.log('COMPLETE cached unchanged',ids.length);return prior;}write(path.join(directory,'wikidata-snapshot-'+(prior.contentHash||sha([prior.characterIds,prior.entities]))+'.json'),prior);}
  const snapshot={contentHash,format:'anime-ascent-wikidata-knowledge-v1',provider:'Wikidata',license:'CC0-1.0',retrievedAt:checkpoint.retrievedAt,completedAt:new Date().toISOString(),discovery:checkpoint.properties,characterIds:ids,entities};write(path.join(directory,'wikidata-snapshot-'+contentHash+'.json'),snapshot);write(path.join(directory,'wikidata-snapshot.json'),snapshot);console.log('COMPLETE',ids.length,'characters',Object.keys(entities).length,'total entities');return snapshot;
 }finally{fs.closeSync(fd);fs.unlinkSync(lock);}
}
if(require.main===module)collect(path.resolve(process.argv[2]||'catalogue/private/wikidata-knowledge')).catch(e=>{console.error(e.message);process.exitCode=1;});
module.exports={collect,get,factProperties};

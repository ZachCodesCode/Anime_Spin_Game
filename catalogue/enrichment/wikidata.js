'use strict';
// Offline collector and deterministic statement adapter. No gameplay imports.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const QUERY='SELECT ?item ?mal ?property ?value WHERE { ?item wdt:P4085 ?mal. { VALUES ?property { wdt:P1884 wdt:P106 } ?item ?property ?value. } UNION { VALUES ?value { wd:Q22074477 wd:Q27303706 wd:Q2287182 wd:Q3959568 wd:Q15720625 } BIND(wdt:P31 AS ?property) ?item ?property ?value. } } LIMIT 5000';
const mappings={
 'P1884/Q202466':['appearance.hair_color','blonde'], 'P1884/Q152357':['appearance.hair_color','red'],
 'P1884/Q28962042':['appearance.hair_color','pink'],'P1884/Q26449910':['appearance.hair_color','green'],
 'P1884/Q58628766':['appearance.hair_color','silver'],'P1884/Q6933946':['appearance.hair_color','white'],
 'P106/Q37226':['occupation.role','teacher'],'P106/Q2251335':['occupation.role','teacher'],
 'P106/Q39631':['occupation.role','doctor'],'P106/Q842782':['occupation.role','investigator'],
 'P106/Q1058617':['occupation.role','investigator'],'P106/Q9402':['occupation.role','ninja'],
 'P106/Q76451138':['occupation.role','ninja'],'P31/Q22074477':['identity.synthetic','cyborg'],
 'P31/Q2287182':['occupation.role','shinigami'],'P31/Q3959568':['occupation.role','shinigami']
};
const tail=x=>typeof x==='string'?x.split('/').at(-1):'';
const value=s=>s?.mainsnak?.snaktype==='value'?s.mainsnak.datavalue?.value:null;
function selectedEntities(rows,catalogue){
 const ids=new Set(catalogue.characters.map(c=>String(c.malId)));
 return [...new Set(rows.filter(r=>ids.has(r.mal?.value)&&mappings[tail(r.property?.value)+'/'+tail(r.value?.value)]).map(r=>tail(r.item?.value)))].filter(x=>/^Q\d+$/.test(x)).sort();
}
function candidates(entities,catalogue,{limit=80,perAnime=4,at=new Date().toISOString()}={}){
 if(!Number.isSafeInteger(limit)||limit<1||!Number.isSafeInteger(perAnime)||perAnime<1||!Number.isFinite(Date.parse(at)))throw Error('Invalid candidate options');
 const identities=new Map(catalogue.characters.map(c=>[String(c.malId),c]));
 const appearances=new Map();for(const a of catalogue.appearances){if(!appearances.has(a.characterId))appearances.set(a.characterId,[]);appearances.get(a.characterId).push(a.animeId);}
 const draft=[],skipped=[],identityLinks=new Map();
 for(const e of Object.values(entities))for(const s of e.claims?.P4085||[]){const id=value(s);if(s.rank==='deprecated'||typeof id!=='string')continue;if(!identityLinks.has(id))identityLinks.set(id,new Set());identityLinks.get(id).add(e.id);}
 for(const e of Object.values(entities)){
  const links=[...new Set((e.claims?.P4085||[]).filter(s=>s.rank!=='deprecated').map(value).filter(x=>typeof x==='string'))];
  if(links.length!==1||!identities.has(links[0])||identityLinks.get(links[0])?.size!==1){skipped.push({entity:e.id,reason:'missing or ambiguous MAL identity'});continue;}
  const character=identities.get(links[0]);
  for(const [property,statements] of Object.entries(e.claims||{}))for(const s of statements){
   const mapped=mappings[property+'/'+value(s)?.id];
   if(!mapped||s.rank==='deprecated')continue;
   if(!/^Q\d+$/.test(e.id)||typeof s.id!=='string'||!s.id.toUpperCase().startsWith(e.id.toUpperCase()+'$')||!Number.isSafeInteger(e.lastrevid)||e.lastrevid<1){skipped.push({entity:e.id,reason:'missing revision/statement'});continue;}
   const animeIds=appearances.get(character.id)||[];
   // A ninja in Naruto is not evidence for the active explicitly non-Naruto prompt.
   if(mapped[1]==='ninja'&&animeIds.every(id=>['mal-anime-20','mal-anime-1735'].includes(id)))continue;
   const statementUrl=`https://www.wikidata.org/w/index.php?title=${e.id}&oldid=${e.lastrevid}`;
   const id='wd-'+crypto.createHash('sha256').update([character.id,...mapped].join('|')).digest('hex').slice(0,20);
   if(draft.some(x=>x.suggestion.id===id))continue;
   const references=(s.references||[]).map(r=>({hash:r.hash,snaks:r.snaks}));
   const suggestion={id,status:'needs_review',claim:{characterId:character.id,traitId:mapped[0],value:mapped[1],context:{animeId:null,scope:'Wikidata statement; anime adaptation and recurrence are unresolved.',persistence:'unknown',form:null},evidence:[{url:statementUrl,sourceName:`Wikidata ${e.id} statement ${s.id}`,explanation:`Structured ${property} value ${value(s).id}; ${references.length} reference block(s). This is a community assertion, not an authorized eligibility decision.`,kind:'dataset',accessedAt:at}],provenance:{provider:'Wikidata CC0 offline pilot',externalCharacterId:'mal:'+character.malId,basis:'source_fact',uncertainty:'MAL link, adaptation, temporal qualifiers and source references need independent review. Hair shade is not inferred from nearby colours; occupations do not establish employment subtype.'}}};
   draft.push({suggestion,entity:e.id,animeIds,source:{provider:'Wikidata',license:'CC0-1.0',permissionUrl:'https://www.wikidata.org/wiki/Wikidata:Licensing',entityId:e.id,malId:character.malId,revision:e.lastrevid,statementId:s.id,property,value:value(s),rank:s.rank,qualifiers:s.qualifiers||{},references}});
  }
 }
 // Round-robin by category and a conservative cap covering every represented anime.
 const groups=new Map();for(const row of draft.sort((a,b)=>a.suggestion.id.localeCompare(b.suggestion.id))){const t=row.suggestion.claim.traitId;if(!groups.has(t))groups.set(t,[]);groups.get(t).push(row);}
 const chosen=[],counts=new Map();let more=true;
 while(more&&chosen.length<limit){more=false;for(const list of groups.values()){while(list.length){more=true;const r=list.shift();if(r.animeIds.some(id=>(counts.get(id)||0)>=perAnime))continue;chosen.push(r);for(const id of r.animeIds)counts.set(id,(counts.get(id)||0)+1);break;}if(chosen.length>=limit)break;}}
 return {candidates:chosen,skipped,available:draft.length};
}
async function collect(directory,fetcher=fetch){
 fs.mkdirSync(directory,{recursive:true});
 if(fs.existsSync(path.join(directory,'wikidata-snapshot.json')))throw Error('Snapshot already exists; preserve reviewed evidence and collect into a new batch directory');
 const get=async url=>{for(let i=0;i<3;i++){await new Promise(r=>setTimeout(r,1100));const r=await fetcher(url,{headers:{'User-Agent':'AnimeAscentCatalogueReview/0.1 (offline bounded pilot)'},signal:AbortSignal.timeout(45000)});if(r.ok)return r.json();if(r.status!==429&&r.status<500)throw Error('Wikidata HTTP '+r.status);const retry=Number(r.headers.get('retry-after'));await new Promise(r=>setTimeout(r,Math.max(2000*(i+1),Number.isFinite(retry)?retry*1000:0)));}throw Error('Wikidata retries exhausted');};
 const query=await get('https://query.wikidata.org/sparql?'+new URLSearchParams({query:QUERY,format:'json'}));
 if(!Array.isArray(query.results?.bindings))throw Error('Missing query results');
 const catalogue=require('../data/catalogue.json'),ids=selectedEntities(query.results.bindings,catalogue),entities={};
 for(let i=0;i<ids.length;i+=40){const batch=await get('https://www.wikidata.org/w/api.php?'+new URLSearchParams({action:'wbgetentities',ids:ids.slice(i,i+40).join('|'),props:'claims|labels|aliases|info',languages:'en|ja',format:'json'}));if(!batch.entities)throw Error('Missing entities');Object.assign(entities,batch.entities);}
 const snapshot={provider:'Wikidata',license:'CC0-1.0',query:QUERY,queryRows:query.results.bindings.length,queryTruncated:query.results.bindings.length===5000,retrievedAt:new Date().toISOString(),entities};
 fs.writeFileSync(path.join(directory,'wikidata-snapshot.json'),JSON.stringify(snapshot,null,2)+'\n');return snapshot;
}
if(require.main===module)collect(path.resolve(process.argv[2]||'catalogue/private/phase5b1')).then(x=>console.log('Fetched '+Object.keys(x.entities).length+' entities')).catch(e=>{console.error(e.message);process.exitCode=1;});
module.exports={QUERY,mappings,selectedEntities,candidates,collect};

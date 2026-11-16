'use strict';
const crypto=require('node:crypto');
const key=s=>s.normalize('NFKD').replace(/\p{M}/gu,'').toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
function propose(catalogue,entities={}){
 const proposed=new Map(),characters=new Map(catalogue.characters.map(c=>[c.id,c])),index=new Map();
 const indexName=(name,id)=>{const k=key(name);if(!k)return;if(!index.has(k))index.set(k,new Set());index.get(k).add(id);};
 for(const c of characters.values())for(const name of [c.name,...c.aliases])indexName(name,c.id);
 function add(c,name,kind,language,sourceUrl,license){
  if(typeof name!=='string'||!name.trim()||[c.name,...c.aliases].some(n=>key(n)===key(name)))return;
  const id='alias-'+crypto.createHash('sha256').update(c.id+'|'+key(name)).digest('hex').slice(0,20);
  if(!proposed.has(id))proposed.set(id,{id,characterId:c.id,name:name.trim(),kind,language,status:'needs_review',sourceUrl,license,basis:kind==='reversed_name_order'?'deterministic_name_transformation':'source_asserted_alias'});
  indexName(name,c.id);
 }
 for(const c of characters.values()){
  if(c.name.split(', ').length===2)add(c,c.name.split(', ').reverse().join(' '),'reversed_name_order',null,c.sourceUrl,'inherited-source-rights-unresolved');
  if(c.japaneseName)add(c,c.japaneseName,'japanese_name','ja',c.sourceUrl,'inherited-source-rights-unresolved');
 }
 const entityLinks=new Map();
 for(const e of Object.values(entities))for(const s of e.claims?.P4085||[]){const id=s.mainsnak?.datavalue?.value;if(s.rank==='deprecated'||typeof id!=='string')continue;if(!entityLinks.has(id))entityLinks.set(id,new Set());entityLinks.get(id).add(e.id);}
 for(const e of Object.values(entities)){
  const ids=[...new Set((e.claims?.P4085||[]).filter(s=>s.rank!=='deprecated'&&s.mainsnak?.snaktype==='value').map(s=>s.mainsnak.datavalue?.value))];
  if(ids.length!==1||entityLinks.get(ids[0])?.size!==1)continue;const c=characters.get('mal-character-'+ids[0]);if(!c||!Number.isSafeInteger(e.lastrevid))continue;
  const url=`https://www.wikidata.org/w/index.php?title=${e.id}&oldid=${e.lastrevid}`;
  for(const lang of ['en','ja']){add(c,e.labels?.[lang]?.value,'source_label',lang,url,'CC0-1.0');for(const a of e.aliases?.[lang]||[])add(c,a.value,'source_alias',lang,url,'CC0-1.0');}
 }
 return [...proposed.values()].map(row=>({...row,collidesWith:[...(index.get(key(row.name))||[])].filter(id=>id!==row.characterId)})).map(row=>({...row,status:row.collidesWith.length?'ambiguous':'needs_review'}));
}
function merge(existing,incoming){
 const out=structuredClone(existing),ids=new Map(out.map(x=>[x.id,x]));
 for(const row of incoming){const old=ids.get(row.id);if(old){if(old.characterId!==row.characterId||key(old.name)!==key(row.name))throw Error('Alias identity conflict');old.collidesWith=[...new Set([...old.collidesWith,...row.collidesWith])];if(old.status==='needs_review'&&old.collidesWith.length)old.status='ambiguous';continue;}out.push(structuredClone(row));ids.set(row.id,row);}
 return out;
}
module.exports={key,propose,merge};

'use strict';
// Local trusted-operator workflow. The only writable catalogue is an isolated private copy.
const V=require('../verification/model'),A=require('./admission'),N=require('../novelty');
const {validate}=require('../validate'),{identity}=require('../import'),M=require('../metadata');
function authorize(action,maintainers){
 if(!Array.isArray(maintainers)||typeof action.reviewer!=='string'||!action.reviewer.trim()||action.reviewer!==action.reviewer.trim()||!maintainers.includes(action.reviewer)||/^(assistant|codex|import:)/i.test(action.reviewer)||!action.reason?.trim()||!Number.isFinite(Date.parse(action.at)))throw Error('Actual configured maintainer, reason and timestamp required');
}
function validateState(state){
 if(state.format!==1||state.privateOnly!==true||!Array.isArray(state.audit))throw Error('Private admission state required');
 validate(state.catalogue);M.validateAll(state.metadata);
 for(const m of Object.values(state.metadata))if(!state.catalogue.anime.some(a=>a.malId===m.malId))throw Error('Dangling anime metadata');
 let previous='genesis';const operations=new Set();let catalogueHash=state.baseCatalogueHash,metadataHash=state.baseMetadataHash;
 for(const event of state.audit){const body={...event};delete body.hash;
  if(event.hash!==V.hash(body)||event.previousHash!==previous||operations.has(event.operationId)||event.beforeCatalogueHash!==catalogueHash||event.beforeMetadataHash!==metadataHash)throw Error('Broken admission history');
  operations.add(event.operationId);previous=event.hash;catalogueHash=event.afterCatalogueHash;metadataHash=event.afterMetadataHash;
 }
 if(catalogueHash!==V.hash(state.catalogue)||metadataHash!==V.hash(state.metadata))throw Error('Catalogue/metadata revision mismatch');
 return state;
}
function initial(catalogue,metadata){validate(catalogue);M.validateAll(metadata);return {format:1,privateOnly:true,catalogue:structuredClone(catalogue),metadata:structuredClone(metadata),baseCatalogueHash:V.hash(catalogue),baseMetadataHash:V.hash(metadata),audit:[]};}
function inspect(state,request){
 validateState(state);
 if(request.expectedStateHash!==V.hash(state)||!Array.isArray(request.characters)||!request.characters.length||request.characters.length>25||!Array.isArray(request.anime)||request.anime.length>25)throw Error('Stale state or invalid bounded request');
 const next=structuredClone(state.catalogue),metadata=structuredClone(state.metadata),changes={anime:[],characters:[],appearances:[],metadata:[]},warnings=[],collisions=[],aliasSelections=[],sources=[];
 const animeIds=new Set(),characterIds=new Set();
 for(const packet of request.anime){
  if(packet.sourceHash!==V.hash(packet.snapshot))throw Error('Anime source hash mismatch');const s=packet.snapshot;
  if(s.provider!=='Tenrai'||s.url!==`https://api.tenrai.org/v1/anime/${s.response?.data?.mal_id}`||!Number.isFinite(Date.parse(s.retrievedAt)))throw Error('Invalid anime source provenance');
  const a={...identity(s.response.data,'anime'),importedAt:s.retrievedAt};if(animeIds.has(a.id))throw Error('Duplicate anime packet');animeIds.add(a.id);
  const md={...M.extract(s.response.data),retrievedAt:s.retrievedAt};M.validate(md);
  const existing=next.anime.find(x=>x.id===a.id);
  if(existing&&existing.name!==a.name)throw Error('Existing anime identity conflict');
  if(!existing){next.anime.push(a);changes.anime.push(a);}
  if(metadata[a.malId]&&V.hash(metadata[a.malId])!==V.hash(md))throw Error('Existing metadata must not be overwritten');
  if(!metadata[a.malId]){metadata[a.malId]=md;changes.metadata.push(md);}
  sources.push(packet.sourceHash);
 }
 for(const input of request.characters){
  if(input.sourceHash!==V.hash(input.snapshot))throw Error('Character source hash mismatch');
  const p=A.inspect(input.snapshot,next);if(characterIds.has(p.character.id))throw Error('Duplicate character packet');characterIds.add(p.character.id);sources.push(input.sourceHash);
  const detail=new URL(input.snapshot.sourceUrl).pathname.match(/^\/v1\/characters\/(\d+)(?:\/full)?$/);
  if(detail&&Number(detail[1])!==p.character.malId)throw Error('Character endpoint identity mismatch');
  for(const id of input.snapshot.animeIds){const row=input.snapshot.animeAssociations.find(a=>a.anime?.mal_id===id),anime=next.anime.find(a=>a.malId===id);
   if(!anime||!row?.anime.title||row.anime.title!==anime.name)throw Error('Exact provider adaptation title/metadata mismatch');}
  // Existing IDs are reused byte-for-byte. Provider aliases are NOT merged on appearance admission.
  const existing=next.characters.find(x=>x.id===p.character.id);
  if(existing&&existing.name!==p.character.name)throw Error('Existing character identity conflict');
  if(input.aliasSelection){const selection=input.aliasSelection;
   if(existing||!selection.reason?.trim()||!Array.isArray(selection.aliases)||new Set(selection.aliases).size!==selection.aliases.length||selection.aliases.some(alias=>!p.character.aliases.includes(alias)))throw Error('Alias selection must be an explicit documented subset for a new identity');
   aliasSelections.push({characterId:p.character.id,providerAliases:[...p.character.aliases],selectedAliases:[...selection.aliases],reason:selection.reason});p.character.aliases=[...selection.aliases];
  }
  const cc=N.resolve({name:p.character.name,aliases:p.character.aliases},N.index(next)).ids.filter(id=>id!==p.character.id);
  if(cc.length){collisions.push({characterId:p.character.id,ids:cc,action:existing?'preserve_existing_identity_and_aliases':'hold_new_identity'});if(!existing)warnings.push('New identity/name/alias collision: '+p.character.id);}
  warnings.push(...p.warnings.filter(w=>!w.startsWith('Name/alias/romanization collision:')));
  if(!existing){next.characters.push(p.character);changes.characters.push(p.character);}
  for(const a of p.appearances)if(!next.appearances.some(x=>x.characterId===a.characterId&&x.animeId===a.animeId)){next.appearances.push(a);changes.appearances.push(a);}
 }
 // No unrequested anime additions; each metadata packet must support the selected character set.
 for(const id of animeIds)if(!request.characters.some(p=>p.snapshot.animeIds.includes(Number(id.slice(10)))))throw Error('Unrelated anime packet');
 validate(next);M.validateAll(metadata);
 const result={format:1,privateOnly:true,expectedStateHash:V.hash(state),requestHash:V.hash(request),request:structuredClone(request),sourceHashes:sources,changes,collisions,aliasSelections,warnings,afterCatalogueHash:V.hash(next),afterMetadataHash:V.hash(metadata),publicationHold:true,factsApproved:false,eligibilityApproved:false,rarityApproved:false,releaseAuthorized:false};
 return {...result,digest:V.hash(result)};
}
function prepare(state,request,action,maintainers){
 authorize(action,maintainers);const preview=inspect(state,request);
 if(preview.warnings.length)throw Error('Resolve admission warnings');
 if(action.expectedPreviewDigest!==preview.digest||action.rights?.scope!=='private-review-only'||action.rights.publication!=='unresolved'||!action.rights.basis?.trim()||!Array.isArray(action.rights.references)||!action.rights.references.length||action.rights.references.some(u=>{try{return new URL(u).protocol!=='https:';}catch{return true;}}))throw Error('Exact preview and explicit private-use rights assessment required');
 const result={preview,action:structuredClone(action)};return {...result,digest:V.hash(result)};
}
function commit(state,prepared,operationId,confirmed,maintainers){
 validateState(state);authorize(prepared.action,maintainers);
 if(confirmed!==true||typeof operationId!=='string'||!operationId.trim())throw Error('Explicit confirmation and operation ID required');
 if(prepared.digest!==V.hash({preview:prepared.preview,action:prepared.action}))throw Error('Prepared admission changed');
 const repeated=state.audit.find(e=>e.operationId===operationId);
 if(repeated){if(repeated.planDigest!==prepared.digest)throw Error('Operation ID conflict');return state;}
 const fresh=prepare(state,prepared.preview.request,prepared.action,maintainers);if(fresh.digest!==prepared.digest)throw Error('Stale or tampered plan');
 const next=structuredClone(state),c=prepared.preview.changes;
 next.catalogue.anime.push(...c.anime);next.catalogue.characters.push(...c.characters);next.catalogue.appearances.push(...c.appearances);
 for(const m of c.metadata)next.metadata[m.malId]=m;
 const event={operationId,planDigest:prepared.digest,requestHash:prepared.preview.requestHash,sourceHashes:prepared.preview.sourceHashes,reviewer:prepared.action.reviewer,reason:prepared.action.reason,at:prepared.action.at,rights:prepared.action.rights,changes:structuredClone(c),collisions:prepared.preview.collisions,aliasSelections:prepared.preview.aliasSelections,previousHash:state.audit.at(-1)?.hash||'genesis',beforeCatalogueHash:V.hash(state.catalogue),beforeMetadataHash:V.hash(state.metadata),afterCatalogueHash:V.hash(next.catalogue),afterMetadataHash:V.hash(next.metadata),publicationHold:true};
 event.hash=V.hash(event);next.audit.push(event);return validateState(next);
}
module.exports={authorize,initial,validateState,inspect,prepare,commit};

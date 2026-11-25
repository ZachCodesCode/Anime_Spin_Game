'use strict';
// Pure offline admission plans. No network, file writes, or automatic canonical changes.
const V=require('../verification/model'),N=require('../novelty'),{identity}=require('../import'),{validate}=require('../validate');
function inspect(packet,catalogue){
 validate(catalogue);
 if(packet.provider!=='Tenrai'||!Number.isFinite(Date.parse(packet.retrievedAt))||!packet.sourceUrl?.startsWith('https://api.tenrai.org/v1/characters'))throw Error('Documented Tenrai snapshot required');
 const source=new URL(packet.sourceUrl);if(source.origin!=='https://api.tenrai.org'||!/^\/v1\/characters(?:\/\d+(?:\/full)?)?$/.test(source.pathname))throw Error('Invalid provider snapshot endpoint');
 const c={...identity(packet.character,'character'),importedAt:packet.retrievedAt};
 if(!Array.isArray(packet.animeAssociations)||!packet.animeAssociations.length||!Array.isArray(packet.animeIds)||!packet.animeIds.length||new Set(packet.animeIds).size!==packet.animeIds.length)throw Error('Explicit adaptation selection required');
 if(packet.expectedMalId!==c.malId||packet.expectedName!==c.name)throw Error('Provider identity does not match proposal');
 const warnings=[],existing=catalogue.characters.find(x=>x.id===c.id),appearances=[];
 if(existing&&existing.name!==c.name)warnings.push('Existing stable identity has a different provider name; no overwrite');
 const ids=new Set(packet.animeAssociations.map(a=>a.anime?.mal_id));
 for(const id of packet.animeIds){if(!Number.isSafeInteger(id)||!ids.has(id))throw Error('Provider anime association absent');const aid='mal-anime-'+id;
 if(!catalogue.anime.some(a=>a.id===aid))warnings.push('Missing anime requires separate authorized admission: '+aid);
 appearances.push({animeId:aid,characterId:c.id,role:packet.animeAssociations.find(a=>a.anime.mal_id===id).role||'Supporting',provider:'Tenrai',sourceUrl:`https://api.tenrai.org/v1/characters/${c.malId}/anime`,importedAt:packet.retrievedAt});}
 const match=N.resolve({name:c.name,aliases:c.aliases},N.index(catalogue));const collisions=match.ids.filter(id=>id!==c.id);
 if(collisions.length)warnings.push('Name/alias/romanization collision: '+collisions.join(', '));
 if(!packet.associationSourceUrl||packet.associationSourceUrl!==`https://api.tenrai.org/v1/characters/${c.malId}/anime`)throw Error('Association provenance mismatch');
 const result={format:1,status:'needs_review',character:c,appearances,existing:!!existing,collisions,warnings,sourceHash:V.hash(packet),catalogueHash:V.hash(catalogue),publicationRights:packet.publicationRights||'unresolved',snapshot:structuredClone(packet),decisions:[]};return {...result,proposalHash:V.hash(result)};
}
function plan(proposal,catalogue,action,maintainers){
 if(!maintainers.includes(action.reviewer)||/^(assistant|codex|import:)/i.test(action.reviewer)||!action.reason?.trim()||action.confirmed!==true)throw Error('Explicit authorized maintainer identity and reason required');
 const fresh=inspect(proposal.snapshot,catalogue);if(fresh.proposalHash!==proposal.proposalHash||proposal.catalogueHash!==V.hash(catalogue))throw Error('Stale admission proposal');
 if(proposal.decisions.length||proposal.status!=='needs_review')throw Error('Admission already decided; explicit separate revision required');
 if(!['verified','rejected'].includes(action.status))throw Error('Invalid admission decision');
 if(action.status==='verified'&&proposal.warnings.length)throw Error('Resolve admission warnings explicitly before admission');
 const event={beforeHash:V.hash(proposal),reviewer:action.reviewer,reason:action.reason,status:action.status,at:action.at};if(!Number.isFinite(Date.parse(event.at)))throw Error('Timestamp required');
 return {...proposal,status:action.status,decisions:[{...event,hash:V.hash(event)}]};
}
function preview(admission,catalogue){
 // Preview only; calling this never writes the canonical catalogue.
 if(admission.status!=='verified'||admission.decisions.length!==1||admission.decisions[0].status!=='verified')throw Error('Authorized admission decision required');
 const event={...admission.decisions[0]};delete event.hash;if(V.hash(event)!==admission.decisions[0].hash)throw Error('Admission audit mismatch');
 const original={...admission,status:'needs_review',decisions:[]};if(V.hash(original)!==event.beforeHash)throw Error('Admission content changed');
 if(admission.catalogueHash!==V.hash(catalogue)||admission.warnings.length)throw Error('Stale or unresolved admission');
 const next=structuredClone(catalogue);if(!next.characters.some(c=>c.id===admission.character.id))next.characters.push(admission.character);
 for(const a of admission.appearances)if(!next.appearances.some(x=>x.characterId===a.characterId&&x.animeId===a.animeId))next.appearances.push(a);
 validate(next);return {catalogue:next,publicationHold:admission.publicationRights!=='cleared',notPublishable:true};
}
module.exports={inspect,plan,preview};

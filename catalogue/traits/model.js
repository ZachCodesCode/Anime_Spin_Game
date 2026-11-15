'use strict';
const { isDeepStrictEqual: equal } = require('node:util');
const { check } = require('./schema');
const schemas = Object.fromEntries(['definitions','suggestions','review','store'].map(name => [name, require(`./schemas/${name}.json`)]));
const latest = association => association.history.at(-1).after;
function validateDefinitions(definitions) {
  check(definitions, schemas.definitions);
  if (new Set(definitions.map(d => d.id)).size !== definitions.length) throw Error('Duplicate definition');
  for (const d of definitions) {
    if (d.allowedValues.some(v => typeof v !== d.valueType)) throw Error('Invalid definition values');
    if (new Set(d.allowedValues).size !== d.allowedValues.length) throw Error('Duplicate allowed value');
  }
}
function validateClaim(claim, status, definitions, catalogue) {
  const definition = definitions.find(d => d.id === claim.traitId);
  if (!catalogue.characters.some(c => c.id === claim.characterId)) throw Error('Unknown character');
  if (!definition) throw Error('Unknown trait');
  if (typeof claim.value !== definition.valueType || definition.allowedValues.length && !definition.allowedValues.includes(claim.value)) throw Error('Invalid trait value');
  if (claim.context.animeId && !catalogue.appearances.some(a => a.characterId === claim.characterId && a.animeId === claim.context.animeId)) throw Error('Unknown anime appearance');
  if (['temporary','transformation_specific'].includes(claim.context.persistence) && !claim.context.form?.trim()) throw Error('Context requires episode/form detail');
  if (status === 'verified' && (!claim.evidence.length || claim.context.persistence === 'unknown' || !claim.context.animeId)) throw Error('Verification requires evidence and explicit adaptation/context');
}
function key(claim) {
  return JSON.stringify([claim.characterId, claim.traitId, claim.value, claim.context.animeId, claim.context.scope.trim(), claim.context.persistence, claim.context.form]);
}
function validate(store, definitions, catalogue) {
  validateDefinitions(definitions);check(store, schemas.store);
  const ids = new Set(), operations = new Set(), associations = new Set();
  for (const association of store.associations) {
    if (ids.has(association.id) || !association.history.length) throw Error('Duplicate ID or empty history');
    ids.add(association.id);
    let before = null;
    for (const event of association.history) {
      if (operations.has(event.operationId)) throw Error('Duplicate operation');
      operations.add(event.operationId);
      if (!equal(event.before, before) || event.after.revision !== (before?.revision ?? -1) + 1) throw Error('Broken review history');
      check(event.after.claim, schemas.review.properties.claim);
      validateClaim(event.after.claim, event.after.status, definitions, catalogue);
      if (!before && !['proposed','needs_review'].includes(event.after.status)) throw Error('Initial claims must be unverified');
      if (before && event.actor.startsWith('import:')) throw Error('Importer cannot review');
      before = event.after;
    }
    const currentKey = key(before.claim);
    if (associations.has(currentKey)) throw Error('Duplicate association');
    associations.add(currentKey);
  }
  return store;
}
function propose(store, suggestions, definitions, catalogue) {
  validate(store, definitions, catalogue);check(suggestions, schemas.suggestions);
  const result = structuredClone(store);
  for (const suggestion of suggestions) {
    validateClaim(suggestion.claim, suggestion.status, definitions, catalogue);
    const existing = result.associations.find(a => a.id === suggestion.id);
    if (existing) {
      const initial = existing.history[0].after;
      if (!equal(initial.claim, suggestion.claim) || initial.status !== suggestion.status) throw Error('Suggestion ID conflicts with existing claim');
      continue;
    }
    if (result.associations.some(a => key(latest(a).claim) === key(suggestion.claim))) throw Error('Duplicate association');
    result.associations.push({ id: suggestion.id, history: [{ operationId: `import:${suggestion.id}`, at: new Date().toISOString(), actor: `import:${suggestion.claim.provenance.provider}`, note: 'Imported suggestion; no human review performed.', before: null, after: { revision: 0, status: suggestion.status, claim: suggestion.claim } }] });
  }
  return validate(result, definitions, catalogue);
}
function review(store, action, definitions, catalogue) {
  validate(store, definitions, catalogue);check(action, schemas.review);
  if (action.reviewer.startsWith('import:')) throw Error('Reserved reviewer prefix');
  const result = structuredClone(store);
  const association = result.associations.find(a => a.id === action.claimId);
  if (!association) throw Error('Unknown association');
  const repeated = result.associations.flatMap(a => a.history).find(e => e.operationId === action.operationId);
  if (repeated) {
    if (!association.history.includes(repeated) || repeated.before?.revision !== action.expectedRevision || repeated.actor !== action.reviewer || repeated.note !== action.note || repeated.after.status !== action.status || !equal(repeated.after.claim, action.claim)) throw Error('Operation ID conflict');
    return result;
  }
  const before = latest(association);
  if (before.revision !== action.expectedRevision) throw Error('Stale review revision');
  validateClaim(action.claim, action.status, definitions, catalogue);
  association.history.push({ operationId: action.operationId, at: new Date().toISOString(), actor: action.reviewer, note: action.note, before: structuredClone(before), after: { revision: before.revision + 1, status: action.status, claim: action.claim } });
  return validate(result, definitions, catalogue);
}
module.exports = { latest, validateDefinitions, validate, propose, review };

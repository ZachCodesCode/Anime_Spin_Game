'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const M = require('../traits/model');
const definitions = require('../traits/data/definitions.json');
const catalogue = require('./fixtures').catalogue;
const pilot = require('./fixtures').pilot;
const empty = () => ({ version: 1, associations: [] });
const start = () => M.propose(empty(), pilot, definitions, catalogue);
function action(store, overrides = {}) {
  const association = store.associations[0];
  return { operationId: 'test-review', claimId: association.id, expectedRevision: M.latest(association).revision,
    status: 'verified', reviewer: 'test-only-maintainer', note: 'Synthetic test approval, not a real review.', claim: structuredClone(M.latest(association).claim), ...overrides };
}
test('trait definitions support new categories without importer changes', () => {
  const expanded = [...definitions, {id:'ability.healing', label:'Healing', category:'ability',valueType:'boolean',allowedValues:[true],guidance:'Explicit healing only.'}];
  M.validateDefinitions(expanded);
  assert.throws(() => M.validateDefinitions([...definitions, definitions[0]]));
  assert.throws(() => M.validateDefinitions([{...expanded.at(-1),allowedValues:['yes']}]));
});
test('multiple traits and context-specific claims preserve stable identity', () => {
  const second = structuredClone(pilot[0]);second.id='second';second.claim.traitId='identity.species';second.claim.value='human';
  const store=M.propose(empty(),[pilot[0],second],definitions,catalogue);
  assert.equal(store.associations.length,2);
  const contextual=structuredClone(pilot[0]);contextual.id='temporary';contextual.claim.context.persistence='temporary';
  assert.throws(()=>M.propose(store,[contextual],definitions,catalogue));
  contextual.claim.context.form='Test fixture episode 1';
  assert.equal(M.propose(store,[contextual],definitions,catalogue).associations.length,3);
});
test('duplicate, invalid character, trait value and anime references rejected',()=>{
  const store=start();
  for(const mutate of [s=>s.id='duplicate',s=>s.claim.characterId='missing',s=>s.claim.value='invalid',s=>s.claim.context.animeId='mal-anime-1',s=>s.claim.traitId='missing']) {
    const suggestion=structuredClone(pilot[0]);mutate(suggestion);
    assert.throws(()=>M.propose(store,[suggestion],definitions,catalogue));
  }
});
test('external suggestions cannot approve themselves; evidence required for approval',()=>{
  const suggestion=structuredClone(pilot[0]);suggestion.status='verified';
  assert.throws(()=>M.propose(empty(),[suggestion],definitions,catalogue));
  suggestion.status='proposed';suggestion.claim.evidence=[];
  const store=M.propose(empty(),[suggestion],definitions,catalogue);
  assert.throws(()=>M.review(store,action(store),definitions,catalogue));
  assert.equal(M.latest(store.associations[0]).status,'proposed');
});
test('review history records approvals, corrections and rejections',()=>{
  const store=start();const approved=M.review(store,action(store),definitions,catalogue);
  assert.equal(M.latest(store.associations[0]).status,'needs_review');
  assert.equal(M.latest(approved.associations[0]).status,'verified');
  const correction=action(approved,{operationId:'correction',status:'needs_review'});
  correction.claim.context.scope='Corrected scope for testing';
  const corrected=M.review(approved,correction,definitions,catalogue);
  assert.equal(corrected.associations[0].history.length,3);
  assert.equal(corrected.associations[0].history[2].before.status,'verified');
  const rejected=M.review(corrected,action(corrected,{operationId:'reject',status:'rejected'}),definitions,catalogue);
  assert.equal(M.latest(rejected.associations[0]).status,'rejected');
  assert.throws(()=>M.review(rejected,action(store,{operationId:'stale'}),definitions,catalogue));
});
test('repeated imports and reviews are idempotent, conflicting operation IDs fail',()=>{
  const store=start();assert.deepEqual(M.propose(store,pilot,definitions,catalogue),store);
  const a=action(store), reviewed=M.review(store,a,definitions,catalogue);
  assert.deepEqual(M.review(reviewed,a,definitions,catalogue),reviewed);
  assert.throws(()=>M.review(reviewed,{...a,note:'Different'},definitions,catalogue));
});
test('schema and history validation reject malformed evidence and tampering',()=>{
  for(const mutate of [s=>s.claim.evidence[0].url='fake',s=>delete s.claim.evidence[0].sourceName,s=>s.claim.context.persistence='sometimes',s=>s.claim.provenance.extra='unknown']) {
    const suggestion=structuredClone(pilot[0]);mutate(suggestion);
    assert.throws(()=>M.propose(empty(),[suggestion],definitions,catalogue));
  }
  const store=start();store.associations[0].history[0].before={};
  assert.throws(()=>M.validate(store,definitions,catalogue));
});
test('Phase 2 identity catalogue remains byte-for-byte intact',()=>{
 const bytes=fs.readFileSync(require.resolve('./fixtures'));
 const before=crypto.createHash('sha256').update(bytes).digest('hex');
 const identityBefore=JSON.stringify(catalogue);
 const store=start();M.review(store,action(store),definitions,catalogue);
 assert.equal(JSON.stringify(catalogue),identityBefore);
 assert.equal(crypto.createHash('sha256').update(fs.readFileSync(require.resolve('./fixtures'))).digest('hex'),before);
});

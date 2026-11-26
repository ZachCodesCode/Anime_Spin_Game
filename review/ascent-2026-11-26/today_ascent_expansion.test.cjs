const assert = require('node:assert/strict');
const test = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const C = require('../../power-level/core.js');
const R = require('../../power-level/run.js');
const bank = require('../../power-level/questions.js');
const draft = require('./today_ascent_expanded_draft.js');
const release = require('./today_ascent_proposed_release.json');
const baselineCounts = [136,82,54,62,78,36,45];

const ids = ['red-eyes','animal-ears','post-apocalyptic','psychics','delinquents','death-games','amnesia']
  .map(s => `timed-v4-wide-ascent-16-${s}`);
const source = fs.readFileSync(path.resolve(__dirname, '../../power-level/questions.js'), 'utf8');
const apiSource = fs.readFileSync(path.resolve(__dirname, '../../api/ascent.js'), 'utf8');

test('November 26 selection and question objects are preserved', () => {
  const selected = R.select(bank, '2026-11-26');
  assert.deepEqual(selected, ids);
  assert.deepEqual(draft.questions.map(q => q.id), ids);
  assert.equal(source.includes('today_ascent_expanded_draft'), false);
  assert.equal(apiSource.includes('power-level/questions'), true);
  for (const [i, id] of selected.entries()) {
    const q = bank.find(x => x.id === id);
    const proposed = draft.questions[i];
    assert.equal(proposed.text, q.text);
    assert.equal(proposed.wide, q.wide);
    assert.deepEqual(proposed.answers.slice(0, baselineCounts[i]), q.answers.slice(0, baselineCounts[i]));
    assert.deepEqual(q.answers.slice(baselineCounts[i]), release[q.id].map(({name,rarity,aliases}) => aliases.length ? {name,aliases,rarity} : {name,rarity}));
  }
});

test('new answers are unique, accepted by the shared matcher, and score correctly', () => {
  for (const q of draft.questions) {
    const originals = baselineCounts[ids.indexOf(q.id)];
    const forms = new Map();
    for (const a of q.answers) {
      assert.ok(Number.isInteger(a.rarity) && a.rarity >= 0 && a.rarity <= 100);
      for (const form of [a.name, ...(a.aliases || [])]) {
        const key = C.normalize(form);
        assert.ok(key);
        assert.ok(!forms.has(key) || forms.get(key) === a.name, `${q.id}: ${form} collides with ${forms.get(key)}`);
        forms.set(key, a.name);
      }
    }
    assert.equal(q.answers.filter(a => a.rarity === 100).length, 1);
    for (const a of q.answers.slice(originals)) {
      assert.ok(a.rarity < 100);
      assert.equal(C.validate(q, a.name).answer?.name, a.name);
      for (const alias of a.aliases || []) assert.equal(C.validate(q, alias).answer?.name, a.name);
      const expected = a.rarity >= 75 ? 85 : a.rarity >= 45 ? 60 : a.rarity >= 20 ? 30 : 10;
      assert.equal(C.points(a), expected);
    }
  }
});

test('existing answers preserve scoring and restored runs', () => {
  for (const proposed of draft.questions) {
    const live = bank.find(q => q.id === proposed.id);
    for (const a of live.answers) {
      assert.equal(C.points(proposed.answers.find(x => x.name === a.name)), C.points(a));
      assert.equal(C.validate(proposed, a.name).answer?.name, a.name);
    }
  }
});

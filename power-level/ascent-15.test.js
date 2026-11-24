const test = require('node:test');
const assert = require('node:assert/strict');
const bank = require('./questions');
const core = require('./core');
const run = require('./run');

const date = '2026-11-25';
const questions = [
  ['swords', 'char', 'Name any anime character who uses a sword.', 200, 'Shimotsuki Ushimaru'],
  ['black-hair', 'char', 'Name any anime character with black hair.', 324, 'Taisei Yoshida'],
  ['madhouse', 'title', 'Name any anime animated by Madhouse.', 258, 'Nasu: A Migratory Bird with Suitcase'],
  ['demons', 'char', 'Name any demon character from an anime.', 160, 'Zagan Johnny Western'],
  ['horns', 'char', 'Name any anime character who has horns.', 169, 'Kimaris Quichelite'],
  ['1980s', 'title', 'Name any anime first released in the 1980s.', 557, "Super Mario's Fire Brigade"],
  ['water-abilities', 'char', 'Name any anime character who uses water-based abilities.', 150, 'God Serena'],
];

test('Ascent #15 is assigned to November 25 in the submitted order', () => {
  assert.equal(run.dayNumber(date), 15);
  assert.deepEqual(run.select(bank, date), questions.map(([id]) => `timed-v4-wide-ascent-15-${id}`));
  assert.deepEqual(questions.map(([, kind]) => kind), run.DAY_PLAN);
  assert.equal(run.select(bank, '2026-11-24').some(id => id.includes('ascent-15-')), false);
});

test('Ascent #15 answer pools, rarity, Limit Breaks and input forms', () => {
  let total = 0;
  for (const [id, kind, text, count, limit] of questions) {
    const q = bank.find(q => q.id === `timed-v4-wide-ascent-15-${id}`);
    assert.ok(q);
    assert.equal(q.text, text);
    assert.equal(q.wide, kind);
    assert.equal(q.since, date);
    assert.equal(q.answers.length, count);
    assert.deepEqual(q.answers.filter(a => a.rarity === 100).map(a => a.name), [limit]);
    const seen = new Map();
    for (const answer of q.answers) {
      assert.ok(Number.isInteger(answer.rarity) && answer.rarity >= 0 && answer.rarity <= 100);
      assert.equal(run.boost(answer), core.points(answer));
      for (const form of [answer.name, ...(answer.aliases || [])]) {
        const normalized = core.normalize(form);
        assert.ok(normalized, `Empty normalized form for ${answer.name}`);
        assert.ok(!seen.has(normalized) || seen.get(normalized) === answer.name,
          `Conflicting form ${form} in ${q.id}`);
        seen.set(normalized, answer.name);
        assert.equal(core.validate(q, form).answer?.name, answer.name);
      }
    }
    total += count;
  }
  assert.equal(total, 1818);
});

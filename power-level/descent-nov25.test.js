const test = require('node:test');
const assert = require('node:assert/strict');
const source = require('./questions');
const descent = require('./descent');
const core = require('./core');

const date = '2026-11-25';
const expected = [
  ['masked-characters', 'char', 'Name an anime character who wears a mask other than Inosuke.', 108, 'Kakashi Hatake'],
  ['white-hair', 'char', 'Name an anime character with white or silver hair other than Gojo or Kakashi.', 256, 'Killua Zoldyck'],
  ['sports-anime', 'title', 'Name a sports anime other than Haikyu!!.', 176, 'Blue Lock'],
  ['fire-users', 'char', 'Name an anime character who fights with fire other than Ace.', 153, 'Kyojuro Rengoku'],
  ['assassins', 'char', 'Name an anime assassin other than Killua.', 107, 'Yor Forger'],
  ['anime-films', 'title', 'Name an anime film outside Studio Ghibli.', 449, 'Your Name'],
  ['chefs', 'char', 'Name an anime chef or cook other than Sanji.', 151, 'Soma Yukihira'],
];

test('November 25 Descent selects the seven submitted questions in order', () => {
  assert.equal(descent.dayNumber(date), 6);
  assert.deepEqual(descent.select(source, date), expected.map(([slug]) => `timed-v4-descent-${slug}`));
  const newIds = new Set(expected.map(([slug]) => `timed-v4-descent-${slug}`));
  for (const day of ['2026-11-20', '2026-11-21', '2026-11-22', '2026-11-23', '2026-11-24']) {
    assert.ok(descent.select(source, day).every(id => !newIds.has(id)));
  }
});

test('November 25 Descent source rarities, aliases and Top Answers are playable', () => {
  const flipped = descent.bank(source);
  let count = 0;
  for (const [slug, kind, text, answerCount, top] of expected) {
    const id = `timed-v4-descent-${slug}`;
    const raw = source.find(q => q.id === id);
    const playable = flipped.find(q => q.id === id);
    assert.ok(raw && playable);
    assert.equal(raw.text, text);
    assert.equal(raw.descent, kind);
    assert.equal(raw.since, date);
    assert.equal(raw.top, top);
    // The submitted answers are all still here; same-day reviews may add more (never remove).
    assert.ok(raw.answers.length >= answerCount, `${id} lost submitted answers`);
    assert.deepEqual(playable.answers.filter(a => a.rarity === 100).map(a => a.name), [top]);
    const forms = new Map();
    for (const answer of raw.answers) {
      assert.ok(Number.isInteger(answer.rarity) && answer.rarity >= 0 && answer.rarity <= 100);
      for (const form of [answer.name, ...(answer.aliases || [])]) {
        const key = core.normalize(form);
        assert.ok(key);
        assert.ok(!forms.has(key) || forms.get(key) === answer.name, `Conflicting alias: ${form}`);
        forms.set(key, answer.name);
        assert.equal(core.validate(playable, form).answer?.name, answer.name);
      }
    }
    count += answerCount;
  }
  assert.equal(count, 1400);
});

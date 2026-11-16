'use strict';
const schema = require('./schema.json');
function validate(data) {
  function check(value, rule, location) {
    if (rule.enum && !rule.enum.includes(value)) throw Error(location + ': invalid enum');
    if (rule.type === 'object') {
      if (!value || Array.isArray(value) || typeof value !== 'object') throw Error(location + ': expected object');
      for (const key of rule.required || []) if (!(key in value)) throw Error(location + ': missing ' + key);
      for (const [key, item] of Object.entries(value)) {
        if (!rule.properties[key]) throw Error(location + ': unknown field ' + key);
        check(item, rule.properties[key], location + '.' + key);
      }
    } else if (rule.type === 'array') {
      if (!Array.isArray(value)) throw Error(location + ': expected array');
      for (const item of value) check(item, rule.items, location);
      if (rule.uniqueItems && new Set(value.map(v => JSON.stringify(v))).size !== value.length) throw Error(location + ': duplicates');
    } else {
      const types = [].concat(rule.type);
      const type = value === null ? 'null' : Number.isSafeInteger(value) ? 'integer' : typeof value;
      if (!types.includes(type)) throw Error(location + ': invalid type');
      if (typeof value === 'string' && (!value.trim() || rule.pattern && !new RegExp(rule.pattern).test(value))) throw Error(location + ': invalid string');
      if (typeof value === 'number' && value < (rule.minimum ?? 0)) throw Error(location + ': invalid number');
    }
  }
  check(data, schema, 'catalogue');
  for (const key of ['anime', 'characters']) {
    if (new Set(data[key].map(x => x.id)).size !== data[key].length) throw Error('Duplicate identity');
    for (const x of data[key]) {
      const kind = key === 'anime' ? 'anime' : 'character';
      if (x.id !== 'mal-' + kind + '-' + x.malId) throw Error('Identity mismatch');
      if (!Number.isFinite(Date.parse(x.importedAt))) throw Error('Invalid timestamp');
    }
  }
  const animeIds = new Set(data.anime.map(a=>a.id)), characterIds = new Set(data.characters.map(c=>c.id));
  const relationships = new Set();
  for (const r of data.appearances) {
    const key = r.animeId + '/' + r.characterId;
    if (relationships.has(key)) throw Error('Duplicate appearance');
    relationships.add(key);
    if (!animeIds.has(r.animeId) || !characterIds.has(r.characterId)) throw Error('Dangling appearance');
  }
  return data;
}
module.exports = { validate };

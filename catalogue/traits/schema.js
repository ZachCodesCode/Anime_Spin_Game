'use strict';
// Validator for the JSON Schema keywords used by the trait files.
function check(value, schema, path = '$') {
  const fail = message => { throw Error(`${path}: ${message}`); };
  if (schema.const !== undefined && value !== schema.const) fail('invalid constant');
  if (schema.enum && !schema.enum.includes(value)) fail('invalid enum');
  const type = value === null ? 'null' : Array.isArray(value) ? 'array' : typeof value;
  if (schema.type && ![].concat(schema.type).some(t => t === type || t === 'integer' && Number.isSafeInteger(value))) fail('invalid type');
  if (type === 'number' && (!Number.isFinite(value) || value < (schema.minimum ?? -Infinity))) fail('invalid number');
  if (type === 'string') {
    if (schema.minLength && value.trim().length < schema.minLength) fail('empty string');
    if (schema.format === 'date-time' && (!/^\d{4}-\d\d-\d\dT/.test(value) || !Number.isFinite(Date.parse(value)))) fail('invalid timestamp');
    if (schema.format === 'uri') { try { const url = new URL(value); if (!['https:', 'http:'].includes(url.protocol)) fail('invalid URL'); } catch { fail('invalid URL'); } }
  }
  if (type === 'array' && schema.items) value.forEach((item, i) => check(item, schema.items, `${path}[${i}]`));
  if (type === 'object' && schema.properties) {
    for (const key of schema.required || []) if (!(key in value)) fail(`missing ${key}`);
    for (const [key, item] of Object.entries(value)) {
      if (!schema.properties[key] && schema.additionalProperties === false) fail(`unknown ${key}`);
      if (schema.properties[key]) check(item, schema.properties[key], `${path}.${key}`);
    }
  }
}
module.exports = { check };

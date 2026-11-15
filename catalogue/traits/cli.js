'use strict';
const fs = require('node:fs');
const path = require('node:path');
const M = require('./model');
const read = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const directory = path.join(__dirname, 'data');
const file = path.join(directory, 'associations.json');
const definitions = read(path.join(directory, 'definitions.json'));
const catalogue = read(path.join(__dirname, '../data/catalogue.json'));
const [command = 'pending', input] = process.argv.slice(2);
function report(store) {
  const states = { proposed: 0, needs_review: 0, verified: 0, rejected: 0 };
  for (const association of store.associations) states[M.latest(association).status]++;
  return { definitions: definitions.length, associations: store.associations.length, states, pending: states.proposed + states.needs_review };
}
try {
  if (['import','review'].includes(command)) {
    if (!input) throw Error('Provide a suggestion or review JSON file');
    const lock = file + '.lock';
    const descriptor = fs.openSync(lock, 'wx');
    try {
      const store = read(file);
      const operation = command === 'import' ? M.propose : M.review;
      const updated = operation(store, read(input), definitions, catalogue);
      fs.writeFileSync(file + '.tmp', JSON.stringify(updated, null, 2) + '\n');
      fs.renameSync(file + '.tmp', file);
      console.log(JSON.stringify(report(updated), null, 2));
    } finally { fs.closeSync(descriptor); fs.unlinkSync(lock); }
  } else {
    const store = M.validate(read(file), definitions, catalogue);
    if (command === 'validate' || command === 'report') console.log(JSON.stringify(report(store), null, 2));
    else if (command === 'pending') console.log(JSON.stringify(store.associations.filter(a => ['proposed','needs_review'].includes(M.latest(a).status)), null, 2));
    else if (command === 'show') {
      const association = store.associations.find(a => a.id === input);
      if (!association) throw Error('Unknown association');
      console.log(JSON.stringify(association, null, 2));
    } else throw Error('Commands: pending, show ID, validate, report, import FILE, review FILE');
  }
} catch (error) { console.error(error.message); process.exitCode = 1; }

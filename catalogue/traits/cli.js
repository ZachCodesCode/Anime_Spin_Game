'use strict';
const fs = require('node:fs');
const path = require('node:path');
const M = require('./model');
const read = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const directory = require('../team-data').directory();
const file = path.join(directory, 'associations.json');
const definitions = require('./data/definitions.json');
const catalogue = require('../team-data').read('catalogue.json');
const [command = 'pending', input] = process.argv.slice(2);
function report(store) {
  const states = { proposed: 0, needs_review: 0, verified: 0, rejected: 0 };
  for (const association of store.associations) states[M.latest(association).status]++;
  return { definitions: definitions.length, associations: store.associations.length, states, pending: states.proposed + states.needs_review };
}
try {
  if (['import','review'].includes(command)) {
    if(fs.existsSync(require('../verification/store').file))throw Error('Active shared review state exists. Use catalogue:traits-import and the existing authenticated reviewer; do not fork the baseline claim ledger.');
    if (!input) throw Error('Provide a suggestion or review JSON file');
    const lock = file + '.lock';
    const descriptor = fs.openSync(lock, 'wx');
    try {
      const store = require('../team-data').read('associations.json');
      const operation = command === 'import' ? M.propose : M.review;
      const action=read(input);
      if(command==='review'){const rosterFile=path.resolve(__dirname,'../private/phase5b3/maintainers.json');const reviewers=fs.existsSync(rosterFile)?read(rosterFile).reviewers:[];if(!Array.isArray(reviewers)||!reviewers.includes(action.reviewer))throw Error('Explicitly configured actual maintainer identity required; use the authenticated review workflow');}
      const updated = operation(store, action, definitions, catalogue);
      fs.writeFileSync(file + '.tmp', JSON.stringify(updated, null, 2) + '\n');
      fs.renameSync(file + '.tmp', file);
      console.log(JSON.stringify(report(updated), null, 2));
    } finally { fs.closeSync(descriptor); fs.unlinkSync(lock); }
  } else {
    const review=require('../verification/store');
    const active=fs.existsSync(review.file)?require('../verification/model').validate(review.read(),review.deps).traits:require('../team-data').read('associations.json');
    const store = M.validate(active, definitions, catalogue);
    if (command === 'validate' || command === 'report') console.log(JSON.stringify(report(store), null, 2));
    else if (command === 'pending') console.log(JSON.stringify(store.associations.filter(a => ['proposed','needs_review'].includes(M.latest(a).status)), null, 2));
    else if (command === 'show') {
      const association = store.associations.find(a => a.id === input);
      if (!association) throw Error('Unknown association');
      console.log(JSON.stringify(association, null, 2));
    } else throw Error('Commands: pending, show ID, validate, report, import FILE, review FILE');
  }
} catch (error) { console.error(error.message); process.exitCode = 1; }

'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const legacyBank = require('../questions');
const legacyCore = require('../core');
const legacyRun = require('../run');
const runtime = require('./runtime');
const ROOT = path.join(__dirname,'releases');
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
function date(value) {
  if (typeof value!=='string' || !/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(Date.parse(value)) || new Date(value).toISOString().slice(0,10)!==value || value<'2026-11-11') throw Error('Invalid challenge date');
  return value;
}
function freeze(value) { if(value && typeof value==='object') {Object.values(value).forEach(freeze);Object.freeze(value);} return value; }
function load(version, root=ROOT) {
  if (!/^[a-f0-9]{64}$/.test(version || '')) throw Error('Invalid bank version');
  const directory=path.join(path.resolve(root),version);
  const manifest=JSON.parse(fs.readFileSync(path.join(directory,'manifest.json')));
  if(hash(JSON.stringify(manifest))!==version) throw Error('Manifest changed');
  for(const name of ['bank.json','core.js','run.js']) {
    if(hash(fs.readFileSync(path.join(directory,name)))!==manifest.files[name]) throw Error('Published bank changed');
  }
  const bank=JSON.parse(fs.readFileSync(path.join(directory,'bank.json')));
  const core=require(path.join(directory,'core.js')),run=require(path.join(directory,'run.js'));
  return {bank:freeze(bank),core,run};
}
function validateBank(bank,core) {
  if(!Array.isArray(bank) || !bank.length || new Set(bank.map(q=>q.id)).size!==bank.length) throw Error('Invalid bank');
  for(const q of bank) {
    if(typeof q.id!=='string' || !q.id || typeof q.text!=='string' || !q.text || !Array.isArray(q.answers) || !q.answers.length) throw Error('Invalid question');
    const forms=new Map();let limits=0;
    for(const a of q.answers) {
      if(typeof a.name!=='string' || !a.name.trim() || !Number.isFinite(a.rarity) || a.rarity<0 || a.rarity>100 || a.clever!==undefined && typeof a.clever!=='boolean' || a.aliases!==undefined && !Array.isArray(a.aliases)) throw Error('Invalid answer');
      if(core.points(a)===100) limits++;
      for(const form of [a.name,...a.aliases||[]]) {
        if(typeof form!=='string' || !core.normalize(form)) throw Error('Invalid alias');
        const key=core.normalize(form);
        if(forms.has(key) && forms.get(key)!==a) throw Error('Alias collision');
        forms.set(key,a);
      }
    }
    if(q.descent){if(q.wide||!['char','title'].includes(q.descent)||q.top!==undefined&&!q.answers.some(a=>a.name===q.top))throw Error('Invalid Descent definition');}
    else if(limits!==1) throw Error('Expected one Limit Break');
  }
}
function publish(bank,root=ROOT) {
  validateBank(bank,legacyCore);
  const files={'bank.json':JSON.stringify(bank)+'\n','core.js':fs.readFileSync(path.join(__dirname,'../core.js'),'utf8'),'run.js':fs.readFileSync(path.join(__dirname,'../run.js'),'utf8')};
  const manifest={format:1,files:Object.fromEntries(Object.entries(files).map(([name,content])=>[name,hash(content)]))};
  const version=hash(JSON.stringify(manifest));fs.mkdirSync(root,{recursive:true});
  const target=path.join(root,version);
  if(fs.existsSync(target)) {load(version,root);return version;}
  const staging=fs.mkdtempSync(path.join(root,'.staging-'));
  try { for(const [name,content] of Object.entries(files))fs.writeFileSync(path.join(staging,name),content);
    fs.writeFileSync(path.join(staging,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
    fs.renameSync(staging,target);
  } finally {fs.rmSync(staging,{recursive:true,force:true});}
  return version;
}
function payload(day,version,ids,release) {
  date(day);
  if(![5,7].includes(ids.length) || new Set(ids).size!==ids.length)throw Error('Invalid question order');
  const questions=ids.map(id=>release.bank.find(q=>q.id===id));
  if(questions.some(q=>!q))throw Error('Unknown question ID');
  if(questions.some(q=>q.descent))throw Error('Descent question in Ascent assignment');
  if(ids.length===7&&questions.some((q,i)=>q.wide!==['char','char','title','char','char','title','char'][i]))throw Error('Ascent assignment requires five character and two title slots');
  return freeze({date:day,bankVersion:version,questionIds:[...ids],questions:structuredClone(questions)});
}
function resolve(day,{enabled=false,assignments=require('./assignments.json'),root=ROOT}={}) {
  date(day);
  if(!enabled) return {payload:payload(day,'legacy',legacyRun.select(legacyBank,day),{bank:legacyBank}),core:legacyCore,run:legacyRun};
  const matches=assignments.filter(a=>a.date===day);
  if(matches.length!==1)throw Error('Missing or ambiguous published assignment');
  const assignment=matches[0],release=load(assignment.bankVersion,root);
  return {...release,payload:payload(day,assignment.bankVersion,assignment.questionIds,release)};
}
function assign(assignments,assignment,{now=new Date(),root=ROOT}={}) {
  date(assignment.date);
  if(assignment.date<=legacyCore.dateKey(now))throw Error('Publish only at a future Toronto boundary');
  const existing=assignments.find(a=>a.date===assignment.date);
  if(existing) {
    if(JSON.stringify(existing)!==JSON.stringify(assignment))throw Error('Assignment already published');
    return assignments;
  }
  const release=load(assignment.bankVersion,root);
  payload(assignment.date,assignment.bankVersion,assignment.questionIds,release);
  return [...assignments,structuredClone(assignment)].sort((a,b)=>a.date.localeCompare(b.date));
}
function submit(body,options={}) {
  const now=options.now || new Date();
  if(![legacyCore.dateKey(now),legacyCore.dateKey(new Date(+now-864e5))].includes(body.date))throw Error('Not a current ascent');
  const selected=resolve(body.date,options),p=selected.payload;
  if(options.enabled && (body.bankVersion!==p.bankVersion || JSON.stringify(body.questionIds)!==JSON.stringify(p.questionIds)))throw Error('Challenge version mismatch; refresh required');
  return {date:p.date,bankVersion:p.bankVersion,questionIds:p.questionIds,answers:body.answers,score:runtime.create(p,selected.core,selected.run).score(body.answers)};
}
function picks(row) {
  // Legacy positional arrays cannot safely be assigned IDs without deployment evidence.
  if(!row.bankVersion || !Array.isArray(row.questionIds) || !Array.isArray(row.answers) || row.questionIds.length!==row.answers.length || new Set(row.questionIds).size!==row.questionIds.length)return {score:row.score,picks:null,reason:'unversioned or invalid history'};
  return {score:row.score,bankVersion:row.bankVersion,picks:row.questionIds.map((questionId,i)=>({questionId,answer:row.answers[i]}))};
}
module.exports={load,publish,resolve,assign,submit,picks,validateBank,date};

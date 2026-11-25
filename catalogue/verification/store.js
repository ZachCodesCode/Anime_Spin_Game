'use strict';
const fs=require('node:fs'),path=require('node:path'),V=require('./model');
const legacy=path.resolve(__dirname,'../private/phase5b3/state.json');
const file=process.env.ASCENT_TRAIT_REVIEW_STATE?path.resolve(process.env.ASCENT_TRAIT_REVIEW_STATE):fs.existsSync(legacy)?legacy:path.join(require('../team-data').directory(),'review-state.json');
require('../traits/importer/store').privateFile(file);
const directory=path.dirname(file);
const getDeps=()=>V.index({catalogue:require('../team-data').read('catalogue.json'),definitions:require('../traits/data/definitions.json'),policy:require('../enrichment/eligibility.json'),questions:require('../../power-level/questions')});
const read=()=>JSON.parse(fs.readFileSync(file,'utf8'));
function update(fn){return require('../traits/importer/store').update(file,state=>{const next=fn(state);V.validate(next,getDeps());return next;});}
module.exports={file,directory,get deps(){return getDeps();},read,update};

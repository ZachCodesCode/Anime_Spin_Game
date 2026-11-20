'use strict';
const fs=require('node:fs'),path=require('node:path'),V=require('./model');
const directory=path.resolve(__dirname,'../private/phase5b3');
const deps=V.index({catalogue:require('../data/catalogue.json'),definitions:require('../traits/data/definitions.json'),policy:require('../enrichment/eligibility.json'),questions:require('../../power-level/questions')});
const read=()=>JSON.parse(fs.readFileSync(path.join(directory,'state.json'),'utf8'));
function update(fn){const file=path.join(directory,'state.json'),lock=file+'.lock';let fd;try{fd=fs.openSync(lock,'wx',0o600);const next=fn(read());V.validate(next,deps);fs.writeFileSync(file+'.tmp',JSON.stringify(next,null,2)+'\n',{mode:0o600});fs.renameSync(file+'.tmp',file);return next;}finally{if(fd!==undefined){fs.closeSync(fd);fs.unlinkSync(lock);}}}
module.exports={directory,deps,read,update};

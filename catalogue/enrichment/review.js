'use strict';
// An explicit maintainer decision file is required. Never invoked by enrichment.
const fs=require('node:fs'),path=require('node:path'),M=require('../traits/model');
function apply(file,decision,definitions,catalogue){
 const lock=path.join(path.dirname(file),'.review.lock');let fd;
 try{fd=fs.openSync(lock,'wx');const store=JSON.parse(fs.readFileSync(file));const updated=M.review(store,decision,definitions,catalogue);fs.writeFileSync(file+'.tmp',JSON.stringify(updated,null,2)+'\n');fs.renameSync(file+'.tmp',file);return updated;}
 finally{if(fd!==undefined){fs.closeSync(fd);fs.unlinkSync(lock);}}
}
if(require.main===module){if(!process.argv[2])throw Error('Supply an explicit authorized review decision file');const decision=JSON.parse(fs.readFileSync(process.argv[2]));apply(path.resolve('catalogue/private/phase5b1/associations.json'),decision,require('../traits/data/definitions.json'),require('../data/catalogue.json'));console.log('Recorded local review decision; rerun report.js. No gameplay export.');}
module.exports={apply};

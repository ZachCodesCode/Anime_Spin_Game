'use strict';
const fs=require('node:fs'),path=require('node:path'),A=require('./admission'),Q=require('./questions'),S=require('../verification/store');
const root=path.resolve(__dirname,'../private');
function output(file,value){const target=path.resolve(file);if(!target.startsWith(root+path.sep))throw Error('Output must stay under catalogue/private');fs.mkdirSync(path.dirname(target),{recursive:true});if(!fs.realpathSync(path.dirname(target)).startsWith(fs.realpathSync(root)+path.sep)&&fs.realpathSync(path.dirname(target))!==fs.realpathSync(root))throw Error('Private output symlink escapes boundary');fs.writeFileSync(target,JSON.stringify(value,null,2)+'\n',{flag:'wx',mode:0o600});}
if(require.main===module){try{const [command,input,destination]=process.argv.slice(2);if(command==='inventory'){if(!input||destination)throw Error('inventory PRIVATE_OUTPUT.json');output(input,Q.inventory(S.deps.questions,S.deps.policy,S.deps.definitions));}
else if(command==='stage'){if(!input||!destination)throw Error('stage PACKET.json PRIVATE_OUTPUT.json');output(destination,A.inspect(JSON.parse(fs.readFileSync(input)),S.deps.catalogue));}
else throw Error('Commands: inventory PRIVATE_OUTPUT | stage PACKET PRIVATE_OUTPUT');}catch(e){console.error(e.message);process.exitCode=1;}}
module.exports={output};

'use strict';
// This local adapter loads the existing actual maintainer roster; request files cannot set it.
const fs=require('fs'),path=require('path'),S=require('../verification/store'),V=require('../verification/model');
const A=require('./private-admission'),E=require('../verification/source-review'),{output}=require('./cli');
const root=path.resolve(__dirname,'../private'),read=f=>JSON.parse(fs.readFileSync(f));
function privateFile(file){const p=path.resolve(file),real=fs.realpathSync(p);if(!real.startsWith(fs.realpathSync(root)+path.sep)||fs.lstatSync(p).isSymbolicLink())throw Error('Existing private file required');return p;}
function update(file,fn){
 file=privateFile(file);const lock=file+'.lock',temp=file+'.tmp';let fd;
 try{fd=fs.openSync(lock,'wx',0o600);const before=fs.readFileSync(file),next=fn(JSON.parse(before));if(fs.readFileSync(file).compare(before))throw Error('Concurrent state change');
  fs.writeFileSync(temp,JSON.stringify(next,null,2)+'\n',{flag:'wx',mode:0o600});fs.renameSync(temp,file);return next;
 }finally{if(fd!==undefined){fs.closeSync(fd);fs.unlinkSync(lock);}}
}
function sourceDeps(input){
 if(!input.privateCatalogueFile)return S.deps;
 const admitted=A.validateState(read(privateFile(input.privateCatalogueFile)));
 if(input.expectedPrivateCatalogueHash!==V.hash(admitted))throw Error('Private catalogue revision changed');
 return V.index({...S.deps,catalogue:admitted.catalogue});
}
function main(args){
 const [command,stateFile,inputFile,destination,confirm]=args;
 if(command==='init'){if(!stateFile||inputFile||destination)throw Error('init PRIVATE_STATE.json');output(stateFile,A.initial(S.deps.catalogue,require('../data/anime-metadata.json')));return;}
 const state=read(privateFile(stateFile));
 if(command==='inspect-admission'){output(destination,A.inspect(state,read(inputFile)));return;}
 const reviewers=read(path.join(S.directory,'maintainers.json')).reviewers;
 if(command==='prepare-admission'){const request=read(inputFile);output(destination,A.prepare(state,request.request,request.action,reviewers));return;}
 if(command==='prepare-source'){const request=read(inputFile);output(destination,E.prepare(state,request.input,request.action,sourceDeps(request.input),reviewers));return;}
 if(command==='apply-admission'||command==='apply-source'){
  if(confirm!=='--confirm'||!destination)throw Error('apply-... PRIVATE_STATE PLAN OPERATION_ID --confirm');const plan=read(privateFile(inputFile));
  update(stateFile,current=>command==='apply-admission'?A.commit(current,plan,destination,true,reviewers):E.commit(current,plan,destination,true,sourceDeps(plan.input),reviewers));return;
 }
 throw Error('Commands: init, inspect-admission, prepare-admission, apply-admission, prepare-source, apply-source');
}
if(require.main===module)try{main(process.argv.slice(2));}catch(e){console.error(e.message);process.exitCode=1;}
module.exports={main,privateFile,update};

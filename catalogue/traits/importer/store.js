'use strict';
const fs=require('node:fs'),path=require('node:path'),V=require('../../verification/model');
function privateFile(file){const target=path.resolve(file),local=path.resolve(__dirname,'../../private'),roots=[local,require('../../team-data').directory()],root=roots.find(r=>target.startsWith(r+path.sep));if(!root)throw Error('Import state and snapshots must stay under catalogue/private or configured private team data');fs.mkdirSync(root,{recursive:true,mode:0o700});const canonicalRoot=fs.realpathSync(root);if(root===local&&canonicalRoot!==root)throw Error('Private storage root symlink refused');const canonicalTarget=path.join(canonicalRoot,path.relative(root,target));let parent=path.dirname(canonicalTarget);while(!fs.existsSync(parent))parent=path.dirname(parent);if(!fs.realpathSync(parent).startsWith(canonicalRoot+path.sep)&&parent!==canonicalRoot)throw Error('Private storage symlink escapes boundary');try{if(fs.lstatSync(canonicalTarget).isSymbolicLink())throw Error('State symlink refused');}catch(e){if(e.code!=='ENOENT')throw e;}return canonicalTarget;}
function update(file,fn,{expectedHash,failBeforeRename=false}={}){
 const target=privateFile(file);fs.mkdirSync(path.dirname(target),{recursive:true,mode:0o700});const lock=target+'.lock',temp=target+'.tmp';let fd,tempOwned=false;
 try{fd=fs.openSync(lock,'wx',0o600);fs.writeFileSync(fd,JSON.stringify({pid:process.pid,host:require('node:os').hostname()}));const before=fs.existsSync(target)?fs.readFileSync(target):null;
  const state=before?JSON.parse(before):null;if(expectedHash&&V.hash(state)!==expectedHash)throw Error('Stale review state');const next=fn(state);
  if(before&&V.hash(next)===V.hash(state))return next;
  const tmp=fs.openSync(temp,'wx',0o600);tempOwned=true;try{fs.writeFileSync(tmp,JSON.stringify(next,null,2)+'\n');fs.fsyncSync(tmp);}finally{fs.closeSync(tmp);}
  if(failBeforeRename)throw Error('Simulated interruption before atomic rename');
  if(before&&fs.readFileSync(target).compare(before))throw Error('Concurrent writer changed review state');fs.renameSync(temp,target);tempOwned=false;
  return JSON.parse(fs.readFileSync(target));
 }finally{if(tempOwned)fs.unlinkSync(temp);if(fd!==undefined){fs.closeSync(fd);fs.unlinkSync(lock);}}
}
function snapshot(file,value){const target=privateFile(file);fs.mkdirSync(path.dirname(target),{recursive:true,mode:0o700});if(fs.existsSync(target)){if(V.hash(JSON.parse(fs.readFileSync(target)))!==V.hash(value))throw Error('Immutable source snapshot changed');return;}const temp=target+'.tmp',fd=fs.openSync(temp,'wx',0o600);let ready=false;try{fs.writeFileSync(fd,JSON.stringify(value,null,2)+'\n');fs.fsyncSync(fd);ready=true;}finally{fs.closeSync(fd);if(!ready)fs.unlinkSync(temp);}try{if(fs.existsSync(target))throw Error('Concurrent source writer');fs.renameSync(temp,target);}finally{if(fs.existsSync(temp))fs.unlinkSync(temp);}}
module.exports={privateFile,update,snapshot};

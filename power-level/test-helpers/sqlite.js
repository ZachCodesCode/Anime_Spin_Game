'use strict';
// Test-only libSQL owner. Native prepared statements can outlive Client.close().
// Process exit is the release boundary; never delete its database before exit.
const {fork}=require('node:child_process');
const fs=require('node:fs/promises'),os=require('node:os'),path=require('node:path');
const {pathToFileURL}=require('node:url');

async function connect(url){
 const child=fork(__filename,[url],{stdio:['ignore','ignore','pipe','ipc'],serialization:'advanced'});
 const pending=new Map();let serial=0,closing=false,closePromise,diagnostic='';
 child.stderr.on('data',b=>{diagnostic=(diagnostic+b).slice(-8192);});
 let readyResolve,readyReject;
 const ready=new Promise((resolve,reject)=>{readyResolve=resolve;readyReject=reject;});
 const terminated=new Promise(resolve=>child.once('close',(code,signal)=>{
  const error=Error(`SQLite test owner exited (${code ?? signal})${diagnostic?'\n'+diagnostic:''}`);
  readyReject(error);for(const request of pending.values())request.reject(error);pending.clear();
  resolve({code,signal});
 }));
 child.on('error',readyReject);
 child.on('message',message=>{
  if(message.ready){readyResolve();return;}
  const request=pending.get(message.id);if(!request)return;pending.delete(message.id);
  if(message.error)request.reject(Object.assign(Error(message.error.message),{name:message.error.name,code:message.error.code}));
  else request.resolve(message.result);
 });
 function request(method,args){
  return new Promise((resolve,reject)=>{
   const id=++serial;pending.set(id,{resolve,reject});
   child.send({id,method,args},error=>{if(error){pending.delete(id);reject(error);}});
  });
 }
 // All SQL must finish before close. Existing tests await every execute/batch.
 // Refuse accidental overlapping shutdown instead of silently abandoning work.
 const db={
  execute(...args){if(closing)return Promise.reject(Error('SQLite fixture is closing'));return request('execute',args);},
  batch(...args){if(closing)return Promise.reject(Error('SQLite fixture is closing'));return request('batch',args);},
  get closed(){return closing;},
  close(){
   if(!closePromise)closePromise=(async()=>{
    closing=true;let error;
    try{
     if(pending.size)throw Error('SQLite fixture closed with unawaited operations');
     await request('close',[]);
    }catch(e){error=e;if(child.exitCode===null&&child.signalCode===null)child.kill();}
    const result=await terminated;
    if(error)throw error;
    if(result.code!==0)throw Error(`SQLite owner failed to close (${result.code ?? result.signal})`);
   })();
   return closePromise;
  }
 };
 try{await ready;return db;}catch(error){if(child.exitCode===null&&child.signalCode===null)child.kill();await terminated;throw error;}
}
async function fileDatabase(prefix){
 const directory=await fs.mkdtemp(path.join(os.tmpdir(),prefix));
 const url=pathToFileURL(path.join(directory,'test.db')).href;let db;
 try{db=await connect(url);}catch(error){await fs.rm(directory,{recursive:true,force:true});throw error;}
 return {db,directory,url,async dispose(){
  // close() waits for the sole native owner's process AND stdio to terminate.
  await db.close();
  await fs.rm(directory,{recursive:true,force:true,maxRetries:3,retryDelay:50});
 }};
}
module.exports={fileDatabase,connect};

if(require.main===module){
 const db=require('@libsql/client').createClient({url:process.argv[2]});let closing=false;
 process.on('disconnect',()=>{if(!closing)process.exit(1);});
 const reply=message=>new Promise((resolve,reject)=>process.send(message,e=>e?reject(e):resolve()));
 let queue=Promise.resolve();
 process.on('message',message=>{
  queue=queue.then(async()=>{
   const {id,method,args}=message;
   try{
    if(!['execute','batch','close'].includes(method))throw Error('Unsupported test database operation');
    const result=await db[method](...args);
    await reply({id,result});
    if(method==='close'){closing=true;process.disconnect();process.exit(0);}
   }catch(error){
    await reply({id,error:{name:error.name,message:error.message,code:error.code}});
    if(method==='close'){closing=true;process.disconnect();process.exit(1);}
   }
  }).catch(error=>{console.error(error);process.exit(1);});
 });
 process.send({ready:true});
}

'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const D=require('../team-data'),fixture=require('./fixtures');
function bundle(){const files={'catalogue.json':structuredClone(fixture.catalogue),'anime-metadata.json':{},'associations.json':{version:1,associations:[]}};return {format:'ascent-private-team-bundle-v1',authorization:{authorizedBy:'Explicit synthetic test fixture; not a real permission grant',reference:'Synthetic unit test only',purpose:'private-team-use',publicRedistribution:false},files:Object.fromEntries(Object.entries(files).map(([n,data])=>[n,{data,sha256:D.hash(data)}]))};}
test('authorized private bootstrap checks schemas/checksums, retains identities, refuses overwrite',()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'catalogue-team-test-')),dir=path.join(root,'data');try{const data=bundle(),before=JSON.stringify(data);assert.equal(D.bootstrap(data,dir).characters,5);assert.equal(JSON.stringify(data),before);assert.deepEqual(JSON.parse(fs.readFileSync(path.join(dir,'catalogue.json'))),fixture.catalogue);assert.throws(()=>D.bootstrap(data,dir),/overwrite/);if(process.platform!=='win32')assert.equal(fs.statSync(path.join(dir,'catalogue.json')).mode&0o777,0o600);}finally{fs.rmSync(root,{recursive:true,force:true});}
});
test('missing, extra, tampered and untrusted data fail closed without partial writes',()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'catalogue-team-test-'));try{for(const mutate of [b=>delete b.authorization,b=>b.authorization.publicRedistribution=true,b=>b.files['../escape.json']={},b=>b.files['catalogue.json'].data.characters.pop(),b=>{b.files['associations.json'].data={};b.files['associations.json'].sha256=D.hash({});}]){const b=bundle();mutate(b);const target=path.join(root,'data');assert.throws(()=>D.bootstrap(b,target));assert(!fs.existsSync(target));}assert.throws(()=>D.directory(path.resolve('assets/private-data')),/public/i);const escape=path.join(root,'link');fs.symlinkSync(path.resolve('power-level'),escape);assert.throws(()=>D.directory(escape),/public paths/);}finally{fs.rmSync(root,{recursive:true,force:true});}
});
test('data absence never falls back to fabricated records',()=>{
 const prev=process.env.ASCENT_CATALOGUE_DATA_DIR;process.env.ASCENT_CATALOGUE_DATA_DIR=path.join(os.tmpdir(),'definitely-missing-catalogue-'+process.pid);try{assert.throws(()=>D.read('catalogue.json'),/unavailable/);}finally{if(prev===undefined)delete process.env.ASCENT_CATALOGUE_DATA_DIR;else process.env.ASCENT_CATALOGUE_DATA_DIR=prev;}
});
test('public preview blocks catalogue data, encoded paths and escaping symlinks',async t=>{
 const {createServer}=require('../../scripts/dev'),server=createServer();await new Promise(r=>server.listen(0,'127.0.0.1',r));t.after(()=>server.close());const base='http://127.0.0.1:'+server.address().port;
 for(const url of ['/catalogue/private/team-data/catalogue.json','/%63atalogue/verification/ui/index.html','/catalogue%2fprivate/state.json','/.env'])assert.equal((await fetch(base+url)).status,403);
 assert.equal((await fetch(base+'/')).status,200);
});

test('fresh clone can bootstrap to the default ignored private path without precreating directories',()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'catalogue-fresh-clone-'));try{const dir=path.join(root,'catalogue');fs.mkdirSync(dir);const context={module:{exports:{}},require,__dirname:fs.realpathSync(dir),process:{env:{}}};require('node:vm').runInNewContext(fs.readFileSync(require.resolve('../team-data'),'utf8'),context);assert.equal(context.module.exports.directory(),path.join(fs.realpathSync(dir),'private/team-data'));}finally{fs.rmSync(root,{recursive:true,force:true});}
});

test('owner export and recipient bootstrap CLI require private authorization and trusted checksum',()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'catalogue-team-cli-'));try{const source=path.join(root,'owner'),target=path.join(root,'recipient'),out=path.join(root,'test.private-bundle.json'),authorization=path.join(root,'authorization.json');D.bootstrap(bundle(),source);fs.writeFileSync(authorization,JSON.stringify(bundle().authorization));const {spawnSync}=require('node:child_process'),cli=require.resolve('../team-cli'),run=(args,env)=>spawnSync(process.execPath,[cli,...args],{encoding:'utf8',env:{...process.env,...env}});let result=run(['bundle',authorization,out],{ASCENT_CATALOGUE_DATA_DIR:source});assert.equal(result.status,0,result.stderr);result=run(['bootstrap',out],{ASCENT_CATALOGUE_DATA_DIR:target,ASCENT_CATALOGUE_BUNDLE_SHA256:''});assert.notEqual(result.status,0);assert(!fs.existsSync(target));const digest=require('node:crypto').createHash('sha256').update(fs.readFileSync(out)).digest('hex');result=run(['bootstrap',out],{ASCENT_CATALOGUE_DATA_DIR:target,ASCENT_CATALOGUE_BUNDLE_SHA256:digest});assert.equal(result.status,0,result.stderr);assert.deepEqual(JSON.parse(fs.readFileSync(path.join(target,'catalogue.json'))),fixture.catalogue);}finally{fs.rmSync(root,{recursive:true,force:true});}
});

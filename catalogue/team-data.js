'use strict';
// Data is deliberately absent from public Git. Missing data never becomes synthetic data.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const repository=path.resolve(__dirname,'..'),privateRoot=path.join(__dirname,'private');
const names=['catalogue.json','anime-metadata.json','associations.json'];
const hash=data=>crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');
function directory(value=process.env.ASCENT_CATALOGUE_DATA_DIR||path.join(privateRoot,'team-data')) {
 const dir=path.resolve(value),withinPrivate=dir===privateRoot||dir.startsWith(privateRoot+path.sep);
 if(dir===repository||dir.startsWith(repository+path.sep)&&!withinPrivate)throw Error('Public catalogue data destination refused');
 let existing=dir;
 while(true){try{fs.lstatSync(existing);break;}catch(e){if(e.code!=='ENOENT')throw e;existing=path.dirname(existing);}}
 const real=fs.realpathSync(existing),relative=path.relative(repository,real);
 if(withinPrivate&&real!==existing)throw Error('Private catalogue root symlink refused');
 if(!withinPrivate&&(real===repository||!relative.startsWith('..'+path.sep)&&!path.isAbsolute(relative)&&real!==privateRoot&&!real.startsWith(privateRoot+path.sep)))throw Error('Catalogue data must be outside public paths');
 return dir;
}
function read(name){
 if(!names.includes(name))throw Error('Unknown catalogue data file');
 const dir=directory(),file=path.join(dir,name);
 if(!fs.existsSync(file))throw Error('Private catalogue data unavailable. Run npm run catalogue:bootstrap -- AUTHORIZED-BUNDLE.json; see catalogue/TEAM-SETUP.md.');
 if(fs.lstatSync(file).isSymbolicLink()||fs.realpathSync(file)!==path.join(fs.realpathSync(dir),name))throw Error('Catalogue file symlink refused');
 return JSON.parse(fs.readFileSync(file,'utf8'));
}
function validate(files){
 require('./validate').validate(files['catalogue.json']);
 require('./metadata').validateAll(files['anime-metadata.json']);
 require('./traits/model').validate(files['associations.json'],require('./traits/data/definitions.json'),files['catalogue.json']);
 for(const [key,m]of Object.entries(files['anime-metadata.json']))if(!files['catalogue.json'].anime.some(a=>a.malId===Number(key)))throw Error('Metadata has no catalogue adaptation');
 return {characters:files['catalogue.json'].characters.length,anime:files['catalogue.json'].anime.length,appearances:files['catalogue.json'].appearances.length,traits:files['associations.json'].associations.length};
}
function bootstrap(bundle,destination){
 if(bundle.format!=='ascent-private-team-bundle-v1')throw Error('Invalid private bundle');
 const a=bundle.authorization;
 if(!a||a.purpose!=='private-team-use'||typeof a.authorizedBy!=='string'||!a.authorizedBy.trim()||typeof a.reference!=='string'||!a.reference.trim()||a.publicRedistribution!==false)throw Error('Actual data-owner authorization and private-use reference required');
 if(!bundle.files||Object.keys(bundle.files).sort().join()!==[...names].sort().join())throw Error('Only the three supported data files may be bootstrapped');
 const files={};for(const name of names){const record=bundle.files[name];if(!record||record.sha256!==hash(record.data))throw Error('Bundle checksum mismatch');files[name]=record.data;}
 const counts=validate(files),dir=directory(destination);
 if(fs.existsSync(dir))throw Error('Use a new data directory; never overwrite histories');
 fs.mkdirSync(path.dirname(dir),{recursive:true,mode:0o700});const staging=fs.mkdtempSync(path.join(path.dirname(dir),'.catalogue-bootstrap-'));
 try{for(const [name,data]of Object.entries({...files,'bundle-manifest.json':{authorization:a,checksums:Object.fromEntries(names.map(n=>[n,bundle.files[n].sha256])),counts}}))fs.writeFileSync(path.join(staging,name),JSON.stringify(data,null,2)+'\n',{flag:'wx',mode:0o600});fs.renameSync(staging,dir);}finally{fs.rmSync(staging,{recursive:true,force:true});}
 return counts;
}
module.exports={directory,read,validate,bootstrap,hash,names};

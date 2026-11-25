'use strict';
const fs=require('node:fs'),path=require('node:path'),D=require('./team-data');
async function main(){const [command,arg,output]=process.argv.slice(2);
 if(command==='bootstrap'){
  if(!arg)throw Error('Supply the path to an authorized private bundle obtained through team-controlled private storage');
  if(/^https?:/i.test(arg))throw Error('Download through your authenticated storage client first; URLs and embedded credentials are not accepted');
  const stat=fs.statSync(arg);if(!stat.isFile()||stat.size>64*1024*1024)throw Error('Private JSON bundle must be at most 64 MiB');
  const bytes=fs.readFileSync(arg),digest=require('node:crypto').createHash('sha256').update(bytes).digest('hex');
  if(!/^[a-f0-9]{64}$/.test(process.env.ASCENT_CATALOGUE_BUNDLE_SHA256||'')||digest!==process.env.ASCENT_CATALOGUE_BUNDLE_SHA256)throw Error('Obtain the expected bundle SHA-256 through your trusted team channel and set ASCENT_CATALOGUE_BUNDLE_SHA256');
  console.log(JSON.stringify(D.bootstrap(JSON.parse(bytes),D.directory()),null,2));
 }else if(command==='bundle'){
  if(!arg||!output)throw Error('bundle ACTUAL-OWNER-AUTHORIZATION.json PRIVATE-OUTPUT.private-bundle.json');
  const authorization=JSON.parse(fs.readFileSync(arg)),files=Object.fromEntries(D.names.map(n=>[n,{data:D.read(n)}]));D.validate(Object.fromEntries(D.names.map(n=>[n,files[n].data])));
  if(authorization.purpose!=='private-team-use'||!authorization.authorizedBy?.trim()||!authorization.reference?.trim()||authorization.publicRedistribution!==false)throw Error('Actual owner authorization required; this tool cannot grant source rights');
  if(authorization.includeReviewState===true){const state=require('./verification/store').file;if(!fs.existsSync(state))throw Error('No review state to export');files['review-state.json']={data:JSON.parse(fs.readFileSync(state))};D.validate(Object.fromEntries(Object.entries(files).map(([n,r])=>[n,r.data])));}
  for(const record of Object.values(files))record.sha256=D.hash(record.data);
  const target=path.resolve(output),dir=D.directory(path.dirname(target));fs.mkdirSync(dir,{recursive:true,mode:0o700});
  if(fs.existsSync(target))throw Error('Existing bundle will not be overwritten');
  const bytes=JSON.stringify({format:'ascent-private-team-bundle-v1',authorization,files})+'\n';fs.writeFileSync(target,bytes,{flag:'wx',mode:0o600});
  console.log('Private bundle created. Transfer only through authorized team storage. SHA-256: '+require('node:crypto').createHash('sha256').update(bytes).digest('hex'));
 }else if(command==='validate'){const files=Object.fromEntries(D.names.map(n=>[n,D.read(n)])),review=require('./verification/store');if(fs.existsSync(review.file))files['review-state.json']=require('./verification/model').validate(review.read(),review.deps);console.log(JSON.stringify(D.validate(files),null,2));}
 else if(command==='inspect'){
  if(!arg)throw Error('Supply a stable character ID or name fragment');const c=D.read('catalogue.json'),review=require('./verification/store'),s=fs.existsSync(review.file)?review.read().traits:D.read('associations.json'),needle=arg.toLowerCase();
  console.log(JSON.stringify(c.characters.filter(x=>x.id===arg||[x.name,...x.aliases].some(n=>n.toLowerCase().includes(needle))).slice(0,30).map(x=>({...x,appearances:c.appearances.filter(a=>a.characterId===x.id).map(a=>({...a,anime:c.anime.find(n=>n.id===a.animeId)?.name})),traits:s.associations.filter(a=>require('./traits/model').latest(a).claim.characterId===x.id)})),null,2));
 }else throw Error('Commands: bootstrap AUTHORIZED-BUNDLE.json | validate | inspect ID-OR-NAME');
}
if(require.main===module)main().catch(e=>{console.error(e.message);process.exitCode=1;});

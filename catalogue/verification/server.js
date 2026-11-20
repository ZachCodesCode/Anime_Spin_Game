'use strict';
const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const V=require('./model');
function create({read,update,deps,reviewers=[],token=crypto.randomBytes(32).toString('hex')}){
 const plans=new Map(),assets={'/':['index.html','text/html'],'/app.js':['app.js','text/javascript'],'/style.css':['style.css','text/css']};
 const server=http.createServer(async(req,res)=>{
  const host='127.0.0.1:'+server.address().port,origin='http://'+host;
  res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','no-referrer');res.setHeader('Content-Security-Policy',"default-src 'self'; connect-src 'self'; img-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'");
  const send=(status,data,type='application/json')=>{res.writeHead(status,{'Content-Type':type});res.end(type==='application/json'?JSON.stringify(data):data);};
  try{
   if(req.headers.host!==host||req.headers.origin&&req.headers.origin!==origin)return send(403,{error:'Loopback origin required'});
   const route=new URL(req.url,origin).pathname;
   if(assets[route]&&req.method==='GET'){const [file,type]=assets[route];return send(200,fs.readFileSync(path.join(__dirname,'ui',file)),type);}
   if(req.headers.authorization!=='Bearer '+token)return send(401,{error:'Local session token required'});
   if(route==='/api/review'&&req.method==='GET'){const result=V.view(read(),deps);return send(200,{...result,reviewers});}
   if(route==='/api/export'&&req.method==='GET')return send(200,V.exported(read(),deps));
   if(req.method!=='POST'||!['/api/prepare','/api/commit'].includes(route))return send(404,{error:'Not found'});
   if(req.headers['content-type']!=='application/json'||req.headers.origin!==origin)return send(403,{error:'Same-origin JSON required'});
   let size=0,body='';for await(const chunk of req){size+=chunk.length;if(size>100000)throw Error('Request too large');body+=chunk;}
   const input=JSON.parse(body);
   if(route==='/api/prepare'){
    const prepared=V.plan(read(),input,deps,reviewers),id=crypto.randomUUID();
    for(const [id,p] of plans)if(Date.now()-p.at>600000)plans.delete(id);
    if(plans.size>=100)throw Error('Too many prepared sessions');
    plans.set(id,{prepared,at:Date.now()});return send(200,{id,...prepared});
   }
   const p=plans.get(input.planId);if(!p||Date.now()-p.at>600000)throw Error('Review preview expired');
   const next=update(state=>V.commit(state,p.prepared,input.operationId,input.confirmed,deps,reviewers));return send(200,{revision:next.revision,saved:true});
  }catch(e){send(400,{error:e.message});}
 });
 return {server,token};
}
if(require.main===module){
 const S=require('./store'),file=path.join(S.directory,'maintainers.json');
 const reviewers=fs.existsSync(file)?JSON.parse(fs.readFileSync(file)).reviewers:[];
 if(!Array.isArray(reviewers)||reviewers.some(r=>typeof r!=='string'||!r.trim()))throw Error('Invalid maintainer roster');
 V.validate(S.read(),S.deps);
 const {server,token}=create({...S,reviewers});server.listen(Number(process.env.ASCENT_REVIEW_PORT||8093),'127.0.0.1',()=>console.log(`Local review: http://127.0.0.1:${server.address().port}/#${token}\n${reviewers.length?'Configured maintainer decisions enabled.':'Read-only until owner configures private maintainers.json.'}`));
}
module.exports={create};

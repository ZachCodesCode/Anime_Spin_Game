// Local static preview. Challenge resolution is intentionally legacy/offline; score APIs require Vercel dev.
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'application/javascript','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.json':'application/json'};
function createServer(){return http.createServer(async(req,res)=>{
 const url=new URL(req.url,'http://localhost');
 const json=(status,data)=>{res.writeHead(status,{'Content-Type':'application/json'});res.end(JSON.stringify(data));};
 if(url.pathname.startsWith('/api/'))return json(503,{error:'Use Vercel dev for score and suggestion APIs.'});
 let relative;try{relative=decodeURIComponent(url.pathname);}catch{return json(400,{error:'Bad path'});}
 const blocked=p=>p.split(/[\\/]/).some(s=>s.startsWith('.')||s==='node_modules'||s==='catalogue');
 if(blocked(relative)){res.writeHead(403);return res.end();}
 if(relative==='/')relative='/index.html';
 else if(['/AnimeAscent','/AnimeAscent/'].includes(relative))relative='/AnimeAscent.html';
 else if(['/descent','/descent/'].includes(relative))relative='/descent.html';
 else if(['/spin','/spin/'].includes(relative))relative='/index.html';
 const file=path.resolve(root,'.'+relative);
 try{const real=await fs.promises.realpath(file);if(!real.startsWith(root+path.sep)||blocked(path.relative(root,real))){res.writeHead(403);return res.end();}
  const data=await fs.promises.readFile(real);res.writeHead(200,{'Content-Type':types[path.extname(real)]||'application/octet-stream'});res.end(data);
 }catch{res.writeHead(404);res.end('Not found');}
 });}
if(require.main===module){const port=Number(process.env.PORT)||8082;createServer().listen(port,'127.0.0.1',()=>console.log('Shonen Spin local preview: http://127.0.0.1:'+port));}
module.exports={createServer};

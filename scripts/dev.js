// Local static + API preview. No production data is used unless Turso env vars are supplied.
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const {createClient}=require('@libsql/client');
const root=path.resolve(__dirname,'..');
const db=createClient(process.env.TURSO_DATABASE_URL?{url:process.env.TURSO_DATABASE_URL,authToken:process.env.TURSO_AUTH_TOKEN}:{url:'file:'+path.join(root,'power-level-dev.db.local')});
const handler=require('../api/_power-level').createHandler(db);
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.json':'application/json'};
http.createServer(async(req,res)=>{const url=new URL(req.url,'http://localhost');res.status=n=>{res.statusCode=n;return res;};res.json=d=>{res.setHeader('Content-Type','application/json');res.end(JSON.stringify(d));};
 if(url.pathname==='/api/power-level'){let raw='';for await(const chunk of req){raw+=chunk;if(raw.length>20000)return res.status(413).json({error:'Request too large'});}try{req.body=raw?JSON.parse(raw):{};}catch{return res.status(400).json({error:'Invalid JSON'});}req.query=Object.fromEntries(url.searchParams);return handler(req,res);}
 if(url.pathname.startsWith('/api/'))return res.status(503).json({error:'Use Vercel dev for the team-builder APIs.'});
 const relative=decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname);if(relative.split('/').some(p=>p.startsWith('.'))||relative.includes('node_modules'))return res.status(403).end();const file=path.resolve(root,'.'+relative);if(!file.startsWith(root+path.sep))return res.status(403).end();fs.readFile(file,(e,data)=>{if(e)return res.status(404).end('Not found');res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');res.end(data);});
}).listen(Number(process.env.PORT)||8082,'127.0.0.1',()=>console.log('Shonen Spin local API preview: http://127.0.0.1:'+(process.env.PORT||8082)));

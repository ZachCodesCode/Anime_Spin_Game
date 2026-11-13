// Local static preview of the site. The team-builder APIs need Vercel dev.
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.json':'application/json'};
http.createServer(async(req,res)=>{const url=new URL(req.url,'http://localhost');res.status=n=>{res.statusCode=n;return res;};res.json=d=>{res.setHeader('Content-Type','application/json');res.end(JSON.stringify(d));};
 if(url.pathname.startsWith('/api/'))return res.status(503).json({error:'Use Vercel dev for the team-builder APIs.'});
 const relative=decodeURIComponent(url.pathname==='/'?'/index.html':['/AnimeAscent','/AnimeAscent/'].includes(url.pathname)?'/AnimeAscent.html':url.pathname);if(relative.split('/').some(p=>p.startsWith('.'))||relative.includes('node_modules'))return res.status(403).end();const file=path.resolve(root,'.'+relative);if(!file.startsWith(root+path.sep))return res.status(403).end();fs.readFile(file,(e,data)=>{if(e)return res.status(404).end('Not found');res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');res.end(data);});
}).listen(Number(process.env.PORT)||8082,'127.0.0.1',()=>console.log('Shonen Spin local preview: http://127.0.0.1:'+(process.env.PORT||8082)));

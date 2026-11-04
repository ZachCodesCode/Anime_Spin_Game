// Shared anonymous identity for Shonen Spin leaderboards. Never publish this key.
const crypto = require('node:crypto');
function guest(req,res,create=false){
 const token=(req.headers.cookie||'').split(';').map(s=>s.trim()).find(s=>s.startsWith('shonen_guest='))?.slice(13);
 let value=/^[a-f0-9]{64}$/.test(token||'')?token:null;
 if(!value&&create){value=crypto.randomBytes(32).toString('hex');res.setHeader('Set-Cookie',`shonen_guest=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=31536000${process.env.VERCEL||req.headers['x-forwarded-proto']==='https'?'; Secure':''}`);}
 return value?crypto.createHash('sha256').update(value).digest('hex'):null;
}
function sameOrigin(req){if(!req.headers.origin)return true;try{return new URL(req.headers.origin).host===req.headers.host;}catch{return false;}}
module.exports={guest,sameOrigin};

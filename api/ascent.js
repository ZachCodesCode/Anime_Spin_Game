'use strict';
const {db,ensureAscent,cors}=require('./_db');
const {guest}=require('./_guest');
const C=require('../power-level/core');
const V=require('../power-level/versioning');
const ascent=require('./_ascent-versioning').service({db,ensureAscent});
module.exports=async function handler(req,res) {
  cors(res);
  if(req.method==='OPTIONS')return res.status(204).end();
  res.setHeader('Cache-Control','no-store');
  try {
    if(req.method==='GET') {
      const day=String(req.query.date || C.dateKey());
      try {V.date(day);}catch {return res.status(400).json({error:'Bad date'});}
      if(req.query.challenge==='1')return res.status(200).json(await ascent.challenge(day));
      return res.status(200).json(await ascent.stats(day,await ascent.resolve(day)));
    }
    if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
    let body;
    try {body=typeof req.body==='string'?JSON.parse(req.body):req.body;if(!body || typeof body!=='object')throw Error();}catch {return res.status(400).json({error:'Invalid run'});}
    return res.status(200).json(await ascent.submit(body,guest(req,res,true)));
  } catch(error) {return res.status(error.status || 503).json({error:error.status?error.message:'Ascent unavailable. Please retry.'});}
};

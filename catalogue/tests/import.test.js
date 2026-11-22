const {test}=require('node:test');
const assert=require('node:assert/strict');
const I=require('../import');
const {validate}=require('../validate');
test('aliases preserve Unicode and deduplicate normalized variants',()=>{
 assert.deepEqual(I.aliases([' Hero ','hero','ヒーロー',null],'Name'),['Hero','ヒーロー']);
 assert.throws(()=>I.identity({mal_id:1},'character'));
 assert.throws(()=>I.identity({mal_id:-1,name:'X'},'character'));
 assert.equal(I.identity({mal_id:1,name:'X'},'character').japaneseName,null);
});
test('imports reuse identities across appearances and resume without requests',async()=>{
 const data=I.empty();
 const request=async path=>path.endsWith('/characters')?{data:[{character:{mal_id:7},role:'Main'}]}:path.startsWith('/anime/')?{data:{mal_id:Number(path.split('/').at(-1)),title:'Anime'}}:{data:{mal_id:7,name:'Character',nicknames:['Alias']}};
 await I.run({animeIds:[1,2]},data,request);
 assert.equal(data.characters.length,1);assert.equal(data.appearances.length,2);
 await I.run({animeIds:[1,2]},data,()=>{throw Error('Unexpected request')});
 validate(data);
 assert.throws(()=>validate({...data,characters:[...data.characters,...data.characters]}));
 assert.throws(()=>validate({...data,unknown:1}));
});
test('missing names and invalid source records are reviewable',async()=>{
 const data=I.empty();
 await I.run({animeIds:[1]},data,async p=>p.endsWith('/characters')?{data:[{character:{}},{character:{mal_id:7}}]}:p.startsWith('/anime/')?{data:{mal_id:1,title:'Anime'}}:{data:{mal_id:7}});
 assert.equal(data.review.length,2);assert.equal(data.characters.length,0);
});
test('429 Retry-After and transient network failures retry safely',async()=>{
 let attempts=0, failures=0;const waits=[];
 const request=I.client({wait:async ms=>waits.push(ms),failures:()=>failures++,fetcher:async()=>{
 attempts++;if(attempts===1)throw Error('network');
 if(attempts===2)return {ok:false,status:429,headers:new Headers({'Retry-After':'5'})};
 return {ok:true,json:async()=>({data:[]})};
 }});
 assert.deepEqual(await request('/test'),{data:[]});assert.equal(failures,2);assert.ok(waits.includes(5000));
 await assert.rejects(I.client({wait:async()=>{},fetcher:async()=>({ok:false,status:404})})('/bad'),/404/);
});
test('paginated collections follow metadata and reject malformed responses',async()=>{
 const paths=[];assert.deepEqual(await I.collection(async p=>{paths.push(p);return {data:[paths.length],pagination:{current_page:paths.length,has_next_page:paths.length===1}}},'/items'),[1,2]);
 assert.equal(paths[1],'/items?page=2');
 await assert.rejects(I.collection(async()=>({data:null}),'/items'));
});
test('failed imports can resume from completed character checkpoints',async()=>{
 const data=I.empty();let fail=true;
 const request=async p=>{
 if(p==='/anime/1')return {data:{mal_id:1,title:'Anime'}};
 if(p.endsWith('/characters'))return {data:[{character:{mal_id:1}},{character:{mal_id:2}}]};
 const id=Number(p.split('/').at(-1));if(id===2&&fail)throw Error('offline');
 return {data:{mal_id:id,name:'Character '+id}};
 };
 await assert.rejects(I.run({animeIds:[1]},data,request));assert.equal(data.characters.length,1);
 fail=false;await I.run({animeIds:[1]},data,request);assert.equal(data.characters.length,2);validate(data);
});
test('server errors stop after bounded retries and HTTP-date retry is honored',async()=>{
 let attempts=0;
 await assert.rejects(I.client({wait:async()=>{},fetcher:async()=>{attempts++;return {ok:false,status:503,headers:new Headers()};}})('/down'),/exhausted/);
 assert.equal(attempts,5);
 const delays=[];attempts=0;
 await I.client({wait:async ms=>delays.push(ms),fetcher:async()=>++attempts===1?
 {ok:false,status:429,headers:new Headers({'Retry-After':new Date(Date.now()+60000).toUTCString()})}:
 {ok:true,json:async()=>({data:[]})}})('/retry');
 assert.ok(delays.some(ms=>ms>50000));
});
test('schema rejects broken relationships, unexpected content and invalid names',()=>{
 const d=I.empty();d.characters.push(I.identity({mal_id:1,name:'Name'},'character'));
 assert.throws(()=>validate({...d,appearances:[{animeId:'missing',characterId:d.characters[0].id,role:null,provider:'Tenrai',sourceUrl:'https://api.tenrai.org/v1/anime/1/characters',importedAt:new Date().toISOString()}]}));
 d.characters[0].about='Not allowed';assert.throws(()=>validate(d));delete d.characters[0].about;
 d.characters[0].name='';assert.throws(()=>validate(d));
});

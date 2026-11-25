'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process');
const D=require('../content'),K=require('../traits/importer/knowledge'),P=require('../public-data');
function fixture(fn){const root=path.resolve(__dirname,'../private');fs.mkdirSync(root,{recursive:true});const dir=fs.mkdtempSync(path.join(root,'daily-test-'));try{return fn(dir);}finally{fs.rmSync(dir,{recursive:true,force:true,maxRetries:3,retryDelay:50});}}
function source(dir){const file=path.join(dir,'knowledge.sqlite'),input=path.join(dir,'official.ndjson');
 const identity={id:'mal-character-1',canonicalId:'mal-character-1',name:'Éloïse Fixture',aliases:['Gosei 合成一号'],appearances:[{title:'Fixture Sea',media:'anime',externalTitleId:'10'}],canonicalAppearances:[{animeId:'mal-anime-10'}],sourceProvider:'ACDB',providerIds:['acdb-character-1'],identityStatus:'matched_existing'};
 const row={providerId:'acdb-character-1',identity,sourceIdentity:{id:'1',name:identity.name},hold:null,sourceRevision:'test-official',license:'ODbL-1.0 + DbCL-1.0',acquisition:'official-sql-export',profile:{identifiers:{aliases:['Gosei 合成一号']},appearances:[{externalTitleId:'10',title:'Fixture Sea',media:'anime',sourceMediaCode:'2'}]},facts:[{traitId:'appearance.hair_color',value:'black',sourceProvider:'ACDB',sourceType:'profile',rawField:'hair_color',rawValue:'1',rawLabel:'Black',trustStatus:'source_trusted',hold:null,context:{animeId:'mal-anime-10',form:null,persistence:'unknown'},license:'ODbL-1.0 + DbCL-1.0',acquisition:'official-sql-export',url:'https://www.animecharactersdatabase.com/characters.php?id=1',locator:'official hair code',fact:'Source reports black hair.',independentlyVerified:false,publicationAuthorized:false}]};
 fs.writeFileSync(input,JSON.stringify({provider:'acdb',total:1,hash:D.hash(row)})+'\n'+JSON.stringify(row)+'\n');K.store('ingest',file,[input,1]);return file;
}
const q=(extra={})=>({id:'fixture-black',text:'Name an anime character with black hair.',anime:'mixed',wide:'char',answers:[{name:'Éloïse Fixture',characterId:'mal-character-1',animeId:'mal-anime-10',rarity:100,aliases:['Gosei 合成一号']}],...extra});
const packet=(question=q(),mode='ascent')=>D.packet({bank:[question],mode,challengeDate:'2026-11-30',sourceHash:D.hash(question)});
function sqlite(file,sql){const r=cp.spawnSync(process.env.ASCENT_PYTHON||(process.platform==='win32'?'python':'python3'),['-B','-c','import sqlite3,sys,json;d=sqlite3.connect(sys.argv[1]);print(json.dumps(d.execute(sys.argv[2]).fetchall(),ensure_ascii=False));d.close()',file,sql],{encoding:'utf8',env:{...process.env,PYTHONIOENCODING:'utf-8:strict'}});assert.equal(r.status,0,r.stderr);return JSON.parse(r.stdout);}
test('daily CSV handles Unicode, multiline evidence, aliases and Descent scoring without executing input',()=>{
 const text='question_id,question,kind,answer,rarity,aliases,evidence\r\nfixture,Name an anime detective.,char,"合成, One",10,"[""Gosei 合成一号""]","[{""url"":""https://example.org/profile"",""fact"":""Line one\\nLine two""}]"\r\n';
 assert.equal(D.csv('a,b\n"one\nline",two')[0].a,'one\nline');const bank=D.fromCSV(text,'descent');assert.equal(bank[0].answers[0].name,'合成, One');assert.deepEqual(bank[0].answers[0].aliases,['Gosei 合成一号']);assert.equal(packet(bank[0],'descent').questions[0].answers[0].rarity,10);assert.throws(()=>D.csv('a,b\n"broken'),/Unterminated/);assert.throws(()=>D.fromCSV('question_id,question,kind,answer,rarity\nx,q,char,a,','ascent'));
 const p=packet();p.questions[0].answers[0].rarity=1;assert.throws(()=>D.validatePacket(p),/changed/);
});
test('daily mappings keep compounds, unknown exclusions, title metadata and character traits separate',()=>{
 assert.equal(D.mapping(q()).all[0].value,'black');assert.deepEqual(D.mapping(q({text:'Name any character except Bob who uses a sword or a bow.'})).all,[]);
 const compound=D.mapping(q({knowledge:{entity:'character',all:[{trait:'equipment.weapon',value:'sword'},{trait:'ability.element',value:'fire'}],context:'anime recurring; not transformed'}}));assert.equal(compound.all.length,2);
 assert.equal(D.mapping(q({wide:'title',text:'Name a sports anime.',knowledge:{entity:'anime',all:[{field:'genres',value:'Sports'}]}})).entity,'anime');assert.throws(()=>packet(q({knowledge:{entity:'anime',all:[{field:'genres',value:'Sports'}]}})),/mismatch/);assert.throws(()=>D.mapping(q({knowledge:{entity:'character',all:[{trait:'new.fake',value:'fire'}]}})),/Unknown/);
});
test('daily enrichment is idempotent, retains trusted facts and stores unsupported identities/traits pending',()=>fixture(dir=>{
 const database=source(dir),output=path.join(dir,'operation'),publicDirectory=path.join(dir,'public');
 const question=q();question.answers.push({name:'Unknown Twin',rarity:10,aliases:[],animeTitle:'Unrelated Work'});
 const p=packet(question),before=K.store('snapshot',database);const r=D.apply(p,{database,output,publicDirectory});assert.equal(r.integrity,'ok');assert.equal(r.summary.existingTraitsMatched,1);assert.equal(r.summary.pendingClaims,1);assert.equal(r.summary.newIdentitiesProposed,1);
 const first=K.store('snapshot',database),again=D.apply(p,{database,output,publicDirectory});assert.equal(again.packetId,r.packetId);assert.equal(K.store('snapshot',database).sha256,first.sha256);assert.equal(first.tables.observations.length,before.tables.observations.length);assert.equal(first.tables.identities.length,before.tables.identities.length);assert.equal(P.read(publicDirectory).manifest.characterCount,1);
 const backup=K.store('snapshot',r.backup);assert.equal(backup.sha256,before.sha256);assert.equal(sqlite(database,"SELECT count(*) FROM legacy WHERE json_extract(body,'$.format')='daily-confirmed-usage-v1'")[0][0],0);
 assert(sqlite(database,"SELECT body FROM legacy WHERE json_extract(body,'$.format')='daily-content-claim-v1'").some(row=>JSON.parse(row[0]).status==='pending'));
 assert.equal(K.store('search',database,[],{all:[{trait:'appearance.hair_color',value:'black'}]}).length,1);
}));
test('daily transaction failures roll back and export failures require explicit successful retry',()=>fixture(dir=>{
 const database=source(dir),before=K.store('snapshot',database),p=packet();
 assert.throws(()=>D.apply(p,{database,output:path.join(dir,'fail-transaction'),publicDirectory:path.join(dir,'public'),failAt:'transaction'}),/Injected transaction/);assert.equal(K.store('snapshot',database).sha256,before.sha256);
 const output=path.join(dir,'fail-export');assert.throws(()=>D.apply(p,{database,output,publicDirectory:path.join(dir,'public'),failAt:'export'}),/export pending/);assert(!fs.existsSync(path.join(output,'receipt.json')));assert.equal(sqlite(database,"SELECT value FROM meta WHERE key='daily-export-pending'").length,1);
 D.apply(p,{database,output,publicDirectory:path.join(dir,'public')});assert.equal(sqlite(database,"SELECT value FROM meta WHERE key='daily-export-pending'").length,0);assert(fs.existsSync(path.join(output,'receipt.json')));P.read(path.join(dir,'public'));
}));
test('daily identity reconciliation requires franchise scope and holds same-name collisions and conflicting stable names',()=>fixture(dir=>{
 const database=source(dir),p=packet(q({answers:[{name:'Éloïse Fixture',rarity:100},{name:'Wrong Stable Name',characterId:'mal-character-1',animeId:'mal-anime-10',rarity:10},{name:'Gosei 合成一号',animeId:'mal-anime-10',rarity:20}]}));
 const rows=D.reconcile(p,database)[0].answers;assert(!rows[0].resolution.characterId);assert(!rows[1].resolution.characterId);assert.equal(rows[2].resolution.characterId,'mal-character-1');
}));
test('daily conflict and cross-mode history never modify existing facts or infer negatives',()=>fixture(dir=>{
 const database=source(dir),p=packet(q({text:'Name an anime character with red hair.'})),r=D.apply(p,{database,output:path.join(dir,'ascent'),publicDirectory:path.join(dir,'public')});assert.equal(r.summary.conflictingClaims,1);
 const desc=q({id:'fixture-descent',wide:undefined,descent:'char',text:'Name an anime character with black hair.'});D.apply(packet(desc,'descent'),{database,output:path.join(dir,'descent'),publicDirectory:path.join(dir,'public')});
 assert.deepEqual(new Set(sqlite(database,"SELECT json_extract(body,'$.mode') FROM legacy WHERE json_extract(body,'$.format')='daily-question-inventory-v1'").flat()),new Set(['ascent','descent']));
 assert.equal(K.store('search',database,[],{all:[{trait:'appearance.hair_color',value:'red'}]}).length,0);assert.equal(K.store('search',database,[],{all:[{trait:'appearance.hair_color',value:'black'}]}).length,1);
}));
test('usage confirmation rejects unconfigured maintainers before writing history',()=>fixture(dir=>{
 const file=path.join(dir,'record.json'),roster=path.join(dir,'maintainers.json');fs.writeFileSync(file,'{}');fs.writeFileSync(roster,JSON.stringify({reviewers:[]}));assert.throws(()=>require('../content/cli').confirm({record:file,maintainer:'Imaginary Reviewer'},{maintainers:roster}),/Actual configured/);
}));
test('daily evidence goes through the existing Wikidata adapter and joins the same atomic transaction',()=>fixture(dir=>{
 const database=source(dir),catalogue=structuredClone(require('./fixtures').catalogue);catalogue.characters[0].name='Éloïse Fixture';catalogue.characters[0].aliases=[];
 const qid='Q900000001',claim=(property,value)=>({id:qid+'$'+property,rank:'normal',mainsnak:{property,snaktype:'value',datavalue:{value}}});
 const input=path.join(dir,'evidence.json');fs.writeFileSync(input,JSON.stringify({format:'anime-ascent-wikidata-knowledge-v1',provider:'Wikidata',license:'CC0-1.0',retrievedAt:'2026-11-24T12:00:00Z',characterIds:[qid],entities:{[qid]:{id:qid,lastrevid:12,labels:{en:{value:'Éloïse Fixture'}},aliases:{},claims:{P4085:[claim('P4085','1')],P106:[claim('P106',{id:'Q900000010'})]}},Q900000010:{id:'Q900000010',labels:{en:{value:'pirate'}}}}}));
 const question=q({text:'Name an anime pirate.'});question.answers[0].context={animeId:null,scope:'Daily question, source period unresolved',form:null,persistence:'unknown'};
 const options={database,catalogue,sources:[{provider:'wikidata',input}],publicDirectory:path.join(dir,'public')},before=K.store('snapshot',database);
 assert.throws(()=>D.apply(packet(question),{...options,output:path.join(dir,'rollback-source'),failAt:'transaction'}),/Injected/);assert.equal(K.store('snapshot',database).sha256,before.sha256);
 const r=D.apply(packet(question),{...options,output:path.join(dir,'supported')});assert.equal(r.summary.newEvidenceBackedTraits,1);assert.equal(r.summary.existingTraitsMatched,1);assert.equal(K.store('search',database,[],{all:[{trait:'occupation.role',value:'pirate'}]}).length,1);
 assert.equal(K.store('validate',database).sqliteIntegrity,'ok');assert.equal(P.read(path.join(dir,'public')).manifest.bySource.Wikidata||0,0); // No explicit public ACDB/Wikidata identity link: private source trust does not clear redistribution.
}));
test('anime metadata is stored using existing schema, remains separate and requires matching source fields',()=>fixture(dir=>{
 const database=source(dir),metadata={'10':{malId:10,title:'Fixture Sea',genres:[{id:30,name:'Sports'}],themes:[],studios:[{id:11,name:'Fixture Studio'}],year:1985,popularity:null,members:null,sourceUrl:'https://api.tenrai.org/v1/anime/10',retrievedAt:'2026-11-24T12:00:00Z'}};
 const question=q({wide:'title',text:'Name a sports anime.',knowledge:{entity:'anime',all:[{field:'genres',value:'Sports'},{field:'year',value:1985}]},answers:[{name:'Fixture Sea',animeId:'mal-anime-10',rarity:100}]});
 D.apply(packet(question),{database,metadata,output:path.join(dir,'title'),publicDirectory:path.join(dir,'public')});const records=sqlite(database,"SELECT body FROM legacy WHERE json_extract(body,'$.format')='daily-anime-metadata-candidate-v1'").map(r=>JSON.parse(r[0]));assert.equal(records[0].status,'source_supported');assert(!records[0].traitId);assert.equal(K.store('snapshot',database).tables.observations.length,1);
}));

test('historical inventory dry-run assesses deduplicated tracked banks without modifying knowledge',()=>fixture(dir=>{
 const database=source(dir),before=K.store('snapshot',database).sha256,result=D.inventory({database,ref:'HEAD'});assert(result.uniqueQuestionAnswerPairs>0);assert.equal(result.backfillApplied,false);assert.equal(result.confirmedUsageRecords,0);assert(result.dryRun.answersAssessed>0);assert.equal(K.store('snapshot',database).sha256,before);
}));
test('documentary CSV identities match exact questions and answers without implying factual approval',()=>fixture(dir=>{
 const database=source(dir),p=packet(),resolve=D.resolver(database),R=require('../content/research');const record={row:{question_text:p.questions[0].question.text,canonical_answer:'Éloïse Fixture',anime:'Fixture Sea',existing_database_id:'mal-character-1',source_url:'https://example.invalid/profile',verification_status:'supported'},file:'fictional.csv',sourceHash:'fixture',line:2};
 const a=R.attach(p.questions[0].question,p.questions[0].answers[0],[record],resolve,D.hash);assert.equal(a.resolution.characterId,'mal-character-1');assert.equal(a.resolution.factuallyVerified,false);assert.equal(a.identityResearch[0].provenance.line,2);
 const wrong=structuredClone(record);wrong.row.question_text='Different question';assert(!R.attach(p.questions[0].question,{name:'Éloïse Fixture'},[wrong],resolve,D.hash).resolution);
 const other=structuredClone(record);other.row.existing_database_id='mal-character-999999';assert(!R.attach(p.questions[0].question,{name:'Éloïse Fixture'},[other],resolve,D.hash).resolution);
}));
test('Ascent and Descent CSV preparation automatically enrichs, exports and retains game-specific rarity',()=>fixture(dir=>{
 const database=source(dir),publicDirectory=path.join(dir,'public');const quote=v=>'"'+String(v).replaceAll('"','""')+'"';
 for(const mode of ['ascent','descent']){
  const fields=['question_id','question','kind','answer','rarity','aliases','character_id','anime_id'];const values=['fixture-csv-'+mode,'Name an anime character with black hair.','char','Éloïse Fixture',mode==='ascent'?100:85,JSON.stringify(['Gosei 合成一号']),'mal-character-1','mal-anime-10'];const csv=fields.join(',')+'\n'+values.map(quote).join(',')+'\n',bank=D.fromCSV(csv,mode),p=D.packet({bank,mode,challengeDate:'2026-12-01',sourceHash:D.hash(csv)}),output=path.join(dir,mode);
  const r=D.apply(p,{database,output,publicDirectory});assert.equal(r.integrity,'ok');assert(fs.existsSync(path.join(output,'receipt.json')));assert.equal(JSON.parse(fs.readFileSync(path.join(output,'reviewed-bank.NOT-PUBLISHED.json')))[0].answers[0].rarity,mode==='ascent'?100:85);assert.equal(P.read(publicDirectory).manifest.characterCount,1);assert.equal(r.summary.confirmedUsageRecords,0);
 }
}));
test('actual research CSV headers preserve per-answer anime/evidence and require explicit question mapping',()=>{
 const text='question_number,question_text,canonical_answer,anime,aliases,rarity_value,existing_database_id,source_url,verification_status\n1,Name any anime character with black hair.,Fictional Fixture,Fixture Anime,[],100,mal-character-1,https://example.invalid/profile,supported\n';
 assert.throws(()=>D.fromCSV(text,'ascent'),/requires/);const bank=D.fromCSV(text,'ascent',{'1':{id:'fixture-import',kind:'char'}});assert.equal(bank[0].id,'fixture-import');assert.equal(bank[0].anime,'mixed');assert.equal(bank[0].answers[0].animeTitle,'Fixture Anime');assert.equal(bank[0].answers[0].characterId,'mal-character-1');assert.equal(bank[0].answers[0].evidence[0].independentlyVerified,false);assert.equal(D.packet({bank,mode:'ascent',challengeDate:'2026-12-01',sourceHash:'fixture'}).publicationAuthorized,false);
});
test('daily JVMG auto scope uses the same backup/import/export entry point with pending-only facts',()=>fixture(dir=>{
 const database=source(dir),stage=path.join(dir,'stage.sqlite'),request=path.join(dir,'jvmg.json'),grant=path.join(dir,'grant.json'),roster=path.join(dir,'maintainers.json');
 const code="import sqlite3,sys;d=sqlite3.connect(sys.argv[1]);d.executescript('CREATE TABLE graph(name TEXT,sha TEXT,complete INTEGER,stats TEXT);CREATE TABLE triple(graph TEXT,n INTEGER,s TEXT,p TEXT,o TEXT,kind TEXT,lang TEXT,datatype TEXT);CREATE INDEX subject_idx ON triple(s,p);CREATE INDEX predicate_idx ON triple(p,o);');d.execute('INSERT INTO graph VALUES(?,?,1,?)',('fixture','sha','{}'));d.executemany('INSERT INTO triple VALUES(?,?,?,?,?,?,?,?)',[('fixture',1,'http://mediagraph.link/acdb/character/1','http://mediagraph.link/acdb/ont/characterTag','http://mediagraph.link/acdb/charactertag/1','NamedNode','',''),('fixture',2,'http://mediagraph.link/acdb/charactertag/1','http://www.w3.org/2000/01/rdf-schema#label','mask','Literal','en','')]);d.commit();d.close()";
 const py=cp.spawnSync(process.env.ASCENT_PYTHON||(process.platform==='win32'?'python':'python3'),['-B','-c',code,stage],{encoding:'utf8'});assert.equal(py.status,0,py.stderr);
 fs.writeFileSync(request,JSON.stringify({stage,useDailyContent:true}));fs.writeFileSync(roster,JSON.stringify({reviewers:['Fictional Test Maintainer']}));fs.writeFileSync(grant,JSON.stringify({reviewer:'Fictional Test Maintainer',permissionReference:'synthetic fixture permission only',purpose:'private-research-admission',publicRedistribution:false,graphs:{fixture:'sha'}}));
 const p=packet(q({text:'Name an anime character who wears a mask.'})),options={database,output:path.join(dir,'integrated'),publicDirectory:path.join(dir,'public'),sources:[{provider:'jvmg',input:request,manifest:{grant,maintainers:roster}}]};const r=D.apply(p,options);assert.equal(r.integrity,'ok');assert.equal(r.summary.pendingClaims,1);const snapshot=K.store('snapshot',database);assert.equal(snapshot.tables.identities.length,1);assert(snapshot.tables.observations.some(o=>o.status==='held'&&o.trait==='appearance.accessory'));assert.equal(P.read(path.join(dir,'public')).manifest.positiveAssertions,1);D.apply(p,options);assert.equal(K.store('snapshot',database).sha256,snapshot.sha256);
}));

test('daily JVMG preparation cannot overwrite a canonical identity updated before its transaction',()=>fixture(dir=>{
 const database=source(dir),prepared=path.join(dir,'source.ndjson'),identity=K.store('identities',database)[0];
 const row={providerId:'jvmg-acdb-character-1',identity,hold:null,facts:[]};fs.writeFileSync(prepared,JSON.stringify({provider:'jvmg-reviewed-pending',total:1,hash:'fictional-stale-canonical'})+'\n'+JSON.stringify(row)+'\n');
 const edit=cp.spawnSync(process.env.ASCENT_PYTHON||(process.platform==='win32'?'python':'python3'),['-B','-c',"import sqlite3,sys;d=sqlite3.connect(sys.argv[1]);d.execute(\"UPDATE identities SET body=json_set(body,'$.name','Updated Fixture'),name='Updated Fixture' WHERE id='mal-character-1'\");d.commit();d.close()",database],{encoding:'utf8'});assert.equal(edit.status,0,edit.stderr);const before=K.store('snapshot',database).sha256,output=path.join(dir,'operation');fs.mkdirSync(output);
 const p=packet(),resolved=D.reconcile(p,database);
 assert.throws(()=>D.python('apply',database,{packet:p,resolved,prepared:[prepared],output,publicTarget:path.join(dir,'public'),nodeExecutable:process.execPath}),/Canonical JVMG identity changed/);
 assert.equal(K.store('snapshot',database).sha256,before);assert(!fs.existsSync(path.join(output,'receipt.json')));
}));

test('daily CLI fails a missing configured store without silently bootstrapping or reporting success',()=>fixture(dir=>{
 const missing=path.join(dir,'missing.sqlite'),config=path.join(dir,'config.json'),file=path.join(dir,'packet.json'),output=path.join(dir,'operation');fs.writeFileSync(config,JSON.stringify({database:missing}));fs.writeFileSync(file,JSON.stringify(packet()));
 const r=cp.spawnSync(process.execPath,[path.resolve(__dirname,'../content/cli.js'),'integrate','--packet',file,'--config',config,'--output',output],{encoding:'utf8'});assert.notEqual(r.status,0);assert.match(r.stderr,/Existing private knowledge database required/);assert(!fs.existsSync(missing));assert(!fs.existsSync(path.join(output,'receipt.json')));
 assert.throws(()=>D.resolver(missing),/Existing private knowledge database required/);assert(!fs.existsSync(missing));
}));

'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process');
const python=process.env.ASCENT_PYTHON||(process.platform==='win32'?'python':'python3'),root=path.resolve(__dirname,'../private');
function fixture(fn){fs.mkdirSync(root,{recursive:true});const d=fs.mkdtempSync(path.join(root,'jvmg-test-'));try{fn(d);}finally{fs.rmSync(d,{recursive:true,force:true,maxRetries:3,retryDelay:50});}}
function tar(d,name,content){const f=path.join(d,'source.tar.gz');const p=cp.spawnSync(python,['-B','-c',"import tarfile,io,sys,json;x=json.load(sys.stdin);t=tarfile.open(sys.argv[1],'w:gz');b=x['content'].encode('utf-8');m=tarfile.TarInfo(x['name']);m.size=len(b);t.addfile(m,io.BytesIO(b));t.close()",f],{input:JSON.stringify({name,content}),encoding:'utf8'});assert.equal(p.status,0,p.stderr);return f;}
function stage(d,file,extra=[]){return cp.spawnSync(python,['-B',path.resolve(__dirname,'../jvmg/stage.py'),'--archive',file,'--output',path.join(d,'stage'),'--node',process.execPath,...extra],{encoding:'utf8',env:{...process.env,PYTHONIOENCODING:'utf-8:strict'},maxBuffer:4*1024*1024});}
test('streaming Turtle retains multilingual typed literals, IRIs and deterministic graph-scoped blanks',()=>{
 const ttl='@prefix x: <https://example.invalid/> . @prefix xs: <http://www.w3.org/2001/XMLSchema#> . x:a x:name "合成 Éloïse"@ja ; x:height "170.5"^^xs:decimal ; x:date "2000-01-02"^^xs:date ; x:link [ x:name "nested" ] .';
 const run=()=>cp.spawnSync(process.execPath,[path.resolve(__dirname,'../jvmg/parse.js'),'fixture_'],{input:ttl,encoding:'utf8'});const a=run(),b=run();assert.equal(a.status,0,a.stderr);assert.equal(a.stdout,b.stdout);const rows=a.stdout.trim().split('\n').map(JSON.parse);assert(rows.some(r=>r[2].language==='ja'&&r[2].value==='合成 Éloïse'));assert(rows.some(r=>r[2].datatype?.endsWith('#decimal')));assert(rows.some(r=>r[2].datatype?.endsWith('#date')));assert(rows.some(r=>r[0].type==='BlankNode'));
});
test('private RDF staging is idempotent, graph-checksummed and rights-held',()=>fixture(d=>{
 const file=tar(d,'./jvmg_dataset/acdb/test.ttl','<https://example.invalid/a> <https://example.invalid/p> "合成"@ja .');const a=stage(d,file);assert.equal(a.status,0,a.stderr);const first=JSON.parse(a.stdout);assert.equal(first.members[0].stats.triples,1);assert(first.sourceRights.includes('no game-use'));const b=stage(d,file);assert.equal(b.status,0,b.stderr);assert.equal(JSON.parse(b.stdout).members[0].status,'reused');assert.equal(JSON.parse(b.stdout).archiveSHA256,first.archiveSHA256);
}));
test('archive traversal is rejected and the separate NSFW graph never enters staging',()=>fixture(d=>{
 const bad=stage(d,tar(d,'../escape.ttl','<x:a> <x:p> <x:b> .'));assert.notEqual(bad.status,0);assert.match(bad.stderr,/Unsafe archive/);
}));
test('NSFW graph exclusion is explicit',()=>fixture(d=>{
 const r=stage(d,tar(d,'jvmg_dataset/vndb/final_vndb_nsfw.ttl','<x:a> <x:p> <x:b> .'));assert.equal(r.status,0,r.stderr);const row=JSON.parse(r.stdout).members[0];assert.equal(row.status,'not-staged');assert.equal(row.exclusion,'NSFW graph');
}));
test('malformed Turtle fails closed without marking its graph complete',()=>fixture(d=>{
 const r=stage(d,tar(d,'jvmg_dataset/acdb/test.ttl','<x:a> <x:p> "unfinished'));assert.notEqual(r.status,0);assert.match(r.stderr,/Malformed RDF/);const progress=JSON.parse(fs.readFileSync(path.join(d,'stage/progress.json'),'utf8'));assert(!progress.members.some(m=>m.status==='complete'));
}));

test('explicit malformed graph quarantine never presents partial triples as a completed source',()=>fixture(d=>{
 const r=stage(d,tar(d,'jvmg_dataset/acdb/test.ttl','<x:a> <x:p> "unfinished'),['--quarantine-malformed']);assert.equal(r.status,0,r.stderr);const progress=JSON.parse(r.stdout);assert.equal(progress.members[0].status,'quarantined');assert.equal(progress.quarantinedGraphs.length,1);
}));
test('tag inventory counts completed source associations while keeping game and public rights held',()=>fixture(d=>{
 const ttl='@prefix a: <http://mediagraph.link/acdb/ont/> . @prefix r: <http://www.w3.org/2000/01/rdf-schema#> . <http://mediagraph.link/acdb/charactertag/1> a a:CharacterTag ; r:label "sword"@en . <http://mediagraph.link/acdb/character/2> a:characterTag <http://mediagraph.link/acdb/charactertag/1> .';const r=stage(d,tar(d,'jvmg_dataset/acdb/test.ttl',ttl));assert.equal(r.status,0,r.stderr);
 const out=path.join(d,'inventory.json'),run=cp.spawnSync(python,['-B',path.resolve(__dirname,'../jvmg/report.py'),'--stage',path.join(d,'stage'),'--output',out],{encoding:'utf8'});assert.equal(run.status,0,run.stderr);const data=JSON.parse(fs.readFileSync(out));assert.equal(data.counts.ACDBDefinitions,1);assert.equal(data.tags[0].rawAssociationCount,1);assert.equal(data.tags[0].generationEligible,0);assert.equal(data.tags[0].publicExportEligible,0);
}));
test('Windows drive-rooted archive paths are rejected even when inspected on macOS or Linux',()=>fixture(d=>{
 const r=stage(d,tar(d,'C:/escape.ttl','<x:a> <x:p> <x:b> .'));assert.notEqual(r.status,0);assert.match(r.stderr,/Unsafe archive/);
}));

test('coverage keeps structured appearance matches separate from unresolved source-tag identities',()=>fixture(d=>{
 const ttl='@prefix a: <http://mediagraph.link/acdb/ont/> . @prefix r: <http://www.w3.org/2000/01/rdf-schema#> . <http://mediagraph.link/acdb/character/1> a:hairColor a:White . a:White r:label "White" .';const staged=stage(d,tar(d,'jvmg_dataset/acdb/test.ttl',ttl));assert.equal(staged.status,0,staged.stderr);
 const code="import sys,json,pathlib,sqlite3,gzip;sys.path.insert(0,sys.argv[1]);from coverage import coverage;d=pathlib.Path(sys.argv[2]);db=sqlite3.connect(d/'known.sqlite');db.execute('CREATE TABLE bindings(provider_id TEXT,character_id TEXT)');db.execute('INSERT INTO bindings VALUES(?,?)',('acdb-character-1','mal-character-1'));db.commit();db.close();(d/'inventory.json').write_text(json.dumps({'tags':[]}),encoding='utf8');f=gzip.open(d/'positive.gz','wt',encoding='utf8');f.close();print(json.dumps(coverage(d/'inventory.json',d/'known.sqlite',d/'positive.gz',None,d/'stage/staging.sqlite')))";
 const r=cp.spawnSync(python,['-B','-c',code,path.resolve(__dirname,'../jvmg'),d],{encoding:'utf8',env:{...process.env,PYTHONIOENCODING:'utf-8:strict'}});assert.equal(r.status,0,r.stderr);const row=JSON.parse(r.stdout).categories.find(x=>x.category==='white or silver hair');assert.equal(row.rawSourceCharactersWithMappedTags,0);assert.equal(row.rawStructuredAppearanceCharacters,1);assert.equal(row.matchedExistingCanonicalResearchCandidates,1);assert.equal(row.unresolvedSourceIdentities,0);assert.equal(row.newPermittedGenerationIdentities,0);
}));

'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),E=require('../enrichment/expand-wikidata');
// Synthetic identifiers only; no actual provider requests in tests.
test('expanded discovery is bounded, cursor ordered and excludes previous ID cohorts',()=>{const q=E.query({type:'class',id:'Q900000001'},'Q900000002');assert(q.includes('LIMIT 500'));assert(q.includes('ORDER BY STR(?item)'));assert(q.includes('FILTER NOT EXISTS { ?item wdt:P4085'));assert(q.includes('FILTER NOT EXISTS { ?item wdt:P7013'));assert(q.includes('Q900000002'));assert.throws(()=>E.query({type:'class',id:'bad query'},null),/Invalid/);});
test('work discovery uses explicit work links and character classification rather than genre inference',()=>{const q=E.query({type:'works',ids:['Q900000001','Q900000002']},null);assert(q.includes('P1441'));assert(q.includes('P1080'));assert(q.includes('Q95074'));assert(!q.includes('P136'));});
test('anime anchors use explicit anime types or documented names of known anime',()=>{const stmt=id=>({rank:'normal',mainsnak:{snaktype:'value',datavalue:{value:{id}}}});const seed={characterIds:['Q900000001'],entities:{Q900000001:{claims:{P1441:[stmt('Q900000002')]}},Q900000002:{labels:{en:{value:'Synthetic Show'}},claims:{P31:[stmt('Q900000003')]}},Q900000003:{labels:{en:{value:'anime television series'}}}}};const a=E.anchors(seed,{anime:[{name:'Synthetic Show',aliases:[]}]},{'wikidata-character-Q900000001':'mal-character-1'});assert.deepEqual(a.works,['Q900000002']);});
test('coverage counts active unique facts separately from generic facts, aliases and basic age',()=>{
 const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),cp=require('node:child_process'),dir=fs.mkdtempSync(path.join(os.tmpdir(),'coverage-audit-'));
 try{
  const file=path.join(dir,'test.sqlite'),python=`import sqlite3,json,sys
s=sqlite3.connect(sys.argv[1]);s.executescript('CREATE TABLE identities(id TEXT,body TEXT);CREATE TABLE observations(character_id TEXT,trait TEXT,value TEXT,body TEXT,provider_id TEXT,version INTEGER,status TEXT);CREATE TABLE current_fields(provider_id TEXT,version INTEGER,facet TEXT);')
s.execute('INSERT INTO identities VALUES(?,?)',('fixture',json.dumps({'name':'Fixture','appearances':[],'providerIds':['source']})))
for provider in ['a','b']:
 s.execute('INSERT INTO current_fields VALUES(?,?,?)',(provider,2,'facet'))
 for trait,value,version in [('profile.apparent_age','adult',2),('identity.gender','female',2),('identity.alias','Fixture alias',2),('occupation.role','doctor',1)]:
  fact={'sourceProvider':'ACDB','trustStatus':'source_trusted','facet':'facet'}
  s.execute('INSERT INTO observations VALUES(?,?,?,?,?,?,?)',('fixture',trait,json.dumps(value),json.dumps(fact),provider,version,'source_trusted'))
s.commit()`;
  let r=cp.spawnSync(process.env.ASCENT_PYTHON||(process.platform==='win32'?'python':'python3'),['-c',python,file],{encoding:'utf8'});assert.equal(r.status,0,r.stderr);
  r=cp.spawnSync(process.env.ASCENT_PYTHON||(process.platform==='win32'?'python':'python3'),['-B',path.resolve(__dirname,'../enrichment/coverage.py'),file,dir,'before'],{encoding:'utf8'});assert.equal(r.status,0,r.stderr);
  const m=JSON.parse(fs.readFileSync(path.join(dir,'before-metrics.json')));assert.equal(m.uniquePositiveTriples,3);assert.equal(m.genericGenderClassificationTriples,1);assert.equal(m.aliasTriples,1);assert.equal(m.profile,0);assert.equal(m.occupations,0);
  const row=JSON.parse(fs.readFileSync(path.join(dir,'before-coverage.ndjson'),'utf8').trim());assert.deepEqual(row.sourceTrustClasses,['source_trusted']);assert.deepEqual(row.sourceProviders,['ACDB']);assert.equal(row.absenceMeans,'UNKNOWN');
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});

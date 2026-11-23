'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),cp=require('node:child_process'),path=require('node:path');
test('complete private export restores history and rejects corruption, unsafe paths and overwrite',()=>{
 const result=cp.spawnSync(process.env.ASCENT_PYTHON||(process.platform==='win32'?'python':'python3'),['-B','-c',`
import sys,pathlib,tempfile,sqlite3,gzip,json,importlib.util,shutil
spec=importlib.util.spec_from_file_location('team_export',sys.argv[1]);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
root=pathlib.Path(tempfile.mkdtemp(prefix='ascent-export-test-'))
try:
 db=root/'source.sqlite';c=sqlite3.connect(db);c.execute('create table history (value text)');c.execute("insert into history values ('preserved')");c.execute('create table identities(id text,body text)');c.execute('insert into identities values (?,?)',('character-1',json.dumps({'id':'character-1','name':'Verified fixture'})))
 c.execute('create table current_fields(provider_id text,version integer,facet text)');c.execute("insert into current_fields values ('source-1',1,'hair')")
 c.execute('create table observations(character_id text,trait text,value text,body text,provider_id text,version integer,status text)')
 c.execute('insert into observations values (?,?,?,?,?,?,?)',('character-1','hair','red',json.dumps({'facet':'hair','characterId':'character-1','value':'red'}),'source-1',1,'source_trusted'))
 c.commit();c.close()
 folder=root/'export';folder.mkdir();archive=folder/'archive.sqlite.gz'
 with open(db,'rb') as s,gzip.open(archive,'wb') as out:shutil.copyfileobj(s,out)
 manifest={'files':{'archive.sqlite.gz':{'sha256':m.sha(archive)}},'archiveSQLiteSHA256':m.sha(db),'sourceCounts':{'history':1},'compactCounts':{},'transferStatus':'LOCAL_ONLY_RIGHTS_REVIEW_REQUIRED'}
 (folder/'manifest.json').write_text(json.dumps(manifest));digest=m.sha(folder/'manifest.json')
 assert m.restore(folder,digest,root/'restored')['integrity']=='ok'
 assert m.sha(root/'restored/knowledge.sqlite')==m.sha(db)
 receipt=root/'receipt.json';receipt.write_text(json.dumps({'compressedSHA256':m.sha(archive),'sqliteSHA256':m.sha(db),'counts':{'history':1,'identities':1,'observations':1}}))
 m.export(db,root/'export-one',archive,receipt);m.export(db,root/'export-two',archive,receipt)
 one=json.loads((root/'export-one/manifest.json').read_text());two=json.loads((root/'export-two/manifest.json').read_text())
 assert one['datasetVersion']==two['datasetVersion'] and one['uniquePositiveTriples']==1
 assert one['compactCounts']=={'identities':1,'active-positive':1,'active-held':0}
 for fn in [lambda:m.restore(folder,digest,root/'restored'),lambda:m.verify(folder,'0'*64),lambda:m.private(pathlib.Path(sys.argv[1]).resolve().parents[1]/'public.json')]:
  try:fn()
  except ValueError:pass
  else:raise AssertionError('Unsafe operation accepted')
 with open(archive,'ab') as f:f.write(b'corrupt')
 try:m.verify(folder,digest)
 except ValueError:pass
 else:raise AssertionError('Corruption accepted')
finally:shutil.rmtree(root)
`,path.resolve(__dirname,'../team-export.py')],{encoding:'utf8'});
 assert.equal(result.status,0,result.stderr||result.error?.message);
});

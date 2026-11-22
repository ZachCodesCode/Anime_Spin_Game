import pathlib,tempfile,shutil,sys
sys.path.insert(0,str(pathlib.Path(__file__).resolve().parents[2]))
from catalogue.acdb.stage import *
base=pathlib.Path(tempfile.mkdtemp(dir=PRIVATE))
try:
 files={}
 for table,fields in FIELDS.items():
  cols=sorted(fields);file=base/(table+'.sql');files[table]=file
  row={k:'0' for k in cols};row.update({'id':'1','cid':'1','pid':'1','romji':'Synthetic','english':'Fixture','mt':'2'})
  values=','.join("'"+row[k]+"'" for k in cols)
  file.write_text('CREATE TABLE `'+table+'` (\n'+''.join('  `'+k+'` text,\n' for k in cols)+') ENGINE=InnoDB;\nINSERT INTO `'+table+'` VALUES ('+values+'),('+values+');\n')
 db=connect(base/'test.sqlite');v,done=ingest(db,files,batch=1,stop_after=1);assert not done
 v2,done=ingest(db,files,batch=1);assert done and v==v2
 assert db.execute('select count(*) from records').fetchone()[0]==3
 assert ingest(db,files)[0]==v
 before=db.execute('select count(*) from records').fetchone()[0]
 files['characters'].write_text(files['characters'].read_text().replace('Synthetic','Changed'))
 v3,_=ingest(db,files);assert v3!=v
 assert db.execute('select count(*) from records').fetchone()[0]==before*2
 cat={'characters':[{'id':'c1','name':'Changed','aliases':[]}],'anime':[{'id':'a1','name':'Fixture','aliases':[]}],'appearances':[{'characterId':'c1','animeId':'a1'}]}
 output=export(db,v3,cat,{});assert output['records'][0]['matches']=={'c1':['a1']}
 cat['characters'].append({'id':'c2','name':'Changed','aliases':[]});cat['appearances'].append({'characterId':'c2','animeId':'a1'});assert len(export(db,v3,cat,{})['records'][0]['matches'])==2
 try:connect('/tmp/public-acdb.sqlite');raise AssertionError('private boundary bypass')
 except ValueError:pass
 # Non-anime title cannot pass the join, even with identical character/title names.
 with db:
  title=json.loads(db.execute("select data from records where version=? and table_name='publishers'",(v3,)).fetchone()[0]);title['mt']='3'
  db.execute("update records set data=? where version=? and table_name='publishers'",(json.dumps(title),v3))
 assert not export(db,v3,cat,{})['records'][0]['matches']
 # Invalid schema and incomplete statements fail closed in normal mode.
 bad=base/'bad.sql';bad.write_text("CREATE TABLE `characters` (\n  `id` int,\n) ENGINE=InnoDB;\n")
 try:list(rows(bad,'characters'));raise AssertionError('bad schema accepted')
 except ValueError:pass
 assert list(tuples("(1,'it''s')"))==[['1',"it's"]]
 db.close()
finally:shutil.rmtree(base)

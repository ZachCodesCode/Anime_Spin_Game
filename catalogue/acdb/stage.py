"""Private ACDB staging. Never execute source SQL. Python standard library only."""
import argparse, contextlib, gzip, hashlib, json, pathlib, re, sqlite3, time, unicodedata
ROOT=pathlib.Path(__file__).resolve().parents[2]
PRIVATE=ROOT/'catalogue/private'
FIELDS={'characters':{'id','romji','japanese','chinese','furigana','publisher','hair_color','eye_color','hair_length','age','sex','mimikko','clone','clonetype','otherchar','date_modified'},'publishers':{'id','english','japanese','date','mt'},'assignments':{'cid','pid'}}
def digest(file):
 h=hashlib.sha256()
 with open(file,'rb') as f:
  for b in iter(lambda:f.read(1024*1024),b''):h.update(b)
 return h.hexdigest()
def norm(s):return ' '.join(sorted(re.findall(r'[^\W_]+',unicodedata.normalize('NFKC',s).lower())))
def tuples(text):
 row=[];value='';quoted=False;escape=False;active=False
 i=0
 while i<len(text):
  c=text[i];i+=1
  if escape:value+= {'n':'\n','r':'\r','t':'\t','0':'\0'}.get(c,c);escape=False;continue
  if quoted and c=='\\':escape=True;continue
  if c=="'":
   if quoted and i<len(text) and text[i]=="'":value+="'";i+=1;continue
   quoted=not quoted;continue
  if not quoted and c=='(':
   if active:raise ValueError('Nested SQL value')
   active=True;row=[];value='';continue
  if active and not quoted and c in ',)':
   row.append(None if value=='NULL' else value);value=''
   if c==')':yield row;active=False
   continue
  if active:value+=c
 if quoted or active:raise ValueError('Incomplete SQL tuple')
def rows(file,table,partial=False):
 opener=gzip.open if str(file).endswith('.gz') else open
 columns=[];schema=False;validated=False
 try:
  with opener(file,'rt',encoding='utf8',errors='strict') as f:
   for line in f:
    if line.startswith('CREATE TABLE '):
     if not line.startswith('CREATE TABLE `'+table+'` ('):raise ValueError('Unexpected table')
     schema=True;continue
    if schema:
     m=re.match(r'  `([^`]+)`',line)
     if m:columns.append(m[1])
     if line.startswith(') ENGINE'):
      if not FIELDS[table]<=set(columns) or len(columns)!=len(set(columns)):raise ValueError('Required schema fields absent')
      schema=False;validated=True
    if line.startswith('INSERT INTO '):
     prefix='INSERT INTO `'+table+'` VALUES '
     if not validated or not line.startswith(prefix):raise ValueError('Unexpected INSERT schema')
     if not line.rstrip().endswith(';'):
      if partial:continue
      raise ValueError('Incomplete SQL statement')
     for row in tuples(line[len(prefix):].rstrip()[:-1]):
      if len(row)!=len(columns):raise ValueError('Row arity mismatch')
      record={k:v for k,v in zip(columns,row) if k in FIELDS[table]}
      for k in FIELDS[table]-{'romji','japanese','chinese','furigana','english','date'}:
       if record[k] is not None and not re.fullmatch(r'-?\d+',record[k]):raise ValueError('Invalid numeric field '+k)
      yield record
 except EOFError:
  if not partial:raise
 if not validated:raise ValueError('Missing validated schema')
def connect(file):
 file=pathlib.Path(file).resolve()
 if PRIVATE.resolve() not in file.parents:raise ValueError('Staging must stay under catalogue/private')
 file.parent.mkdir(parents=True,exist_ok=True)
 db=sqlite3.connect(file);db.execute('PRAGMA journal_mode=WAL');db.execute('PRAGMA synchronous=FULL')
 db.executescript('''CREATE TABLE IF NOT EXISTS versions(id TEXT PRIMARY KEY, manifest TEXT NOT NULL);
 CREATE TABLE IF NOT EXISTS checkpoints(version TEXT, table_name TEXT, ordinal INTEGER, complete INTEGER, PRIMARY KEY(version,table_name));
 CREATE TABLE IF NOT EXISTS records(version TEXT, table_name TEXT, id TEXT, name_key TEXT, data TEXT, PRIMARY KEY(version,table_name,id));
 CREATE INDEX IF NOT EXISTS name_lookup ON records(version,table_name,name_key);
 CREATE TABLE IF NOT EXISTS conflicts(version TEXT,table_name TEXT,id TEXT,incoming TEXT,PRIMARY KEY(version,table_name,id,incoming));''');return db

def ingest(db,files,partial=False,batch=500,stop_after=None):
 if batch<1:raise ValueError('Positive batch size required')
 manifest={'files':{k:digest(v) for k,v in sorted(files.items())},'partial':partial,'parser':1,'source':'https://www.animecharactersdatabase.com/databasedumps.php','license':'ODbL-1.0 + DbCL-1.0'}
 version=hashlib.sha256(json.dumps(manifest,sort_keys=True).encode()).hexdigest();manifest['importedAt']=time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime());db.execute('INSERT OR IGNORE INTO versions VALUES (?,?)',(version,json.dumps(manifest)));db.commit();commits=0
 for table,file in files.items():
  checkpoint=db.execute('SELECT ordinal,complete FROM checkpoints WHERE version=? AND table_name=?',(version,table)).fetchone()
  if checkpoint and checkpoint[1]:continue
  done=checkpoint[0] if checkpoint else 0;pending=[];ordinal=0
  def flush(complete=False):
   nonlocal commits
   with db:
    for row in pending:
     key=row['cid']+'/'+row['pid'] if table=='assignments' else row['id'];data=json.dumps(row,sort_keys=True,ensure_ascii=False)
     old=db.execute('SELECT data FROM records WHERE version=? AND table_name=? AND id=?',(version,table,key)).fetchone()
     if old and old[0]!=data:db.execute('INSERT OR IGNORE INTO conflicts VALUES (?,?,?,?)',(version,table,key,data));continue
     db.execute('INSERT OR IGNORE INTO records VALUES (?,?,?,?,?)',(version,table,key,norm(row.get('romji',row.get('english',''))),data))
    db.execute('INSERT OR REPLACE INTO checkpoints VALUES (?,?,?,?)',(version,table,ordinal,int(complete)))
   pending.clear();commits+=1
  for ordinal,row in enumerate(rows(file,table,partial),1):
   if ordinal<=done:continue
   pending.append(row)
   if len(pending)>=batch:
    flush()
    if stop_after and commits>=stop_after:return version,False
  flush(True)
 return version,True

def export(db,version,catalogue,mappings):
 if db.execute('SELECT count(*) FROM checkpoints WHERE version=? AND complete=1',(version,)).fetchone()[0]!=3:raise ValueError('All three imports must complete')
 get=lambda table:[json.loads(x[0]) for x in db.execute('SELECT data FROM records WHERE version=? AND table_name=? ORDER BY id',(version,table))]
 titles={t['id']:t for t in get('publishers')};links={}
 for x in get('assignments'):links.setdefault(x['cid'],set()).add(x['pid'])
 anime={a['id']:a for a in catalogue['anime']};apps={};idx={}
 for a in catalogue['appearances']:apps.setdefault(a['characterId'],set()).add(a['animeId'])
 for c in catalogue['characters']:
  for name in [c['name']]+c['aliases']:idx.setdefault(norm(name),{})[c['id']]=c
 anime_names={i:{norm(n) for n in [a['name']]+a['aliases']} for i,a in anime.items()}
 conflicts={(t,i) for t,i in db.execute('SELECT table_name,id FROM conflicts WHERE version=?',(version,))};out=[]
 for row in get('characters'):
  ts=[titles[i] for i in links.get(row['id'],set())|{row['publisher']} if i in titles];matches={};warnings=[]
  if any(t['mt']!='2' for t in ts):warnings.append('non-anime or umbrella assignments coexist')
  if any(row[k] not in ['0',None] for k in ['clone','clonetype','otherchar']):warnings.append('alternate form/clone linkage unresolved')
  for cid,c in idx.get(norm(row['romji']),{}).items():
   aids=[aid for aid in apps.get(cid,[]) if any(t['mt']=='2' and norm(t['english']) in anime_names[aid] for t in ts)]
   if aids:matches[cid]=sorted(aids)
  if len(matches)>1:warnings.append('ambiguous character identity')
  if any(len(a)>1 for a in matches.values()):warnings.append('multiple anime adaptations')
  if ('characters',row['id']) in conflicts or any(('publishers',t['id']) in conflicts for t in ts):warnings.append('conflicting source ID');matches={}
  decoded={f:{'code':row[f],'label':mappings.get(f,{}).get(row[f]),'known':row[f] in mappings.get(f,{})} for f in ['hair_color','eye_color','hair_length','age','sex','mimikko']}
  out.append({'acdbId':row['id'],'name':row['romji'],'matches':matches,'warnings':warnings,'attributes':decoded,'titles':ts,'sourceUrl':'https://www.animecharactersdatabase.com/characters.php?id='+row['id'],'nameOnlyCandidates':sorted(idx.get(norm(row['romji']),{})),'sourceModified':row['date_modified']})
 return {'version':version,'sourceManifest':json.loads(db.execute('SELECT manifest FROM versions WHERE id=?',(version,)).fetchone()[0]),'mappingHash':hashlib.sha256(json.dumps(mappings,sort_keys=True).encode()).hexdigest(),'catalogueHash':hashlib.sha256(json.dumps(catalogue,sort_keys=True).encode()).hexdigest(),'records':out,'notPublishable':True}

def main():
 a=argparse.ArgumentParser();a.add_argument('--catalogue',required=True);a.add_argument('--database',required=True);a.add_argument('--characters',required=True);a.add_argument('--publishers',required=True);a.add_argument('--assignments',required=True);a.add_argument('--mappings',required=True);a.add_argument('--allow-partial',action='store_true');a.add_argument('--batch',type=int,default=500);a.add_argument('--stop-after',type=int);args=a.parse_args();start=time.perf_counter()
 db=connect(args.database);v,complete=ingest(db,{k:getattr(args,k) for k in FIELDS},args.allow_partial,args.batch,args.stop_after)
 if complete:
  result=export(db,v,json.loads(pathlib.Path(args.catalogue).read_text()),json.loads(pathlib.Path(args.mappings).read_text()));target=pathlib.Path(args.database).parent/(v+'.json');tmp=target.with_suffix('.tmp');tmp.write_text(json.dumps(result,ensure_ascii=False));tmp.replace(target)
  print(json.dumps({'version':v,'records':len(result['records']),'output':str(target),'seconds':time.perf_counter()-start}))
 else:print(json.dumps({'version':v,'complete':False,'seconds':time.perf_counter()-start}))
if __name__=='__main__':main()

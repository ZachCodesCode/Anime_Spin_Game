"""Private, bounded and resumable RDF staging. Never grants game-use or export rights."""
import argparse,hashlib,json,os,pathlib,re,sqlite3,subprocess,tarfile,threading,shutil,sys
os.umask(0o077)
ROOT=pathlib.Path(__file__).resolve().parents[2]
def sha(file):
 h=hashlib.sha256()
 with open(file,'rb') as f:
  for b in iter(lambda:f.read(1048576),b''):h.update(b)
 return h.hexdigest()
def safe(member):
 p=pathlib.PurePosixPath(member.name)
 if member.name.startswith('/') or re.match(r'^[A-Za-z]:',member.name) or '..' in p.parts or '\\' in member.name or member.issym() or member.islnk() or not member.isfile() or p.suffix!='.ttl':raise ValueError('Unsafe archive member: '+member.name)
 return str(p)
def private(path):
 path=pathlib.Path(path).resolve();root=(ROOT/'catalogue/private').resolve()
 if root not in path.parents:raise ValueError('JVMG staging must stay in catalogue/private')
 return path
def selected(name):
 return '/acdb/' in name or '/jvmg/' in name or '/cluster/' in name or '/madb/metadata_an-' in name or bool(re.search(r'/madb/metadata(?:201|202|205|207|208|209|210|213(?:-2)?|216)\.ttl$',name)) or name.endswith(('/aclick/related.ttl','/aclick/episodes.ttl')) or any(name.endswith('/'+x) for x in ['vndb/final_vndb.ttl','cluster/anime_clusters.ttl','cluster/charactertowork.ttl','aclick/character.ttl','aclick/anime.ttl','aclick/staff.ttl','aclick/author.ttl','anidb/anidb_titles.ttl'])
def stage(archive,output,node='node',only=None,quarantine=False):
 archive=pathlib.Path(archive).resolve();output=private(output);output.mkdir(parents=True,exist_ok=True)
 lock=output/'stage.lock';fd=os.open(lock,os.O_WRONLY|os.O_CREAT|os.O_EXCL,0o600)
 db=None
 try:
  archive_hash=sha(archive);progress=output/'progress.json'
  if progress.exists() and json.loads(progress.read_text(encoding='utf8'))['archiveSHA256']!=archive_hash:raise ValueError('Archive changed: use new staging directory')
  db=sqlite3.connect(output/'staging.sqlite',timeout=60);db.execute('PRAGMA journal_mode=WAL');db.execute('PRAGMA synchronous=FULL');db.execute('PRAGMA cache_size=-131072');db.executescript('CREATE TABLE IF NOT EXISTS graph(name TEXT PRIMARY KEY,sha TEXT,bytes INTEGER,complete INTEGER,triples INTEGER,stats TEXT); CREATE TABLE IF NOT EXISTS triple(graph TEXT,n INTEGER,s TEXT,p TEXT,o TEXT,kind TEXT,lang TEXT,datatype TEXT,PRIMARY KEY(graph,n)); CREATE INDEX IF NOT EXISTS subject_idx ON triple(s,p); CREATE INDEX IF NOT EXISTS predicate_idx ON triple(p,o);')
  manifest={'archiveSHA256':archive_hash,'archiveBytes':archive.stat().st_size,'status':'running','sourceRights':'per-graph unresolved or restricted; no game-use/export authorization','members':[]}
  def save():
   tmp=progress.with_suffix('.tmp');tmp.write_text(json.dumps(manifest,indent=2)+'\n',encoding='utf8');os.replace(tmp,progress)
  save();names=set()
  with tarfile.open(archive,'r|gz') as tar:
   for m in tar:
    name=safe(m)
    if name in names:raise ValueError('Duplicate archive path')
    names.add(name);stream=tar.extractfile(m);h=hashlib.sha256();old=db.execute('SELECT sha,complete,triples,stats FROM graph WHERE name=?',(name,)).fetchone();do_parse=selected(name) and (not only or any(x in name for x in only)) and 'nsfw' not in name.lower();entry={'name':name,'bytes':m.size,'selected':do_parse,'exclusion':'NSFW graph' if 'nsfw' in name.lower() else None}
    if not do_parse or old and (old[1]==1 or old[1]==-1 and quarantine):
     for b in iter(lambda:stream.read(1048576),b''):h.update(b)
     if old and old[1] and old[0]!=h.hexdigest():raise ValueError('Completed graph hash changed')
     entry.update(sha256=h.hexdigest(),status=('quarantined' if old and old[1]==-1 else 'reused') if old and old[1] else 'not-staged')
     manifest['members'].append(entry);save();continue
    print('Parsing '+name,file=sys.stderr,flush=True)
    if shutil.disk_usage(output).free<2*1024**3:raise ValueError('Less than 2 GiB free; stop safely before next graph')
    prefix='g'+hashlib.sha256(name.encode()).hexdigest()[:16]+'_';proc=subprocess.Popen([node,str(ROOT/'catalogue/jvmg/parse.js'),prefix],stdin=subprocess.PIPE,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
    errors=[]
    def feed():
     try:
      for b in iter(lambda:stream.read(1048576),b''):h.update(b);proc.stdin.write(b)
     except Exception as e:errors.append(str(e))
     finally:proc.stdin.close()
    worker=threading.Thread(target=feed);worker.start();n=0;batch=[];types={};predicates={};licenses=[];subjects=set();resume=old[2] if old and not old[1] else 0
    try:
     for line in proc.stdout:
      s,p,o,g=json.loads(line);n+=1;predicates[p['value']]=predicates.get(p['value'],0)+1
      if p['value'].endswith('#type'):types.setdefault(o['value'],set()).add(s['value'])
      if any(x in p['value'].lower() for x in ['license','rights','attribution']):licenses.append({'subject':s,'predicate':p,'object':o})
      if n<=resume:continue
      # No long biographies copied. Original RDF remains in the owner's archive.
      value=o['value'];kind=o['type']
      if kind=='Literal' and len(value)>500:value='sha256:'+hashlib.sha256(value.encode()).hexdigest();kind='WithheldLongLiteral'
      batch.append((name,n,s['value'],p['value'],value,kind,o.get('language',''),o.get('datatype','')))
      if len(batch)>=1000:
       with db:
        db.executemany('INSERT OR IGNORE INTO triple VALUES(?,?,?,?,?,?,?,?)',batch);db.execute('INSERT OR REPLACE INTO graph VALUES(?,?,?,0,?,?)',(name,None,m.size,n,'{}'))
       batch=[]
       if shutil.disk_usage(output).free<2*1024**3:raise ValueError('Staging stopped at disk safety floor; resumable checkpoint retained')
     worker.join();stderr=proc.stderr.read().decode('utf8');rc=proc.wait()
     if rc or errors:
      if not quarantine:raise ValueError('Malformed RDF or stream failure: '+stderr+' '.join(errors))
      for b in iter(lambda:stream.read(1048576),b''):h.update(b)
      error='Malformed RDF or stream failure: '+stderr+' '.join(errors)
      with db:db.execute('INSERT OR REPLACE INTO graph VALUES(?,?,?,-1,?,?)',(name,h.hexdigest(),m.size,n,json.dumps({'error':error,'validity':'entire graph quarantined; partial rows excluded'})))
      entry.update(sha256=h.hexdigest(),status='quarantined',error=error);manifest['members'].append(entry);save();continue
     stats={'triples':n,'types':{k:len(v) for k,v in types.items()},'predicates':predicates,'licenses':licenses}
     with db:
      db.executemany('INSERT OR IGNORE INTO triple VALUES(?,?,?,?,?,?,?,?)',batch);db.execute('INSERT OR REPLACE INTO graph VALUES(?,?,?,1,?,?)',(name,h.hexdigest(),m.size,n,json.dumps(stats)))
     entry.update(sha256=h.hexdigest(),status='complete',stats=stats);manifest['members'].append(entry);save()
    finally:
     if proc.poll() is None:proc.terminate()
     worker.join();proc.wait();proc.stdout.close();proc.stderr.close()
  manifest['status']='complete-for-selected-graphs';manifest['quarantinedGraphs']=[r[0] for r in db.execute('SELECT name FROM graph WHERE complete=-1')];states=dict(db.execute('SELECT name,complete FROM graph'));required=[m['name'] for m in manifest['members'] if selected(m['name']) and 'nsfw' not in m['name'].lower()];manifest['defaultScopeIncomplete']=[n for n in required if states.get(n) not in [1,-1]];manifest['completedGraphCount']=sum(v==1 for v in states.values());manifest['memberCount']=len(names);manifest['uncompressedBytes']=sum(x['bytes'] for x in manifest['members']);save();return manifest
 except BaseException as error:
  if 'manifest' in locals():
   manifest['status']='interrupted' if isinstance(error,KeyboardInterrupt) else 'failed'
   manifest['error']=str(error);manifest['resumeRequired']=True
   save()
  raise
 finally:
  if db is not None:db.close()
  os.close(fd);lock.unlink()
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--archive',required=True);p.add_argument('--output',required=True);p.add_argument('--node',default='node');p.add_argument('--only',action='append');p.add_argument('--quarantine-malformed',action='store_true');a=p.parse_args()
 try:print(json.dumps(stage(a.archive,a.output,a.node,a.only,a.quarantine_malformed),indent=2))
 except Exception as e:print(str(e),file=sys.stderr);sys.exit(1)

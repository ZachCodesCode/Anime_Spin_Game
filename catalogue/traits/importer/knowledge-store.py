"""Indexed extension of the private import ledger. No network or production access."""
import sys,json,sqlite3,hashlib,pathlib,os,gzip,tarfile,tempfile,shutil,io
os.umask(0o077)
def dump(x):return json.dumps(x,ensure_ascii=False,separators=(',',':'),sort_keys=True)
def digest(x):return hashlib.sha256(dump(x).encode()).hexdigest()
SCHEMA='''
CREATE TABLE IF NOT EXISTS meta(key TEXT PRIMARY KEY,value TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS legacy(hash TEXT PRIMARY KEY,body TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS jobs(id TEXT PRIMARY KEY,total INTEGER NOT NULL,processed INTEGER NOT NULL,header TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS identities(id TEXT PRIMARY KEY,name TEXT NOT NULL,body TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS bindings(provider_id TEXT PRIMARY KEY,character_id TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS versions(id INTEGER PRIMARY KEY AUTOINCREMENT,hash TEXT UNIQUE NOT NULL,header TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS records(version INTEGER NOT NULL,provider_id TEXT NOT NULL,character_id TEXT,hold TEXT,body TEXT NOT NULL,PRIMARY KEY(version,provider_id));
CREATE TABLE IF NOT EXISTS current_records(provider_id TEXT PRIMARY KEY,version INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS current_fields(provider_id TEXT NOT NULL,facet TEXT NOT NULL,version INTEGER NOT NULL,PRIMARY KEY(provider_id,facet));
CREATE TABLE IF NOT EXISTS observations(id TEXT PRIMARY KEY,version INTEGER NOT NULL,provider_id TEXT NOT NULL,character_id TEXT,trait TEXT NOT NULL,value TEXT NOT NULL,status TEXT NOT NULL,body TEXT NOT NULL);
CREATE INDEX IF NOT EXISTS trait_lookup ON observations(trait,value,status,character_id);
CREATE INDEX IF NOT EXISTS character_lookup ON observations(character_id,version);
CREATE INDEX IF NOT EXISTS observation_provider ON observations(provider_id,version,status);
CREATE TABLE IF NOT EXISTS conflicts(id TEXT PRIMARY KEY,body TEXT NOT NULL);
'''
def connect(file,readonly=False):
 p=pathlib.Path(file)
 if readonly:
  db=sqlite3.connect('file:'+str(p)+'?mode=ro',uri=True,timeout=30);db.row_factory=sqlite3.Row;db.execute('PRAGMA cache_size=-65536');db.execute('PRAGMA trusted_schema=OFF');return db
 p.parent.mkdir(parents=True,exist_ok=True,mode=0o700)
 db=sqlite3.connect(p,timeout=30);db.row_factory=sqlite3.Row;db.execute('PRAGMA journal_mode=WAL');db.execute('PRAGMA synchronous=FULL');db.execute('PRAGMA cache_size=-65536');db.executescript(SCHEMA);db.execute("INSERT OR IGNORE INTO meta VALUES('format','anime-ascent-knowledge-v1')");db.commit();return db

def ingest(db,file,batch=500,stop=None):
 if batch<1 or batch>5000 or stop is not None and stop<1:raise ValueError('Invalid batch or stop count')
 with open(file) as f:
  header=json.loads(next(f));job=header['hash'];prepared_hash=filehash(file);old_hash=db.execute('SELECT value FROM meta WHERE key=?',('prepared:'+job,)).fetchone()
  if old_hash and old_hash[0]!=prepared_hash:raise ValueError('Immutable prepared input changed')
  with db:db.execute('INSERT OR IGNORE INTO meta VALUES(?,?)',('prepared:'+job,prepared_hash))
  prior=db.execute('SELECT * FROM jobs WHERE id=?',(job,)).fetchone()
  if prior and json.loads(prior['header'])!=header:raise ValueError('Source job collision')
  if prior and prior['processed']==prior['total']:return {'complete':True,'processed':prior['processed'],'total':prior['total'],'addedObservations':0,'duplicateObservationsAvoided':db.execute('SELECT count(*) FROM observations o JOIN versions v ON v.id=o.version WHERE v.hash=?',(job,)).fetchone()[0]}
  with db:
   db.execute('INSERT OR IGNORE INTO versions(hash,header) VALUES(?,?)',(job,dump(header)))
   version=db.execute('SELECT id FROM versions WHERE hash=?',(job,)).fetchone()[0]
   db.execute('INSERT OR IGNORE INTO jobs VALUES(?,?,0,?)',(job,header['total'],dump(header)))
  done=prior['processed'] if prior else 0;added=0;batches=0;pending=[]
  def flush(offset):
   nonlocal added
   with db:
    for row in pending:
     provider_id=row['providerId'];identity=row.get('identity');hold=row.get('hold')
     old=db.execute('SELECT character_id FROM bindings WHERE provider_id=?',(provider_id,)).fetchone()
     if old and identity and old[0]!=identity['id']:hold='Persistent provider identity collision';identity=None
     if hold:
      if provider_id.startswith('wikidata-character-'):
       db.execute('UPDATE current_fields SET version=max(version,?) WHERE provider_id=?',(version,provider_id))
       if old:
        prior_identity=db.execute('SELECT body FROM identities WHERE id=?',(old[0],)).fetchone()
        if prior_identity:
         current=json.loads(prior_identity[0]);current['providerIds']=[p for p in current.get('providerIds',[]) if p!=provider_id];db.execute('UPDATE identities SET body=? WHERE id=?',(dump(current),old[0]))
        # Prior source-record versions preserve the rejected crosswalk; never leave it active.
        db.execute('DELETE FROM bindings WHERE provider_id=?',(provider_id,))
      conflict={'providerId':provider_id,'hold':hold,'version':job};db.execute('INSERT OR IGNORE INTO conflicts VALUES(?,?)',(digest(conflict),dump(conflict)))
     if identity:
      old_identity=db.execute('SELECT body FROM identities WHERE id=?',(identity['id'],)).fetchone()
      if old_identity and json.loads(old_identity[0]).get('canonicalId')!=identity.get('canonicalId'):raise ValueError('Canonical identity collision')
      prior_version=db.execute('SELECT version FROM current_records WHERE provider_id=?',(provider_id,)).fetchone()
      if not prior_version or version>=prior_version[0]:db.execute('INSERT INTO identities VALUES(?,?,?) ON CONFLICT(id) DO UPDATE SET name=excluded.name,body=excluded.body',(identity['id'],identity['name'],dump(identity)))
      db.execute('INSERT OR IGNORE INTO bindings VALUES(?,?)',(provider_id,identity['id']))
     character=identity['id'] if identity else None
     body={**{k:v for k,v in row.items() if k!='facts' or hold},'hold':hold,'identity':identity}
     old_record=db.execute('SELECT body FROM records WHERE version=? AND provider_id=?',(version,provider_id)).fetchone()
     if old_record and old_record[0]!=dump(body):
      conflict={'providerId':provider_id,'hold':'Within-version source ID collision','version':job};db.execute('INSERT OR IGNORE INTO conflicts VALUES(?,?)',(digest(conflict),dump(conflict)))
      db.execute("UPDATE observations SET status='held',body=json_set(body,'$.trustStatus','held','$.hold','Within-version source ID collision') WHERE version=? AND provider_id=?",(version,provider_id));db.execute("UPDATE records SET hold='Within-version source ID collision' WHERE version=? AND provider_id=?",(version,provider_id));continue
     db.execute('INSERT OR IGNORE INTO records VALUES(?,?,?,?,?)',(version,provider_id,character,hold,dump(body)))
     db.execute('INSERT INTO current_records VALUES(?,?) ON CONFLICT(provider_id) DO UPDATE SET version=max(version,excluded.version)',(provider_id,version))
     facets=set(row.get('presentGroups',[]))
     for fact in row['facts'] if not hold else []:
      facet='tags' if fact.get('sourceType')=='tag' else ('field|'+str(fact.get('rawField')) if fact['traitId'].startswith('source.unmapped') else 'trait|'+fact['traitId'])
      facets.add(facet)
      status='held' if hold or fact.get('hold') else fact['trustStatus'];obs={**fact,'facet':facet,'characterId':character,'providerId':provider_id,'sourceVersion':job,'trustStatus':status,'publicationAuthorized':False}
      key=digest([job,provider_id,fact]);before=db.total_changes
      db.execute('INSERT OR IGNORE INTO observations VALUES(?,?,?,?,?,?,?,?)',(key,version,provider_id,character,fact['traitId'],dump(fact['value']),status,dump(obs)));added+=db.total_changes-before
     for facet in facets:db.execute('INSERT INTO current_fields VALUES(?,?,?) ON CONFLICT(provider_id,facet) DO UPDATE SET version=max(version,excluded.version)',(provider_id,facet,version))
    db.execute('UPDATE jobs SET processed=? WHERE id=?',(offset,job))
  offset=0
  for offset,line in enumerate(f,1):
   if offset<=done:continue
   pending.append(json.loads(line))
   if len(pending)>=batch:
    flush(offset);pending=[];batches+=1
    if stop and batches>=stop:return {'complete':offset==header['total'],'processed':offset,'total':header['total'],'addedObservations':added}
  if pending:flush(offset)
  if offset!=header['total']:raise ValueError('Prepared source record count mismatch')
  return {'complete':True,'processed':offset,'total':header['total'],'addedObservations':added}

def active(db):return ''' FROM observations o JOIN current_fields c ON c.provider_id=o.provider_id AND c.version=o.version AND c.facet=json_extract(o.body,'$.facet') JOIN identities i ON i.id=o.character_id WHERE o.status IN ('source_trusted','wikidata_source_trusted') '''
def metrics(db):
 # One sequential current-observation pass avoids repeated multi-gigabyte scans and
 # GROUP BY plans that walk a non-covering trait index in random table order.
 count=lambda sql:db.execute(sql).fetchone()[0]
 characters=set();providers=set();claims=set();values=set();tags=set();by_trait={}
 observations=profile_facts=tag_assignments=unsupported_tags=description_claims=relationships=0
 sql="SELECT o.status,o.body FROM observations o NOT INDEXED JOIN current_fields c ON c.provider_id=o.provider_id AND c.version=o.version AND c.facet=json_extract(o.body,'$.facet')"
 for row in db.execute(sql):
  f=json.loads(row[1])
  if f.get('sourceType')=='tag':tag_assignments+=1;tags.add(f.get('sourceTagId') or f.get('rawLabel'));unsupported_tags+=int(f['traitId']=='source.tag')
  description_claims+=int(bool(f.get('descriptionDerived')));relationships+=int(bool(f.get('relationship')))
  if row[0] not in ['source_trusted','wikidata_source_trusted']:continue
  observations+=1;characters.add(f['characterId']);providers.add(f['providerId']);by_trait[f['traitId']]=by_trait.get(f['traitId'],0)+1
  values.add((f['traitId'],dump(f['value'])));claims.add((f['characterId'],f['traitId'],dump(f['value']),digest(f.get('context'))));profile_facts+=int(f.get('sourceType')=='profile')
 skipped=0;hold_reasons={}
 for row in db.execute('SELECT r.provider_id,r.hold FROM records r JOIN current_records c ON c.provider_id=r.provider_id AND c.version=r.version'):
  if row[1] is None:skipped+=int(row[0] not in providers)
  else:hold_reasons[row[1]]=hold_reasons.get(row[1],0)+1
 return {'format':'anime-ascent-knowledge-v1','integrity':db.execute('PRAGMA quick_check').fetchone()[0],
 'sourceRecords':count('SELECT count(*) FROM current_records'),'inspectedRecordsAcrossVersions':count('SELECT count(*) FROM records'),
 'completedImports':count('SELECT count(*) FROM jobs WHERE processed=total'),'incompleteImports':count('SELECT count(*) FROM jobs WHERE processed<total'),
 'existingIdentitiesMatched':count("SELECT count(*) FROM identities WHERE json_extract(body,'$.canonicalId') IS NOT NULL"),
 'newProviderIdentities':count("SELECT count(*) FROM identities WHERE json_extract(body,'$.canonicalId') IS NULL"),
 'charactersSearchableByTrait':len(characters),'sourceTrustedObservations':observations,'sourceTrustedClaims':len(claims),'distinctTraitDefinitionsUsed':len(by_trait),
 'distinctTraitValues':len(values),'recordsWithApplicableTraits':len(providers),'skippedMissingTraits':skipped,'heldRecords':sum(hold_reasons.values()),'holdReasons':hold_reasons,
 'uniqueSourceTags':len(tags),'tagAssignments':tag_assignments,'unsupportedTags':unsupported_tags,'structuredProfileFacts':profile_facts,
 'descriptionDerivedClaims':description_claims,'relationshipLinks':relationships,'legacySnapshots':count('SELECT count(*) FROM legacy'),
 'conflicts':count('SELECT count(*) FROM conflicts'),'byTrait':by_trait}

def time_bounds(raw):
 # Wikidata uses signed, potentially extended years; 00 month/day means unknown.
 import re
 m=re.fullmatch(r'([+-]?)([0-9]+)-([0-9]{2})-([0-9]{2})T.*',str(raw))
 if not m:return None
 year=int(m[2])*(-1 if m[1]=='-' else 1);month=int(m[3]);day=int(m[4])
 return ((year,month or 1,day or 1),(year,month or 12,day or 31))
def period(context):
 t=context.get('temporal',{});start=time_bounds(t.get('start'));end=time_bounds(t.get('end'));at=time_bounds(t.get('at'))
 lower=start[0] if start else None;upper=end[1] if end else None
 if at:lower=max(lower,at[0]) if lower else at[0];upper=min(upper,at[1]) if upper else at[1]
 return lower,upper
def compatible(a,b):
 if a.get('animeId') and b.get('animeId') and a['animeId']!=b['animeId']:return False
 if a.get('form') and b.get('form') and a['form']!=b['form']:return False
 sa,ea=period(a);sb,eb=period(b)
 if sa and ea and sa>ea or sb and eb and sb>eb:return False
 if ea and sb and ea<sb or eb and sa and eb<sa:return False
 return True
def condition(f,c):
 if f['traitId']!=c['trait'] or 'value' in c and f['value']!=c['value']:return False
 if 'month' in c and str(f['value'])[-5:-3]!=str(c['month']).zfill(2):return False
 return True
def reconcile_rows(rows,clauses):
 out=[]
 for row in rows:
  chosen=[]
  def choose(i):
   if i==len(clauses):return True
   for f in row['matches']:
    if condition(f,clauses[i]) and all(compatible(f.get('context',{}),g.get('context',{})) for g in chosen):
     chosen.append(f)
     if choose(i+1):return True
     chosen.pop()
   return False
  if not choose(0):continue
  merged={}
  for fact in row['matches']:
   if not any(condition(fact,c) for c in clauses):continue
   if not all(compatible(fact.get('context',{}),g.get('context',{})) for g in chosen):continue
   c=fact.get('context',{});key=digest([fact['traitId'],fact['value'],c.get('animeId'),c.get('form'),c.get('temporal')])
   if key not in merged:merged[key]={**fact,'sourceEvidence':[fact]}
   else:merged[key]['sourceEvidence'].append(fact)
  row['matches']=list(merged.values());row['contextUnresolved']=any(f.get('context',{}).get('animeId') is None for f in chosen);out.append(row)
 return out

def search(db,spec):
 clauses=spec.get('all',[])
 if not clauses:raise ValueError('At least one trait condition required')
 if len(clauses)>12:raise ValueError('At most twelve conditions')
 sql='SELECT i.body AS identity,o.body AS observation'+active(db);args=[]
 for n,c in enumerate(clauses):
  if not isinstance(c.get('trait'),str):raise ValueError('Trait required')
  alias='x'+str(n);k='k'+str(n);sql+=f" AND EXISTS(SELECT 1 FROM observations {alias} JOIN current_fields {k} ON {k}.provider_id={alias}.provider_id AND {k}.version={alias}.version AND {k}.facet=json_extract({alias}.body,'$.facet') WHERE {alias}.character_id=o.character_id AND {alias}.status IN ('source_trusted','wikidata_source_trusted') AND {alias}.trait=?";args.append(c['trait'])
  if 'value' in c:sql+=' AND '+alias+'.value=?';args.append(dump(c['value']))
  if 'month' in c:
   month=c['month']
   if not isinstance(month,int) or not 1<=month<=12 or c['trait']!='profile.birthday':raise ValueError('Birthday month 1-12 required')
   sql+=" AND substr(json_extract("+alias+".body,'$.value'),-5,2)=?";args.append(str(month).zfill(2))
  sql+=')'
 # Results include only facts matching at least one requested trait, never all unrelated facts.
 sql+=' AND o.trait IN ('+','.join('?' for c in clauses)+')';args.extend(c['trait'] for c in clauses)
 rows=db.execute(sql+' ORDER BY o.character_id,o.trait,o.id',args).fetchall();group={}
 for row in rows:
  identity=json.loads(row['identity']);key=identity['id'];fact=json.loads(row['observation']);group.setdefault(key,{'character':identity,'matches':[],'eligibleForInternalGeneration':True,'independentlyVerified':False,'publicationAuthorized':False})['matches'].append(fact)
 return reconcile_rows(list(group.values()),clauses)

def validate(db):
 checks={
 'danglingBindings':"SELECT count(*) FROM bindings b LEFT JOIN identities i ON i.id=b.character_id WHERE i.id IS NULL",
 'danglingObservationVersions':"SELECT count(*) FROM observations o LEFT JOIN versions v ON v.id=o.version WHERE v.id IS NULL",
 'danglingCurrentFields':"SELECT count(*) FROM current_fields c LEFT JOIN records r ON r.provider_id=c.provider_id AND r.version=c.version WHERE r.provider_id IS NULL",
 'invalidCheckpoints':"SELECT count(*) FROM jobs WHERE processed<0 OR processed>total",
 'trustStatusMismatch':"SELECT count(*) FROM observations WHERE status!=json_extract(body,'$.trustStatus')",
 'unsafeTrustedAssertions':"SELECT count(*) FROM observations WHERE status IN ('source_trusted','wikidata_source_trusted') AND (character_id IS NULL OR (status='source_trusted' AND json_extract(body,'$.sourceProvider')!='ACDB') OR (status='wikidata_source_trusted' AND (json_extract(body,'$.sourceProvider')!='Wikidata' OR json_extract(body,'$.license')!='CC0-1.0')) OR json_extract(body,'$.publicationAuthorized')!=0 OR json_extract(body,'$.independentlyVerified')!=0 OR json_extract(body,'$.hold') IS NOT NULL)"
 }
 result={key:db.execute(sql).fetchone()[0] for key,sql in checks.items()}
 if any(result.values()):raise ValueError('Knowledge validation failed: '+dump(result))
 plan=db.execute("EXPLAIN QUERY PLAN SELECT 1 FROM observations WHERE provider_id=? AND version=? AND status='source_trusted'",('acdb-character-0',1)).fetchall()
 result['providerLookupIndexed']=any('observation_provider' in str(tuple(row)) for row in plan)
 if not result['providerLookupIndexed']:raise ValueError('Missing provider/version query index')
 result['sqliteIntegrity']=db.execute('PRAGMA integrity_check').fetchone()[0]
 if result['sqliteIntegrity']!='ok':raise ValueError('SQLite integrity failure')
 return result

def filehash(file):
 h=hashlib.sha256()
 with open(file,'rb') as f:
  for block in iter(lambda:f.read(1024*1024),b''):h.update(block)
 return h.hexdigest()
def authorization(a):
 if not isinstance(a,dict) or a.get('purpose')!='private-team-use' or not str(a.get('authorizedBy','')).strip() or not str(a.get('reference','')).strip() or a.get('publicRedistribution') is not False or a.get('includeKnowledgeState') is not True or a.get('includeReviewState') is not True:raise ValueError('Actual owner authorization for knowledge and review transfer required')
def bundle(db,target,a):
 authorization(a);p=pathlib.Path(target)
 if p.exists():raise ValueError('Existing bundle will not be overwritten')
 p.parent.mkdir(parents=True,exist_ok=True,mode=0o700)
 with tempfile.TemporaryDirectory(dir=p.parent,prefix='.knowledge-export-') as temp:
  backup=pathlib.Path(temp)/'knowledge.sqlite';dest=sqlite3.connect(backup)
  try:db.backup(dest)
  finally:dest.close()
  manifest={'format':'anime-ascent-private-knowledge-bundle-v2','authorization':a,'sqliteSha256':filehash(backup),'schemaVersion':1}
  data=dump(manifest).encode();archive=pathlib.Path(temp)/'bundle.tar.gz'
  with tarfile.open(archive,'w:gz') as tar:
   info=tarfile.TarInfo('manifest.json');info.size=len(data);info.mode=0o600;tar.addfile(info,io.BytesIO(data));tar.add(backup,arcname='knowledge.sqlite',recursive=False)
  # Hard-link provides exclusive destination creation; no overwrite on a concurrent export.
  os.link(archive,p)
 return {'output':str(p),'sha256':filehash(p),'bytes':p.stat().st_size}
def restore_bundle(db,archive):
 if db.execute('SELECT count(*) FROM versions').fetchone()[0] or db.execute('SELECT count(*) FROM legacy').fetchone()[0]:raise ValueError('Restore requires an empty store')
 with tempfile.TemporaryDirectory(dir=pathlib.Path(archive).parent,prefix='.knowledge-restore-') as temp:
  with tarfile.open(archive,'r:gz') as tar:
   members=tar.getmembers()
   if len(members)!=2 or {m.name for m in members}!={'manifest.json','knowledge.sqlite'} or any(not m.isfile() for m in members):raise ValueError('Invalid private archive entries')
   if tar.getmember('manifest.json').size>65536 or tar.getmember('knowledge.sqlite').size>8*1024**3:raise ValueError('Private archive exceeds size bounds')
   manifest=json.load(tar.extractfile('manifest.json'));authorization(manifest.get('authorization'))
   if manifest.get('format')!='anime-ascent-private-knowledge-bundle-v2' or manifest.get('schemaVersion')!=1:raise ValueError('Unsupported private archive')
   source=pathlib.Path(temp)/'knowledge.sqlite'
   with open(source,'xb') as out:shutil.copyfileobj(tar.extractfile('knowledge.sqlite'),out)
  if filehash(source)!=manifest.get('sqliteSha256'):raise ValueError('Database checksum mismatch')
  original=sqlite3.connect('file:'+str(source)+'?mode=ro',uri=True);original.execute('PRAGMA trusted_schema=OFF')
  try:
   if original.execute('PRAGMA integrity_check').fetchone()[0]!='ok':raise ValueError('Database integrity failure')
   actual={(r[0],r[1],r[2]) for r in original.execute("SELECT type,name,sql FROM sqlite_master WHERE name NOT LIKE 'sqlite_%'")}
   expected={(r[0],r[1],r[2]) for r in db.execute("SELECT type,name,sql FROM sqlite_master WHERE name NOT LIKE 'sqlite_%'")}
   if actual!=expected:raise ValueError('Unexpected database schema')
   original.backup(db)
  finally:original.close()
 return metrics(db)

def main():
 command,file=sys.argv[1:3];db=connect(file,command in ['metrics','validate','search','profile','prominence','bindings','identities','values','current-facets','snapshot','active-profiles'] and pathlib.Path(file).exists())
 try:
  if command=='ingest':result=ingest(db,sys.argv[3],int(sys.argv[4]),int(sys.argv[5]) if len(sys.argv)>5 else None)
  elif command=='metrics':result=metrics(db)
  elif command=='validate':result=validate(db)
  elif command=='search':result=search(db,json.loads(sys.stdin.read()))
  elif command=='legacy':
   body=json.load(sys.stdin);key=digest(body)
   with db:db.execute('INSERT OR IGNORE INTO legacy VALUES(?,?)',(key,dump(body)))
   result={'preservedSnapshot':key}
  elif command=='bundle':result=bundle(db,sys.argv[3],json.load(sys.stdin))
  elif command=='restore-bundle':result=restore_bundle(db,sys.argv[3])
  elif command=='snapshot':
   out={table:[dict(r) for r in db.execute('SELECT * FROM '+table)] for table in ['meta','legacy','jobs','identities','bindings','versions','records','current_records','current_fields','observations','conflicts']};result={'format':'anime-ascent-knowledge-snapshot-v1','tables':out,'sha256':digest(out)}
  elif command=='restore':
   packet=json.load(sys.stdin)
   if packet.get('format')!='anime-ascent-knowledge-snapshot-v1' or packet.get('sha256')!=digest(packet.get('tables')):raise ValueError('Snapshot checksum mismatch')
   expected=['meta','legacy','jobs','identities','bindings','versions','records','current_records','current_fields','observations','conflicts']
   if set(packet['tables'])!=set(expected):raise ValueError('Snapshot tables mismatch')
   if db.execute('SELECT count(*) FROM versions').fetchone()[0] or db.execute('SELECT count(*) FROM identities').fetchone()[0]:raise ValueError('Restore requires an empty new store')
   with db:
    db.execute('DELETE FROM meta')
    for table in expected:
     columns=[r[1] for r in db.execute('PRAGMA table_info('+table+')')]
     for row in packet['tables'][table]:
      if set(row)!=set(columns):raise ValueError('Snapshot columns mismatch')
      db.execute('INSERT INTO '+table+' VALUES('+','.join('?' for _ in columns)+')',[row[c] for c in columns])
   result=metrics(db)
  elif command=='prominence':
   values={}
   for row in db.execute('SELECT o.character_id,o.value'+active(db)+" AND o.trait='identity.story_role'"):values.setdefault(row[0],set()).add(json.loads(row[1]))
   result={key:next(iter(v)) for key,v in values.items() if len(v)==1}
  elif command=='current-facets':
   result={}
   for row in db.execute("SELECT provider_id,facet FROM current_fields WHERE provider_id LIKE 'wikidata-character-%'"):result.setdefault(row[0],[]).append(row[1])
  elif command=='bindings':result={r[0]:r[1] for r in db.execute('SELECT provider_id,character_id FROM bindings')}
  elif command=='values':
   spec=json.load(sys.stdin);result=[]
   for start in range(0,len(spec['ids']),400):
    chunk=spec['ids'][start:start+400];sql='SELECT o.character_id,o.trait,o.value,json_extract(o.body,\"$.context\")'+active(db)+' AND o.character_id IN ('+','.join('?' for _ in chunk)+') AND o.trait IN ('+','.join('?' for _ in spec['traits'])+')'
    result.extend([{'characterId':r[0],'traitId':r[1],'value':json.loads(r[2]),'context':json.loads(r[3])} for r in db.execute(sql,chunk+spec['traits'])])
  elif command=='active-profiles':
   spec=json.load(sys.stdin);result={}
   if len(spec['providerIds'])>5000:raise ValueError('At most 5000 active profiles')
   for provider in spec['providerIds']:
    identity=db.execute('SELECT i.body FROM bindings b JOIN identities i ON i.id=b.character_id WHERE b.provider_id=?',(provider,)).fetchone()
    current=db.execute('SELECT r.body FROM current_records c JOIN records r ON r.version=c.version AND r.provider_id=c.provider_id WHERE c.provider_id=?',(provider,)).fetchone()
    if not identity and not current:continue
    facts=[{**json.loads(r[0]),'active':True} for r in db.execute("SELECT o.body FROM observations o JOIN current_fields c ON c.provider_id=o.provider_id AND c.version=o.version AND c.facet=json_extract(o.body,'$.facet') WHERE o.provider_id=?",(provider,))]
    result[provider]={'identity':[json.loads(identity[0])] if identity else [],'observations':facts,'currentSourceRecord':json.loads(current[0]) if current else None}
  elif command=='identities':
   raw=sys.stdin.read();result=[]
   if raw:
    ids=json.loads(raw)['ids']
    if len(ids)>5000:raise ValueError('At most 5000 requested identities')
    for start in range(0,len(ids),400):
     chunk=ids[start:start+400];result.extend(json.loads(r[0]) for r in db.execute('SELECT body FROM identities WHERE id IN ('+','.join('?' for _ in chunk)+')',chunk))
   else:result=[json.loads(r[0]) for r in db.execute('SELECT body FROM identities')]
  elif command=='profile':
   key=sys.argv[3];result={'identity':[json.loads(r[0]) for r in db.execute('SELECT body FROM identities WHERE id=?',(key,))],'observations':[{**json.loads(r[0]),'active':bool(r[1])} for r in db.execute("SELECT o.body,EXISTS(SELECT 1 FROM current_fields c WHERE c.provider_id=o.provider_id AND c.version=o.version AND c.facet=json_extract(o.body,'$.facet')) FROM observations o WHERE o.character_id=? OR o.provider_id=?",(key,key))],'sourceRecords':[json.loads(r[0]) for r in db.execute('SELECT body FROM records WHERE character_id=? OR provider_id=?',(key,key))]}
  else:raise ValueError('Unknown store command')
  print(json.dumps(result,ensure_ascii=False))
 finally:db.close()
if __name__=='__main__':
 try:main()
 except Exception as e:print(str(e),file=sys.stderr);sys.exit(1)

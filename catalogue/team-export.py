"""Local-only, deterministic compact exports; never uploads or authorizes data transfer."""
import pathlib,sqlite3,json,gzip,hashlib,os,sys,shutil,datetime
os.umask(0o077)
def sha(p):
 h=hashlib.sha256()
 with open(p,'rb') as f:
  for b in iter(lambda:f.read(1048576),b''):h.update(b)
 return h.hexdigest()
def private(p):
 p=pathlib.Path(p).resolve()
 # Honor every enclosing checkout, including another worktree of this repository.
 for repo in p.parents:
  if (repo/'.git').exists() and repo/'catalogue/private' not in p.parents:raise ValueError('Public data path refused')
 return p

def verify(folder,expected):
 folder=private(folder);manifest=folder/'manifest.json'
 if sha(manifest)!=expected:raise ValueError('Trusted manifest checksum mismatch')
 m=json.loads(manifest.read_text())
 for name,entry in m['files'].items():
  p=(folder/name).resolve()
  if folder not in p.parents or sha(p)!=entry['sha256']:raise ValueError('Partition/checksum mismatch: '+name)
 return m
def restore(folder,expected,destination):
 """Restore the complete archive, not a lossy compact reconstruction; never overwrite."""
 m=verify(folder,expected);folder=private(folder);destination=private(destination)
 if destination.exists():raise ValueError('Restore requires a new private directory')
 destination.mkdir(parents=True,mode=0o700);stage=destination/'knowledge.sqlite.incomplete';target=destination/'knowledge.sqlite'
 try:
  with gzip.open(folder/'archive.sqlite.gz','rb') as source,open(stage,'xb') as output:shutil.copyfileobj(source,output,1048576)
  if sha(stage)!=m['archiveSQLiteSHA256']:raise ValueError('Restored SQLite checksum mismatch')
  db=sqlite3.connect(stage.as_uri()+'?mode=ro',uri=True)
  try:
   if db.execute('pragma integrity_check').fetchone()[0]!='ok':raise ValueError('SQLite integrity check failed')
   counts={t:db.execute('SELECT count(*) FROM '+t).fetchone()[0] for t in m['sourceCounts']}
   if counts!=m['sourceCounts']:raise ValueError('Restored counts differ')
  finally:db.close()
  for name in ['catalogue.json','anime-metadata.json','associations.json','state.json']:
   if name in m['files']:shutil.copyfile(folder/name,destination/name)
  shutil.copyfile(folder/'manifest.json',destination/'source-manifest.json');stage.rename(target)
  return {'database':str(target),'integrity':'ok','counts':counts,'transferStatus':m['transferStatus']}
 except Exception:
  if stage.exists():stage.unlink()
  raise
def export(database,folder,archive,receipt):
 database,folder,archive,receipt=map(private,[database,folder,archive,receipt]);r=json.loads(receipt.read_text())
 if sha(archive)!=r['compressedSHA256']:raise ValueError('Archive checksum mismatch')
 # Export the decompressed, immutable backup, not a separately changing live DB.
 wal=pathlib.Path(str(database)+'-wal')
 if wal.exists() and wal.stat().st_size:raise ValueError('Use a checkpointed archival snapshot, not a live WAL database')
 if sha(database)!=r['sqliteSHA256']:raise ValueError('Source must be the exact uncompressed archive snapshot')
 if folder.exists():raise ValueError('Use a new output; never overwrite an export')
 db=sqlite3.connect(database.as_uri()+'?mode=ro',uri=True);
 try:
  db.execute('pragma cache_size=-65536');db.execute('BEGIN');counts={t:db.execute('SELECT count(*) FROM '+t).fetchone()[0] for t in r['counts']}
  if counts!=r['counts']:raise ValueError('Archive counts differ; create a fresh archival backup first')
  folder.mkdir(parents=True,mode=0o700);files={};totals={};unique=set()
  def partitions(kind,rows):
   streams={};raw={};n=0
   try:
    for id,value in rows:
     bucket=int(hashlib.sha256(id.encode()).hexdigest()[:2],16)%64;name=kind+'-'+format(bucket,'02x')+'.jsonl.gz'
     if name not in streams:raw[name]=open(folder/name,'xb');streams[name]=gzip.GzipFile(filename='',mode='wb',fileobj=raw[name],mtime=0)
     streams[name].write((json.dumps(value,sort_keys=True,separators=(',',':'),ensure_ascii=False)+'\n').encode());n+=1
   finally:
    for s in streams.values():s.close()
    for s in raw.values():s.close()
   for name in streams:files[name]={'sha256':sha(folder/name),'bytes':(folder/name).stat().st_size,'kind':kind}
   totals[kind]=n
  partitions('identities',((id,json.loads(body)) for id,body in db.execute('SELECT id,body FROM identities ORDER BY id')))
  active=" FROM observations o JOIN current_fields c ON c.provider_id=o.provider_id AND c.version=o.version AND c.facet=json_extract(o.body,'$.facet') "
  def positives():
   for cid,t,v,body in db.execute('SELECT o.character_id,o.trait,o.value,o.body'+active+" WHERE o.status IN ('source_trusted','wikidata_source_trusted') ORDER BY o.rowid"):
    unique.add((cid,t,v));yield cid,json.loads(body)
  partitions('active-positive',positives())
  partitions('active-held',((cid or 'unmatched',json.loads(body)) for cid,body in db.execute('SELECT o.character_id,o.body'+active+" WHERE o.status='held' ORDER BY o.rowid")))
  try:os.link(archive,folder/'archive.sqlite.gz')
  except OSError:shutil.copyfile(archive,folder/'archive.sqlite.gz')
  files['archive.sqlite.gz']={'sha256':r['compressedSHA256'],'bytes':archive.stat().st_size,'kind':'complete-local-archive'}
  for name in ['catalogue.json','anime-metadata.json','associations.json','state.json']:
   p=database.parent/name
   if p.exists():shutil.copyfile(p,folder/name);files[name]={'sha256':sha(folder/name),'bytes':(folder/name).stat().st_size,'kind':'private-catalogue-review-data'}
  m={'format':'anime-ascent-local-data-export-v1','sourceCounts':counts,'compactCounts':totals,'uniquePositiveTriples':len(unique),'files':files,'archiveSQLiteSHA256':r['sqliteSHA256'],'archiveScope':'all historical SQLite records; no source restrictions silently removed','compactScope':'all identities, current positive observations, and current held observations; full history is in archive','sourceRights':{'ACDB':'ODbL/DbCL plus unresolved supplied-page/derived-use obligations; retain attribution, review transfer scope','Wikidata':'CC0 structured assertions; ACDB identity/crosswalk provenance remains attached','reviews':'private research/review history; owner/participant authorization required'},'transferStatus':'LOCAL_ONLY_RIGHTS_REVIEW_REQUIRED','uploaded':False,'createdUTC':datetime.datetime.now(datetime.timezone.utc).isoformat()};m['datasetVersion']=hashlib.sha256(json.dumps(files,sort_keys=True).encode()).hexdigest();(folder/'manifest.json').write_text(json.dumps(m,indent=2));print(json.dumps({'folder':str(folder),'manifestSHA256':sha(folder/'manifest.json'),'datasetVersion':m['datasetVersion'],'counts':counts,'compact':totals,'uniquePositiveTriples':len(unique),'bytes':sum(f['bytes']for f in files.values()),'transferStatus':m['transferStatus']},indent=2))
 finally:db.close()

if __name__=='__main__':
 if sys.argv[1]=='public':
  from public_export import export_public
  print(json.dumps(export_public(*sys.argv[2:],sha=sha,private=private),ensure_ascii=False))
 elif sys.argv[1]=='export':export(*sys.argv[2:])
 elif sys.argv[1]=='verify':print(json.dumps(verify(*sys.argv[2:])['compactCounts']))
 elif sys.argv[1]=='restore':print(json.dumps(restore(*sys.argv[2:])))
 else:raise SystemExit('export PRIVATE_SQLITE NEW_PRIVATE_OUTPUT ARCHIVE_GZ RECEIPT_JSON | verify PRIVATE_OUTPUT TRUSTED_MANIFEST_SHA256 | restore PRIVATE_OUTPUT TRUSTED_MANIFEST_SHA256 NEW_PRIVATE_DIRECTORY')

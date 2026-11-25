"""Offline transactional extension of the EXISTING SQLite ledger; no new schema."""
import sys,json,pathlib,sqlite3,importlib.util,hashlib,os,shutil,subprocess,datetime
os.umask(0o077)
HERE=pathlib.Path(__file__).resolve().parent
sys.path.insert(0,str(HERE.parent))
def module(name,file):
 spec=importlib.util.spec_from_file_location(name,file);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
K=module('existing_knowledge_store',HERE.parent/'traits/importer/knowledge-store.py')
E=module('existing_public_export',HERE.parent/'public_export.py')
policy=json.loads((HERE.parent/'public-policy.json').read_text(encoding='utf-8'))
def digest(x):return hashlib.sha256(K.dump(x).encode('utf-8')).hexdigest()
def put(db,body):
 key=digest(body);db.execute('INSERT OR IGNORE INTO legacy VALUES(?,?)',(key,K.dump(body)));return key
class Atomic(sqlite3.Connection):
 # Existing ingest uses `with db` at checkpoints. Defer those commits to the outer daily transaction.
 def __enter__(self):return self
 def __exit__(self,*error):return False

def counts(db):return {t:db.execute('SELECT count(*) FROM '+t).fetchone()[0] for t in ['identities','bindings','versions','records','observations','legacy','conflicts']}
def assess(db,p,resolved,write=False,metadata=None):
 summary={'answersAssessed':0,'existingIdentitiesMatched':0,'newIdentitiesProposed':0,'existingTraitsMatched':0,'newEvidenceBackedTraits':0,'pendingClaims':0,'duplicateClaimsAvoided':0,'conflictingClaims':0,'animeMetadataCandidates':0,'questionConcepts':len(resolved),'confirmedUsageRecords':0}
 review=[]
 known_claims={r[0] for r in db.execute("SELECT json_extract(body,'$.claimKey') FROM legacy WHERE json_extract(body,'$.format')='daily-content-claim-v1'")}
 for q in resolved:
  question=q['question'];mapping=q['mapping']
  concept={'format':'daily-question-inventory-v1','mode':p['mode'],'date':p['challengeDate'],'questionId':question['id'],'conceptId':q['concept'],'wording':question['text'],'equivalentConcepts':question.get('equivalentConcepts',[]),'bankVersion':p.get('bankVersion'),'answerCount':len(q['answers']),'sourceHash':p['sourceHash'],'packetId':p['id'],'usage':'proposed','rarityPolicy':'question-specific editorial; Descent scoring unchanged'}
  if write:put(db,concept)
  for a in q['answers']:
   summary['answersAssessed']+=1;cid=a.get('resolution',{}).get('characterId')
   evidence=a.get('evidence',[])
   if not isinstance(evidence,list):raise ValueError('Evidence must be an array')
   for ev in evidence:
    if not isinstance(ev,dict):raise ValueError('Invalid evidence reference')
   base={'name':a['name'],'aliases':a.get('aliases',[]),'characterId':cid,'animeId':a.get('animeId'),'animeTitle':a.get('animeTitle'),'context':a.get('context'),'questionId':question['id'],'mode':p['mode'],'packetId':p['id'],'submittedEvidence':evidence,'editorialRarity':a['rarity'],'tooClever':a.get('clever',False),'publicationAuthorized':False,'independentlyVerified':False}
   if mapping['entity']=='anime':
    # Existing metadata field names, not personal traits or invented MAL IDs. Source validation remains required.
    claim={'format':'daily-anime-metadata-candidate-v1',**base,'metadata':mapping['all'],'status':'pending','hold':'Anime identity and metadata provenance require existing metadata adapter validation'}
    record=(metadata or {}).get(str(a.get('animeId','')).replace('mal-anime-',''))
    if record and a.get('animeId')=='mal-anime-'+str(record['malId']) and a['name'] in [record['title']]+a.get('aliases',[]):
     def supports(c):
      v=record.get(c['field'])
      if c.get('operator')=='range':return isinstance(v,int) and c['min']<=v<=c['max']
      return any(x['name']==c['value'] for x in v) if isinstance(v,list) else v==c['value']
     if mapping['all'] and all(supports(c) for c in mapping['all']):claim.update(status='source_supported',hold=None,metadataRecord=record)
    summary['animeMetadataCandidates']+=1
    if write:put(db,claim)
    review.append(claim);continue
   if cid and db.execute('SELECT 1 FROM identities WHERE id=?',(cid,)).fetchone():summary['existingIdentitiesMatched']+=1
   else:
    cid=None;summary['newIdentitiesProposed']+=1
   conditions=mapping['all'] or [{'trait':None,'value':None}]
   for condition in conditions:
    trait,value=condition['trait'],condition['value'];context=a.get('context') or {'animeId':a.get('animeId'),'form':None,'persistence':'unknown','scope':question['text']}
    matches=[];different=[]
    if cid and trait:
     sql="SELECT o.body FROM observations o JOIN current_fields c ON c.provider_id=o.provider_id AND c.version=o.version AND c.facet=json_extract(o.body,'$.facet') WHERE o.character_id=? AND o.trait=? AND o.status IN ('source_trusted','wikidata_source_trusted')"
     for row in db.execute(sql,(cid,trait)):
      f=json.loads(row[0]);fc=f.get('context') or {}
      if context.get('animeId') and fc.get('animeId')!=context['animeId'] or context.get('form') and fc.get('form')!=context['form']:continue
      (matches if f['value']==value else different).append(f)
    status='source_supported' if matches else 'pending'
    exclusive=trait in ['appearance.hair_color','appearance.eye_color','identity.species','appearance.hair_length']
    if different and exclusive:status='conflicting';summary['conflictingClaims']+=1
    key=digest([cid or [a['name'],a.get('animeId'),a.get('animeTitle')],trait,value,context])
    old=key in known_claims
    if old:summary['duplicateClaimsAvoided']+=1
    if matches:summary['existingTraitsMatched']+=1
    else:summary['pendingClaims']+=1
    claim={'format':'daily-content-claim-v1','claimKey':key,**base,'characterId':cid,'traitId':trait,'value':value,'context':context,'conditions':mapping['all'],'status':status,'identityReason':a.get('resolution',{}).get('reason'),'evidence':matches,'conflictingEvidence':different if exclusive else [],'hold':None if status=='source_supported' else 'CSV assertion is not independently verified; identity/context/source review required'}
    if write:
     # One logical claim; additional provenance is append-only, not duplicate trait triples.
     if not old:put(db,claim);known_claims.add(key)
     put(db,{'format':'daily-content-provenance-v1','claimKey':key,'packetId':p['id'],'questionId':question['id'],'answer':base,'statusAtImport':status})
    review.append(claim)
 return summary,review

def export_install(stage,target,backup):
 target.mkdir(parents=True,exist_ok=True)
 if not backup.exists():shutil.copytree(target,backup)
 try:
  names=sorted((x.name for x in stage.iterdir() if x.name!='manifest.json'))+['manifest.json']
  for name in names:
   source=stage/name;dest=target/name
   if dest.exists() and dest.read_bytes()==source.read_bytes():continue
   temp=dest.with_name(dest.name+'.daily-incomplete');shutil.copyfile(source,temp);os.replace(temp,dest)
 except Exception:
  # Restore the previous complete public package; SQLite retains a durable export-pending receipt.
  for source in backup.iterdir():
   temp=target/(source.name+'.restore-incomplete');shutil.copyfile(source,temp);os.replace(temp,target/source.name)
  for dest in target.iterdir():
   if dest.name not in {x.name for x in backup.iterdir()} and (dest.name.endswith('.gz') or dest.name=='manifest.json' or dest.name.endswith('.daily-incomplete')):dest.unlink()
  raise

def validate_public(stage,x):
 subprocess.run([x['nodeExecutable'],'-e',"require(process.argv[1]).read(process.argv[2])",str(HERE.parent/'public-data.js'),str(stage)],check=True,capture_output=True,encoding='utf-8')

def main(command,file,x):
 file=pathlib.Path(file).resolve()
 if not file.exists():raise ValueError('Existing private knowledge database required; bootstrap it first')
 if command=='preview':
  db=K.connect(str(file),True)
  try:
   summary,review=assess(db,x['packet'],x['resolved'],metadata=x.get('metadata'));return {'dryRun':True,'before':counts(db),'summary':summary,'review':review,'sourceImportsPlanned':len(x.get('prepared',[])),'publicationAuthorized':False}
  finally:db.close()
 if command=='confirm':
  db=K.connect(str(file));db.execute('BEGIN IMMEDIATE')
  try:
   body={'format':'daily-confirmed-usage-v1',**x};key=put(db,body);db.commit();return {'usageRecord':key,'productionChanged':False}
  except Exception:db.rollback();raise
  finally:db.close()
 lock=pathlib.Path(str(file)+'.daily.lock');fd=os.open(lock,os.O_WRONLY|os.O_CREAT|os.O_EXCL,0o600);db=None
 try:
  db=sqlite3.connect(file,factory=Atomic,timeout=30);db.row_factory=sqlite3.Row;db.execute('PRAGMA trusted_schema=OFF')
  p=x['packet'];out=pathlib.Path(x['output']);before=counts(db);prepared=x.get('prepared',[])
  target=pathlib.Path(x['publicTarget']).resolve();allowed=(HERE.parent/'public-data/v1').resolve();private=(HERE.parent/'private').resolve()
  if target!=allowed and private not in target.parents:raise ValueError('Public target outside allowed package/private test boundary')
  import_id=digest([p['id'],[K.filehash(f) for f in prepared],x.get('metadata',{})])
  prior=db.execute('SELECT body FROM legacy WHERE hash=?',('daily-receipt:'+import_id,)).fetchone()
  if prior:
   result=json.loads(prior[0]);db.close();db=None
   # Always finish export before reporting successful integration, including retries after commit.
  else:
   backup=out/'knowledge.before.sqlite'
   if backup.exists():raise ValueError('Backup already exists without receipt: inspect failed operation and use a new output directory; never overwrite it')
   if shutil.disk_usage(out).free<file.stat().st_size+2*1024**3:raise ValueError('Insufficient space for consistent backup plus 2 GiB working reserve')
   baseline=db.execute('PRAGMA data_version').fetchone()[0]
   dest=sqlite3.connect(backup)
   try:db.backup(dest)
   finally:dest.close()
   check=sqlite3.connect(backup.as_uri()+'?mode=ro',uri=True)
   try:
    if check.execute('PRAGMA quick_check').fetchone()[0]!='ok':raise ValueError('Backup failed read-back validation')
   finally:check.close()
   db.execute('BEGIN IMMEDIATE')
   if db.execute('PRAGMA data_version').fetchone()[0]!=baseline:raise ValueError('Concurrent source change during backup; retry with a new output directory')
   new_keys=set()
   for f in prepared:
    with open(f,encoding='utf-8') as stream:
     header=json.loads(next(stream))
     for line in stream:
      row=json.loads(line)
      # Preparation precedes the write lock; never restore a stale canonical snapshot.
      if header.get('provider')=='jvmg-reviewed-pending' and row.get('identity'):
       identity=row['identity'];current=db.execute('SELECT body FROM identities WHERE id=?',(identity['id'],)).fetchone()
       if not current or json.loads(current[0])!=identity:raise ValueError('Canonical JVMG identity changed since preparation; no identity overwrite permitted')
      if row.get('hold') or not row.get('identity'):continue
      for fact in row['facts']:
       if fact.get('hold') or fact['trustStatus'] not in ['source_trusted','wikidata_source_trusted']:continue
       key=(row['identity']['id'],fact['traitId'],K.dump(fact['value']))
       if not db.execute("SELECT 1 FROM observations WHERE character_id=? AND trait=? AND value=? AND status IN ('source_trusted','wikidata_source_trusted') LIMIT 1",key).fetchone():new_keys.add(key)
    K.ingest(db,f,500)
   summary,review=assess(db,p,x['resolved'],True,x.get('metadata'))
   summary['newEvidenceBackedTraits']=len(new_keys)
   for record in x.get('metadata',{}).values():put(db,{'format':'daily-anime-metadata-v1','record':record,'packetId':p['id'],'publicationAuthorized':False})
   if x.get('failAt')=='transaction':raise ValueError('Injected transaction failure')
   integrity=K.validate(db)
   (out/'pending-review.json').write_text(json.dumps(review,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
   stage=out/'public-stage'
   if not stage.exists() and target.exists():shutil.copytree(target,stage)
   export=E.materialize(db,stage,policy,K.filehash)
   validate_public(stage,x)
   result={'importedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'format':'daily-enrichment-receipt-v1','packetId':p['id'],'before':before,'after':counts(db),'summary':summary,'backup':str(backup),'integrity':integrity['sqliteIntegrity'],'datasetVersion':export['manifest']['datasetVersion'],'publicChanges':export['changes'],'publicationAuthorized':False,'confirmedUsageRecords':0}
   db.execute('INSERT INTO legacy VALUES(?,?)',('daily-receipt:'+import_id,K.dump(result)))
   db.execute('INSERT INTO meta VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value',('daily-export-pending',p['id']))
   db.commit();db.close();db=None
  if x.get('failAt')=='export':raise ValueError('Database transaction complete; public export pending. Retry the identical integration and output directory.')
  stage=out/'public-stage'
  target=pathlib.Path(x['publicTarget']).resolve()
  allowed=(HERE.parent/'public-data/v1').resolve();private=(HERE.parent/'private').resolve()
  if target!=allowed and private not in target.parents:raise ValueError('Public target outside allowed package/private test boundary')
  # Recompute from current DB on retry so intervening completed imports cannot be hidden by a stale stage.
  source=K.connect(str(file),True)
  try:E.materialize(source,stage,policy,K.filehash)
  finally:source.close()
  validate_public(stage,x)
  export_install(stage,target,out/'public.before')
  done=sqlite3.connect(file)
  try:
   done.execute("DELETE FROM meta WHERE key='daily-export-pending' AND value=?",(p['id'],));done.commit()
  finally:done.close()
  return result
 except Exception:
  if db is not None:db.rollback()
  raise
 finally:
  if db is not None:db.close()
  os.close(fd);lock.unlink()

if __name__=='__main__':
 try:print(json.dumps(main(sys.argv[1],sys.argv[2],json.load(sys.stdin)),ensure_ascii=False))
 except Exception as e:print(str(e),file=sys.stderr);sys.exit(1)

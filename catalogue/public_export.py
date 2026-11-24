"""Rights-scoped projection of the existing store. Read-only; no uploads or approvals."""
import collections,gzip,hashlib,io,json,pathlib,re,sqlite3,math,unicodedata

def canonical(x):return json.dumps(x,ensure_ascii=False,sort_keys=True,separators=(',',':'))
def digest(x):return hashlib.sha256(canonical(x).encode('utf-8')).hexdigest()
def clean(s):
 return isinstance(s,str) and 0<len(s.strip())<=250 and not re.search(r'[\x00-\x1f\ufffd]|[<>]|(?:Ã.|Â.|ã[\x80-\xBF‚ƒ])',s)
def name_key(s):
 return re.sub('[^a-z0-9]','', ''.join(c for c in unicodedata.normalize('NFKD',s).lower() if not 0x300<=ord(c)<=0x36f)) or 'unicode:'+s.casefold()
def names(row):
 p=(row.get('profile') or {}).get('identifiers') or {};name=(row.get('sourceIdentity') or {}).get('name')
 if not clean(name):return None,[],0
 forms=[*(p.get('aliases') or []),p.get('japaneseName'),*(p.get('sourceReadings') or {}).values()]
 return name.strip(),sorted({s.strip() for s in forms if clean(s) and s.strip()!=name.strip()}),sum(isinstance(s,str) and bool(s.strip()) and not clean(s) for s in forms)
def write_changed(p,data):
 if p.exists() and p.read_bytes()==data:return False
 stage=p.with_suffix(p.suffix+'.incomplete');stage.write_bytes(data);stage.replace(p);return True

def export_public(database,folder,sha,private):
 source=private(database);target=pathlib.Path(folder).resolve();repo=pathlib.Path(__file__).resolve().parents[1]
 if target!=repo/'catalogue/public-data/v1':raise ValueError('Public output must be this checkout/catalogue/public-data/v1')
 policy=json.loads((repo/'catalogue/public-policy.json').read_text(encoding='utf-8'))
 db=sqlite3.connect(source.as_uri()+'?mode=ro',uri=True);db.execute('PRAGMA cache_size=-65536');db.execute('BEGIN')
 try:return materialize(db,target,policy,sha)
 finally:db.close()

def materialize(db,target,policy,sha):
 sources={};source_counts=collections.Counter();excluded_sources=collections.Counter();alias_holds=0;damaged_aliases=0
 # Official historical SQL records retain source-native identities even if later
 # supplied pages replaced current profile metadata. Never copy merged identity bodies.
 def source_view(body):
  row=json.loads(body)
  if row.get('hold'):return {'hold':row['hold']}
  profile=row.get('profile') or {};identity=row.get('identity') or {}
  return {**{k:row.get(k) for k in ['acquisition','license','sourceIdentity','sourceRevision','hold']},'profile':{k:profile.get(k) for k in ['identifiers','appearances','formLinks','entityRevision']},'identity':{k:identity.get(k) for k in ['sourceProvider','appearances']}}
 headers={v:json.loads(h) for v,h in db.execute('SELECT id,header FROM versions')};official={};official_versions=[v for v,h in headers.items() if h.get('provider')=='acdb'];wiki_versions=[v for v,h in headers.items() if h.get('provider')=='wikidata'];latest={}
 if not official_versions and not wiki_versions:raise ValueError('No original official-source provenance; a public search index is not an upstream export source')
 if official_versions:
  sql='SELECT provider_id,character_id,body,version FROM records NOT INDEXED WHERE version IN ('+','.join('?' for _ in official_versions)+')'
  for pid,cid,body,version in db.execute(sql,official_versions):
   if version>=latest.get(pid,-1):official[pid]=(cid,source_view(body));latest[pid]=version
 current_wiki={pid:(cid,source_view(body)) for pid,cid,body in db.execute("SELECT r.provider_id,r.character_id,r.body FROM current_records c JOIN records r ON r.provider_id=c.provider_id AND r.version=c.version WHERE c.provider_id GLOB 'wikidata-character-*' AND r.version IN ("+(','.join(str(v) for v in wiki_versions) or '-1')+")")}
 print('Selected source metadata; applying public identity policy',file=__import__('sys').stderr,flush=True)
 for provider,rows in [('ACDB',official),('Wikidata',current_wiki)]:
  rule=policy['sources'][provider]
  for pid,(cid,row) in rows.items():
   source_counts[provider]+=1
   if row.get('hold') or not cid:excluded_sources['held_identity']+=1;continue
   if row.get('acquisition')!=rule['acquisition'] or row.get('license')!=rule['license']:excluded_sources['unresolved_acquisition_or_license']+=1;continue
   name,aliases,damaged=names(row);damaged_aliases+=damaged
   if not name:excluded_sources['invalid_source_name']+=1;continue
   # Do not republish a canonical name or anime credits obtained from Tenrai.
   appearances=[]
   raw_apps=((row.get('profile') or {}).get('appearances') or []) if provider=='ACDB' else ((row.get('identity') or {}).get('appearances',[]) if (row.get('identity') or {}).get('sourceProvider')=='Wikidata' else [])
   for a in raw_apps:
    native=str(a.get('externalTitleId','')) if provider=='ACDB' else a.get('wikidataId','')
    if a.get('media')!='anime' or not clean(a.get('title')) or not (native.isdecimal() if provider=='ACDB' else re.fullmatch(r'Q\d+',native)):continue
    appearances.append({'id':('acdb-title-' if provider=='ACDB' else 'wikidata-title-')+native,'name':a['title'].strip(),'sourceProvider':provider,'sourceId':native,'media':'anime'})
   if provider=='ACDB' and not appearances:excluded_sources['no_source_backed_anime_assignment']+=1;continue
   form={k:str(v) for k,v in ((row.get('profile') or {}).get('formLinks') or {}).items() if k in ['clone','clonetype','otherchar'] and str(v).isdigit() and str(v)!='0'}
   sources[pid]={'id':pid,'privateId':cid,'provider':provider,'name':name,'aliases':aliases,'anime':sorted(appearances,key=lambda a:a['id']),'forms':form,'revision':row.get('sourceRevision'),'sourceIds':row.get('sourceIdentity') or {},'entityRevision':(row.get('profile') or {}).get('entityRevision')}
 # Only an explicit Wikidata ACDB identifier can publish a cross-source merge.
 # Internal/private inferred MAL/franchise mappings are not a redistribution grant.
 by_private=collections.defaultdict(list)
 for pid,s in sources.items():
  if s['provider']=='ACDB':by_private[s['privateId']].append(pid)
 mapping={pid:pid for pid in sources};joins=collections.defaultdict(list)
 for pid,s in sources.items():
  if s['provider']!='Wikidata':continue
  links=['acdb-character-'+str(x) for x in s['sourceIds'].get('acdbIds',[])]
  if len(links)==1 and links[0] in sources and sources[links[0]]['privateId']==s['privateId'] and not sources[links[0]]['forms']:joins[links[0]].append(pid)
 for acdb,pids in joins.items():
  if len(pids)==1:mapping[pids[0]]=acdb
 for pid,s in list(sources.items()):
  if s['provider']=='Wikidata' and mapping[pid]==pid and by_private[s['privateId']]:
   excluded_sources['cross_source_identity_link_not_cleared']+=1;del sources[pid];del mapping[pid]
 groups=collections.defaultdict(list)
 for pid,s in sources.items():groups[s['privateId']].append(pid)
 for group in groups.values():
  if len({mapping[pid] for pid in group})>1 and all(sources[pid]['provider']=='Wikidata' for pid in group):
   for pid in group:excluded_sources['ambiguous_multiple_wikidata_identities']+=1;del sources[pid];del mapping[pid]
 characters={};private_to_public=collections.defaultdict(set)
 for pid,s in sources.items():
  public=mapping[pid];private_to_public[s['privateId']].add(public)
  c=characters.setdefault(public,{'id':public,'name':sources[public]['name'],'aliases':[],'appearances':[],'canonicalAppearances':[],'providerIds':[],'sourceProvider':sources[public]['provider'],'canonicalId':None,'identityStatus':'source_identity','facts':[],'identitySources':[],'formLinks':sources[public]['forms'],'independentlyVerified':False,'publicationAuthorized':False})
  c['providerIds'].append(pid);c['aliases']+=s['aliases']+([s['name']] if s['name']!=c['name'] else []);c['appearances']+=s['anime']
  c['identitySources'].append({'providerId':pid,'sourceProvider':s['provider'],'sourceId':pid.removeprefix('acdb-character-').removeprefix('wikidata-character-'),'revision':s['entityRevision'] or s['revision'],'license':policy['sources'][s['provider']]['license'],'acquisition':policy['sources'][s['provider']]['acquisition'],'externalIds':{'myAnimeList':sorted(str(x) for x in s['sourceIds'].get('malIds',[]) if str(x).isdigit()),'animeCharactersDatabase':sorted(str(x) for x in s['sourceIds'].get('acdbIds',[]) if str(x).isdigit())} if s['provider']=='Wikidata' else {},'url':('https://www.animecharactersdatabase.com/characters.php?id='+pid.split('-')[-1]) if s['provider']=='ACDB' else 'https://www.wikidata.org/wiki/'+pid.split('-')[-1]})
 # A single sequential pass preserves the current projection, never historical or held facts.
 exclusions=collections.Counter();included_observations=0;fact_sources=collections.Counter();by_trait=collections.Counter();all_positive=0;seen=set();original_triples=set();original_searchable=set()
 sql="SELECT o.character_id,o.body,o.version FROM observations o NOT INDEXED JOIN current_fields c ON c.provider_id=o.provider_id AND c.version=o.version AND c.facet=json_extract(o.body,'$.facet') WHERE o.status IN ('source_trusted','wikidata_source_trusted')"
 print('Reading current positive observations',file=__import__('sys').stderr,flush=True)
 for old_id,body,source_version in db.execute(sql):
  all_positive+=1;f=json.loads(body);original_searchable.add(old_id);original_triples.add((old_id,f.get('traitId'),canonical(f.get('value'))));pid=f.get('providerId');provider=f.get('sourceProvider');rule=policy['sources'].get(provider)
  if headers[source_version].get('provider')!=('acdb' if provider=='ACDB' else 'wikidata'):exclusions['not_original_source_provenance']+=1;continue
  if not rule or f.get('acquisition', 'official-wikidata-entity-api' if provider=='Wikidata' else None)!=rule['acquisition'] or f.get('license')!=rule['license']:exclusions['unresolved_source_or_acquisition']+=1;continue
  if pid not in sources:exclusions['identity_not_publicly_linkable']+=1;continue
  if old_id!=sources[pid]['privateId']:exclusions['identity_binding_changed']+=1;continue
  if f.get('descriptionDerived') or f.get('extraction') not in [None,'structured_field','structured_statement'] or f.get('hold'):exclusions['non_structured_or_held']+=1;continue
  trait=f.get('traitId');value=f.get('value');public=mapping[pid]
  if not isinstance(trait,str) or trait.startswith('source.unmapped') or trait=='source.tag' and provider!='Wikidata':exclusions['unsupported_field_or_web_tag']+=1;continue
  if isinstance(value,float) and not math.isfinite(value):exclusions['non_finite_value']+=1;continue
  if not isinstance(value,(str,int,float,bool)) or isinstance(value,str) and (len(value)>250 or '\n' in value or '<' in value or '\ufffd' in value):exclusions['unsafe_or_prose_value']+=1;continue
  if provider=='ACDB' and (f.get('sourceType')!='profile' or f.get('rawField') not in ['hair_color','eye_color','hair_length','age','sex','mimikko','clothing','role']):exclusions['not_official_dump_attribute']+=1;continue
  if provider=='Wikidata' and (f.get('sourceType')!='wikidata_statement' or not re.fullmatch(r'Q\d+\$[A-Za-z0-9-]+',str(f.get('statementId')),re.IGNORECASE)):exclusions['missing_statement_provenance']+=1;continue
  if provider=='ACDB' and (not isinstance(f.get('rawValue'),(str,int)) or not str(f.get('rawValue')).isdigit() or f.get('rawLabel') is not None and not clean(f['rawLabel'])):exclusions['invalid_dump_code_or_label']+=1;continue
  url=f.get('url','')
  if provider=='ACDB' and url!='https://www.animecharactersdatabase.com/characters.php?id='+pid.split('-')[-1] or provider=='Wikidata' and url!='https://www.wikidata.org/w/index.php?title='+pid.split('-')[-1]+'&oldid='+str(f.get('entityRevision')):exclusions['source_url_mismatch']+=1;continue
  context={'animeId':None,'form':pid if sources[pid]['forms'] else None,'persistence':'unknown','scope':'Source character assertion; anime adaptation/recurrence unresolved'}
  if provider=='Wikidata' and (f.get('context') or {}).get('temporal'):context['temporal']={k:v for k,v in f['context']['temporal'].items() if k in ['start','end','at'] and isinstance(v,str) and len(v)<50}
  relationship=f.get('relationship')
  if relationship:
   target_pid='wikidata-character-'+str(relationship.get('targetQid'))
   if target_pid not in mapping or target_pid not in sources or mapping[target_pid]==public:exclusions['relationship_target_not_public']+=1;continue
   value=str(relationship.get('type'))+'|'+mapping[target_pid]
  row={'traitId':trait,'value':value,'characterId':public,'providerId':pid,'sourceProvider':provider,'sourceType':f.get('sourceType'),'acquisition':rule['acquisition'],'license':rule['license'],'url':url,'locator':f.get('locator'),'context':context,'trustStatus':'source_trusted' if provider=='ACDB' else 'wikidata_source_trusted','hold':None,'independentlyVerified':False,'publicationAuthorized':False}
  for key in (['rawField','rawValue','rawLabel'] if provider=='ACDB' else ['property','statementId','entityRevision','valueId']):
   if key in f:row[key]=f[key]
  if provider=='Wikidata' and f.get('normalizationBasis'):row['normalizationBasis']={k:v for k,v in f['normalizationBasis'].items() if k in ['property','statementId','valueId','entityId','entityRevision','url','rank']}
  if relationship:row['relationship']={'type':relationship['type'],'targetId':mapping[target_pid],'targetQid':relationship['targetQid']}
  key=digest(row)
  if key in seen:exclusions['duplicate_identical_assertion']+=1;continue
  seen.add(key);characters[public]['facts'].append(row);included_observations+=1;fact_sources[provider]+=1;by_trait[trait]+=1
 # A public character/trait/value occurs once; retain all contexts/provenance as evidence.
 triples_by_source=collections.defaultdict(set)
 for c in characters.values():
  grouped={}
  for fact in c['facts']:
   key=(fact['traitId'],canonical(fact['value']))
   group=grouped.setdefault(key,{'characterId':c['id'],'traitId':fact['traitId'],'value':fact['value'],'sourceEvidence':[],'independentlyVerified':False,'publicationAuthorized':False});group['sourceEvidence'].append(fact)
   triples_by_source[fact['sourceProvider']].add((c['id'],*key))
  c['facts']=list(grouped.values())
  for fact in c['facts']:fact['sourceEvidence'].sort(key=canonical)
 # Withhold ambiguous aliases, retaining canonical source labels and explicit collision metadata.
 forms=collections.defaultdict(set)
 for c in characters.values():
  for n in [c['name'],*c['aliases']]:forms[name_key(n)].add(c['id'])
 for c in characters.values():
  aliases=sorted(set(c['aliases'])-{c['name']});c['aliases']=[a for a in aliases if len(forms[name_key(a)])==1];alias_holds+=len(aliases)-len(c['aliases'])
  c['ambiguousCanonicalName']=len(forms[name_key(c['name'])])>1
  c['appearances']=list({a['id']:a for a in c['appearances']}.values());c['appearances'].sort(key=lambda a:a['id']);c['providerIds'].sort();c['identitySources'].sort(key=lambda a:a['providerId']);c['facts'].sort(key=lambda f:(f['traitId'],canonical(f['value']),canonical(f['sourceEvidence'])))
 print('Writing deterministic public partitions',file=__import__('sys').stderr,flush=True)
 target.mkdir(parents=True,exist_ok=True);old=json.loads((target/'manifest.json').read_text(encoding='utf-8')) if (target/'manifest.json').exists() else None
 files={};changed=[];buckets=collections.defaultdict(list)
 for c in characters.values():buckets[int(hashlib.sha256(c['id'].encode()).hexdigest()[:2],16)%32].append(c)
 for bucket in range(32):
  rows=buckets.get(bucket,[])
  name=f'characters-{bucket:02x}.jsonl.gz';stream=io.BytesIO()
  content_hash=hashlib.sha256()
  with gzip.GzipFile(filename='',mode='wb',fileobj=stream,mtime=0,compresslevel=6) as gz:
   for row in sorted(rows,key=lambda c:c['id']):
    line=(canonical(row)+'\n').encode('utf-8');content_hash.update(line);gz.write(line)
  data=stream.getvalue();previous=(old or {}).get('files',{}).get(name,{})
  if previous.get('uncompressedSHA256')==content_hash.hexdigest() and (target/name).exists() and sha(target/name)==previous.get('sha256'):data=(target/name).read_bytes()
  if len(data)>8*1024*1024:raise ValueError('Partition exceeds public size limit; review a new schema/version')
  if write_changed(target/name,data):changed.append(name)
  files[name]={'sha256':sha(target/name),'uncompressedSHA256':content_hash.hexdigest(),'bytes':len(data),'records':len(rows)}
 stale=set((old or {}).get('files',{}))-set(files)
 if stale:raise ValueError('Stale partition removal needs explicit review: '+str(sorted(stale)))
 triples={(c['id'],f['traitId'],canonical(f['value'])) for c in characters.values() for f in c['facts']}
 anime={a['id'] for c in characters.values() for a in c['appearances']};private_ids={r[0] for r in db.execute('SELECT id FROM identities')}
 manifest={'format':'anime-ascent-public-knowledge-v1','schemaVersion':1,'policyId':policy['id'],'policySHA256':digest(policy),'databaseLicense':'ODbL-1.0','contentsLicenses':['DbCL-1.0','CC0-1.0'],'sourceCategories':policy['sources'],'attribution':'Contains information from Anime Characters Database (ODbL/DbCL) and Wikidata (CC0). See ../NOTICE.md and ../licenses/.','characterCount':len(characters),'searchableCharacters':sum(bool(c['facts']) for c in characters.values()),'knownAnimeCharacters':sum(bool(c['appearances']) for c in characters.values()),'animeCount':len(anime),'uniqueTraitTriples':len(triples),'positiveAssertions':included_observations,'bySource':dict(sorted(fact_sources.items())),'uniqueTriplesBySource':{k:len(v) for k,v in sorted(triples_by_source.items())},'byTrait':dict(sorted(by_trait.items())),'damagedOrUnsafeAliasesWithheld':damaged_aliases,'ambiguousAliasesWithheld':alias_holds,'excluded':{'currentPositiveObservations':all_positive-included_observations,'observationReasons':dict(sorted(exclusions.items())),'sourceRecordReasons':dict(sorted(excluded_sources.items())),'privateIdentitiesWithoutPublicRepresentation':len(private_ids-set(private_to_public)),'privateReviewAndHistoryIncluded':False},'privateBaseline':{'identities':len(private_ids),'currentPositiveObservations':all_positive,'searchableCharacters':len(original_searchable),'uniquePositiveTriples':len(original_triples)},'files':files,'totalBytes':sum(f['bytes'] for f in files.values()),'generation':{'command':'python3 -B catalogue/team-export.py public PRIVATE_SQLITE catalogue/public-data/v1','sourceMode':'read-only SQLite transaction; official SQL and current structured Wikidata only','independentVerification':False,'gameplayApproval':False},'update':{'changedPartitions':changed,'previousDatasetVersion':(old or {}).get('datasetVersion')}}
 # Volatile change reports are returned, not embedded: identical inputs retain identical bytes.
 report=manifest.pop('update');manifest['datasetVersion']=digest(manifest);write_changed(target/'manifest.json',(json.dumps(manifest,ensure_ascii=False,sort_keys=True,indent=2)+'\n').encode('utf-8'))
 return {'manifest':manifest,'changes':report,'sourceRecordsExamined':dict(source_counts)}

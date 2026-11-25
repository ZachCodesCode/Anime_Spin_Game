"""Scoped projection/admission into the existing ledger; rights and identity fail closed."""
import json,pathlib,sqlite3,hashlib,re,importlib.util,os,datetime
ROOT=pathlib.Path(__file__).resolve().parents[2]
TYPE='http://www.w3.org/1999/02/22-rdf-syntax-ns#type'
LABEL='http://www.w3.org/2000/01/rdf-schema#label'
def digest(x):return hashlib.sha256(json.dumps(x,sort_keys=True,ensure_ascii=False,separators=(',',':')).encode()).hexdigest()
def load(name,file):
 spec=importlib.util.spec_from_file_location(name,file);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
class Graph:
 def __init__(self,file):
  self.db=sqlite3.connect(pathlib.Path(file).resolve().as_uri()+'?mode=ro',uri=True,timeout=60)
  self.complete={name:{'sha256':sha,'stats':json.loads(stats)} for name,sha,stats in self.db.execute('SELECT name,sha,stats FROM graph WHERE complete=1')}
 def terms(self,uri):
  result={}
  for graph,p,o,kind,lang,datatype in self.db.execute('SELECT graph,p,o,kind,lang,datatype FROM triple INDEXED BY subject_idx WHERE s=?',(uri,)):
   if graph in self.complete:result.setdefault(p,[]).append({'value':o,'kind':kind,'language':lang,'datatype':datatype,'graph':graph,'graphSHA256':self.complete[graph]['sha256']})
  return result
 def cluster_evidence(self,uri):
  predicate='http://mediagraph.link/jvmg/ont/sourceURI';resources=[];ids=set()
  for subject,graph in self.db.execute('SELECT s,graph FROM triple INDEXED BY predicate_idx WHERE p=? AND o=?',(predicate,uri)):
   if graph not in self.complete:continue
   props=self.terms(subject);resources.append({'uri':subject,'properties':props})
   for value in props.get(predicate,[]):
    provider,id=native(value['value'])
    if provider:ids.add({'acdb':'acdb-character-','aclick':'animeclick-character-','vndb':'vndb-character-'}[provider]+id)
  return {'providerIds':sorted(ids),'resources':resources,'status':'corroboration required; never automatic equivalence'}
 def close(self):self.db.close()
def native(uri):
 m=re.fullmatch(r'https?://mediagraph.link/(acdb|aclick|vndb)/character/(\d+)',uri)
 return (m[1],m[2]) if m else (None,None)
def resolve(uri,bindings,cluster_evidence=()):
 provider,id=native(uri);key={'acdb':'acdb-character-','aclick':'animeclick-character-','vndb':'vndb-character-'}.get(provider,'')+str(id)
 if provider and key in bindings:return {'status':'confirmed_existing','characterId':bindings[key],'basis':'exact_existing_provider_binding','providerId':key,'clusterEvidence':list(cluster_evidence)}
 # Cluster membership is a lead; it never creates an automatic canonical merge.
 candidates=sorted({bindings[x] for x in cluster_evidence if x in bindings})
 return {'status':'ambiguous_cluster' if len(candidates)>1 else 'unresolved_identity','characterId':None,'providerId':key if provider else None,'candidates':candidates,'basis':'No exact established binding; cluster requires corroboration','clusterEvidence':list(cluster_evidence)}
def filehash(file):
 h=hashlib.sha256()
 with open(file,'rb') as f:
  for block in iter(lambda:f.read(1048576),b''):h.update(block)
 return h.hexdigest()
def local(p):return p.rsplit('/',1)[-1].rsplit('#',1)[-1]
def unsuitable(label,props,lookup,seen=None):
 pattern=json.loads((ROOT/'catalogue/jvmg/source-policy.json').read_text(encoding='utf8'))['unsuitableLabelPattern']
 if re.search(pattern,label.lower()):return True
 seen=set() if seen is None else seen
 for p,values in props.items():
  if local(p)!='traitParent' or not lookup:continue
  for term in values:
   uri=term['value']
   if uri in seen:continue
   seen.add(uri);parent=lookup(uri)
   for name in parent.get(LABEL,[]):
    if unsuitable(name['value'],parent,lookup,seen):return True
 return False
def project(uri,terms,bindings,identities,mappings,lookup=None,cluster_evidence=()):
 identity=resolve(uri,bindings,cluster_evidence);cid=identity['characterId'];existing=identities.get(cid,{})
 names=[x['value'] for p,values in terms.items() if p==LABEL or local(p) in ['nameEnglish','nameOriginal','nameJapanese','nameHiragana','name','names','english','japanese','romji','chinese','aliases','alternateName','alternativeTitle'] for x in values if x['kind']=='Literal']
 types=[v['value'] for v in terms.get(TYPE,[])];provider,external=native(uri)
 if provider is None:
  origin=re.match(r'https?://mediagraph.link/(acdb|aclick|vndb|madb|anidb|jvmg)/',uri);provider=origin[1] if origin else 'unknown'
 anime=bool(existing.get('canonicalAppearances') or any(x.get('media')=='anime' for x in existing.get('appearances',[])))
 eligibility='confirmed_existing_anime_appearance' if anime else 'unknown_media_eligibility'
 facts=[];relationships=[];credits=[];metadata={};raw=[]
 for p,values in terms.items():
  field=local(p)
  for term in values:
   provenance={'uri':uri,'predicate':p,**term,'sourceProvider':'JVMG/'+(provider or 'structured'),'originFamily':'acdb-community' if provider=='acdb' else 'jvmg-'+str(provider),'license':'unresolved-per-graph','publicationAuthorized':False,'independentlyVerified':False}
   if field in ['characterTag','trait','traits','hasTrait'] and term['kind']=='NamedNode':
    props=lookup(term['value']) if lookup else {};labels=[x['value'] for x in props.get(LABEL,[])];label=next(iter(labels),term['value']);mapping=mappings.get(label.strip().lower())
    unsafe=unsuitable(label,props,lookup)
    raw.append({'sourceTagId':term['value'],'rawLabel':label,'definitionEvidence':props,'mapping':mapping,'unsuitableFlag':unsafe,'provenance':provenance})
    if not unsafe:
     facts.append({'traitId':mapping[0] if mapping else 'source.tag','value':mapping[1] if mapping else label,'rawLabel':label,'sourceTagId':term['value'],'context':{'animeId':None,'scope':'Source adaptation/context not established; especially VNDB traits must not transfer to anime automatically','form':None,'persistence':'unknown'},'trustStatus':'proposal','hold':'Graph-specific rights, factual/context and source-trust review required','sourceProvider':'JVMG/'+str(provider),'acquisition':'professor-supplied-rdf','license':'unresolved-per-graph','independentlyVerified':False,'publicationAuthorized':False,'provenance':provenance})
   elif field in ['left','right','relationType','parent','child','sibling','friend','rival','teacher','student','partner']:
    target=resolve(term['value'],bindings) if term['kind']=='NamedNode' else None
    relationships.append({'predicate':p,'target':term['value'],'targetResolution':target,'provenance':provenance,'adaptation':None,'temporal':None,'hold':'Resolve both endpoints and predicate semantics; no reverse/transitive inference'})
   elif field in ['voices','voiceActor','seiyuu','dubbedBy']:
    direct=p in ['http://mediagraph.link/acdb/ont/voices','http://mediagraph.link/aclick/ont/voices'] and native(term['value'])[0] is not None
    actor=uri if direct else term['value'];character=term['value'] if direct else uri
    actor_props=terms if actor==uri else (lookup(actor) if lookup else {})
    languages=[v['value'] for pred,vals in actor_props.items() if local(pred)=='language' for v in vals if v['kind']=='Literal']
    credits.append({'performerURI':actor,'characterURI':character,'characterResolution':resolve(character,bindings),'predicate':p,'language':None,'sourcePerformerLanguage':languages[0] if len(set(languages))==1 else None,'languageEvidenceScope':'performer metadata only; credit-specific performance language not supplied','languageEvidence':languages,'animeAdaptation':None,'provenance':provenance,'hold':'Directed source credit retained; specific anime adaptation remains unknown'})
   elif field in ['title','english','japanese','alternativeHeadline','datePublished','startDate','date','studio','productionCompany','director','genre','genres','episodeNumber','numberOfEpisodes','numberOfItems','isPartOf','hasPart','language','mediaType','source']:
    metadata.setdefault(field,[]).append(provenance)
   elif field in ['hairColor','hairColour','eyeColor','eyeColour','hairLength','gender','sex','species','occupation','weapon','birthday','height']:
    trait={'hairColor':'appearance.hair_color','hairColour':'appearance.hair_color','eyeColor':'appearance.eye_color','eyeColour':'appearance.eye_color','hairLength':'appearance.hair_length','gender':'identity.gender','sex':'identity.gender','species':'identity.species','occupation':'occupation.role','weapon':'equipment.weapon','birthday':'profile.birthday','height':'profile.height_cm'}[field]
    labels=[term['value']] if term['kind']=='Literal' else [x['value'] for x in (lookup(term['value']) if lookup else {}).get(LABEL,[]) if x['kind']=='Literal']
    definitions=json.loads((ROOT/'catalogue/traits/data/definitions.json').read_text(encoding='utf8'));definition=next(d for d in definitions if d['id']==trait)
    value=next((v.strip().lower().replace(' ','_') for v in labels if v.strip().lower().replace(' ','_') in definition['allowedValues']),None) if definition['allowedValues'] else (labels[0] if len(labels)==1 else None)
    if value is not None and isinstance(value,str) and definition['valueType']=='string':facts.append({'traitId':trait,'value':value,'rawField':p,'context':{'animeId':None,'scope':'Explicit structured source value; adaptation/form unresolved','form':None,'persistence':'unknown'},'trustStatus':'proposal','hold':'Scoped permissions, factual/context and editorial review required','provenance':provenance,'sourceProvider':'JVMG/'+provider,'license':'unresolved-per-graph','publicationAuthorized':False,'independentlyVerified':False})
    else:raw.append({'field':p,'term':term,'normalization':'unknown value or units; not inferred'})
   elif p!=TYPE and p!=LABEL:raw.append({'field':p,'term':term,'provenance':provenance,'normalization':'not inferred'})
 relation_fields={local(p):vals for p,vals in terms.items()}
 if all(x in relation_fields for x in ['left','right','relationType']):
  left=relation_fields['left'];right=relation_fields['right'];kind=relation_fields['relationType']
  if len(left)==len(right)==len(kind)==1:
   src=resolve(left[0]['value'],bindings);dst=resolve(right[0]['value'],bindings)
   labels={'Father of':'father','Mother of':'mother','Brother of':'brother','Sister of':'sister','Friend of':'friend','Rival of':'rival','Teacher of':'mentor','Student of':'student','lover of':'romantic_partner'}
   relationships.append({'subject':src,'target':dst,'rawType':kind[0]['value'],'normalizedTypeProposal':labels.get(kind[0]['value']),'direction':'left-to-right only','context':{'animeId':None,'temporal':None},'hold':'Rights, relationship interpretation and adaptation review pending'})
 for fact in facts:
  fact['originFamily']='acdb-community' if provider=='acdb' else 'jvmg-'+str(provider)
  fact['derivedSource']='JVMG';fact['sourceType']='structured_rdf_proposal'
 return {'format':'jvmg-knowledge-projection-v1','sourceURI':uri,'identity':identity,'names':list(dict.fromkeys(names)),'types':types,'animeEligibility':eligibility,'facts':facts,'relationships':relationships,'voiceCredits':credits,'sourceMetadata':metadata,'unmappedSourceFacts':raw,'canonicalIdentityChanged':False,'rights':'held','generationEligible':False,'publicExportEligible':False}
def authorize(grant,roster,graph_hashes):
 if grant.get('reviewer') not in roster.get('reviewers',[]) or not grant.get('reviewer'):raise ValueError('Actual configured maintainer required')
 if not grant.get('permissionReference') or grant.get('purpose')!='private-research-admission' or grant.get('publicRedistribution') is not False:raise ValueError('Explicit scoped permission reference required; no public grant inferred')
 if not grant.get('graphs') or any(graph_hashes.get(n)!=h for n,h in grant['graphs'].items()):raise ValueError('Grant does not pin the actual completed graph hashes')
 return True

def pending_relationship(item,terms,identities):
 for relation in item['relationships']:
  kind=relation.get('normalizedTypeProposal');subject=relation.get('subject',{}).get('characterId');target=relation.get('target',{}).get('characterId')
  if not kind or subject not in identities or target not in identities or subject==target:continue
  evidence=next((v for vals in terms.values() for v in vals if v.get('graph')),None)
  if evidence is None:continue
  family=kind in ['parent','mother','father','sibling','brother','sister','child','son','daughter','spouse']
  fact={'traitId':'relationship.family' if family else 'relationship.character','value':kind+'|'+target,'relationship':{'type':kind,'targetId':target},'context':{'animeId':None,'form':None,'persistence':'unknown','scope':'Explicit directed source relation; temporal/adaptation context unresolved'},'rawRelationshipType':relation['rawType'],'trustStatus':'proposal','hold':'Relationship semantics/context and actual maintainer review required','provenance':{'uri':item['sourceURI'],**evidence},'sourceProvider':'JVMG/ACDB','originFamily':'acdb-community','derivedSource':'JVMG','sourceType':'structured_rdf_proposal','license':'unresolved-per-graph','publicationAuthorized':False,'independentlyVerified':False}
  return identities[subject],[fact]
 return None,[]

def daily_uris(bindings,ids):
 result=set();wanted=set(ids)
 for key,cid in bindings.items():
  if cid in wanted:wanted.add(key)
 for key in wanted:
  match=re.fullmatch(r'(acdb|animeclick|vndb)-character-(\d+)',key)
  if match:result.add('http://mediagraph.link/'+{'acdb':'acdb','animeclick':'aclick','vndb':'vndb'}[match[1]]+'/character/'+match[2])
 return sorted(result)

def prepare(graph,source,uris,grant,roster,output,allow_empty=False):
 authorize(grant,roster,{n:d['sha256'] for n,d in graph.complete.items()})
 if not isinstance(uris,list) or (not uris and not allow_empty) or len(uris)>5000 or len(set(uris))!=len(uris):raise ValueError('Use 1–5000 unique explicitly identified resources per preparation')
 db=sqlite3.connect(pathlib.Path(source).resolve().as_uri()+'?mode=ro',uri=True)
 try:
  bindings=dict(db.execute('SELECT provider_id,character_id FROM bindings'))
  identities={cid:json.loads(body) for cid,body in db.execute('SELECT id,body FROM identities')}
 finally:db.close()
 mappings=json.loads(__import__('subprocess').check_output(['node','-e',"console.log(JSON.stringify({...require('./catalogue/traits/importer/profiles').tags,...require('./catalogue/jvmg/mappings.json')}))"],cwd=ROOT,encoding='utf8'))
 def scoped_terms(uri):
  return {p:values for p,raw in graph.terms(uri).items() if (values:=[v for v in raw if v['graph'] in grant['graphs']])}
 rows=[]
 for uri in uris:
  terms=scoped_terms(uri)
  if not terms:raise ValueError('Requested resource has no evidence in the granted graph scope')
  cluster=graph.cluster_evidence(uri);resources=[];cluster_ids=set()
  for resource in cluster['resources']:
   properties=scoped_terms(resource['uri'])
   if not properties:continue
   resources.append({'uri':resource['uri'],'properties':properties})
   for value in properties.get('http://mediagraph.link/jvmg/ont/sourceURI',[]):
    provider,id=native(value['value'])
    if provider:cluster_ids.add({'acdb':'acdb-character-','aclick':'animeclick-character-','vndb':'vndb-character-'}[provider]+id)
  cluster={'providerIds':sorted(cluster_ids),'resources':resources,'status':'Corroboration only; limited to explicitly granted graphs'}
  item=project(uri,terms,bindings,identities,mappings,scoped_terms,cluster['providerIds']);item['clusterResearch']=cluster
  def checked(value):
   if isinstance(value,dict):
    if 'graph' in value and 'graphSHA256' in value and grant['graphs'].get(value['graph'])!=value['graphSHA256']:raise ValueError('Scoped grant excludes copied source or ontology graph')
    for child in value.values():checked(child)
   elif isinstance(value,list):
    for child in value:checked(child)
  checked(terms);checked(item)
  identity=identities.get(item['identity']['characterId']);provider,external=native(uri)
  if provider is None:
   relationship_identity,relationship_facts=pending_relationship(item,terms,identities)
   rows.append({'providerId':'jvmg-resource-'+digest(uri),'identity':relationship_identity,'sourceIdentity':{'id':uri,'name':item['names'][0] if item['names'] else uri},'hold':None if relationship_identity else 'Structured non-character resource; metadata/relationship/voice review pending','facts':relationship_facts,'profile':{'jvmgProjection':item},'sourceRevision':digest(grant['graphs']),'license':grant.get('license','scoped-private-permission'),'acquisition':'professor-supplied-rdf','publicationAuthorized':False});continue
  rows.append({'providerId':'jvmg-'+provider+'-character-'+external,'identity':identity,'sourceIdentity':{'id':uri,'name':item['names'][0] if item['names'] else uri},'hold':None if identity else 'Canonical identity and anime eligibility require maintainer reconciliation','facts':item['facts'],'profile':{'jvmgProjection':item},'sourceRevision':digest(grant['graphs']),'license':grant.get('license','scoped-private-permission'),'acquisition':'professor-supplied-rdf','publicationAuthorized':False})
 output=pathlib.Path(output)
 prepared_at=datetime.datetime.now(datetime.timezone.utc).isoformat()
 if output.exists():
  with output.open(encoding='utf8') as existing:prepared_at=json.loads(existing.readline()).get('preparedAt',prepared_at)
 header={'preparedAt':prepared_at,'format':'anime-ascent-prepared-knowledge-v1','provider':'jvmg-reviewed-pending','total':len(rows),'graphHashes':grant['graphs'],'grantHash':digest(grant),'sourceRevision':digest(grant['graphs']),'recordsHash':digest(rows)};header['hash']=digest(header)
 output=pathlib.Path(output)
 if output.exists():
  with output.open(encoding='utf8') as existing:first=json.loads(existing.readline())
  with output.open(encoding='utf8') as existing:
   next(existing);stored_rows=[json.loads(line) for line in existing]
  if first!=header or digest(stored_rows)!=header['recordsHash']:raise ValueError('Prepared source changed; use a new output')
  return header
 with open(output,'x',encoding='utf8') as f:
  f.write(json.dumps(header,ensure_ascii=False)+'\n')
  for row in rows:f.write(json.dumps(row,ensure_ascii=False)+'\n')
 return header

def admit(prepared,source,backup_receipt,grant,roster,graph_hashes):
 """Only pending observations, through existing writer. Never source-trust promotion."""
 authorize(grant,roster,graph_hashes)
 receipt=json.loads(pathlib.Path(backup_receipt).read_text(encoding='utf8'))
 if receipt.get('integrity')!='ok' or pathlib.Path(source).resolve()!=pathlib.Path(receipt['source']).resolve() or filehash(receipt['backup'])!=receipt['backupSHA256']:raise ValueError('Verified matching original-store backup required')
 K=load('existing_knowledge',ROOT/'catalogue/traits/importer/knowledge-store.py');Daily=load('daily_ledger',ROOT/'catalogue/content/store.py')
 # Validate the complete proposed payload before any writer runs.
 header=None;checked_rows=[]
 with open(prepared,encoding='utf8') as f:
  header=json.loads(next(f))
  if header.get('provider')!='jvmg-reviewed-pending':raise ValueError('JVMG pending projection header required')
  for line in f:
   row=json.loads(line);checked_rows.append(row)
   if not row.get('providerId','').startswith('jvmg-'):raise ValueError('JVMG source namespace required')
   def check_provenance(value):
    if isinstance(value,dict):
     if 'graph' in value and 'graphSHA256' in value and grant['graphs'].get(value['graph'])!=value['graphSHA256']:raise ValueError('Uncleared provenance graph')
     for child in value.values():check_provenance(child)
    elif isinstance(value,list):
     for child in value:check_provenance(child)
   check_provenance(row)
   for fact in row.get('facts',[]):
    graph=fact.get('provenance',{}).get('graph')
    if graph not in grant['graphs'] or fact['provenance'].get('graphSHA256')!=grant['graphs'][graph] or fact.get('trustStatus') not in ['proposal','held'] or fact.get('publicationAuthorized') is not False:raise ValueError('Unlicensed graph or automatic trust/approval refused')
 if header.get('hash')!=digest({k:v for k,v in header.items() if k!='hash'}) or header.get('graphHashes')!=grant['graphs'] or header.get('grantHash')!=digest(grant) or len(checked_rows)!=header['total'] or digest(checked_rows)!=header.get('recordsHash'):raise ValueError('Prepared payload/grant integrity mismatch')
 check=sqlite3.connect(pathlib.Path(source).resolve().as_uri()+'?mode=ro',uri=True)
 try:
  prior=check.execute('SELECT total,processed FROM jobs WHERE id=?',(header['hash'],)).fetchone();stored=check.execute('SELECT value FROM meta WHERE key=?',('prepared:'+header['hash'],)).fetchone()
  if prior and prior[0]==prior[1] and stored and stored[0]==filehash(prepared):return {'complete':True,'processed':prior[1],'addedObservations':0,'idempotent':True,'publicationAuthorized':False}
 finally:check.close()
 if (pathlib.Path(str(source)+'-wal').exists() and pathlib.Path(str(source)+'-wal').stat().st_size) or pathlib.Path(source).stat().st_mtime_ns!=receipt['sourceMtimeNS']:raise ValueError('Store changed since checkpoint; make a fresh consistent backup')
 lock=str(source)+'.daily.lock';fd=os.open(lock,os.O_WRONLY|os.O_CREAT|os.O_EXCL,0o600);db=None
 try:
  db=sqlite3.connect(source,factory=Daily.Atomic,timeout=30);db.row_factory=sqlite3.Row;db.execute('BEGIN IMMEDIATE')
  if pathlib.Path(source).stat().st_mtime_ns!=receipt['sourceMtimeNS'] or (pathlib.Path(str(source)+'-wal').exists() and pathlib.Path(str(source)+'-wal').stat().st_size):raise ValueError('Concurrent store change after checkpoint; retry with fresh backup')
  with open(prepared,encoding='utf8') as f:
   next(f)
   for line in f:
    identity=json.loads(line).get('identity')
    if identity:
     old=db.execute('SELECT body FROM identities WHERE id=?',(identity['id'],)).fetchone()
     if not old or json.loads(old[0])!=identity:raise ValueError('Canonical admission is separate: preserve existing identity unchanged')
  result=K.ingest(db,str(prepared),500);K.validate(db);db.commit();return {**result,'sourceTrustPromoted':False,'publicationAuthorized':False}
 except Exception:
  if db is not None:db.rollback()
  raise
 finally:
  if db is not None:db.close()
  os.close(fd);os.unlink(lock)

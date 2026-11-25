"""Private derived research tables inside the EXISTING RDF staging store.

No connection to the authorized knowledge store is writable. No live definitions,
source policies, review histories, gameplay banks or public exports are modified.
"""
import argparse, collections, datetime, gzip, hashlib, json, os, pathlib, re, shutil, sqlite3, sys
from stage import private
from knowledge import native
from trait_mapping import assess_all, norm, INDEX, PROPOSED_INDEX
ROOT=pathlib.Path(__file__).resolve().parents[2]
TYPE='http://www.w3.org/1999/02/22-rdf-syntax-ns#type'
LABEL='http://www.w3.org/2000/01/rdf-schema#label'
def dump(x):return json.dumps(x,sort_keys=True,ensure_ascii=False,separators=(',',':'))
def digest(x):return hashlib.sha256(dump(x).encode('utf8')).hexdigest()
def filehash(p):
 h=hashlib.sha256()
 with open(p,'rb') as f:
  for b in iter(lambda:f.read(4*1024*1024),b''):h.update(b)
 return h.hexdigest()
def snapshot(path,data):
 path=private(path);raw=dump(data)+'\n'
 if path.exists():
  if path.read_text(encoding='utf8')!=raw:raise ValueError('Research snapshot changed; choose a new output')
 else:
  with path.open('x',encoding='utf8') as f:f.write(raw)
def ro(file):
 file=pathlib.Path(file).resolve()
 if not file.is_file():raise ValueError('Existing read-only input required')
 return sqlite3.connect(file.as_uri()+'?mode=ro',uri=True)
def schema(db):
 db.executescript('''
 CREATE TABLE IF NOT EXISTS research_build(id TEXT PRIMARY KEY,status TEXT NOT NULL,body TEXT NOT NULL);
 CREATE TABLE IF NOT EXISTS research_definition(build TEXT,uri TEXT,label TEXT,category TEXT,disposition TEXT,useful INTEGER,trait TEXT,value TEXT,body TEXT,PRIMARY KEY(build,uri));
 CREATE TABLE IF NOT EXISTS research_alias(build TEXT,definition TEXT,term TEXT,kind TEXT,PRIMARY KEY(build,definition,term,kind));
 CREATE INDEX IF NOT EXISTS research_alias_lookup ON research_alias(build,term,definition);
 CREATE TABLE IF NOT EXISTS research_character(build TEXT,uri TEXT,canonical_id TEXT,identity_status TEXT,body TEXT,PRIMARY KEY(build,uri));
 CREATE INDEX IF NOT EXISTS research_canonical_lookup ON research_character(build,canonical_id,uri);
 CREATE TABLE IF NOT EXISTS research_name(build TEXT,character TEXT,term TEXT,display TEXT,kind TEXT,PRIMARY KEY(build,character,term,kind));
 CREATE INDEX IF NOT EXISTS research_name_lookup ON research_name(build,term,character);
 CREATE TABLE IF NOT EXISTS research_anime(build TEXT,character TEXT,id TEXT,title TEXT,term TEXT,body TEXT,PRIMARY KEY(build,character,id,title));
 CREATE INDEX IF NOT EXISTS research_anime_lookup ON research_anime(build,term,character);
 CREATE TABLE IF NOT EXISTS research_work(build TEXT,character TEXT,uri TEXT,graph TEXT,predicate TEXT,PRIMARY KEY(build,character,uri,graph,predicate));
 CREATE TABLE IF NOT EXISTS research_claim(build TEXT,key TEXT,canonical_id TEXT,trait TEXT,value TEXT,existing_equivalent INTEGER,PRIMARY KEY(build,key));
 CREATE INDEX IF NOT EXISTS research_claim_lookup ON research_claim(build,trait,value,canonical_id);
 CREATE TABLE IF NOT EXISTS research_edge(build TEXT,definition TEXT,character TEXT,graph TEXT,predicate TEXT,ordinal INTEGER,claim_key TEXT,PRIMARY KEY(build,definition,character,graph,predicate));
 CREATE INDEX IF NOT EXISTS research_edge_character ON research_edge(build,character,definition);
 ''')
def build(stage,inventory,knowledge,positive,output,reuse=None):
 stage=private(stage);inventory=private(inventory);positive=private(positive);output=private(output);output.mkdir(parents=True,exist_ok=True)
 if (stage.parent/'stage.lock').exists():raise ValueError('RDF writer active; finish staging before derived research')
 if pathlib.Path(knowledge).resolve()==stage:raise ValueError('Research must use staging, never the knowledge database')
 # Require the existing staging schema before any writable connection; do not bootstrap a new store.
 check=ro(stage)
 try:
  for t in ['graph','triple']:check.execute('SELECT 1 FROM '+t+' LIMIT 1')
 finally:check.close()
 data=json.loads(inventory.read_text(encoding='utf8'));decisions,extensions=assess_all(data['tags']);by={d['sourceURI']:d for d in decisions}
 source=ro(knowledge)
 try:
  bindings=dict(source.execute('SELECT provider_id,character_id FROM bindings'));identities={cid:json.loads(body) for cid,body in source.execute('SELECT id,body FROM identities')}
 finally:source.close()
 existing=set()
 with gzip.open(positive,'rt',encoding='utf8') as f:
  for line in f:
   cid,t,v=json.loads(line);existing.add((cid,t,dump(v)))
 evidence_source=ro(stage)
 try:
  graphs={n:h for n,h in evidence_source.execute('SELECT name,sha FROM graph WHERE complete=1')}
  for d in decisions:d['sourceDefinitionEvidence']=[{'graph':g,'sha256':graphs[g]} for g, in evidence_source.execute('SELECT DISTINCT graph FROM triple INDEXED BY subject_idx WHERE s=?',(d['sourceURI'],)) if g in graphs]
 finally:evidence_source.close()
 manifest={'sourceProjectionBuild':reuse,'sourceGraphs':graphs,'format':'jvmg-held-trait-research-v1','archiveSHA256':data['archiveSHA256'],'inventorySHA256':filehash(inventory),'policySHA256':filehash(pathlib.Path(__file__).with_name('trait_mapping.py')),'engineSHA256':filehash(__file__),'identitySnapshot':digest([bindings,identities]),'positiveSHA256':filehash(positive),'decisionsHash':digest(decisions),'schemaHash':digest(extensions),'permission':'held-per-graph','factualApproval':False,'publicationAuthorized':False}
 build_id=digest(manifest);lock=stage.parent/'stage.lock';fd=os.open(lock,os.O_CREAT|os.O_EXCL|os.O_WRONLY,0o600);db=None
 try:
  db=sqlite3.connect(stage,timeout=60);db.execute('PRAGMA foreign_keys=ON');db.execute('PRAGMA synchronous=FULL');db.execute('PRAGMA cache_size=-65536');db.create_function('research_norm',1,norm,deterministic=True);schema(db)
  prior=db.execute('SELECT status,body FROM research_build WHERE id=?',(build_id,)).fetchone()
  if prior:
   if prior[0]!='complete':raise ValueError('Incomplete derived build; preserve checkpoint and inspect it')
   result=json.loads(prior[1]);snapshot(output/'summary.json',result);snapshot(output/'definitions.json',decisions);snapshot(output/'schema-proposals.json',extensions);return {**result,'idempotent':True}
  if reuse:
   prior_source=db.execute('SELECT body FROM research_build WHERE id=? AND status=?',(reuse,'complete')).fetchone()
   if not prior_source:raise ValueError('Source reuse requires an explicit completed held build')
   cached=json.loads(prior_source[0])
   if any(cached.get(k)!=manifest[k] for k in ['archiveSHA256','inventorySHA256','identitySnapshot','sourceGraphs']):raise ValueError('Source reuse snapshot mismatch; no stale identities/graphs reused')
  if shutil.disk_usage(stage.parent).free<5*1024**3:raise ValueError('At least 5 GiB working space required for derived research')
  graphs={n:h for n,h in db.execute('SELECT name,sha FROM graph WHERE complete=1')};subjects=set().union(*(set(t['sourceCharacterURIs']) for t in data['tags']));expected_counts={t['sourceURI']:t['rawAssociationCount'] for t in data['tags']};data['tags']=None
  db.execute('BEGIN IMMEDIATE');db.execute('INSERT INTO research_build VALUES(?,?,?)',(build_id,'building',dump(manifest)))
  for d in decisions:
   db.execute('INSERT INTO research_definition VALUES(?,?,?,?,?,?,?,?,?)',(build_id,d['sourceURI'],d['nativeLabel'] if 'nativeLabel' in d else d['inspectedDefinition']['nativeLabel'],d['category'],d['disposition'],int(d['useful']),d['trait'],dump(d['value']) if d['trait'] else None,dump(d)))
   aliases={(d['inspectedDefinition']['nativeLabel'],'native_label'),(d['inspectedDefinition']['nativeName'],'source_name')};aliases.update((a,'source_documented_alias_not_approved') for a in d['inspectedDefinition']['nativeAliases'])
   for parent in d['inspectedDefinition']['parents']:
    ancestor=by.get(parent)
    if ancestor and ancestor['disposition']!='held_definition':aliases.add((ancestor['inspectedDefinition']['nativeName'],'source_ancestor_query_only'))
   if d['trait']:
    aliases.add((d['value'].replace('_',' '),'proposed_canonical_concept'))
   for term,kind in sorted(aliases):db.execute('INSERT OR IGNORE INTO research_alias VALUES(?,?,?,?)',(build_id,d['sourceURI'],norm(term),kind))
  def character(uri):
   provider,external=native(uri);key={'acdb':'acdb-character-','vndb':'vndb-character-','aclick':'animeclick-character-'}.get(provider,'')+str(external);cid=bindings.get(key);c=identities.get(cid,{})
   body={'sourceCharacterId':key,'sourceCharacterURI':uri,'canonicalId':cid,'canonicalName':c.get('name'),'identityStatus':'secure_existing_binding' if cid else 'unresolved_source_identity','newAnimeCharacter':False,'sourceMedium':'visual_novel' if provider=='vndb' else 'mixed_media','adaptationEligibility':'not_confirmed','permissionStatus':'held-per-graph','factualReviewStatus':'not_verified'}
   db.execute('INSERT INTO research_character VALUES(?,?,?,?,?)',(build_id,uri,cid,body['identityStatus'],dump(body)))
   for name in [c.get('name'),*c.get('aliases',[])]:
    if name:db.execute('INSERT OR IGNORE INTO research_name VALUES(?,?,?,?,?)',(build_id,uri,norm(name),name,'existing_canonical_metadata'))
   for a in c.get('appearances',[]):
    if a.get('media')!='anime':continue
    external=a.get('externalTitleId');aid=(str(external) if '-' in str(external) else 'acdb-anime-'+str(external)) if external else 'wikidata-anime-'+str(a['wikidataId']) if a.get('wikidataId') else 'unknown';title=a.get('title') or aid
    db.execute('INSERT OR IGNORE INTO research_anime VALUES(?,?,?,?,?,?)',(build_id,uri,aid,title,norm(title),dump({'association':a,'basis':'existing identity appearance only; not this trait in that anime','traitEligibility':False})))
   for a in c.get('canonicalAppearances',[]):
    aid=a['animeId'];db.execute('INSERT OR IGNORE INTO research_anime VALUES(?,?,?,?,?,?)',(build_id,uri,aid,aid,norm(aid),dump({'association':a,'basis':'existing canonical appearance; trait adaptation unknown','traitEligibility':False})))
   return cid
  if reuse:
   db.execute('INSERT INTO research_character SELECT ?,uri,canonical_id,identity_status,body FROM research_character WHERE build=?',(build_id,reuse))
   canonical=dict(db.execute('SELECT uri,canonical_id FROM research_character WHERE build=?',(build_id,)))
   if set(canonical)!=subjects:raise ValueError('Cached character set differs from inventory')
   for uri,cid in canonical.items():
    provider,external=native(uri);key={'acdb':'acdb-character-','vndb':'vndb-character-','aclick':'animeclick-character-'}.get(provider,'')+str(external)
    if cid!=bindings.get(key):raise ValueError('Cached stable identity differs from current snapshot')
  else:canonical={uri:character(uri) for uri in sorted(subjects)}
  identities.clear();bindings.clear()
  print('Definitions assessed: '+str(len(decisions))+'; source characters: '+str(len(subjects)),file=sys.stderr,flush=True)
  # Read actual source edges, preserving their exact graph, predicate and ordinal.
  edge_count=0
  predicates=['http://mediagraph.link/acdb/ont/characterTag','http://mediagraph.link/vndb/ont/trait']
  for predicate in predicates:
   cursor=db.execute('SELECT character,definition,graph,ordinal FROM research_edge WHERE build=? AND predicate=?',(reuse,predicate)) if reuse else db.execute('SELECT s,o,graph,n FROM triple INDEXED BY predicate_idx WHERE p=? AND kind=?',(predicate,'NamedNode'))
   for uri,tag,g,ordinal in cursor:
    if g not in graphs or tag not in by or uri not in subjects:continue
    d=by[tag];cid=canonical[uri];trait=d['trait'] or 'source.tag';v=d['value'] if d['trait'] else tag;claim=None
    if cid and d['disposition']!='held_definition':
     claim=digest([cid,trait,v]);db.execute('INSERT OR IGNORE INTO research_claim VALUES(?,?,?,?,?,?)',(build_id,claim,cid,trait,dump(v),int((cid,trait,dump(v)) in existing)))
    db.execute('INSERT OR IGNORE INTO research_edge VALUES(?,?,?,?,?,?,?)',(build_id,tag,uri,g,predicate,ordinal,claim));edge_count+=1
    if edge_count%50000==0:
     print('Source associations processed: '+str(edge_count),file=sys.stderr,flush=True)
     if shutil.disk_usage(stage.parent).free<2*1024**3:raise ValueError('Disk safety floor reached; new derived build rolls back')
  pair_counts=dict(db.execute('SELECT definition,count(DISTINCT character) FROM research_edge WHERE build=? GROUP BY definition',(build_id,)))
  if any(pair_counts.get(uri,0)!=n for uri,n in expected_counts.items()):raise ValueError('Actual source-edge counts do not match the complete inventory; no complete build issued')
  print('Validating exact counts and collecting source names/work context',file=sys.stderr,flush=True)
  # Names and work relationships remain source-backed metadata, not canonical identity updates.
  if reuse:
   for table,columns in [('research_name','character,term,display,kind'),('research_anime','character,id,title,term,body'),('research_work','character,uri,graph,predicate')]:
    db.execute('INSERT INTO '+table+' SELECT ?,'+columns+' FROM '+table+' WHERE build=?',(build_id,reuse))
  else:
   name_predicates=[LABEL,'http://mediagraph.link/acdb/ont/romji','http://mediagraph.link/acdb/ont/japanese','http://mediagraph.link/acdb/ont/chinese','http://mediagraph.link/vndb/ont/name','http://mediagraph.link/vndb/ont/original','http://mediagraph.link/vndb/ont/alias']
   for predicate in name_predicates:
    db.execute('''INSERT OR IGNORE INTO research_name SELECT ?,t.s,research_norm(t.o),t.o,'source_label_or_alias' FROM research_character c CROSS JOIN triple t INDEXED BY subject_idx ON t.s=c.uri JOIN graph g ON g.name=t.graph AND g.complete=1 WHERE c.build=? AND t.p=? AND t.kind='Literal' ''',(build_id,build_id,predicate))
   for predicate in ['http://mediagraph.link/acdb/ont/appearsIn','http://mediagraph.link/vndb/ont/appearsIn','http://mediagraph.link/vndb/ont/primaryIn','http://mediagraph.link/vndb/ont/mainIn','http://mediagraph.link/vndb/ont/sideIn']:
    db.execute('''INSERT OR IGNORE INTO research_work SELECT ?,t.s,t.o,t.graph,t.p FROM research_character c CROSS JOIN triple t INDEXED BY subject_idx ON t.s=c.uri JOIN graph g ON g.name=t.graph AND g.complete=1 WHERE c.build=? AND t.p=? AND t.kind='NamedNode' ''',(build_id,build_id,predicate))
  print('Computing per-definition and canonical coverage',file=sys.stderr,flush=True)
  coverage=[]
  for uri,label,category,disposition,useful,trait,v in db.execute('SELECT uri,label,category,disposition,useful,trait,value FROM research_definition WHERE build=? ORDER BY uri',(build_id,)):
   r=db.execute('''SELECT count(DISTINCT e.character),count(DISTINCT c.canonical_id),count(DISTINCT CASE WHEN c.canonical_id IS NULL THEN e.character END),count(DISTINCT CASE WHEN EXISTS(SELECT 1 FROM research_anime a WHERE a.build=e.build AND a.character=e.character) THEN c.canonical_id END) FROM research_edge e JOIN research_character c ON c.build=e.build AND c.uri=e.character WHERE e.build=? AND e.definition=?''',(build_id,uri)).fetchone()
   coverage.append({'sourceTrait':uri,'label':label,'category':category,'disposition':disposition,'useful':bool(useful),'canonicalTrait':trait,'canonicalValue':json.loads(v) if v else None,'rawDistinctSourceCharacters':r[0],'secureCanonicalMatches':r[1],'unresolvedSourceIdentities':r[2],'existingAnimeIdentityLeads':r[3],'confirmedTraitAnimeEligibility':0,'rightsHeldSourceAssociations':r[0],'authorizedAnswers':0})
  per_value=[]
  for trait,v,n,nnew in db.execute('SELECT trait,value,count(DISTINCT canonical_id),count(DISTINCT CASE WHEN existing_equivalent=0 THEN canonical_id END) FROM research_claim WHERE build=? GROUP BY trait,value ORDER BY trait,value',(build_id,)):
   per_value.append({'trait':trait,'value':json.loads(v),'secureCanonicalCandidates':n,'potentialNewCanonicalCandidates':nnew,'authorizedAnswers':0})
  disposition=collections.Counter(d['disposition'] for d in decisions);new_claims=db.execute('SELECT count(*),count(DISTINCT canonical_id) FROM research_claim WHERE build=? AND existing_equivalent=0 AND trait!=?',(build_id,'source.tag')).fetchone();equivalent=db.execute('SELECT count(*) FROM research_claim WHERE build=? AND existing_equivalent=1',(build_id,)).fetchone()[0]
  thresholds={str(n):{'canonicalMappedConceptsWithSecureIdentityCandidates':sum(x['trait']!='source.tag' and x['secureCanonicalCandidates']>=n for x in per_value),'usefulNativeDefinitionsWithAnimeIdentityLeads':sum(x['useful'] and x['canonicalTrait'] is None and x['existingAnimeIdentityLeads']>=n for x in coverage),'authorizedQuestionAnswerPools':0} for n in [100,250,500,1000]}
  result={**manifest,'buildId':build_id,'status':'complete_private_held_research','definitionsAssessed':len(decisions),'definitionDispositions':dict(disposition),'mappedDefinitions':sum(d['trait'] is not None for d in decisions),'schemaDefinitionsActive':len(INDEX),'schemaDefinitionsProposedTotal':len(PROPOSED_INDEX),'proposedNewDefinitions':len(extensions['newDefinitions']),'proposedControlledValues':sum(map(len,extensions['controlledValues'].values())),'usefulSearchableNativeTags':sum(d['trait'] is None and d['useful'] for d in decisions),'contextRequiredNativeTags':sum(d['disposition']=='native_context_required' for d in decisions),'remainingUnassessedDefinitions':0,'sourceAssociationsProcessed':sum(pair_counts.values()),'sourceEvidenceEdges':edge_count,'sourceCharacterRecordsProcessed':len(subjects),'secureCanonicalCharacters':len({x for x in canonical.values() if x}),'unresolvedSourceCharacters':sum(x is None for x in canonical.values()),'deduplicatedCanonicalResearchClaims':db.execute('SELECT count(*) FROM research_claim WHERE build=?',(build_id,)).fetchone()[0],'potentialNewMappedTriples':new_claims[0],'charactersWithAdditionalMappedProposals':new_claims[1],'existingEquivalentCanonicalTriples':equivalent,'potentialConceptThresholds':thresholds,'coverageByDefinition':coverage,'coverageByCanonicalValue':per_value,'newIdentitiesAdmitted':0,'newTrustedClaims':0,'approvedClaims':0,'publishedAnswers':0,'knowledgeChanged':False,'createdAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'limitations':['Mappings and schema extensions are proposals, not human factual verification','Most source definitions provide labels/hierarchy, not explanatory text','Anime-linked identity is not anime-adaptation eligibility of the trait','No private/game/commercial/public source permission inferred','Multiple same-source-record traits may still concern different forms/outfits/periods']}
  db.execute('UPDATE research_build SET status=?,body=? WHERE id=?',('complete',dump(result),build_id));db.commit()
  snapshot(output/'summary.json',result);snapshot(output/'definitions.json',decisions);snapshot(output/'schema-proposals.json',extensions)
  return result
 except BaseException:
  if db is not None:db.rollback()
  raise
 finally:
  if db is not None:db.close()
  os.close(fd);lock.unlink()
def query(stage,build_id,spec,limit=30):
 stage=private(stage);db=ro(stage);db.row_factory=sqlite3.Row
 try:
  if not isinstance(limit,int) or not 1<=limit<=500:raise ValueError('limit must be 1–500')
  found=db.execute('SELECT body FROM research_build WHERE id=? AND status=?',(build_id,'complete')).fetchone()
  if not found:raise ValueError('Select an explicit completed research build')
  manifest=json.loads(found[0]);current=dict(db.execute('SELECT name,sha FROM graph WHERE complete=1'))
  if any(current.get(n)!=h for n,h in manifest['sourceGraphs'].items()):raise ValueError('Staged source graph changed since this research build')
  if not isinstance(spec,dict) or set(spec)-{'all','anime','character','requireKnownContext'}:raise ValueError('Unsupported research query fields')
  if 'requireKnownContext' in spec and not isinstance(spec['requireKnownContext'],bool):raise ValueError('requireKnownContext must be boolean')
  clauses=spec.get('all')
  if not isinstance(clauses,list) or not clauses or len(clauses)>12:raise ValueError('Use 1–12 positive research conditions')
  args=[build_id];where=[]
  for i,c in enumerate(clauses):
   if not isinstance(c,dict) or set(c)-{'trait','value','tag','synonym','related','category'}:raise ValueError('Unsupported research condition')
   if not any(k in c for k in ['trait','tag','synonym','related','category']):raise ValueError('Condition needs trait, tag, synonym, related or category')
   sql='''EXISTS(SELECT 1 FROM research_edge e JOIN research_definition d ON d.build=e.build AND d.uri=e.definition WHERE e.build=c.build AND e.character=c.uri AND d.disposition!='held_definition' '''
   if 'trait' in c:sql+=' AND COALESCE(d.trait,\'source.tag\')=?';args.append(c['trait'])
   if 'value' in c:sql+=' AND COALESCE(d.value,json_quote(d.uri))=?';args.append(dump(c['value']))
   if 'category' in c:sql+=' AND d.category=?';args.append(c['category'])
   for kind in ['tag','synonym','related']:
    if kind not in c:continue
    term=norm(c[kind])
    if kind=='related':
     # Category-only ancestors are query concepts, not asserted character facts.
     sql+=''' AND d.uri IN (SELECT r.uri FROM research_definition r WHERE r.build=? AND (r.uri=? OR EXISTS(SELECT 1 FROM research_alias a WHERE a.build=r.build AND a.definition=r.uri AND a.term=?) OR EXISTS(SELECT 1 FROM json_each(r.body,'$.inspectedDefinition.parents') j JOIN research_alias a ON a.build=r.build AND a.definition=j.value WHERE a.term=?)))''';args.extend([build_id,c[kind],term,term])
    else:
     sql+=" AND (d.uri=? OR EXISTS(SELECT 1 FROM research_alias a WHERE a.build=d.build AND a.definition=d.uri AND a.term=? AND a.kind!='source_ancestor_query_only'))";args.extend([c[kind],term])
   where.append(sql+')')
  if spec.get('character'):
   where.append("(c.uri=? OR c.canonical_id=? OR json_extract(c.body,'$.sourceCharacterId')=? OR EXISTS(SELECT 1 FROM research_name n WHERE n.build=c.build AND n.character=c.uri AND n.term=?))");args.extend([spec['character'],spec['character'],spec['character'],norm(spec['character'])])
  if spec.get('anime'):
   where.append('EXISTS(SELECT 1 FROM research_anime a WHERE a.build=c.build AND a.character=c.uri AND (a.id=? OR a.term=?))');args.extend([spec['anime'],norm(spec['anime'])])
  if spec.get('requireKnownContext'):where.append("json_extract(c.body,'$.adaptationEligibility')='confirmed'")
  sql='SELECT c.* FROM research_character c WHERE c.build=? AND '+' AND '.join(where)+' ORDER BY c.uri';totals=db.execute('SELECT count(*),count(DISTINCT canonical_id),sum(CASE WHEN canonical_id IS NULL THEN 1 ELSE 0 END) FROM ('+sql+')',args).fetchone();count=totals[0];rows=db.execute(sql+' LIMIT ?',args+[limit]).fetchall();out=[]
  for row in rows:
   body=json.loads(row['body']);body['names']=[x[0] for x in db.execute('SELECT DISTINCT display FROM research_name WHERE build=? AND character=? ORDER BY display',(build_id,row['uri']))];body['animeAssociations']=[json.loads(x[0]) for x in db.execute('SELECT body FROM research_anime WHERE build=? AND character=?',(build_id,row['uri']))];body['sourceWorkLinks']=[dict(x) for x in db.execute('SELECT uri,graph,predicate FROM research_work WHERE build=? AND character=?',(build_id,row['uri']))]
   body['claims']=[{'sourceTraitId':x['uri'],'originalSourceLabel':x['label'],'canonicalTrait':x['trait'],'canonicalValue':json.loads(x['value']) if x['value'] else None,'mappingStatus':x['disposition'],'definition':json.loads(x['body']),'evidence':{'graph':x['graph'],'graphSHA256':manifest['sourceGraphs'][x['graph']],'predicate':x['predicate'],'subject':row['uri'],'object':x['uri'],'ordinal':x['ordinal']},'existingEquivalent':bool(x['existing_equivalent'])} for x in db.execute('''SELECT d.*,e.graph,e.predicate,e.ordinal,k.existing_equivalent FROM research_edge e JOIN research_definition d ON d.build=e.build AND d.uri=e.definition LEFT JOIN research_claim k ON k.build=e.build AND k.key=e.claim_key WHERE e.build=? AND e.character=? AND d.disposition!='held_definition' ORDER BY d.uri''',(build_id,row['uri']))];body['compatibility']='same native source character record only; simultaneous form/outfit/period not established';out.append(body)
  return {'buildId':build_id,'totalSourceRecords':count,'secureCanonicalMatches':totals[1],'unresolvedSourceRecords':totals[2] or 0,'returned':len(out),'researchOnly':True,'permission':'held-per-graph','approved':False,'authorizedAnswers':0,'knownContextRequired':bool(spec.get('requireKnownContext')),'synonymPolicy':'Documented source aliases / proposed canonical concepts only; not maintainer-approved equivalence or factual verification','results':out}
 finally:db.close()
def manifest_graph(stage,name,db):
 r=db.execute('SELECT sha FROM graph WHERE name=? AND complete=1',(name,)).fetchone();return r[0] if r else None
if __name__=='__main__':
 p=argparse.ArgumentParser();sub=p.add_subparsers(dest='command',required=True);b=sub.add_parser('build');b.add_argument('--stage',required=True);b.add_argument('--inventory',required=True);b.add_argument('--knowledge',required=True);b.add_argument('--positive',required=True);b.add_argument('--output',required=True);b.add_argument('--reuse-source-build');q=sub.add_parser('query');q.add_argument('--stage',required=True);q.add_argument('--build',required=True);q.add_argument('--spec',required=True);q.add_argument('--limit',type=int,default=30);q.add_argument('--output');a=p.parse_args()
 # Preserve Unicode names even through Windows pipes using a legacy code page.
 for stream in [sys.stdout,sys.stderr]:
  if hasattr(stream,'reconfigure'):stream.reconfigure(encoding='utf-8',errors='strict')
 try:
  if a.command=='build':r=build(a.stage,a.inventory,a.knowledge,a.positive,a.output,a.reuse_source_build);print(dump({k:v for k,v in r.items() if not isinstance(v,list)}))
  else:
   r=query(a.stage,a.build,json.loads(private(a.spec).read_text(encoding='utf8')),a.limit)
   if a.output:snapshot(a.output,r);print(dump({'output':a.output,'totalSourceRecords':r['totalSourceRecords'],'returned':r['returned'],'authorizedAnswers':0}))
   else:print(dump(r))
 except Exception as e:print(str(e),file=sys.stderr);sys.exit(1)

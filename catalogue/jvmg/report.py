"""Read-only opportunity inventory from completed staged graphs; no admission/approval."""
import argparse,json,pathlib,sqlite3,re,unicodedata,datetime,subprocess,gzip,sys,os
TYPE='http://www.w3.org/1999/02/22-rdf-syntax-ns#type';LABEL='http://www.w3.org/2000/01/rdf-schema#label'
def report(stage,knowledge=None,overlap=None):
 stage=pathlib.Path(stage).resolve();manifest=json.loads((stage/'progress.json').read_text(encoding='utf8'));db=sqlite3.connect((stage/'staging.sqlite').as_uri()+'?mode=ro',uri=True)
 try:
  graphs=[{'name':r[0],'sha256':r[1],'bytes':r[2],'complete':r[3]==1,'quarantined':r[3]==-1,**json.loads(r[4])} for r in db.execute('SELECT name,sha,bytes,complete,stats FROM graph')]
  definitions=[]
  for graph in graphs:
   if graph['complete'] and any(t.endswith('/CharacterTag') or t.endswith('/Trait') for t in graph.get('types',{})):
    for typ in graph.get('types',{}):
     if typ.endswith('/CharacterTag') or typ.endswith('/Trait'):
      definitions.extend(db.execute('SELECT DISTINCT s,o FROM triple INDEXED BY predicate_idx WHERE p=? AND o=? AND graph=?',(TYPE,typ,graph['name'])).fetchall())
  bindings={};known_anime=set()
  if knowledge:
   source=sqlite3.connect(pathlib.Path(knowledge).resolve().as_uri()+'?mode=ro',uri=True)
   try:
    bindings=dict(source.execute('SELECT provider_id,character_id FROM bindings'))
    for cid,body in source.execute('SELECT id,body FROM identities'):
     c=json.loads(body)
     if c.get('canonicalAppearances') or any(a.get('media')=='anime' for a in c.get('appearances',[])):known_anime.add(cid)
   finally:source.close()
  positive=set();by_character_trait={}
  if overlap:
   with gzip.open(overlap,'rt',encoding='utf8') as stream:
    for line in stream:
     cid,trait,value=json.loads(line);key=json.dumps(value,sort_keys=True,ensure_ascii=False);positive.add((cid,trait,key));by_character_trait.setdefault((cid,trait),set()).add(key)
  associations_by_tag={uri:set() for uri,typ in definitions}
  print('Definitions loaded: '+str(len(definitions)),file=sys.stderr,flush=True)
  for graph in graphs:
   if not graph['complete']:continue
   predicates=[p for p in graph.get('predicates',{}) if 'tag' in p.lower() or 'trait' in p.lower()]
   if not predicates:continue
   print('Scanning tag edges: '+graph['name'],file=sys.stderr,flush=True)
   sql='SELECT s,o FROM triple INDEXED BY sqlite_autoindex_triple_1 WHERE graph=? AND p IN ('+','.join('?' for _ in predicates)+') AND kind=?'
   for subject,target in db.execute(sql,[graph['name'],*predicates,'NamedNode']):
    if target in associations_by_tag and re.search(r'/(acdb|vndb)/character/',subject):associations_by_tag[target].add(subject)
  print('Source edges complete; building per-trait inventory',file=sys.stderr,flush=True)
  mapping=json.loads(subprocess.check_output(['node','-e',"console.log(JSON.stringify({...require('./catalogue/traits/importer/profiles').tags,...require('./catalogue/jvmg/mappings.json')}))"],cwd=pathlib.Path(__file__).resolve().parents[2],encoding='utf8'));tags=[]
  for index,(uri,typ) in enumerate(definitions):
   if index%500==0:print('Inventory rows: '+str(index)+'/'+str(len(definitions)),file=sys.stderr,flush=True)
   label=[{'text':x[0],'language':x[1]} for x in db.execute('SELECT DISTINCT o,lang FROM triple INDEXED BY subject_idx WHERE s=? AND p=?',(uri,LABEL))]
   # Only explicit character-origin tag edges count. Parent/hierarchy and ontology references do not.
   chars=associations_by_tag[uri];matched={bindings['acdb-character-'+s.rsplit('/',1)[-1]] for s in chars if '/acdb/character/' in s and 'acdb-character-'+s.rsplit('/',1)[-1] in bindings}
   normalized=unicodedata.normalize('NFKC',next((x['text'] for x in label if x['language']=='en'),label[0]['text'] if label else '')).strip().lower()
   unsafe=bool(re.search(json.loads((pathlib.Path(__file__).parent/'source-policy.json').read_text(encoding='utf8'))['unsuitableLabelPattern'],normalized))
   mapped=mapping.get(normalized);valueKey=json.dumps(mapped[1],sort_keys=True,ensure_ascii=False) if mapped else None
   duplicate=sum((cid,mapped[0],valueKey) in positive for cid in matched) if mapped and overlap else None
   conflicts=sum(bool(by_character_trait.get((cid,mapped[0]),set())-{valueKey}) for cid in matched) if mapped and overlap and mapped[0] in ['appearance.hair_color','appearance.eye_color','identity.species','appearance.hair_length'] else None
   tags.append({'definitionSources':[{'graph':g['name'],'sha256':g['sha256']} for g in graphs if g['complete'] and typ in g.get('types',{})],'originalProviderId':uri.rsplit('/',1)[-1],'sourceCharacterURIs':sorted(chars),'unresolvedSourceCharacterCount':len(chars)-len(matched),'genuinelyNewIdentitiesConfirmed':0,'existingPositiveTripleOverlap':duplicate,'potentialNewMatchedTripleProposals':len(matched)-duplicate if duplicate is not None else None,'potentialConflictingCharacterClaims':conflicts,'pendingSourceCharacterAssociations':len(chars),'sourcePermissions':json.loads((pathlib.Path(__file__).parent/'source-policy.json').read_text(encoding='utf8'))['sources']['acdb' if '/acdb/' in uri else 'vndb'],'contextualEligibility':'pending: actual anime adaptation and trait context must be established; identity appearance alone is insufficient','sourceURI':uri,'type':typ,'labels':label,'definitionProperties':[{'predicate':x[0],'value':x[1],'termType':x[2],'language':x[3],'datatype':x[4]} for x in db.execute('SELECT DISTINCT p,o,kind,lang,datatype FROM triple INDEXED BY subject_idx WHERE s=?',(uri,))],'normalizedLabel':normalized,'rawAssociationCount':len(chars),'matchedExistingCanonicalIdentities':len(matched),'existingDatabaseAnimeLinkedIdentities':len(matched&known_anime),'animeEligibilityBasis':'Existing store appearance evidence only; no assertion that a VN-specific trait applies in an anime adaptation','canonicalTraitMapping':mapping.get(normalized),'mappingReview':'existing exact-label proposal; factual/context review pending','unsuitableOrSensitiveFlag':unsafe,'rights':'held; source/graph use permission unresolved or noncommercial','generationEligible':0,'publicExportEligible':0,'newIdentitiesAdmitted':0,'newTrustedTraits':0,'unknownCounts':['unresolved identities','adaptation-specific trait eligibility','duplicate canonical trait assignments','conflicting canonical traits']})
  by_uri={t['sourceURI']:t for t in tags};changed=True
  while changed:
   changed=False
   for tag in tags:
    parents=[p['value'] for p in tag['definitionProperties'] if p['predicate'].endswith('traitParent')]
    tag['parentTraitURIs']=parents
    if not tag['unsuitableOrSensitiveFlag'] and any(by_uri.get(parent,{}).get('unsuitableOrSensitiveFlag') for parent in parents):tag['unsuitableOrSensitiveFlag']=True;changed=True
  result={'format':'jvmg-private-opportunity-inventory-v1','archiveSHA256':manifest['archiveSHA256'],'archiveMemberCount':manifest.get('memberCount'),'uncompressedBytes':manifest.get('uncompressedBytes'),'stagingStatus':manifest['status'],'graphInventory':graphs,'tags':tags,'counts':{'ACDBDefinitions':sum('/acdb/' in t['sourceURI'] for t in tags),'VNDBDefinitions':sum('/vndb/' in t['sourceURI'] for t in tags),'trustedTraitsAdded':0,'publicTraitsAdded':0},'thresholds':{str(n):{'permittedCandidates':0,'independentlyReviewedAnswers':0} for n in [50,100,150,250,500]},'overlapComputed':bool(overlap),'vocabularyCompleteness':{'ACDB':any(g['complete'] and g['name'].endswith('acdb_db_tags.ttl') for g in graphs),'VNDB':any(g['complete'] and g['name'].endswith('final_vndb.ttl') for g in graphs)},'warning':'Raw coverage is not trusted or publishable coverage. Uncomputed counts are unknown, not zero. No promotion performed.'}
  return result
 finally:db.close()
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--stage',required=True);p.add_argument('--knowledge');p.add_argument('--overlap');p.add_argument('--output',required=True);a=p.parse_args();out=pathlib.Path(a.output).resolve();private=pathlib.Path(__file__).resolve().parents[1]/'private'
 if private.resolve() not in out.parents:raise ValueError('Report must remain private')
 if out.exists():raise ValueError('Never overwrite an inventory; choose a new output')
 temp=out.with_name(out.name+'.tmp-'+str(os.getpid()))
 try:
  temp.write_text(json.dumps(report(a.stage,a.knowledge,a.overlap),ensure_ascii=False,indent=2)+'\n',encoding='utf8');os.link(temp,out)
 finally:
  if temp.exists():temp.unlink()

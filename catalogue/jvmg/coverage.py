"""Research opportunities vs unchanged permitted generation coverage; no live output."""
import argparse,json,pathlib,sqlite3,gzip,collections
from stage import private
from knowledge import Graph,LABEL
RULES={
 'sword users':[('equipment.weapon','sword'),('occupation.role','swordsman'),('ability.discipline','swordsmanship')],
 'horns':[('appearance.ear_or_horn_feature','horns')],
 'masks':[('appearance.accessory','mask')],
 'white or silver hair':[('appearance.hair_color','white'),('appearance.hair_color','silver')],
 'demons':[('identity.species','demon')],
 'fire users':[('ability.element','fire'),('ability.named_power','fire'),('ability.named_power','fire manipulation'),('ability.named_power','pyrokinesis')],
 'water users':[('ability.element','water'),('ability.named_power','water'),('ability.named_power','water manipulation'),('ability.named_power','hydrokinesis')],
 'assassins':[('occupation.role','assassin')],
 'chefs and cooks':[('occupation.role','chef')]}
def coverage(inventory,knowledge,positive,metadata,stage=None):
 data=json.loads(pathlib.Path(inventory).read_text(encoding='utf8'));known=collections.defaultdict(set)
 with gzip.open(positive,'rt',encoding='utf8') as f:
  for line in f:
   cid,t,v=json.loads(line)
   if isinstance(v,str):known[(t,v.lower())].add(cid)
 db=sqlite3.connect(pathlib.Path(knowledge).resolve().as_uri()+'?mode=ro',uri=True)
 try:bindings=dict(db.execute('SELECT provider_id,character_id FROM bindings'))
 finally:db.close()
 rows=[]
 for category,rules in RULES.items():
  before=set().union(*(known[r] for r in rules));tags=[t for t in data['tags'] if t['canonicalTraitMapping'] and tuple(t['canonicalTraitMapping']) in rules and not t['unsuitableOrSensitiveFlag']];uris=set().union(*(set(t['sourceCharacterURIs']) for t in tags));matched={bindings['acdb-character-'+u.rsplit('/',1)[-1]] for u in uris if '/acdb/character/' in u and 'acdb-character-'+u.rsplit('/',1)[-1] in bindings}
  tag_unresolved=sum(not ('acdb-character-'+u.rsplit('/',1)[-1] in bindings) for u in uris if '/acdb/character/' in u)+sum('/acdb/character/' not in u for u in uris)
  structured=set()
  if category=='white or silver hair' and stage:
   graph=Graph(stage)
   try:
    predicate='http://mediagraph.link/acdb/ont/hairColor'
    for value, in graph.db.execute('SELECT DISTINCT o FROM triple INDEXED BY predicate_idx WHERE p=?',(predicate,)):
     labels=[v['value'].lower() for v in graph.terms(value).get(LABEL,[])]
     if any(v in ['white','silver'] for v in labels):
      structured.update(uri for uri,graphName in graph.db.execute('SELECT s,graph FROM triple INDEXED BY predicate_idx WHERE p=? AND o=?',(predicate,value)) if graphName in graph.complete)
   finally:graph.close()
   matched.update(bindings['acdb-character-'+u.rsplit('/',1)[-1]] for u in structured if 'acdb-character-'+u.rsplit('/',1)[-1] in bindings)
  rows.append({'rawStructuredAppearanceCharacters':len(structured),'structuredScope':'Only explicit White/Silver ontology labels. Gray is not automatically Silver.','category':category,'baselineSourceTrustedIdentities':len(before),'afterSourceTrustedIdentities':len(before),'newPermittedGenerationIdentities':0,'rawSourceCharactersWithMappedTags':len(uris),'matchedExistingCanonicalResearchCandidates':len(matched),'potentialNewMatchedResearchCandidates':len(matched-before),'unresolvedSourceIdentities':tag_unresolved,'mappingScope':'Exact explicit source-label proposals only; not every synonym or question-specific eligibility rule','sourceTags':[t['sourceURI'] for t in tags],'rightsAndContext':'held; identity match and source tag do not prove anime-adaptation eligibility'})
 meta=json.loads(pathlib.Path(metadata).read_text(encoding='utf8')) if metadata else {}
 for label,predicate,field in [('Madhouse anime',lambda r:any(s['name'].lower()=='madhouse' for s in r.get('studios',[])),'studios'),('1980s anime',lambda r:isinstance(r.get('year'),int) and 1980<=r['year']<=1989,'year')]:
  count=sum(bool(predicate(r)) for r in meta.values());rows.append({'category':label,'baselineMetadataCandidates':count,'afterMetadataCandidates':count,'metadataRecords':len(meta),'recordsWithKnownField':sum(r.get(field) is not None for r in meta.values()),'newPermittedGenerationIdentities':0,'newRawJVMGTitleEligibility':'pending work/credit reconciliation; not inferred from labels','rightsAndContext':'Graph and intended-use permissions unresolved'})
 queues={k:[] for k in ['appearance','weapons','powers','occupations','species','relationships','affiliations','character_roles','profile_facts','unmapped_review']}
 for tag in data['tags']:
  if tag['unsuitableOrSensitiveFlag']:continue
  trait=tag['canonicalTraitMapping'][0] if tag['canonicalTraitMapping'] else ''
  group='appearance' if trait.startswith('appearance.') else 'weapons' if trait.startswith('equipment.') else 'powers' if trait.startswith('ability.') else 'occupations' if trait.startswith('occupation.') else 'species' if trait=='identity.species' else 'relationships' if trait.startswith('relationship.') else 'affiliations' if trait.startswith('affiliation.') else 'character_roles' if trait=='identity.story_role' else 'profile_facts' if trait.startswith('profile.') else 'unmapped_review'
  queues[group].append({'sourceTag':tag['sourceURI'],'label':tag['normalizedLabel'],'existingAnimeIdentityResearchLeads':tag['existingDatabaseAnimeLinkedIdentities'],'potentialNewMatchedTripleProposals':tag['potentialNewMatchedTripleProposals'],'possibleConflicts':tag['potentialConflictingCharacterClaims'],'permittedAnswers':0,'status':'Review volume only; not a fact, context, rights or question-eligibility decision'})
 for items in queues.values():items.sort(key=lambda row:(-row['existingAnimeIdentityResearchLeads'],row['sourceTag']))
 return {'reviewQueues':queues,'voiceActorAndTitleMetadata':'Raw typed resources retained separately; not converted into character traits or threshold-qualified answer pools','eligibleAnswerThresholds':{str(n):0 for n in [50,100,150,250,500]},'format':'phase6-question-opportunity-coverage-v1','categories':rows,'newTrustedJVMGClaims':0,'newPublishedAnswers':0,'generatorChanged':False,'warning':'Research candidate comparisons only; no gameplay bank, accepted-answer or scoring updates. Before/after trusted coverage is unchanged because no real JVMG admission was authorized.'}
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--inventory',required=True);p.add_argument('--knowledge',required=True);p.add_argument('--positive',required=True);p.add_argument('--metadata');p.add_argument('--stage');p.add_argument('--output',required=True);a=p.parse_args();out=private(a.output)
 if out.exists():raise ValueError('Use new report path')
 out.write_text(json.dumps(coverage(a.inventory,a.knowledge,a.positive,a.metadata,a.stage),indent=2)+'\n',encoding='utf8')

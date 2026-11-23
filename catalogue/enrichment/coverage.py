import sqlite3,json,pathlib,sys,collections,hashlib,os
os.umask(0o077)
if len(sys.argv)!=4:raise SystemExit('Usage: coverage.py PRIVATE_DATABASE PRIVATE_OUTPUT LABEL')
file=pathlib.Path(sys.argv[1]).resolve();out=pathlib.Path(sys.argv[2]).resolve();phase=sys.argv[3]
repository=pathlib.Path(__file__).resolve().parents[2]
for p in (file,out):
 if p==repository or repository in p.parents and not repository/'catalogue/private' in p.parents:raise ValueError('Public output refused')
if not phase.isalnum():raise ValueError('Alphanumeric output label required')
out.mkdir(parents=True,exist_ok=True,mode=0o700)
db=sqlite3.connect('file:'+str(file)+'?mode=ro',uri=True);db.execute('pragma cache_size=-65536');identities={id:json.loads(b) for id,b in db.execute('select id,body from identities')};chars={};facts=set();generic=set();tagAssignments=set();byprovider=collections.Counter()
axes=['occupations','abilities','affiliations','detailedAppearance','weapons','species','relationships','profile']
def category(t):
 if t.startswith('occupation.'):return 'occupations'
 if t.startswith('ability.'):return 'abilities'
 if t.startswith('affiliation.'):return 'affiliations'
 if t.startswith('equipment.'):return 'weapons'
 if t in ['identity.species','identity.race']:return 'species'
 if t.startswith('relationship.'):return 'relationships'
 if t.startswith('profile.') and t!='profile.apparent_age':return 'profile'
 if t.startswith('appearance.') and t not in ['appearance.hair_color','appearance.eye_color','appearance.hair_length']:return 'detailedAppearance'
baselineFile=out/'before-triples.json'
baseline=set(tuple(row) for row in json.loads(baselineFile.read_text())) if phase=='after' and baselineFile.exists() else None
newEvidence=[]
active=" FROM observations o JOIN current_fields c ON c.provider_id=o.provider_id AND c.version=o.version AND c.facet=json_extract(o.body,'$.facet') WHERE o.status IN ('source_trusted','wikidata_source_trusted')"
for char,t,v,body in db.execute('SELECT o.character_id,o.trait,o.value,o.body'+active):
 f=json.loads(body);x=chars.setdefault(char,{'categories':set(),'acdbBasic':set(),'wikidata':set(),'tags':set(),'providers':set(),'trust':set(),'useful':set()});x['providers'].add(f['sourceProvider']);x['trust'].add(f['trustStatus']);key=(char,t,v);facts.add(key)
 if baseline is not None and key not in baseline and t not in ['identity.gender','identity.classification','identity.alias']:
  c=identities[char];newEvidence.append({'characterId':char,'name':c['name'],'anime':c['appearances'],'trait':t,'value':json.loads(v),'source':f['sourceProvider'],'statementId':f.get('statementId'),'url':f.get('url'),'trustStatus':f['trustStatus'],'readBack':'active SQLite observation','publicationAuthorized':False})
 byprovider[f['sourceProvider']]+=1
 if t in ['identity.gender','identity.classification']:generic.add(key)
 if f['sourceProvider']=='Wikidata':x['wikidata'].add((t,v))
 if t in ['appearance.hair_color','appearance.eye_color','appearance.hair_length','identity.gender','profile.apparent_age'] and f['sourceProvider']=='ACDB':x['acdbBasic'].add(t)
 cat=category(t)
 if cat:x['categories'].add(cat);x['useful'].add((t,v))
 if f.get('sourceType')=='tag' and f['sourceProvider']=='ACDB':x['tags'].add((f['providerId'],f['rawLabel']));tagAssignments.add((f['providerId'],f['rawLabel']));x['useful'].add((t,v))
metrics={'searchableCharacters':len(chars),'uniquePositiveTriples':len(facts),'genericGenderClassificationTriples':len(generic),'nonGenericTriples':len(facts-generic),'aliasTriples':sum(t=='identity.alias' for _,t,_ in facts),'nonGenericNonAliasTriples':sum(t not in ['identity.gender','identity.classification','identity.alias'] for _,t,_ in facts),'actualACDBTagCharacters':sum(bool(x['tags']) for x in chars.values()),'actualACDBTagAssignments':len(tagAssignments),'byProviderObservations':dict(byprovider),'charactersWithWikidata':sum(bool(x['wikidata']) for x in chars.values()),'charactersWithBasicACDBAttributes':sum(bool(x['acdbBasic']) for x in chars.values()),'charactersWithExplicitWeaponTraits':len({c for c,t,v in facts if t=='equipment.weapon'}),**{k:sum(k in x['categories'] for x in chars.values()) for k in axes}}
with open(out/(phase+'-coverage.ndjson'),'w') as f:
 for id,x in sorted(chars.items(),key=lambda p:(len(p[1]['useful']),p[0])):
  c=identities[id];f.write(json.dumps({'id':id,'name':c['name'],'anime':c['appearances'],'providerIds':c['providerIds'],'basicACDBFields':sorted(x['acdbBasic']),'wikidataFacts':len(x['wikidata']),'acdbTagAssignments':len(x['tags']),'existingCategories':sorted(x['categories']),'missingCategories':sorted(set(axes)-x['categories'])+([] if x['tags'] else ['ACDB character tags']),'usefulFacts':len(x['useful']),'sourceProviders':sorted(x['providers']),'sourceTrustClasses':sorted(x['trust']),'absenceMeans':'UNKNOWN'},ensure_ascii=False)+'\n')
if baseline is not None:
 new=facts-baseline;removed=baseline-facts
 metrics.update({'netNewUniquePositiveTriples':len(new),'removedBaselineTriples':len(removed),'newGenericTriples':sum(t in ['identity.gender','identity.classification'] for _,t,_ in new),'newAliasTriples':sum(t=='identity.alias' for _,t,_ in new),'newNonGenericNonAliasTriples':sum(t not in ['identity.gender','identity.classification','identity.alias'] for _,t,_ in new),'charactersWithNewFacts':len(set(c for c,_,_ in new)),'charactersWithNewNonGenericNonAliasFacts':len(set(c for c,t,_ in new if t not in ['identity.gender','identity.classification','identity.alias']))})
 (out/'new-evidence-readback.json').write_text(json.dumps(newEvidence,ensure_ascii=False))
 (out/'removed-baseline-triples.json').write_text(json.dumps(sorted(removed),ensure_ascii=False))
(out/(phase+'-metrics.json')).write_text(json.dumps(metrics,indent=2));(out/(phase+'-triples.json')).write_text(json.dumps(sorted(facts),ensure_ascii=False));print(json.dumps(metrics,indent=2))

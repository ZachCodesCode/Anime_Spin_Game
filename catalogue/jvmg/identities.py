"""Complete source-identity audit; cluster leads never become canonical merges."""
import argparse,json,pathlib,sqlite3,gzip,collections
from stage import private
from knowledge import native
TYPE='http://www.w3.org/1999/02/22-rdf-syntax-ns#type';LINK='http://mediagraph.link/jvmg/ont/sourceURI'
def audit(stage,knowledge,output):
 stage=private(stage);output=private(output);output.mkdir(parents=True,exist_ok=True)
 db=sqlite3.connect(stage.as_uri()+'?mode=ro',uri=True);source=sqlite3.connect(pathlib.Path(knowledge).resolve().as_uri()+'?mode=ro',uri=True)
 try:
  bindings=dict(source.execute('SELECT provider_id,character_id FROM bindings'));anime=set()
  for cid,body in source.execute('SELECT id,body FROM identities'):
   c=json.loads(body)
   if c.get('canonicalAppearances') or any(a.get('media')=='anime' for a in c.get('appearances',[])):anime.add(cid)
  graphs={n:json.loads(s) for n,s in db.execute('SELECT name,stats FROM graph WHERE complete=1')};subjects=set()
  for name,stats in graphs.items():
   for typ in stats.get('types',{}):
    if typ.endswith('/Character'):
     subjects.update(s for s, in db.execute('SELECT s FROM triple INDEXED BY predicate_idx WHERE p=? AND o=? AND graph=?',(TYPE,typ,name)) if native(s)[0])
  clusters={};members={}
  for cluster,uri,graph in db.execute('SELECT s,o,graph FROM triple INDEXED BY predicate_idx WHERE p=?',(LINK,)):
   if graph not in graphs or '/jvmg/character/' not in cluster or not native(uri)[0]:continue
   members.setdefault(uri,set()).add(cluster);provider,id=native(uri);key={'acdb':'acdb-character-','aclick':'animeclick-character-','vndb':'vndb-character-'}[provider]+id
   if key in bindings:clusters.setdefault(cluster,set()).add(bindings[key])
  counts=collections.Counter();by_provider={};seen=set();out=output/'identity-reconciliation.jsonl.gz'
  if out.exists():raise ValueError('Use a new audit output directory')
  with gzip.open(out,'xt',encoding='utf8') as stream:
   for uri in sorted(subjects):
    provider,id=native(uri);key={'acdb':'acdb-character-','aclick':'animeclick-character-','vndb':'vndb-character-'}[provider]+id;cid=bindings.get(key);leads=set().union(*(clusters.get(c,set()) for c in members.get(uri,[])))
    status='secure_existing_binding' if cid else 'ambiguous_cluster' if len(leads)>1 else 'cluster_lead_requires_review' if leads else 'unresolved_source_identity'
    counts[status]+=1;by_provider.setdefault(provider,collections.Counter())[status]+=1
    if cid:seen.add(cid)
    stream.write(json.dumps({'sourceURI':uri,'providerId':key,'status':status,'canonicalId':cid,'existingAnimeAppearance':cid in anime if cid else None,'clusterCanonicalLeads':sorted(leads),'newIdentityAdmitted':False,'newAnimeTraitEligibility':False})+'\n')
  result={'format':'jvmg-identity-reconciliation-v1','rawProviderCharacterURIs':len(subjects),'distinctMatchedExistingCanonicalIdentities':len(seen),'counts':dict(counts),'byProvider':{p:dict(c) for p,c in by_provider.items()},'genuinelyNewAnimeIdentitiesConfirmed':0,'canonicalMergesPerformed':0,'knowledgeChanged':False,'method':'Exact existing provider bindings; JVMG sourceURI character clusters are documentary leads only'}
  (output/'summary.json').write_text(json.dumps(result,indent=2)+'\n',encoding='utf8');return result
 finally:db.close();source.close()
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--stage',required=True);p.add_argument('--knowledge',required=True);p.add_argument('--output',required=True);a=p.parse_args();print(json.dumps(audit(a.stage,a.knowledge,a.output),indent=2))

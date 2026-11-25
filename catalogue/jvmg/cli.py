"""Offline projections from private staging; no network or automatic admission."""
import argparse,json,pathlib,sqlite3,subprocess,os
from stage import private
from knowledge import Graph,project,admit,prepare,load
ROOT=pathlib.Path(__file__).resolve().parents[2]
def main(a):
 if a.operation=='admit':
  guard=load('existing_private_guard',ROOT/'catalogue/team-export.py')
  if not a.manifest or not a.backup:raise ValueError('Admission requires scoped permission manifest and verified backup receipt')
  manifest=json.loads(guard.private(a.manifest).read_text(encoding='utf8'));grant=json.loads(guard.private(manifest['grant']).read_text(encoding='utf8'));roster=json.loads(guard.private(manifest['maintainers']).read_text(encoding='utf8'));graph=Graph(private(a.stage))
  try:
   prepare(graph,guard.private(a.knowledge),a.uri or [],grant,roster,private(a.output));hashes={n:v['sha256'] for n,v in graph.complete.items()}
  finally:graph.close()
  return admit(private(a.output),guard.private(a.knowledge),guard.private(a.backup),grant,roster,hashes)
 graph=Graph(private(a.stage));source=sqlite3.connect(pathlib.Path(a.knowledge).resolve().as_uri()+'?mode=ro',uri=True)
 try:
  bindings=dict(source.execute('SELECT provider_id,character_id FROM bindings'));identities={cid:json.loads(body) for cid,body in source.execute('SELECT id,body FROM identities')}
  mappings=json.loads(subprocess.check_output([a.node,'-e',"console.log(JSON.stringify({...require('./catalogue/traits/importer/profiles').tags,...require('./catalogue/jvmg/mappings.json')}))"],cwd=ROOT,encoding='utf8'))
  out=private(a.output);out.parent.mkdir(parents=True,exist_ok=True)
  if out.exists():raise ValueError('Projection never overwrites prior research; choose a new output')
  subjects=a.uri or []
  if not subjects:raise ValueError('Supply explicit --uri resources for bounded projection; full vocabulary uses report.py')
  with open(out,'x',encoding='utf8') as f:
   for uri in subjects:f.write(json.dumps(project(uri,graph.terms(uri),bindings,identities,mappings,graph.terms,graph.cluster_evidence(uri)['providerIds']),ensure_ascii=False)+'\n')
  return {'output':str(out),'resources':len(subjects),'knowledgeChanged':False,'publicationAuthorized':False}
 finally:graph.close();source.close()
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--operation',choices=['project','admit'],default='project');p.add_argument('--manifest');p.add_argument('--backup');p.add_argument('--stage',required=True);p.add_argument('--knowledge',required=True);p.add_argument('--uri',action='append');p.add_argument('--output',required=True);p.add_argument('--node',default='node');a=p.parse_args();print(json.dumps(main(a)))

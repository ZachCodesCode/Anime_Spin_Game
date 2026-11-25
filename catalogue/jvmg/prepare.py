"""Called only from the existing knowledge preparation path; no store writes."""
import sys,json,pathlib
import importlib.util
spec=importlib.util.spec_from_file_location('existing_private_guard',pathlib.Path(__file__).resolve().parents[1]/'team-export.py');guard=importlib.util.module_from_spec(spec);spec.loader.exec_module(guard)
private=guard.private
from knowledge import Graph,prepare,daily_uris
if __name__=='__main__':
 spec=json.load(sys.stdin);request=json.loads(private(spec['input']).read_text(encoding='utf8'));manifest=spec.get('manifest') or {}
 roster=json.loads(private(manifest['maintainers']).read_text(encoding='utf8'));grant=json.loads(private(manifest['grant']).read_text(encoding='utf8'));graph=Graph(private(request['stage']))
 try:
  uris=request.get('uris',[])
  if request.get('useDailyContent'):
   import sqlite3
   source=sqlite3.connect(pathlib.Path(spec['file']).resolve().as_uri()+'?mode=ro',uri=True)
   try:uris=daily_uris(dict(source.execute('SELECT provider_id,character_id FROM bindings')),spec.get('dailyIdentities',[]))
   finally:source.close()
  print(json.dumps(prepare(graph,private(spec['file']),uris,grant,roster,private(spec['output']),allow_empty=bool(request.get('useDailyContent')))))
 finally:graph.close()

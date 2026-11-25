"""Exact current positive triples from verified backup; private read-only analysis."""
import argparse,sqlite3,pathlib,gzip,json,hashlib
from stage import private
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--database',required=True);p.add_argument('--output',required=True);a=p.parse_args();out=private(a.output)
 if out.exists():raise ValueError('Never overwrite an existing overlap snapshot')
 db=sqlite3.connect(pathlib.Path(a.database).resolve().as_uri()+'?mode=ro',uri=True);db.execute('PRAGMA cache_size=-131072');seen=set()
 try:
  sql="SELECT o.character_id,o.trait,o.value FROM observations o NOT INDEXED JOIN current_fields c ON c.provider_id=o.provider_id AND c.version=o.version AND c.facet=json_extract(o.body,'$.facet') WHERE o.status IN ('source_trusted','wikidata_source_trusted')"
  with gzip.open(out,'xt',encoding='utf8') as f:
   for cid,trait,value in db.execute(sql):
    key=(cid,trait,value)
    if key in seen:continue
    seen.add(key);f.write(json.dumps([cid,trait,json.loads(value)],ensure_ascii=False)+'\n')
  print(json.dumps({'distinctPositiveTriples':len(seen),'output':str(out),'sourceMode':'verified backup read-only; existing current-facet/status filter'}))
 finally:db.close()

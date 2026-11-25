"""Verified local checkpoint using the established SQLite online-backup approach."""
import argparse,pathlib,sqlite3,json,datetime,shutil,os,hashlib
from stage import private,sha
TABLES=['identities','bindings','versions','records','observations','legacy','jobs','current_records','current_fields','conflicts']
def backup(source,directory):
 source=pathlib.Path(source).resolve();directory=private(directory);directory.mkdir(parents=True,exist_ok=True);target=directory/'knowledge.sqlite';receipt=directory/'receipt.json'
 if target.exists() or receipt.exists():raise ValueError('Never overwrite a checkpoint; use its verified receipt or a new destination')
 if shutil.disk_usage(directory).free<source.stat().st_size+5*1024**3:raise ValueError('Backup requires source size plus 5 GiB working reserve')
 src=sqlite3.connect(source.as_uri()+'?mode=ro',uri=True);dest=sqlite3.connect(target)
 try:src.backup(dest,pages=4096)
 finally:dest.close();src.close()
 db=sqlite3.connect(target.as_uri()+'?mode=ro',uri=True)
 try:
  integrity=db.execute('PRAGMA integrity_check').fetchone()[0]
  if integrity!='ok':raise ValueError('Backup integrity failed')
  counts={t:db.execute('SELECT count(*) FROM '+t).fetchone()[0] for t in TABLES}
 finally:db.close()
 r={'format':'phase6-local-sqlite-checkpoint-v1','createdAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'source':str(source),'sourceMtimeNS':source.stat().st_mtime_ns,'sourceBytes':source.stat().st_size,'backup':str(target),'backupSHA256':sha(target),'backupBytes':target.stat().st_size,'integrity':integrity,'counts':counts,'method':'SQLite online backup; closed handles; read-only full integrity/count/hash verification','transferAuthorized':False}
 receipt.write_text(json.dumps(r,indent=2)+'\n',encoding='utf8');return r
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--source',required=True);p.add_argument('--output',required=True);a=p.parse_args();print(json.dumps(backup(a.source,a.output),indent=2))

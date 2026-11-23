'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs/promises'),path=require('node:path');
const {fileDatabase,connect}=require('./test-helpers/sqlite');

test('file-backed fixture releases its owner before rename/delete and persists across a new owner',async()=>{
 const owned=await fileDatabase('ascent-owner-lifecycle-');let reopened;
 try{
  await owned.db.batch(['CREATE TABLE lifecycle(value INTEGER)','INSERT INTO lifecycle VALUES (42)'],'write');
  await assert.rejects(owned.db.execute('SELECT * FROM missing_table'));
  await owned.db.close();await owned.db.close(); // Idempotent; both await process termination.
  await assert.rejects(owned.db.execute('SELECT 1'),/closing/);
  const file=path.join(owned.directory,'test.db');
  await fs.rename(file,file+'.released');await fs.rename(file+'.released',file);
  reopened=await connect(owned.url);
  assert.equal((await reopened.execute('SELECT value FROM lifecycle')).rows[0].value,42);
 }finally{
  if(reopened)await reopened.close();
  await owned.dispose();
 }
 await assert.rejects(fs.stat(owned.directory),{code:'ENOENT'});
});

test('failed fixture bodies still await native owner termination and remove their files',async()=>{
 const owned=await fileDatabase('ascent-owner-failure-');
 await assert.rejects((async()=>{
  try{await owned.db.execute('CREATE TABLE failure_cleanup(value)');throw Error('original fixture failure');}
  finally{await owned.dispose();}
 })(),/original fixture failure/);
 await assert.rejects(fs.stat(owned.directory),{code:'ENOENT'});
});

# PR #27 Windows SQLite fixture cleanup

Run 45219921200 / Windows job 137851100522 completed the SQL assertions but failed
seven tests during deletion of still-open database files. The three fixture sites
used synchronous rmSync retry loops after Client.close().

The locked dependencies are @libsql/client 0.14.0 and libsql 0.4.7. Client.close()
returns void; awaiting it does not wait for native statement disposal. The local
adapter prepares statements on each execute, and its public statement wrapper has
no finalize operation. A local macOS reproduction executed CREATE/SELECT, called
close(), observed closed=true and closeReturn=undefined, then lsof still showed an
open descriptor for that database. Unix permits unlinking an open file, hiding the
lifecycle problem; Windows refuses it. Sleeping inside rmSync cannot guarantee GC
or native finalization. Related upstream reports:
https://github.com/tursodatabase/libsql-js/issues/228 and
https://github.com/tursodatabase/libsql-js/issues/230 (reported with newer versions;
the installed-version evidence above was reproduced separately).

The test-only helper gives each database a dedicated child process. It uses the
same installed @libsql/client against a real local file; SQL, batches, transaction
atomicity, constraints, idempotency and API scoring still execute in libSQL. Only
execute/batch requests cross IPC. The parent never owns a native connection.
All operations must be awaited; closing with pending work is an explicit error.
Shutdown closes the client and then awaits the owner's process/stdio close event.
The OS has released its handles before awaited fs.promises.rm starts. Small,
bounded asynchronous filesystem retries remain for external transient locks;
the fix does not depend on longer retries, forced GC or a delay. Close errors,
child failures and deletion errors still fail tests.

In-memory databases could exercise SQL-only service logic, but would remove
file-lifecycle/persistence coverage. All affected fixtures therefore remain
file-backed on every OS. A new regression closes/reopens the file in a different
owner, verifies committed data, renames the released file and deletes the fixture.
Another verifies cleanup on a failing test body. No tests are skipped and no
production database, dependency, workflow, gameplay, scoring or content file changes.

Verification: npm test, npm run build and npm run ascent:integrity. The existing
Windows/Ubuntu/macOS CI matrix is unchanged. Actual remote outcomes must be read
from the workflow for the new commit; local macOS success is not Windows proof.

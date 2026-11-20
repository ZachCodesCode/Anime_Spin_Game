# Private ACDB enrichment (Phase 5D)

Uses Python 3 standard-library SQLite for staging and the existing Node Phase 5B-3 review
workflow. No network calls, production database operations, live answer generation or
new review interface. SQLite was chosen for indexed lookups, transactional checkpoints
and recovery without loading source tables into the browser.

## Run

From the repository root, using the previously inspected private sample:

```sh
python3 catalogue/acdb/stage.py \
  --database catalogue/private/phase5d/staging.sqlite \
  --characters catalogue/private/source-pilot/acdb-characters.sql.gz.txt \
  --publishers catalogue/private/source-pilot/acdb-publishers.sql.gz.txt \
  --assignments catalogue/private/source-pilot/acdb-assignments.sql.gz.txt \
  --mappings catalogue/private/phase5c/mappings.json \
  --allow-partial
node catalogue/acdb/review.js catalogue/private/phase5d/VERSION.json
node catalogue/acdb/review.js catalogue/private/phase5d/VERSION.json --apply
node catalogue/verification/server.js
```

Replace VERSION with the printed SHA-256 identifier. The first review command writes a
private preview; --apply appends pending proposals to the existing local review state.
It never approves. The existing maintainer roster and session-token controls still apply.
All ACDB proposals require individual evidence; the source's community metadata alone
cannot meet the approval gate. `permission: unresolved` is deliberately a publication
hold, not a claim that private downloads are prohibited.

Full `.sql.gz` files are supported. `--allow-partial` explicitly accepts the existing
truncated prefix and discards incomplete INSERT statements; do not use it to claim a
complete corpus. Normal mode rejects truncation. The parser validates schema/arity and
numeric fields, understands quoted delimiters and SQL escapes, and never executes SQL.
It retains only identity, documented physical codes and title/form fields; images,
biographies, image paths and unnecessary descriptions are excluded from staging.

`--batch 500` controls committed row batches. `--stop-after 2` exercises interruption.
Rerun the same command to resume: committed ordinal checkpoints and source records are
written in one transaction. Interrupted in-flight batches roll back. Identical source
hashes skip completed tables; changed sources create immutable separate versions.
Unchanged rows are not diff-compressed across versions: budget disk space accordingly.
SQLite conflicts quarantine duplicate IDs with differing contents. A later source
version does not delete historical source records or reviewed facts.

## Mapping and identity boundaries

The mapping argument is a **trusted maintainer-inspected configuration**, not an
untrusted downloaded assertion. Phase 5C extracted definitions from ACDB's official
search controls using matching SQL field names and checked 30 character pages. The
output records the mapping and catalogue hashes. Keep the source HTML and mapping JSON
with the private snapshot. Review mapping changes before running a new import.

Hair, eye, hair-length, apparent-age, sex and ear/horn codes are retained with raw code,
label and known/unknown status. Missing values stay unknown. Only red, blonde/yellow,
white, pink and green hair are mapped into current supported question proposals.
Gray is not silver. No glasses/masks/hats/eyepatches/species are inferred. Eye/hair-length
facts are staged but cannot be added as approved associations without extending the
existing reviewed trait definitions in a separate task.

ACDB IDs stay separate from Tenrai/MAL IDs. These dumps have no stable cross-database
character ID. Matching therefore requires normalized character names and exact title
alias compatibility on explicit ACDB Anime (mt=2) assignments. Name-only collisions,
multiple identities, forms/clones, mixed media and multiple adaptations are retained as
warnings or holds. Movie/OVA/ONA and unknown types remain outside this conservative
join. A name+title match is a proposal, not proof. No canonical identity is overwritten.

Review ingestion retains snapshot, mapping, ACDB ID, original code, source URL, licence
and warnings. Approved/rejected existing traits and identity reassignment are held for
individual handling. Repeated evidence is idempotent. Old evidence and decisions remain
intact. Review preview files are atomic; SQLite is authoritative for import checkpoints.
Store backups and conflict reports privately. If a process is killed during review writes,
the existing store's exclusive lock may need operator inspection/removal after confirming
no writer is running; staging checkpoints do not require manual repair.

## Licensing and performance

Official sources:
- https://www.animecharactersdatabase.com/databasedumps.php
- https://www.animecharactersdatabase.com/sort_characters.php
- https://www.animecharactersdatabase.com/sort_series.php
- https://opendatacommons.org/licenses/odbl/1-0/
- https://opendatacommons.org/licenses/dbcl/1-0/

ODbL/DbCL permit local processing and commercial use subject to their terms. Preserve
attribution/licence notices. Public use of an adapted database or its produced works can
require share-alike and an offer of the adapted database/alterations. Server-side storage
does not remove public-use obligations. Determine derivative versus collective treatment
before combining/publicizing ACDB-derived answer data with Tenrai or other sources.
Wikidata's CC0 status does not clear the other components' rights. Image rights are separate.

Raw staging, ACDB-derived proposals, Wikidata evidence, human decisions and manually
curated game answers retain separate provenance. The review state contains pending
licence-held evidence; it is not a public answer bank. Nothing in this tool publishes it.
All private output must remain under catalogue/private; Vercel excludes catalogue/**.

Staging is batched and indexed. Matching/export currently loads the staged corpus into
memory; the inherited JSON review ledger validates the whole ledger and is slower than
SQLite. Benchmark and paginate before applying tens of thousands of proposals at once.
This phase does not claim production-scale throughput for the review UI.

Tests: `npm test` includes parser, staging recovery/versioning, matching/ambiguity and
review integration regressions. No live APIs or AI are required by the importer or game.

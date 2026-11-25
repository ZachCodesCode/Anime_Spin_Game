# Public character-knowledge subset (offline only)

This directory is prepared for manual review and GitHub publication. It is not
loaded by the game and remains excluded from Vercel. Publishing Git changes is
the owner's action; the exporter never stages, commits, pushes or approves answers.

`v1/manifest.json` is the authoritative coverage report. Each of 32 deterministic
gzip JSONL partitions contains source-native character records conforming to
`schema.json`. Each character/trait/value triple occurs once, with all source
contexts retained in its sourceEvidence array. Bootstrap expands that evidence
into the existing observation model without changing question-generation logic. This is **not the complete private store**. Source permissions and
identity links determine inclusion, not an arbitrary size target. No Git LFS is
needed. Each compressed partition is capped at 8 MiB. Private source archives,
SQLite files, prose and review histories must never be copied here.

## Rights and scope

See NOTICE.md and the included ODbL/DbCL license texts. Official ACDB SQL labels,
explicit anime assignments and normalized structured attributes are projected from
the existing store. Saved character pages, raw biographies, images and webpage
profile/tag claims are excluded, even if they carry an inherited license label.
Wikidata structured source labels/aliases/statements retain CC0 provenance. Tenrai
canonical labels/cast metadata and inferred private crosswalks are not copied.

The derivative public database is offered under ODbL 1.0; ACDB contents retain
DbCL 1.0 and Wikidata contents retain CC0. Retain notices/provenance and comply with
applicable attribution, share-alike and machine-readable derivative access duties.
An eventual game answer bank needs its own editorial and licensing release check;
redistributable source data is not automatic permission to publish arbitrary
mixed-source game content. This grant does not cover excluded data or game art.

Public IDs use existing ACDB/Wikidata namespaces. Explicit, nonconflicting
Wikidata ACDB identifiers can join sources. Inferred private MAL matches do not
become public identity links. Unclear overlapping identities are held rather than
silently merged or counted twice. Character forms remain separate; source form
codes are retained without inventing their semantics. Ambiguous aliases and damaged
source readings are withheld. Canonical-name collisions are marked and the existing
generator holds ambiguous answers. Unicode names are preserved where valid.

All facts remain source assertions with independentlyVerified=false and
publicationAuthorized=false. That existing field refers to game-answer approval;
public data redistribution is governed separately by the declared source licenses. Anime associations are only those with redistributable
source evidence. Missing data is unknown, never false. Some Wikidata source records
lack public anime-assignment evidence: they are searchable but held from automatic
anime question candidates. Compound-context checking uses the existing importer.
Population/role metadata is incomplete; rarity proposals are not measured response
rates. No approved answers, scores or assignments change.

## Clone, validate and query

From the existing repository after the owner commits/pushes this directory:

```sh
npm ci
npm run catalogue:public -- validate
npm run catalogue:public -- list --limit 20
npm run catalogue:public -- search --name Naruto
npm run catalogue:public -- profile --id acdb-character-20395
npm run catalogue:public -- bootstrap --directory catalogue/private/public-v1
npm run catalogue:public -- search --database catalogue/private/public-v1/knowledge.sqlite --query catalogue/public-data/examples/pirates.json
npm run catalogue:public -- generate --database catalogue/private/public-v1/knowledge.sqlite --query catalogue/public-data/examples/blue-hair.json
```

Use `ASCENT_PYTHON` for a non-default interpreter if needed; Windows defaults to
`python`, macOS/Linux to `python3`. The loader checks policy, manifest version,
partition hashes, sizes, schema boundaries, stable IDs, counts and relationship
targets. A checksum proves integrity relative to the manifest, not independent
factual verification; obtain the repository revision from your trusted team.

Bootstrap uses the existing knowledge-store schema and ingestion code to build a
**new private local index** from the public subset. It refuses existing files and
does not read/rebuild the original private database. The index sidecar pins its
public dataset version. After a data update, use a new index directory; do not
silently overwrite an old working index. Query JSON uses existing `all` conditions
(trait/value, optional birthday month), up to twelve compatible conditions.
Inspect `stats`/`profile` for actual included values and provenance. No live API,
AI calls or private catalogue are required. Genre, studio, release-year and episode
count metadata are not included: those prompts require additional licensed anime
metadata, rather than treating a character trait as a genre or franchise fact.

`generate` delegates to the existing K.generate engine with a public catalogue
view. It retains eligibility context, collision holds, rarity caveats and editorial
Limit Break requirements. Supply `--limit-break-character ID` only as an explicit
editorial proposal. Output remains unapproved; do not paste it directly into the
live bank. Save review outputs under catalogue/private, not this public package.

## Existing duplicate/cooldown scheduler

Use `npm run catalogue:public -- plan --input YOUR_PRIVATE_REVIEWED_PLAN.json`.
The input is the existing fresh.js `plan` object: inventory, historical uses,
reviewed concept IDs, start, days, optional actual performance, quality and pins.
This directly calls the existing planner; it does not create a second engine.

Seven fresh questions win where inventory permits. Otherwise at most one reviewed
repeat plus six fresh questions is allowed, after 14 Toronto calendar-day intervals
for the same ID/equivalent concept. Smaller **reviewed playable** canonical answer
pools rank first; raw public matches are not accepted-answer counts. Reliable player
performance is optional. Insufficient inventory blocks rather than bypassing rules.
See ../scheduling documentation at ../../power-level/scheduling/README.md for the
full schema and examples. Do not fabricate approvals or historical deployment data.
A generated concept audit reports existing matching prompts; it assigns no dates.

## Reproduce updates from the existing private store

```sh
npm run catalogue:public-export -- --database /ABSOLUTE/PRIVATE/knowledge.sqlite
npm run catalogue:public -- validate
npm test
npm run build
npm run ascent:integrity
```

The command opens a read-only SQLite transaction, applies public-policy.json, and
projects allowed fields from the existing official SQL/current Wikidata records.
It does not crawl, import another dataset, modify the source or consult private
review prose. Identity sources and each fact have individual provenance. All
exclusions are counted in the manifest. Empty fixed buckets are valid; unchanged
partitions and an unchanged manifest retain their bytes and modification times.
Changes/previous-version information is emitted to stdout rather than embedded as
volatile timestamps. Review that report and GitHub Desktop Changes before committing.
The owner controls every commit, push, merge and deployment.

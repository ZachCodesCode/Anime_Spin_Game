# Private, incremental knowledge enrichment

Run from `feature/shared-anime-character-database`. These commands use the existing
SQLite store and offline generator; gameplay never opens these files. Set
`ASCENT_CATALOGUE_DATA_DIR` to the existing private data directory and
`ASCENT_TRAIT_REVIEW_STATE` to its actual review state. Do not copy research into
public assets or Git. Source trust is not independent verification or publication.

## Resume discovery and ingestion

```sh
node catalogue/enrichment/expand-wikidata.js "$PRIVATE_JOB/wikidata-expanded" "$PREVIOUS_WIKIDATA_SNAPSHOT"
npm run catalogue:knowledge -- import --provider wikidata --input "$PRIVATE_JOB/wikidata-expanded/wikidata-snapshot.json" --prepared "$PRIVATE_JOB/expanded.ndjson" --batch-size 500
```

Use the same saved input/prepared path to resume. Completed immutable inputs replay
without adding observations. Discovery excludes the previous character IDs and
uses explicit anime/manga character classes and documented anime work links.
Discovery alone does not establish an eligible anime adaptation. The adapter holds
unresolved adaptations, conflicting identifiers, and same-franchise romanization
near-matches. Native-name matching requires compatible franchise evidence. A timed
out work cohort is subdivided, preserving its previous pages; newly discovered IDs
are acquired under an `incremental-*` directory without refetching the first cohort.
Check `expansion-discovery.json`, `discovery-summary.json` and
`incremental-summary.json`; incomplete queries are never evidence of absence.

After importing the full character snapshots, fetch missing reference values for
additional properties in their **cached original revisions**:

```sh
node catalogue/enrichment/wikidata-supplement.js "$PRIVATE_JOB/wikidata-supplement" "$PREVIOUS_WIKIDATA_SNAPSHOT" "$PRIVATE_JOB/wikidata-expanded/wikidata-snapshot.json"
npm run catalogue:knowledge -- import --provider wikidata --input "$PRIVATE_JOB/wikidata-supplement/wikidata-supplement.json" --prepared "$PRIVATE_JOB/supplement.ndjson" --batch-size 500
```

Include incremental snapshots as additional arguments where present. The partial
adapter rejects source-identity/revision changes, carries existing facts in touched
facets, and does not retire unselected properties. Native names are observations,
not canonical-alias edits. Named equipment is a sword only when its explicit source
classification supports that; it does not imply a swordsman occupation. Unsupported
qualifiers remain held. Generic gender/classification and aliases must be reported
separately from substantive facts. Basic apparent age is not a detailed profile.

## Coverage and validation

```sh
python3 -B catalogue/enrichment/coverage.py "$VERIFIED_BEFORE_BACKUP" "$PRIVATE_JOB" before
python3 -B catalogue/enrichment/coverage.py "$ASCENT_CATALOGUE_DATA_DIR/knowledge.sqlite" "$PRIVATE_JOB" after
npm test
npm run build
npm run catalogue:validate
npm run traits -- validate
npm run ascent:integrity
npm run catalogue:knowledge -- validate
```

Coverage files contain private character-level records and source trust classes.
Only aggregates belong in public documentation. Compare unique active
(character, trait, value) triples, not cumulative historical observations. Confirm
that all pre-import observations, bindings, metadata, reviews and source evidence
survive. Never delete an old failed/prototype history to simplify counts.

## ACDB access gap

The official SQL tables do not contain complete character-tag assignments. The
API-dumps endpoint currently requires an ACDB API key. Do not turn an unprocessed
ID queue into a webpage scraper. Local saved pages may be imported through the
existing supplied-page workflow only when authorized. No fetched page or tag means
UNKNOWN, not a negative trait. Existing ACDB ODbL/DbCL provenance/publication holds
remain attached even when Wikidata corroborates a fact.

Unsent provider request: Please authorize a machine-readable character/tag feed
for private offline Anime Ascent research, including ACDB character ID, tag ID and
label, assignment ID, anime/media association, form/costume/period qualifiers,
profile fields, source URLs and update/deletion timestamps. Specify permitted
request rate, durable storage, private transfer to the two project maintainers,
attribution/share-alike obligations and whether minimal derived game answers may
be published. An API key by itself is not a blanket redistribution grant.

## Private backup and co-developer transfer

Use SQLite's online backup API, not a raw copy of a live WAL database. Run
`PRAGMA quick_check` on the backup and record a streamed SHA-256 in a separate
receipt. Keep the pre-import backup. For an actual new private destination:

```sh
python3 - "$ASCENT_CATALOGUE_DATA_DIR/knowledge.sqlite" "$NEW_PRIVATE_BACKUP" <<'PYTHON'
import sqlite3, pathlib, sys, os
os.umask(0o077)
p = pathlib.Path(sys.argv[2])
if p.exists(): raise SystemExit('Never overwrite an existing backup')
source = sqlite3.connect('file:' + str(pathlib.Path(sys.argv[1]).resolve()) + '?mode=ro', uri=True)
destination = sqlite3.connect(p)
source.backup(destination)
assert destination.execute('PRAGMA quick_check').fetchone()[0] == 'ok'
destination.close()
source.close()
PYTHON
shasum -a 256 "$NEW_PRIVATE_BACKUP" > "$NEW_PRIVATE_BACKUP.sha256"
```

Full `catalogue:knowledge -- validate` checks
source/identity integrity as well as SQLite. Use the existing compressed bundle
workflow documented in `catalogue/TEAM-SETUP.md`:

```sh
npm run catalogue:knowledge -- bundle --authorization "$ACTUAL_OWNER_AUTHORIZATION" --output "$PRIVATE_TRANSFER/knowledge.tar.gz"
shasum -a 256 "$PRIVATE_TRANSFER/knowledge.tar.gz"
```

The authorization must name the actual owner, private-use reference,
`publicRedistribution:false`, `includeReviewState:true`, and `includeKnowledgeState:true`; never fabricate it.
Transfer only through owner-authorized private storage. Send the expected checksum
through a separately trusted channel. On the other computer, bootstrap into a new
private location (never overwrite an existing database):

```sh
ASCENT_KNOWLEDGE_BUNDLE_SHA256="$EXPECTED_SHA256" npm run catalogue:knowledge -- bootstrap --input "$PRIVATE_TRANSFER/knowledge.tar.gz" --database "$NEW_PRIVATE_DATA/knowledge.sqlite"
npm run catalogue:knowledge -- validate --database "$NEW_PRIVATE_DATA/knowledge.sqlite"
npm run catalogue:knowledge -- search --database "$NEW_PRIVATE_DATA/knowledge.sqlite" --query "$PRIVATE_QUERY"
npm run catalogue:knowledge -- generate --database "$NEW_PRIVATE_DATA/knowledge.sqlite" --query "$PRIVATE_QUERY" --output "$PRIVATE_DRAFT"
```

Supply the existing authorized catalogue/metadata/review bundle separately using
TEAM-SETUP. Do not assume a configured shared cloud location or authorization
exists. Draft candidates retain evidence, alias collision holds, heuristic rarity
and publication restrictions; they are not live answers.

## Executed private enrichment checkpoint — 2026-11-23

The existing persistent database was enriched, not replaced. Discovery acquired
4,615 additional Wikidata character candidates beyond the previous 9,016 and
processed previously omitted properties for 5,458 already bound characters. Of 77
bounded discovery cohorts, 75 completed; two narrowed work groups still timed out.
Their IDs/pages and errors remain checkpointed. This is not exhaustive Wikidata or
ACDB website coverage. All 30 available local primary ACDB character pages were
already ingested; 56,069 bound ACDB IDs without tag assignments remain queued for
an authorized provider feed. No unauthorized webpage crawl was performed.

| Active unique coverage | Before | After | Increase |
|---|---:|---:|---:|
| Searchable knowledge identities | 58,275 | 60,671 | 2,396 |
| Character/trait/value triples | 330,821 | 350,313 | 19,492 |
| Substantive triples excluding gender/classification and aliases | 251,150 | 258,356 | 7,206 |
| Characters with occupations | 2,644 | 3,587 | 943 |
| Characters with abilities | 374 | 573 | 199 |
| Characters with affiliations | 880 | 1,499 | 619 |
| Characters with detailed appearance | 6,565 | 6,594 | 29 |
| Characters with equipment (including named items/vessels) | 21 | 149 | 128 |
| Characters with species/race assertions | 239 | 313 | 74 |
| Characters with relationships | 1,036 | 1,338 | 302 |
| Characters with detailed profile facts (excluding apparent age) | 322 | 2,280 | 1,958 |
| Characters with actual ACDB webpage tags | 31 | 31 | 0 |
| Actual ACDB webpage tag assignments | 135 | 135 | 0 |

3,178 characters received new substantive facts. A broader 7,561 received some
new positive assertion including generic classifications or native-name aliases;
these counts must not be conflated. The 19,492 new triples include 8,918 generic
classification/gender facts and 3,368 alias facts. No baseline positive triple was
removed. There are 41 characters with explicit normalized weapon assertions; the
149 equipment total must not be described as 149 sword users. The Tenrai catalogue
remains 5,831 identities; source-identity admission does not invent MAL IDs.

A post-import identity audit detected two distinct Manda/Naruto QIDs sharing an
inferred canonical match. Both new crosswalks were quarantined append-only for
reconciliation, preserving original source history and all pre-task records.
A regression now holds distinct, previously unbound QIDs which would collapse
through the same name/franchise match. Native-name matches require franchise
compatibility; romanization-only matches are held rather than silently admitted.

The same offline generator produced, before/after: pirates 271/361; swordsmen
116/126; assassins 16/20; ninjas 87/210; demons 83/92; lightning 11/17; sword users
3/28; doctors 21/40; affiliations 619/1,037; snipers 2/3. Ponytail, goggles and masks
remain 1 each. These are draft candidates under unchanged predicates, not additions
to an active answer bank. Contextual exclusions, alias holds, heuristic rarity,
editorial Limit Break selection and publication-rights gates remain applicable.

The private job directory contains before/after coverage matrices, complete draft
candidate exports, raw source snapshots/checkpoints, source-access inventory,
collision-quarantine and zero-addition replay receipts. Its final report also
includes source-linked examples read back from active SQLite observations. Raw
research, catalogue files, review state and database backups remain excluded from
Git and Vercel. The public code contains no imported third-party database.

The source-example audit also detected an incorrect cached Wikidata birthday for
Luffy (May 6 versus May 5 in the official One Piece profile). That assertion was
held append-only with an evidence link; all other source assertions and historical
records were retained. No replacement claim or approval was fabricated. Earlier
audit exports remain privately archived, and the final counts exclude that claim.
Future changed-source imports must revisit this recorded conflict; source trust
alone does not establish factual correctness.

Validation of this checkpoint: all 276 tests passed; build, catalogue/metadata/
review-state validation, trait validation and immutable release-integrity checks
passed. Full SQLite validation reported integrity `ok`, indexed provider lookup,
and zero dangling bindings/versions/current fields, invalid checkpoints,
trust-status mismatches or unsafe trusted assertions. SHA-256 comparisons covered
all 2,279,530 baseline observations, 306,932 source records and the original legacy
snapshot; bindings and identity metadata were unchanged. All 56 prior trait
definitions were preserved, with four additive profile definitions. The existing
5,831-character catalogue and 5,360 pending review claims remain intact.
Completed source replays added zero observations, and replaying the older
supplement did not revive the held birthday assertion. Production files, existing
rarity assignments, immutable releases and deployment configuration were unchanged.
No credentials were found in the changed code/documentation; this is a targeted
pattern check, not a claim of an external security audit.

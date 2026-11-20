# Phase 5D — Private ACDB importer report

Implemented on feature/anime-character-database. No live gameplay, questions, scores,
Daily Challenge schedules, leaderboards, team-builder, canonical catalogue, trait
definitions or immutable releases were modified. No approval, commit, push, merge,
deployment or versioning activation performed.

## Delivered files
- catalogue/acdb/stage.py: safe SQL/gzip reader, private SQLite staging, source versions,
  batched transactional checkpoints, resume, deduplication, conflict quarantine,
  indexed names, decoded attributes and conservative anime identity matching.
- catalogue/acdb/review.js: pending proposals and guarded ingestion into existing Phase
  5B-3 review tooling, with source/identity/context/licence holds.
- catalogue/acdb/test_stage.py and catalogue/tests/acdb.test.js: regressions.
- catalogue/acdb/README.md and this report: usage and limits.
Private raw staging, source snapshots, preview/backup, reports and sample assessments
are under catalogue/private/phase5d and excluded from Git/Vercel.

## Measured import
The existing partial character archive was processed with explicit partial mode; only
complete SQL statements were imported. These numbers do not represent the whole ACDB.

{
  "snapshot": "7d07d5e17ccb93b486bfeccb0608b159c042176bf640afb3548f9f9cf3acc8d4",
  "sourceCharacters": 44489,
  "matchedRows": 1003,
  "uniqueMatchedCharacters": 1001,
  "proposals": 249,
  "associations": 249,
  "distinctPairs": 248,
  "potentialNewPairs": 211,
  "existingPairs": 37,
  "strictBatch": 0,
  "individual": 249,
  "held": 43486
}

{
  "sample": 50,
  "verdicts": {
    "ambiguous": 26,
    "unsupported": 24
  },
  "independentlySupported": 0,
  "confirmedIncorrect": 0,
  "confirmedIdentityMismatch": 0,
  "sampleAnime": 27,
  "sampleDecades": {
    "1990s": 5,
    "2000s": 37,
    "1970s": 2,
    "2020s": 1,
    "2010s": 5
  },
  "popularityRule": "Use metadata rank <=100 mainstream, 101\u20131000 moderate, >1000 less popular proxy; not a universal niche label",
  "popularity": {
    "mainstream": 23,
    "less_popular_proxy": 5,
    "moderate": 22
  },
  "decodedAttributes": 261963,
  "unknownAttributes": 4971,
  "ambiguousIdentityRows": 0,
  "indexedLookup10000Seconds": 0.09864282799389912,
  "databaseBytes": 114999296,
  "tableCounts": {
    "assignments": 221817,
    "characters": 44489,
    "publishers": 14706
  }
}

The staged database contains 44,489 characters, 14,706 titles and 221,817 assignment
rows. 261,963 documented attribute cells decoded; 4,971 remained unknown. These are
source observations, not verified trait associations. 249 pending hair-trait associations
were appended to the private review ledger; 248 distinct character/question pairs include
211 potentially new and 37 existing accepted pairs, reproducing Phase 5C exactly.
No claim of 211 genuinely valid new answers is made. Final eligibility is unresolved.

All 93 prior private associations and complete histories compare byte-for-byte in parsed
JSON against the backup; prior decisions are unchanged. Canonical five pending pilot
associations remain unchanged as well. Existing review decisions/identity reassignment
are held, never overwritten. All ACDB proposals retain dataset provenance and unresolved
publication permissions, and therefore cannot qualify from ACDB evidence alone.

## All active questions

|Question|Current answers|Potential new pairs|Existing pairs|
|---|---:|---:|---:|
|timed-v4-mix-red-hair|58|20|8|
|timed-v4-mix-masks|56|0|0|
|timed-v4-mix-glasses|80|0|0|
|timed-v4-mix-healers|61|0|0|
|timed-v4-mix-companions|37|0|0|
|timed-v4-mix-white-hair|45|29|6|
|timed-v4-mix-blonde|116|122|16|
|timed-v4-mix-fire|36|0|0|
|timed-v4-mix-lightning|20|0|0|
|timed-v4-mix-mentors|57|0|0|
|timed-v4-mix-pink-hair|30|20|5|
|timed-v4-mix-green-hair|21|20|2|
|timed-v4-mix-royalty|50|0|0|
|timed-v4-mix-twins|23|0|0|
|timed-v4-wide-ghibli|27|0|0|
|timed-v4-wide-sports|57|0|0|
|timed-v4-wide-isekai|61|0|0|
|timed-v4-wide-mecha|31|0|0|
|timed-v4-wide-magical-girl|48|0|0|
|timed-v4-wide-starters|31|0|0|
|timed-v4-wide-shinkai-hosoda|18|0|0|
|timed-v4-wide-time-travel|18|0|0|
|timed-v4-wide-detectives|41|0|0|
|timed-v4-wide-vampires|38|0|0|
|timed-v4-wide-robots|52|0|0|
|timed-v4-wide-ninjas|20|0|0|
|timed-v4-wide-eyepatch|12|0|0|
|timed-v4-wide-cats|39|0|0|
|timed-v4-wide-dragons|20|0|0|
|timed-v4-wide-studios|57|0|0|
|timed-v4-wide-food|20|0|0|
|timed-v4-wide-long-running|23|0|0|
|timed-v4-wide-shinigami|18|0|0|
|timed-v4-wide-hats|22|0|0|

Unsupported question categories remain zero: this dump does not supply the required
explicit glasses/masks/hats/eyepatches/species/occupation relationships. White is not
silver; gray is not silently reclassified. Eye colour, hair length and other documented
attributes are retained in staging but not forced into unsupported trait definitions.

## Fifty-record evidence assessment
The sample uses at most three records per anime grouping and one per identity, prioritizing
new answers. It spans 27 anime and five release decades. Popularity groups use existing
metadata rank: <=100 mainstream, 101–1000 moderate, >1000 a less-popular proxy, not an
objective definition of niche. Counts: 23 mainstream, 22 moderate, 5 less-popular proxy.
Genres and years are preserved per sample record; no popularity or genre was invented.

There are 26 ambiguous context/form records and 24 unsupported records. Independently
supported: zero; conclusively incorrect: zero; conclusively mismatched identities: zero.
These zeros do not establish accuracy. The assessment uses available source/context
limitations and prior research; it is not a new independent canonical-source verification
of all 50. The earlier 30 ACDB page checks confirm decoding only. Broader independent
fact-checking remains required before a release. No new reliable evidence was asserted
or fabricated to fill a quota. See private accuracy-50.json for per-record evidence,
limitations, metadata and dispositions. No sample record was approved.

## Performance and recovery
A deliberate stop after two batches was resumed successfully. Remaining staging plus
matching/export took 15.24 seconds on this workstation; an identical completed rerun
(including matching/export) took 4.93 seconds. SQLite occupies 114,999,296 bytes.
10,000 indexed name lookups took approximately 0.099 seconds. These are local single-run
measurements, not production guarantees. Repeated review ingestion was tested for exact
state idempotency; its separate timing is stored in private repeat-benchmark.json.

Matching/export still materializes source rows; the inherited review JSON pipeline is
slower than staging and validates the whole ledger. Larger review batches need additional
profiling/pagination. Source-version updates retain old versions rather than delta-compressing
them; plan retention/backups. The existing review store uses an exclusive lock; process
termination there can require inspecting a stale lock. SQLite transactions recover without
manual checkpoint repair. No live API or AI call occurs in this pipeline or gameplay.

## Licensing and next steps
ACDB ODbL/DbCL permits private processing and commercial use subject to licence conditions.
Keep attribution/notices, determine derivative versus collective database treatment, and
satisfy applicable share-alike/database-offer requirements before public use. Server-side
storage does not avoid public-use obligations. Tenrai's separate redistribution questions
remain; Wikidata CC0 does not resolve them. Original sources and derived evidence remain
separately identifiable. No public output was generated.

Next: resolve publication compliance; obtain independent anime-specific evidence for the
held candidates; let configured maintainers review eligible records through the existing
interface. Only then prepare a separately reviewed rarity assignment and immutable bank
release. No production integration is included here.

Start the interface with `node catalogue/verification/server.js`; open its printed local
session URL. The unchanged maintainer roster is empty, so it starts read-only. Use the
commands and trust boundaries in README.md for future import batches.

## Validation checkpoint

All 106 project tests passed, including six ACDB test groups covering Python staging and Node review integration. Build, catalogue, canonical trait, anime metadata and release hash/assignment checks passed. Git diff whitespace checks passed. Existing tracked runtime/data files are unchanged. Private datasets remain Git-ignored and catalogue/** remains excluded by Vercel. No independent canonical accuracy rate is claimed.

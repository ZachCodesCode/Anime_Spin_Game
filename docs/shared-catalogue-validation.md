# Shared catalogue integration verification

Base: origin/main 203e4335b16bc9e97cf787b32a53f048869bd865. The original feature
branch and all private review histories remain unchanged.

* 174 automated tests passed, including the existing app, answer expansion,
  Descent, catalogue/import, trait, novelty, evidence, generator, freshness,
  bounded admission and new private-bootstrap/security checks.
* `npm run build` passed; `npm run ascent:integrity` passed.
* Actual existing private data validated: 5,831 identities, 5,950 appearances,
  100 anime, 18 trait definitions, five pending initial claims, zero verified.
  No real catalogue data or research is part of the public diff.
* Real-data offline generation produced seven existing proposed question banks,
  4,389 candidate pairs, 583 holds and a valid private immutable preview. No
  answer was approved, published or assigned by this process.
* The corrected additional draft generation gives 27 questions (10 character,
  17 title), 4,096 pairs; combined inventory remains 34/8,485. The November 24–26
  planner correctly returns a held release because no new content is approved.
* Fresh-clone bootstrap rejects missing trusted checksums, unauthorized/malformed
  bundle metadata, public destinations, changed data, unknown names, overwrites
  and escaping symlinks. Owner-export/recipient-bootstrap CLI flow passed with
  explicitly fictional test data; no real permission is inferred from that test.
* Existing review tests enforce loopback Host/Origin, random token, actual
  configured maintainer roster, explicit preview/confirmation and stale-state
  checks. AI-only claims cannot verify themselves. Histories remain append-only.
* Live questions, scoring, run engine, Descent, game UI, index.html, existing
  API handlers and production database files are byte-for-byte unchanged from
  main in this branch. Static preview changes only protect offline paths/routes.
* Secret-pattern scan found no private keys/tokens in changed/new public files.
  Git ignores raw datasets/private histories; Vercel excludes all catalogue and
  scheduler tooling. No production database command, merge, deployment, bank
  activation or automatic source collection was executed.

Remaining shared-access gate: the owner must authorize a private team transfer,
provide actual storage access, and supply the independently confirmed bundle
checksum. The implementation is usable with existing authorized local data;
repository access alone does not make restricted data available to another user.
See catalogue/TEAM-SETUP.md for exact commands and permission boundaries.

## Persistent importer continuation

The original integration checks above are retained as historical context. This
continuation extends only the shared branch with source adapters and persistent
trait ingestion. Current checks: 195 automated tests passed, build and immutable
release integrity passed. SQL staging transaction/resume tests, source permissions,
provider mappings, canonical identity/Japanese-name collisions, atomic failure,
idempotent imports, derived conflict gates, private review-state transfer and the
existing approved-eligibility-to-generator path are covered. Approval-path unit
fixtures are explicitly fictional; they are not real maintainer decisions.

Actual private demonstration: a fresh request retrieved 30 Wikidata CC0 entities,
which yielded 36 candidate claims. Thirty-one ACDB source records yielded 90
candidate claims; the reused current SQL parser independently processed 44,489
records from a cached partial source before bounded import. Its incremental
reimport created zero duplicate claims. There are 126 newly persisted claims across
60 distinct matched characters (61 source character records), plus the five original
pending claims: 131 pending, zero verified and zero question-eligible approved.
The source adapter retained all ACDB publication holds. Current ACDB API/download
checks returned 503; no challenge was bypassed and no page scraper was built.

Private evidence, source files, staging SQLite, all 131 claim histories and the
answer-review package remain excluded from this public PR. The package shows
pending source-linked candidates; real approved output remains empty. This is
intentional enforcement of the no-auto-approval requirement, not missing storage.
The code's approval-to-generator path passes using actual configured-reviewer
semantics in synthetic tests. Nothing in this continuation changes a public bank,
rarity, Daily assignment, live scheduler, Ascent/Descent gameplay, API, score,
archive, release branch or production database.


## Extended local profiles and batch ingestion — 2026-11-22

209 automated tests pass, along with build, immutable release integrity, catalogue
validation and trait/history validation. Definitions now total 46. Fourteen new
profile tests cover the complete 17-label vocabulary, multiple ages/contexts,
relationships, uncertain targets, non-anime media, unknown fields, biography
redaction, AI classification, private persistence/replay, source-ID collisions,
checkpoint resume and trait-generated drafts with explicit editorial Limit Break.

Actual private acceptance: the bounded user-supplied Usopp example retains all17
labels (17 normalized, zero held tags), 27 distinct claims and three typed links
(two canonical family links, one unresolved crew target). It is not an official
bulk tag export. The extended SQL run processes the same cached 44,489 partial rows;
1,003 selected rows yield 952 distinct matched characters, with 50 held identity/form
rows. It adds 5,202 context-sensitive claim records. Together with the 27 supplied
claims and original 131, the store has 5,360 pending claims, zero verified and zero
question-approved. There are 5,261 unique character/trait/value pairs: context
variants must not be counted as distinct discovered answers. All 131 prior claim
histories and 45 prior review records compare unchanged. Replays add zero claims
and preserve the same state hash. Source files, actual metrics and field-by-field
acceptance evidence remain private; no real research fixture is committed here.

Private sniper/pirate/ponytail/goggles drafts discover the supplied candidate with
source context and existing rarity proposals. They remain held for editorial Limit
Break selection and factual/eligibility/rights review. The same optional authorized
review-state bundle preserves profiles, typed links and checkpoints. No new admin
interface, live provider access, canonical alias mutation, gameplay/API change,
public answer publication or production database operation was introduced.

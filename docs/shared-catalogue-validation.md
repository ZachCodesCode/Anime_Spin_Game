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


## Full ACDB source-trusted knowledge extension — 2026-11-22

This continuation preserves 28e859d and introduces an indexed SQLite storage
adapter for the existing private importer, not a production database migration.
All three current official gzip SQL files downloaded successfully. The complete
archive contains 148,843 characters; 62,050 have an explicit source anime assignment.
Both full processing passes completed. A controlled interruption at 1,000 rows
resumed through the full export. The final extended-source replay adds zero
observations. The supplied Usopp profile remains a separate bounded input.

230 automated tests passed before the final documentation checkpoint, including
21 new indexed-workflow regressions. Build, immutable bank integrity, original
catalogue and trait/history validation pass. Full indexed invariants and SQLite
integrity pass: no dangling bindings/versions/current fields, invalid checkpoints,
trust-status mismatches or unsafe trusted assertions. Legacy JSON data is unchanged
(5,831 identities, 5,950 appearances, 5,360 historical pending claims). Definitions
now total48; source.tag is an extensible explicit-label namespace and profile.goal
stores source-reported goals. No fabricated MAL IDs or maintainer approvals.

Project-owner ACDB source trust is explicit and applies only to internal candidate
generation. It does not imply independent factual verification or rights clearance.
Unknown source meanings, contradictory same-context values, uncertain forms and
rejected claims remain held. AI/editorial interpretations are not upgraded to source
trust. Profile biographies are hashed unless a separate configured grant explicitly
allows retention; licensed retention preserves the actual permission audit fields.

Actual offline drafts produce 1,515 orange-haired candidates, 1,476 blue-haired
female candidates and134 source-reported horn candidates after collision exclusions.
Three separate private drafts have explicit editorial Limit Break proposals and
pass actual bank-format validation. Ponytail/goggles/sniper/pirate searches currently
find only the supplied character: these traits are absent from the official bulk
schema, not false for every other character. Rich tag/profile access remains an
export/API permission and availability gap. These are internal candidates, not
published answers or independently measured rarity statistics.

The complete private database, prepared sources and reproducible full-source JSON
are stored under the existing persistent development data directory. Source fields,
provenance, rights holds and historical observations remain private. The existing
owner-authorized transfer workflow now supports a compressed consistent SQLite
attachment with trusted checksums, schema validation and no-overwrite bootstrap.
No real transfer grant was fabricated. No canonical roster reset, public admin
endpoint, game/API/score change, question-bank publication, main merge, production
migration or deployment occurred. Ascents #12–13 and the separate #14–16 release
are unchanged. Full metrics and source-linked examples are in the private report.


Final saved full-coverage totals: 148,843 unique source records, three completed
imports (two full SQL passes plus the supplied profile), zero unfinished imports;
2,146 matched existing identities and53,946 new source identities. 56,091 characters
have searchable traits. There are 297,837 current source-trusted observations,
deduplicating to297,821 character/trait/value/context claims; 22 definitions and111
distinct trait/value combinations are represented. Structured trusted profile facts
number297,820; the17 tag assignments remain exclusively the supplied example.
Three relationship observations are retained, one with an unresolved target.
One admitted record has no useful traits and is skipped. Historical intake-hold
counts include excluded non-anime records; they are not counts of factual disputes.

The full report, receipts, source hashes and draft banks are private and durable.
The sequential full-store coverage audit took approximately357 seconds on this
machine; full history audits are offline operations, not live-game requests.
Interactive trait drafts were generated successfully without provider calls.

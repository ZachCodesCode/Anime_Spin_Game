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

## Character-tag-only access checkpoint — 2026-11-22

No new real character-tag assignments were obtained or imported in this checkpoint.
The fresh api_dumps.php response requires an API key and returns HTML, not a dataset.
The public tag list supplies vocabulary/counts, not an authorized assignment export.
No ACDB credential or licensed tag dataset was available. No SQL attributes were
reimported, no HTML listing was harvested and no protected endpoint was bypassed.
The focused request and exact preferred transfer contract are in catalogue/acdb/
CHARACTER-TAG-ACCESS-REQUEST.md and CHARACTER-TAGS.md. Protected feed contents remain
unverified; a key alone is not proof that it contains character-tag edges.

The existing adapter now retains original provider tag/assignment IDs and holds
explicit series-level tags and conflicting IDs. Explicit swordsman/cyborg/mask
labels normalize without inferring a profession from a weapon or glasses from
goggles. The documented maid tag describes clothing, so it does not establish an
occupation. Unknown labels remain searchable source tags. This is a bounded
compatibility correction, not another importer or database.

233 tests pass, including three new tag-contract regressions with explicitly
fictional data. Five fictional identities prove metadata preservation, source trust,
read-back and duplicate-free repeat import; they are never counted as real ACDB
records. Build, release integrity, original catalogue and trait/history validation
pass. Real generator readback remains pirate1, sniper1, swordsman0; positive tag
queries also remain ponytail1/goggles1 and assassin/demon/lightning/mask0. All four
positive categories derive from the previously supplied character, not a new feed.
The original JSON ledger SHA256 is unchanged, and the existing knowledge store
still contains3 source versions,3 completed jobs,56,092 admitted identities,
297,687 historical source records and2,237,168 observations. No gameplay, score,
leaderboard, archive, Anime Descent or separate release changes were made.

## Real Wikidata enrichment — 2026-11-22 (PR #28 continuation)

Continues `90d2eb4` on `feature/shared-anime-character-database`. No new branch,
PR, production migration or answer publication. A verified consistent pre-write
SQLite backup was retained privately. All source retrieval uses official scoped
Wikidata APIs, with identifying User-Agent, bounded paginated/batched requests,
Retry-After/maxlag backoff and cached checkpoints. ACDB's official tag endpoint
still requires a key: **zero new ACDB tag assignments**; no unchanged SQL rerun,
character-page scrape or authentication bypass.

Actual imported cohort: **9,016 QIDs**, including 8,179 returned P4085 IDs and
2,368 returned P7013 IDs. Preliminary separate COUNT queries returned slightly
larger counts; the difference is unresolved. This is completed ingestion of the
enumerated identifier-backed cohort, not exhaustive worldwide anime coverage.
The representative real 40-character pilot preceded the full cohort import.
Final active projection, after identity quarantine:

| Metric | Actual result |
| --- | ---: |
| Existing identities confidently matched | 5,111 |
| New independent Wikidata source identities | 1,722 |
| Held identities | 2,183 |
| Active Wikidata source-trusted statements | 39,714 |
| Distinct Wikidata character/trait/value triples | 39,710 |
| New distinct triples beyond ACDB | 32,803 |
| Duplicate triples already present in ACDB | 6,907 |
| Characters gaining new information | 6,831 |
| Newly searchable characters | 2,184 |
| Total searchable characters | 58,275 |

The new information includes normalized occupations (794 statements), literal
other occupations (2,684), abilities/transformations (753), affiliations (1,139),
species (237), hair (1,802), eyes (1,528), personality (316), family (1,326),
other relationships (229), clothing (528), eyewear (44), accessories (31),
birthdays (133), other characteristics (44), used items (20), and classifications
(21,491) and gender (6,615). These totals include source duplicates retained as
evidence; see the private report for distinct-new-fact counts by trait. Generic
classifications are not inflated into new powers or independently verified traits. Excluding classification and gender, there are 9,214 new distinct facts across 4,016 characters.

Existing generator, identical pre/post query conditions and catalogue metadata:

| Draft category | Before | After |
| --- | ---: | ---: |
| Pirates | 1 | 271 |
| Swordsmen | 0 | 116 |
| Assassins | 0 | 16 |
| Demons | 0 | 83 |
| Lightning | 0 | 11 |
| Doctors | 0 | 21 |
| Ninjas | 0 | 86 |
| Straw Hat membership | 1 | 4 |
| Horns | 134 | 133 |
| Green hair | 1,577 | 1,579 |

Additional queries generated eight blue-haired swordsmen, two snipers, one mask
candidate, one ponytail and one goggles candidate. There were no retained magic,
sword-use or horned-magic draft candidates; missing evidence/context/identity
remains unknown. New identities may increase alias collisions, explaining why a
category can shrink without deleting its evidence. All lists remain internal
editorial proposals, not exact-question-eligible or published answers. Existing
rarity heuristics are retained; no invented popularity or automatic Limit Break.

Identity auditing caught Q126540248 (Ann): its MAL ID conflicted with an existing
ACDB/name-franchise crosswalk. Five provisional Wikidata observations were retired
from search and its current binding removed; historical observations and original
ACDB evidence were preserved. Regression tests cover this differing-MAL fallback,
quarantine, deleted statements, deprecated/nonvalue claims, qualifiers, temporal
compatibility, duplicate replay, source provenance and generator trust separation.
The original 2,237,168 observation rows hash identically in backup and current
store. All 297,821 baseline ACDB distinct triples, the 17 Usopp tags and the legacy
5,360-claim review state remain intact. Full-job replay adds zero observations.

**245 automated tests pass**, including existing gameplay, Descent, scoring,
saved-result/versioning and private-review tests. Build, catalogue (5,831 identities,
5,950 appearances), trait (56 definitions / 5,360 unchanged pending claims), and
published release/assignment integrity checks pass. The full production-size local SQLite integrity check passed (`ok`), with zero dangling records, invalid checkpoints, trust mismatches or unsafe trusted assertions; the receipt remains private.
No runtime game/API/answer-bank files changed in this continuation. Raw source
snapshots, all statement-level examples (14 real characters), source-linked private
drafts and transfer-ready local store remain excluded from Git and Vercel.

`wikidata_source_trusted` is explicit source trust for offline generation, not
independent verification or final approval. References may be absent. Unknown
adaptation, form or recurrence must still be reviewed for a particular question.
CC0 on Wikidata does not clear ACDB ODbL/DbCL obligations in combined results.
The same authorized private bundle/bootstrap workflow supports the enriched store;
see `catalogue/TEAM-SETUP.md` and `traits/importer/KNOWLEDGE.md`. Actual transfer
permission and access-controlled storage are still required. No daily updater,
live provider/AI call, fabricated maintainer decision or production sync was added.

## Saved ACDB character-page extraction — PR #28 continuation

The offline saved-page adapter reuses the existing prepared ledger, persistent
SQLite store, ACDB policy, search, generator and private team-transfer workflow.
Input modes are one HTML file, a directory, a URL/ID manifest, bounded supplied
text, or existing structured profiles. No SQL bulk import was repeated. Optional
network acquisition fails closed without a real documented grant; no character
page was requested from the website in this task. Raw HTML/data stay private.

Final corrected real-data results:

| Metric | Actual count |
| --- | ---: |
| Existing saved HTML pages processed | 30 |
| Source characters including supplied Usopp | 31 |
| Canonical identities matched | 31 |
| Remaining identity/parse failures | 0 |
| HTML character-tag assignments extracted | 118 |
| New tag assignments beyond Usopp | 118 |
| Total active ACDB tags including original Usopp 17 | 135 |
| Distinct labels in these inputs | 95 |
| New distinct positive character/trait/value triples | 197 |
| Existing characters gaining new information | 30 |
| Original positive triples missing afterward | 0 |

The 30-page import prepared 105 source-trusted profile observations in addition to
118 trusted tag observations; 90 profile observations remain held/pending. New
triples include 87 literal `source.tag` values and source aliases, not 197 newly
verified biological attributes or accepted game answers. Unknown tags are retained
rather than guessed. Existing equivalent basic SQL attributes were skipped (130
observations in the corrected import); source duplicates retain their provenance.

The parser scopes tags to the character's own section, rejects conflicting IDs,
excludes navigation/advertisements/comments and retains partial-input uncertainty.
It preserves original tag IDs when supplied, raw labels, source URLs, page hashes,
source-record import timestamps, anime context and licensing holds. Ages remain
multi-valued with unknown chronology; absent information is not false. Relations
preserve direction (subject's `Mother of X` means target X is a child), and source
character identity is frozen before related characters are parsed. Only narrow
exact-subject description templates yield facts; other prose is hashed and pending.
Full biography reuse still requires an actual configured grant.

Real validation found and corrected an early parser variable collision between
source and relationship-target names. It caused apparent identity disagreements
and two incorrect temporary provider links. These were parser artifacts, not
preexisting crosswalk failures. Prototype projections were quarantined; original
metadata/source facets were restored from the verified backup and all 30 pages
were reprocessed correctly. Histories remain append-only, with no original
observation deleted or rewritten. New regression tests assert source names, tag
ownership and canonical bindings when relationships are present. Earlier private
prototype receipts are explicitly superseded by the final corrected report.

The independent preservation audit hashes all original 2,279,002 observations
identically before/after. Original bindings, canonical names/aliases/appearances,
Wikidata observations and legacy review state are preserved. Only two legitimate
new ACDB provider links were attached to existing canonical identities. Unassigned
UI markers (`Unsorted`) are held; stable deep hashing prevents relationship
observation duplication from JSON key ordering. Indexed current-profile reads
avoid repeatedly scanning multi-gigabyte historical source records during batches.

All 17 supplied Usopp tags persist; fresh-process readback confirms ages 17/19,
height 174 cm and April 1 birthday. No complete saved Usopp HTML page was available
or fabricated: acceptance used his supplied tag text and structured profile plus
30 other real HTML pages. Actual data counts are separate from synthetic fixtures.

Existing-generator candidate counts: ninjas **86 → 87**, sword equipment/users
**0 → 3**. Pirates 271, snipers 2, swordsmen 116, assassins 16, demons 83, goggles 1,
ponytail 1, masks 1 and lightning 11 remain unchanged. Alias/short-name collisions
still hold candidates; sword equipment does not imply a swordsman occupation.
No measured popularity/response frequency, rarity approval or Limit Break choice
was fabricated. Nothing was approved or published automatically.

**264 tests pass**, including 19 saved-page/parser regression tests. Build,
catalogue/trait validation, release integrity, real-data replay/readback, full local
SQLite integrity and preservation checks pass. Live game/API/answer banks,
scoring, dates, Descent, production Turso and the separate #14–16 release remain
unchanged. No merge, deployment or versioning activation occurred. See
`catalogue/acdb/PAGES.md` and `catalogue/TEAM-SETUP.md` for actual commands and
permission/private-transfer requirements. Raw pages and the SQLite database are
excluded from Git and Vercel; ACDB ODbL/DbCL publication holds remain intact.

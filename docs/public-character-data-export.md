# Public character-data preparation report

Prepared locally on 2026-11-24 for the existing feature/shared-anime-character-database branch and PR #28. Nothing has been committed, pushed, merged or deployed by this task. This is a redistribution-scoped source dataset, not a release of approved game answers.

## Final coverage

- Dataset version: `8ea694cd907a450ae9bebc68d9c2cb8bd23b0fe6a92e46ea04de2a1042316f28`.
- 59,645 source-native character records; 59,644 have searchable positive traits.
- 58,908 records have permitted anime-assignment evidence, covering 4,700 source-native anime IDs. Source-native IDs are not a deduplicated cross-provider franchise census.
- 323,573 distinct positive character/trait/value triples, grouped once per character; 325,761 underlying source/context assertions.
- 32 gzip JSONL partitions totaling 14,018,166 bytes. Largest partition: 468,921 bytes. Complete public-data directory: 40 files, 14,078,758 bytes at verification.
- ACDB: 292,733 assertions and 292,733 source-specific distinct triples.
- Wikidata: 33,028 assertions and 33,024 source-specific distinct triples. Source-specific triple totals overlap, so they must not be added as a unique combined total.

The original store has 60,673 identities, 60,671 searchable characters, 350,313 distinct positive triples and 358,289 current positive observations. Public representation is not one-to-one with private canonical IDs: source-native identities/forms are retained and only documented, nonconflicting source links can join them. 1,034 private identities lack public representation. Public source-native record count is 1,028 below the private identity count; searchable coverage is 1,027 below the private baseline. These arithmetic differences are not a claim that every public ID equals one private canonical ID.

The manifest records the exact coverage and exclusions. The public package is partial, not the full private database.

## Exclusions and provenance

32,528 current positive observations are excluded: 31,873 lack a publishable source-native identity link; 289 lack original supported source/acquisition provenance; 366 reference unavailable relationship targets. Separately counted source-record decisions are 96,065 held identities, 4,352 uncleared cross-source identity links, 928 missing source-backed anime assignments, 123 invalid source names and eight ambiguous multiple-Wikidata identities. These source-record counts include historical source records and are not additional excluded unique characters.

11,506 ambiguous alias readings and 74,927 damaged/unsafe alias readings are withheld. These are readings encountered during projection, not counts of characters or necessarily distinct strings. No missing trait is converted to false.

Saved ACDB pages/tags, raw biographies, images, private reviews/history, unresolved Tenrai/MAL labels/cast metadata and inferred identity joins are excluded. Source-backed numeric external identifiers may be retained as identifiers; this does not import MAL/Tenrai content. Relationships use public target IDs. Anime assignments without permitted source evidence are unknown and prevent automatic anime-question candidates.

Official SQL supplies normalized appearance/profile fields, not the complete scraped ACDB tag collection. Wikidata supplies structured occupations, abilities, affiliations, equipment and relationships where actual statements exist. Genre, studio, release year and episode-count metadata are not supplied. All facts remain source assertions, not independently verified facts or approved answers.

## Redistribution conditions

The package includes ACDB attribution, unmodified ODbL 1.0 and DbCL 1.0 license texts, source locators and per-assertion provenance. The selected derivative database is offered under ODbL; ACDB contents retain DbCL and Wikidata structured contents retain CC0. Retain notices and applicable attribution, share-alike and machine-readable derivative-access obligations. See `catalogue/public-data/NOTICE.md`.

References: [official ACDB dump terms](https://www.animecharactersdatabase.com/databasedumps.php), [ODbL](https://opendatacommons.org/licenses/odbl/1-0/), [DbCL](https://opendatacommons.org/licenses/dbcl/1-0/), [Wikidata licensing](https://www.wikidata.org/wiki/Wikidata:Licensing).

This scope does not clear excluded material, artwork or game code. It does not determine whether the larger mixed private store is a collective or derivative database. Public use of that store or produced works derived from it needs a separate ODbL scope/access-offer assessment. Future answer-bank publication still requires question-specific eligibility, editorial approval and applicable rights review. Independent corroboration does not erase database provenance.

## Implementation and usage

`catalogue/team-export.py public` delegates to the new policy-scoped projection of the existing store. The original SQLite source is opened read-only. The export requires original official-provider headers; a reconstructed public index cannot masquerade as an upstream source. Deterministic hash partitions, gzip headers, content checksums and unchanged-byte reuse avoid unnecessary Git changes. Synthetic no-op re-export tests verify unchanged bytes and modification times. The final real projection reflects stricter original-source provenance checks; it should not be described as an unchanged replay of earlier exploratory exports.

`catalogue/public-data.js` validates policy, manifest version, partition hashes, UTF-8, record boundaries, identities, trait groups and relationship targets. It creates only a new private local search index using the existing ingestion/schema implementation. Generation delegates to the existing knowledge generator. Planning delegates to the existing freshness planner, preserving equivalent-concept checks, minimum 14-day cooldown and preference for smaller reviewed answer pools when repeats are eligible. No dates, approvals or live answers are generated automatically.

From a clone containing the owner-published changes:

```sh
npm ci
npm run catalogue:public -- validate
npm run catalogue:public -- search --name Naruto
npm run catalogue:public -- profile --id acdb-character-20395
npm run catalogue:public -- bootstrap --directory catalogue/private/public-v1
npm run catalogue:public -- search --database catalogue/private/public-v1/knowledge.sqlite --query catalogue/public-data/examples/pirates.json
npm run catalogue:public -- generate --database catalogue/private/public-v1/knowledge.sqlite --query catalogue/public-data/examples/blue-hair.json
npm run catalogue:public -- plan --input YOUR_PRIVATE_REVIEWED_PLAN.json
```

For later source updates:

```sh
npm run catalogue:public-export -- --database /ABSOLUTE/PRIVATE/knowledge.sqlite
npm run catalogue:public -- validate
```

Use a new private index directory after a dataset version changes. Existing indexes are never overwritten. Research output stays private. See `catalogue/public-data/README.md` for complete commands and limitations.

## Verification and preservation

- Focused public-data tests: 3 passed, including licensed Unicode fixtures, exclusion of restricted prose/names/joins, explicit source identity linkage, lowercase Wikidata statement IDs, relationship remapping, duplicate-triple grouping, tamper detection, deterministic no-op output, existing-index protection, derived-index re-export rejection and scheduler delegation.
- Full test suite: 285 passed, zero failed or skipped.
- Build passed; immutable release hashes and assignments passed `npm run ascent:integrity`.
- Real final manifest/checksum/schema validation passed.
- Final source-native name lookup found five Naruto-related name/alias matches, including Naruto Uzumaki at acdb-character-10905.
- Real final public-index bootstrap passed the existing SQLite integrity and ledger validator (`integrity: ok`). The index is private and is never shipped with the public package.
- The reconstructed index returned 260 source-asserted pirate-trait matches. This is a research-match count, not 260 verified or newly accepted anime answers.
- Real generation through the existing engine produced 2,701 blue-hair research candidates and 622 held matches; zero approved playable additions and publicationAuthorized=false. The concept audit identified the existing `timed-v4-wide-blue-hair` prompt. These remain unreviewed research outputs in the ignored private index directory.
- These checks ran locally on macOS. New Windows/Linux GitHub Actions results are pending the owner's commit/push; local results are not a claim of cross-platform CI success.
- Original SQLite remains 6,231,969,792 bytes with unchanged 2026-11-23 01:32:23 modification time. Read-only ledger checks retain 60,673 identities, 25 versions, 317,048 records, 2,302,978 observations, 66,412 bindings and zero incomplete jobs. Original archives and review histories were not rewritten.
- The public-data directory is explicitly excluded from Vercel; private-data ignore rules remain. Runtime gameplay, question banks, scores, Daily assignments, Anime Descent, leaderboards, Turso and PR #27 remain unchanged.

## Files for owner review

Modified: `.vercelignore`, `package.json`, `catalogue/team-export.py`.
Added: `catalogue/public-policy.json`, `catalogue/public_export.py`, `catalogue/public-data.js`, `catalogue/tests/public-data.test.js`, this report, and `catalogue/public-data/` (README, NOTICE, schema, two licenses, two example queries, manifest and 32 partitions).

Next step: review the source policy, notices and GitHub Desktop Changes, then manually commit/push to PR #28 if accepted. No merge or deployment is needed to make the offline data available through GitHub. Generated answers must still go through the existing editorial release workflow.

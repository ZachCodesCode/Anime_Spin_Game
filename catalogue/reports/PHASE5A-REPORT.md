# Phase 5A final report

Completed locally on feature/anime-character-database, 2026-11-16.
Baseline: `78c69caf0d2e58f31a898f56eea153858ecf85b9` (Phase 4B checkpoint).
No merge, deployment, production database access, assignment activation or answer-list publication.

## Catalogue outcome

| Measure | Before | After |
|---|---:|---:|
| Unique MAL character identities | 380 | 5,831 |
| Anime represented | 14 | 100 |
| Character aliases | 103 | 103 |
| Character/anime appearances | 387 | 5,950 |
| Trait definitions | 3 | 18 |
| Unverified evidence-backed associations | 2 | 5 |
| Verified associations | 0 | 0 |

Added 5,451 character identities. All original identity objects, anime objects,
appearances, two trait associations and their review histories were compared to
the baseline and preserved exactly. MAL IDs deduplicate seasons/remakes; multiple
appearances do not create new characters. Distinct MAL IDs are never guessed to be
the same person. Provider-level duplicate identities still need a reviewed crosswalk.

The initial uncapped cast import exceeded the approximate 1,000 target, reaching
2,161 on completion of One Piece. After validation, a 100-character-per-anime broad
pass reached 5,014 across 72 anime. A bounded 50-per-anime diversity pass reached
5,831 across 100. Existing full casts were not reduced. This is a deliberately
sampled catalogue, not exhaustive coverage. The selection has 125 broad IDs and
28 diversity IDs; unprocessed broad selections remain future work.

## Breadth and popularity

Tenrai's source popularity rank is used only as a transparent planning proxy:
64 anime rank 1–500, 24 rank 501–2,000, and 12 rank above 2,000. These groups are
not a claim that every low-ranked anime is a cult classic or that rank measures
quality. In particular, niche identity/genre cannot be inferred from popularity.
Distinct character totals by band are 4,745 / 826 / 303; buckets overlap through
multi-anime appearances. One Piece still contributes a large share of the catalogue.

Examples of broader coverage include Yokohama Kaidashi Kikou, Fuujin Monogatari,
Kaiba, Kamichu!, Nekojiru-sou, Captain Herlock, Anne of Green Gables, and Astro Boy.
Release decades span the 1960s–2020s. All grouping uses retrieved metadata, with
unknown values left unknown; no popularity numbers or genre labels were invented.

### Unique characters by source genre (overlapping buckets)

| Genre | Characters |
|---|---:|
| Action | 3,574 |
| Award Winning | 808 |
| Sci-Fi | 1,053 |
| Adventure | 2,938 |
| Fantasy | 2,406 |
| Drama | 1,302 |
| Mystery | 824 |
| Suspense | 643 |
| Romance | 712 |
| Slice of Life | 171 |
| Supernatural | 700 |
| Comedy | 1,034 |
| Sports | 222 |
| Horror | 116 |
| Avant Garde | 151 |
| Boys Love | 17 |

### Unique characters by decade (overlapping buckets)

| Decade | Characters |
|---|---:|
| 1960s | 56 |
| 1970s | 142 |
| 1980s | 105 |
| 1990s | 2,408 |
| 2000s | 2,250 |
| 2010s | 827 |
| 2020s | 120 |

Themes are kept separate from genres. Source themes include Historical (664
characters), Detective (198), and Isekai (50); these describe anime, not every
character in them. Complete source genre/theme/rank metadata and per-anime counts
are in [distribution.json](distribution.json).

## Traits and evidence

Fifteen new definitions were added:

- `appearance.hair_color` — Hair colour.
- `appearance.accessory` — Worn accessory.
- `occupation.role` — Occupation or recurring role.
- `ability.element` — Combat element.
- `affiliation.membership` — Named group membership.
- `identity.royalty` — Royal status.
- `identity.multiple_birth` — Multiple birth.
- `identity.synthetic` — Synthetic body.
- `identity.creature` — Creature identity.
- `ability.transformation` — Named transformation.
- `ability.named_power` — Named power or technique used.
- `affiliation.companion` — Companion relationship.
- `identity.pokemon_starter` — Starter Pokémon status.
- `identity.origin` — Named geographic origin.
- `identity.codename` — Documented codename.

Three new candidates cover Kei Tsukishima’s eyewear, Conan’s detective activity,
and Jiji’s feline identity. All have official evidence URLs, original short
paraphrases, explicit MAL links and uncertainty notes. All five associations are
`needs_review`; none are approved. The existing Kyoya and Richard Braun claims
are unchanged. No source descriptions were bulk-mined into traits.

Identity metadata, proposed/verified claims, source facts/inferred suggestions and
question eligibility remain separate. The local bundle adapter enforces permission
review metadata, explicit identity links and evidence; it cannot itself verify
truth or licensing. Existing review tooling owns all status changes and preserves
history. Automatic approval and live validator integration are absent.

## Existing-question gap analysis

All 109 prompts are inventoried: 70 character prompts, 10 anime/title/studio prompts,
28 non-character entity prompts, and one mixed character/object prompt. All 34
`wide` prompts used by the current daily rotation appear first in the inventory.
The non-daily franchise prompts often have compound membership/exclusion rules
that generic traits cannot resolve.

| Priority category | Curated answers | Verified associations | Pending associations |
|---|---:|---:|---:|
| Name any character who wears glasses or sunglasses. | 80 | 0 | 2 |
| Name any anime detective. | 41 | 0 | 2 |
| Name any cat character. | 39 | 0 | 1 |

All verified-association counts are currently zero. Counts of pending claims and
curated-name candidates are review workload, not accepted answers. Names alone
are insufficient evidence, and potential homonyms are not automatically merged.
[coverage.json](coverage.json) lists every prompt, category, required attribute,
curated answer count, pending character IDs, name-match leads and limitations.
[coverage.md](coverage.md) provides the full human-readable table.

## Import resilience and performance

Imports use stable-ID and appearance indexes, serial throttling, bounded retries,
Retry-After handling, atomic/batched checkpoints, and resumable pass IDs. New pass
IDs permit incremental cast updates without overwriting original identity objects.
Empty/failed anime stay retryable; malformed individual records are reported for
manual investigation and can be retried in a new pass. Recovery refuses live locks.
The default detailed-character importer is preserved; bulk mode uses cast names.

No new HTTP/network failures or rejected records were observed in Phase 5A. The
stored cumulative failure counter of five is inherited from Phase 2. Alias count
remains 103 because the cast endpoint lacks nickname lists; this is missing detail,
not evidence that new characters have no aliases. A future reviewed enrichment pass
should add aliases without renaming IDs or creating unsafe gameplay matches.

Measured live import sessions: the broad continuation added 2,853 characters in
137.885 seconds (138 endpoint calls); the final diversity pass added 817 in 73.771
seconds (56 endpoint calls). First-pass timing was not recorded. These include
network and checkpoint costs and are not guaranteed service throughput.

| Final local catalogue benchmark | Measurement |
|---|---:|
| Pretty JSON size | 3,272,655.000 bytes |
| Validation | 78.131 ms |
| Atomic JSON write | 35.863 ms |
| Index construction | 2.574 ms |
| 100,000 indexed lookups | 4.304 ms |
| Deduplicate doubled identity input | 5.261 ms |
| Process RSS | 117,256,192.000 bytes |

JSON remains adequate at this size; no database migration is justified. Synthetic
10k/50k-character benchmarks are explicitly isolated fixtures, never catalogue
records. At 50k characters / 100k appearances, pretty JSON is ~40.7 MB and measured
process RSS is hundreds of MB. Whole-file rewrite cost, duplicate in-memory objects,
review-model linear scans, stale source facts, and increasing Git diffs are scale
risks. Prefer a local transactional SQLite staging store with compatible JSON
export before substantially larger imports. No paid or production storage was added.
Actual timing samples are in final-benchmark.json, import-sessions.json and
synthetic-scale.json; synthetic incremental runs also verify a zero-request resume.

## Sources and publication limits

Tenrai supplied cast identities and structured anime metadata. Official Good Smile,
TMS and GKIDS pages support the candidate pilot. Wikidata was evaluated as a
potential CC0 structured evidence source but not imported. AniList bulk ingestion
was excluded because its terms prohibit mass collection. See [source review](../SOURCES.md)
for links, matching strategy, permissions and reliability limits.

Tenrai permits application caching but does not grant underlying third-party
rights or blanket raw-data redistribution rights. Expanded public repository or
static-hosting publication needs review. The project’s existing root-directory
hosting would expose catalogue files if deployed unchanged; this phase does not
modify hosting or deploy. No biographies, images, raw API archives or credentials
are included. Minimal identity data does not itself settle licensing questions.

## Checks and preservation

- 58/58 tests passed, including nine new expansion/metadata/coverage/ingestion tests.
- Build, catalogue/traits/metadata validation, release integrity and diff checks passed.
- Original records and trait histories preserved exactly against the baseline.
- Only catalogue/ paths changed. Gameplay, questions, answers, scoring, animation,
  API, leaderboards, team builder, production schema and assignments are unchanged.
- No versioning activation, rarity assignment, merge, deployment or production write.

## Phase 5B recommendations

1. Human-review the five evidence-backed claims; resolve adaptation, recurrence,
   glasses-versus-sports-eyewear, and detective subtype explicitly.
2. Review possible name/alias identity matches and provider-level duplicate IDs.
3. Define per-question eligibility, especially exclusions, composite questions,
   creature forms and temporal context; never substitute genre tags for character facts.
4. Add source-backed nickname enrichment and broaden underrepresented anime without
   relying on uncapped large franchises to inflate totals.
5. Resolve publication permissions and exclude offline data from public hosting
   unless approved. Consider reviewed Wikidata crosswalks; do not bulk-copy AniList.
6. Address Phase 4B’s API availability and future-date pinning deployment blockers
   separately before activation. Preserve existing questions and scores meanwhile.

## Files created or modified

- `catalogue/PHASE5A.md`
- `catalogue/README.md`
- `catalogue/SOURCES.md`
- `catalogue/benchmark-scale.js`
- `catalogue/benchmark.js`
- `catalogue/coverage.js`
- `catalogue/data/anime-metadata.json`
- `catalogue/data/catalogue.json`
- `catalogue/data/report.json`
- `catalogue/diversity.json`
- `catalogue/expansion.json`
- `catalogue/import.js`
- `catalogue/metadata.js`
- `catalogue/reports/PHASE5A-REPORT.md`
- `catalogue/reports/coverage.json`
- `catalogue/reports/coverage.md`
- `catalogue/reports/distribution.json`
- `catalogue/reports/final-benchmark.json`
- `catalogue/reports/first-gate.json`
- `catalogue/reports/import-sessions.json`
- `catalogue/reports/second-gate.json`
- `catalogue/reports/synthetic-scale.json`
- `catalogue/schema.json`
- `catalogue/tests/expansion.test.js`
- `catalogue/traits/data/associations.json`
- `catalogue/traits/data/definitions.json`
- `catalogue/traits/data/phase5a-candidates.json`
- `catalogue/traits/data/report.json`
- `catalogue/traits/ingest.js`
- `catalogue/traits/schemas/review.json`
- `catalogue/traits/schemas/store.json`
- `catalogue/traits/schemas/suggestions.json`
- `catalogue/validate.js`

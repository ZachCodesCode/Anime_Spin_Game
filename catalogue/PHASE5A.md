# Phase 5A: offline expansion and evidence workflow

This directory remains offline tooling. No game/API imports it. Do not publish
expanded answers, assign rarity, change daily assignments, or activate versioning.
See [final report](reports/PHASE5A-REPORT.md), [source review](SOURCES.md), and
[all-question inventory](reports/coverage.json).

## Importing and resuming

```sh
node catalogue/import.js catalogue/expansion.json catalogue/data
node catalogue/import.js catalogue/diversity.json catalogue/data
npm run catalogue:validate
node -e "require('./catalogue/metadata').validateAll(require('./catalogue/data/anime-metadata.json'))"
node catalogue/traits/cli.js validate
node catalogue/coverage.js
node catalogue/benchmark.js
node catalogue/benchmark-scale.js
npm test
```

These checked-in selections are resumable. Expansion stops at a target after
finishing an anime, so targets are not hard caps. The first run used no per-anime
cap and reached 2,161 rather than 1,000 after One Piece. Subsequently the broad
pass used 100 and the diversity pass 50 characters/anime, in provider order.
Existing larger casts are never truncated. Selection IDs are explicit editorial
sampling choices, not popularity claims. The recorded metadata supplies actual
titles, genres/themes, years and ranks; do not infer those from ID selections.

- `animeIds`: configurable MAL IDs, deduplicated before requests.
- `maxCharactersPerAnime`: optional positive cap; omit for complete casts.
- `characterDetails:false`: import cast-provided IDs/names without per-character
  detail requests. Missing nicknames/kanji remain empty/null. Existing richer
  identities are retained exactly. The default still fetches character details.
- `passId`: stable checkpoint namespace. Completed anime are skipped within this
  pass; use a new pass ID for changed caps or incremental cast updates. Without
  it the original Phase 2 completed-anime behavior remains.
- `targetCharacters`: optional stopping target, evaluated between anime.
- `intervalMs`: request pacing, defaults 650; these runs use 700. Values below
  500 are rejected. Shared-IP traffic can still consume the public quota.
- `checkpointEvery`: defaults 25 identity/appearance events. Atomic JSON rename
  plus final save on normal completion/error bounds replay work after a crash.
- `continueOnError`: retain failure messages and proceed to another anime.

Network/429/5xx retry behavior is unchanged: maximum five attempts, backoff,
Retry-After (seconds or HTTP date), and 30-second fetch deadlines. Failed anime
and empty casts remain incomplete. Invalid individual records are retained as
review messages; retry those using a new pass after investigating the source.
Review messages are historical audit notes and are not automatically deleted
when a later pass succeeds. Existing identities are not renamed or overwritten;
intentional alias enrichment requires a separately reviewed update operation.

For a killed importer, use the same positional arguments followed by
`--recover-lock`. Recovery only removes a JSON lock from this host whose owner
PID is no longer running. Live owners, ambiguous locks, or another host fail
closed. Pre-5A empty lock files require manual inspection. Do not run concurrent
recovery commands. A crash may replay up to 24 events; stable-ID/appearance indexes
prevent duplicates. Metadata is separately atomically saved under the same lock.

## Storage decision

Retain the compatible JSON format for this phase. Membership checks and identity
lookups now use Sets/Maps, and checkpoints are batched rather than writing once
per character. Actual and synthetic benchmark results are in `reports/`.

At 50,000 synthetic characters and 100,000 appearances, JSON exceeds 40 MB and
whole-document checkpoints plus object/index copies noticeably increase memory.
Before that scale, prefer a local SQLite staging store with unique MAL/appearance
keys and transactional checkpoints, exporting the same reviewed JSON contract.
No paid service or production Turso schema is needed. Do not serve this full file
to browsers. Benchmarks are single-process samples, not latency guarantees.

## Traits and eligibility

Identity metadata, evidence-backed claims, source/inference provenance, and
question eligibility remain distinct. New `provenance.basis` is optional for old
records, and required by the new local adapter. `source_fact` means the cited page
supports the proposed characteristic; interpretation/context still needs review.
`ai_inferred_suggestion` must never be treated as verified source data.

```sh
# Dry validation; no network, no automatic approvals:
node catalogue/traits/ingest.js catalogue/traits/data/phase5a-candidates.json
# Explicit local ingestion (idempotent, uses the same lock as the review CLI):
node catalogue/traits/ingest.js catalogue/traits/data/phase5a-candidates.json --write
```

Bundles must contain a reviewed source/permission URL, review date/actor, a
recognized licensing/review designation, explicit MAL identity links, evidence
URLs and explanations. `individual-evidence-review` records a limited manual
page review, NOT a third-party redistribution license. Do not use that designation
to import an unreviewed bulk dataset. Evidence fields do not prove truth; the CLI
validates structure and provenance, while a maintainer must review the evidence.

The adapter delegates to Phase 3's model. Existing IDs/claims are idempotent;
conflicts fail instead of replacing them. Verified/rejected claims and revision
history survive reingestion. Review state changes still use the existing review
CLI. Imported records start only as proposed/needs_review, never verified.

The question inventory is editorial planning, not an answer generator. Counts of
trait associations are not counts of eligible answers. Curated-name matches
(including comma-order reversal) are possible identity links only; homonyms and
adaptations need review. Combined conditions, exclusions, temporal scope, aliases,
and title/studio/object questions need their own eligibility work in Phase 5B.

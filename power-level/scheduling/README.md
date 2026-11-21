# Freshness-first offline release planning

This planner feeds the existing immutable bank/date-assignment pipeline. It does
not replace the active legacy engine, query the live catalogue during a run,
activate versioning, modify database tables or publish assignments. There is no
unrestricted LRU fallback when its offline inventory is insufficient.

```sh
npm run ascent:plan -- \
  --output catalogue/private/NEW-FRESH-REVIEW \
  --snapshots catalogue/private/seven-question-sprint/sources \
  --review-state catalogue/private/phase5b3/state.json \
  --start 2026-11-29 --protected-through 2026-11-28 --days 90
```

Use a new empty directory. No network requests occur. Existing 100-anime snapshots
supply observed source/type/episodes/studios; rights remain unresolved. Missing
attributes are unknown, not false. Exit **2** means the report was generated but
release validation failed due to inventory/pin restrictions; exit 1 is an input or
execution error. Read `summary.json` and `simulation-90-days.json` before publishing
anything. The output contains real current production comparisons for all 90 dates;
a shortage blocks subsequent proposals rather than generating fictional content.

## Policy

The slot order remains char, char, title, char, char, title, char. Prefer an all-new
valid set; otherwise require at least six new concepts and at most one qualifying
repeat. Both exact IDs and semantic concepts have a strict Toronto **calendar-date**
14-day cooldown: November 15 can repeat on November 29, not November 28. Ordinal
calendar dates avoid DST/hour-offset mistakes. Availability dates, `from` relations,
reviewed conflicts and related topic groups also constrain the set. Backtracking
avoids a greedy kind/concept dead-end. Duplicate questions/concepts in a day fail.

The concept layer uses explicit `conceptId` relations, canonical eligibility
predicates and bounded deterministic wording normalization. `concepts.json` maps
known source/type criteria, including the actual visual-novel and web-novel wording
of production adaptation questions. This is not a general semantic oracle. A new
policy release requires explicit concept review; novel IDs or string differences do
not certify fresh content. Related char/title topics can be blocked on the same day
without falsely treating them as identical questions across dates.

`usageStatus:never_used` must be an evidence-supported editorial finding. Unknown
history is not unused inventory. Existing source reconstructions, protected future
plans, possible historical snapshots, immutable pins and safely attributed completed
runs conservatively seed prior use. Possible historical alternatives are never used
as player-performance denominators. Already-pinned future days are preserved; if a
pin conflicts with this policy, offline validation fails rather than rewriting it.

Repeats require at least **50** attributable completed runs, a **95% Wilson upper
success bound ≤50%**, and approved clear wording/adequate answer coverage for *every
historical scoring version represented*. Recorded anomalies block ranking. Low
success with incomplete answers or unclear wording goes to editorial/expansion
review. Questions with insufficient data are UNKNOWN; popularity cannot substitute.
Eligible candidates are ordered by Wilson difficulty bands, prior repeat frequency,
recency and stable ID, so similarly difficult alternatives are not ignored in favor
of a single question cycling every 14 days. Published banks/scoring are unchanged.

## Read-only performance input

With an explicitly authorized read-only database token configured **outside chat**:

```sh
# Configure TURSO_READONLY_DATABASE_URL, TURSO_READONLY_AUTH_TOKEN and
# ASCENT_HISTORY_READONLY=1 in your secure local environment first.
npm run ascent:history-export -- \
  --output catalogue/private/NEW-READONLY-EXPORT \
  --from 2026-11-11 --to 2026-11-21 --limit 50000
```

The exporter executes only literal SELECT statements against sqlite_master,
ascent_scores, ascent_score_versions and ascent_challenges. It does not import the
API DB bootstrap or call production APIs. Guest keys are HMAC-redacted; URLs/tokens
are not output. Oversized exports are flagged truncated and cannot drive ranking.
No production export was performed in this implementation task.

Pass `--results catalogue/private/.../completed-runs.json` to the planner. Versioned
rows must resolve their frozen bank and recorded question order. An unversioned
positional row is **not** mapped using today's scheduler or a later date pin.
`--legacy-orders PRIVATE_FILE` can supply an original hash/order only with explicit
confirmed deployment or reliable reconstruction evidence. Ambiguous mappings,
missing artifacts, mismatched pins, practice rows and conflicting duplicate player
records are excluded. Source bank versions use their frozen canonical names and
rarity rules; no historical score is rewritten.

The denominator is safely attributed **completed submitted runs**, not all challenge
opens or individual guesses. Stored nulls combine skips/timeouts/unsuccessful
outcomes. The schema lacks abandonment/open telemetry, intermediate invalid guesses
and a clean skip/timeout breakdown. Reports keep null percentages for UNKNOWN data;
synthetic fixtures appear only in tests, never as production difficulty estimates.

## Approved frozen inventory and publication boundary

For a later approved batch, `--inventory PRIVATE_FILE` consumes:

```json
{
  "format": "ascent-approved-inventory-v1",
  "bankVersion": "<real retained immutable hash>",
  "approvalEvidence": {"reviewReference": "<actual maintainer content review>"},
  "items": [
    {
      "questionId": "<existing frozen ID>",
      "conceptId": "<reviewed shared semantic concept>",
      "conceptReviewed": true,
      "approval": "approved",
      "rightsCleared": true,
      "usageStatus": "never_used",
      "usageEvidence": "<actual novelty/history evidence reference>",
      "topicGroups": [],
      "quality": {"status": "pending"}
    }
  ]
}
```

This is an example schema, not a real approval. Do not invent reviewer identities or
mark candidates approved to satisfy inventory targets. Reuse the current private
maintainer evidence workflow for traits and actual content review for metadata
question definitions, rights, aliases and per-answer rarity. Review sidecars cannot
change frozen bank content. `--release-root` optionally selects a retained private
artifact root for non-production verification. All actual questions load from that
immutable hash. Pins referencing incompatible artifacts block planning.

For a successful plan only, the CLI emits private date/hash/ordered-ID proposals and
validates them through the existing version resolver. It never runs `assign`.
A failed plan emits an empty proposal list and a precise shortage. Separate content,
future-date and deployment approval are required before invoking the existing
publisher/assignment CLI. Every date in the release window must have an approved
assignment; unassigned dates still use the unchanged legacy baseline. Do not silently
activate a new policy mid-day or mutate historic pins/releases/saves. Keep a
version-aware rollback deployment and every referenced artifact.

The default report is intentionally blocked: all existing concepts are consumed by
the protected source schedule, generated banks are unapproved, and actual safely
attributed result data is unavailable. This is a content/data shortage, not permission
to recycle easy questions or accept unsupported new traits.

With `--inventory`, the planner loads approved questions from the specified frozen
release and **skips catalogue answer regeneration**; snapshots are not required.
The default combined draft-readiness report generates candidates for review only.
Use `--as-of YYYY-MM-DD` for a reproducible source-history cutoff (otherwise Toronto
today). No current source reconstruction is treated as a historical deployment
attestation. Legacy, inactive Ascent definitions are included in the performance
inventory, but require reviewed kind/eligibility before joining the active 5/2 pool.
If any date in the requested window fails, the private assignment proposal file is
empty for the entire window; no partial batch quietly falls back to unrestricted LRU.

Reports show historical question-content variants. Changed wording/answer banks need
explicit comparability review before pooled success data can qualify a repeat. Do
not concatenate independently HMAC-redacted exports without resolving cross-export
duplicates. Synthetic exports are rejected by the reporting CLI even though pure
analysis functions accept clearly labelled fixtures for unit tests.

Reviewed inventories can also supply `historicalConcepts: {"old-question-id":
"reviewed-shared-concept"}` to reconcile older IDs that are not in the new frozen
bank. Reviewed mappings take precedence over obsolete wording fingerprints for
cooldowns and capacity counts. History rows and frozen results themselves are not
rewritten. A new ID cannot evade the cooldown by retaining a stale historic label.

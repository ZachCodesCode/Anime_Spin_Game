# Production and offline integration boundaries

## Browser-first production

The current `game.js`, `run.js`, `questions.js`, normal Ascent API and Descent
implementation follow main. Starting or restoring a game does not call the
experimental challenge resolver. The shipped question banks and current date
assignments remain authoritative for ordinary gameplay. Private catalogue access
and Turso are not prerequisites for local static gameplay. Leaderboards continue
to use the existing production APIs and identity flow.

The static `npm run dev` server serves the normal website and routes, blocks
private catalogue/hidden paths and returns 503 guidance for API routes requiring
Vercel development. It does not pretend to supply an operational version resolver.

Same-day answer corrections, aliases and saved accepted outcomes retain main's
behavior. Saved deadlines are not reset by refresh. Historical scores and existing
leaderboard rows are not migrated by this work. Client save compatibility does
not promise that an already-running stale deployment can submit every later edit;
follow the production release workflow's compatibility checks.

## Retained experimental versioning

The Phase 4/4B helpers, client and service remain available for offline tests,
immutable bank integrity and a separately reviewed future integration. Normal
`api/ascent.js` does not import the experimental versioning service. These helpers
can resolve ordered question IDs against an immutable bank, validate submitted
answers with frozen rules and preserve versioned saves and historical pick data.
Their existence does not make that path active in production.

When explicitly invoked, the experimental service can create the additive
`ascent_challenges` and `ascent_score_versions` tables described in `schema.sql`.
Tests use isolated fixtures. No production database or activation configuration is
changed by this merge. Do not execute migrations, publish, assign, or set an
activation date as an incidental setup step. `ASCENT_VERSIONING_FROM` alone is
not a supported production activation: compatible browser, API, assets, database
and rollout/rollback behavior would need a separate authorization and review.

Keep all retained release assets and main's current/previous `legacy.json`
references. Check exact manifest hashes with `npm run ascent:integrity`; never
rewrite a frozen release. Existing assignments must not be replaced. Unknown
historical deployment/version associations stay unknown rather than guessed.

## Daily content and shared knowledge preparation

Follow [daily integration](../../catalogue/content/README.md) and
[shared developer setup](../../catalogue/TEAM-SETUP.md). `daily:integrate` performs
offline database preparation, backup/recovery, reconciliation, evidence retention,
deduplication, trust/rights filtering and authorized export validation. Its
`ENRICHED_NOT_PUBLISHED` outcome is deliberately distinct from gameplay bank
integration and publication. A failed required preparation must fail the command.
Proposed scheduling and confirmed publication/actual usage are separate records.

Both Ascent and Descent use this offline preparation workflow. It runs during
content preparation, never individual player submissions or live gameplay.
Unsupported facts remain pending review; successful ingestion does not constitute
maintainer approval, rights clearance or canonical-schema activation. JVMG-derived
research and proposed mappings remain private and held. No restricted records
may be admitted to generation or public exports without the required permissions
and factual decisions.

## Future release and rollback

Use the [production release instructions](../../docs/ascent-14-16-deployment.md)
for current browser-first changes and `npm run ascent:release-check` for explicit
content approval gates. A blocked draft plan remains blocked. A later versioned
rollout must separately prove browser/server version agreement, ordered assignment
validation, idempotency, save restoration, historical score/pick preservation,
asset availability and rollback compatibility. Retain old pins and rule assets;
never roll an activated versioned deployment back to a client/API incapable of
reading those pins. This merge performs no activation or deployment.

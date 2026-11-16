# Phase 4B integration and rollout

The browser now resolves `/api/ascent?challenge=1&date=YYYY-MM-DD` before starting
or restoring a daily run. With `ASCENT_VERSIONING_FROM` unset, it uses the existing
bank, rules, schedule and local saves. No expanded answers or catalogue data are
loaded. The local `npm run dev` preview supplies this legacy response without Turso.

For a versioned day, the API returns the immutable bank version, ordered question
IDs, selected questions and integrity-checked frozen rule scripts. The browser
uses those rules for matching, aliases, suggestions, scoring and restoration.
Submissions carry the date/version/ordered IDs and canonical answers. The API
resolves the assignment independently and recalculates the score; client totals
are never authoritative. Mismatched clients receive 409 and must reload.

## Database

The API creates two additive tables on first use (also listed in `schema.sql`):

- `ascent_challenges`: one pinned version and question order per Toronto date.
- `ascent_score_versions`: version/order metadata per existing player/date key.

The first resolver inserts an assignment only if absent, then reads the winning
row. Score insertion and its metadata use one transaction. Duplicate submissions
return the original stored score. Existing score rows remain untouched; no guessed
versions are backfilled. On versioned days, unversioned rows contribute to score
distributions but not question pick rates. Existing legacy pick behavior remains.

No production database was accessed or migrated during implementation. Existing
Turso credentials and anonymous guest cookies are reused. The team-builder schema
and API are untouched. Vercel's function packaging includes all retained releases.

## Safe activation

1. Deploy this compatible browser/API code to every serving instance first. Do
   not roll an activated deployment back to pre-4B code, which cannot read pins.
2. Validate releases with `node power-level/versioning/cli.js check`.
3. Set `ASCENT_VERSIONING_FROM` to a **future Toronto date** on all instances before
   that day's midnight. Never switch an already-started legacy day: existing
   date-only saves cannot prove their bank version and are deliberately not
   migrated into the separate versioned save namespace.
4. With no explicit assignment, the existing frozen baseline selects exactly the
   current rotation (five questions for ascents 1–2, seven thereafter). Explicit
   registry assignments are supported for future reviewed releases; none were
   added in this phase. Do not publish expanded content as part of this rollout.
5. Removing the variable disables new pins. Already-pinned dates continue using
   their immutable rules, including late submissions and retries. Retain releases
   and database assignment rows indefinitely; never edit published rows manually.

Challenge lookup or missing/corrupt rules fail closed with a reload message,
rather than starting a potentially different challenge. Thus production startup
now needs a reachable challenge API/database, even in legacy mode. Static local
preview is explicitly supported by `scripts/dev.js`. Deploy frontend and API
together; an old API does not understand the resolution endpoint.

Versioned saves retain the existing absolute timer deadline and reveal state in
an envelope with the assignment header. Failed submissions retain completed local
results and retry on reload. Historical score values are never recalculated.

## Checks

`npm test` includes real temporary SQLite integration tests for legacy contracts,
additive schema, baseline parity, pinned rollback, mismatch rejection, transactional
metadata, duplicates, historical picks and the original late-submission window.
Phase 4 tests continue covering aliases, Too Clever scoring, save restoration,
immutable hashes and five/seven-question schedules. Run `npm run build`,
`npm run catalogue:validate`, and the versioning CLI check before rollout.

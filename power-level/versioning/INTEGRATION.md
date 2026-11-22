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

## Reconciliation with current production (21 November 2026)

The feature branch now retains current production Ascent, Descent, archives,
suggestions, analytics, routing and team builder. The new baseline in `legacy.json`
freezes the 174-question production bank and current core/run scripts. The original
109-question release is retained unchanged via `previousBankVersion`; it must never
be silently substituted for current production. No expanded draft is in the public
baseline. All registry assignments remain empty and activation is unset locally.

Descent's raw definitions store a Top Answer and are scored through its existing
adapter, so release validation checks their separate contract without changing
Ascent's one-Limit-Break rule. Versioned Ascent payloads reject Descent IDs and enforce
the five-character/two-title order for seven-question assignments.

Only Ascent resolves versioned challenges, including archive replay. Descent keeps
its original static pool, scoring and save keys. Frozen browser scripts are loaded
serially and their global core/run bindings restored after success or failure.
Versioned archive and live saves have separate namespaces; legacy saves keep their
existing keys and absolute deadlines. Archive runs are never posted as daily scores.
Suggestions validate Ascent IDs against the same pinned assignment as scoring.

`npm run dev` serves the current production routes plus an explicit offline legacy
challenge response without credentials or a production DB. All catalogue paths,
including encoded paths and symlink targets, are blocked by the preview server.
Actual score/suggestion APIs still require Vercel dev/staging with a test database.

Production startup now requires reachable challenge API/Turso even while activation
is unset. Deployment will create additive tables on resolution, so deployment and
production setup still require explicit approval. Do not activate an already-started
day, delete existing pins or roll pinned dates back to pre-versioning code. Retain
all referenced releases and a compatible rollback deployment. Production environment
configuration/credentials and schema have not been accessed or changed.

The offline catalogue generator produces private immutable previews with an
explicit root; the production API cannot resolve them from its retained public
release root. Approving content, clearing rights, publishing a public artifact and
assigning a future date are distinct later decisions. No draft or hypothetical
November 29 gate constitutes an authorized Daily Challenge assignment.

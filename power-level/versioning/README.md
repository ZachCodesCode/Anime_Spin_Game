# Phase 4 — versioned challenge infrastructure

This document records the original Phase 4 boundary. Phase 4B now connects the
browser and API; see [integration and rollout](INTEGRATION.md) for current behavior.

## Activation and compatibility boundary

The production game, API and database do not import this directory. This is the
disabled-by-default integration boundary. index.resolve and index.submit also
default to enabled:false and use the existing bank, core and schedule. Opt-in
requires enabled:true and an explicit date assignment. No assignment is active.
These adapters are exercised in tests, not exposed as production HTTP routes.

Legacy requests still contain date and canonical answers (null for skips/timeouts).
The original client uses the v4 date-based localStorage key, absolute 30-second
deadlines, reveal state and canonical outcome names. It recomputes restored points.
The epoch is Toronto 2026-11-11. Ascents #1–2 have five prompts and later ones seven.
Question order is significant for the API's positional answer arrays. The existing
late-submission window is today plus the Toronto date 24 hours earlier. This exact
behavior is retained, including its DST edge cases, rather than silently replacing
it with a new calendar-day definition. Existing Toronto/date tests cover DST.

## Immutable releases

legacy.json identifies a snapshot of the current bank plus exact core.js and run.js
bytes. The release manifest hashes all three files. Its own SHA-256 is the bank
version and directory name. Loading checks every hash before executing the frozen
rules. Question IDs, names, aliases, rarity, clever flags, metadata, matching rules,
scheduling and score calculation are retained. JSON omits undefined properties,
which retain their original absent-value semantics.

A changed release requires a new hash/version. Publishing an identical bank and
rules reuses its version. Code review must retain old releases and assignments.
Filesystem owners can delete or replace files; integrity checking detects changed
content under an existing version. A trusted deployment/repository is still needed.

## Historical investigation and limits

Git history has successive question-bank revisions, including 0d86b12 (answer
additions), 3126554 (character additions), cd845d4 (question types), and 9e926b3
(bank expansion). Commit times do not prove production deployment times or which
cached browser version a player used. There is no deployment-to-run ledger.

The checked-in Turso schema and ascent API store day, guest, score, positional
answer names and created_at. They store no question IDs, bank/scoring version,
question wording or rule snapshots. Production database contents and deployment
logs were not accessed in this phase. Even available rows with this schema would
not uniquely identify the historical rules. The legacy snapshot is a baseline of
the current rules, NOT a verified reconstruction of every earlier challenge.

Safe fallback: retain historical score values verbatim, keep the current legacy
runtime as the default, and do not migrate or relabel old rows automatically.
The new picks helper returns no question attribution for unversioned rows. It
uses recorded ordered IDs for versioned rows, never today's schedule. Existing
production pick-rate behavior is unchanged while the feature is disconnected.
Before activation, decide how to present uncertain old pick attribution and audit
any recoverable deployments. A missing version fails closed instead of guessing.

## Future publishing

After editorial review, export the same question/answer shape as questions.js into
JSON. From the repository root:

```sh
node power-level/versioning/cli.js publish /absolute/path/reviewed-bank.json
node power-level/versioning/cli.js assign /absolute/path/assignment.json
node power-level/versioning/cli.js check
```

Assignment format:
```json
{"date":"2030-01-01","bankVersion":"<hash printed by publish>","questionIds":["<ordered IDs: five or seven>"]}
```

The assignment command accepts only dates strictly after today's Toronto date.
It locks the registry, validates IDs/version, and writes atomically. Reassigning
an existing date is rejected, including future dates. Exact retries are idempotent.
Draft planning belongs outside the published registry. Publishing these files
locally does not enable production. Ensure the published assignment registry is
append-only in release review and available on every server before that boundary.

## Browser/server contract and storage preparation

Opt-in resolve returns only the assigned questions and a date/version/ordered-ID
header. Serve the version's core.js and run.js with runtime.js to the future browser
adapter. They expose the same core/run interfaces as today. The shared runtime
uses those frozen implementations for name/alias matching, scoring, and restore.
Submit date, bankVersion, questionIds and canonical answers. The server derives
its assignment independently, checks the header, and rescores canonical answers.
An old browser lacking a matching header must refresh when opt-in is enabled.
Unknown versions/orders fail; totals sent by clients are ignored.

Versioned saves wrap the v4 state with date, bankVersion and ordered IDs, preserving
timers. Use a separate storage namespace when wiring this in. Keep legacy saves
on the legacy adapter. Do not regrade historical saves into another version.

submit returns a record containing date, bankVersion, questionIds, answers and
server-calculated score. Before enabling routes, add a separate table or nullable
columns for these fields, and persist the header with the result atomically under
the existing per-player/date uniqueness rule. No migration or production writes
are performed here. Retain old rows and the old contract during rollout. Prefer
an authoritative shared assignment store with insert-only publication before a
multi-deployment rollout. Cached old servers must fail closed, not fall back to
legacy scoring after activation. Rollback currently means keeping the disconnected
legacy routes; after activation, route already-versioned runs to their pinned
rules even while new starts are disabled.

## Performance and Phase 5 requirements

The browser payload includes only five or seven answer lists; it never loads the
identity or traits catalogue. Runtime indexes questions, supports bounded result
pages (up to 100 answers), and preserves the exact frozen matching algorithm.
Per-question alias and fuzzy searches still scan the selected list. Indexing,
fuzzy budgets and actual lazy UI rendering need measured compatibility work
before very large lists. Full release loading remains server-side; caching and
concurrent publication across multiple processes need scale testing.

Before Phase 5 connection: verify traits, define question-specific eligibility,
review answer names/alias collisions and editorial scoring, create a new release,
complete the additive storage and browser/API integration behind a shared rollout
switch, test mixed-deployment and rollback behavior, and publish future assignments.
Neither pilot trait is approved by this phase. There are no imported new answers.

## Files and validation

index.js contains release/publishing/assignment/server adapters; runtime.js is the
browser-compatible engine; cli.js manages local publication. assignments.json is
empty. legacy.json points to releases/<SHA-256>/{bank.json,core.js,run.js,manifest.json}.
../versioning.test.js covers compatibility, historical counts, dates, scoring,
version mismatch, restore, pick attribution, future assignments and integrity.
Run npm test and the check command above. All existing tests remain included.

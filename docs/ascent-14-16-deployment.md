# Ascent #14–16 integration — HOLD, not a production content release

This branch is based on production main 203e433. It implements the existing
versioned browser/API path without replacing newer production question content.
It retains all older release assets and freezes the current 174-question baseline,
including the #12–13 additions, as
`32fb7940214ef6a3e3615e039fa5b5da1e07ed058af118ceafc268be5c65671d`.
No live answers, rarities, selection dates, Descent code or assignment rows change.

## Essential content gate failed

The corrected draft inventory has 34 questions and 8,485 proposed entries. These
are source-linked provider metadata candidates, not verified public answer banks.
`release-plan.json` and `ascent-14-16-candidate-selection.md` identify 21 proposed
slots (15 character, six title) and exact draft counts; **none is assigned**.
Examples of material unresolved checks include collective labels such as “NHK
Agents” in a character question, genre-based eligibility/fairness, role/adaptation
scope, editorial rarity and raw provider reuse rights. A model confidence or a
`supported_candidate` label is not approval. Lack of trait-database approval alone
is not the reason for the hold. No substitute raw data is published to bypass it.

`npm run ascent:release-check` deliberately exits nonzero until the actual immutable
assignments and reviewed plan exist. Do not approve this branch as a completed
fresh-content release or set ASCENT_VERSIONING_FROM merely because tests pass.
The 21 banks still need bounded evidence/eligibility review and rights clearance,
followed by actual maintainer content/rarity decisions. Those decisions must name
the reviewed immutable bank/revision; changing JSON booleans is not an approval.

## Runtime behavior and prerequisites

* Browser resolves `/api/ascent?challenge=1&date=YYYY-MM-DD`, loads hash-verified
  frozen scoring/run scripts, and stores version/date/order with saved progress.
  Legacy saves keep their existing keys. Versioned saves use a separate namespace.
* API reads immutable database pins before considering activation/configuration;
  an existing pin always wins and is never overwritten. It recomputes scores from
  canonical answers and rejects mismatched bank versions/orders. Score and version
  metadata writes are atomic/idempotent. Existing score rows stay unchanged.
* ASCENT_VERSIONING_FROM must be a future Toronto date **after 2026-11-23**.
  Production policy requires explicit assignments on/after November 24, including
  subsequent dates. Missing reviewed dates fail closed with 503; no unrestricted
  fallback silently fills November 27 onward. Ongoing approved inventory must be
  prepared before those dates; this PR does not schedule unrelated future dates.
* The challenge API is required even when activation is unset. A working Turso
  connection and deployed API are mandatory before merging this runtime change.
  Static-only hosting is insufficient. Local `npm run dev` intentionally serves
  legacy preview responses and is not a versioned staging environment.
* `_ascent-versioning.js` prepares two additive tables on first API use:
  `ascent_challenges(day, bank_version, question_ids)` and
  `ascent_score_versions(day, guest, bank_version, question_ids)`.
  Existing `ascent_scores` remains authoritative. No production table setup or
  migration was run in this task. Confirm write permissions/transaction support
  in an isolated staging database before deployment.
* Existing environment names are TURSO_DATABASE_URL and TURSO_AUTH_TOKEN (see
  api/_db.js). Supply only staging credentials in a non-production deployment;
  do not point test harnesses at production. Add ASCENT_VERSIONING_FROM there only
  with reviewed staging assignments. Never put credentials in Git/PR descriptions.
* Vercel must include retained releases in the scoring **and suggestion** function
  bundles and serve the corresponding frozen JS assets publicly. Private catalogue
  data/tools remain excluded. Missing release assets fail closed.

## Verification and activation sequence

1. Check actual deployment and immutable Turso pins using authorized access. Source
   reconstruction cannot prove past deployments or unseen pins. The supplied JSON
   audit lists exact source selections for November 11–26; November 23 or earlier
   is unchanged. No production database credentials were available for pin checks.
2. Finish the 21 content reviews and permissions. Publish the reviewed combined
   bank with the existing publishing CLI. Keep every original question/answer/score
   unchanged, retain old assets, then use `assign` for only November 24–26. Respect
   any existing pin; stop on conflict. Run release-check, integrity and full tests.
3. Set up a separate Turso staging database, deploy matching browser/API/assets,
   test the actual hosted path on desktop/mobile, saves, submissions, retries,
   suggestion validation, archives and Descent. Local file-backed libSQL tests do
   not establish hosted Turso configuration, network availability or permissions.
4. Have the actual maintainers review/approve the content and PR. Do not merge this
   incomplete release solely to meet a date. Before November 24 begins in Toronto,
   deploy all matching API/browser/assets/config as one reviewed release. Verify
   legacy dates and scores, then explicitly set the approved future activation
   boundary. No automatic activation is performed by this branch.
5. Verify the GET challenge response, bank hash/order, browser prompts, one saved
   score per player, restored countdown and expected upcoming assignments. Repeat
   November 25/26 verification. Plan later approved dates before November 27.

## Rollback

Unsetting activation stops *new* pins but existing versioned pins continue to
resolve. Preserve the version-aware API, release assets and tables for old saves,
archives and late submissions. Never roll back to a pre-versioning server after
pins exist. Do not delete/rewrite pins, releases or historical scores to force a
fallback. Existing immutable dates require a forward compatibility fix.

## Checks performed

Full production unit/API suite, immutable integrity and build; actual headless
Chrome desktop/mobile seven-question playthrough using the current production
bank as a **technical fixture**, a local HTTP API and file-backed libSQL database.
Verified question 6 refresh with identical deadline, completed refresh, idempotent
score save, no page errors, and Descent start. This is not hosted Turso validation
and does not approve any new question. Screenshots/logs are local verification
artifacts, not source-restricted datasets.

## Reproduce the local browser verification

Install Playwright in a temporary tool directory (or as a local uncommitted test
dependency), then run `scripts/verify-ascent-browser.cjs` with its module available
through NODE_PATH. Set ASCENT_BROWSER_EXECUTABLE to an installed compatible Chrome
executable, or install Playwright's Chromium. The script creates and removes its
own temporary local database, blocks external analytics requests, and cannot
connect to production. Desktop/mobile screenshots go to the OS temporary folder.
It requires local process/loopback permissions and uses existing bank questions
solely to exercise the protocol. It is not the hosted Turso release gate.

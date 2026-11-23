# Browser-first correction and content handoff

Both correction branches incorporate main c8c68da (including the latest ads.txt).
The deployed game.js retrieved on November 23 was byte-identical to origin/main's
browser-first script. No production credentials or assignment history were
available. That observation proves the current browser path, not the absence of
all historical production pins. Existing frozen releases and experimental helpers
are preserved; no database table, release asset or historical record is deleted.

## Actual runtime

The browser loads questions.js, core.js and run.js directly, deterministically
chooses the daily seven IDs, validates answers and saves/results locally. It no
longer loads challenge-client.js or the versioned runtime, or requires a challenge
API request. api/ascent.js and api/suggest.js match current main; normal traffic
never enters the experimental assignment service. Existing leaderboard identity,
server-side score validation, retries and suggestion behavior remain intact.
No activation setting or assignment migration is required for gameplay.
A leaderboard outage leaves local play and completed results available.

Local stored outcomes now retain the accepted answer's score inputs. A reload
with an added answer/alias, changed rarity or removed invalid answer preserves
completed outcomes and an active deadline; unanswered questions use the newly
loaded bank. Legacy v4 outcomes without snapshots retain valid recorded tier/point
pairs. Existing submitted leaderboard rows remain untouched. The server still
recomputes **first submissions** using its current bank, as production does; an
in-flight client from before a scoring correction can therefore show a different
local total, or a removed answer can fail submission. Local completed results are
retained. Do not promise retroactive rescoring or immutable scoring for an
unsubmitted old client. No new API fallback/synchronization layer was added.

## Existing content — prepared, not published

All original 34 drafts / 8,485 proposed entries are preserved privately. All 21
selected slots for November 24/25/26 (Ascents 14/15/16) are accounted for in
ascent-14-16-candidate-selection.md. Private full review packets retain source
URLs, IDs, adaptation/role predicates, aliases, proposed rarity and held records.
Production-shaped per-date JSON/JS candidates have been created from those exact
answers, not regenerated. They are not copied to the public game repository while
provider reuse rights and editorial decisions remain unresolved.

Every retained proposal is checked against its existing stable catalogue identity,
explicit adaptation/role metadata, matching aliases, score bands and exactly one
Limit Break proposal. This is structural/source-consistency checking, not a claim
of independent factual verification or approval. Collective "NHK Agents" entries
are excluded from the candidate; "Ninamori Family Secretary" is held for individual
identity/eligibility review. Original research records are unchanged.
Narrow title banks are not comprehensive franchise inventories. Generic names,
provider genre judgments and deterministic Limit Break proposals still require
editorial attention. Do not pad lists or approve them by changing a boolean.

The current-bank reconstruction for November 11–23 contains no equivalent normalized
concept for the proposed 21. Actual historical deployment completeness is UNKNOWN.
No historical question, answer, rarity, score or date has been rewritten.

## Browser-first content integration after clearance

1. Review the private full answer packets and rights/rarity/eligibility holds. Obtain
   actual maintainer decisions tied to their digests; preserve rejections/history.
2. Transfer only cleared answer objects into questions.js, using the existing q/a
   schema and `since` convention. Do not change old records or order. The offline
   planner in PR #28 is a review tool, not a replacement runtime scheduler.
3. Simulate run.select against the complete proposed bank for every date from the
   epoch through the target dates. Appending questions alone does **not** guarantee
   the exact intended order: current production uses deterministic least-recent-use
   selection. Verify the actual output equals the reviewed seven-slot plans and all
   old dates remain identical. If not, stop for a bounded reviewed future-only
   scheduling adjustment; do not enable server assignments to work around it.
   Also compare Descent selections: it derives exclusions from Ascent history.
4. Run the full tests, build, integrity and browser outage check. `ascent:release-check`
   currently correctly blocks because the new content is unapproved/unintegrated;
   it no longer requires immutable assignments. Keep that blocker distinct from a
   broken technical test. Check frontend/backend use the identical deployed bank.
5. Review the existing PR; maintainers merge/deploy only after those gates pass.
   If the dates have passed, seek a reviewed future date; never rewrite played days.

## Real browser verification

Install playwright-core in an isolated tool directory (not as a production
 dependency). Provide it through NODE_PATH, and set ASCENT_BROWSER_EXECUTABLE to
an installed Chrome. Run `node scripts/verify-ascent-browser.cjs`.
ASCENT_BROWSER_OUTPUT chooses a private screenshot/log output directory.
The script serves only the local checkout, aborts **every** API request and external
request, plays seven actual questions on desktop/mobile, checks prompts/IDs/aliases,
reveals/results, question 6 deadline restoration, completed refresh and Descent start.
It uses no database or production credentials. It does not test hosted leaderboard
availability or approve new answers. Unit/API tests separately exercise submissions.

## Cross-platform and rollback

.gitattributes forces LF checkout for hashed text without changing frozen bytes.
SQLite test clients close before bounded deletion retries. The CI matrix runs
Ubuntu, Windows and macOS; a configured matrix is not evidence of a completed run.
Local verification so far is macOS only. Never claim Windows passes until CI does.

For code rollback, preserve local v4 saves and existing database rows. The accepted
snapshot field is additive. Frozen assets remain unchanged. If real historical
versioned clients/pins are found, inspect those deployments before removing their
compatibility endpoint; this task has not removed tables, pins or frozen assets.
Do not restore a whole old question bank in a way that erases subsequent same-day
corrections. No merge, deployment or production database operation is performed.

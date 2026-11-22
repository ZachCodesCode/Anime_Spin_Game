> Shared setup: see [TEAM-SETUP.md](../TEAM-SETUP.md). Historical phase-specific research/reports are not bundled in this PR.

# Private evidence review — Phase 5B-3

Offline tooling only. Nothing here imports into the live game, assigns rarity, approves
on behalf of a maintainer, publishes a question bank, or contacts a production database.
Use Node's built-in modules; there are no new dependencies.

## Local review

The local pilot is in `catalogue/private/phase5b3/`, ignored by Git and excluded from
hosting with the rest of `catalogue/**`. Back up this directory privately. A fresh clone
has no research data: transfer a trusted private state export and run:

```sh
node catalogue/verification/cli.js initialize /absolute/path/to/state.json
node catalogue/verification/server.js
```

Initialization refuses to overwrite existing state. On this workstation the state is
already initialized: run only the server command. Open its printed URL, including the
session fragment. It binds to **127.0.0.1 only**, normally port 8093; set
`ASCENT_REVIEW_PORT` to choose another port. Do not expose it through a tunnel.

The owner must put actual authorized maintainer names in private `maintainers.json`:
`{"reviewers":["Actual maintainer name"]}`. Restart after changing the roster. Its default
is empty/read-only. The session token grants access to this local trusted workstation;
the selected roster name is an audit attribution, **not independently authenticated
multi-user identity**. For hosted or shared-machine deployment, add real authentication
and roles first. Tokens remain in tab sessionStorage for refresh, never in repository
files. Stop the server to revoke a session; opening its new URL replaces an old token.

Filter by question and evidence queue, search names, and inspect source-linked cards.
Only two independently originated, deterministic, exact-context primary/licensed sources
qualify a record for batch review. Different hostnames do not prove independence: the
source manifest records the underlying origin family. Human editorial summaries may
support individual review; AI proposals alone cannot support verification.

Select records, your identity, status, eligibility and reasoning. **Preview** shows
exact previous/new claims and evidence IDs. Confirm only after reviewing those changes.
Previews expire after ten minutes and become invalid when data or policy changes.
Multi-record verification requires every record to pass the batch evidence gate.
Rejected claims require explicit individual reopening before reassessment. Reviewing
one trait does not approve its eligibility for every other question.

Writes use an exclusive lock and atomic file replacement. Approval operations are
idempotent; decisions contain before/after states, reviewer, timestamp, reasoning,
evidence hashes and a chained audit hash. This detects accidental corruption; a local
administrator can rewrite files, so it is not an externally signed tamper-proof log.

## Evidence pipeline

```sh
node catalogue/verification/cli.js collect-wikidata
node catalogue/verification/cli.js adapt-wikidata /absolute/path/to/wikidata-snapshot.json
node catalogue/verification/cli.js ingest /absolute/path/to/normalized-snapshot.json SOURCE_ID
node catalogue/verification/cli.js report
node catalogue/verification/cli.js export
```

The first command reuses the bounded, rate-limited CC0 collector. The adapter matches
stable MAL IDs and immutable Wikidata statements, preserves revision/qualifiers/references,
and automatically queues candidates. Unknown adaptation/recurrence stays unknown; source
assertions are not verified facts. Each adapter invocation selects up to 200 candidates
with the inherited per-anime cap of five. It is a bounded pilot, not a complete crawl.
Full snapshots are content-addressed and retained privately.

Additional feeds are **disabled by default**. Configure private `sources.json` only after
permission review. A manifest describes id, name, enabled, permission, permissionUrl,
reviewedAt, originFamily, kind, hosts, structured, and explicit field/value mappings.
Permission values are CC0-1.0, authorized-feed, or individual-fact-review. The last means
an individually inspected factual reference, not permission to bulk scrape a site.

Example **synthetic** manifest shape (do not enable without actual authorization):

```json
{"id":"licensed-example","name":"Authorized feed","enabled":false,
 "permission":"authorized-feed","permissionUrl":"https://example.org/terms",
 "reviewedAt":"2026-11-16T00:00:00Z","originFamily":"original-rightsholder",
 "kind":"licensed","hosts":["example.org"],"structured":true,
 "fields":{"species":{"traitId":"identity.species","values":{"cat":"cat"}}}}
```

Normalized snapshots contain `revision`, `retrievedAt`, and `items` (maximum 50,000).
Each item carries `externalId`, numeric `malId`, `field`, `value`, `fact`, `locator`, `url`,
`context:{animeId,scope,persistence,form}`, and optional `extraction:"ai_proposal"` or
`contradiction:true`. Stable IDs and catalogue appearances must agree. No name-only joins.
Identity bindings persist across imports; reassignment fails. Exact field/value mappings
avoid semantic guesses. Independent feeds merge evidence for the same contextual claim;
syndicated evidence counts once. Repeat snapshots do not create duplicate claims.
The source manifest is a trusted configuration boundary: this tool cannot independently
prove a provider's licensing assertion or a fabricated upstream statement's truth.

No AI service or credentials are required. AI extraction can supply proposals under the
same contract, but cannot self-certify evidence. Primary-source retrieval and deterministic
field adapters are preferable. Unmapped values are reported, not silently interpreted.
Automated retrieval beyond Wikidata needs provider-specific permission and adapters.

## Exports and scale

`report`/`export` create private `summary.json` and `preview.json`, covering every active
eligibility-policy question. Buckets separate approved eligible additions, verified but
unresolved eligibility, pending, alias-only, conflicting/rejected, and existing accepted
answers. Every entry preserves evidence and decision history; no rarity is assigned.
The preview is explicitly **not publishable**. Actual state backups must include state.json;
preview.json is a report, not an initialization input.

The UI renders 30 cards at a time and approvals cap at 100. JSON storage and validation
are suitable for this offline pilot but read/validate the whole ledger; they are not
benchmarked for tens of thousands of claims. Before that volume, migrate these same
contracts to indexed SQLite tables for identities, claims, evidence, decisions and
import jobs, add server-side pagination, and benchmark batch ingestion. Do not relax
identity/evidence/approval gates to increase throughput. Establish authorized structured
feeds first: good source coverage reduces manual research much more than AI confidence.

Run `npm test` for model, ingestion, security-boundary, API/UI-shell and export regressions.
The HTTP tests need permission to bind loopback. The current local UI was also opened in
a browser read-only; tests do not claim comprehensive mobile or assistive-technology QA.

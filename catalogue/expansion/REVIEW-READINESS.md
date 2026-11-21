# Bounded private admission and source review

These local tools close two operational gaps in the Phase 5I workflow. They reuse its
identity/schema validation and the original Phase 5B-3 reviewer. They do not change
runtime answers, scoring, public catalogue files, releases, assignments or databases.
All actual decisions require a real operator explicitly configured in the existing
`catalogue/private/phase5b3/maintainers.json` reviewers array. No roster is shipped.
The CLI never accepts a roster from a request file. This is local trusted-operator
authorization, not remote account authentication or cryptographic proof of source origin.

## Seven separate gates

1. Identity/anime/appearance admission.
2. Source-grounded factual evidence.
3. Question-specific eligibility.
4. Confirmed maintainer fact/eligibility decision in the existing reviewer.
5. Publication/licensing assessment.
6. Editorial rarity and alias approval.
7. Immutable bank release authorization.

Admission only authorizes a private identity working copy. Source review only appends
evidence and an eligibility **recommendation**. Neither verifies traits, approves question
eligibility, clears publication rights, chooses rarity or authorizes a release.

## Private catalogue admission

`private-admission.js` provides pure `initial`, `inspect`, `prepare`, `commit` and
`validateState` functions. The initial envelope contains a schema-valid catalogue,
metadata, base hashes and an empty audit. It is an isolated private working copy;
`catalogue/data/catalogue.json` is never written by this workflow.

```
node catalogue/expansion/review-cli.js init catalogue/private/MY_BATCH/catalogue-state.json
node catalogue/expansion/review-cli.js inspect-admission PRIVATE_STATE REQUEST PREVIEW_OUTPUT
node catalogue/expansion/review-cli.js prepare-admission PRIVATE_STATE ACTION_REQUEST PLAN_OUTPUT
node catalogue/expansion/review-cli.js apply-admission PRIVATE_STATE PRIVATE_PLAN OPERATION_ID --confirm
```

All outputs must be below `catalogue/private`; existing symlink state paths are refused.
The adapter locks the state, checks its current revision, and atomically replaces one
envelope containing catalogue, metadata and audit. It never performs a multi-file partial
catalogue update. New outputs refuse overwrite. A stale `.tmp` or `.lock` after a crash
requires manual inspection before recovery; do not delete another live writer's lock.

An inspection request contains:

- `expectedStateHash`: `verification/model.hash(privateState)`.
- `characters`: at most 25 `{snapshot, sourceHash}` packets, with `sourceHash=hash(snapshot)`.
  Each snapshot is the existing Phase 5I Tenrai admission packet, with explicitly selected
  anime IDs and original character/association provenance.
- `anime`: at most 25 `{snapshot, sourceHash}` packets. Snapshot fields are `provider:
  'Tenrai'`, `url: https://api.tenrai.org/v1/anime/ID`, `retrievedAt`, and the original
  `{response:{data:...}}`. Anime ID, selected appearance title and normalized metadata
  must agree. Unrelated anime packets and existing metadata overwrites are refused.

The preview shows exact additions, collisions, retained publication holds and source
hashes. No confirmation or rights grant is inferred by inspection. New identity name/alias
collisions hold the transaction. Existing IDs retain their canonical identity and aliases
byte-for-byte; an existing generic nickname collision is annotated, never merged.

For a new identity only, a packet may propose `aliasSelection:{aliases:[...],reason:...}`.
This must be a subset of actual provider aliases; invented aliases and existing-identity
alias changes are rejected. Both original and selected aliases appear in the preview and
audit. This allows an actual maintainer to exclude shared nicknames without hiding their
provider provenance. It is not an automatic alias decision.

`ACTION_REQUEST` is `{request, action}`. The action requires the actual configured
`reviewer`, `reason`, ISO `at`, and `expectedPreviewDigest`, plus an explicit rights
assessment `{scope:'private-review-only', publication:'unresolved', basis, references:[HTTPS...]}`.
There is deliberately no public-rights-clearance operation. Public rights remain on hold
even after private identity admission. Missing rights acknowledgement, stale sources/state,
unresolved collisions and preview tampering fail closed. Apply requires explicit
confirmation. Repeating the same operation/plan is idempotent; reusing an ID for a
different plan fails. The append-only audit records actor, source/state hashes, exact
changes, alias selections, private-use assessment and prior event hash.

## Maintainer reading alongside AI evidence

`verification/source-review.js` provides `prepare` and `commit`. A maintainer must open
the original source, inspect the exact adaptation and relevant wording, and supply a
bounded source-text snapshot, a matching quote, its expected hash, locator/revision,
source/origin/permission metadata and their interpretation. `inspectedOriginal=true`
is an explicit operator attestation, not an automated finding. This cannot prove that
the supplied text actually came from the source; keep retrieval provenance and originals.

```
node catalogue/expansion/review-cli.js prepare-source PRIVATE_REVIEW_STATE SOURCE_REQUEST PLAN_OUTPUT
node catalogue/expansion/review-cli.js apply-source PRIVATE_REVIEW_STATE PRIVATE_PLAN OPERATION_ID --confirm
```

`SOURCE_REQUEST` is `{input, action}`. The input requires `recordId`, `expectedStateHash`,
`expectedClaimRevision`, `source:{url,permissionUrl,kind,permission,originFamily,revision,
locator,accessedAt}`, `snapshotText`, `expectedSourceHash`, `quote`, `interpretation`,
`inspectedOriginal`, `eligibilityRecommendation` and `eligibilityReason`. Recommendations
are `needs_context`, `recommend_include` or `recommend_exclude`; never `eligible`.
Action fields are actual configured `reviewer`, `reason`, ISO `at`.

For paired-sibling proposals, inspect the original broadcaster profile. An explicit
younger-twin relationship can support both directions. Check the profile heading,
names, exact adaptation and sibling identities; do not treat a shared source as two
independent origins. Private review packets contain unsigned templates and source text
decoded according to its declared encoding. Templates have no reviewer and `inspectedOriginal=false`;
they cannot execute unchanged. Refresh expected hashes/revisions between operations.

The confirmed source-reading operation appends a **new** maintainer-attributed
`editorial_summary` evidence revision and source-review audit. Existing AI evidence and
trait histories stay intact; they are not relabeled. Claims remain `needs_review`,
question approvals remain unresolved, and rights/rarity/release gates remain closed.
The existing reviewer must separately prepare and confirm actual fact/eligibility decisions.
Single-origin manual evidence does not qualify for deterministic two-origin batch approval.
Rejected or already-reviewed traits require the existing explicit reopening procedure.

## Using admitted private identities in the original reviewer

After authorized private admissions, construct dependencies with
`V.index({...S.deps,catalogue:admittedState.catalogue})`. Route proposals with the existing
`pipeline.extract/ingest` and `associations.route`; no alternate schema or UI is needed.
Use the original `verification/server.create` against the private review overlay and these
dependencies, binding to `127.0.0.1` with its session token and actual maintainer roster.
Do not expose it through a public dev server or Vercel. Restart after a catalogue revision.

Source-review input can specify `privateCatalogueFile` and `expectedPrivateCatalogueHash`.
The CLI validates the private admission envelope and pins its hash before using those
dependencies. Changes to the admitted working copy invalidate the source-review plan.
Without these fields, it uses the unchanged canonical catalogue. This does not authorize
copying any private identities back to tracked data.
Every source-reading plan also pins the catalogue and eligibility-policy hashes, so
changed dependencies require a fresh preview before confirmation.

## Publication boundary

Private-use permission is not public clearance. Keep ACDB ODbL/DbCL discovery provenance,
Tenrai identities, official-source evidence and editorial decisions separate. Fulfillable
license notices/access obligations differ from unresolved third-party permissions. Do not
conclude either that every minimal fact needs permission or that independent checking
automatically erases database obligations.

An eventual separately authorized release must contain only admitted, fact/eligibility
approved, rights-assessed, rarity/alias-approved and release-authorized entries. Validate
the bank in memory with `power-level/versioning.validateBank`; preserve old tiers, one
Limit Break, Too Clever flags, old releases and dated assignments. Never regrade historical
scores. This workflow provides no publish, activation, deployment or migration command.

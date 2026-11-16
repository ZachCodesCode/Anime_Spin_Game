# Phase 5B-2: private editorial review

This tooling prepares evidence assessments, alias recommendations and a conditional
coverage preview. It never exports a playable bank, assigns rarity, verifies a claim
on import, or touches a database. It uses the existing trait model and review history.

## Private inputs and outputs

All joined character data is under ignored `catalogue/private/phase5b2/`:

- `associations.json`: private working copy of all 80 Phase 5B-1 histories plus
  10 new, unverified category claims. Earlier ledgers are never written.
- `assessments.json`: 38 priority assessments, five original reassessments, and
  ten category suggestions. Each has identity, exact source fact, adaptation scope,
  eligibility recommendation, and provenance; these are **not review events**.
- `alias-supplements.json`: one pending romanization proposal, kept separate from
  the inherited proposals. `alias-notes.md` prioritizes identity/collision work.
- `preview.json`, `REVIEW.md`, `summary.json`, `alias-review.json`: generated reports.
- `decision-templates.json`: incomplete, non-executable actions for each assessment.
- `research-gaps.json`: attempted categories with missing identity/adaptation proof.

The private research inputs are intentionally not shipped in Git. A fresh checkout
needs the owner's permission-cleared local review package to regenerate reports.
Tests use synthetic fixtures and do not require private data or network access.
Do not force-add private files. Ignore rules do not remove earlier committed data.

## Generate / validate

From the repository root:

```sh
node catalogue/editorial/package.js build
npm test
npm run catalogue:validate
node catalogue/traits/cli.js validate
node power-level/versioning/cli.js check
npm run build
```

Generation validates the reviewed inventory and preserved event prefixes. It writes
reports/templates only; it does not replace the ledger, make decisions or run imports.
Generation and review share an exclusive lock. The private one-time research assembly
script refuses to overwrite an existing ledger; do not rerun it to revise history.

## Record an actual maintainer decision

1. Read the individual assessment and open its sources. Confirm identity, anime,
   exact trait, recurrence/form and any conflicting evidence. A secondary page or
   an official page merely mentioning a name is not precise trait proof.
2. Copy just the `action` object of the appropriate template to a **new private**
   `decision.json`. Fill `operationId` with a unique ID, `reviewer` with the actual
   authorized maintainer, `note` with their reasoning and `status` with `verified`,
   `rejected` or `needs_review`. Null template fields deliberately fail validation.
3. Retain `expectedRevision`. Add the newly reviewed evidence to `claim.evidence`
   without discarding old provenance. For verification, specify the actual
   `context.animeId`, persistence, scope and form. Do not blindly approve an inherited
   `animeId: null` or unknown persistence. A real review is required, not an AI
   impersonating a maintainer. This is a trusted local workflow, not authentication.
4. Apply the explicit decision locally:

```sh
node catalogue/editorial/package.js review catalogue/private/phase5b2/decision.json
node catalogue/editorial/package.js build
```

The command delegates to the existing `traits/model.review`, enforcing optimistic
revisions, immutable history prefixes and operation-ID retry idempotency. It only
writes the Phase 5B-2 private ledger. Reject/request-evidence decisions also append
history. Never use the older CLI that targets the canonical ledger for this package.

**Trait approval does not authorize question inclusion.** Eligibility recommendations
remain pending until a separately recorded authorized question decision in a future
integration phase. Even a verified trait does not update answers or scores here.
No question approval or live publication command is provided.

## Interpretation

- `direct`: primary/licensed source supports the precise trait in the matched
  adaptation, with corroborated identity. Still not maintainer verification.
- `secondary`: a secondary source asserts the trait; adaptation may be unresolved.
- `insufficient`: mention-only, wrong adaptation, or unresolved identity.
- `unreferenced`: no independent trait evidence beyond inherited dataset assertions.
  This label does **not** erase Wikidata reference blocks or imply all are empty.
- `conflicting`: contradictory trait classification or identity conflict; unresolved.

Coverage estimates deduplicate by stable character/question, exclude rejected claims,
require direct evidence and an include recommendation, and subtract existing validator
matches. Aliases with recorded collisions are withheld. Current accepted-name matches
remain provisional identity mappings: the live bank lacks stable catalogue IDs.
Reported aliases are recommendations, not approvals. “Approved increase” is always
zero because no eligibility approval/export exists in this phase.

The source facts are short original summaries, not copied biographies. No artwork or
bulk copyrighted content is stored. Evidence URLs do not grant publication rights.
Joined Tenrai catalogue rights remain unresolved; review source-specific terms before
any redistribution, and separately address any Phase 5A data already in Git history.

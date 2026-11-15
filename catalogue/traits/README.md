# Phase 3 trait catalogue

This is an offline review system. Three definitions cover eyewear, detective
activity, and species/forms. Definitions support appearance, identity, occupation,
ability and affiliation categories with string, boolean or number values. Empty
allowedValues means an open vocabulary; otherwise values must be enumerated.
Unknown attributes are absent claims, not false values.

## Data and provenance

- data/definitions.json: IDs, value types, vocabularies and eligibility guidance.
- data/pilot-suggestions.json: small external-import-format demonstration.
- data/associations.json: authoritative claims with append-only review history.
- schemas/: JSON Schema draft-07 contracts for definitions, suggestions, reviews
  and storage. schema.js implements only the keywords used here.
- model.js: reference checks, contextual values, idempotency and review transitions.
- cli.js: offline review commands and atomic writes with an exclusive lock.

Each association has an ID and history. Each history event stores the previous
snapshot and the next snapshot, actor, timestamp, note and operation ID. The
latest after snapshot holds status and claim. A claim contains characterId,
traitId, value, context, evidence and provenance. Identity names are resolved from
the Phase 2 catalogue. Evidence includes URL, source name, short explanation,
source kind and access timestamp. No full biographies or downloaded images persist.

Context includes the imported anime ID, scope (adaptation/arc/episode), persistence
(permanent, recurring, temporary, transformation_specific, unknown), and form.
Temporary and transformation-specific claims require form/episode detail. A verified
claim requires evidence, a known anime appearance and non-unknown persistence.
Semantic evidence quality still requires human judgement: a URL is not proof.

The two pilot records were assembled by Codex after reading their cited sources,
not approved by a human. Kyouya Ootori's official anime merchandise lists glasses;
frequency still needs episode confirmation. Richard Braun's secondary episode
synopsis identifies private-investigator work; that page has a citation-quality
warning, so an anime or authoritative-source check remains necessary. Source
explanations are paraphrases. All pilot records are needs_review.

No evidence-backed cat association was established in the 380-character sample.
Species guidance distinguishes actual cats, cat forms and catlike humanoids.
This is a coverage gap, not a statement that every sampled character is non-feline.

## Add definitions and suggestions

Edit data/definitions.json to add a unique ID, category, valueType, allowedValues
and guidance. Run validation before committing. Definitions are source-controlled;
semantic revisions should use new IDs when an existing meaning would change.

Copy an entry from data/pilot-suggestions.json into a new JSON array. Give it a
stable source-specific ID. Set status to proposed or needs_review. Supply the
existing characterId and provenance.provider, externalCharacterId (namespaced,
for example mal:23), and uncertainty. External identifiers are provenance; the
maintainer must explicitly map them to a known internal ID. Name-based automatic
matching is intentionally absent. Empty evidence is allowed for unverified leads.
Do not use confidence as approval. Optional-source uncertainty is expressed in
provenance.uncertainty; no probabilistic calibration is claimed.

Run:
```sh
npm run traits -- import /absolute/path/suggestions.json
npm run traits -- pending
npm run traits -- show pilot-kyoya-glasses
npm run traits -- validate
npm run traits -- report
```

Identical suggestion IDs and content replay safely, including after review. A
changed suggestion under the same ID is rejected. Associations with the same
character, trait, value and context are rejected even under different IDs. To add
evidence to one claim, submit a review revision, not another association. Different
contexts can coexist; conflicting factual claims require human resolution.

## Review, approve, reject or correct

Inspect the evidence and adaptation yourself. Create a review JSON object with:
- operationId: a new, stable unique ID for this action (reuse only on retries).
- claimId: association ID shown by the show command.
- expectedRevision: current history's last after.revision.
- status: proposed, needs_review, verified or rejected.
- reviewer: your actual project-maintainer identity.
- note: what you checked, the decision rationale and any correction.
- claim: the entire current after.claim, with any evidence/context corrections.

Then run:
```sh
npm run traits -- review /absolute/path/review.json
```

A manually verified new trait uses the same two steps: import the proposal, then
record the maintainer's verification action. Rejecting a proposal preserves it.
Correcting a verified claim appends a revision and may return it to needs_review.
Reopening, rejection and approval all retain prior evidence and status. Exact
operation retries do not create duplicate history; stale revisions fail.

Only authorized maintainers with repository/filesystem access should run review
commands. The reviewer is an explicit attribution, not an authenticated account.
Git access controls and code review are the authorization boundary. Anyone able
to directly edit these files can rewrite history; the CLI detects broken chains
but is not a signed tamper-proof audit log. Review history should be inspected in
Git before merging. No human approval was fabricated for this demonstration.

The CLI holds associations.json.lock while writing and atomically renames a
validated temporary file. After a process crash, confirm no writer is running
before removing a stale lock. Never manually edit existing history entries.

## Phase 4 limitations

Verified means a maintainer accepted a scoped factual claim. It does not imply
eligibility for any question. Future question rules must handle glasses vs
sunglasses, professional vs amateur detectives, and ordinary cats vs transformed
or humanoid characters. No gameplay publication exists here.

The current identity pilot omits many obvious category candidates. Expand identities
and research sources before expanding coverage. These sources have not been
licensed as a bulk trait dataset. Community licensing does not settle underlying
third-party rights. No external appearance-tag dataset was imported.

Whole-file JSON and scans suit this small review pilot. Benchmark and introduce
indexes/sharded transactional storage before thousands of concurrent or large
history operations. Any storage migration must retain stable IDs and events.

Run npm test for all game, importer and trait tests. The tests use synthetic
reviewers only in memory; they never approve pilot records or write identity data.

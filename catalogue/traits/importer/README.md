# Persistent offline character-trait imports

This extends the existing catalogue, trait model, verification state and generator.
There is no parallel canonical identity database or public admin application. All
imports are candidates; only the existing maintainer review can verify facts and
separately approve question eligibility. Rights/rarity/release gates remain separate.

## Commands

Install Node 20+ and Python 3 (only the reused SQL stager needs Python). Obtain an
authorized private catalogue bundle using ../../TEAM-SETUP.md. No API credentials
are required for file ingestion. No provider is called during gameplay.

```sh
npm run catalogue:traits-import -- import --provider wikidata --input catalogue/private/BATCH/wikidata.json --state catalogue/private/BATCH/state.json --dry-run
npm run catalogue:traits-import -- import --provider wikidata --input catalogue/private/BATCH/wikidata.json --state catalogue/private/BATCH/state.json --write
npm run catalogue:traits-import -- import --provider acdb --input catalogue/private/BATCH/acdb-export.json --mappings catalogue/private/BATCH/reviewed-code-mappings.json --state catalogue/private/BATCH/state.json --write
npm run catalogue:traits-import -- import --provider authorized --input catalogue/private/BATCH/source.json --manifest catalogue/private/BATCH/permission.json --state catalogue/private/BATCH/state.json --write
npm run catalogue:traits-import -- inspect --state catalogue/private/BATCH/state.json
npm run catalogue:traits-import -- validate --state catalogue/private/BATCH/state.json
npm run catalogue:traits-import -- conflicts --state catalogue/private/BATCH/state.json
npm run catalogue:traits-import -- identity-review --state catalogue/private/BATCH/state.json
npm run catalogue:traits-import -- generate --state catalogue/private/BATCH/state.json --output catalogue/private/BATCH/NEW-answer-review.json
```

Omitting --write is a dry run. --dry-run and --write cannot be combined. Optional
`--limit 30` bounds source character records, including uncertain identities; it is
not a fabricated successful-match quota. Use bounded source batches for large jobs;
50,000 source records is a hard input ceiling, not a recommended batch size. Claims
use the existing history validator, so large single batches cost more than small
incremental imports. The SQL stager provides indexed, checkpointed bulk loading.

The first write to a new state copies the existing private associations intact.
Existing state is extended, never recreated. Use the same --state on subsequent
imports. The default is the existing private Phase 5B-3 state if present, otherwise
review-state.json in the configured private team-data directory. An explicit
ASCENT_TRAIT_REVIEW_STATE overrides it. State and snapshots must remain in
catalogue/private or the explicitly configured private team-data directory.

To inspect/review a chosen store through the existing commands/UI:

```sh
export ASCENT_TRAIT_REVIEW_STATE='/absolute/private/BATCH/state.json'
npm run catalogue:validate
npm run traits -- validate
npm run traits -- pending
npm run catalogue:inspect -- EXISTING-STABLE-ID
npm run catalogue:review
```

The actual roster is `maintainers.json` alongside that state. The owner explicitly
configures actual maintainer identities; no roster is supplied or synthesized.
Review keeps the existing random local token, exact loopback Host, same-Origin
write checks, state hashes and preview/confirmation. The legacy baseline trait
write CLI refuses to fork a second claim ledger once an active shared state exists.

## Adapters and input

**Wikidata:** existing CC0 snapshot format `{provider:"Wikidata",license:"CC0-1.0",
retrievedAt,entities}`. Uses the existing exact property/value mappings, stable
P4085 MAL crosswalk, revisions, statement IDs, qualifiers and references. Missing,
ambiguous or deprecated identity links are held/skipped by the existing adapter.
Franchise-level statements do not prove an anime adaptation: context remains
unknown where the source does not establish it. Use the existing bounded collector
or an authorized previously collected snapshot. No new scraping service is added.

**ACDB:** validated output from ../../acdb/stage.py, plus its separately inspected
code-mapping JSON. The adapter verifies the mapping digest and exact code/label
correspondence. It does not trust precomputed character matches: it joins names and
explicit anime titles against the current catalogue again. Only documented hair
colour, eye colour and determinate hair lengths are normalized. Hair-up is not a
ponytail; elf-like ears are not species; age/sex/appearance codes are not occupations.
Unrecognized codes remain unknown. All ACDB records retain an ODbL/DbCL publication
hold. There is deliberately no HTML crawler or automatic API challenge bypass.

**Authorized structured source:** local input format:

```json
{
  "format": "anime-ascent-trait-source-v1",
  "revision": "SOURCE_REVISION",
  "retrievedAt": "ACTUAL_ISO_DATE",
  "records": [{
    "externalId": "SOURCE_CHARACTER_ID",
    "canonicalId": "EXISTING_CANONICAL_CHARACTER_ID",
    "animeId": "EXISTING_ANIME_ID",
    "facts": [{
      "traitId": "appearance.hair_color",
      "value": "orange",
      "url": "https://PERMITTED_HOST/character",
      "locator": "EXACT_FIELD_OR_SECTION",
      "fact": "SHORT_SOURCE_SUPPORTED_FACT",
      "context": {"animeId":"EXISTING_ANIME_ID","scope":"ACTUAL_SCOPE","persistence":"unknown","form":null}
    }]
  }]
}
```

This is a placeholder template, not real character evidence. Instead of a canonical
ID, use a stable malId, or a documented name plus animeId/animeName/animeNames.
Name-only identity matching is refused. Source IDs remain distinct from MAL IDs.
Exact Japanese names use documented Unicode names and adaptation bindings; no
empty Latin normalization or invented transliteration is accepted. Reversed name
order/limited romanization reuse the existing novelty matcher. Aliases are never
written automatically into canonical identities.

The separate, trusted owner-maintained permission manifest needs `enabled:true`,
`id` (not reserved acdb/wikidata), `permission` (CC0-1.0/authorized-feed/
individual-fact-review), actual `reviewedBy`/`reviewedAt`, `permissionUrl`, allowed
`hosts`, and `kind` (primary/licensed/dataset/secondary). Set structured:true only for genuinely deterministic structured source extraction.
Otherwise authorized-source summaries retain editorial_summary classification and
cannot count as deterministic independent batch evidence. AI proposals always
retain ai_proposal regardless of source configuration.
`originFamily` records the
actual original source, not merely a syndicating hostname. Publication remains on
hold unless separately established. This local manifest is an explicit permission
configuration, not a way for downloaded data or AI to authorize itself. Do not
invent a reviewer, permission or primary-source classification.

Basic exact synonyms normalize hair colour/color, eye colour, hairstyle, species,
occupation and accessories, plus blond/blonde, grey/gray and selected hyphenation.
Other mappings require an adapter or a reviewed definition change. Unsupported
traits/values persist as held observations without being converted into false
claims. AI-derived candidate facts must use `extraction:"ai_proposal"`; confidence
is not evidence and AI-only records fail verification. Production suggestion APIs
are untouched; this file format is the future offline intake boundary.

## Persistence, conflicts and review

The existing verification envelope remains authoritative:

* `traits.associations`: canonical claims and original append-only histories.
* `records`: question-linked evidence in the existing review model.
* `identityBindings`: persistent provider-ID to canonical-MAL bindings.
* `importObservations`: source IDs, raw fields/values, licence, source snapshot,
  context and held facts, including traits without an active question.
* `identityQueue`: unresolved/colliding identities and their source facts.
* `importConflicts`: potential conflicting characteristics, never automatic verdicts.
* `importRuns`: incremental receipts; repeats do not create revision/audit churn.

Conflicts are recomputed from canonical active claims for the reviewer/generator;
erasing a metadata flag cannot enable a disputed answer. Different adaptations or
explicit forms remain distinct. Unknown temporal scope is conservatively held.
A maintainer may reject an incorrect conflicting claim through existing review;
the rejected history remains. New contradictory observations never silently reset
an earlier approval. Previously rejected traits need explicit reopening.

The writer uses an exclusive lock, state comparison, fsynced temporary file, atomic
rename and read-back validation. Source snapshots are immutable and private. A
failed operation leaves the prior committed state intact. On a real process crash,
inspect .lock/.tmp files, their recorded PID/host and source/state hashes. Confirm
that no writer is running before recovering an abandoned lock or temp file; never
blindly remove another process's lock. Restore a privately backed-up state if its
JSON or history is corrupt. No automatic destructive recovery is attempted.

Exact repeat imports avoid duplicate claims/evidence. A new source revision appends
evidence while preserving reviewed history; changes needing reopening are held.
Reimporting the same source can route existing facts to newly mapped questions
without duplicating the underlying trait.

## Generator boundary

`generate` calls the existing generator and verification view. It emits a private
review package: genuinely new, identity-safe question-eligible candidate additions
and a separate pending-research queue. Pending, conflicting, rejected, ambiguous or
unresolved claims never enter approved-eligible output. Proposed rarity uses existing
metadata/prominence/scoring conventions; no new Limit Break is chosen, current
answer scores are unchanged, and publicationAuthorized remains false. There was no
player frequency dataset available for this task; no popularity claim is presented
as measured player statistics.

Source-backed candidates are useful persistent knowledge even before approval.
Dataset assertions alone do not meet the direct-evidence approval gate. Real source
imports may therefore produce pending candidates and zero approved additions; that
is different from failing to persist the data. Tests exercise the complete existing
maintainer approval-to-generator path with explicitly fictional fixtures, without
claiming any real approval occurred.

## Team synchronization

Use one authoritative private state and transfer it under actual owner authorization.
The existing private bundle accepts optional review-state.json only when the owner
sets `includeReviewState:true` in the actual transfer authorization. Export uses
ASCENT_TRAIT_REVIEW_STATE; bootstrap validates all histories and checksums. The
recipient gets a new private data directory, not an overwrite of their own reviews.
Maintainer rosters, local session tokens and credentials are never bundled.
Raw import-snapshots and ACDB staging data require a separately authorized private
transfer retaining their notices; they are not silently added to the bundle.

Do not merge concurrent review files by array concatenation. Reimport immutable
source snapshots into the authoritative state, preserve operation IDs and review
histories, and have maintainers reconcile divergent decisions explicitly. Use Git
PRs for code/schema changes; keep datasets, licences/notices, snapshots and review
packages in owner-authorized storage. Public Git access does not grant dataset rights.

The original `ascent:generate` command also accepts --review-state (or the explicit
ASCENT_TRAIT_REVIEW_STATE environment path) and uses that envelope's complete trait
store for existing-question coverage, rather than reporting only the old baseline
claims. Its metadata-based question drafts remain private proposals. Traits without
any current question rule remain stored and inspectable; question eligibility needs
an explicit curated rule and the existing question-linked review before they can
enter an answer expansion. No generic approval bypass was added for unmapped traits.

# Required offline daily content handoff and enrichment

This tooling runs on the shared database branch (PR #28). It is never imported by
Ascent/Descent gameplay or score APIs. After this PR is merged, use these commands
as the standard preparation workflow for every daily CSV. They are not a watcher:
arbitrary manual edits to questions.js cannot automatically run local research tools.
The existing content branch has no CSV integration command; this provides the
single preparation entry point rather than pretending an existing hook was present.
Do not call a handoff or hand-edited gameplay patch a completed enriched integration.

## Configure once per developer

Obtain the existing authorized private knowledge-store backup through the established
TEAM-SETUP/TEAM-EXPORT handoff. Do not synchronize independently edited SQLite files.
Exchange immutable packets and source snapshots; apply them serially to the designated
store. Backups and all source material remain private. The public subset's derived
search index is not an original-provider store and cannot be re-exported as one.

Create ignored `catalogue/private/daily-config.json`:

```json
{
  "database": "/ABSOLUTE/PRIVATE/knowledge.sqlite",
  "sources": [],
  "maintainers": "/ABSOLUTE/PRIVATE/phase5b3/maintainers.json"
}
```

Set `ASCENT_DAILY_CONFIG` to that private file or pass `--config PATH`. If the database
is outside this checkout's catalogue/private boundary, configure its authorized parent
as `ASCENT_CATALOGUE_DATA_DIR`. Configuration is local, never a submitted packet field.
Optional `sources` entries use the existing knowledge adapter arguments: provider
`acdb`, `acdb-profile` or `wikidata`, input, and any required mappings/permission
manifest. Use actual permitted source snapshots. No newly named JVMG provider is
trusted by this daily workflow. A URL, CSV "supported" label or AI verdict is never
an admission policy. Optional `metadata` points to existing-schema Tenrai metadata;
optional `reviewState` points to the real existing maintainer state. With reviewState,
a *preview* preserving existing histories is generated for the existing review UI;
the current approved/rejected state is never overwritten or approved automatically.

## One preparation command, mandatory enrichment

```sh
npm run daily:integrate -- --input catalogue/private/daily/questions.csv --mode ascent --date 2026-12-01 --output catalogue/private/daily/NEW-operation
# Same command with --mode descent for Descent.
```

The CSV requires `question_id,question,kind,answer,rarity`. Kind is char or title.
Optional columns: category, note, anime, concept_id, character_id, anime_id,
anime_title, clever, aliases, evidence, context and knowledge. Arrays/objects must
be valid JSON inside RFC-style quoted CSV cells. Preserve Unicode; escape newlines
inside JSON strings. Pure non-Latin gameplay aliases may fail the existing game's
ASCII normalizer; that is a gameplay validation error, not permission to strip
source names. Original source Unicode remains untouched.

Use stable character IDs plus adaptation IDs where known. Otherwise name matching
requires a documented compatible anime. New aliases do not rewrite canonical identity.
The knowledge column can supply an explicit proposal, e.g.
`{"entity":"character","all":[{"trait":"equipment.weapon","value":"sword"},{"trait":"ability.element","value":"fire"}]}`.
All conditions/context are retained; unknown complex prompts are pending. No negatives
are inferred from exclusions. Title mappings use `entity:anime` and existing metadata
fields (genres, themes, studios, year, type, episodes, source), never character traits.
Rarity/Too Clever remain question-specific and are not permanent character attributes.

JSON banks are also accepted. Arbitrary submitted JavaScript is **not executed**.
For reviewed repository JavaScript use `--ref REF --question-ids ID,ID`; the exact
tracked commit's bank is evaluated without filesystem/network bindings. This is a
trusted-code selection, not a general security sandbox. Immutable releases use
`--release /PATH/TO/HASH_DIRECTORY`, checking manifest/bank hashes without executing
its bundled runtime. Both forms require mode/date and may select question IDs.

Integration validates existing bank rules, saves a deterministic packet, backs up
SQLite consistently, verifies the backup, and admits permitted source snapshots
through the existing adapters inside one outer transaction. It records proposed
question inventory and append-only pending claim/provenance envelopes in the existing
legacy ledger (no new database/schema). Stronger observations and review decisions
are not rewritten by CSV assertions. Actual source additions use the existing
observations/bindings/facets tables. Title metadata uses existing field/schema validation
with provenance; unsupported title facts remain metadata candidates.

The transaction validates SQLite and stages a policy-scoped public export before
commit. Source facts already present do not become duplicate trusted triples just
because they occur in another CSV. Publication/actual usage is never inferred.
After commit, changed public partitions are installed and validated. An export
failure is an explicit failed integration with a durable export-pending marker;
retry the identical packet/output to finish it. No success receipt is issued until
all stages complete. Multi-file filesystem publication is not one atomic SQLite
transaction: an I/O interruption after DB commit requires that retry. Previous public
files are backed up and restored on caught installation failures. Inspect recovery
artifacts after power loss; do not deploy an incompletely installed export.

Outputs are private: packet.json, knowledge.before.sqlite, pending-review.json,
optional maintainer-review-preview.json, public-stage/, public.before/, receipt.json,
and reviewed-bank.NOT-PUBLISHED.json. The latter is a content preparation artifact,
not an automatic edit or publication of questions.js. Move only reviewed gameplay
content to the daily content PR; no importer code or private state belongs there.
Rights-cleared public partition updates are reviewed separately in the database PR.

## Safe branch handoff

```sh
npm run daily:handoff -- --input catalogue/private/daily/questions.csv --mode descent --date 2026-12-01 --output catalogue/private/daily/HANDOFF
# In the shared-tooling checkout, using the same authorized packet:
npm run daily:integrate -- --packet /PRIVATE/HANDOFF/packet.json --output catalogue/private/daily/NEW-operation
```

Handoff status explicitly says NOT_INTEGRATED. It needs no knowledge DB and never
claims successful enrichment. Neither command switches branches, creates commits,
pushes, merges, deploys or changes scheduling. Until this tooling reaches the content
branch through a manually reviewed merge, that branch cannot automatically run code
it does not contain. Record the successful enrichment receipt alongside the private
content review before considering preparation finished.

`daily:preview` takes the same arguments and assesses without changing the store.
Original-source preparations/private snapshots may be written; no claims are applied.
Source additions planned in preview are not counted as already admitted.

## Usage and historical backfill

`daily:inventory --ref origin/main --output catalogue/private/HISTORY.json` inventories
tracked main and locally available immutable releases. It deduplicates identical
question snapshots and question/answer identities while retaining historical revisions.
It is read-only and treats repository schedules as proposals, never deployment proof.
No production credentials or player submissions are used. With --config, an additional
private existing-identity/trait assessment is performed.

Confirmed use is a separate, explicit operator action:

```sh
npm run daily:confirm-usage -- --record catalogue/private/actual-usage.json --maintainer 'ACTUAL CONFIGURED MAINTAINER'
```

Record mode, date (Toronto date key), bankVersion, questionIds, publicationReference
and assignmentReference. The bank must exist immutably and contain the selected IDs
for that mode. The actual configured Phase 5B-3 maintainer must attest the publication
and actual assignment evidence. This is a local maintainer attestation, not a proof
that a remote deployment was queried. No fictional reviewer or production migration.
Usage is appended idempotently in the same ledger, separately by game mode. It does
not alter the scheduler scope. Consult the existing freshness planner for equivalent
concepts and the 14-day cooldown; no second scheduler is introduced. Player performance
is not collected or treated as trait evidence by this importer.

## Recovery

Insufficient space (database size plus 2 GiB reserve), concurrent writers, invalid
source data and schema failures stop preparation. Before transaction commit, all
SQLite changes roll back. Preserve the backup and use a new output directory after
a pre-commit failure; an existing backup is never overwritten. After commit/export
failure, retry the identical operation/output. Backups can be validated with existing
`catalogue:knowledge validate --database BACKUP`; restore only to a new private path
using the established team-export recovery process and an actual owner decision.
Never replace a changing live database with a stale backup automatically.

## Research-backed historical reconciliation

Optional private config `research: [CSV_PATH, ...]` supplies documentary source rows.
Supported research headers include question_text, canonical_answer, anime,
existing_database_id and source_url. Rows join to the exact question/accepted name;
then the existing canonical-ID/name/franchise resolver validates them. Conflicting
IDs remain ambiguous. CSV "supported" labels are retained for audit and never
become factual verification or rights clearance. Inventory reports secure matches,
unresolved occurrences and zero genuinely new identities unless separately established.

For JVMG, the same optional sources array supports provider `jvmg` only through the
scoped permission adapter described in ../jvmg/README.md. It produces pending
observations, never automatic source trust or answer approval. An unconfigured or
uncleared graph fails integration rather than silently skipping enrichment.

Research CSVs with question_number/question_text/canonical_answer/rarity_value/
existing_database_id/source_url are accepted by the same integration command when
`--question-map PRIVATE.json` explicitly maps each number to its stable `id` and
`kind`. This avoids inventing IDs or treating per-answer anime names as a common
question-level franchise. UTF-8 is decoded strictly. For example, a private mapping
can contain `{"1":{"id":"EXISTING_REVIEWED_QUESTION_ID","kind":"char"}}`.
Use the same `daily:integrate` command; enrichment is still mandatory and automatic.

## Permanent instruction for Codex and Claude Code (after merge)

> For every Ascent or Descent CSV, run the existing `npm run daily:integrate -- --input PRIVATE.csv --mode ascent|descent --date YYYY-MM-DD --output PRIVATE_NEW_OPERATION` using the shared configured database tooling. Enrichment is required: stop on any nonzero exit, retain backup/recovery artifacts, and require a successful `ENRICHED_NOT_PUBLISHED` receipt before treating preparation as complete. Keep unsupported facts pending and restricted sources excluded. Then separately review and integrate the gameplay bank on the dedicated content branch, preserving scoring, IDs and dates. Record confirmed usage only after actual publication/assignment. Never commit, push, merge or deploy automatically.

A successful receipt proves offline database preparation and filtered export validation;
it does not prove that questions were integrated, published, scheduled or deployed.
Both developers configure the same code revision and designated authorized store as
above. A `sources: []` day still records existing matches and pending CSV proposals;
it does not make unsupported facts trusted. Do not add JVMG to that configuration
until actual graph-specific private admission permissions have been reviewed.

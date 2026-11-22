# Bulk ACDB knowledge extension

This extends the existing adapters and private development catalogue. It uses
Python 3's SQLite library (no new service or dependency) because rewriting and
validating the entire historical JSON ledger per row is unsuitable for hundreds
of thousands of source records. No production table, runtime query or Turso access
is involved. Node 20+ and Python 3 remain the prerequisites.

## Trust, identities and migration

The explicit project-owner instruction is recorded in trust-policy.json. Clear,
provenance-valid ACDB assertions are source_trusted for internal candidate generation.
This is neither independent verification nor a human approval. Other providers do
not inherit this policy. AI/editorial interpretations remain proposals; conflicting
same-context values, rejected claims, malformed values and uncertain identities
are held. Rights and final release authorization remain separate and false.

The existing MAL catalogue and JSON review history remain unchanged. On import,
`--state` (or ASCENT_TRAIT_REVIEW_STATE) is validated and saved as a content-addressed
legacy snapshot in the same indexed knowledge extension. Existing canonical IDs
are reused when name/adaptation matching succeeds. New well-formed anime source
identities use `acdb-character-ID`, with `canonicalId:null`, documented source
assignments and no fabricated MAL IDs. This is a provider-identity admission, not
an assertion of independently reconciled identity. The strict existing Tenrai/MAL
schema is not silently widened; a future reviewed crosswalk can reconcile those
IDs without rewriting evidence. Ambiguous records retain source identity and
facts in the indexed source ledger, isolated from trusted generation.

The SQLite tables are source versions, jobs/checkpoints, provider bindings,
identity projections, historical observations, current-field pointers, conflicts
and unchanged legacy review snapshots. Existing adapters, trait IDs, context,
source metadata, aliases and rarity logic are reused. There is no second roster,
public admin interface or independent approval workflow. The existing private
review UI remains the authority for independent verification; source trust is an
overlay used by offline generation without pretending to record approvals.

Transactions commit observations and checkpoint together. Resume uses the same
prepared immutable source; finished replay inserts nothing. Updating an explicitly
present field changes its current assertions while preserving history. Missing
fields do not mean false and do not erase previous information. An explicitly
empty newer tag collection retires the previous tag set. Replaying an older source
cannot reactivate superseded facts. Raw full dumps, prepared NDJSON and DB snapshots
are private, versioned inputs. One writer is recommended; SQLite handles locks.

## Complete source ingestion

Inspect the actual SQL schema and trusted code mappings first. Use all three
complete official archives without --allow-partial when they are available:

```sh
export ASCENT_CATALOGUE_DATA_DIR='/absolute/private/team-data'
export ASCENT_TRAIT_REVIEW_STATE="$ASCENT_CATALOGUE_DATA_DIR/review-state.json"
export ASCENT_KNOWLEDGE_DATABASE="$ASCENT_CATALOGUE_DATA_DIR/knowledge.sqlite"
npm run catalogue:acdb-stage -- --catalogue "$ASCENT_CATALOGUE_DATA_DIR/catalogue.json" --database catalogue/private/ACDB-BATCH/staging.sqlite --characters catalogue/private/ACDB-BATCH/characters.sql.gz --publishers catalogue/private/ACDB-BATCH/publishers.sql.gz --assignments catalogue/private/ACDB-BATCH/assignments.sql.gz --mappings catalogue/private/ACDB-BATCH/mappings.json
npm run catalogue:knowledge -- import --provider acdb --input catalogue/private/ACDB-BATCH/ACTUAL_VERSION.json --mappings catalogue/private/ACDB-BATCH/mappings.json --batch-size 500
npm run catalogue:knowledge -- import --provider acdb-profile --input catalogue/private/ACDB-BATCH/permitted-profiles.json --batch-size 500
npm run catalogue:knowledge -- metrics
npm run catalogue:knowledge -- validate
npm run catalogue:knowledge -- profile --character acdb-character-ACTUAL_ID
npm run catalogue:knowledge -- profile --character mal-character-724
```

Paths are templates for actual authorized data, not bundled datasets. No artificial
character-count quota is imposed. Prepare uses bounded chunks of the existing
adapter; SQLite ingest uses 1–5000 rows per transaction. `--stop-after-batches N`
permits a controlled interruption. Repeat the same command without that option
to finish. Completed sources report zero added observations on replay. Preserve
prepared inputs and checkpoints; never delete a live writer's files. Changed source,
catalogue, definitions or policy requires a new prepared path (`--prepared`).

Parser format 3 retains the six additional r_* source codes and secondary publisher
ID along with earlier fields. Their raw code/label remains held when source meaning
is undocumented; no alternate appearance, species or colour fact is guessed.
Character SQL fields do not establish general tags or biographies. The documented
character API's observed basic response is not a tag export. Do not enumerate or
crawl character webpages. See the extended-export request for the missing data.

## Search and question generation

Save a private query JSON with explicit positive conditions:

```json
{
  "id":"draft-blue-haired-pirates",
  "text":"Name an anime pirate with blue hair.",
  "all":[
    {"trait":"appearance.hair_color","value":"blue"},
    {"trait":"occupation.role","value":"pirate"}
  ]
}
```

```sh
npm run catalogue:knowledge -- search --query catalogue/private/QUERY.json --output catalogue/private/NEW-search.json
npm run ascent:generate -- knowledge --query catalogue/private/QUERY.json --output catalogue/private/NEW-draft.json
```

Use a new output file. Birthday conditions support `{"trait":"profile.birthday",
"month":4}`. Other exact conditions include eyewear:goggles, occupation.role:sniper,
identity.species:elf, equipment.weapon:sword, ability.named_power:lightning and
case-preserved affiliation.membership values. Unmapped explicit tags use source.tag
and retain original labels plus a stable sourceTagId without inferred category.
An optional `genre` uses existing MAL anime metadata; missing metadata excludes a
candidate from a genre-specific draft rather than inventing a classification.

Search uses indexed traits/values and returns positive source assertions, anime
context, trust and rights. Compound conditions identify the same character, but
do not prove a shared outfit/episode; generated drafts explicitly require that
question-specific contextual check. Unknown is never treated as false.

Drafts include stable identities, canonical names, collision-checked aliases,
source evidence, eligibility predicates and per-answer existing rarity proposals.
Known source-reported Main Character/Protagonist roles and unambiguous existing
anime metadata can inform the existing rarity heuristic, alongside original
canonical prominence and bank recognition. Every draft exposes these inputs.
Unknown prominence/popularity uses the existing 85 heuristic with an explicit
insufficient-context flag; it is not a measured obscurity score or editorial approval.
Actual response frequency is not invented. Default output holds for a Limit Break.
After an appropriate editorial choice, pass `--limit-break-character EXISTING_ID` to
propose exactly one 100-point answer and validate game format. This still cannot
publish, modify live banks or bypass rights and final release approval.

## Descriptions and relationships

Default profile ingestion hashes biographies instead of copying them. The optional
trusted local manifest's `descriptionReuse` needs allowed:true, actual reviewedBy,
reviewedAt and permissionReference to retain licensed original text. Do not invent
a grant. A bounded deterministic extractor recognizes explicit labelled lines such
as `Occupation: sniper`, `Affiliation: Straw Hat Pirates`, `Weapon: slingshot`, or
exact-subject occupation, service/affiliation and equipment templates. It does not interpret arbitrary prose,
negations or another subject's role. Unsupported prose stays hashed; supplied short
editorial/AI extractions remain proposals. No live AI calls occur.

Typed relationships retain source/target, relationship type, adaptation and unknown
period. Existing canonical or explicit same-source stable IDs can resolve targets;
otherwise the link stays pending. Family subtypes and unnamed related characters
are never invented. Profile inspection includes held source records as well as
trusted observations. Provider-specific identities and aliases do not mutate the
existing MAL catalogue.

## Authorized private team transfer

The existing owner-authorized bundle approach is extended with a separate compressed
knowledge attachment, avoiding the JSON bundle's size ceiling. It transfers a
consistent SQLite backup, legacy reviews, source provenance and checkpoints. It
excludes maintainer rosters, tokens, credentials and raw archive files. Keep the
three-file catalogue bundle and this attachment together at matching code/schema
versions. The owner must actually authorize the transfer; public Git access grants
no data permission.

The private authorization JSON uses the existing purpose/authorizedBy/reference/
publicRedistribution fields and additionally requires includeKnowledgeState:true
and includeReviewState:true. No actual owner grant was fabricated in this task.

```sh
npm run catalogue:knowledge -- bundle --authorization catalogue/private/ACTUAL-owner-authorization.json --output catalogue/private/NEW-knowledge.private-bundle.tar.gz
# Transfer through actual access-controlled storage; obtain the SHA via a trusted channel.
export ASCENT_KNOWLEDGE_BUNDLE_SHA256='ACTUAL_OWNER_PROVIDED_SHA256'
export ASCENT_KNOWLEDGE_DATABASE="$ASCENT_CATALOGUE_DATA_DIR/knowledge.sqlite"
npm run catalogue:knowledge -- bootstrap --input catalogue/private/download/knowledge.private-bundle.tar.gz
npm run catalogue:knowledge -- metrics
```

Bootstrap requires a nonexistent target, checks the trusted archive checksum,
authorization, filenames, size limits, internal DB checksum, schema and SQLite
integrity. It uses private staging and atomic rename, never overwriting reviews.
Snapshots retain all source versions; do not merge concurrent databases blindly.
Take a private backup before changing schema/code. No automatic Internet sync or
production deployment is added. Raw source archives/prepared inputs need separately
authorized transfer if the second maintainer will resume imports rather than query.


`metrics` uses a structural quick check plus indexed aggregate counts. The explicit
`validate` command performs full SQLite/index integrity and cross-table/trust
invariants; this can take minutes on multi-gigabyte histories. Provider/version/
status lookup has its own index, including the empty-coverage anti-join. Validation
also checks that this query uses the expected index. Neither command changes source
facts or approves records.

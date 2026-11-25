# JVMG offline staging and gated enrichment (Phase 6)

The professor-provided archive establishes access, not game-use or public redistribution
rights. The implementation supports private staging, complete vocabulary inspection, identity reconciliation, and gated pending admission through the existing knowledge store. **Real JVMG admission remains on hold for source-specific permission.** It does not add JVMG to source-trust policies, approve claims, publish gameplay answers, or clear commercial rights.

```sh
npm ci
python3 -B catalogue/jvmg/stage.py --archive /PRIVATE/jvmg_all_2.tar.gz --output catalogue/private/phase6/rdf-stage
```

Use ASCENT_PYTHON's interpreter convention on Windows (`python`); `--node` can point
to the installed Node executable. N3 is a pinned development dependency. The parser
uses streaming Turtle/RDFJS, retaining IRIs, graph-file identity, language tags,
datatypes and deterministic graph-scoped blank nodes. No external resources are
resolved. Archive paths are inspected before use, never extracted; absolute paths,
traversal, symlinks, hardlinks, duplicate names and non-Turtle members fail closed.
The separate NSFW graph is excluded. Staging rows remain rights-held; exclusion of
all unsuitable sexualized tags from any future gameplay admission is still required.

The temporary staging SQLite is not another character catalogue. It stores RDF
terms by file/ordinal, not invented canonical characters. `progress.json` pins the
archive SHA, member sizes/checksums and completion status. Each 1,000 triples is
checkpointed. Rerunning the same command resumes incomplete graphs by deterministic
ordinal and verifies completed hashes. Changed archives require new staging output.
A malformed graph is never marked complete. Locks reject simultaneous staging writers;
after a hard kill, verify the owning process ended before manually removing its stale
operation lock. Long literals over 500 characters are hashed instead of copying
biographies. Cross-file resources remain available for later reconciliation.

Default selected graphs are ACDB, ontology/graph metadata, VNDB non-NSFW, AnimeClick
characters/anime/staff/authors/episodes, AniDB titles, anime clusters, character-to-work and animation-specific MADB metadata.
MADB's large mixed-media records and other nonselected graphs are only hashed and
listed; do not claim all archive RDF has been imported. `--only SUBSTRING` (repeatable)
narrows staging. A 2 GiB free-space floor stops safely. Every archive scan still reads
and hashes all members; completed graphs avoid repeated parsing/row insertion.

Graph metadata observed in this archive: ACDB graph description has no license
statement and even an inconsistent descriptive string referring to VNDB; VNDB
explicitly links CC BY-NC-SA 4.0. The JVMG graph descriptions also omit a license; AnimeClick, MADB and AniDB declare CC BY-NC-SA 4.0. Each graph must be assessed independently. Do not inherit direct ACDB SQL's ODbL grant across a JVMG
transformation without resolving the applicable permissions. JVMG and direct ACDB
are not independent evidence sources.

Before knowledge-store admission: finish predicate inventory and trait mappings,
validate actual counts, reconcile exact source IDs (clusters are evidence, not automatic
merges), establish adaptation-specific anime appearances, separate title metadata and
voice actor credits, exclude unsuitable tags, obtain actual use permissions, verify
a current consistent backup and available space, then reuse existing ingest/review
models with a scoped provider adapter. These downstream milestones are NOT implemented
by the staging command. No trusted/public traits should be reported as newly imported.

Private progress and actual run artifacts: `catalogue/private/phase6/`. Read progress.json
and IMPLEMENTATION.md before resuming. Preserve the original archive and knowledge store.

### Malformed source graphs

The real ACDB publisher Turtle fails strict IRI validation at line 119156. With the
explicit `--quarantine-malformed` option, the whole affected graph is marked
quarantined (`complete=-1`), its remaining raw bytes are hashed, and other graphs
continue. Partial rows are never included by report queries (`complete=1` only).
No IRI is silently percent-encoded or otherwise repaired. Without that option the
command fails closed. Counts depending on a quarantined graph remain unavailable.

## Resume architecture and actual admission boundary

A verified fresh backup is now available locally; see the private Phase 6 receipt.
No rights grant has been supplied and **no real JVMG admission has been performed**.

`knowledge.py` projects explicit source resources, preserves terms/provenance and
matches existing ACDB/MAL-linked canonical records through established provider
bindings. JVMG `sourceURI` cluster memberships produce reconciliation evidence,
never unconditional identity merges. Existing anime appearances are preserved even
when cluster mappings or the publisher graph are incomplete. VNDB traits retain
unknown anime-adaptation context rather than borrowing the game's anime eligibility.
The existing definition vocabulary and `profiles.tags` are reused; mappings.json
contains exact additional source-label **proposals**, not new trait definitions.
Unknown tags remain source.tag proposals; sensitive tags remain excluded from
proposed gameplay facts. Private full-vocabulary inspection is distinct from use.

Directed source relationships retain left/right endpoints, raw predicates, proposed
typed links and unresolved context. Voice credits preserve actor→character direction;
ACDB's explicit performer-profile language is retained separately, while AnimeClick nationality is never converted into a dub language. Missing adaptation/language stays unknown. Titles/production
metadata and generic resource profiles are kept separate from character traits;
no synthetic MAL IDs or false Tenrai provenance are created.

For a bounded private projection (using the same indexed staging store):

```sh
python3 -B catalogue/jvmg/cli.py --stage catalogue/private/phase6/rdf-stage/staging.sqlite --knowledge /PRIVATE/knowledge.sqlite --uri http://mediagraph.link/acdb/character/20395 --output catalogue/private/NEW-projection.jsonl
```

The existing preparation library and `daily:integrate` recognize `provider: jvmg`; the generic import CLI rejects JVMG in favor of the protected paths described below. Unlike automatic ACDB/Wikidata trust, JVMG requires a
private request containing `stage` and explicit `uris`, plus a permission manifest
containing private `grant` and actual `maintainers` file paths. Grant fields are:
reviewer (must be on the actual configured roster), permissionReference, purpose
`private-research-admission`, publicRedistribution **false**, and graphs mapping
completed graph names to exact SHA256. Every copied source/ontology graph must be
covered. Do not fabricate a roster or permission to make the command pass.

Preparation is read-only. It emits the existing prepared-knowledge format, with
all new assertions held/proposed and no publication approval. Generic resources
use held source-record profiles, not counterfeit character identities. The daily
wrapper then performs its existing verified backup and one atomic transaction.
The explicit `knowledge.admit` helper additionally validates the backup hash/current
store and preserves every pre-existing canonical identity byte-for-byte. Exact
reimports are no-ops. It is tested with fictional grants only; those fixtures do
not grant rights to the real dataset. Independent factual/context review and a
separate future source-trust policy remain necessary for answer generation.

Do not run the generic raw `ingest` subcommand on an externally prepared file as a
way around permission checks. That low-level tool is an operator interface, not
a security boundary against an operator who can write the local database.

## Full inventory and exact overlap

After the selected staging writer finishes and closes its WAL, run:

```sh
python3 -B catalogue/jvmg/overlap.py --database /PRIVATE/VERIFIED-BACKUP/knowledge.sqlite --output catalogue/private/NEW-positive-triples.jsonl.gz
python3 -B catalogue/jvmg/report.py --stage catalogue/private/phase6/rdf-stage --knowledge /PRIVATE/VERIFIED-BACKUP/knowledge.sqlite --overlap catalogue/private/NEW-positive-triples.jsonl.gz --output catalogue/private/NEW-trait-inventory.json
```

The inventory explicitly states vocabulary completeness independently of full graph
completion. It retains all provider tag IDs, labels, associated source-character
URIs, hierarchy, source graph checksums, known existing bindings, pending contexts,
exact existing positive-triple overlap and potential conflicts. Unmatched source
IDs are unresolved proposals, not genuinely new anime identities. Permitted and
publishable coverage stays zero until actual scope/context/review gates are cleared.
Do not sum per-tag counts as a distinct character total. No graph/source metadata
from this directory is deployed or added to a live bank.

Staging uses WAL with FULL durability. Do not hold long obsolete report snapshots
while a large import runs: they retain WAL pages. Never delete SQLite WAL/SHM files;
release the reader, let SQLite checkpoint, or close the writer normally. Completed
and incomplete graph progress remains in the same staging database.

The existing JavaScript private-path guard validates every request, staging path,
grant and roster before the Python adapter runs. The Python side reuses the existing
team-export private-path boundary so authorized files in another existing worktree's
catalogue/private directory are supported. Set ASCENT_CATALOGUE_DATA_DIR to the
explicit authorized private parent when using the original store; this does not
copy that store or change branches.

Performer language and performance language are separate: sourcePerformerLanguage
retains an explicit actor-profile value; credit `language` remains null when the
source lacks a credit-specific language assertion. Nationality never supplies it.
This prevents a multilingual performer from silently turning every credit into a
Japanese or English-dub credit. All adaptation/language holds remain visible.

### Automatic daily source selection (configure once)

The private JVMG request can be `{"stage":"/PRIVATE/staging.sqlite","useDailyContent":true}`.
The standard `daily:integrate` entry point then chooses resource URIs from the daily
packet's securely resolved canonical IDs and explicitly supplied native source IDs.
There is no per-day manual URI list or second import command. Unknown names are
not globally guessed; unresolved source IDs remain identity-review proposals. A
title-only/no-source-match day records an explicit zero-resource scope. Missing
permissions still fail closed. A JVMG-only source operation does not require the
separate Tenrai JSON catalogue unless the optional existing review-state preview
is requested; the existing authorized SQLite store supplies identity bindings.

For a separately authorized bounded research admission (not a daily CSV), the same
CLI supports `--operation admit --manifest PRIVATE-permission-paths.json --backup
PRIVATE-backup-receipt.json`, alongside stage, knowledge, explicit URI and a new
prepared output path. It uses the verified checkpoint and scoped pending writer;
it never approves facts. The generic `catalogue:knowledge import --provider jvmg`
command deliberately rejects before any writes so it cannot bypass backup or
identity-preservation gates. Daily CSVs use daily:integrate, which includes all
required work automatically; no separate admission command is needed for them.

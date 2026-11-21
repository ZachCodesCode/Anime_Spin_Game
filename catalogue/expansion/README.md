# Generalized offline character expansion — Phase 5I

These modules compose the existing catalogue, traits, eligibility, novelty and Phase 5B-3
review contracts. They do not import into gameplay or publish banks. No new dependency,
importer or UI. Private datasets stay in catalogue/private and catalogue/** is Vercel-excluded.

## Question inventory and controlled identity admission

```
node catalogue/expansion/cli.js inventory catalogue/private/my-batch/questions.json
node catalogue/expansion/cli.js stage /absolute/path/provider-packet.json catalogue/private/my-batch/admission.json
```

Outputs refuse overwrite and public destinations. `stage` reads an individually obtained
snapshot; it does not call APIs. Provider packet fields:

- provider: Tenrai; retrievedAt: ISO timestamp; sourceUrl: documented character query/detail URL
- expectedMalId / expectedName: exact intended provider identity
- character: raw provider data object with mal_id, name, nicknames, name_kanji
- animeIds: explicit selected MAL anime IDs (never all franchise appearances implicitly)
- animeAssociations: provider /characters/{id}/anime data rows
- associationSourceUrl: exact documented provider association endpoint
- publicationRights: unresolved by default; never infer permission from public API access

`admission.inspect` returns needs_review, source/catalogue hashes, normalized canonical
proposal, selected appearances, duplicate/collision warnings and immutable source packet.
Snapshots are a **trusted evidence-input boundary**: matching URL/name/ID is consistency,
not cryptographic proof that a document came from the provider. Retain raw responses and
access records; an actual maintainer must inspect them. Do not label independently
invented data Tenrai. Source-only identities without MAL require a separately reviewed
schema namespace; current integrity rules are not weakened.

Missing anime is an explicit hold, not automatic admission. A future small anime admission
must separately verify provider anime identity/metadata and obtain authorization; this
phase deliberately implements no automatic anime writer. Same-name/romanization collisions
are held; aliases never cause ID merges. Existing identities retain canonical names.

For an actual admission decision, a trusted operator may call `admission.plan(proposal,
catalogue, action, configuredMaintainers)` with reviewer, reason, confirmed=true,
status=verified/rejected and at timestamp. The configured roster, stale hashes, warnings,
and audit history are checked. This is the same local trusted-operator authorization
model as the existing reviewer tool, not hosted authentication. The caller must load
actual roster configuration, not fabricate identities. A single admission decision is
recorded; revisions/reopening need an explicit separate plan and historical preservation.

`admission.preview` accepts a decided plan and returns a validated **in-memory catalogue
preview**, publicationHold and notPublishable=true. It never writes canonical files.
No apply CLI exists. A separately authorized canonical write/review must retain the
admission record and compare hashes/revisions immediately before writing. This boundary
avoids accidentally treating a pending identity or rights state as admitted public data.
Do not mistake a programmatically constructed local audit hash for a signed external log.

## Traits and question eligibility

The existing 18 definitions remain authoritative; no definition was changed. Hair colours,
accessories, species, professions, elemental powers, membership and companion relationships
already support the pilot. Healing profession is not automatically healing ability.
Do not duplicate roles as new abilities without a real prompt and evidence need.

`questions.inventory` extends the existing catalogue/coverage.js inventory and maps all 109 prompts, preserves all 34 active policies exactly, and
marks non-character, finite/specialized and franchise-scoped cases. Inactive franchise
mappings are explicitly **draft planning relationships**: many require exact compound
membership, exclusions or period rules and cannot be executed as generic approvals.
Membership open values require a reviewed vocabulary; no fuzzy affiliation inference.
Pokemon starters are finite specialized records, not a route toward 150 character answers.

`questions.evaluate` checks exact trait/value relevance, adaptation/persistence and form
holds, preserves include/exclude guidance, and always returns eligible=false until an
actual question-specific decision is recorded in the existing workflow. Catlike humans,
temporary hair dye, one-off disguises and police ranks are not inferred into eligibility.
Anthropomorphism/nonhuman exceptions stay subject to the exact policy, not a universal
boolean rule. Unknown is not false. Existing active rule mappings use OR relevance checks;
franchise AND/OR conditions must be explicitly implemented/reviewed before routing there.

`associations.route` reuses the original verification pipeline, trait schemas and history
validation. It rejects missing identities and unsupported question mappings. One character
can have multiple separate traits; one trait can have multiple question records sharing
its claim ID. Fact verification and per-question eligibility remain separate decisions.
Repeated evidence is idempotent; prior reviewed/rejected states require explicit reopening.

`associations.knowledge` projects the existing state into canonical name/alias, adaptation,
trait, evidence, question, fact status, revision/history, eligibility and publication gates.
It is not a second ledger or approval model. Rights, rarity and release authorization
are conservatively unresolved/false in this read-only planning projection. They must be
explicitly recorded in a later reviewed release process, never inferred from verified.

## Pilot and existing UI

The private Phase 5I directory contains backups keyed by state hash before assembly,
all-question inventory, eight generalized identity-admission proposals, a 24-association
multi-category pilot, 34-question potential report and a copied existing review overlay.
Run `node catalogue/private/phase5i/serve.js` for the existing UI on loopback 8099. It reuses
the original actual maintainer roster/session token; default roster is empty/read-only.
Existing catalogue identities are reviewable; two pilot detective identities remain
admission-blocked and are documentary packets until authorized admission.

Do not rerun the one-time pilot assembly over decisions. It uses exclusive-create output
files. Backups preserve all older overlays; no canonical data or old private state is changed.
Actual reviewer decisions must be reconciled by expected revisions, not wholesale overwrite.

## Limits and scaling

Canonical 5,831-character indexing is fast. The current offline JSON ledger validates the
whole state and ingestion can scan/revalidate for each proposal; it is not benchmarked for
tens of thousands of multi-trait claims. Existing SQLite ACDB staging remains useful for
source snapshots/indexed matching; do not migrate the working reviewer for this 24-row
pilot. At larger measured volume use indexed projections and server-side pagination,
keeping append-only evidence/decisions and immutable release contracts.

No pipeline/AI/API request is added to answer submission. Gameplay continues using its
current bank. Future approved/rights-cleared/rarity-approved entries require separate
versioned-bank review and release authorization; existing historical versions stay intact.

Licensing: keep Tenrai identities, ACDB-selected claims, Wikidata CC0, official-source
facts and manual answers distinguishable. Independently checking an ACDB-selected fact
does not clear ODbL/DbCL obligations. Public profile access is not wholesale copying
permission. No rights clearance or public answer export is provided by these modules.

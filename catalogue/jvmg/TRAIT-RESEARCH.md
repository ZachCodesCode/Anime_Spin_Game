# Private comprehensive trait research

This is an offline projection into `research_*` tables in the **existing RDF staging
SQLite**, not an admission into the authorized character knowledge store. It never
modifies live definitions, accepted answers, rarity, source trust, reviews, scheduling
or public exports. All JVMG source permissions and factual/adaptation holds remain.
No network, AI calls, new catalogue database or new review interface are involved.

## Build from the existing checkpoints

```sh
python3 -B catalogue/jvmg/trait_research.py build \
  --stage catalogue/private/phase6/rdf-stage/staging.sqlite \
  --inventory catalogue/private/phase6/final-full-trait-inventory.json \
  --knowledge catalogue/private/phase6/checkpoint-resume-2026-11-24/knowledge.sqlite \
  --positive catalogue/private/phase6/current-positive-triples.jsonl.gz \
  --output catalogue/private/phase6/NEW-RESEARCH-BUILD
```

Use `python` on Windows, or the configured Python 3.12 interpreter. No RDF is reparsed.
All inputs must already exist; staging/output/inventory stay under this checkout's
ignored private boundary. The knowledge snapshot is opened read-only. The operation
uses the existing staging writer lock and an atomic derived-build transaction; a
failure rolls back its new derived rows without changing source triples or previous
builds. Keep at least 5 GiB free to start; the 2 GiB floor stops safely. Do not delete
SQLite WAL/SHM files. Do not run an RDF staging writer simultaneously.

The build ID pins source graphs, inventory, editorial mapping code, engine, existing
identity snapshot, positive-triple census and proposed schema. Completed builds are
immutable snapshots; exact retries do not duplicate rows. Different policies produce
new versions and retain earlier research history. New output directories are required
for different build content. The private summary and definitions files are also
immutable. If writing an output fails after DB commit, rerun the identical operation
with unchanged code/inputs to materialize the completed snapshot.

`trait_mapping.py` reads **every individual native definition**: provider label/name,
aliases, applicability flags, source group, ancestry and source status. It generates
a per-definition decision and a rationale, not a source-authorized or verified fact.
Most source definitions have only labels/hierarchy, with no explanatory prose. Such
ambiguities are explicitly retained. Automated semantic rules are not claimed to be
individual independent human fact-checking. No confidence score grants verification.

The two proposed schema additions cover explicit activities and organizational role
types whose actual organization is unknown. They are private proposal definitions;
the active vocabulary remains unchanged. Fine-grained controlled-value proposals
are likewise private, validated against the existing/proposed vocabulary and kept
separate from schema activation. Existing umbrella traits are reused where suitable.
Source aliases and spelling normalizations preserve the original terms in provenance.

Actual RDF edges are read from the current completed graphs, preserving source
subject, predicate, object, graph checksum and ordinal. Counts must match every
source definition's inventory associations before a complete build is issued.
Sensitive/subjective/category-only definitions still retain their original evidence
edges; default research queries exclude them. Unknown native definitions remain
searchable for investigation without being classified as objective answer concepts.

Stable provider bindings supply canonical identities. Names are search terms only,
never merge keys; unrelated equal names remain separate. Unresolved source identities
are research records, not newly confirmed anime characters. Existing anime links are
identity context, not proof that a VN trait applies in an anime adaptation. Raw work
links retain their source graph and unknown media eligibility, including quarantined
publisher limitations.

Canonical character/trait/value proposal triples are deduplicated; every source/form
edge is retained. An existing equivalent flag means that the same triple occurs in
the current positive census; it does not resolve potentially different adaptation,
form, temporal or source context. Existing facts are never rewritten or removed.

## Search the held research build

Use the exact `buildId` from its private summary. Write an ignored JSON query, e.g.:

```json
{"all":[{"trait":"appearance.hairstyle","value":"twin_tails"},{"tag":"school uniform"}]}
```

```sh
python3 -B catalogue/jvmg/trait_research.py query \
  --stage catalogue/private/phase6/rdf-stage/staging.sqlite \
  --build BUILD_ID --spec catalogue/private/research-query.json \
  --limit 20 --output catalogue/private/NEW-query-result.json
```

Each positive condition can select `trait` plus `value`, native `tag` URI/label,
`category`, `synonym` or `related` concept. Synonym lookup uses documented native
aliases and proposed editorial canonical concepts; it does **not** claim any have
been maintainer-approved. Related lookup additionally follows documented source
ancestry. A source hierarchy relation is not a newly verified parent trait assertion.
No fictional reviewer, synonym approval or source permission is fabricated.

Top-level `character` accepts a source URI, canonical/native stable ID or exact
Unicode-preserving name/alias, retaining collisions. `anime` accepts an exact
associated title or namespaced existing ID (e.g. `acdb-anime-123`, `mal-anime-123`).
These filters use existing identity links, not inferred traits from franchise names.
Multiple conditions intersect the **same native source character record**, never
combine different source identities/forms merely because they share a canonical ID.
Even one source record may contain different outfits/routes/periods, so results
explicitly say co-occurrence and trait adaptation are unknown. Set
`"requireKnownContext":true` to require confirmed adaptation context; current raw
JVMG edges have none, so that strict query correctly returns no confirmed results.

Results include canonical/native IDs, original labels, mapping/schema status,
associated anime, raw work links, exact source evidence and factual/permission holds.
They are research candidates, not answers. `authorizedAnswers` is always zero.
Only private output paths are accepted. Existing trusted generators and public
exporters do not read these staging tables. No command in this module grants
source trust, approves facts, publishes a bank or activates the proposed schema.

## Coverage interpretation

Per-definition coverage separates raw source characters, secure canonical matches,
unresolved source identities, existing anime-identity leads, rights-held assertions
and zero currently authorized answers. Canonical-value counts are deduplicated across
source labels; do not sum them as unique people. Potential 100/250/500/1,000 pools
are research volume, not vetted, licensed answer pools. Native contexts, hybrids,
former occupations, roles versus costumes and actor versus patient events remain
explicitly distinct. Repeat source/adaptation/factual review through the existing
maintainer workflow before any future admission or question-bank publication.

## Mapping revisions without repeating source extraction

When only mapping decisions change, add `--reuse-source-build PREVIOUS_BUILD_ID`
to `build`. This reuses the completed build's raw character/name/anime/work
projection and source evidence edges, then reevaluates **every** association and
rebuilds deduplicated proposal claims with the current mappings. It does not reuse
old canonical trait assignments. The archive, inventory, source graph checksums and
existing identity snapshot must match, and every cached canonical binding is
checked again. Only use this option when raw metadata projection/normalization rules
are unchanged. A new build/version is created; earlier research remains intact.
The same source-count and permission/factual holds apply. This is not knowledge
admission or approval, and it never reparses RDF or modifies the source graph tables.

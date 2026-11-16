# Phase 5B-1: offline evidence and answer preparation

This tooling does not import into gameplay. It never assigns rarity, publishes
answer lists, approves suggestions or changes the original catalogue/claim ledger.

## Source and publication boundary

Wikidata structured entities are [CC0](https://www.wikidata.org/wiki/Wikidata:Licensing).
[P4085](https://www.wikidata.org/wiki/Property:P4085) links MAL character identities.
The collector retains entity revisions, statement IDs, qualifiers, rank, reference
snaks and the exact query. A bounded query capped at 5,000 rows is **not exhaustive**;
its returned order can bias coverage. Only known exact property/value mappings
produce candidates; generic descriptions, names and nearby colour labels do not.
MAL links may be wrong: duplicate/ambiguous entity links are quarantined, not merged.

The inherited Tenrai catalogue and its derived alias/answer exports do not have
established blanket redistribution rights. They were already committed as Phase 5A
before this task; this task neither removes published history nor claims it can
make past commits private. No commit/push is performed. New joined artifacts live
in ignored `catalogue/private/phase5b1/`. `.vercelignore` excludes **all catalogue/**
from future static/function uploads because this is offline data. That does not
remove previously deployed or published copies. Resolve those publication decisions
with the owner before any future push/deployment. Do not force-add private exports.

Official merchandise/distributor evidence supports the inherited pilot but is not
a freely redistributable bulk dataset. Only URLs and brief original paraphrases
are retained. No images or biographies are collected. Tenrai's structured identity
fields can support names, not these traits; anime genre tags are never propagated
to character traits. AniList bulk collection remains excluded under its terms.

## Repeatable collection and review preparation

```sh
# Explicit network step; bounded, sequential, >1 second between requests:
node catalogue/enrichment/wikidata.js
# Offline generation / regeneration:
node catalogue/enrichment/report.js
npm test
```

The collector writes a local snapshot of matched entities. Preserve that snapshot
for reproducibility. A fresh fetch may change evidence revisions: generate a new
review batch rather than replacing a batch already under review. The candidate
importer rejects changed initial claims with the same ID instead of overwriting
history. Unknown snaks, deprecated statements and unsupported mappings are omitted.

`report.js` produces:
- `bundle.json`: source permission/provenance plus proposed claims.
- `associations.json`: private Phase 3-format ledger with the five original claims
  copied intact and new needs_review records appended. Original ledger is untouched.
- `aliases.json`: local alias proposals, collision flags and provenance.
- `answer-candidates.json` / `REVIEW.md`: question, character, anime appearances,
  evidence, status, current answer matches and eligibility concerns; new leads first.
- `summary.json`: counts by question/anime and evidence/alias limitations.

The report uses the unchanged answer matcher only for offline comparison. A match
shows a spelling is already accepted, **not proof of canonical identity**. No-match
means a potential new answer, not guaranteed novelty; missing aliases can hide
existing acceptance. Claim/answer-row counts must not be presented as new verified
characters. A character may have multiple claims or appear in several anime.

## Evidence limits and review workflow

Community statements, including those with references, are only suggestions.
A reference block may be weak, circular or identity-only. A missing reference is
explicitly counted; do not approve it without stronger evidence. The model keeps
anime context null and persistence unknown until a maintainer supplies evidence.
No unqualified manga/game claim is silently converted into an anime fact.

`eligibility.json` covers 24 active character questions and 10 separate non-character
questions. Rules are draft maintainer guidance. `assess()` deliberately never
returns automatic eligibility, even for a verified trait. See
[existing-claim review](EXISTING-CLAIM-REVIEW.md) for the five inherited recommendations.

For an explicit authorized maintainer decision, use the Phase 3 review JSON format
(operationId, claimId, expectedRevision, status, reviewer, note, full claim):

```sh
node catalogue/enrichment/review.js /absolute/path/authorized-decision.json
node catalogue/enrichment/report.js
```

This writes only the private ledger under a lock. Revision checks, required context,
review history and idempotent operation IDs come from the existing model. The
collector/report do not call this command. Rejected claims remain rejected after
regeneration. Report writes are serialized under the same lock and individually
atomic; rerun after an interruption to regenerate derivative exports.

Aliases are proposals only. Reversed comma names are deterministic transformations,
not documented nicknames. Japanese/English labels and source aliases are attributed
to Wikidata or inherited identities. Alternate romanizations/recognized identities
are included only if source-listed; no spellings or nicknames are invented. Unicode,
punctuation and accent normalization is used to surface collisions, not merge IDs.
Review collisions, honorifics, personal-name order, and different-person aliases
before any canonical enrichment. No aliases are added to the live name validator.

## Limits for Phase 5B-2

Prioritize source verification of potential new candidates, especially those with
no independent references and underrepresented anime. This pilot has no newly
collected glasses, mask, cat, fire/lightning, vampire, eyepatch or companion claims;
that is an evidence gap, not proof those traits are absent. Do not fill it by
inferring from pictures, names, animal species alone or anime genre tags.
Build source-reviewed batches for those categories; resolve temporary forms,
adaptations and alias collisions; record authorized decisions; only then consider
separate answer-list drafting and scoring work. No such integration occurs here.

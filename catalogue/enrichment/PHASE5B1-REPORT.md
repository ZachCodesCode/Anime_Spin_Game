# Phase 5B-1 completion report

Implemented locally on `feature/anime-character-database`; Phase 5A was already
committed as `88c33f5` when this task began. No uncommitted Phase 5A files existed.
This phase does not commit, push, merge, deploy, approve claims, or publish answers.

## Results

| Measure | Count |
|---|---:|
| New trait candidate associations | 75 |
| Distinct characters in the new batch | 71 |
| Anime appearance buckets represented | 37 |
| Prior claims preserved | 5 |
| Total claims in the private review ledger | 80 |
| Verified by authorized review | 0 |
| Awaiting review | 80 |
| New-batch rows already matching a current accepted answer | 37 |
| Potential new answer rows | 38 |
| Alias proposals | 2982 |
| Alias proposals with collisions | 25 |
| Aliases added to canonical/live data | 0 |

“Potential new” means no match using the unchanged current validator with the
available names. It is not proof of a new canonical identity or eligibility;
missing aliases can hide duplicates. Current matches also need identity review.
No rarity scores or Limit Break designations were generated.

## Question breakdown (new batch)

| Active question category | Candidates |
|---|---:|
| mix-blonde | 12 |
| mix-green-hair | 6 |
| mix-healers | 2 |
| mix-mentors | 6 |
| mix-pink-hair | 11 |
| mix-red-hair | 9 |
| mix-white-hair | 7 |
| wide-detectives | 8 |
| wide-ninjas | 2 |
| wide-robots | 6 |
| wide-shinigami | 6 |

The pilot covers 11 active character-question categories. The remaining character
categories have no newly collected evidence in this batch, including glasses,
masks, cats, fire/lightning, vampires, eyepatches and companions. The inherited
claims still cover glasses/detectives/cats. This is a reported evidence gap, not
an inference that missing traits do not exist. The 10 non-character questions
remain separate and receive no character-derived answers.

## Anime breakdown

Counts below use existing catalogue appearances and can overlap. They do **not**
prove the Wikidata statement holds in every listed adaptation. Each claim keeps
adaptation unresolved until reviewed. Per-anime sampling caps prevent major casts
from dominating; One Piece and Naruto each contribute four associations.

| Anime | Associations with a catalogue appearance |
|---|---:|
| Angel Beats! | 1 |
| Aria the Animation | 3 |
| Azumanga Daiou The Animation | 2 |
| Bleach | 4 |
| Boku no Hero Academia | 4 |
| Cardcaptor Sakura | 1 |
| Clannad | 1 |
| Code Geass: Hangyaku no Lelouch | 4 |
| Cowboy Bebop | 3 |
| Cowboy Bebop: Tengoku no Tobira | 2 |
| Death Note | 4 |
| FLCL | 1 |
| Higurashi no Naku Koro ni | 2 |
| Higurashi no Naku Koro ni Rei | 2 |
| Kenpuu Denki Berserk | 1 |
| Koukaku Kidoutai | 4 |
| Koukaku Kidoutai: Stand Alone Complex | 4 |
| Mahou Shoujo Madoka☆Magica | 3 |
| Meitantei Conan | 4 |
| Monster | 2 |
| Naruto | 4 |
| One Piece | 4 |
| One Punch Man | 1 |
| Ookami to Koushinryou | 1 |
| Re:Zero kara Hajimeru Isekai Seikatsu | 3 |
| Rurouni Kenshin: Meiji Kenkaku Romantan | 3 |
| Rurouni Kenshin: Meiji Kenkaku Romantan - Tsuioku-hen | 1 |
| Shakugan no Shana | 1 |
| Shingeki no Kyojin | 1 |
| Shingeki no Kyojin: The Final Season | 1 |
| Shinseiki Evangelion | 2 |
| Shoujo Kakumei Utena | 1 |
| Soul Eater | 2 |
| Sousou no Frieren | 4 |
| Tengen Toppa Gurren Lagann | 1 |
| Toaru Kagaku no Railgun | 1 |
| Yuu☆Yuu☆Hakusho | 2 |

Examples beyond the largest franchises include Aria, Utena, Azumanga Daiou,
Spice and Wolf, FLCL, Monster and Ghost in the Shell. This is not a representative
sample of all anime; Wikidata coverage and the query cap bias availability.

## Evidence quality and verification

The bounded query returned 5,000 rows and was flagged as truncated. 175 matched
entities were retrieved; 130 mapped statements were eligible for sampling before
per-anime caps. 75 were retained with exact statement IDs, entity revisions,
qualifiers and reference blocks. Ambiguous identity links were skipped.

Only 16 selected claims have reference blocks; 59 have none. Even a reference block
may be circular, weak or about identity rather than the trait. Community statements
are evidence-backed *suggestions*, not verified facts. Stronger official/adaptation
sources are required before approving unsupported claims. No AI inference was used
to fill absent traits, map nearby colours, or convert genre tags into character facts.

[Existing-claim recommendations](EXISTING-CLAIM-REVIEW.md) assess all five prior
claims without modifying them. Jiji and Conan have strong direct source wording;
Kyoya needs recurring-anime confirmation, Richard needs stronger episode evidence,
and Kei’s sports eyewear requires a precise spectacles-versus-goggles decision.

## Alias enrichment

- 2,206 reversed-name-order proposals: deterministic transformations, not nicknames.
- 315 Japanese-name proposals from existing identity metadata.
- 277 source-listed aliases and 184 source-label proposals from Wikidata.
- 25 proposals collide with another character’s canonical or proposed name.

Names remain attached to stable MAL IDs. No cross-character merging occurs.
Recognized identities, romanizations and nicknames are used only when source-listed;
all remain reviewable. Existing aliases and identities are unchanged. Unicode and
punctuation normalization is only for collision/match detection.

## Eligibility and maintainers’ review

`eligibility.json` supplies draft guidance for all 24 active character prompts and
separates the 10 title/studio/genre/episode questions. It defines inclusion,
exclusion and required adaptation/temporal context, including temporary eyewear,
cat transformations, humanoid forms, amateur investigators and cyborg boundaries.
Trait verification never yields automatic question eligibility.

The private `REVIEW.md` and `answer-candidates.json` show current curated counts,
characters/anime, sources, review status, existing answer matches, collisions and
eligibility concerns, with potential new answers first. The private ledger is
compatible with the existing revisioned trait model. Explicit maintainer decisions
are applied through `review.js`; enrichment never invokes approval. Rejected claims
and original history survive regeneration. Snapshot changes require a new batch
or explicit reviewed correction, not silent replacement.

## Privacy and licensing

[Wikidata structured data is CC0](https://www.wikidata.org/wiki/Wikidata:Licensing),
and [P4085](https://www.wikidata.org/wiki/Property:P4085) supplies the MAL link.
That does not license joined Tenrai metadata or copyrighted evidence pages.
Tenrai redistribution rights for the expanded catalogue remain unresolved.

New evidence caches, joined review reports, aliases and the 80-claim ledger are
stored only under ignored `catalogue/private/phase5b1/`. `.vercelignore` excludes
all offline `catalogue/**` files from future Vercel uploads. No images, biographies
or bulk copyrighted descriptions were collected. No publication occurred.

Phase 5A data was already committed before this task. Ignore rules cannot remove
past Git history or existing remote/deployed copies. The owner must decide how to
handle that prior publication risk before a later push/deployment. This phase does
not rewrite history or claim that existing copies have become private.

## Validation

68 tests pass (58 existing plus 10 focused enrichment tests), including provenance,
invalid/missing sources, alias collisions, duplicate claims, context-dependent forms,
review transitions, rejected-state preservation, idempotency and eligibility rules.
The lowercase Wikidata statement-ID form has explicit regression coverage.
Build, identity/trait/metadata validation and release integrity checks pass.
Private-ledger validation and repeat-generation checks pass. Original character
records, aliases, five-claim ledger, review history, questions, gameplay, scoring,
API validation, Daily assignments and leaderboards are unchanged.

## Phase 5B-2 recommendations

1. Verify the 38 potential new answer rows against independent anime-specific
   sources; prioritize those with no references and less-covered anime.
2. Resolve glasses/sports-eyewear and temporary/form-specific policy decisions,
   then gather source-backed batches for categories absent from this pilot.
3. Confirm MAL-to-Wikidata identity links and resolve the 25 alias collisions;
   do not treat an existing name match as proof of the same character.
4. Record authorized trait reviews and separate question-eligibility decisions.
5. Resolve publication permissions and prior catalogue exposure before publishing
   joined exports. Keep live answers and rarity assignments unchanged until a
   separate reviewed integration phase.

## Files

New tooling: `wikidata.js`, `aliases.js`, `eligibility.js`, `eligibility.json`,
`report.js`, `review.js`, source/workflow documentation and this report, all under
`catalogue/enrichment/`. Tests: `catalogue/tests/enrichment.test.js`. Privacy:
`.gitignore` and `.vercelignore`. Joined data/review artifacts remain local in
`catalogue/private/phase5b1/`. No existing catalogue records were edited.

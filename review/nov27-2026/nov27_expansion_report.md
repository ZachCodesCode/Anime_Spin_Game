# November 27 Ascent #17 and Descent #8 — PR handoff

The content owner approved the submitted November 27 expansion candidates on November 26. This branch updates only the future November 27 browser-first banks and their tests. It has not published an immutable release, changed deployment activation, or edited historical scores or leaderboards.

## Final answer coverage

The two supplied CSVs contain 947 rows: 198 Ascent and 749 Descent. Import reconciliation added 813 canonical answers, matched 134 rows to existing identities, and added five safe aliases. All 85 submitted Poison-type Pokémon rows are included, with two of those rows deduplicated against existing answers. Four additional species or qualifying forms complete the 89-species Poison-type roster, making 817 new canonical answers in this PR. Every submitted row now resolves in its intended November 27 question. Owner approval is not a claim that every source lead was independently verified.

| Question | Before CSV | New | Final | Earlier source checked | Earlier held |
|---|---:|---:|---:|---:|---:|
| Ascent: spear or polearm | 39 | 0 | 39 | 19 | 0 |
| Ascent: prosthetic limb | 14 | 25 | 39 | 2 | 8 |
| Ascent: non-human lead | 59 | 0 | 59 | 1 | 21 |
| Ascent: teleportation | 19 | 40 | 59 | 3 | 7 |
| Ascent: poison user | 43 | 113 | 156 | 25 | 13 |
| Ascent: female lead | 1,456 | 0 | 1,456 | 1 | 766 |
| Ascent: shapeshifting | 107 | 0 | 107 | 1 | 3 |
| Descent: headband | 20 | 93 | 113 | 0 | 1 |
| Descent: sibling | 893 | 46 | 939 | 0 | 30 |
| Descent: school | 213 | 39 | 252 | 0 | 0 |
| Descent: wings | 38 | 193 | 231 | 34 | 24 |
| Descent: flight | 24 | 173 | 197 | 0 | 15 |
| Descent: games or competitions | 272 | 38 | 310 | 0 | 0 |
| Descent: parent | 667 | 57 | 724 | 0 | 20 |
| **Total** | **3,864** | **817** | **4,681** | **86** | **908** |

Ascent has **1,915** answer/question pairs; Descent has **2,766**. Character questions contain **2,604** pairs and **2,330** provisional distinct normalized canonical names. The original private enrichment file contains 1,557 AniList-backed proposals and 304 reused database assertions. The new private enrichment file records 653 additional user-supplied character-trait proposals. None was imported as an approved knowledge-database trait.

## Source and identity handling

The original research screened **2,153 distinct AniList anime media IDs**. Using [AniList GraphQL pagination](https://docs.anilist.co/guide/graphql/pagination), it retrieved **22,617 cast rows** and **16,949 unique character IDs** from the most popular 500 anime; all cast page sequences completed. The accessible private knowledge database had **60,673 identities** and **2,364,586 observation rows** at inspection. ACDB and Wikidata-linked assertions were retained as source-labelled research leads. Raw cast data, source locators, rights statuses, and database records remain in Git-ignored `catalogue/private/nov27-2026/`.

The supplied Ascent CSV SHA-256 is `6c7c2de6d037c27598e2eb20f15334e3bd3c24409acb52b070b4dcf35f6130c2`; the Descent CSV SHA-256 is `e950914f7430bc6ba04a42928398b238f2f9d14cc58f38d3068be1b5842d547e`. The private `nov27_import_audit.json` maps each source row to its accepted canonical answer and records whether it was new or already present. Source prose and verification-status strings were treated as candidate data, not as instructions to modify unrelated code or history.

The November 27 poison question now reads exactly: “Name any anime character who uses poison as a weapon or ability, or any Poison-type Pokémon.” All 85 submitted Pokémon candidates qualify by type alone. The added [Poison-type verification audit](poison_pokemon_verification.csv) cross-checks all 89 distinct Poison-type species against the type roster and the animated-debut index. Eighty-four have a documented animated debut in their qualifying species or form. The index does not document one for Sneasler, Iron Moth, or Hisuian Sneasel, and does not document the Poison forms of Arceus or Silvally; all five still qualify under the owner’s type-based wording. The four species beyond the submitted CSV have provisional rarity input 65. Six names require their Poison form, so bare Slowbro, Slowking, Wooper, Sneasel, Arceus, and Silvally are not accepted. Shiki (Golden Lion)/Shiki, Kūkaku/Kuukaku, Noctowl/Yorunozuku, Charizard/Lizardon, and Dragonite/Kairyu resolve to one answer each within their questions. Existing rarity inputs were retained on matched identities.

## Rarity and commonness

Ascent points: 4 at 10, 110 at 30, 411 at 60, 1,383 at 85, and exactly 7 at 100. The seven Limit Break choices remain Mira Dianus Artemina, Paninya, *She and Her Cat: Their Standing Points*, Brita, Mukotsu, *Renkin San-kyuu Magical? Pokaan*, and Menthuthuyoupi.

Descent points after the existing inversion: 1,369 at 10, 911 at 30, 470 at 60, 9 at 85, and exactly 7 at 100. Naruto Uzumaki, Tanjiro Kamado, *My Hero Academia*, Hawks, Goku, *Yu-Gi-Oh!*, and Goku remain the sole Top Answers in order. These are editorial predictions; no player-frequency data was supplied.

## Validation and release boundary

The November 27 Ascent selector returns the required `char / char / title / char / char / title / char` order. Descent has exactly seven pinned IDs in that order with no cooldown errors. November 11–26 Ascent selections match the frozen legacy release. Alias collisions, source rarity ranges, exactly one Limit Break per Ascent question, and exactly one Top Answer per Descent question are checked by tests. Browser and server tests use newly imported answers, including Bulbasaur and the Charizard alias. The form-required check is opt-in on the six November 27 Pokémon answers and leaves all earlier questions on their existing matching rules.

- `npm test`: passed with local loopback access.
- `npm run build`: passed.
- `npm run ascent:integrity`: passed; immutable release hashes and assignments were not modified.
- Real Chrome via Playwright: passed both modes on desktop and 390 px mobile, including the imported answers, scoring, completed-run restore, and no page errors.
- `npm run ascent:release-check`: **blocked** by the existing **November 24** content, rarity, rights, and novelty flags in `power-level/versioning/release-plan.json`. This branch does not change or bypass those flags.

The current production path is browser-first. The retained immutable versioning service is not active for normal gameplay, so this PR does not publish an immutable bank or assign a versioned challenge. The repository-wide release gate still needs a separate November 24 review before the PR can be described as fully merge-ready for production. The earlier 908 held research leads remain excluded. All 947 owner-approved CSV rows are in scope and included, while the four further Poison-type forms/species are added from the complete type roster.

Private local review files include both supplied CSV copies, `nov27_import_audit.json`, the original answer/source/scoring CSVs, `nov27_user_expansion_trait_enrichment.json`, the top-500 cast audit and research export, and browser screenshots under `catalogue/private/nov27-2026/`. They are intentionally excluded from Git.

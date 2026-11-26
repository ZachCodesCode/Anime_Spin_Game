# November 27, 2026 Ascent #17 and Descent #8 — development review

This branch adds seven date-gated questions to each development bank. It has **not** published an immutable release, changed deployment activation, or altered completed scores or leaderboards. The answer banks are development candidates. The private evidence and CSVs are in `catalogue/private/nov27-2026/`, which Git ignores.

## Coverage

There were no pre-existing answers for these 14 new question IDs. “Individually checked” means a specific profile or second source was read for that candidate; it does **not** mean final editorial or rights approval. Held counts include duplicate forms and trait mismatches.

| Question | Initial | New | Total | Individually checked | Held | Approval |
|---|---:|---:|---:|---:|---:|---|
| Ascent: spear, lance, polearm | 0 | 39 | 39 | 19 | 0 | Pending |
| Ascent: prosthetic limb | 0 | 14 | 14 | 2 | 8 | Pending |
| Ascent: non-human main protagonist | 0 | 59 | 59 | 1 | 21 | Pending |
| Ascent: teleportation | 0 | 19 | 19 | 3 | 7 | Pending |
| Ascent: poison user | 0 | 43 | 43 | 25 | 13 | Pending |
| Ascent: female main protagonist | 0 | 1,456 | 1,456 | 1 | 766 | Pending |
| Ascent: shapeshifting | 0 | 107 | 107 | 1 | 3 | Pending |
| Descent: headband | 0 | 20 | 20 | 0 | 1 | Pending |
| Descent: sibling | 0 | 893 | 893 | 0 | 30 | Pending |
| Descent: school setting | 0 | 213 | 213 | 0 | 0 | Pending |
| Descent: wings | 0 | 38 | 38 | 34 | 24 | Pending |
| Descent: flight | 0 | 24 | 24 | 0 | 15 | Pending |
| Descent: games or competitions | 0 | 272 | 272 | 0 | 0 | Pending |
| Descent: parent | 0 | 667 | 667 | 0 | 20 | Pending |
| **Total** | **0** | **3,864** | **3,864** | **86** | **908** | **Pending** |

Ascent has **1,737** answer/question pairs; Descent has **2,127**. The character questions have **1,771 distinct normalized canonical names** across **1,864 character/question pairs**. This is a provisional identity count: cross-provider names have not all been reconciled to one stable database identity. There are **1,557 new AniList-backed trait suggestions** plus **304 reused database trait or relationship assertions** in the enrichment file. None was imported as an approved trait.

## Research and source handling

- [AniList’s documented GraphQL pagination](https://docs.anilist.co/guide/graphql/pagination) was used to fetch the 500 most popular anime and every available cast page. The saved private export contains **22,617 cast rows** and **16,949 unique AniList character IDs**. All 500 cast page sequences ended with `hasNextPage: false`. The public-safe audit CSV records each media ID, ranking metadata, cast totals, role totals, and pagination completion.
- Eleven additional AniList genre and tag searches extended the screen to **2,153 distinct anime media IDs**. Title candidates use production-specific AniList media IDs, so sequels and remakes remain separate titles. School, game, female-lead, and non-human tags were treated as leads and checked against cast roles and available synopsis text.
- The existing private knowledge database was accessible and contained **60,673 identities** and **2,364,586 observation rows** at inspection. Its held ACDB and other source assertions were used as user-requested research leads, with source URL, locator, license, and review status retained privately. A prior published readback contained 59,645 identities and 325,761 observations. A source assertion alone did not become an approved trait.
- Character descriptions were screened for prompt-specific action. False positives such as a prosthetics mechanic, a poison victim, super-speed described as teleportation, and a winged title rather than wings on the character were held. The review log records **55 trait mismatches** and **853 duplicate or ambiguous forms**. Some other development candidates still need individual verification.
- Sources used include AniList character and media records, the repository’s ACDB/Wikidata-linked knowledge observations, and targeted cross-checks for the seven Ascent Limit Break choices. Each answer CSV records source URL, status, reason, rarity input, calculated points, and aliases. Raw cast profiles and database records remain ignored private files.

## Scoring and identity checks

The Ascent source rarity values produce 4 ten-point, 71 thirty-point, 272 sixty-point, 1,383 eighty-five-point, and 7 hundred-point answers. The seven Limit Break choices are Mira Dianus Artemina, Paninya, *She and Her Cat: Their Standing Points*, Brita, Mukotsu, *Renkin San-kyuu Magical? Pokaan*, and Menthuthuyoupi.

Descent source rarity is inverted by `power-level/descent.js`. The resulting bank has 1,369 ten-point, 491 thirty-point, 251 sixty-point, 9 eighty-five-point, and 7 hundred-point answers. Naruto Uzumaki, Tanjiro Kamado, *My Hero Academia*, Hawks, Goku, *Yu-Gi-Oh!*, and Goku are the sole Top Answers in question order. Tanjiro/Tanjirou and Hawks/Keigo are one identity each within their questions. These Top Answers are editorial predictions; no player-frequency evidence was available.

Canonical names and aliases were checked for normalized collisions within every new question. Digimon evolution was **not** treated as a blanket shapeshifting rule; only documented physical form changes entered the candidate list. Temporary manifested wings count when the character actually has wings in that form. Flight still requires actual powered flight rather than jumping, gliding, or riding another flying creature.

## Integration and validation

`run.select()` returns the seven new Ascent IDs on November 27 in `char / char / title / char / char / title / char` order. Descent’s pinned assignment returns the same kind order with no cooldown errors. The new `since` dates leave November 11–26 Ascent selections unchanged against the frozen legacy release. The immutable release hash and assignment integrity check passed; historical question content and saved run schemas were not changed.

- `npm test`: passed, including the November 27 browser/Node parity and server handler tests.
- `npm run build`: passed.
- `npm run ascent:integrity`: passed.
- `npm run ascent:release-check`: **blocked** by the repository’s existing November 24 content, rarity, rights, and novelty review gate. This branch does not bypass that gate.
- Real Chrome via Playwright: passed all seven questions in Ascent and Descent on desktop and 390 px mobile, including answer entry, score, completed-run restore, and no page errors. The four private screenshots are saved beside the CSVs.

The server handler test submits the November 27 canonical answers to the actual Ascent and Descent handlers using an isolated in-memory test database and a fixed Toronto date. It checks the recorded score. The browser check blocks external API calls, so it does not write a real score or leaderboard row.

## Remaining review before publication

The bank exceeds the combined starting goal, but nine categories remain below their individual targets. The especially small pools are prosthetic limbs, teleportation, headbands, wings, and flight. No filler was added to meet a number. **3,778** included candidates still have a status requiring individual review, and the 908 held leads are excluded. The database facts include source rights holds; use of those facts as requested here does not clear their publication status. Review eligibility, source licensing, aliases across providers, and rarity before any immutable release or deployment. The release-check gate must pass on its own terms.

Private local deliverables: `nov27_ascent_expanded_answers.csv`, `nov27_descent_expanded_answers.csv`, `nov27_character_trait_enrichment.json`, `nov27_source_verification.csv`, `nov27_rarity_scoring.csv`, `nov27_top500_cast_audit.csv`, `nov27_coverage_report.csv`, `nov27_integration_draft.js`, and `research/` under `catalogue/private/nov27-2026/`. They are available for local review and are intentionally excluded from Git.

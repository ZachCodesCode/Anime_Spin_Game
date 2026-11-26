# Anime Ascent November 26 answer expansion — review draft

At the user’s direction, this PR branch integrates all 787 proposed answers into the browser-first bank, including entries that still need factual or rights review. No live deployment has occurred.

## Coverage

| Question | Existing | New draft | Candidate pool | Individually checked | Held | Target |
|---|---:|---:|---:|---:|---:|---:|
| Name any anime character with red eyes. | 136 | 304 | 440 | 8 | 0 | 250 |
| Name any anime character with animal ears. | 82 | 221 | 303 | 1 | 1 | 200 |
| Name any post-apocalyptic anime. | 54 | 68 | 122 | 48 | 0 | 120 |
| Name any anime character with psychic powers. | 62 | 104 | 166 | 85 | 0 | 150 |
| Name any anime delinquent or street gang member. | 78 | 50 | 128 | 17 | 1 | 150 |
| Name any death game or survival game anime. | 36 | 12 | 48 | 11 | 0 | 100 |
| Name any anime character who lost their memory. | 45 | 28 | 73 | 28 | 1 | 150 |

Existing: **493**. New draft candidates: **787**. Candidate pool: **1280**. Individually checked new candidates: **198**. Integrated in PR branch: **787**. Individually checked: **198**. Database-supported or external needs-review: **589**. Live deployed new answers: **0** until merge and deployment.

## Active game baseline

The live `power-level/questions.js` SHA-256 matched the latest `origin/main` checkout when research began. `run.select(bank, "2026-11-26")` returned the seven IDs in the coverage CSV, in the screenshot order. Original rarity values and the seven Limit Break entries were copied without changes. The backend `api/ascent.js` scores canonical answers from the same bank. This branch now adds a guarded `EXPANDED26` block to `power-level/questions.js`; it does not edit scheduling, version assignments, saved runs, score tables, leaderboards, or Anime Descent.

## Research and provenance

The PR #28 private read-back SQLite database was accessible: 59,645 identities and 325,761 observations. A separate 6.0 GB local knowledge database has 60,673 identities, but it contains many historical observation versions. The public v1 export is slightly narrower (1,028 fewer identities) than that larger local database. The reviewed pool uses the read-back SQLite identities, ACDB source locators, and its anime-title relations, without rebuilding the database.

AniList’s documented GraphQL `POPULARITY_DESC` query supplied an actual 200-entry anime ranking; `characters` was paginated to `hasNextPage=false` for each entry. The cast audit records 11265 cast rows and 9092 unique character IDs across those entries. Sequels are separate ranked entries; character identities were deduplicated for answer selection. More obscure title and character leads came from AniList topic tags beyond the top 200. Raw cast descriptions are kept only in private temporary research files.

ACDB-derived rows cite an individual character URL and the precise SQL-export field locator. The official export carries ODbL + DbCL attribution and marks publication authorization false. The user instructed us to use these as proposed answers, so they appear in the review CSV and isolated JavaScript draft. They are **not** described as maintainer-approved or live playable, but the user directed that they be included in the proposed playable bank despite outstanding review. AniList rows link to the specific media or character record and state the actual trait or premise used. A tag alone is retained as a lead, not treated as individual proof.

Sources: [AniList pagination docs](https://docs.anilist.co/guide/graphql/pagination), [AniList media reference](https://docs.anilist.co/reference/object/media), [ACDB official dumps and licence](https://www.animecharactersdatabase.com/databasedumps.php), and PR #28 `catalogue/public-data/v1/manifest.json` / `catalogue/acdb/NOTICE.md`. AniList API rate-limit headers reported 30 requests/minute; retrieval was paced below that limit and retried on 429 without bypass.

## Verification levels

- `source_verified_candidate`: a specific character description or title premise was individually checked against the question. This is still a review candidate, not an approved answer.
- `database_supported_needs_review`: the official ACDB-derived character trait and anime relation were present; anime depiction, form, and licensing still need final review.
- `external_research_needs_review`: AniList title tag plus relevant synopsis or a specific character description supports a proposed answer; human review remains.
- `held_ambiguous` and `rejected`: excluded from the draft additions and listed in the eligibility review.

## Existing Limit Break audit

Priscilla Barielle, Kuon, Yokohama Shopping Log, Kyosuke Hyobu, and The Ones Within have supporting sources. “Hokuto Mitsuya” did not resolve to a clear anime character in exact-name research and needs editorial identity review. Kyoko Okitegami’s memory premise is clear, but the animation found was a promotional video for a novel; the anime-appearance rule needs a decision. These entries and their scores were not changed. The existing Mai Sakurajima animal-ear answer also appears to rely on decorative bunny attire and is flagged separately.

## Remaining review

The seven per-question targets are editorial aspirations. Rows marked needs-review should be checked against anime scenes or official character profiles before publishing. The draft deliberately has no new rarity-100 answer. Source licences and character/title identity matching need review before converting this local draft into a production release. No external assignment or production version pointer was changed. The PR branch includes database-only and other needs-review rows at the user’s direction. A merge will make them playable, so the outstanding factual and source-rights risks are listed in the CSVs and PR description.

# Phase 5A source and permissions review

Reviewed 2026-11-16. Source access is not a blanket license for redistribution.
No images, biographies or bulk third-party text were stored. No scraping adapters
were added. Expanded data stays local for review; publication needs a rights check.

| Source | Data / ID matching | Permission and reliability boundary | Used here |
|---|---|---|---|
| [Tenrai documentation](https://api.tenrai.org/documentation), [OpenAPI](https://api.tenrai.org/documentation/openapi.json), [terms](https://tenrai.org/terms) | MAL IDs, cast names/roles, anime genres/themes, release year and popularity rank. Stable MAL IDs match directly. | Public API currently advertises 120/minute, 4/second. Terms allow application caching/processing but reserve third-party rights and restrict competing APIs/raw redistribution services. Community metadata is not verified trait evidence. | Identity/cast and anime metadata only. OpenAPI 1.0.37 inspected. |
| [Wikidata licensing](https://www.wikidata.org/wiki/Wikidata:Licensing), [developer guidance](https://www.wikidata.org/wiki/Wikidata:For_developers) | Structured identity, occupation, species and references where present. Require a reliable external-ID link or reviewed MAL crosswalk; never merge by a shared name. | Structured entity data is CC0; other namespaces have separate licensing. Sparse or unsourced statements and adaptation ambiguity still require review. | Evaluated, not bulk imported. Optional local adapter can accept permission-reviewed evidence bundles. |
| [AniList API terms](https://docs.anilist.co/guide/terms-of-use) | Character identity/descriptions and media tags; a media tag does not imply a character trait. Character-to-MAL matching would require reviewed crosswalks. | Terms prohibit mass collection/hoarding; commercial use has additional conditions. | Excluded from bulk ingestion. |
| Official producers/distributors and licensed merchandise pages | Explicit factual descriptions can support a particular identity or characteristic. Match a named character and adaptation to an existing MAL record. | Pages are copyrighted, not open bulk datasets. Retain only URLs and short original factual paraphrases. Merchandise proves a depicted accessory, not episode frequency or all adaptations. | Three individually reviewed candidate records; no page/image archives. |

New evidence pages:
- [Good Smile: Kei Tsukishima](https://www.goodsmile.com/en/product/3307/Nendoroid%20Kei%20Tsukishima): lists sports glasses; ordinary-spectacle eligibility and recurrence remain uncertain.
- [TMS: Detective Conan](https://tmsanime.com/detective-conan): describes the high-school detective and his Conan identity; occupational subtype and adaptation context require review.
- [GKIDS: Kiki’s Delivery Service](https://gkids.com/films/kikis-delivery-service/): identifies Jiji as the named cat; maintainer must confirm the linked identity.

Tenrai's inspected character schemas provide identities, nicknames and prose,
not normalized glasses/detective/cat fields. Anime themes are retained only as
anime metadata. They are never copied into character traits. No descriptions
were mined by keyword or AI to create bulk claims. No unknown-license dataset
was downloaded. The optional local adapter cannot itself establish legal rights
or factual correctness: its source review is an audit prerequisite, not approval.

Before public distribution, resolve Tenrai/underlying-source rights for the larger
catalogue and keep offline catalogue files out of production static hosting unless
explicitly approved. The existing project publishes its root directory; no hosting
configuration was changed in this offline-only phase.

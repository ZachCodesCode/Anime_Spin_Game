# Draft request for authorized extended ACDB data access

Unsent template for an actual maintainer to send to the ACDB operator. No permission
or reviewer identity is implied by this document.

We maintain Anime Ascent, an anime quiz with an offline character-research workflow.
The official characters/publishers/assignments SQL dumps lack general character
tags and rich profile relationships. We would like a documented, versioned export
or supported API providing:

- Stable character IDs, canonical names, aliases and Japanese names.
- Anime/title assignments and explicit media types, primary assignment and form links.
- Tag IDs/labels, trait code dictionaries and revision/deletion timestamps.
- Age/period, height/units, birthday, gender, appearance, role and explicit unknowns.
- Occupations, species, powers, equipment, organizations and contextual affiliations.
- Typed character-to-character relationships with stable target IDs and context.
- Source provenance and licence notices for each dataset and contributed field.

We do not need artwork or biographies. We will retain source/version provenance,
keep unreviewed assertions private, and make no live gameplay calls. Please confirm:

1. Authorized download/API mechanism, authentication, documented limits and schema.
2. Permission for local processing and access-controlled transfer between two maintainers.
3. ODbL/DbCL obligations for an enriched research database, derived question banks,
   public answer lists and an interactive commercial/ad-supported quiz.
4. Required attribution, share-alike/source-access obligations and notices; whether
   a separate licence or written permission is available for our proposed outputs.
5. Any restrictions on contributed fields, downstream redistribution or retention.
6. How revisions, deletions and contributor rights concerns should be handled.

We will not scrape profiles or bypass access controls. Until permission and the
actual response schema are established, rich supplied records remain bounded
examples and ACDB-derived records retain publication holds. Independent factual
checking does not by itself resolve derivative-database obligations.

Official references:
- https://www.animecharactersdatabase.com/databasedumps.php
- https://www.animecharactersdatabase.com/sp/api.php
- https://www.animecharactersdatabase.com/tos.php


2026-11-22 access inventory: all three official archives downloaded successfully.
A documented character_id API response was inspected and had basic identity/media,
gender, image references and a generic desc, with no tags, extra-details dictionary
or typed relationships. Please identify the actual supported export tables or API
methods for character-tag vocabulary and assignments, extra profile fields, typed
relationship edges, licensed description text, contexts and revision/deletion feeds.
We have not inferred private endpoint or table names. An API key or dedicated bulk
licence may be appropriate; no credentials or permission have been assumed.

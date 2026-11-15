# Anime Ascent identity catalogue

Phase 2 offline data only. The game and API do not load this directory.

## Run

Node 18+ is required. Run:
```sh
npm run catalogue:import
npm run catalogue:import -- catalogue/pilot.json /tmp/ascent-catalogue
npm run catalogue:validate
npm test
```

The optional arguments are a configuration JSON path and an output directory.
Configuration requires positive MAL anime IDs in `animeIds`. The pilot caps each
cast at 30 entries in provider order. Remove `maxCharactersPerAnime` for full casts.
The selection covers Naruto/One Piece, Monster, Cowboy Bebop, Rurouni Kenshin,
Mushishi, Samurai Champloo, Ouran, Wolf Children, Revolutionary Girl Utena,
K-On!, Hajime no Ippo Haikyu's third season and the Cowboy Bebop film. Caps are sampling choices, not
claims of complete cast coverage or popularity ranking.

## Files and identity

`schema.json` is JSON Schema draft-07. `validate.js` implements the subset used
by this schema and checks identity consistency, unique IDs, and relationship
references. It is not a general-purpose JSON Schema engine.

`data/catalogue.json` has separate anime, characters and appearances collections.
Character IDs are `mal-character-<MAL ID>`; anime IDs are `mal-anime-<MAL ID>`.
Repeated appearances reuse the same character. Names are preserved in provider
order, including family-name-first formatting. Aliases use Unicode NFKC,
case-folding and whitespace normalization for deduplication only. Distinct MAL
IDs are never merged by name. Optional missing Japanese names and roles are null.
Unusable identities go into the review list. There are no inferred traits or scores.
This provider requires MAL IDs; future providers without MAL IDs need an explicit
internal-ID mapping and schema extension.

Each record contains provider, original source URL and import timestamp.
Appearance provenance references the cast endpoint. Relationships resolve anime
titles through the anime collection. Only selected identity fields persist:
biographies, artwork and voice actor data are discarded.

## Resume and refresh

Each character checkpoint atomically replaces the validated JSON file. A rerun
skips completed anime and reuses fetched character identities. Failed requests
leave the anime incomplete so it can be retried. The lock prevents concurrent
writers to one output directory. After a killed process, verify no importer is
running before removing that directory's `.import.lock`.
Use a new output directory for a fresh import or changed sampling configuration.
Completed records are not automatically refreshed. Manual-review items should be
corrected and reimported in a fresh directory. The timestamp means when the
provider record was fetched, not when its underlying facts were verified.

The pilot uses one JSON document for atomic checkpoints. Large imports can be
run in configurable batches; before tens of thousands of records, measure the
cost of whole-document validation/writes and introduce transactional indexed
storage or immutable shards with an atomic manifest. This is a correctness-first
pilot, not a benchmarked large-catalogue storage engine.

## Verified API contract (2026-11-15)

Sources:
- https://api.tenrai.org/documentation
- https://api.tenrai.org/documentation/openapi.json
- https://tenrai.org/terms

OpenAPI 1.0.35 documents:
- GET /v1/anime/{id}: data object with mal_id, title and optional title variants.
- GET /v1/anime/{id}/characters: unpaginated data array of character and role.
- GET /v1/characters/{id}: data object with mal_id, name, name_kanji, nicknames.
These endpoints need no server key. A reusable collection reader also supports
the documented current_page/has_next_page pagination envelope when present.

Public limits are 120 requests/minute and 4/second per IP. Requests run serially
with at least 650 ms between them (under 93/minute). Other traffic on the same IP
can still consume that allowance. 429 and 5xx responses and network failures
retry at most five attempts, honoring both Retry-After seconds and HTTP dates,
with exponential backoff. Each fetch times out after 30 seconds. Permanent HTTP
errors stop the run. API failure counts include every failed request attempt,
including local network failures. The report's duplicate count means additional
appearances of an already imported identity, not identical repeated HTTP rows.

Tenrai is unofficial and beta. Its terms permit storing and transforming API data
for applications, but do not license underlying third-party material. They also
restrict substantially similar APIs, mirrors and raw-data redistribution services
without written permission. Whether public repository redistribution of a much
larger catalogue requires permission remains unresolved. This pilot stays local
for review. Names and minimal metadata reduce copied content but do not establish
a blanket redistribution license. Attribution is appreciated by Tenrai; third-party
rights and obligations still need review before publication.

# Character-tag source access and existing importer contract

## Verified access state — 2026-11-22

The public `api_dumps.php` response says an API key is required. A fresh unauthenticated
request returned HTTP200 text/html containing that message, not a JSON dataset.
This establishes an access gate, not the presence of a character-tag feed behind it.
No scoped key, supported authentication instructions or authorized tag export was
provided or configured. Account registration alone is not established as sufficient.
The API wiki documentation link returned502. Do not guess authentication parameters,
private endpoints or credentials. Request supported access from the ACDB operator.

The public taglist.php page distinguishes character and series vocabularies and
shows aggregate counts. It was inspected as documentation only; neither its HTML
nor character listing pages were harvested into a dataset. A vocabulary/count does
not establish a character-ID/tag-ID edge. The basic documented character API's
previously inspected response supplies no tag assignments. The existing SQL schema
inspection remains valid; no SQL files were downloaded or imported again here.

Official references:
- https://www.animecharactersdatabase.com/api.php
- https://www.animecharactersdatabase.com/api_dumps.php
- https://www.animecharactersdatabase.com/taglist.php
- https://www.animecharactersdatabase.com/databasedumps.php
- https://www.animecharactersdatabase.com/tos.php
- https://www.animecharactersdatabase.com/about.php

[Ready-to-send request](CHARACTER-TAG-ACCESS-REQUEST.md) identifies the actual public
contact and exact missing access. It has not been sent automatically. A usable key
must come with documented scopes and response schemas proving that character-tag
assignments are available; an authorized full export is an equally acceptable route.
Never paste keys into a chat, public PR, source file, URL example or shell history.
No unconfirmed credential-bearing downloader was built.

## Requested source schema

These are proposed interchange names, not claims about ACDB's internal tables:

| Entity | Required fields | Optional/context fields |
|---|---|---|
| Export manifest | provider, revision, timestamp, licence/access reference, full/delta scope | checksums, record counts, deleted-record policy |
| Character-tag vocabulary | tag_id, exact label, entity_type=character | category, aliases, rename/deprecation revision |
| Character-tag assignment | character_id, tag_id | assignment_id, exact label, assigned/updated/deleted timestamps, context/form/outfit |
| Character identity | character_id, name | documented aliases, Japanese name, form/clone links |
| Character-title assignment | character_id, title_id, media_type | title, primary assignment, adaptation context |

A full export should identify characters with no assignments. A delta needs explicit
edge deletion semantics and a completeness/base revision. Until an actual documented
delta contract exists, use complete tag sets per supplied character, not partial
lists masquerading as full snapshots. Keep series tags separate. Unused vocabulary
entries can be retained in the authorized private source sidecar; they are not
character claims. Vocabulary IDs are distinct from tag IDs derived locally from text.

## Existing compatible import path

The existing `acdb-profile` adapter already accepts character-grouped JSON with
explicit tag assignments. The requested export can be delivered in this format or
mapped to it once its actual schema and access are established. No new database,
API crawler or speculative bulk ingestion service is required.

```json
{
  "format":"anime-ascent-character-profiles-v1",
  "sourceProvider":"ACDB",
  "acquisition":"authorized-export",
  "revision":"ACTUAL_EXPORT_REVISION",
  "retrievedAt":"ACTUAL_ISO_DATE",
  "profiles":[{
    "externalId":"ACTUAL_CHARACTER_ID",
    "name":"ACTUAL_CHARACTER_NAME",
    "sourceUrl":"https://www.animecharactersdatabase.com/characters.php?id=ACTUAL_CHARACTER_ID",
    "primaryAnime":{"title":"ACTUAL_ANIME_TITLE","media":"anime"},
    "tags":[{
      "tagId":"ACTUAL_ACDB_TAG_ID",
      "label":"EXACT_ORIGINAL_LABEL",
      "entityType":"character",
      "assignmentId":"ACTUAL_ASSIGNMENT_ID_IF_AVAILABLE",
      "context":{"scope":"ACTUAL_SOURCE_SCOPE","persistence":"unknown"}
    }]
  }]
}
```

This is a placeholder contract, not character evidence. Do not invent IDs, assignment
IDs, source scope or permission. Omit optional IDs when absent. Numeric or string
original tag IDs are retained as `originalTagId`; `rawLabel` remains exact.
`sourceTagId` continues to identify the locally normalized label and is not presented
as an original ACDB ID. Character assignments are implicit in the enclosing profile;
explicit series/title assignments are held. Conflicting/malformed IDs are held
without suppressing other valid tags. Unknown proper character tags retain the
searchable source.tag namespace. No weapon/role, eyewear or ear/species inference. The official tagging guide
describes maid as an outfit, so that tag maps to clothing; an explicitly stated
maid occupation remains a separate structured field. Guide:
https://www.animecharactersdatabase.com/books.php?id=41

```sh
export ASCENT_CATALOGUE_DATA_DIR='/absolute/private/team-data'
export ASCENT_KNOWLEDGE_DATABASE="$ASCENT_CATALOGUE_DATA_DIR/knowledge.sqlite"
# Only after receiving actual permission and actual source records:
npm run catalogue:knowledge -- import --provider acdb-profile --input catalogue/private/TAG-EXPORT/profiles.json --manifest catalogue/private/TAG-EXPORT/actual-permission.json --prepared catalogue/private/TAG-EXPORT/prepared.ndjson --batch-size 500
npm run catalogue:knowledge -- search --query catalogue/private/TAG-EXPORT/query.json --output catalogue/private/TAG-EXPORT/NEW-results.json
npm run ascent:generate -- knowledge --query catalogue/private/TAG-EXPORT/query.json --output catalogue/private/TAG-EXPORT/NEW-draft.json
```

The existing trusted local manifest needs enabled:true, actual reviewedBy/reviewedAt,
permissionUrl and permitted hosts. A source payload cannot authorize itself. Source
trust does not clear ODbL/DbCL publication obligations. Existing transactions, source
versions, checkpoints, identity safeguards, rarity proposals and release gates apply.
A newer complete per-character tag set replaces the active set while retaining its
history. Replaying unchanged input adds no observations. Changed definitions require
a new prepared path; do not replay old SQL imports for this tag-only task.

## What is proved, and what remains blocked

The clearly fictional automated five-character fixture proves source ID retention,
character/series separation, unknown tags, source trust, persistent read-back, repeat
imports and generator use. It is never counted as real ACDB enrichment. Existing
Usopp data is likewise not new evidence for this task.

New authorized external tag assignments obtained/imported:0. External characters
inspected through a tag-assignment feed:0. Characters without tags in such a feed:
UNKNOWN because no feed was accessible. Existing manually supplied tags remain17
on one character. Existing297,821 claims and56,091 searchable identities remain
unchanged; no appearance-attribute reimport or production change is performed.
The tag-ingestion objective is incomplete until an authorized assignment source is
actually obtained, imported and read back. The remaining blocker is specific data
access from ACDB, not a demand for individual factual approval or new infrastructure.

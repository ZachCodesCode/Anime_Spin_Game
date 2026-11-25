# Ready-to-send request: ACDB character-tag assignments

Status: prepared, not sent. No access or licence grant is implied.

To: rei@animecharactersdatabase.com
Source for this public contact: https://www.animecharactersdatabase.com/about.php
Subject: API/export access for ACDB character-tag assignments — Anime Ascent

Hello ACDB team,

We maintain Shonen Spin (https://www.shonenspin.com/) and its Anime Ascent trivia
game. We would like authorized offline access to ACDB's character-specific Tags
section. We respect your prohibition on scraping and will not crawl profile pages
or bypass access controls.

We already process the official characters, publishers and assignments SQL exports.
They do not contain the character-tag vocabulary and character-to-tag assignment
records we need. We found api_dumps.php, whose public response requires an API key,
but we cannot determine whether its authorized contents include those assignments.

Could you provide a supported licensed export, or explain the legitimate process
for obtaining a scoped API key and documentation? We specifically need both:

1. The complete character-tag vocabulary: stable tag ID, exact label, character vs
   series scope, and any category, alias, rename or deprecation metadata available.
2. Explicit character-tag edges: stable ACDB character ID and tag ID, plus label
   where available, assignment ID, source revision/date, context/form/outfit and
   deletion or retraction markers where supported.

We also need character names and explicit character-to-title/media relationships
for matching, including primary assignment and anime/game distinctions. A vocabulary
or per-tag aggregate count alone will not establish which characters have a tag.

Please clarify:

- Whether api_dumps.php exposes both vocabulary and character-tag edges; the
  documented authentication mechanism, scopes, endpoint parameters, quotas and fees.
- Whether full snapshots, incremental exports or a one-time extended dump are
  available, with schema, versioning, checksums and completeness guarantees.
- How a character with no tags is represented, and how removals, renamed tags and
  alternate forms are distinguished from missing data.
- Permission for local processing and access-controlled sharing between our two
  maintainers, including retention and backup of source provenance.
- Permission and conditions for using tag-derived factual answers in our public,
  potentially ad-supported anime trivia game, without live ACDB calls during play.
- Applicable licences for vocabulary, assignments and supplied contents; required
  attribution, ODbL/DbCL or share-alike obligations, public database/source access,
  restrictions on derived answer banks, and any separate licence needed.

We can accept documented JSON/JSONL/CSV or SQL exports. Our preferred transfer
contract is described in CHARACTER-TAGS.md; these are proposed interchange fields,
not assumptions about your internal table or endpoint names. We do not need images
or biographies for this request. We will retain source IDs, dates and licence
notices, keep factual source trust separate from publication permission, and hold
public answer publication until the applicable conditions are resolved.

Thank you,
The Shonen Spin / Anime Ascent maintainers

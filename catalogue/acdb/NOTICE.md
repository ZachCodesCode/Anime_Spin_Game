# Source permissions and publication boundary

The public files here are importer code, not the ACDB dataset.

ACDB's [official download page](https://www.animecharactersdatabase.com/databasedumps.php)
labels the offered databases **Open Database License + Database Contents License**.
Retain attribution to Anime Characters Database, the source URL, original source
hashes and the [ODbL](https://opendatacommons.org/licenses/odbl/1-0/) and
[DbCL](https://opendatacommons.org/licenses/dbcl/1-0/) notices with private exports.
Licensed local storage/processing is distinct from approving public redistribution.
ODbL covers database rights; DbCL applies its conditions to contents. Commercial
use is permitted under their conditions, not an unconditional proprietary relicense.

Before public use, assess whether the combination is an adapted or collective
database, applicable attribution/notices, share-alike and access to the adapted
database or alterations (including produced-work obligations). Server-side storage,
a small answer-bank export or independently checking a selected fact does not
necessarily remove these obligations. Other source licences and image/text rights
also matter. The implementation preserves a public-use hold for all ACDB imports;
no public compatible offer, permission waiver or licence clearance is invented.
Private team transfers must also comply with applicable notice/licence obligations.

The [ACDB terms](https://www.animecharactersdatabase.com/tos.php) prohibit scanners
and scrapers. This task implements offline official-file adapters, not page crawling.
The documented API and dump URLs were checked once; 503 challenges were not bypassed.
The example Usopp page was inspected to distinguish visible attributes from actual
SQL/API fields; it was not harvested as an authorized bulk feed.

## Alternative-source review for this implementation

* [Wikidata structured records](https://www.wikidata.org/wiki/Wikidata:Licensing):
  CC0, usable for persistent candidate storage. Actual current 30-entity request
  succeeded. Statements/revisions/qualifiers/references and MAL crosswalk retained.
  Community assertions do not establish anime adaptation or final factual accuracy.
* [AniList terms](https://docs.anilist.co/guide/terms-of-use): current page returned
  403 here. Existing restrictions were not treated as bulk authorization. Disabled.
* [Kitsu documentation](https://kitsu.docs.apiary.io/): JavaScript shell here; no
  clear dataset redistribution grant established. No bulk collection enabled.
* [Official MAL API](https://myanimelist.net/apiconfig/references/api/v2): inaccessible
  here; no application authorization or relevant trait feed was supplied. Disabled.
* [ANN encyclopedia API](https://www.animenewsnetwork.com/encyclopedia/api.php):
  inaccessible here; current permissions/schema not established. Disabled.
* [Pokemon terms](https://www.pokemon.com/us/legal/terms-of-use): iframe response did
  not establish a reusable anime-character trait dataset licence. Disabled. Do not
  treat a third-party API's software licence as rights to underlying Pokemon content.
* Official studios/distributors: individually permitted structured/factual inputs
  can use the authorized adapter with an actual permission manifest. No blanket
  crawling, biography copying or image collection is enabled.

The source-independent adapter is usable for future properly authorized feeds;
it is not an assertion that all of these providers are legally interchangeable.
All raw datasets, mappings, caches, pending research and review records remain out
of public Git and Vercel. No source is called during gameplay.

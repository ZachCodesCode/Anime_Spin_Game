# Reused ACDB SQL staging

This is the existing Phase 5D parser/checkpoint loader, reconciled for shared private
data paths. It does not execute downloaded SQL or build a second identity catalogue.
It uses Python's standard library SQLite, gzip and JSON support, then exports source
records for the persistent trait importer. No network collection is built in.

```sh
npm run catalogue:acdb-stage -- \
  --catalogue /absolute/private/team-data/catalogue.json \
  --database catalogue/private/NEW-BATCH/staging.sqlite \
  --characters /absolute/private/characters.sql.gz \
  --publishers /absolute/private/publishers.sql.gz \
  --assignments /absolute/private/assignments.sql.gz \
  --mappings catalogue/private/NEW-BATCH/reviewed-code-mappings.json
```

The mapping file must have been independently inspected against the official source
field definitions. It is not supplied by arbitrary downloaded claims. Preserve that
inspection and the mapping hash privately. The parser validates the actual SQL
schema/row arity and numeric fields. It preserves source versions, uses transactional
row checkpoints, resumes completed batches, and quarantines conflicting source IDs.
Run again with identical files/database to resume; do not replace earlier versions.

Only use --allow-partial for known truncated/prefix archives; that result must not
be described as the complete database. --stop-after N exercises an interrupted
batch import; --batch N controls checkpoint size. Store output only privately.
The generated version JSON is accepted by catalogue:traits-import --provider acdb.
See ../traits/importer/README.md for persistence, identity review and generator use.

Inspected SQL fields include names/Japanese/reading fields, publisher IDs, coded
hair/eye colours and hair length, apparent age, sex, ear/horn appearance, form/clone
links and modification fields. Publishers supply titles/media categories; assignments
link source characters to titles. General tags, occupations, accessories, species,
weapons, powers and organizations are not established by these three schemas.
Parser format 2 also retains clothing, narrative role and light/dark codes,
Japanese/Chinese/reading names, primary publisher and form links. The adapter holds
unknown codes and uninterpreted light/dark semantics. It discards image URLs and
biographies rather than copying copyrighted prose.
An ear-shape code labelled Elf does not establish elf species.

Official API documentation lists character/title query tools, but this task's
API/download availability checks returned HTTP 503 challenges. No bypass or crawler
was implemented. Existing authorized cached dumps were used for the real import
demonstration, with a new current-parser run. A future successful official API
requires verifying its actual response schema, documented limits, auth and data
permissions before adding another adapter. Visible website tags are not assumed to
be in an API. The Terms prohibit scrapers; manual authorized downloads are distinct
from scraping character pages.

See NOTICE.md for ODbL/DbCL obligations and the source review matrix. Data stays on a
publication hold; changing its factual confidence does not clear database rights.


The local `acdb-profile` adapter covers explicitly supplied tags and rich structured
fields absent from these SQL tables. It does not imply official bulk access to
those fields. See [EXTENDED-EXPORT-REQUEST.md](EXTENDED-EXPORT-REQUEST.md) for an
unsent access request and the importer README for the bounded JSON contract.
Use a new parser-version staging output when upgrading; retain historical snapshots.


The complete 2026-11-22 official downloads succeeded (HTTP200). Their fresh, complete
character archive contains 148,843 rows; this supersedes reliance on the older
44,489-row partial cache for bulk work. Parser format3 also retains secondary
publisher and six r_* codes as explicit source fields. Their meanings are held
where undocumented. The documented character API returned id/anime_id/origin/
gender/name, image references and a generic one-line desc; it supplied no tag list
or rich biography. No per-character API enumeration or webpage crawling was done.
Use the indexed full-mode adapter in ../traits/importer/KNOWLEDGE.md for all rows,
source-specific identities and automatic internal ACDB source trust.

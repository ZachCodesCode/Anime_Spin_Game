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
The parser intentionally discards image URLs/biographies and uninterpreted fields.
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

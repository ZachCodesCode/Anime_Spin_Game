# Team setup and data boundary

## What a fresh clone can do

Use Node 20+ and `npm ci`, then `npm test`, `npm run build` and
`npm run ascent:integrity`. Tests use clearly fictional fixtures and need no private
research, credentials or provider calls. The real dataset is not substituted by
those fixtures. This PR does not change gameplay files, live answers, rarity,
Daily Challenge assignments, Descent, saves or score APIs.

Code/schemas and the 18 authored trait definitions are public. The Tenrai/MAL
catalogue, anime metadata, pending claims and research are private while relevant
rights remain unresolved. No raw catalogue is needed on the production server.
Both Git exclusions and Vercel exclusions protect the private storage; the local
preview additionally refuses catalogue routes, encoded paths and escaping symlinks.
The public repository already contains an older feature branch with source data;
this PR cannot undo that historical exposure or certify its permission.

## Obtain the real catalogue

A data owner must first establish permission for the proposed private team transfer
and select access-controlled storage (for example an existing private team drive
with named users and access revocation). No such storage/account was supplied in
this task. The owner must provide the actual bundle, access instructions and its
SHA-256 through a trusted channel. Repository access alone grants no dataset rights.
Do not upload it to public Git, public releases, PR attachments or Vercel.

The owner's existing files must use the existing schemas and these names:
`catalogue.json`, `anime-metadata.json`, `associations.json`. Point
`ASCENT_CATALOGUE_DATA_DIR` at their private directory. Owner authorization is a
real decision, not something this command grants. Create a private JSON file with:

```json
{
  "authorizedBy": "ACTUAL DATA OWNER NAME",
  "purpose": "private-team-use",
  "reference": "ACTUAL PERMISSION OR AUTHORIZED TEAM ACCESS REFERENCE",
  "publicRedistribution": false
}
```

Then, only after authorization:

```sh
npm run catalogue:validate
npm run catalogue:bundle -- /private/path/authorization.json catalogue/private/team-export.private-bundle.json
```

The bundle contains only the three named datasets and checksums, with original
records/history preserved. It excludes maintainer rosters, tokens, private review
state and research caches. Share additional review packages separately only with
explicit authorization. Checksums protect integrity; they do not prove licensing
or establish a signer's identity. Verify the owner/channel and permissions.

The recipient downloads through their authenticated storage client and sets:

```sh
export ASCENT_CATALOGUE_BUNDLE_SHA256='TRUSTED_64_CHARACTER_SHA256'
# Optional; defaults to the ignored catalogue/private/team-data directory.
export ASCENT_CATALOGUE_DATA_DIR='/absolute/private/catalogue-data'
npm run catalogue:bootstrap -- /private/download/team-export.private-bundle.json
npm run catalogue:validate
npm run catalogue:inspect -- mal-character-16661
npm run traits -- validate
npm run traits -- pending
```

Use a new destination. Bootstrap rejects changed checksums, invalid schemas,
unknown filenames, public paths and existing destinations; it never overwrites
historical reviews. It creates private directories/files (0700/0600). Missing data
fails with setup instructions. It does not silently download data or synthesize a
replacement catalogue. Environment examples contain placeholders only. Keep
credentials in your authenticated storage client, never in a URL or shell history.

## Generate and review privately

```sh
npm run ascent:generate -- --output catalogue/private/NEW-REVIEW --since 2026-11-24 --protected-through 2026-11-23
npm run ascent:plan -- --output catalogue/private/NEW-PLAN --start 2026-11-24 --protected-through 2026-11-23 --days 3
```

Use a new directory each time. The generator reads observed anime metadata and
explicit appearance relationships. Missing fields remain unknown. It makes a
private immutable preview and proposed rarity, without writing public releases,
assigning dates or activating versioning. A planner exit code of 2 means a content
shortage/held release, not success: no automatic repeat or old-rotation fallback.
The six-new/at-most-one-repeat policy retains its 14-calendar-day cooldown and
requires observed performance plus an approved quality assessment. There are no
production performance credentials or verified historical deployment records in
this task, so difficulty and some history remain UNKNOWN.

Validate a generated preview using the version from its summary:

```sh
node -e "const V=require('./power-level/versioning');V.load(process.argv[1],process.argv[2]);console.log('Integrity valid')" VERSION /absolute/private/review/immutable-preview
```

The original seven predicate definitions are available in `generator/questions.json`;
`generator/fresh-definitions.json` supplies additional candidates. Neither file
approves source data. Metadata genre is a series classification, not a personal
trait. Novelty reconciliation uses stable IDs, adaptation/franchise scope, documented
aliases, order and romanization; ambiguity is held rather than silently merged.

## Maintainer verification

Existing review model/server is reused. To initialize an authorized exported state:

```sh
node catalogue/verification/cli.js initialize /absolute/private/authorized-state.json
npm run catalogue:review
```

The CLI creates an empty maintainer roster, not a fictional reviewer. The owner
explicitly configures actual identities in the ignored
`catalogue/private/phase5b3/maintainers.json` (`{"reviewers":["ACTUAL MAINTAINER"]}`).
The server binds only to 127.0.0.1 and prints a random session token in a URL
fragment. API access needs that token, an exact loopback Host, and same Origin
for writes. Verification requires preview plus explicit confirmation, current
state hashes and a configured maintainer. With no roster, approvals fail closed.
This is local operator authorization, not an Internet account authentication
service. Do not forward the port or deploy this UI. Multi-user hosting would need
real login, role checks, per-user sessions, CSRF controls and append-only shared
storage; no such public interface is introduced here.

AI-only verdicts cannot verify traits. Source provenance, identity, context,
independence, rejections and prior histories remain part of every decision. Trait
approval does not grant publication rights, rarity approval or release approval.
Use `expansion/review-cli.js` for bounded private admission; never invent MAL IDs.

## Contribution and merge order

Submit code/schema changes through PRs. Dataset/research changes go through the
private review and authorized storage workflow, with schema validation, history
preservation and a recorded permission decision. Include only rights-cleared
minimal answer-bank artifacts in a separate production content PR.

This branch starts at production 203e433 and includes reusable offline versioning
helpers. PR1 introduces the corresponding runtime integration. Review PR1 first;
rebase this branch onto reviewed main after PR1 merges, retaining the common
versioning files and all newer production content. No catalogue activation or
production environment change is needed for this offline-tooling PR.

# Question-bank releases and offline versioning infrastructure

## Current production behavior

Anime Ascent starts browser-first using the shipped question bank and existing
Toronto-date selection rules. Anime Descent uses its shipped bank and explicit
assignments; see [Descent daily workflow](../DESCENT-DAILY.md). Neither game needs
an experimental challenge-resolution API or the private catalogue to start.
The retained versioned client/service helpers are not wired into normal gameplay.
Setting `ASCENT_VERSIONING_FROM` alone is not a supported activation procedure.
See [integration boundaries](INTEGRATION.md) and
[the production release workflow](../../docs/ascent-14-16-deployment.md).

## Immutable releases and compatibility

`legacy.json` retains main's current production reference and previous reference.
The current reference is checked against the shipped question bank. All older
release directories remain available; their manifests hash the bank and exact
core/run rule bytes. The manifest hash names the release directory. Never edit an
existing immutable release to repair a checksum or update an answer. The specific
CRLF rule in `.gitattributes` preserves one historical release's original bytes.

Historical saves, same-day answer corrections, aliases, rarity and stored outcome
compatibility continue to use main's production code. A release snapshot is not
proof of which deployment served an unverifiable historical date. Do not invent
historical assignments or replace existing pins.

## Validation and operator tools

Run `npm test`, `npm run build` and `npm run ascent:integrity`. Integrity checks
cover every retained release and validate experimental assignments. Run
`npm run ascent:release-check` separately for the content release plan; unapproved
content, rarity, rights or staging gates must remain blocked until actually
reviewed. Passing technical checks is not editorial approval.

The existing CLI `publish` and `assign` commands support immutable releases and
ordered, date-specific assignments with release-policy protections. They are
explicit operator actions, not part of this merge or automatic activation. New
releases must retain old assets. Future experimental assignments are insert-only;
never rewrite historical assignments. Validate all manifests and ordered question
IDs before any separately authorized rollout.

## Offline catalogue integration

PR #28 retains the [shared catalogue setup](../../catalogue/TEAM-SETUP.md),
[daily enrichment workflow](../../catalogue/content/README.md), source provenance,
maintainer review and JVMG research tooling. `daily:integrate` prepares an offline
knowledge database and deterministic authorized public export. It does not publish
a gameplay bank, schedule a live challenge, approve source permissions or activate
versioning. Confirmed usage is recorded separately from proposed scheduling.

Private databases, RDF staging, backups, review records and restricted source
inventories remain excluded from Git and hosting. Restricted JVMG proposals are
research only, pending rights and factual decisions. No runtime catalogue/database
or AI dependency is introduced. Offline scheduling/planning tools are not the
production scheduler.

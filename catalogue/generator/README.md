# Offline Ascent answer generation

This command reads the existing catalogue and validated anime metadata. It never
imports identities, fetches external APIs, approves traits, edits live questions,
writes production tables or assigns dates.

```sh
npm run ascent:generate -- \
  --output catalogue/private/NEW-REVIEW-DIRECTORY \
  --snapshots catalogue/private/seven-question-sprint/sources \
  --review-state catalogue/private/phase5b3/state.json
```

Use a **new empty private directory** for each run; existing research is never
overwritten. `--snapshots` and `--review-state` are optional. `--since` and
`--protected-through` default to 2026-11-29 and 2026-11-28; later review batches
can supply different boundaries, with cutover strictly after the protected horizon. Without the bounded
metadata snapshots, source/demographic questions can lack evidence and fail their
Limit Break/coverage check; missing fields are never treated as positive evidence.
The command does not download snapshots. Normal `npm test` uses synthetic records
and does not require private research files.

`questions.json` contains the seven curated predicates, adaptation rules and
proposed Limit Break identities. Predicates AND source/genre/theme/demographic
conditions with explicit appearance/role evidence. They never assign personal
traits from anime classification. Every catalogue identity is evaluated; there
is no 200-answer limit. Generic labels, ambiguous identity bindings and unsafe
aliases are held. Rarity is a per-answer proposal from cast prominence, existing
recognition context and anime reach, with no fixed percentage quota. An explicit
proposed Limit Break is required. Too Clever is absent unless separately proposed
in a definition; it is never added to fill a quota.

Outputs:

- `drafts.json`: full identities, evidence, aliases, held candidates and statuses.
- `anime-metadata.json`: same existing sidecar schema, including optional observed
  `source`, `demographics` and snapshot provenance. Extra fields remain private
  while publication rights are unresolved; canonical sidecar is not overwritten.
- `existing-coverage.json`: all current Ascent character questions, their original
  unchanged answer objects, pending/verified traits and reviewed additive leads.
  Personal traits require the existing verification model's `approved_eligible`
  decision before they can become eligible expansion leads. Names/romanizations
  are reconciled using Phase 5F within their adaptation. No trait approval implies
  permission to publish or a rarity assignment.
- `playable-preview.NOT-APPROVED.json`: relevant game fields only, excluding private
  provenance/reviewer/identity detail. `since:2026-11-29` is a hypothetical gate.
- `immutable-preview/<hash>/`: non-production immutable release artifacts loadable
  with the existing version loader's explicit private root. No public registry or
  release directory is modified by this command.
- `schedule-hypothetical.NOT-ASSIGNED.json`: exact original/proposed IDs per date,
  protecting history and November 22–28, and checking Descent remains unchanged.
- `assignment-proposals.NOT-AUTHORIZED.json`: ordered date/hash/ID payloads in the
  existing assignment format, computed by the frozen scheduler for the hypothetical
  changed dates. These are private proposals, never written to the public registry.
- `summary.json`: counts, preview hashes, and explicit zero-approval/publication
  status. Candidate count does not establish official verification or rights.

## Editorial and release boundary

Use the existing private maintainer interface for personal trait evidence and
question eligibility decisions (`catalogue/verification/README.md`). For the seven
metadata questions, maintainers review the exact definition, source classifications,
identity/alias exceptions, coverage and per-answer scoring as ordinary question-bank
content. No invented reviewer or automatic approval is recorded by this generator.
A code/content review must also authorize publication rights and attribution.
Keep source responses and detailed evidence out of public releases.

After explicit content approval, prepare a sanitized reviewed bank, preserving
all existing objects. Use the existing version publisher and future assignment CLI
only under a separately authorized release task. They write real retained artifacts
and assignments; the command above does not. Every seven-question assignment must
use char, char, title, char, char, title, char. A changed future selection requires
explicit date approval even after November 28. There are no vacant future dates.
Do not use these private drafts as approved input to the public publisher.

A scheduled GitHub Actions job could run this same command on staged, permissioned
inputs, validate and upload **private review artifacts** for maintainers. It must
not auto-approve, push answers or assign dates at midnight. No workflow, live API
fetch, secret or daily publishing job is added here.

When an approved release is eventually published, explicitly assign each approved
date using these generated ordered IDs and that released hash. Current API defaults
for unassigned dates still use the fresh production baseline, not the latest private
preview or the most recent explicit assignment. Do not assume one assigned day
automatically promotes its bank for every later day. Rolling date approval or a
separately authorized future baseline change must cover the intended release window.
The frozen scheduler, not live catalogue evaluation, computes those proposals.

## Fresh-concept inventory

`npm run ascent:plan` additionally runs `fresh.js` / `fresh-definitions.json` to build
new character and anime-title drafts from documented genres, eras, sources, studios,
formats, episode counts and adaptation-specific credits. It uses the same catalogue,
metadata schema, collision checks and game validator. It does not demand 150 answers
from a 100-anime corpus or invent personal traits. Existing covered source subsets
are excluded instead of padding freshness counts. Novel concepts and Too Clever /
Limit Break proposals remain subject to editorial review, never automatic approval.
See `power-level/scheduling/README.md` for the frozen inventory, performance and
shortage-validation workflow.

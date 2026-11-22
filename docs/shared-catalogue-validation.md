# Shared catalogue integration verification

Base: origin/main 203e4335b16bc9e97cf787b32a53f048869bd865. The original feature
branch and all private review histories remain unchanged.

* 174 automated tests passed, including the existing app, answer expansion,
  Descent, catalogue/import, trait, novelty, evidence, generator, freshness,
  bounded admission and new private-bootstrap/security checks.
* `npm run build` passed; `npm run ascent:integrity` passed.
* Actual existing private data validated: 5,831 identities, 5,950 appearances,
  100 anime, 18 trait definitions, five pending initial claims, zero verified.
  No real catalogue data or research is part of the public diff.
* Real-data offline generation produced seven existing proposed question banks,
  4,389 candidate pairs, 583 holds and a valid private immutable preview. No
  answer was approved, published or assigned by this process.
* The corrected additional draft generation gives 27 questions (10 character,
  17 title), 4,096 pairs; combined inventory remains 34/8,485. The November 24–26
  planner correctly returns a held release because no new content is approved.
* Fresh-clone bootstrap rejects missing trusted checksums, unauthorized/malformed
  bundle metadata, public destinations, changed data, unknown names, overwrites
  and escaping symlinks. Owner-export/recipient-bootstrap CLI flow passed with
  explicitly fictional test data; no real permission is inferred from that test.
* Existing review tests enforce loopback Host/Origin, random token, actual
  configured maintainer roster, explicit preview/confirmation and stale-state
  checks. AI-only claims cannot verify themselves. Histories remain append-only.
* Live questions, scoring, run engine, Descent, game UI, index.html, existing
  API handlers and production database files are byte-for-byte unchanged from
  main in this branch. Static preview changes only protect offline paths/routes.
* Secret-pattern scan found no private keys/tokens in changed/new public files.
  Git ignores raw datasets/private histories; Vercel excludes all catalogue and
  scheduler tooling. No production database command, merge, deployment, bank
  activation or automatic source collection was executed.

Remaining shared-access gate: the owner must authorize a private team transfer,
provide actual storage access, and supply the independently confirmed bundle
checksum. The implementation is usable with existing authorized local data;
repository access alone does not make restricted data available to another user.
See catalogue/TEAM-SETUP.md for exact commands and permission boundaries.

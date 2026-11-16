# Phase 5B-2 completion report

Implemented locally on `feature/anime-character-database`, starting from committed
Phase 5B-1 (`8d748c6`). No commit, push, merge, deployment, production database operation,
question-bank publication or maintainer approval was performed.

## Review results

| Measure | Result |
|---|---:|
| Existing claims individually assessed | 43 |
| Priority potentially-new answers assessed | 38 |
| Original claims reassessed | 5 |
| Existing claims with direct supporting evidence | 4 |
| Existing claims needing stronger evidence/context | 38 |
| Existing claims with conflicting evidence | 1 |
| Claims conclusively rejected as incorrect | 0 |
| New category claim suggestions | 10 |
| Total assessments | 53 |
| Private ledger associations (80 prior + 10 new) | 90 |
| All assessments with direct support | 11 |
| Conservative new answer candidates, conditional on approval | 4 |
| Newly identified alias-only correction | 1 |
| Assessments matching current accepted names after alias review | 9 |
| Explicitly approved claims | 0 |
| Answers/aliases activated in gameplay | 0 |

Direct support is **not verification or eligibility approval**. The 38 existing
claims needing more work comprise 27 secondary-source suggestions, ten insufficient
identity/adaptation/trait cases and one with no independent evidence found. The
conflict is unresolved colour classification, not proof that the character is invalid.
No all-38-verification claim is made. The research deliberately does not promote
unreferenced Wikidata, fan-art tags, related-game metadata or different adaptations.

The four conditional additions are one each for masks, healers, detectives and cats.
They are considered distinct new answer candidates after current name/alias checks,
not guaranteed canonical additions: the live bank has no catalogue-ID binding and
maintainers must confirm identity and eligibility. All other question estimates are
zero until stronger evidence or context decisions are recorded. The full private
preview lists all 34 wide prompts, current counts, candidate details, aliases and
warnings. No rarity values or Limit Break scores were assigned.

## Category enrichment and limitations

Ten source-backed suggestions span nine requested categories: glasses/sunglasses
(two), cats, masks, fire, lightning, animal companions, vampires, dragons and hats.
Some strengthen evidence for already accepted answers rather than increase coverage.
Seven have direct source support; three are secondary/adaptation-limited. Dragon-form
eligibility remains unresolved even with direct transformation evidence.

Eyepatch research found official examples but not a safely mapped existing-catalogue
identity/adaptation in this batch. The private research-gaps file records the leads;
no invented character IDs, speculative associations or new catalogue records were
created to fill the category. Hats and glasses still need additional original-anime
context. Many hair-colour candidates need exact anime designs rather than mixed-media
community descriptions. One official original-anime page was accessible only through
its indexed excerpt (403 on open); its limitation is recorded beside the recommendation.

## Alias review

The private report shortlists 132 relevant proposals (131 inherited plus one pending
source-backed romanization proposal). It prioritizes the romanization correction,
a colliding nickname, documented short names, localization variants, and name order.
The new romanization matches an answer already in the game: add no second scored
character. The colliding nickname remains withheld; no unrelated identities are merged.
All 2,982 inherited proposals, 25 original collisions and canonical aliases remain
unchanged. The other eight current-name matches are not newly discovered corrections.

## Diversity

The 53 assessment rows cover 29 selected anime adaptations. Using Phase 5A's existing
popularity bands as a transparent planning proxy:

- 42 rows: popularity rank 1–500.
- 11 rows: rank 501–2,000.
- Zero rows: rank above 2,000. This batch does not establish deep niche coverage.

Rows by release decade: one from the 1980s, 19 from the 1990s, 23 from the 2000s,
seven from the 2010s and three from the 2020s. Older and less-covered series are
represented, but popularity bands are not objective mainstream/cult labels.
The private report names each series and records the exact selected adaptation;
other catalogue appearances are not silently treated as trait proof.

## Review workflow and preservation

`model.js` distinguishes source facts, secondary suggestions, insufficient evidence,
unreferenced assertions and conflicts. Eligibility is separate. `package.js` validates
the entire 38+5 inventory, retains prior history prefixes, generates an offline preview
and incomplete maintainer templates, and offers explicit private-ledger review using
the existing trait model. It never invokes a review during generation.

Templates have null reviewer/decision/operation fields; applying them fails. Actual
reviewers must choose approve/reject/request-evidence, incorporate the source evidence,
and specify adaptation/persistence/form. Revision checks, append-only event histories,
retry idempotency and an exclusive local lock preserve decisions. A verified trait
still cannot activate a question answer. This is a trusted local maintainer workflow,
not a new authentication or publishing system.

Every previously tracked file remains unchanged, including character catalogue,
trait definitions, canonical and Phase 5B-1 ledgers, gameplay, question bank, scoring,
Daily assignments, versioned releases, API, leaderboards and team builder.

## Files

New review tooling/documentation:

- `catalogue/editorial/model.js`
- `catalogue/editorial/package.js`
- `catalogue/editorial/README.md`
- `catalogue/editorial/PHASE5B2-REPORT.md`
- `catalogue/tests/editorial.test.js`

Private local package: `catalogue/private/phase5b2/` contains assessments, source facts,
provenance, new suggestions, preserved ledger, alias recommendations, research gaps,
decision templates, summary and the full question preview. Its contents are ignored
by Git; all `catalogue/**` remains excluded from Vercel uploads. A clean checkout cannot
regenerate joined reports without receiving those private inputs through an authorized
channel. Synthetic tests need neither the private package nor network access.

## Licensing and evidence limits

Only links and short original fact summaries are stored; no biographies or artwork
are copied. Official/licensed source status is evidence authority, not permission to
redistribute content. Secondary sites may repeat each other or Wikidata; independence
is not guaranteed. Source dates, statement IDs, revisions, qualifiers, reference blocks
and old history are retained in original records and copied provenance.

Joined Tenrai catalogue publication permissions remain unresolved. The new review
package stays private. Ignore rules cannot retract previously committed Phase 5A data
or existing remote copies; the owner must resolve that separately before publication.

## Validation

- **81 tests passed**, including 13 new synthetic editorial regressions.
- `npm run build` passed.
- Character catalogue validation passed: 5,831 characters across 100 anime retained.
- Canonical trait validation passed: 18 definitions, five pending claims, zero verified.
- Private ledger/package validation passed: 90 associations, all prior histories retained.
- Anime metadata validation passed.
- Release hash and assignment integrity checks passed; configuration unchanged.
- Repeated report generation leaves the ledger unchanged and reports deterministic.
- Diff/whitespace, scoped-file and private-file ignore checks passed.

New tests cover evidence scope, wrong adaptations, mentions versus facts, identity
conflicts, invalid claims/URLs, exact question eligibility, deduplication, aliases and
collisions, invalid decision templates, append-only review history, stale revisions,
retry idempotency, rejected claims, conservative previews, no automatic question
approval, and unchanged existing scoring/answer-bank inputs.

# Phase 5B-3 implementation and pilot report

Work is local on feature/anime-character-database, based on committed Phase 5B-2
(7452d80). No gameplay, scoring, questions, releases, API, team-builder, database or
existing catalogue file was modified. No commit, push, merge or deployment performed.

## Evidence and approval results

| Measure | Result |
|---|---:|
| Candidate/question records reassessed | 56 |
| Original priority claims reassessed | 43 |
| Prior category records preserved | 10 |
| New source-linked suggestions this pass | 3 |
| New suggestions not already accepted | 2 |
| Records with direct, exact-context primary/licensed support | 12 |
| Records without that exact-context support | 44 (including conflict) |
| High-evidence batch-review queue | 1 (1.8%) |
| Uncertain queue | 54 |
| Conflicting queue | 1 |
| Individual review/investigation queue | 55 (98.2%) |
| Pending potential additions across the inherited and new pool | 46 |
| Alias collision records annotated | 25 |
| Pending alias-only correction | 1 |
| Actual maintainer approvals / applied alias corrections | 0 / 0 |
| Approved eligible additions | 0 |
| Private ledger associations | 93 |

The 46 potential additions are unapproved candidates, not 46 proven acceptable answers.
The sole batch-ready record is Jiji, already accepted in the game: batch readiness here
improves evidence coverage and produces **no new answer by itself**. Eleven other records
have direct support but lack independent deterministic corroboration or settled eligibility.
The 1.8%/98.2% split describes this small, deliberately difficult pilot only; it is not a
forecast for tens of thousands of characters. Licensed structured source coverage must
be measured before giving a credible large-scale approval-rate estimate.

**Research quantity remains below the requested 20–50 additional candidates.** This pass
added three source-linked suggestions: Hime's cat identity (secondary/mixed-adaptation
context, pending), Aria's animal-companion role (official episode facts, eligibility
unresolved), and Heiter's healer role (official profile, already accepted). It did not
inflate the pool with unsupported assertions. Two are potentially new answers; neither
is ready for automatic or batch inclusion. This research milestone remains incomplete.

Among the original 43 records, three now have direct evidence bound to a resolved proposed
context (Jiji, Conan, Kyoya). Other original sources may describe a trait without settling
anime context; those are not counted as exact-context support. Richard gained an
anime-specific secondary episode reference but still needs reliable corroboration. Kei
remains unresolved. Aura's conflicting evidence remains held. Original stored decisions
were not rewritten: all 90 prior ledger associations/histories compare exactly to Phase
5B-2. Proposed research context changes live in review records until an authorized decision.

All 25 collision records retain separate stable identities and withhold ambiguous global
aliases. Generic occupations, shared short names, transliterations and look-alike names
are not identity merges. The existing Kyoya/Kyouya alias recommendation remains pending;
no canonical character or alias index was modified.

## Representation and question coverage

Thirteen explicitly bound anime adaptations are represented: Aria the Animation, Bakemonogatari, Cowboy Bebop, Haikyuu!! Karasuno Koukou vs. Shiratorizawa Gakuen Koukou, Kino no Tabi: The Beautiful World, Majo no Takkyuubin, Meitantei Conan, Monster, One Piece, Ouran Koukou Host Club, Sousou no Frieren, Toaru Kagaku no Railgun, Trigun.
Many inherited candidates deliberately have unbound adaptations and are not counted as
confirmed representation. The pilot is not representative of all 100 catalogue anime.
All 5,831 canonical characters and the existing 18 trait definitions remain unchanged.

| Active policy question | Current accepted answers | Review records | Approved additions |
|---|---:|---:|---:|
| timed-v4-mix-red-hair | 58 | 1 | 0 |
| timed-v4-mix-masks | 56 | 1 | 0 |
| timed-v4-mix-glasses | 80 | 4 | 0 |
| timed-v4-mix-healers | 61 | 2 | 0 |
| timed-v4-mix-companions | 37 | 2 | 0 |
| timed-v4-mix-white-hair | 45 | 4 | 0 |
| timed-v4-mix-blonde | 116 | 8 | 0 |
| timed-v4-mix-fire | 36 | 1 | 0 |
| timed-v4-mix-lightning | 20 | 1 | 0 |
| timed-v4-mix-mentors | 57 | 3 | 0 |
| timed-v4-mix-pink-hair | 30 | 8 | 0 |
| timed-v4-mix-green-hair | 21 | 4 | 0 |
| timed-v4-mix-royalty | 50 | 0 | 0 |
| timed-v4-mix-twins | 23 | 0 | 0 |
| timed-v4-wide-ghibli | 27 | 0 | 0 |
| timed-v4-wide-sports | 57 | 0 | 0 |
| timed-v4-wide-isekai | 61 | 0 | 0 |
| timed-v4-wide-mecha | 31 | 0 | 0 |
| timed-v4-wide-magical-girl | 48 | 0 | 0 |
| timed-v4-wide-starters | 31 | 0 | 0 |
| timed-v4-wide-shinkai-hosoda | 18 | 0 | 0 |
| timed-v4-wide-time-travel | 18 | 0 | 0 |
| timed-v4-wide-detectives | 41 | 4 | 0 |
| timed-v4-wide-vampires | 38 | 1 | 0 |
| timed-v4-wide-robots | 52 | 3 | 0 |
| timed-v4-wide-ninjas | 20 | 2 | 0 |
| timed-v4-wide-eyepatch | 12 | 0 | 0 |
| timed-v4-wide-cats | 39 | 3 | 0 |
| timed-v4-wide-dragons | 20 | 1 | 0 |
| timed-v4-wide-studios | 57 | 0 | 0 |
| timed-v4-wide-food | 20 | 0 | 0 |
| timed-v4-wide-long-running | 23 | 0 | 0 |
| timed-v4-wide-shinigami | 18 | 2 | 0 |
| timed-v4-wide-hats | 22 | 1 | 0 |

## Delivered workflow

- Permission-gated normalized feeds and automatic CC0 Wikidata candidate queuing.
- Stable identity/adaptation checks, persistent external-ID bindings and contextual deduplication.
- Evidence hashes, source revisions, independent-origin grouping and contradiction queues.
- Eligibility/context gates, including Naruto exclusions and temporary-form holds.
- Local source-linked review UI, filters, paged rendering and exact-change approval previews.
- Explicit authorized local maintainer decisions, stale-state protection, atomic saves,
  idempotent retries, explicit rejection reopening and append-only decision history.
- Private offline export buckets; existing answers never inflate approved-addition totals.

See README.md for commands, local-token/maintainer trust boundaries and normalized feed
contracts. SOURCES.md records provider feasibility and licensing limitations. No new
non-Wikidata bulk provider was enabled; AI proposals cannot self-certify facts.

## Validation and remaining work

Final checkpoint on 2026-11-20: all **100 tests passed** (zero failures/skips),
including 19 Phase 5B-3 regression tests. `npm run build`, catalogue validation,
canonical trait validation, anime metadata validation, and release hash/assignment
integrity checks passed. `git diff --check` passed. No existing tracked file differs
from HEAD; all implementation changes are new verification files and their tests.
All 90 Phase 5B-2 ledger associations and complete histories compare identically.
The maintainer roster is empty and the private ledger contains zero decisions.

**Phase 5B-3 workflow implementation is complete and ready for review.** The optional
20–50 evidence-backed candidate planning target is not met (three suggestions were
supported); this is a documented evidence-coverage limitation, not an approval bypass.
No commit or push has been made. Private data is Git-ignored, and Vercel excludes
catalogue/**. The review service binds loopback and denies unauthorized API requests,
foreign origins/hosts and private file paths. These are local/configuration checks;
no production endpoint probe or deployment was performed.
The read-only interface was opened successfully in the browser against all 56 records.
API tests cover authorization, cross-origin/host restrictions, private-path denial,
previews and explicit confirmation. No real maintainer approval was exercised. Comprehensive
mobile/keyboard assistive-technology testing and large-volume performance benchmarking
remain outstanding; the pilot renders 30 cards but still loads/validates the full JSON ledger.

Next: obtain permitted structured feeds, improve independent source coverage, and finish
the evidence-research target. Have the maintainers review actual batches before preparing
any release. At larger volume, move identical contracts to indexed local storage and
server-side pagination; do not remove gates to achieve scale. Resolve the prior catalogue
redistribution blocker before publishing derived data. Any future answer release needs
separate reviewed rarity/scoring assignments and versioned-bank validation. This task did
not start release preparation or activate versioning.

New tracked-source paths: catalogue/verification/{model,pipeline,store,server,cli}.js,
ui/{index.html,app.js,style.css}, README.md, SOURCES.md, this report, and
catalogue/tests/verification.test.js. Private state, manifests, collision annotations,
research summaries and offline previews remain under ignored catalogue/private/phase5b3/.

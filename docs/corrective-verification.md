# Corrective verification — November 23, 2026

This correction preserves the existing PR #27 branch and incorporates main
c8c68da (ads update). No main merge, deploy, database migration or new assignment.

- 51/51 automated tests passed on macOS, including the actual question selector,
  seven-question transitions, API canonical scoring, historical release hashes,
  five/seven save restoration, same-day answer/alias/rarity corrections and removal.
- Build and immutable-release integrity passed. Frozen bytes remain untouched.
- Installed Chrome / playwright-core desktop 1440×1000 and mobile 390×844:
  seven actual questions with all API traffic aborted, prompt and metadata matched
  IDs/answers, reveals retained the completed question, local total 70, question 6
  deadline unchanged across refresh, completed results restored, Descent started,
  no page errors and zero challenge-resolution requests. Existing production
  questions were fixtures; this did not approve new content or test hosted Turso.
- CI added for Windows, Ubuntu and macOS. Only macOS execution is claimed locally;
  no actual Windows/Ubuntu result is available until pushed workflows run.
- Frozen hashes retain true byte verification; LF checkout fixes platform line
  endings. SQLite clients close before bounded cleanup retries; no tests skipped.
- Live game.js fetched read-only matched main's browser-first script byte for byte.
  No production credentials/deployment assignment history were available. Historical
  server pins cannot be proven absent; helpers/assets/records are retained.
- questions.js, core.js, descent.js, team builder, branding, archive and analytics
  source remain identical to main. No live answer list or rarity was changed.
- Private source consistency audit preserved 34 drafts / 8,485 entries, all 21
  selected slots, and produced full production-shaped private review candidates.
  6,708 selected originals → 6,701 retained proposals, seven held originals.
  Every retained proposal matches its stable catalogue identity and explicit stored
  adaptation/role metadata; aliases pass the actual matcher and one Limit Break
  proposal remains per question. Source metadata is not independent approval.
  There are 6,548 retained character pairs / 2,995 distinct catalogue identities;
  2,785 pairs / 1,270 identities also have matching SQLite identities. Remaining
  Tenrai identities are retained in the existing catalogue, not invented/imported
  automatically into SQLite. 153 retained title entries use existing anime metadata.
- `ascent:release-check` correctly blocks unapproved/unintegrated content. It no
  longer requires server-side immutable assignments. Technical test success is
  not release approval. Full selected questions/counts/rarities/Limit Break
  proposals: ascent-14-16-candidate-selection.md.

Remaining content gates: provider rights, actual editorial decisions, role/generic
name and genre/adaptation eligibility, fair Limit Break choices, title coverage,
historical deployment uncertainty, and verification of actual browser-first future
selection after approved content is appended. Private data remains excluded from
Git and Vercel. The complete candidate packet stays in the owner's private research
store; no restricted answer bank is publicly committed to meet a deadline.

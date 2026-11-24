# Anime Descent daily questions

Descent starts on November 20, 2026. `descent-assignments.js` pins November 20–24 to the IDs reconstructed from the original selector in the current source. November 24 repeats November 20 in that selector. These pins preserve the code's historical behavior; deployment logs or completed-run exports have not been checked, so do not describe them as independently verified player history. Do not edit played assignments or existing questions. The score table and archive data are unchanged.

## Add tomorrow's package

1. Use the existing anime database and editorial review process to choose seven questions: five with `descent:'char'`, two with `descent:'title'`. Add only these seven to the `questions` array in `power-level/descent-questions.js`. Each object needs a globally unique `id`, a stable `conceptId` shared by rephrasings of the same prompt, `text`, `note`, `top`, and an `answers` array. Every answer needs a canonical `name`, an `aliases` array (use `[]` when empty), and numeric `rarity`. `top` must exactly match one canonical name. Keep the existing question text and answer lists for played days intact.
2. Append one new Toronto date and its seven IDs to `assignments` in `power-level/descent-assignments.js`. Keep existing date entries as they are. No later date needs to be prepared.
3. Run `npm run descent:preview -- --date YYYY-MM-DD`. It prints the date, texts, accepted-answer counts, duplicate and semantic conflicts, cooldown violations, and a READY/NOT READY result. Exit code 0 means ready. Run `node --test power-level/descent.test.js` and `npm test` as well.
4. Review the diff in GitHub Desktop. Then manually commit and push when both editors approve the questions and the preview is ready. This workflow does not commit, push, or deploy anything.

There is no automatic fallback when an assignment is absent. The browser shows an unavailable message, and the API rejects GET and POST for that date. Local play uses the shipped bank and assignments, so a Turso outage does not block the quiz itself. Toronto midnight is computed by `core.dateKey()` in the browser and the API.

## Reuse after 14 full calendar days

A question used November 20 is first eligible December 5. Reuse, including a rephrased question with the same `conceptId` or text, is rejected through December 4. After that, add a dated entry under `reuse` in `descent-assignments.js` for the assigned question ID. Include `approvedBy`, `reviewedAt`, `evidence` (a reference to the private review/export), `runs`, `acceptedRate`, and `topRate`. Defaults in `policy` are 30 unique recorded runs, accepted rate at most 0.60 **or** Top Answer rate at most 0.30, and explicit editorial approval. These fields are frozen with the date's package; live player stats never change the live challenge.

For an independent check, export `descent_scores` rows to a **private** local JSON file containing `day`, `guest`, and `answers` (canonical answer names or null). Run `npm run descent:preview -- --date YYYY-MM-DD --runs /private/path/descent-runs.json`. The preview deduplicates by day and guest and compares the recorded rates with the approval entry. Keep this export outside the repository because it contains player identifiers. A question with insufficient or missing data is not approved for automatic reuse.

`descent-questions.js` is separate from the published Ascent question bank. This keeps old Ascent releases and stored scores stable while allowing a single future Descent day to be added at a time.

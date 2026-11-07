# Power Level: timed five-question runs

Open `/#power-level`. Serve this static repository with `python3 -m http.server 8081`. The existing team builder is unchanged.

## Configuration

`run.js` centralizes `CONFIG`: five questions, 30 seconds, baseline 100, 2200ms reveal. `boost(rarity)` delegates to the deterministic 0–100 editorial rarity mapping in `core.js`; `visualTier(total)` controls accumulated visual thresholds independently. A maximum individual answer never ends a run early. Final totals range from 100 to 50,100.

`questions.js` holds nine bounded anime-only prompts, one for each requested series. Each has stable ID, anime, question, scope/spoiler note, and canonical answers with aliases and provisional editorial rarity. Add accurately scoped prompts and aliases here. Do not change bank contents/order mid-day: daily selection is seeded by Toronto date, shuffles deterministically, selects distinct anime first, and returns exactly five unique question IDs.

Content checks used the original anime scopes, including: Naruto original Team 7; East Blue Straw Hats; season-one Hashira meeting; initial Quinx under Haise; initial Levi squad. Reference examples:
- https://disney.go.com/xd/naruto/cds/characters/
- https://hunterxhunter.fandom.com/wiki/Zoldyck_Family
- https://www.crunchyroll.com/news/features/2018/4/27/all-in-the-family-the-power-of-the-clover-kingdoms-elite-nobility
- https://tokyoghoul.fandom.com/wiki/Quinx_Squad
- https://www.koeitecmoamerica.com/attackontitan/scout.html

## State and persistence

V3 keys: `shonen-spin:power-level:v3:daily:YYYY-MM-DD` and `...:practice`. V1/v2 saves remain untouched and are not interpreted as timed runs. Start is explicit; each next question starts only when its input is shown and the document is visible. Leaving an active question does not stop its absolute deadline. Reveals save their end time before animation. Restoration recomputes all boosts from canonical outcomes, retains active deadlines, and cannot award a second outcome to a locked question. Refreshing during a reveal resumes the saved phase without replaying its award. An expired question becomes a timeout; the following question waits for visibility. Storage events synchronize other tabs, although this local-only game does not provide server-authoritative anti-cheat.

## Validation

`node --test power-level/*.test.js` covers selection, unique anime, alias validation, score thresholds, five-question accumulation, invalid answers, skips, timeout/submission boundary, duplicate resolution, refresh deadlines, reveal restoration, malformed and old saves. Original single-round tests are retained as regression coverage for core helpers, not current gameplay.

`node --check power-level/game.js` and `node --check power-level/run.js` check syntax. There are no build/lint/type-check scripts in the repository. Reduced-motion CSS disables animation while retaining text feedback. The original placeholder SVG fighter remains; no new sprite assets or backend are needed.

## Spelling and mountain progression

`core.js` ranks spelling candidates by normalized edit distance against canonical names and verified aliases. Inputs below four normalized letters get no fuzzy suggestions. Length-dependent edit limits and a 23% distance cap prevent unrelated suggestions; candidates within 4.5 percentage points of the best match are offered (up to three). Exact canonical/alias matches remain immediate. Suggestions appear only on submission, preserve the input when dismissed, require a separate button action, and expire when the question resolves. Confirmation goes through the same deadline check as ordinary submission.

`run.js` centralizes `MOUNTAIN`, `maximum(state, bank)` and `climb(power, maxPower)`. The actual maximum for the five selected questions maps to 5,000 m. Position interpolates along a fixed trail in a 2,400px world; the camera follows it without moving the question or controls. Skips add no height. Saved power is included for inspection, but restoration recomputes the authoritative total from canonical outcomes. Reduced motion moves directly to the destination and retains boost/altitude feedback.

Focused tests in `climb.test.js` cover misspellings, ambiguous matches, strict short/unrelated input rejection, confirmation at expiry, and summit/restoration math. Browser checks covered a submitted typo, Keep editing, explicit confirmation, restored final position, and mobile layout. All climb distances have deterministic logic coverage; OS-level reduced-motion emulation was not available for visual verification.

## Pixel-art expedition redesign

`scene.js` replaces the geometric landscape with a generated continuous mountain painting, a measured multi-point stone-stair route, a normalized six-pose adventurer atlas, foreground mist, and high-altitude snowfall. Feet interpolate along the painted route; directional poses, stepping rhythm and leap/landing frames follow each boost, with a short anticipation beat. Camera bounds prevent empty strips at both ends; a horizontal follow camera keeps switchbacks visible on mobile. Reduced motion snaps to the saved destination and disables ambient animation.

Runtime art in `assets/`: `mountain-ascent.webp` (~798KB), `clouds.webp` (~224KB), `adventurer-atlas.png` (~19KB). Generated originals are retained alongside them. Built-in image generation was used; the prompt set and production notes are in `assets/ART-DIRECTION.md`. These are original assets, not licensed franchise sprites. Terrain lighting and waterfalls are painted into the backdrop; cloud/snow layers and the character animate independently. Six poses provide a stylized climb rather than a full hand-authored locomotion cycle.

Local-only `?artReview#power-level` adds scenery positions inside Menu, without changing saved progress or timers. Review is intentionally disabled during an active question. Screenshots of summit/cloudline previews use that control; actual results and answer-flow captures are also saved under `screenshots/`.

Verification: 16 Node tests pass, including route continuity/finite positions; JavaScript syntax and diff whitespace checks pass. Browser inspection covered desktop foothills/cloudline/summit, saved results, 390px mobile framing, live typo confirmation and a maximum-boost climb, all artwork loading, and no horizontal overflow. Native mobile keyboard and OS reduced-motion visual emulation remain unverified.

### Character rendering regression checks

`tools/build-atlas.py --check` (Pillow required) validates the shipped six-frame atlas against its source. `tools/animation-review.html` is an isolated browser fixture with start/midpoint/end samples, boost sizes, altitude zones, a reduced-motion simulation, and a full route audit. It never writes game progress. Desktop and 390px mobile audits each checked 2,424 rendered samples without character-count or viewport-bound failures. Visually inspected start, midpoint, and landing; reduced-motion simulation selected the idle pose directly. Real game checks covered consecutive 1,001 / 10,000 / 7,000 boosts. The reduced-motion fixture tests the same JS branch without changing OS preferences.

## Daily Challenge leaderboard

`api/_power-level.js` serves `/api/power-level`, reusing the Turso client and the `shonen_guest` cookie; `power-level/leaderboard.js` is the UI. Rankings live in `power_level_daily`, separate from `shonen_leaderboard`. Both tables are created on first use, so there is no manual migration; the existing `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` are the only configuration.

Each date snapshots its questions in `power_level_challenges`, and each run stores its question wording, submitted and accepted answers, rarity, tier and boost. `versions/scoring-v3-1.js` freezes the scoring. When scoring changes, add a new version file and `SCORING` entry instead of editing that one. The bank and rarities still ship to the browser for gameplay, so server validation proves a run is legal, not that it was played honestly.

## Partial names

`core.js` accepts any whole word of a name or alias (three letters or more) when it fits exactly one answer, so "Uzumaki" scores as Naruto Uzumaki. A word shared by several answers ("Zoldyck") returns `ambiguous` and lists nothing, because options would reveal rarer answers. The API uses the same `validate`, and saved runs keep what the player typed beside the accepted name.

## Rarity reveal

Each answer's tier drives a banner on the stage during its reveal (`#plRarity` in `game.js`), louder at each step, with a frame flash from Rare up. Tier colours are set once, on `[data-tier]` in `style.css`, and shared by the banner, the `.pl-tier-tag` pills in the history, results and leaderboard details. The score card's label is the whole run's tier, not the answer's. Reveal text stays readable with reduced motion, and screen readers get the tier from `#plFeedback`.

## Question bank v4

`versions/questions-v4.js` replaces the small fixed-set prompts with one broad prompt per anime: any Hidden Leaf shinobi, any Devil Fruit user, any Gotei 13 captain or lieutenant, and so on, with 18–99 accepted answers each. `questions.js` must stay identical to it (a check compares them). Answers not in the list are rejected, so when players report a valid miss, add it to a new version file, not to v4.

`api/_power-level.js` serves v4 and keeps `questions-v3-1.js` for history: every saved date scores from its own snapshot. On the day this deploys, today's challenge moves to v4 only if nobody has saved a run yet; otherwise v4 starts the next Toronto day.

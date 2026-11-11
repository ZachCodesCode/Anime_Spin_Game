# Power Level: one daily five-question ascent

Open `/#power-level`. Serve this static repository with `python3 -m http.server 8081`. The existing team builder is unchanged.

## Configuration

`run.js` centralizes `CONFIG`: five questions, 30 seconds each, a 3-second countdown before each clock starts, and a 1.9 s reveal. After a reveal the player presses **Climb on ▲** to continue; the next question is shown during its countdown. A maximum individual answer never ends a run early.

## Scoring

Krillion-style fixed tiers (`core.js`): **Fodder 10 · Too Clever 15 · Side Character 30 · Rare 60 · Deep Cut 85 · Limit Break 100**. An answer's tier comes from its editorial rarity (under 20, 20+, 45+, 75+, exactly 100). Every question has exactly one rarity-100 Limit Break answer. **Too Clever** is the go-to "obscure" pick that everyone reaches for: it's listed per question in the `CLEVER` table at the bottom of `questions.js` and scores 15 whatever its rarity. Every point climbs 10 m, so a perfect run (500 points) reaches the 5,000 m summit.

## Daily schedule

One ascent per day, the same for everyone, numbered from `EPOCH` in `run.js` (2026-11-11 is Ascent #1). There is no practice mode or replay: a finished ascent shows a countdown to the next one (Toronto midnight). `schedule()` deals one question per anime per round, rotating the anime order each round, and each day takes the next five, so a day never repeats an anime and no question repeats until the whole bank has been used (50 questions = 10 days). **Only add questions after the existing ones, a full round (one per anime) at a time**, so past and current days keep their questions.

Content checks used the original anime scopes, including: Naruto original Team 7; East Blue Straw Hats; season-one Hashira meeting; initial Quinx under Haise; initial Levi squad. Reference examples:
- https://disney.go.com/xd/naruto/cds/characters/
- https://hunterxhunter.fandom.com/wiki/Zoldyck_Family
- https://www.crunchyroll.com/news/features/2018/4/27/all-in-the-family-the-power-of-the-clover-kingdoms-elite-nobility
- https://tokyoghoul.fandom.com/wiki/Quinx_Squad
- https://www.koeitecmoamerica.com/attackontitan/scout.html

## State and persistence

V4 key: `shonen-spin:power-level:v4:daily:YYYY-MM-DD`. Older saves (v1–v3) are ignored. Start is explicit; each next question starts only when its input is shown and the document is visible. Leaving an active question does not stop its absolute deadline. Reveals save their end time before animation. Restoration recomputes all boosts from canonical outcomes, retains active deadlines, and cannot award a second outcome to a locked question. Refreshing during a reveal resumes the saved phase without replaying its award. An expired question becomes a timeout; the following question waits for visibility. Storage events synchronize other tabs, although this local-only game does not provide server-authoritative anti-cheat.

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

## Partial names

`core.js` accepts any whole word of a name or alias (three letters or more) when it fits exactly one answer, so "Uzumaki" scores as Naruto Uzumaki. A word shared by several answers ("Uchiha") returns `ambiguous` and lists nothing, because options would reveal rarer answers.

## Rarity reaction

Each answer's tier drives the whole page during its reveal: a banner on the stage (`#plRarity`), a page-wide tint and flash (`#plFlash`), tier-coloured card borders, and a shake from Legendary up. `game.js` sets `body[data-pl-tier]` for the length of the reveal; tier colours are defined once in `style.css` on `[data-tier]` / `[data-pl-tier]`. The score card's label is the whole run's tier. With reduced motion the colours stay and the movement stops.

## Result

There is no leaderboard. A finished run shows points, altitude and the share of the summit reached, plus each question's deepest-cut answer. The copied result is spoiler-free:

```
Shonen Spin · Power Level #1
⛰️ 1,350 m · 135/500 pts
⬜🟫⬛🟨⬜
https://www.shonenspin.com/#power-level
```

Squares: ⬜ Fodder · 🟫 Too Clever · 🟩 Side Character · 🟦 Rare · 🟪 Deep Cut · 🟨 Limit Break · ⬛ skipped or timed out.

## Questions

`questions.js` has five broad prompts for each of ten anime (Naruto, One Piece, Bleach, Hunter × Hunter, Tokyo Ghoul, My Hero Academia, Black Clover, Demon Slayer, Attack on Titan, Jujutsu Kaisen) with 9–99 accepted answers each. Answers not on a list are rejected, so add valid misses to the list. `versions/questions-v3-1.js` keeps an older bank for the spelling and climb tests.

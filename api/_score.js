// Server-side scoring: the client only sends WHO is in each slot; the rating and
// win % are recomputed here from characters_data.js, so scores can't be typed in.
// Keep these in sync with index.html (scoreTeam / winPct / verdictFor / HARD_BUDGET).
const { SLOTS, CHARACTERS } = require("../characters_data.js");

const HARD_BUDGET = 2700;
const CENTER = 650, SPREAD = 165;
// minimum win % to make each board (also gated in index.html: LB_MIN_PCT)
const MIN_PCT = { regular: 60, hard: 45 };

const byName = new Map(CHARACTERS.map(c => [c.n, c]));
const cost = c => Math.round(c.p * c.p / 16);

function winPct(total) {
  const p = 100 / (1 + Math.pow(10, (CENTER - total) / SPREAD));
  return Math.max(1, Math.min(99, Math.round(p)));
}
function verdictFor(pct) {
  if (pct >= 88) return "Flawless Victory";
  if (pct >= 72) return "Heavy Favorite";
  if (pct >= 56) return "You Take the Fight";
  if (pct >= 42) return "Coin Flip";
  if (pct >= 26) return "Longshot";
  return "Wiped Out";
}

// squad: { slotId: characterName }. Returns null if the squad isn't a legal draft.
function scoreSquad(squad, mode) {
  if (!squad || typeof squad !== "object") return null;
  const team = {}, used = new Set();
  for (const sl of SLOTS) {
    const c = byName.get(String(squad[sl.id] ?? ""));
    if (!c || !c.r.includes(sl.role) || used.has(c.n)) return null;
    team[sl.id] = c; used.add(c.n);
  }
  if (mode === "hard" && Object.values(team).reduce((a, c) => a + cost(c), 0) > HARD_BUDGET) return null;

  let base = 0; const bySeries = {};
  Object.values(team).forEach(c => { base += c.p; bySeries[c.s] = (bySeries[c.s] || 0) + 1; });
  let synergy = 0;
  Object.values(bySeries).forEach(k => { if (k > 1) synergy += 6 * (k - 1); });
  const aceBonus = 15 + Math.round(team.ace.p * 0.25);
  const duo = team.ace.s === team.right.s ? 40 : 0;
  const total = base + synergy + aceBonus + duo;
  const pct = winPct(total);
  return { team, total, pct, verdict: verdictFor(pct) };
}

module.exports = { SLOTS, MIN_PCT, scoreSquad };

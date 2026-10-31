// POST /api/submit  body: { name, mode, squad: { slotId: characterName } }
const { db, ensureTable, cors } = require("./_db.js");
const { SLOTS, MIN_PCT, scoreSquad } = require("./_score.js");

const MAX_ROWS = 100;   // hard cap on stored records per mode

const clean = (s, max) =>
  String(s ?? "").replace(/[<>]/g, "").replace(/\s+/g, " ").trim().slice(0, max);

module.exports = async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const mode = body.mode === "hard" ? "hard" : "regular";

    const result = scoreSquad(body.squad, mode);
    if (!result) return res.status(400).json({ error: "Invalid squad" });
    const min = MIN_PCT[mode];
    if (result.pct < min) return res.status(200).json({ ok: false, eligible: false, min });

    const name  = clean(body.name, 20) || "Anonymous";
    const squad = SLOTS.map(sl => ({ role: sl.role, name: result.team[sl.id].n, s: result.team[sl.id].s }));

    await ensureTable();
    await db.execute({
      sql: `INSERT INTO shonen_leaderboard (name, mode, rating, win_pct, verdict, ace, squad, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [name, mode, result.total, result.pct, result.verdict, result.team.ace.n, JSON.stringify(squad), Date.now()],
    });

    // your rank within the same mode
    const rk = await db.execute({
      sql: "SELECT COUNT(*) + 1 AS rank FROM shonen_leaderboard WHERE mode = ? AND rating > ?",
      args: [mode, result.total],
    });
    const rank = Number(rk.rows[0].rank);

    // keep only the top MAX_ROWS records within this mode
    await db.execute({
      sql: `DELETE FROM shonen_leaderboard WHERE mode = ? AND id NOT IN (
              SELECT id FROM shonen_leaderboard WHERE mode = ? ORDER BY rating DESC, created_at ASC LIMIT ?
            )`,
      args: [mode, mode, MAX_ROWS],
    });

    return res.status(200).json({
      ok: true, eligible: true, rank, inBoard: rank <= MAX_ROWS,
      name, mode, rating: result.total, win_pct: result.pct,
    });
  } catch (e) {
    return res.status(500).json({ error: "Failed to submit score" });
  }
};

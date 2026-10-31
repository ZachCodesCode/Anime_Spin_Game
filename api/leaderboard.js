// GET /api/leaderboard?mode=regular|hard&limit=100  -> top squads by rating
const { db, ensureTable, cors } = require("./_db.js");

module.exports = async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  res.setHeader("Cache-Control", "no-store");

  try {
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 100, 1), 100);
    const mode  = req.query.mode === "hard" ? "hard" : "regular";
    await ensureTable();
    const result = await db.execute({
      sql: `SELECT name, rating, win_pct, verdict, ace, squad, created_at
              FROM shonen_leaderboard
             WHERE mode = ?
          ORDER BY rating DESC, created_at ASC
             LIMIT ?`,
      args: [mode, limit],
    });
    return res.status(200).json({ mode, entries: result.rows });
  } catch (e) {
    return res.status(500).json({ error: "Failed to load leaderboard" });
  }
};

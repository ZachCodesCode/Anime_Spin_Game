// GET /api/health  -> quick check that the env vars + Turso connection work.
// Safe to leave in, or delete once everything's confirmed working.
const { db, ensureTable, cors } = require("./_db.js");

module.exports = async function handler(req, res) {
  cors(res);
  res.setHeader("Cache-Control", "no-store");

  const env = {
    url: !!process.env.TURSO_DATABASE_URL,     // true/false only — never exposes the value
    token: !!process.env.TURSO_AUTH_TOKEN,
  };

  try {
    await ensureTable();
    const r = await db.execute("SELECT mode, COUNT(*) AS n FROM shonen_leaderboard GROUP BY mode");
    const rows = Object.fromEntries(r.rows.map(x => [x.mode, Number(x.n)]));
    return res.status(200).json({ ok: true, env, rows });
  } catch (e) {
    return res.status(500).json({ ok: false, env, error: String(e?.message || e) });
  }
};

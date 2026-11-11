// Anime Ascent daily results.
// GET  /api/ascent?date=YYYY-MM-DD           -> { players, scores: {score: count}, picks: {questionId: {answer: count}} }
// POST /api/ascent  { date, answers: [5 × name|null] } -> records one run per player per day, then returns the same stats
// The client only sends which answers it gave; the score is recomputed here from the question bank.
const { db, ensureAscent, cors } = require("./_db.js");
const { guest } = require("./_guest.js");
const C = require("../power-level/core.js");
const R = require("../power-level/run.js");
const bank = require("../power-level/questions.js");

const isDay = d => /^\d{4}-\d{2}-\d{2}$/.test(d);
// Today or yesterday (Toronto), so a run finished just before midnight still counts.
const recordable = d => { const now = Date.now(); return [C.dateKey(new Date(now)), C.dateKey(new Date(now - 864e5))].includes(d); };

async function stats(date, ids) {
  const r = await db.execute({ sql: "SELECT score, answers FROM ascent_scores WHERE day = ?", args: [date] });
  const scores = {}, picks = Object.fromEntries(ids.map(id => [id, {}]));
  for (const row of r.rows) {
    scores[row.score] = (scores[row.score] || 0) + 1;
    let answers = [];
    try { answers = JSON.parse(row.answers); } catch {}
    ids.forEach((id, i) => { if (typeof answers[i] === "string") picks[id][answers[i]] = (picks[id][answers[i]] || 0) + 1; });
  }
  return { date, players: r.rows.length, scores, picks };
}

module.exports = async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  res.setHeader("Cache-Control", "no-store");

  try {
    if (req.method === "GET") {
      const date = String(req.query.date || "");
      if (!isDay(date)) return res.status(400).json({ error: "Bad date" });
      await ensureAscent();
      return res.status(200).json(await stats(date, R.select(bank, date)));
    }
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const date = String(body.date || "");
    if (!isDay(date) || !recordable(date)) return res.status(400).json({ error: "Not a current ascent" });
    const ids = R.select(bank, date);
    if (!Array.isArray(body.answers) || body.answers.length !== ids.length) return res.status(400).json({ error: "Invalid run" });

    const answers = [];
    let score = 0;
    for (let i = 0; i < ids.length; i++) {
      const given = body.answers[i], q = bank.find(q => q.id === ids[i]);
      const a = typeof given === "string" ? q.answers.find(a => a.name === given) : null;
      if (given != null && !a) return res.status(400).json({ error: "Invalid run" });
      answers.push(a ? a.name : null);
      score += a ? C.points(a) : 0;
    }

    const who = guest(req, res, true);
    await ensureAscent();
    const ins = await db.execute({
      sql: "INSERT OR IGNORE INTO ascent_scores (day, guest, score, answers, created_at) VALUES (?, ?, ?, ?, ?)",
      args: [date, who, score, JSON.stringify(answers), Date.now()],
    });
    return res.status(200).json({ ...(await stats(date, ids)), score, recorded: ins.rowsAffected === 1 });
  } catch (e) {
    return res.status(500).json({ error: "Ascent stats unavailable" });
  }
};

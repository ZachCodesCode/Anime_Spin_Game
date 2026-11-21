// Anime Ascent player suggestions: a missing answer for one of the day's questions, or a new question idea.
// POST /api/suggest  { date, kind: "answer"|"question", questionId?, text }  -> { ok: true }
// GET  /api/suggest?key=SUGGEST_ADMIN_KEY[&day=YYYY-MM-DD]                 -> latest 500 suggestions (owner only)
// Rows live in the ascent_suggestions table in the same Turso database as the scores.
const { db, ensureSuggestions, ensureAscent, cors } = require("./_db.js");
const { guest, sameOrigin } = require("./_guest.js");
const C = require("../power-level/core.js");
const R = require("../power-level/run.js");
const D = require("../power-level/descent.js");
const bank = require("../power-level/questions.js");
const ascent = require("./_ascent-versioning").service({db,ensureAscent});

const isDay = d => /^\d{4}-\d{2}-\d{2}$/.test(d);
const recordable = d => { const now = Date.now(); return [C.dateKey(new Date(now)), C.dateKey(new Date(now - 864e5))].includes(d); };
const clean = s => String(s || "").replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim();
const PER_DAY = 1;

module.exports = async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  res.setHeader("Cache-Control", "no-store");
  try {
    if (req.method === "GET") {
      const key = process.env.SUGGEST_ADMIN_KEY;
      if (!key || String(req.query.key || "") !== key) return res.status(404).json({ error: "Not found" });
      await ensureSuggestions();
      const day = String(req.query.day || "");
      const r = isDay(day)
        ? await db.execute({ sql: "SELECT day, kind, question_id, text, created_at FROM ascent_suggestions WHERE day = ? ORDER BY created_at DESC LIMIT 500", args: [day] })
        : await db.execute("SELECT day, kind, question_id, text, created_at FROM ascent_suggestions ORDER BY created_at DESC LIMIT 500");
      const resolved=new Map();
      for(const row of r.rows)if(row.question_id&&!bank.some(q=>q.id===row.question_id)&&!resolved.has(row.day))resolved.set(row.day,(await ascent.resolve(row.day)).payload.questions);
      const prompt = (id,day) => (bank.find(q => q.id === id) || resolved.get(day)?.find(q=>q.id===id) || {}).text || null;
      return res.status(200).json(r.rows.map(x => ({ day: x.day, kind: x.kind, question: prompt(x.question_id,x.day), questionId: x.question_id, text: x.text, at: new Date(Number(x.created_at)).toISOString() })));
    }
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
    if (!sameOrigin(req)) return res.status(403).json({ error: "Forbidden" });

    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const date = String(body.date || ""), kind = String(body.kind || ""), text = clean(body.text);
    if (!isDay(date) || !recordable(date)) return res.status(400).json({ error: "Not a current ascent" });
    if (!["answer", "question"].includes(kind)) return res.status(400).json({ error: "Bad kind" });
    if (text.length < 2 || text.length > (kind === "answer" ? 80 : 200)) return res.status(400).json({ error: "Bad length" });
    let questionId = null;
    if (kind === "answer") {
      questionId = String(body.questionId || "");
      if (![...(await ascent.resolve(date)).payload.questionIds, ...D.select(bank, date)].includes(questionId)) return res.status(400).json({ error: "Bad question" });
    }

    const who = guest(req, res, true);
    await ensureSuggestions();
    const n = await db.execute({ sql: "SELECT COUNT(*) AS n FROM ascent_suggestions WHERE day = ? AND guest = ?", args: [date, who] });
    if (Number(n.rows[0].n) >= PER_DAY) return res.status(429).json({ error: "You've already sent today's suggestion. Thanks! Come back tomorrow.", done: true });
    await db.execute({
      sql: "INSERT INTO ascent_suggestions (day, guest, kind, question_id, text, created_at) VALUES (?, ?, ?, ?, ?, ?)",
      args: [date, who, kind, questionId, text, Date.now()],
    });
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: "Suggestions unavailable" });
  }
};

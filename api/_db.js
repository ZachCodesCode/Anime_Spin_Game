// Shared Turso client, table setup and CORS helper for the leaderboard API.
// Files in /api starting with "_" are NOT routes — just shared code.
const { createClient } = require("@libsql/client/web");

// Same Turso database as Grand Line Spin (same env vars), separate table.
const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// Create the table on first use so there's no manual SQL step (mirrors schema.sql).
let ready = null;
function ensureTable() {
  if (!ready) {
    ready = db.batch([
      `CREATE TABLE IF NOT EXISTS shonen_leaderboard (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         name TEXT NOT NULL,
         mode TEXT NOT NULL DEFAULT 'regular',
         rating INTEGER NOT NULL,
         win_pct INTEGER NOT NULL,
         verdict TEXT,
         ace TEXT,
         squad TEXT,
         created_at INTEGER NOT NULL
       )`,
      `CREATE INDEX IF NOT EXISTS idx_shonen_lb_mode_rating
         ON shonen_leaderboard (mode, rating DESC, created_at ASC)`,
    ], "write").catch(e => { ready = null; throw e; });
  }
  return ready;
}

// Anime Ascent: one row per player per day (score recomputed on the server, answers for pick rates).
let ascentReady = null;
function ensureAscent() {
  if (!ascentReady) {
    ascentReady = db.batch([
      `CREATE TABLE IF NOT EXISTS ascent_scores (
         day TEXT NOT NULL,
         guest TEXT NOT NULL,
         score INTEGER NOT NULL,
         answers TEXT NOT NULL,
         created_at INTEGER NOT NULL,
         PRIMARY KEY (day, guest)
       )`,
      `CREATE INDEX IF NOT EXISTS idx_ascent_day_score ON ascent_scores (day, score)`,
    ], "write").catch(e => { ascentReady = null; throw e; });
  }
  return ascentReady;
}

// Anime Descent: same shape as ascent_scores, one row per player per day.
let descentReady = null;
function ensureDescent() {
  if (!descentReady) {
    descentReady = db.batch([
      `CREATE TABLE IF NOT EXISTS descent_scores (
         day TEXT NOT NULL,
         guest TEXT NOT NULL,
         score INTEGER NOT NULL,
         answers TEXT NOT NULL,
         created_at INTEGER NOT NULL,
         PRIMARY KEY (day, guest)
       )`,
      `CREATE INDEX IF NOT EXISTS idx_descent_day_score ON descent_scores (day, score)`,
    ], "write").catch(e => { descentReady = null; throw e; });
  }
  return descentReady;
}

// Anime Ascent player suggestions (missing answers and question ideas), read by the owner via GET /api/suggest.
let suggestReady = null;
function ensureSuggestions() {
  if (!suggestReady) {
    suggestReady = db.batch([
      `CREATE TABLE IF NOT EXISTS ascent_suggestions (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         day TEXT NOT NULL,
         guest TEXT NOT NULL,
         kind TEXT NOT NULL,
         question_id TEXT,
         text TEXT NOT NULL,
         created_at INTEGER NOT NULL
       )`,
      `CREATE INDEX IF NOT EXISTS idx_ascent_suggest_day ON ascent_suggestions (day, guest)`,
    ], "write").catch(e => { suggestReady = null; throw e; });
  }
  return suggestReady;
}

// Permissive CORS so the game works same-origin (production) or from a local preview.
function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

module.exports = { db, ensureTable, ensureAscent, ensureDescent, ensureSuggestions, cors };

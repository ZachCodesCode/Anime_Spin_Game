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

// Permissive CORS so the game works same-origin (production) or from a local preview.
function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

module.exports = { db, ensureTable, cors };

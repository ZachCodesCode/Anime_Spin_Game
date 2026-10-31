-- Shonen Spin leaderboard. Lives in the same Turso database as Grand Line Spin
-- (its table is `leaderboard`; this one is separate).
-- The API runs these statements itself on first use, so running this file by hand
-- is optional. (CLI:  turso db shell <your-db> < schema.sql )
CREATE TABLE IF NOT EXISTS shonen_leaderboard (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT    NOT NULL,
  mode       TEXT    NOT NULL DEFAULT 'regular',  -- 'regular' | 'hard' (salary cap)
  rating     INTEGER NOT NULL,                    -- team rating, recomputed on the server
  win_pct    INTEGER NOT NULL,                    -- % chance vs the Villain Gauntlet
  verdict    TEXT,
  ace        TEXT,
  squad      TEXT,                                -- JSON array of the 8 fighters
  created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_shonen_lb_mode_rating
  ON shonen_leaderboard (mode, rating DESC, created_at ASC);

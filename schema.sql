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

-- Anime Ascent daily results: one row per player per day. The API scores runs itself (api/ascent.js)
-- and creates this table on first use.
CREATE TABLE IF NOT EXISTS ascent_scores (
  day        TEXT    NOT NULL,                    -- Toronto date, YYYY-MM-DD
  guest      TEXT    NOT NULL,                    -- hashed anonymous cookie id
  score      INTEGER NOT NULL,
  answers    TEXT    NOT NULL,                    -- JSON array of 5 answer names (null = skipped/timed out)
  created_at INTEGER NOT NULL,
  PRIMARY KEY (day, guest)
);
CREATE INDEX IF NOT EXISTS idx_ascent_day_score ON ascent_scores (day, score);

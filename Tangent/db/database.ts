import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("tangent.db");

export function initializeDatabase() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS articles (
      pageid INTEGER PRIMARY KEY,
      title TEXT NOT NULL,
      summary TEXT NOT NULL,
      image TEXT,
      url TEXT,
      cached_date TEXT NOT NULL,
      bookmarked INTEGER DEFAULT 0
    );
  `);
}
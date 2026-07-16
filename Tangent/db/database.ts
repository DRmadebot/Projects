import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("tangent.db");


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
  
  CREATE TABLE IF NOT EXISTS bookmarks (
    pageid INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    image TEXT,
    url TEXT,
    bookmarked_at TEXT NOT NULL
  );
`);



db.execSync(`
  DELETE FROM articles
  WHERE rowid NOT IN (
    SELECT MIN(rowid) FROM articles GROUP BY pageid
  );
`);

db.execSync(`
  CREATE UNIQUE INDEX IF NOT EXISTS idx_articles_pageid_unique ON articles(pageid);
`);

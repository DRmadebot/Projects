import type { Article } from "../services/types/article";
import { db } from "./database";

export function saveArticles(articles: Article[], cachedDate: string) {
  const statement = db.prepareSync(`
    INSERT OR REPLACE INTO articles
    (pageid, title, summary, image, url, cached_date)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  try {
    for (const article of articles) {
      statement.executeSync(
        article.pageid,
        article.title,
        article.summary,
        article.image ?? null,
        article.url,
        cachedDate
      );
    }
  } finally {
    statement.finalizeSync();
  }
}

export function getArticlesForDate(date: string): Article[] {
  return db.getAllSync<Article>(
    `
    SELECT *
    FROM articles
    WHERE cached_date = ?
    ORDER BY rowid
    `,
    [date]
  );
}

export function getExistingPageIds(pageids: number[]): Set<number> {
  if (pageids.length === 0) return new Set();

  // Build "?, ?, ?" placeholders matching the number of ids we're checking
  const placeholders = pageids.map(() => "?").join(", ");

  const rows = db.getAllSync<{ pageid: number }>(
    `SELECT pageid FROM articles WHERE pageid IN (${placeholders})`,
    pageids
  );

  return new Set(rows.map((r) => r.pageid));
}

export function getAllArticles(): Article[] {
  return db.getAllSync<Article>(`
    SELECT * FROM articles
  `);
}

export function clearArticles() {
  db.execSync(`
    DELETE FROM articles;
  `);
}
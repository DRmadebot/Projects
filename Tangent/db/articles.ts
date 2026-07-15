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
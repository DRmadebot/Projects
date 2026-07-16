import type { Article } from "../services/types/article";
import { db } from "./database";

export function addBookmark(article: Article) {
  db.runSync(
    `
    INSERT OR IGNORE INTO bookmarks
    (pageid, title, summary, image, url, bookmarked_at)
    VALUES (?, ?, ?, ?, ?, ?)
    `,
    article.pageid,
    article.title,
    article.summary,
    article.image ?? null,
    article.url ?? null,
    new Date().toISOString()
  );
}

export function removeBookmark(pageid: number) {
  db.runSync(
    `
    DELETE FROM bookmarks
    WHERE pageid = ?
    `,
    pageid
  );
}

export function isBookmarked(pageid: number): boolean {
  const result = db.getFirstSync<{ pageid: number }>(
    `
    SELECT pageid
    FROM bookmarks
    WHERE pageid = ?
    `,
    pageid
  );

  return result !== null;
}

export function getBookmarks(): Article[] {
  return db.getAllSync<Article>(`
    SELECT
      pageid,
      title,
      summary,
      image,
      url
    FROM bookmarks
    ORDER BY bookmarked_at DESC
  `);
}

export function getBookmarkedIds(): Set<number> {
  const rows = db.getAllSync<{ pageid: number }>(`
    SELECT pageid
    FROM bookmarks
  `);

  return new Set(rows.map((row) => row.pageid));
}
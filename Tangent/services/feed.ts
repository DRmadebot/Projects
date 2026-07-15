import { getArticlesForDate, saveArticles } from "../db/articles";
import { getTodayString } from "../utils/date";
import type { Article } from "./types/article";
import { fetchArticles } from "./wikipedia";

export async function getInitialFeed(count: number): Promise<Article[]> {
  const today = getTodayString();

  const cached = getArticlesForDate(today);

  if (cached.length >= count) {
    return cached.slice(0, count);
  }

  const fresh = await fetchArticles(count);

  saveArticles(fresh, today);

  return fresh;
}

export async function loadMore(count: number): Promise<Article[]>  {
    const articles = await fetchArticles(count);

    saveArticles(articles, getTodayString());

    return articles;
}
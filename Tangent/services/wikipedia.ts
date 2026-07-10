import type { Article } from "./types/article";

export const fetchRandomArticle = async (): Promise<Article> => {
  const response = await fetch(
    "https://en.wikipedia.org/api/rest_v1/page/random/summary",
    {
      headers: {
        "User-Agent": "Xikipedia/0.1",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch article");
  }

  const data = await response.json();

  return {
    title: data.title,
    summary: data.extract,
    image: data.thumbnail?.source,
  };
};


export const fetchArticles = async (count: number) => {
  const results = await Promise.allSettled(
    Array.from({ length: count }).map(() => fetchRandomArticle())
  );

  const fetchedArticles = results
    .filter(
      (r): r is PromiseFulfilledResult<Article> =>
        r.status === "fulfilled"
    )
    .map((r) => r.value);

  return fetchedArticles;
}
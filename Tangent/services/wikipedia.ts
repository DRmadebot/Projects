import type { Article } from "./types/article";

export const fetchRandomArticle = async (): Promise<Article> => {
  const response = await fetch(
    "https://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&grnlimit=1&prop=extracts|pageimages|info&exintro=1&explaintext=1&inprop=url&pithumbsize=600&format=json&origin=*",
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
    pageid: data.pageid,
    url: data.content_urls?.desktop?.page,
  };
};


export const fetchArticles = async (count: number): Promise<Article[]> => {
  try {
    return await fetchArticlesBatch(count);
  } catch {
    console.warn("Batch fetch failed, falling back to individual requests");
    return fetchArticlesSolo(count);
  }
};

const fetchArticlesSolo = async (count: number): Promise<Article[]> => {
  const results = await Promise.allSettled(
    Array.from({ length: count }).map(() => fetchRandomArticle())
  );

  return results
    .filter(
      (r): r is PromiseFulfilledResult<Article> =>
        r.status === "fulfilled"
    )
    .map((r) => r.value);
};

const fetchArticlesBatch = async (count: number): Promise<Article[]> => {
  const url = `https://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&grnlimit=${count}&prop=extracts|pageimages|info&exintro=1&explaintext=1&inprop=url&pithumbsize=600&format=json&origin=*`;

  const response = await fetch(url, { headers: { "User-Agent": "Xikipedia/0.1" } });
  if (!response.ok) throw new Error("Batch fetch failed");

  const data = await response.json();
  const pages = Object.values(data.query.pages) as any[];

  if (pages.length === 0) throw new Error("Batch fetch returned no pages");

  return pages.map((p) => ({
    pageid: p.pageid,
    title: p.title,
    summary: p.extract,
    image: p.thumbnail?.source,
    url: p.fullurl,
  }));
};
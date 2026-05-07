import { createClient } from "microcms-js-sdk";
import type { Article, Category, MicroCMSListResponse } from "@/types";

function getClient() {
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = process.env.MICROCMS_API_KEY;
  if (!serviceDomain) throw new Error("MICROCMS_SERVICE_DOMAIN is not defined");
  if (!apiKey) throw new Error("MICROCMS_API_KEY is not defined");
  return createClient({ serviceDomain, apiKey });
}

const client = {
  getList: <T>(...args: Parameters<ReturnType<typeof getClient>["getList"]>) =>
    getClient().getList<T>(...args),
  get: <T>(...args: Parameters<ReturnType<typeof getClient>["get"]>) =>
    getClient().get<T>(...args),
};

const PER_PAGE = 12;

// 記事一覧取得
export const getArticles = async (queries?: {
  offset?: number;
  limit?: number;
  categoryId?: string;
  q?: string;
}): Promise<MicroCMSListResponse<Article>> => {
  return client.getList<Article>({
    endpoint: "articles",
    queries: {
      limit: queries?.limit ?? PER_PAGE,
      offset: queries?.offset ?? 0,
      filters: queries?.categoryId
        ? `category[equals]${queries.categoryId}`
        : undefined,
      q: queries?.q,
    },
  });
};

// 記事詳細取得（IDで）
export const getArticleById = async (id: string): Promise<Article> => {
  return client.get<Article>({ endpoint: "articles", contentId: id });
};

// 記事詳細取得（slugで）
export const getArticleBySlug = async (slug: string): Promise<Article> => {
  const res = await client.getList<Article>({
    endpoint: "articles",
    queries: { filters: `slug[equals]${slug}`, limit: 1 },
  });
  if (res.contents.length === 0) throw new Error(`Article not found: ${slug}`);
  return res.contents[0];
};

// カテゴリ一覧取得
export const getCategories = async (): Promise<
  MicroCMSListResponse<Category>
> => {
  return client.getList<Category>({
    endpoint: "categories",
    queries: { limit: 100 },
  });
};

// カテゴリ詳細取得
export const getCategoryBySlug = async (slug: string): Promise<Category> => {
  const res = await client.getList<Category>({
    endpoint: "categories",
    queries: { filters: `slug[equals]${slug}`, limit: 1 },
  });
  if (res.contents.length === 0) throw new Error(`Category not found: ${slug}`);
  return res.contents[0];
};

// 全記事のslug一覧（静的生成用）
export const getAllArticleSlugs = async (): Promise<string[]> => {
  const res = await client.getList<Article>({
    endpoint: "articles",
    queries: { fields: "slug", limit: 1000 },
  });
  return res.contents.map((a) => a.slug);
};

export { PER_PAGE };

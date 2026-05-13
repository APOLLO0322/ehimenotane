import { createClient } from "microcms-js-sdk";
import type { Article, Category, Tag, Area, Client, MicroCMSListResponse } from "@/types";

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

export const PER_PAGE = 12;

// ─── 記事 ────────────────────────────────────────────

export const getArticles = async (queries?: {
  offset?: number;
  limit?: number;
  tagId?: string;
  q?: string;
}): Promise<MicroCMSListResponse<Article>> => {
  const filters: string[] = [];
  if (queries?.tagId) filters.push(`tags[contains]${queries.tagId}`);

  return client.getList<Article>({
    endpoint: "articles",
    queries: {
      limit: queries?.limit ?? PER_PAGE,
      offset: queries?.offset ?? 0,
      filters: filters.length > 0 ? filters.join("[and]") : undefined,
      q: queries?.q,
      depth: 2,
    },
  });
};

// 過去 N 日以内の記事を全件取得（hero フラグで分類して使う）
export const getRecentArticles = async (limitDays = 30): Promise<Article[]> => {
  const since = new Date(Date.now() - limitDays * 24 * 60 * 60 * 1000).toISOString();
  const res = await client.getList<Article>({
    endpoint: "articles",
    queries: {
      filters: `createdAt[greater_than]${since}`,
      limit: 50,
      depth: 2,
    },
  });
  return res.contents;
};

// feature = true の記事を全件取得
export const getFeatureArticles = async (): Promise<Article[]> => {
  const res = await client.getList<Article>({
    endpoint: "articles",
    queries: { filters: "feature[equals]true", limit: 100, depth: 2 },
  });
  return res.contents;
};

// slug で記事取得
export const getArticleBySlug = async (slug: string): Promise<Article> => {
  const res = await client.getList<Article>({
    endpoint: "articles",
    queries: { filters: `slug[equals]${slug}`, limit: 1, depth: 2 },
  });
  if (res.contents.length === 0) throw new Error(`Article not found: ${slug}`);
  return res.contents[0];
};

// contentId で記事取得（プレビュー用）
export const getArticleByContentId = async (
  contentId: string,
  draftKey?: string
): Promise<Article> => {
  return client.get<Article>({
    endpoint: "articles",
    contentId,
    queries: {
      ...(draftKey ? { draftKey } : {}),
      depth: 2,
    },
  });
};

// 全記事の slug 一覧（静的生成用）
export const getAllArticleSlugs = async (): Promise<string[]> => {
  const res = await client.getList<Article>({
    endpoint: "articles",
    queries: { fields: "slug", limit: 1000 },
  });
  return res.contents.map((a) => a.slug).filter(Boolean);
};

// ─── カテゴリ ─────────────────────────────────────────

export const getCategories = async (): Promise<MicroCMSListResponse<Category>> => {
  return client.getList<Category>({
    endpoint: "categories",
    queries: { limit: 100, orders: "order" },
  });
};

export const getCategoryBySlug = async (slug: string): Promise<Category> => {
  const res = await client.getList<Category>({
    endpoint: "categories",
    queries: { filters: `slug[equals]${slug}`, limit: 1 },
  });
  if (res.contents.length === 0) throw new Error(`Category not found: ${slug}`);
  return res.contents[0];
};

// ─── タグ ─────────────────────────────────────────────

export const getTags = async (): Promise<MicroCMSListResponse<Tag>> => {
  return client.getList<Tag>({
    endpoint: "tags",
    queries: { limit: 200 },
  });
};

// ─── エリア ───────────────────────────────────────────

export const getAreas = async (): Promise<MicroCMSListResponse<Area>> => {
  return client.getList<Area>({
    endpoint: "areas",
    queries: { limit: 100, orders: "order" },
  });
};

// ─── クライアント ──────────────────────────────────────

export const getClients = async (): Promise<MicroCMSListResponse<Client>> => {
  return client.getList<Client>({
    endpoint: "clients",
    queries: { limit: 200, depth: 2 },
  });
};

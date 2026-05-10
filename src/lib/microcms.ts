import { createClient } from "microcms-js-sdk";
import type {
  Article,
  Category,
  Tag,
  Area,
  MicroCMSListResponse,
} from "@/types";

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
  categoryId?: string;
  areaId?: string;
  tagId?: string;
  q?: string;
}): Promise<MicroCMSListResponse<Article>> => {
  const filters: string[] = [];
  if (queries?.categoryId) filters.push(`category[equals]${queries.categoryId}`);
  if (queries?.areaId) filters.push(`area[equals]${queries.areaId}`);
  if (queries?.tagId) filters.push(`tags[contains]${queries.tagId}`);

  return client.getList<Article>({
    endpoint: "articles",
    queries: {
      limit: queries?.limit ?? PER_PAGE,
      offset: queries?.offset ?? 0,
      filters: filters.length > 0 ? filters.join("[and]") : undefined,
      q: queries?.q,
    },
  });
};

// hero フラグが true の記事（ヒーローエリア用）
export const getHeroArticles = async (): Promise<Article[]> => {
  const res = await client.getList<Article>({
    endpoint: "articles",
    queries: { filters: "hero[equals]true", limit: 3 },
  });
  return res.contents;
};

// pickup 用（最新記事）
export const getPickupArticles = async (limit = 3): Promise<Article[]> => {
  const res = await client.getList<Article>({
    endpoint: "articles",
    queries: { limit },
  });
  return res.contents;
};

export const getArticleBySlug = async (slug: string): Promise<Article> => {
  const res = await client.getList<Article>({
    endpoint: "articles",
    queries: { filters: `slug[equals]${slug}`, limit: 1 },
  });
  if (res.contents.length === 0) throw new Error(`Article not found: ${slug}`);
  return res.contents[0];
};

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

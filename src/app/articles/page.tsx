import { getArticles, getCategories } from "@/lib/microcms";
import ArticleCard from "@/components/articles/ArticleCard";
import Link from "next/link";

export const revalidate = 60;

export const metadata = {
  title: "記事一覧 | エヒメノタネ",
  description: "愛媛の食・人・暮らし・自然に関する記事一覧です。",
};

type Props = {
  searchParams: Promise<{ category?: string; page?: string }>;
};

export default async function ArticlesPage({ searchParams }: Props) {
  const { category, page } = await searchParams;
  const currentPage = Math.max(1, Number(page ?? 1));
  const offset = (currentPage - 1) * 12;

  const [articlesRes, categoriesRes] = await Promise.all([
    getArticles({ offset }).catch(() => ({
      contents: [],
      totalCount: 0,
      offset: 0,
      limit: 12,
    })),
    getCategories().catch(() => ({ contents: [], totalCount: 0, offset: 0, limit: 100 })),
  ]);

  const { contents: articles, totalCount } = articlesRes;
  const { contents: categories } = categoriesRes;
  const totalPages = Math.ceil(totalCount / 12);

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-stone-800 mb-2">記事一覧</h1>
      <p className="text-sm text-stone-400 mb-8">全 {totalCount} 件</p>

      {/* カテゴリフィルター */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href="/articles"
            className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
              !category
                ? "bg-[#9dc926] text-white border-[#9dc926]"
                : "border-stone-200 text-stone-600 hover:border-[#9dc926] hover:text-[#9dc926]"
            }`}
          >
            すべて
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/articles?category=${cat.id}`}
              className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                category === cat.id
                  ? "bg-[#9dc926] text-white border-[#9dc926]"
                  : "border-stone-200 text-stone-600 hover:border-[#9dc926] hover:text-[#9dc926]"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      )}

      {/* 記事グリッド */}
      {articles.length === 0 ? (
        <p className="text-center text-stone-400 py-20">記事がありません。</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}

      {/* ページネーション */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-12">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/articles?${category ? `category=${category}&` : ""}page=${p}`}
              className={`w-9 h-9 flex items-center justify-center rounded-full text-sm transition-colors ${
                p === currentPage
                  ? "bg-[#9dc926] text-white"
                  : "border border-stone-200 text-stone-600 hover:border-[#9dc926] hover:text-[#9dc926]"
              }`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}

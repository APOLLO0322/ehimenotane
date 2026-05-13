import Link from "next/link";
import { getArticles } from "@/lib/microcms";
import ArticleCard from "@/components/articles/ArticleCard";

export const revalidate = 60;

type Props = {
  searchParams: Promise<{ genre?: string; area?: string; q?: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const { genre, area, q } = await searchParams;

  const { contents: allArticles } = await getArticles({ limit: 100, q }).catch(() => ({
    contents: [],
  }));

  // genre / area はネスト参照のためサーバー側でフィルタ
  const articles = allArticles.filter((a) => {
    if (genre && a.client?.categories?.name !== genre) return false;
    if (area && a.client?.areas?.name !== area) return false;
    return true;
  });

  const label = genre ?? area ?? (q ? `"${q}"` : null);

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      {/* ヘッダー */}
      <div className="mb-8">
        <Link href="/" className="text-xs text-stone-400 hover:text-[#9dc926] transition-colors">
          ← TOPに戻る
        </Link>
        <h1 className="text-2xl font-bold text-stone-800 mt-3">
          {label ? (
            <>
              <span className="text-[#9dc926]">{label}</span>
              <span className="text-lg font-normal text-stone-500 ml-2">の記事一覧</span>
            </>
          ) : (
            "検索結果"
          )}
        </h1>
        <p className="text-sm text-stone-400 mt-1">{articles.length} 件</p>
      </div>

      {/* 結果 */}
      {articles.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-stone-400 text-sm">該当する記事が見つかりませんでした。</p>
          <Link
            href="/"
            className="inline-block mt-6 text-sm text-[#9dc926] border border-[#9dc926] px-6 py-2 rounded-full hover:bg-[#9dc926] hover:text-white transition-colors"
          >
            TOPに戻る
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </main>
  );
}

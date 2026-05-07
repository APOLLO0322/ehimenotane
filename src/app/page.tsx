import { getArticles } from "@/lib/microcms";
import ArticleCard from "@/components/article/ArticleCard";
import Link from "next/link";

export const revalidate = 60;

export default async function Home() {
  let articles: import("@/types").Article[] = [];
  let totalCount = 0;
  try {
    const res = await getArticles({ limit: 9 });
    articles = res.contents;
    totalCount = res.totalCount;
  } catch {
    // microCMSが未設定の場合は空表示
  }

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-b from-emerald-50 to-white py-16 px-4 text-center">
        <p className="text-emerald-600 text-sm tracking-widest mb-3">
          愛媛の魅力を種のように
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-stone-800">
          エヒメノタネ
        </h1>
        <p className="text-stone-500 mt-4 max-w-md mx-auto text-sm leading-relaxed">
          愛媛の食・人・暮らし・自然をひろい、
          <br />
          あなたの心に小さな種を届けます。
        </p>
      </section>

      {/* 記事一覧 */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-xl font-bold text-stone-700 mb-8">
          最新の記事
          <span className="text-sm font-normal text-stone-400 ml-3">
            全 {totalCount} 件
          </span>
        </h2>

        {articles.length === 0 ? (
          <p className="text-center text-stone-400 py-20">
            まだ記事がありません。
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}

        {totalCount > 9 && (
          <div className="text-center mt-12">
            <Link
              href="/articles"
              className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-full text-sm hover:bg-emerald-700 transition-colors"
            >
              記事をもっと見る
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}

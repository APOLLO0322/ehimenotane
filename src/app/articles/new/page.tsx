import { getRecentArticles } from "@/lib/microcms";
import ArticleCard from "@/components/articles/ArticleCard";

export const revalidate = 60;

export const metadata = {
  title: "新着記事 | エヒメノタネ",
  description: "エヒメノタネの新着記事一覧です。",
};

export default async function NewArticlesPage() {
  const articles = await getRecentArticles(30).catch(() => []);

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-stone-800 mb-2">新着記事</h1>
      <p className="text-sm text-stone-400 mb-8">{articles.length} 件</p>

      {articles.length === 0 ? (
        <p className="text-center text-stone-400 py-20">新着記事はありません。</p>
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

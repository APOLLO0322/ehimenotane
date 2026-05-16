import { getArticles } from "@/lib/microcms";
import ArticleCard from "@/components/articles/ArticleCard";
import Link from "next/link";

export const revalidate = 60;

export const metadata = {
  title: "記事一覧 | ヒメタネ",
  description: "愛媛の食・人・暮らし・自然に関する記事一覧です。",
};

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export default async function ArticlesPage({ searchParams }: Props) {
  const { category } = await searchParams;

  const { contents: allArticles } = await getArticles({ limit: 100 }).catch(() => ({
    contents: [],
  }));

  // 記事が存在するカテゴリを抽出（登録順ではなく記事内の出現順）
  const activeCategoryMap = new Map<string, string>(); // name → name
  for (const a of allArticles) {
    const name = a.client?.categories?.name;
    if (name) activeCategoryMap.set(name, name);
  }
  const activeCategories = [...activeCategoryMap.keys()];

  // カテゴリフィルタ
  const filtered = category
    ? allArticles.filter((a) => a.client?.categories?.name === category)
    : allArticles;

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-stone-800 mb-2">記事一覧</h1>
      <p className="text-sm text-stone-400 mb-8">{filtered.length} 件</p>

      {/* カテゴリフィルター */}
      {activeCategories.length > 0 && (
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
          {activeCategories.map((name) => (
            <Link
              key={name}
              href={`/articles?category=${encodeURIComponent(name)}`}
              className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                category === name
                  ? "bg-[#9dc926] text-white border-[#9dc926]"
                  : "border-stone-200 text-stone-600 hover:border-[#9dc926] hover:text-[#9dc926]"
              }`}
            >
              {name}
            </Link>
          ))}
        </div>
      )}

      {/* 記事グリッド */}
      {filtered.length === 0 ? (
        <p className="text-center text-stone-400 py-20">記事がありません。</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </main>
  );
}

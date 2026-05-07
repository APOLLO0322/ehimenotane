import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getCategoryBySlug,
  getArticles,
  getCategories,
} from "@/lib/microcms";
import ArticleCard from "@/components/article/ArticleCard";

export const revalidate = 60;
export const dynamicParams = true;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const { contents } = await getCategories();
    return contents.map((cat) => ({ slug: cat.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const category = await getCategoryBySlug(slug);
    return {
      title: `${category.name}の記事一覧 | エヒメノタネ`,
    };
  } catch {
    return { title: "カテゴリが見つかりません" };
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  let category;
  try {
    category = await getCategoryBySlug(slug);
  } catch {
    notFound();
  }

  const { contents: articles, totalCount } = await getArticles({
    categoryId: category.id,
    limit: 12,
  });

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <nav className="text-sm text-stone-400 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-emerald-700 transition-colors">
          トップ
        </Link>
        <span>/</span>
        <span className="text-stone-600">{category.name}</span>
      </nav>

      <h1 className="text-2xl font-bold text-stone-800">
        {category.name}
        <span className="text-sm font-normal text-stone-400 ml-3">
          全 {totalCount} 件
        </span>
      </h1>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {articles.length === 0 && (
        <p className="text-center text-stone-400 py-20">
          まだ記事がありません。
        </p>
      )}
    </main>
  );
}

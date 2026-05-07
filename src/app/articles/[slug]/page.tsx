import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllArticleSlugs, getArticleBySlug } from "@/lib/microcms";

export const revalidate = 60;
export const dynamicParams = true;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const slugs = await getAllArticleSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const article = await getArticleBySlug(slug);
    return {
      title: `${article.title} | エヒメノタネ`,
      description: article.description,
      openGraph: {
        title: article.title,
        description: article.description,
        images: article.eyecatch ? [{ url: article.eyecatch.url }] : [],
      },
    };
  } catch {
    return { title: "記事が見つかりません | エヒメノタネ" };
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  let article;
  try {
    article = await getArticleBySlug(slug);
  } catch {
    notFound();
  }

  const publishedDate = new Date(article.publishedAt).toLocaleDateString(
    "ja-JP",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      {/* パンくず */}
      <nav className="text-sm text-stone-400 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-emerald-700 transition-colors">
          トップ
        </Link>
        <span>/</span>
        {article.category && (
          <>
            <Link
              href={`/category/${article.category.slug}`}
              className="hover:text-emerald-700 transition-colors"
            >
              {article.category.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-stone-600 line-clamp-1">{article.title}</span>
      </nav>

      {/* カテゴリ・タイトル */}
      {article.category && (
        <Link
          href={`/category/${article.category.slug}`}
          className="inline-block bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full mb-4 hover:bg-emerald-200 transition-colors"
        >
          {article.category.name}
        </Link>
      )}
      <h1 className="text-2xl md:text-3xl font-bold text-stone-800 leading-snug">
        {article.title}
      </h1>

      <time className="text-sm text-stone-400 mt-3 block">{publishedDate}</time>

      {/* アイキャッチ */}
      {article.eyecatch && (
        <div className="relative aspect-[16/9] mt-8 rounded-2xl overflow-hidden">
          <Image
            src={article.eyecatch.url}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* 本文 */}
      <article
        className="prose prose-stone prose-sm md:prose-base max-w-none mt-10
          prose-headings:font-bold prose-headings:text-stone-800
          prose-a:text-emerald-700 prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-xl"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* 著者 */}
      {article.author && (
        <div className="mt-12 p-6 bg-stone-50 rounded-2xl flex gap-4 items-start">
          {article.author.avatar && (
            <Image
              src={article.author.avatar.url}
              alt={article.author.name}
              width={56}
              height={56}
              className="rounded-full object-cover"
            />
          )}
          <div>
            <p className="font-bold text-stone-700">{article.author.name}</p>
            <p className="text-sm text-stone-500 mt-1">{article.author.profile}</p>
          </div>
        </div>
      )}

      <div className="mt-12 text-center">
        <Link
          href="/"
          className="inline-block text-sm text-emerald-700 border border-emerald-200 px-6 py-2 rounded-full hover:bg-emerald-50 transition-colors"
        >
          ← トップに戻る
        </Link>
      </div>
    </main>
  );
}

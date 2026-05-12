import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleByContentId } from "@/lib/microcms";
import ArticleSections from "@/components/articles/ArticleSections";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ contentId?: string; draftKey?: string }>;
};

export default async function PreviewPage({ searchParams }: Props) {
  const { contentId, draftKey } = await searchParams;

  if (!contentId) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-stone-500">contentId が指定されていません。</p>
      </main>
    );
  }

  let article;
  try {
    article = await getArticleByContentId(contentId, draftKey);
  } catch {
    notFound();
  }

  const publishedDate = new Date(article.publishedAt ?? article.createdAt ?? "").toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const areaName = article.client?.areas?.name;
  const categoryName = article.client?.categories?.name;

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      {/* 下書きプレビューバナー */}
      <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 text-sm px-4 py-3 rounded-xl mb-8 text-center font-medium">
        これは下書きプレビューです。公開前の内容を確認しています。
      </div>

      {/* パンくず */}
      <nav className="text-xs text-stone-400 mb-6 flex flex-wrap items-center gap-1.5">
        <Link href="/" className="hover:text-[#9dc926] transition-colors">トップ</Link>
        <span>/</span>
        <Link href="/articles" className="hover:text-[#9dc926] transition-colors">記事一覧</Link>
        <span>/</span>
        <span className="text-stone-600 line-clamp-1">{article.title}</span>
      </nav>

      {/* カテゴリ */}
      {categoryName && (
        <span className="inline-block bg-[#9dc926] text-white text-xs px-3 py-1 rounded-full mb-4">
          {categoryName}
        </span>
      )}

      {/* タイトル */}
      <h1 className="text-2xl md:text-3xl font-bold text-stone-800 leading-snug">
        {article.title}
      </h1>

      {/* メタ情報 */}
      <div className="flex flex-wrap items-center gap-3 mt-3">
        <time className="text-xs text-stone-400">{publishedDate}</time>
        {areaName && (
          <span className="text-xs text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
            📍 {areaName}
          </span>
        )}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {article.tags.map((tag) => (
              <span
                key={tag.id}
                className="text-xs text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* アイキャッチ */}
      {article.eyecatch && (
        <div className="relative aspect-[16/9] mt-8 rounded-2xl overflow-hidden">
          <Image
            src={article.eyecatch.url}
            alt={article.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
      )}

      {/* 記事セクション */}
      <ArticleSections sections={article.articleSections ?? []} />

      {/* クライアント情報 */}
      {article.client && (
        <aside className="mt-14 p-6 bg-stone-50 rounded-2xl border border-stone-100">
          <h2 className="text-sm font-bold text-stone-500 mb-4 tracking-wider">店舗情報</h2>
          <div className="flex-1 space-y-1.5">
            <p className="font-bold text-stone-800">{article.client.name}</p>
            {areaName && (
              <p className="text-xs text-stone-500">📍 エリア: {areaName}</p>
            )}
            {article.client.address && (
              <p className="text-xs text-stone-500">📍 {article.client.address}</p>
            )}
            {article.client.operatingDays && (
              <p className="text-xs text-stone-500">🕐 {article.client.operatingDays}</p>
            )}
            <div className="flex gap-3 mt-2">
              {article.client.googleMapUrl && (
                <a
                  href={article.client.googleMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#9dc926] hover:underline"
                >
                  Google Map
                </a>
              )}
              {article.client.websiteUrl && (
                <a
                  href={article.client.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#9dc926] hover:underline"
                >
                  公式サイト
                </a>
              )}
              {article.client.instagramUrl && (
                <a
                  href={article.client.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#9dc926] hover:underline"
                >
                  Instagram
                </a>
              )}
            </div>
          </div>
        </aside>
      )}
    </main>
  );
}

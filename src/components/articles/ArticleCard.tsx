import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types";

type Props = {
  article: Article;
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ArticleCard({ article }: Props) {
  const categoryName = article.client?.categories?.name;
  const areaName = article.client?.areas?.name;

  return (
    <Link
      href={article.slug ? `/articles/${article.slug}` : "#"}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-stone-100"
    >
      {/* アイキャッチ */}
      <div className="relative aspect-[16/9] overflow-hidden bg-stone-100">
        {article.eyecatch ? (
          <Image
            src={article.eyecatch.url}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl text-stone-300">
            🌱
          </div>
        )}
        {categoryName && (
          <span className="absolute top-3 left-3 bg-[#9dc926] text-white text-xs px-2.5 py-1 rounded-full">
            {categoryName}
          </span>
        )}
      </div>

      {/* テキスト */}
      <div className="p-4">
        <h2 className="font-bold text-stone-800 text-sm leading-snug line-clamp-2 group-hover:text-[#9dc926] transition-colors">
          {article.title}
        </h2>

        {(article.client?.name || areaName) && (
          <div className="flex items-center gap-2 mt-2">
            {article.client?.name && (
              <span className="text-xs font-medium text-stone-700 bg-stone-100 px-2 py-0.5 rounded-md">
                {article.client.name}
              </span>
            )}
            {areaName && (
              <span className="text-xs text-stone-400">📍 {areaName}</span>
            )}
          </div>
        )}

        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag.id}
                className="text-[10px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}

        <time className="text-xs text-stone-400 mt-3 block">
          {formatDate(article.publishedAt ?? article.createdAt ?? "")}
        </time>
      </div>
    </Link>
  );
}

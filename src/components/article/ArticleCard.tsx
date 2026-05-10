import Image from "next/image";
import Link from "next/link";
import { Article } from "@/types";

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
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-stone-100"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        {article.eyecatch ? (
          <Image
            src={article.eyecatch.url}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-emerald-50 flex items-center justify-center">
            <span className="text-emerald-300 text-4xl">🌱</span>
          </div>
        )}
        {article.category && (
          <span className="absolute top-3 left-3 bg-emerald-600 text-white text-xs px-2 py-1 rounded-full">
            {article.category.name}
          </span>
        )}
      </div>

      <div className="p-4">
        <h2 className="font-bold text-stone-800 text-base leading-snug line-clamp-2 group-hover:text-emerald-700 transition-colors">
          {article.title}
        </h2>
        {article.category && (
          <p className="text-xs text-stone-400 mt-1">{article.category.name}</p>
        )}
        <time className="text-xs text-stone-400 mt-3 block">
          {formatDate(article.publishedAt)}
        </time>
      </div>
    </Link>
  );
}

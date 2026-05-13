"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { Article } from "@/types";

type Props = {
  pool: Article[];
};

const PLACEHOLDER_COLORS = ["#b8d980", "#9cc860"];

function pick2(pool: Article[]): Article[] {
  if (pool.length <= 2) return pool;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 2);
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function PickupTwoColumn({ pool }: Props) {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    setArticles(pick2(pool));
    if (pool.length <= 2) return;
    const timer = setInterval(() => {
      setArticles(pick2(pool));
    }, 20_000);
    return () => clearInterval(timer);
  }, [pool]);

  if (articles.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {articles.map((article, i) => (
        <Link
          key={article.id}
          href={article.slug ? `/articles/${article.slug}` : "#"}
          className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-stone-100"
        >
          <div className="relative aspect-[16/9] overflow-hidden">
            {article.eyecatch ? (
              <Image
                src={article.eyecatch.url}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-4xl"
                style={{ backgroundColor: PLACEHOLDER_COLORS[i % 2] }}
              >
                🌿
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-bold text-stone-800 text-sm leading-snug line-clamp-2 group-hover:text-[#9dc926] transition-colors">
              {article.title}
            </h3>
            <time className="text-xs text-stone-400 mt-2 block">
              {formatDate(article.publishedAt ?? article.createdAt ?? "")}
            </time>
          </div>
        </Link>
      ))}
    </div>
  );
}

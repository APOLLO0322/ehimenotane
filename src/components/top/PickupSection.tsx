import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types";
import PickupTwoColumn from "./PickupTwoColumn";

type Props = {
  heroArticle: Article | null;
  pickupPool: Article[];
};

function truncate(text: string, max = 100): string {
  return text.length > max ? text.slice(0, max) + "…" : text;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function PickupSection({ heroArticle, pickupPool }: Props) {
  const section = heroArticle?.articleSections?.[0];
  const wideImage = section?.image2?.[0] ?? heroArticle?.eyecatch ?? null;
  const wideHeading = section?.heading2 ?? heroArticle?.title ?? "";
  const wideText = section?.text2 ? truncate(section.text2, 100) : "";
  const categoryName = heroArticle?.client?.categories?.name;

  return (
    <section className="max-w-5xl mx-auto px-4 pt-10 pb-14">
      {/* タイトル：ワイドカードに少しかぶせる */}
      <h2
        className="relative z-10 text-[#9dc926] leading-none mb-[-3rem] pl-1"
        style={{
          fontFamily: "var(--font-ms-madi), cursive",
          fontSize: "clamp(4rem, 10vw, 7rem)",
          transform: "rotate(-8deg)",
          transformOrigin: "left center",
        }}
      >
        Pick Up
      </h2>

      {/* ワイドカード（hero記事） */}
      {heroArticle ? (
        <Link
          href={heroArticle.slug ? `/articles/${heroArticle.slug}` : "#"}
          className="group relative flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-stone-100 mb-6"
        >
          <div className="relative w-full md:w-[420px] aspect-[16/9] md:aspect-auto md:h-56 flex-shrink-0">
            {wideImage ? (
              <Image
                src={wideImage.url}
                alt={wideHeading}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-5xl bg-[#d4e8a0]">
                🍊
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center p-6 md:p-8">
            {categoryName && (
              <span className="inline-block bg-[#9dc926] text-white text-xs px-3 py-1 rounded-full mb-3 w-fit">
                {categoryName}
              </span>
            )}
            <h3 className="text-lg font-bold text-stone-800 leading-snug group-hover:text-[#9dc926] transition-colors font-[family-name:var(--font-noto-serif-jp)]">
              {wideHeading}
            </h3>
            {wideText && (
              <p className="text-stone-500 text-sm mt-2 line-clamp-3">{wideText}</p>
            )}
            <time className="text-xs text-stone-400 mt-3">
              {formatDate(heroArticle.publishedAt ?? heroArticle.createdAt ?? "")}
            </time>
          </div>
        </Link>
      ) : (
        /* ダミーワイドカード */
        <div className="relative flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 mb-6 opacity-60">
          <div className="relative w-full md:w-[420px] aspect-[16/9] md:aspect-auto md:h-56 flex-shrink-0 bg-[#d4e8a0] flex items-center justify-center text-5xl">
            🍊
          </div>
          <div className="flex flex-col justify-center p-6 md:p-8">
            <span className="inline-block bg-stone-200 text-stone-400 text-xs px-3 py-1 rounded-full mb-3 w-fit">
              カテゴリ
            </span>
            <p className="text-stone-400 text-lg font-bold">記事を準備中です</p>
            <p className="text-stone-300 text-sm mt-2">もうすぐ公開予定！</p>
          </div>
        </div>
      )}

      {/* 2カラム（非heroからランダム・1分シャッフル） */}
      <PickupTwoColumn pool={pickupPool} />

      <div className="text-center mt-10">
        <Link href="/articles" className="btn-terracotta">
          記事一覧を見る
        </Link>
      </div>
    </section>
  );
}

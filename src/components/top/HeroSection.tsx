import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types";

type Props = {
  article: Article | null;
};

export default function HeroSection({ article }: Props) {
  if (!article) {
    return (
      <section className="relative w-full h-[480px] md:h-[560px] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #9dc926 0%, #a8d44a 40%, #c8e87a 60%, #e8f5b0 80%, #f5f0d8 100%)",
          }}
        />
        <div className="absolute right-0 top-0 w-1/2 h-full hidden md:flex items-center justify-center">
          <div className="w-72 h-72 rounded-full bg-white/20 flex items-center justify-center text-8xl">
            🍊
          </div>
        </div>
        <div className="absolute inset-0 flex">
          <div
            className="relative flex flex-col justify-center px-10 md:px-16 w-full md:w-[55%]"
            style={{
              background:
                "linear-gradient(to right, rgba(157,201,38,0.95) 65%, rgba(157,201,38,0) 100%)",
            }}
          >
            <p className="text-white/90 text-xs tracking-[0.3em] mb-3 font-medium uppercase">
              Ehime no Tane
            </p>
            <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight drop-shadow-sm font-[family-name:var(--font-noto-serif-jp)]">
              幸せな小さな
              <br />
              タネをさがして
            </h1>
            <p className="text-white/90 text-sm mt-4 leading-relaxed max-w-xs">
              愛媛で出会える、おいしいもの、すてきな人、
              <br />
              ここにしかない暮らしのタネを届けます。
            </p>
            <Link
              href="/articles"
              className="mt-7 inline-flex items-center gap-2 bg-white text-[#9dc926] text-sm font-bold px-7 py-3 rounded-full w-fit hover:bg-green-50 transition-colors shadow-md"
            >
              記事を見る →
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const heading1 = article.articleSections?.[0]?.heading1 ?? article.title;
  const categoryName = article.client?.categories?.name;

  return (
    <section className="relative w-full h-[480px] md:h-[560px] overflow-hidden">
      {/* 背景eyecatch */}
      {article.eyecatch ? (
        <Image
          src={article.eyecatch.url}
          alt={heading1}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #9dc926 0%, #c8e87a 60%, #f5f0d8 100%)",
          }}
        />
      )}

      {/* 暗めオーバーレイ */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-transparent" />

      {/* テキストエリア */}
      <div className="absolute inset-0 flex flex-col justify-end md:justify-center px-8 md:px-16 pb-12 md:pb-0">
        <div className="max-w-lg">
          {categoryName && (
            <span className="inline-block bg-[#9dc926] text-white text-xs px-3 py-1 rounded-full mb-4">
              {categoryName}
            </span>
          )}
          <h2 className="text-white text-2xl md:text-4xl font-bold leading-snug drop-shadow-md line-clamp-2 font-[family-name:var(--font-noto-serif-jp)]">
            {heading1}
          </h2>
          <Link
            href={article.slug ? `/articles/${article.slug}` : "#"}
            className="mt-7 inline-flex items-center gap-2 bg-white text-[#9dc926] text-sm font-bold px-7 py-3 rounded-full w-fit hover:bg-green-50 transition-colors shadow-md"
          >
            記事を読む →
          </Link>
        </div>
      </div>
    </section>
  );
}

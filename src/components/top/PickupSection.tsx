import Image from "next/image";
import Link from "next/link";
import { Article } from "@/types";

type DummyArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  category: { name: string };
  eyecatch: null;
};

const DUMMY_ARTICLES: DummyArticle[] = [
  {
    id: "dummy-1",
    slug: "#",
    title: "松山で見つけた、地元に愛されるベーカリーの朝",
    excerpt: "早朝から香ばしい匂いが漂う小さなパン屋さん。地元の素材にこだわったパンは毎朝完売するほどの人気です。",
    publishedAt: "2026-05-01T00:00:00.000Z",
    category: { name: "グルメ" },
    eyecatch: null,
  },
  {
    id: "dummy-2",
    slug: "#",
    title: "道後温泉の路地裏で出会う、知る人ぞ知るカフェ",
    excerpt: "観光客で賑わう道後温泉から少し外れた路地にひっそり佇む名店。",
    publishedAt: "2026-04-28T00:00:00.000Z",
    category: { name: "カフェ" },
    eyecatch: null,
  },
  {
    id: "dummy-3",
    slug: "#",
    title: "愛媛産みかんを使ったスイーツが話題のパティスリー",
    excerpt: "地元産のみかんをふんだんに使ったスイーツが口コミで広がっています。",
    publishedAt: "2026-04-20T00:00:00.000Z",
    category: { name: "スイーツ" },
    eyecatch: null,
  },
];

type Props = {
  articles?: Article[];
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const PLACEHOLDER_COLORS = ["#d4e8a0", "#b8d980", "#9cc860"];

export default function PickupSection({ articles }: Props) {
  const items = (articles && articles.length > 0 ? articles : DUMMY_ARTICLES) as (Article | DummyArticle)[];
  const [wide, ...rest] = items;
  const twoCol = rest.slice(0, 2);

  return (
    <section className="max-w-5xl mx-auto px-4 py-14">
      {/* タイトル */}
      <h2
        className="text-4xl text-[#8ab92d] mb-8"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic" }}
      >
        Pick Up
      </h2>

      {/* 横長カード */}
      {wide && (
        <Link
          href={wide.slug === "#" ? "#" : `/articles/${wide.slug}`}
          className="group flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-stone-100 mb-6"
        >
          <div className="relative w-full md:w-[420px] aspect-[16/9] md:aspect-auto md:h-56 flex-shrink-0">
            {wide.eyecatch ? (
              <Image
                src={(wide.eyecatch as { url: string }).url}
                alt={wide.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-5xl"
                style={{ backgroundColor: PLACEHOLDER_COLORS[0] }}
              >
                🍊
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center p-6 md:p-8">
            {wide.category && (
              <span className="inline-block bg-[#8ab92d] text-white text-xs px-3 py-1 rounded-full mb-3 w-fit">
                {wide.category.name}
              </span>
            )}
            <h3 className="text-lg font-bold text-stone-800 leading-snug group-hover:text-[#8ab92d] transition-colors">
              {wide.title}
            </h3>
            {"excerpt" in wide && wide.excerpt && (
              <p className="text-stone-500 text-sm mt-2 line-clamp-2">
                {wide.excerpt}
              </p>
            )}
            <time className="text-xs text-stone-400 mt-3">
              {formatDate(wide.publishedAt)}
            </time>
          </div>
        </Link>
      )}

      {/* 2カラムカード */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {twoCol.map((article, i) => (
          <Link
            key={article.id}
            href={article.slug === "#" ? "#" : `/articles/${article.slug}`}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-stone-100"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              {article.eyecatch ? (
                <Image
                  src={(article.eyecatch as { url: string }).url}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-4xl"
                  style={{ backgroundColor: PLACEHOLDER_COLORS[i + 1] }}
                >
                  🌿
                </div>
              )}
              {article.category && (
                <span className="absolute top-3 left-3 bg-[#8ab92d] text-white text-xs px-2 py-1 rounded-full">
                  {article.category.name}
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-stone-800 text-sm leading-snug line-clamp-2 group-hover:text-[#8ab92d] transition-colors">
                {article.title}
              </h3>
              <time className="text-xs text-stone-400 mt-2 block">
                {formatDate(article.publishedAt)}
              </time>
            </div>
          </Link>
        ))}
      </div>

      {/* もっと見るボタン */}
      <div className="text-center mt-10">
        <Link href="/articles" className="btn-terracotta">
          記事一覧を見る
        </Link>
      </div>
    </section>
  );
}

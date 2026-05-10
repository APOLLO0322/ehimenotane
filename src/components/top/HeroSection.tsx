import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[480px] md:h-[560px] overflow-hidden">
      {/* 背景：右側は食べ物写真イメージのグラデーション（本番時に画像へ差し替え） */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #8ab92d 0%, #a8d44a 40%, #c8e87a 60%, #e8f5b0 80%, #f5f0d8 100%)",
        }}
      />

      {/* 右側：画像プレースホルダー */}
      <div className="absolute right-0 top-0 w-1/2 h-full hidden md:flex items-center justify-center">
        <div className="w-72 h-72 rounded-full bg-white/20 flex items-center justify-center text-8xl">
          🍊
        </div>
      </div>

      {/* 左側テキストエリア */}
      <div className="absolute inset-0 flex">
        <div
          className="relative flex flex-col justify-center px-10 md:px-16 w-full md:w-[55%]"
          style={{
            background:
              "linear-gradient(to right, rgba(138,185,45,0.95) 65%, rgba(138,185,45,0) 100%)",
          }}
        >
          <p className="text-white/90 text-xs tracking-[0.3em] mb-3 font-medium uppercase">
            Ehime no Tane
          </p>
          <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight drop-shadow-sm">
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
            className="mt-7 inline-flex items-center gap-2 bg-white text-[#8ab92d] text-sm font-bold px-7 py-3 rounded-full w-fit hover:bg-green-50 transition-colors shadow-md"
          >
            記事を見る →
          </Link>
        </div>
      </div>
    </section>
  );
}

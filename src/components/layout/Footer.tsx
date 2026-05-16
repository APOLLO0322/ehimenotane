"use client";

import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-white border-t border-stone-100">
      <div className="max-w-5xl mx-auto px-6 py-10 relative">
        {/* TOPへもどる */}
        <button
          onClick={scrollToTop}
          className="absolute right-6 top-8 flex flex-col items-center gap-1 text-[#9dc926] hover:opacity-70 transition-opacity"
          aria-label="トップへ戻る"
        >
          <span className="text-2xl leading-none">↑</span>
          <span className="text-[10px] font-bold tracking-wide">
            TOPへ
            <br />
            もどる
          </span>
        </button>

        {/* ナビ1行目 */}
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-600 mb-3 pr-20">
          <Link href="/" className="hover:text-[#9dc926] transition-colors">
            ホーム
          </Link>
          <Link href="/articles" className="hover:text-[#9dc926] transition-colors">
            記事一覧
          </Link>
          <Link href="/feature" className="hover:text-[#9dc926] transition-colors">
            特集記事
          </Link>
          <Link href="/about" className="hover:text-[#9dc926] transition-colors">
            ヒメタネとは
          </Link>
          <Link href="/contact" className="hover:text-[#9dc926] transition-colors">
            掲載をご希望の方
          </Link>
        </nav>

        {/* ナビ2行目 */}
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-600 mb-8 pr-20">
          <Link href="/privacy" className="hover:text-[#9dc926] transition-colors">
            プライバシーポリシー
          </Link>
          <Link href="/terms" className="hover:text-[#9dc926] transition-colors">
            利用規約
          </Link>
          <Link href="/advertising" className="hover:text-[#9dc926] transition-colors">
            広告掲載
          </Link>
          <Link href="/inquiry" className="hover:text-[#9dc926] transition-colors">
            お問い合わせ
          </Link>
        </nav>

        <p className="text-xs text-stone-400">
          © {new Date().getFullYear()} ヒメタネ All rights reserved.
        </p>
      </div>
    </footer>
  );
}

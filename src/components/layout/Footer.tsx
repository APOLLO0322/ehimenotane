import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-50 mt-20">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-lg font-bold text-emerald-700">エヒメノタネ</p>
            <p className="text-xs text-stone-400 mt-1">
              愛媛の魅力を、種のように届けるオウンドメディア
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-stone-500">
            <Link href="/" className="hover:text-emerald-700 transition-colors">
              トップ
            </Link>
            <Link
              href="/about"
              className="hover:text-emerald-700 transition-colors"
            >
              このサイトについて
            </Link>
            <Link
              href="/privacy"
              className="hover:text-emerald-700 transition-colors"
            >
              プライバシーポリシー
            </Link>
          </nav>
        </div>

        <p className="mt-8 text-center text-xs text-stone-400">
          © {new Date().getFullYear()} エヒメノタネ All rights reserved.
        </p>
      </div>
    </footer>
  );
}

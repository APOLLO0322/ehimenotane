import Link from "next/link";
import { getCategories } from "@/lib/microcms";

export default async function Header() {
  let categories: import("@/types").Category[] = [];
  try {
    const res = await getCategories();
    categories = res.contents;
  } catch {
    // microCMSが未設定の場合はカテゴリなし
  }

  return (
    <header className="bg-white border-b border-stone-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="text-xl font-black text-[#8ab92d] tracking-wide">
              エヒメノタネ
            </span>
            <span className="text-[10px] text-stone-400 tracking-widest hidden sm:block">
              himetane.com
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-5">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="text-sm text-stone-600 hover:text-[#8ab92d] transition-colors font-medium"
              >
                {cat.name}
              </Link>
            ))}
            <Link
              href="/about"
              className="text-sm text-stone-600 hover:text-[#8ab92d] transition-colors font-medium"
            >
              このサイトについて
            </Link>
            <Link
              href="/search"
              className="ml-2 bg-[#8ab92d] text-white text-xs font-bold px-4 py-1.5 rounded-full hover:bg-[#7aa625] transition-colors"
            >
              SEARCH
            </Link>
          </nav>

          <button className="md:hidden p-2 text-stone-600" aria-label="メニュー">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

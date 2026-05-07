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
    <header className="border-b border-stone-200 bg-white sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex flex-col leading-none">
            <span className="text-xl font-bold text-emerald-700 tracking-wider">
              エヒメノタネ
            </span>
            <span className="text-[10px] text-stone-400 tracking-widest">
              himetane.com
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="text-sm text-stone-600 hover:text-emerald-700 transition-colors"
              >
                {cat.name}
              </Link>
            ))}
            <Link
              href="/about"
              className="text-sm text-stone-600 hover:text-emerald-700 transition-colors"
            >
              このサイトについて
            </Link>
          </nav>

          {/* モバイルメニューは後で追加 */}
          <button className="md:hidden p-2 text-stone-600" aria-label="メニュー">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

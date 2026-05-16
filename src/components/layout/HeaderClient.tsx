"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/types";

type Props = {
  categories: Category[];
};

export default function HeaderClient({ categories }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="bg-white border-b border-stone-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* ロゴ */}
          <Link href="/" className="flex items-baseline gap-2">
            <span className="text-xl font-black text-[#9dc926] tracking-wide">
              ヒメタネ
            </span>
            <span className="text-[10px] text-stone-400 tracking-widest hidden sm:block">
              himetane.com
            </span>
          </Link>

          {/* 右側: 検索 + ハンバーガー */}
          <div className="flex items-center gap-4">
            <Link
              href="/articles"
              className="flex items-center gap-1.5 text-stone-600 hover:text-[#9dc926] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <span className="text-sm font-medium hidden sm:block">お店を探す</span>
            </Link>

            <button
              onClick={() => setOpen((v) => !v)}
              className="p-1.5 text-stone-600 hover:text-[#9dc926] transition-colors"
              aria-label={open ? "メニューを閉じる" : "メニューを開く"}
            >
              {open ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* オーバーレイ */}
      {open && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ドロワーメニュー */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* ドロワーヘッダー */}
        <div className="flex items-center justify-between px-6 h-14 border-b border-stone-100">
          <span className="text-sm font-bold text-stone-600 tracking-wider">MENU</span>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 text-stone-400 hover:text-stone-700 transition-colors"
            aria-label="閉じる"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="px-6 py-6 flex flex-col gap-1">
          <Link
            href="/"
            className="py-3 text-stone-700 hover:text-[#9dc926] font-medium border-b border-stone-100 transition-colors"
          >
            TOP
          </Link>
          <Link
            href="/articles/new"
            className="py-3 text-stone-700 hover:text-[#9dc926] font-medium border-b border-stone-100 transition-colors"
          >
            新着記事
          </Link>
          <Link
            href="/articles/feature"
            className="py-3 text-stone-700 hover:text-[#9dc926] font-medium border-b border-stone-100 transition-colors"
          >
            特集記事
          </Link>
          <span className="py-3 text-stone-400 font-medium cursor-default">
            ヒメタネとは
          </span>
        </nav>
      </div>
    </header>
  );
}

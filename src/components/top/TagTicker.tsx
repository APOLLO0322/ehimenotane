"use client";

import Link from "next/link";

type Category = {
  name: string;
  slug: string;
};

type Props = {
  categories: Category[];
};

export default function TagTicker({ categories }: Props) {
  if (categories.length === 0) return null;

  const repeated = [...categories, ...categories, ...categories];

  return (
    <div
      className="w-full overflow-hidden py-2.5"
      style={{ backgroundColor: "#9dc926" }}
    >
      <div className="flex animate-ticker whitespace-nowrap">
        {repeated.map((cat, i) => (
          <Link
            key={i}
            href={`/search?genre=${encodeURIComponent(cat.name)}`}
            className="inline-flex items-center gap-1.5 mx-5 text-white/90 text-xs font-medium tracking-wide flex-shrink-0 hover:text-white transition-colors"
          >
            <span className="text-white/50">#</span>
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

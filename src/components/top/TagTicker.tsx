"use client";

type Props = {
  tags: string[];
};

export default function TagTicker({ tags }: Props) {
  if (tags.length === 0) return null;

  // 途切れなく見せるためにタグを3セット繰り返す
  const repeated = [...tags, ...tags, ...tags];

  return (
    <div
      className="w-full overflow-hidden py-2.5"
      style={{ backgroundColor: "#8ab92d" }}
    >
      <div className="flex animate-ticker whitespace-nowrap">
        {repeated.map((tag, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1.5 mx-5 text-white/90 text-xs font-medium tracking-wide flex-shrink-0"
          >
            <span className="text-white/50">#</span>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

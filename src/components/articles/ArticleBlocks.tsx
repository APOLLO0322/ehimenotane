import Image from "next/image";
import sanitizeHtml from "sanitize-html";
import type { ArticleBlock } from "@/types";

type Props = {
  blocks: ArticleBlock[];
};

const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    "h1","h2","h3","h4","h5","h6","p","br","ul","ol","li",
    "strong","em","a","blockquote","hr","img","figure","figcaption",
    "table","thead","tbody","tr","th","td",
  ],
  allowedAttributes: {
    a: ["href", "target", "rel"],
    img: ["src", "alt", "width", "height"],
  },
  allowedSchemes: ["https", "http"],
};

const BLOCK_LABEL: Record<string, string> = {
  導入: "はじめに",
  本文: "",
  まとめ: "まとめ",
  情報: "店舗情報",
};

export default function ArticleBlocks({ blocks }: Props) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="space-y-10 mt-10">
      {blocks.map((block, i) => {
        const type = block.blockType?.[0] ?? "本文";
        const label = BLOCK_LABEL[type] ?? type;

        return (
          <section key={block.fieldId ?? i} className="article-block">
            {/* ブロック種別ラベル（本文は非表示） */}
            {label && (
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-[#8ab92d] text-white text-xs font-bold px-3 py-1 rounded-full">
                  {label}
                </span>
                <div className="flex-1 h-px bg-stone-200" />
              </div>
            )}

            {/* 見出し */}
            {block.heading && (
              <h2 className="text-xl font-bold text-stone-800 mb-4 leading-snug">
                {block.heading}
              </h2>
            )}

            {/* 本文（リッチエディタ） */}
            {block.body && (
              <div
                className="prose prose-stone prose-sm md:prose-base max-w-none
                  prose-headings:font-bold prose-headings:text-stone-800
                  prose-a:text-[#8ab92d] prose-a:no-underline hover:prose-a:underline
                  prose-img:rounded-xl prose-blockquote:border-[#8ab92d]"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(block.body, SANITIZE_OPTIONS),
                }}
              />
            )}

            {/* 画像 */}
            {block.image && (
              <figure className="mt-6">
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden">
                  <Image
                    src={block.image.url}
                    alt={block.imageCaption ?? block.heading ?? ""}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                </div>
                {block.imageCaption && (
                  <figcaption className="text-center text-xs text-stone-400 mt-2">
                    {block.imageCaption}
                  </figcaption>
                )}
              </figure>
            )}

            {/* 動画 */}
            {block.videoURL && (
              <div className="mt-6 aspect-video rounded-xl overflow-hidden">
                <iframe
                  src={block.videoURL}
                  className="w-full h-full"
                  allowFullScreen
                  title={block.heading ?? "動画"}
                />
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

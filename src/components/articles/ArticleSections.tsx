import Image from "next/image";
import type { ArticleSection } from "@/types";

type Props = {
  sections: ArticleSection[];
};

// ─── 各テンプレート ────────────────────────────────────

function TemplateBasic({ section }: { section: ArticleSection }) {
  return (
    <section className="space-y-6">
      {/* ブロック1 */}
      {(section.heading1 || section.text1 || section.image1) && (
        <div className="space-y-3">
          {section.heading1 && (
            <h2 className="text-xl font-bold text-stone-800 leading-snug">
              {section.heading1}
            </h2>
          )}
          {section.text1 && (
            <p className="text-stone-600 leading-relaxed whitespace-pre-line">
              {section.text1}
            </p>
          )}
          {section.image1 && (
            <div className="rounded-xl overflow-hidden">
              <Image
                src={section.image1.url}
                alt={section.heading1 ?? "記事画像"}
                width={section.image1.width}
                height={section.image1.height}
                className="w-full h-auto object-cover"
              />
            </div>
          )}
        </div>
      )}

      {/* ブロック2 */}
      {(section.heading2 || section.text2 || section.image2?.length) && (
        <div className="space-y-3">
          {section.heading2 && (
            <h3 className="text-lg font-bold text-stone-700 leading-snug">
              {section.heading2}
            </h3>
          )}
          {section.text2 && (
            <p className="text-stone-600 leading-relaxed whitespace-pre-line">
              {section.text2}
            </p>
          )}
          {section.image2 && section.image2.length > 0 && (
            <div className={section.image2.length === 1 ? "" : "grid grid-cols-2 gap-3"}>
              {section.image2.map((img, i) => (
                <div key={img.url} className="rounded-xl overflow-hidden">
                  <Image
                    src={img.url}
                    alt={`${section.heading2 ?? "記事画像"} ${i + 1}`}
                    width={img.width}
                    height={img.height}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ブロック3 */}
      {(section.heading3 || section.text3 || section.image3?.length) && (
        <div className="space-y-3">
          {section.heading3 && (
            <h3 className="text-lg font-bold text-stone-700 leading-snug">
              {section.heading3}
            </h3>
          )}
          {section.text3 && (
            <p className="text-stone-600 leading-relaxed whitespace-pre-line">
              {section.text3}
            </p>
          )}
          {section.image3 && section.image3.length > 0 && (
            <div className={section.image3.length === 1 ? "" : "grid grid-cols-2 gap-3"}>
              {section.image3.map((img, i) => (
                <div key={img.url} className="rounded-xl overflow-hidden">
                  <Image
                    src={img.url}
                    alt={`${section.heading3 ?? "記事画像"} ${i + 1}`}
                    width={img.width}
                    height={img.height}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 動画 */}
      {section.videoURL && (
        <div className="aspect-video rounded-xl overflow-hidden">
          <iframe
            src={section.videoURL}
            className="w-full h-full"
            allowFullScreen
            title={section.heading1 ?? "動画"}
          />
        </div>
      )}
    </section>
  );
}

// 左右交互レイアウト
function TemplateAlternating({ section }: { section: ArticleSection }) {
  return (
    <section className="space-y-8">
      {/* heading1 + 左image1 / 右text1 */}
      {(section.heading1 || section.image1 || section.text1) && (
        <div className="space-y-3">
          {section.heading1 && (
            <h2 className="text-xl font-bold text-stone-800">{section.heading1}</h2>
          )}
          <div className="flex flex-col md:flex-row gap-5 items-start">
            {section.image1 && (
              <div className="w-full md:w-1/2 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src={section.image1.url}
                  alt={section.heading1 ?? "記事画像"}
                  width={section.image1.width}
                  height={section.image1.height}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
            {section.text1 && (
              <p className="text-stone-600 leading-relaxed whitespace-pre-line md:w-1/2">
                {section.text1}
              </p>
            )}
          </div>
        </div>
      )}

      {/* heading2 + 左text2 / 右image2 */}
      {(section.heading2 || section.text2 || section.image2?.length) && (
        <div className="space-y-3">
          {section.heading2 && (
            <h3 className="text-lg font-bold text-stone-700">{section.heading2}</h3>
          )}
          <div className="flex flex-col md:flex-row-reverse gap-5 items-start">
            {section.image2 && section.image2.length > 0 && (
              <div className="w-full md:w-1/2 flex-shrink-0 space-y-2">
                {section.image2.map((img, i) => (
                  <div key={img.url} className="rounded-xl overflow-hidden">
                    <Image
                      src={img.url}
                      alt={`${section.heading2 ?? "記事画像"} ${i + 1}`}
                      width={img.width}
                      height={img.height}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
            {section.text2 && (
              <p className="text-stone-600 leading-relaxed whitespace-pre-line md:w-1/2">
                {section.text2}
              </p>
            )}
          </div>
        </div>
      )}

      {/* heading3 + 左image3 / 右text3 */}
      {(section.heading3 || section.text3 || section.image3?.length) && (
        <div className="space-y-3">
          {section.heading3 && (
            <h3 className="text-lg font-bold text-stone-700">{section.heading3}</h3>
          )}
          <div className="flex flex-col md:flex-row gap-5 items-start">
            {section.image3 && section.image3.length > 0 && (
              <div className="w-full md:w-1/2 flex-shrink-0 space-y-2">
                {section.image3.map((img, i) => (
                  <div key={img.url} className="rounded-xl overflow-hidden">
                    <Image
                      src={img.url}
                      alt={`${section.heading3 ?? "記事画像"} ${i + 1}`}
                      width={img.width}
                      height={img.height}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
            {section.text3 && (
              <p className="text-stone-600 leading-relaxed whitespace-pre-line md:w-1/2">
                {section.text3}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

// image1 大きく表示、複数画像横並び
function TemplateEide({ section }: { section: ArticleSection }) {
  return (
    <section className="space-y-6">
      {/* image1 大きく */}
      {section.image1 && (
        <div className="rounded-2xl overflow-hidden">
          <Image
            src={section.image1.url}
            alt={section.heading1 ?? "記事メイン画像"}
            width={section.image1.width}
            height={section.image1.height}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {(section.heading1 || section.text1) && (
        <div className="space-y-2">
          {section.heading1 && (
            <h2 className="text-xl font-bold text-stone-800">{section.heading1}</h2>
          )}
          {section.text1 && (
            <p className="text-stone-600 leading-relaxed whitespace-pre-line">{section.text1}</p>
          )}
        </div>
      )}

      {(section.heading2 || section.text2) && (
        <div className="space-y-2">
          {section.heading2 && (
            <h3 className="text-lg font-bold text-stone-700">{section.heading2}</h3>
          )}
          {section.text2 && (
            <p className="text-stone-600 leading-relaxed whitespace-pre-line">{section.text2}</p>
          )}
        </div>
      )}

      {/* image2 横並び */}
      {section.image2 && section.image2.length > 0 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {section.image2.map((img, i) => (
            <div key={img.url} className="rounded-xl overflow-hidden flex-shrink-0 w-56">
              <Image
                src={img.url}
                alt={`${section.heading2 ?? "記事画像"} ${i + 1}`}
                width={img.width}
                height={img.height}
                className="w-full h-40 object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {(section.heading3 || section.text3) && (
        <div className="space-y-2">
          {section.heading3 && (
            <h3 className="text-lg font-bold text-stone-700">{section.heading3}</h3>
          )}
          {section.text3 && (
            <p className="text-stone-600 leading-relaxed whitespace-pre-line">{section.text3}</p>
          )}
        </div>
      )}

      {/* image3 横並び */}
      {section.image3 && section.image3.length > 0 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {section.image3.map((img, i) => (
            <div key={img.url} className="rounded-xl overflow-hidden flex-shrink-0 w-56">
              <Image
                src={img.url}
                alt={`${section.heading3 ?? "記事画像"} ${i + 1}`}
                width={img.width}
                height={img.height}
                className="w-full h-40 object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {section.videoURL && (
        <div className="aspect-video rounded-xl overflow-hidden">
          <iframe
            src={section.videoURL}
            className="w-full h-full"
            allowFullScreen
            title={section.heading1 ?? "動画"}
          />
        </div>
      )}
    </section>
  );
}

// ─── テンプレート振り分け ──────────────────────────────

function ArticleSectionRenderer({ section }: { section: ArticleSection }) {
  switch (section.templateType) {
    case "template01_basic":
      return <TemplateBasic section={section} />;
    case "template02_alternating":
      return <TemplateAlternating section={section} />;
    case "template03_eide":
      return <TemplateEide section={section} />;
    default:
      return <TemplateBasic section={section} />;
  }
}

// ─── メインコンポーネント ──────────────────────────────

export default function ArticleSections({ sections }: Props) {
  if (!sections || sections.length === 0) return null;

  return (
    <div className="space-y-14 mt-10">
      {sections.map((section, i) => (
        <ArticleSectionRenderer key={i} section={section} />
      ))}
    </div>
  );
}

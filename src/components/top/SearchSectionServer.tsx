import { getCategories, getAreas, getArticles } from "@/lib/microcms";
import SearchSection from "./SearchSection";

const FALLBACK_GENRES = [
  "グルメ・カフェ", "スイーツ", "パン", "居酒屋・バー",
  "ランチ", "テイクアウト", "自然・アウトドア", "観光スポット",
  "ショッピング", "体験・アクティビティ",
];

const FALLBACK_AREAS = ["松山市", "今治市", "新居浜市", "西条市", "伊予市", "東温市"];

export default async function SearchSectionServer() {
  let genres: string[] = [];
  let areas: string[] = [];

  try {
    const [catsRes, areasRes, articlesRes] = await Promise.all([
      getCategories(),
      getAreas(),
      getArticles({ limit: 100 }),
    ]);

    const activeCategoryIds = new Set(
      articlesRes.contents.map((a) => a.client?.categories?.id).filter(Boolean)
    );
    const activeAreaIds = new Set(
      articlesRes.contents.map((a) => a.client?.areas?.id).filter(Boolean)
    );

    genres = activeCategoryIds.size > 0
      ? catsRes.contents.filter((c) => activeCategoryIds.has(c.id)).map((c) => c.name)
      : catsRes.contents.map((c) => c.name);

    areas = activeAreaIds.size > 0
      ? areasRes.contents.filter((a) => activeAreaIds.has(a.id)).map((a) => a.name)
      : areasRes.contents.map((a) => a.name);

  } catch (e) {
    console.error("[SearchSectionServer] fetch error:", e);
  }

  return (
    <SearchSection
      genres={genres.length > 0 ? genres : FALLBACK_GENRES}
      areas={areas.length > 0 ? areas : FALLBACK_AREAS}
    />
  );
}

import { getCategories } from "@/lib/microcms";
import TagTicker from "./TagTicker";

const DUMMY_CATEGORIES = [
  { name: "グルメ・カフェ", slug: "gourmet" },
  { name: "スイーツ", slug: "sweets" },
  { name: "パン", slug: "bread" },
  { name: "自然・アウトドア", slug: "nature" },
  { name: "観光スポット", slug: "sightseeing" },
  { name: "ショッピング", slug: "shopping" },
  { name: "体験・アクティビティ", slug: "activity" },
  { name: "居酒屋・バー", slug: "izakaya" },
];

export default async function TagTickerServer() {
  let categories: { name: string; slug: string }[] = [];

  try {
    const { contents } = await getCategories();
    categories = contents
      .filter((c) => c.name && c.slug)
      .map((c) => ({ name: c.name, slug: c.slug }));
  } catch {
    // microCMS未設定時はダミー
  }

  const display = categories.length > 0 ? categories : DUMMY_CATEGORIES;

  return <TagTicker categories={display} />;
}

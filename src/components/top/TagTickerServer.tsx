import { getArticles } from "@/lib/microcms";
import TagTicker from "./TagTicker";

const DUMMY_TAGS = [
  "松山グルメ", "道後温泉", "みかんスイーツ", "カフェ巡り", "隠れ家",
  "今治タオル", "宇和島鯛めし", "愛媛の朝ごはん", "パン屋さん", "地元酒",
  "サイクリング", "里山暮らし", "せとうち絶景", "愛媛土産", "テイクアウト",
];

export default async function TagTickerServer() {
  let tags: string[] = [];

  try {
    const { contents } = await getArticles({ limit: 100 });
    // tags は Tag[] なので name を取り出して重複除去
    const allTagNames = contents.flatMap((a) => (a.tags ?? []).map((t) => t.name));
    tags = [...new Set(allTagNames)];
  } catch {
    // microCMS未設定時はダミータグ
  }

  const displayTags = tags.length > 0 ? tags : DUMMY_TAGS;

  return <TagTicker tags={displayTags} />;
}

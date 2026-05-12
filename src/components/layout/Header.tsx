import { getCategories } from "@/lib/microcms";
import HeaderClient from "./HeaderClient";

export default async function Header() {
  let categories: import("@/types").Category[] = [];
  try {
    const res = await getCategories();
    categories = res.contents;
  } catch {
    // microCMSが未設定の場合はカテゴリなし
  }

  return <HeaderClient categories={categories} />;
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const GENRES = [
  "グルメ・カフェ", "スイーツ", "パン", "居酒屋・バー",
  "ランチ", "テイクアウト", "自然・アウトドア", "観光スポット",
  "ショッピング", "体験・アクティビティ",
];

const AREAS = [
  "松山市", "今治市",  "新居浜市", "西条市", "伊予市", "東温市",
];

type Tab = "genre" | "area" | "name";

export default function SearchSection() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("genre");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [searchName, setSearchName] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (activeTab === "genre" && selectedGenre) params.set("genre", selectedGenre);
    if (activeTab === "area" && selectedArea) params.set("area", selectedArea);
    if (activeTab === "name" && searchName) params.set("q", searchName);
    router.push(`/search?${params.toString()}`);
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "genre", label: "ジャンルで探す" },
    { id: "area", label: "エリアで探す" },
    { id: "name", label: "店名で探す" },
  ];

  return (
    <section className="bg-[#9dc926] py-14 px-4">
      <div className="max-w-4xl mx-auto">
        {/* タイトル */}
        <h2 className="text-5xl text-white tracking-[0.25em] mb-8 font-[family-name:var(--font-train-one)]">
          SEARCH
        </h2>

        {/* タブ */}
        <div className="flex gap-1 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 text-sm font-bold rounded-t-lg transition-colors ${
                activeTab === tab.id
                  ? "bg-white text-[#9dc926]"
                  : "bg-white/30 text-white hover:bg-white/50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 検索フォーム */}
        <div className="bg-white rounded-b-2xl rounded-tr-2xl p-6">
          {activeTab === "genre" && (
            <div className="flex flex-wrap gap-2">
              {GENRES.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre === selectedGenre ? "" : genre)}
                  className={`px-4 py-2 rounded-full text-sm border-2 transition-colors ${
                    selectedGenre === genre
                      ? "bg-[#9dc926] border-[#9dc926] text-white"
                      : "border-stone-200 text-stone-600 hover:border-[#9dc926] hover:text-[#9dc926]"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          )}

          {activeTab === "area" && (
            <div className="flex flex-wrap gap-2">
              {AREAS.map((area) => (
                <button
                  key={area}
                  onClick={() => setSelectedArea(area === selectedArea ? "" : area)}
                  className={`px-4 py-2 rounded-full text-sm border-2 transition-colors ${
                    selectedArea === area
                      ? "bg-[#9dc926] border-[#9dc926] text-white"
                      : "border-stone-200 text-stone-600 hover:border-[#9dc926] hover:text-[#9dc926]"
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
          )}

          {activeTab === "name" && (
            <div className="flex gap-3">
              <input
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="店名・キーワードを入力"
                className="flex-1 border-2 border-stone-200 rounded-full px-5 py-2.5 text-sm outline-none focus:border-[#9dc926]"
              />
            </div>
          )}

          <div className="mt-5 flex justify-center">
            <button
              onClick={handleSearch}
              className="bg-[#9dc926] text-white text-sm font-bold px-12 py-3 rounded-full hover:bg-[#88bb1e] transition-colors"
            >
              この条件で探す
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

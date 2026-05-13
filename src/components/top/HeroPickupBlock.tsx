"use client";

import { useState, useEffect, type ReactNode } from "react";
import type { Article } from "@/types";
import HeroSection from "./HeroSection";
import PickupSection from "./PickupSection";

type Props = {
  heroArticles: Article[];
  pickupPool: Article[];
  children: ReactNode; // TagTickerServer
};

export default function HeroPickupBlock({ heroArticles, pickupPool, children }: Props) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (heroArticles.length <= 1) return;
    const timer = setInterval(() => {
      setIdx((i) => (i + 1) % heroArticles.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [heroArticles.length]);

  const current = heroArticles[idx] ?? null;

  return (
    <>
      <div key={idx} className="animate-[fadein_0.6s_ease_both]">
        <HeroSection article={current} />
      </div>
      <div style={{ backgroundColor: "#f7f5ef" }}>
        {children}
        <PickupSection heroArticle={current} pickupPool={pickupPool} slideKey={idx} />
      </div>
    </>
  );
}

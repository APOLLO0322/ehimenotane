import TagTickerServer from "@/components/top/TagTickerServer";
import HeroPickupBlock from "@/components/top/HeroPickupBlock";
import OshiseBanner from "@/components/top/OshiseBanner";
import SearchSectionServer from "@/components/top/SearchSectionServer";
import ConceptSection from "@/components/top/ConceptSection";
import { getRecentArticles } from "@/lib/microcms";

export const revalidate = 60;

export default async function Home() {
  const recentArticles = await getRecentArticles(30).catch(() => []);

  const heroArticles = recentArticles.filter((a) => a.hero === true);
  const pickupPool = recentArticles.filter((a) => !a.hero);

  return (
    <main>
      <HeroPickupBlock heroArticles={heroArticles} pickupPool={pickupPool}>
        <TagTickerServer />
      </HeroPickupBlock>
      <OshiseBanner />
      <SearchSectionServer />
      <ConceptSection />
    </main>
  );
}

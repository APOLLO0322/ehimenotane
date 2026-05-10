import HeroSection from "@/components/top/HeroSection";
import TagTickerServer from "@/components/top/TagTickerServer";
import PickupSection from "@/components/top/PickupSection";
import OshiseBanner from "@/components/top/OshiseBanner";
import SearchSection from "@/components/top/SearchSection";
import ConceptSection from "@/components/top/ConceptSection";

export const revalidate = 60;

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TagTickerServer />
      <PickupSection />
      <OshiseBanner />
      <SearchSection />
      <ConceptSection />
    </main>
  );
}

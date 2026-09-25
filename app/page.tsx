import { Case } from "@/components/ui/cases-with-infinite-scroll";
import { BlueSurface } from "@/components/blue-surface/blue-surface";
import { FilmHero } from "@/components/film-hero/film-hero";
import { SiteNav } from "@/components/site-nav/site-nav";
import { clientLogos } from "@/lib/client-logos";

export default function Home() {
  return (
    <main className="block">
      <SiteNav />
      <FilmHero />
      <BlueSurface>
        <Case
          heading="Trusted by leading pharmaceutical and life-science companies"
          logos={clientLogos}
        />
      </BlueSurface>
    </main>
  );
}

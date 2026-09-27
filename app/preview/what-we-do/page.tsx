import type { Metadata } from "next";
import { CompanyFilm } from "@/components/company-film/company-film";
import { FeaturedProducts } from "@/components/featured-products/featured-products";
import { Case } from "@/components/ui/cases-with-infinite-scroll";
import { Applications } from "@/components/applications/applications";
import { BlueSurface } from "@/components/blue-surface/blue-surface";
import { FilmHero } from "@/components/film-hero/film-hero";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { VisitUs } from "@/components/visit-us/visit-us";
import { Partners } from "@/components/partners/partners";
import { SiteNav } from "@/components/site-nav/site-nav";
import { Solutions } from "@/components/solutions/solutions";
import { WhatWeDo } from "@/components/what-we-do/what-we-do";
import { WhyAgile } from "@/components/why-agile/why-agile";
import { clientLogos } from "@/lib/client-logos";
import styles from "./preview.module.css";

// Review copy of the home page with the new WHAT WE DO section in place.
// The real home page is unchanged until this is approved.
export const metadata: Metadata = {
  title: "Preview: What we do",
  robots: { index: false, follow: false },
};

export default function WhatWeDoPreview() {
  return (
    <main className="block">
      <SiteNav />
      <FilmHero />
      {/* One fade runs from night at the clients strip, through the blues,
          to white by the end of the products; from the film on, white. */}
      <BlueSurface from="night-to-day">
        <Case
          heading="Trusted by leading pharmaceutical and life-science companies"
          logos={clientLogos}
        />
        <WhatWeDo />
        <Solutions />
        <FeaturedProducts />
      </BlueSurface>
      <div className={styles.day}>
        <CompanyFilm />
        <WhyAgile />
        <Applications />
        <Partners />
      </div>
      <VisitUs />
      <SiteFooter />
    </main>
  );
}

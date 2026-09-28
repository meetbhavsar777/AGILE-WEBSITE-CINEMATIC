import { CompanyFilm } from "@/components/company-film/company-film";
import { FeaturedProducts } from "@/components/featured-products/featured-products";
import { Case } from "@/components/ui/cases-with-infinite-scroll";
import { Applications } from "@/components/applications/applications";
import { FilmHero } from "@/components/film-hero/film-hero";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { VisitUs } from "@/components/visit-us/visit-us";
import { Partners } from "@/components/partners/partners";
import { SiteNav } from "@/components/site-nav/site-nav";
import { Solutions } from "@/components/solutions/solutions";
import { WhatWeDo } from "@/components/what-we-do/what-we-do";
import { WhyAgile } from "@/components/why-agile/why-agile";
import { clientLogos } from "@/lib/client-logos";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className="block">
      <SiteNav />
      <FilmHero />
      {/* Version 2: the same page as the cinematic site, all on white.
          data-surface="white" switches the sections below to dark text. */}
      <div data-surface="white" className={styles.day}>
        <Case
          heading="Trusted by leading pharmaceutical and life-science companies"
          logos={clientLogos}
        />
        <WhatWeDo />
        <Solutions />
        <FeaturedProducts />
      </div>
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

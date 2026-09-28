import { FilmHero } from "@/components/film-hero/film-hero";
import {
  Applications,
  Clients,
  Film,
  Partners,
  Products,
  Solutions,
  WhatWeDo,
  WhyAgile,
} from "@/components/minimal/sections";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { SiteNav } from "@/components/site-nav/site-nav";
import { VisitUs } from "@/components/visit-us/visit-us";

// Version B (branch version-2): the same hero as the cinematic site, then a
// calm, minimal page. The cinematic homepage lives on the main branch.
export default function Home() {
  return (
    <main className="block">
      <SiteNav />
      <FilmHero />
      <Clients />
      <WhatWeDo />
      <Solutions />
      <Products />
      <Film />
      <WhyAgile />
      <Applications />
      <Partners />
      <VisitUs />
      <SiteFooter />
    </main>
  );
}

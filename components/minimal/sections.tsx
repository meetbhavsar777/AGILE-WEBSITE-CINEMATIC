import Image from "next/image";
import type { ReactNode } from "react";
import { APPLICATIONS } from "@/components/applications/content";
import { intro as productsIntro, products } from "@/components/featured-products/content";
import { ICONS, PARTNERS } from "@/components/partners/partners";
import { intro as solutionsIntro, solutions } from "@/components/solutions/content";
import { capabilities, chapters, intro as whatIntro } from "@/components/what-we-do/content";
import { icons as reasonIcons, REASONS } from "@/components/why-agile/content";
import { clientLogos } from "@/lib/client-logos";
import { FilmBlock } from "./film";
import { Reveal } from "./reveal";
import styles from "./minimal.module.css";

/**
 * VERSION B: the minimal page after the hero. Calm, static sections that
 * alternate white and light grey, sharing one header pattern and one
 * rhythm. The same content as the cinematic version, from the same files.
 * The only motion is one fade-up per section and hover states.
 */

// A line icon, 24 × 24, drawn in the accent blue.
function Icon({ children }: { children: ReactNode }) {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
      {children}
    </svg>
  );
}

// Adjustable settings: custom configurations.
const CUSTOM_ICON = (
  <>
    <path d="M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1" />
    <circle cx="15" cy="6" r="2" />
    <circle cx="9" cy="12" r="2" />
    <circle cx="17" cy="18" r="2" />
  </>
);

const SOLUTION_ICONS: Record<string, ReactNode> = {
  chromatography: ICONS.column,
  bioprocessing: ICONS.bioreactor,
  "life-science": ICONS.molecule,
  "molecular-imaging": ICONS.particles,
  "sample-preparation": ICONS.tube,
  "custom-solutions": CUSTOM_ICON,
};

function Header({
  id,
  eyebrow,
  title,
  lede,
  action,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  action?: ReactNode;
}) {
  return (
    <header className={styles.head}>
      <div className={styles.headText}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 id={id} className={styles.title}>
          {title}
        </h2>
      </div>
      {lede && <p className={styles.lede}>{lede}</p>}
      {action}
    </header>
  );
}

// Two designed lines, kept as lines on wide screens.
const lines = (pair: readonly string[]) =>
  pair.map((l) => (
    <span key={l} className={styles.titleLine}>
      {l}
    </span>
  ));

export function Clients() {
  return (
    <section aria-labelledby="m-clients" className={`${styles.section} ${styles.night}`}>
      <Reveal className={styles.inner}>
        <h2 id="m-clients" className={styles.clientsTitle}>
          Trusted by leading pharmaceutical and life-science companies
        </h2>
        <ul className={styles.logos}>
          {clientLogos.map((logo) => (
            <li key={logo.name} className={styles.logoTile}>
              <span className={styles.logoBox}>
                <Image src={logo.src} alt={logo.name} fill sizes="160px" />
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

export function WhatWeDo() {
  return (
    <section id="what-we-do" aria-labelledby="m-what" className={styles.section}>
      <Reveal className={styles.inner}>
        <Header id="m-what" eyebrow={whatIntro.eyebrow} title={lines(whatIntro.title)} lede={whatIntro.body} />
        <ul className={styles.cards3}>
          {chapters.map((c) => (
            <li key={c.label} className={styles.card}>
              <div className={styles.photo}>
                <Image
                  src={c.media.src!}
                  alt={c.media.alt ?? ""}
                  fill
                  sizes="(min-width: 1024px) 400px, (min-width: 768px) 45vw, 92vw"
                  style={c.media.focus ? { objectPosition: c.media.focus } : undefined}
                />
              </div>
              <p className={styles.cardLabel}>{c.label}</p>
              <h3 className={styles.cardTitle}>{c.title.join(" ")}</h3>
              <p className={styles.cardBody}>{c.body}</p>
            </li>
          ))}
        </ul>
        <div className={styles.capabilities}>
          <h3 className={styles.capTitle}>Capabilities</h3>
          <ul className={styles.capList}>
            {capabilities.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}

export function Solutions() {
  return (
    <section id="solutions" aria-labelledby="m-solutions" className={`${styles.section} ${styles.paper}`}>
      <Reveal className={styles.inner}>
        <Header
          id="m-solutions"
          eyebrow={solutionsIntro.eyebrow}
          title={lines(solutionsIntro.title)}
          lede={solutionsIntro.body}
        />
        <ul className={styles.grid3}>
          {solutions.map((s) => (
            <li key={s.id} className={styles.tile}>
              <Icon>{SOLUTION_ICONS[s.id]}</Icon>
              <h3 className={styles.tileTitle}>{s.name}</h3>
              <p className={styles.tileBody}>{s.body}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

export function Products() {
  return (
    <section id="products" aria-labelledby="m-products" className={styles.section}>
      <Reveal className={styles.inner}>
        <Header
          id="m-products"
          eyebrow={productsIntro.eyebrow}
          title={lines(productsIntro.title)}
          action={
            <a className={styles.outline} href={productsIntro.allHref}>
              {productsIntro.allLabel}
            </a>
          }
        />
        <ul className={styles.grid3}>
          {products.map((p) => (
            <li key={p.id} className={styles.product}>
              <div className={styles.productShot}>
                {p.image ? (
                  <Image src={p.image} alt={p.alt ?? ""} fill sizes="(min-width: 1024px) 380px, (min-width: 768px) 45vw, 92vw" />
                ) : (
                  <span className={styles.placeholder} aria-hidden="true" />
                )}
              </div>
              <div className={styles.productFoot}>
                <span className={styles.mark} data-kind={p.icon ? "icon" : "wordmark"}>
                  <Image src={p.icon ?? p.logo} alt={p.partner} fill sizes="96px" />
                </span>
                <h3 className={styles.productName}>{p.name}</h3>
              </div>
              <a className={styles.textLink} href={`/products#${p.id}`}>
                View product
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

export function Film() {
  return (
    <section id="film" aria-labelledby="m-film" className={`${styles.section} ${styles.paper}`}>
      <Reveal className={styles.inner}>
        <Header id="m-film" eyebrow="Company film" title="See how we work." />
        <FilmBlock />
      </Reveal>
    </section>
  );
}

export function WhyAgile() {
  return (
    <section id="why-agile" aria-labelledby="m-why" className={styles.section}>
      <Reveal className={styles.inner}>
        <Header id="m-why" eyebrow="Why Agile" title={lines(["One partner, from", "selection to support."])} />
        <ul className={styles.grid2}>
          <li className={`${styles.tile} ${styles.tileDeep}`}>
            <p className={styles.bigFigure}>
              12 <span>years</span>
            </p>
            <p className={styles.tileBody}>Serving pharma and biotech labs from Ahmedabad since 2013.</p>
          </li>
          {REASONS.map((r) => (
            <li key={r.title} className={styles.tile}>
              <Icon>{reasonIcons[r.icon]}</Icon>
              <h3 className={styles.tileTitle}>{r.title}</h3>
              <p className={styles.tileBody}>{r.body}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

export function Applications() {
  return (
    <section id="applications" aria-labelledby="m-apps" className={`${styles.section} ${styles.paper}`}>
      <Reveal className={styles.inner}>
        <Header id="m-apps" eyebrow="Applications" title={lines(["Where our", "technologies work."])} />
        <ul className={styles.grid3}>
          {APPLICATIONS.map((a) => (
            <li key={a.name} className={styles.app}>
              <div className={styles.appPhoto}>
                <Image src={a.image} alt="" fill sizes="(min-width: 1024px) 380px, (min-width: 768px) 45vw, 92vw" />
              </div>
              <h3 className={styles.appName}>{a.name}</h3>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

export function Partners() {
  return (
    <section id="partners" aria-labelledby="m-partners" className={styles.section}>
      <Reveal className={styles.inner}>
        <Header id="m-partners" eyebrow="Partners" title={lines(["Global technologies.", "Local expertise."])} />
        <ul className={styles.partners}>
          {PARTNERS.map((p) => (
            <li key={p.name} className={styles.partner}>
              <span className={styles.partnerLogo}>
                <Image src={p.logo} alt={p.name} fill sizes="200px" />
              </span>
              <p className={styles.partnerLine}>
                <Icon>{ICONS[p.icon]}</Icon>
                {p.line}
              </p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

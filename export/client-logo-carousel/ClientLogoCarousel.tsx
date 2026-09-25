"use client";

/**
 * Auto-scrolling client logo strip for React / Next.js / Vite.
 * Needs only React: no Tailwind, shadcn or carousel library.
 *
 * 1. Copy this file into your components folder.
 * 2. Copy the `logos/` folder into `public/` (so the files are served at /logos/...).
 * 3. Use it:  <ClientLogoCarousel />
 *
 * Styling hooks (CSS variables on any parent): --clc-card-bg, --clc-radius,
 * --clc-gap, --clc-max-width. The heading inherits the page's font and colour.
 */

import { useEffect, useRef } from "react";

export type ClientLogo = {
  name: string;
  file: string;
};

export const CLIENT_LOGOS: ClientLogo[] = [
  { name: "Lupin", file: "lupin.webp" },
  { name: "Premas Biotech", file: "premas-biotech.webp" },
  { name: "Abbott", file: "abbott.webp" },
  { name: "Alkem", file: "alkem.webp" },
  { name: "Amneal", file: "amneal.webp" },
  { name: "Apothecon Pharmaceuticals", file: "apothecon.webp" },
  { name: "Aurobindo", file: "aurobindo.webp" },
  { name: "Biocon", file: "biocon.webp" },
  { name: "Cipla", file: "cipla.webp" },
  { name: "Mankind", file: "mankind.webp" },
  { name: "GSK", file: "gsk.webp" },
  { name: "Cadila Pharmaceuticals", file: "cadila.webp" },
  { name: "Sanofi", file: "sanofi.webp" },
  { name: "Glenmark", file: "glenmark.webp" },
  { name: "Divi's", file: "divis.webp" },
  { name: "Dr. Reddy's", file: "dr-reddys.webp" },
  { name: "Alembic", file: "alembic.webp" },
  { name: "Sai Life Sciences", file: "sai-life-sciences.webp" },
  { name: "Jubilant Life Sciences", file: "jubilant-life-sciences.webp" },
  { name: "Intas Pharmaceuticals", file: "intas.webp" },
  { name: "SimSon Pharma", file: "simson-pharma.webp" },
  { name: "Sun Pharma", file: "sun-pharma.webp" },
  { name: "Neuland", file: "neuland.webp" },
  { name: "Natco", file: "natco.webp" },
  { name: "Sumar Biotech", file: "sumar-biotech.webp" },
  { name: "Torrent Pharma", file: "torrent-pharma.webp" },
  { name: "Apicore", file: "apicore.webp" },
  { name: "Zydus", file: "zydus.webp" },
];

// Largest number of cards visible at once (desktop). The strip ends with this
// many copies of the first logos so it can wrap without a visible rewind.
const MAX_PER_VIEW = 6;

const CSS = `
  .clc-section { padding: 5rem 1rem; }
  .clc-inner {
    max-width: var(--clc-max-width, 1280px);
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }
  .clc-heading {
    margin: 0;
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 400;
    letter-spacing: -0.05em;
    text-align: left;
  }
  .clc-viewport { overflow: hidden; }
  .clc-track {
    --per-view: 2;
    display: flex;
    margin-left: calc(var(--clc-gap, 1rem) * -1);
    transform: translateX(calc(var(--clc-i, 0) * -100% / var(--per-view)));
    transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .clc-item {
    flex: 0 0 calc(100% / var(--per-view));
    min-width: 0;
    padding-left: var(--clc-gap, 1rem);
    box-sizing: border-box;
  }
  .clc-card {
    position: relative;
    aspect-ratio: 3 / 2;
    background: var(--clc-card-bg, #f5f5f5);
    border-radius: var(--clc-radius, 0.5rem);
  }
  .clc-card img {
    position: absolute;
    inset: 1rem;
    width: calc(100% - 2rem);
    height: calc(100% - 2rem);
    object-fit: contain;
  }
  @media (min-width: 640px) {
    .clc-track { --per-view: 3; }
  }
  @media (min-width: 768px) {
    .clc-heading { font-size: 1.875rem; line-height: 2.25rem; }
    .clc-track { --per-view: 4; }
  }
  @media (min-width: 1024px) {
    .clc-section { padding-block: 10rem; }
    .clc-heading { font-size: 3rem; line-height: 1; max-width: 36rem; }
    .clc-track { --per-view: 6; }
  }
`;

type ClientLogoCarouselProps = {
  heading?: string;
  /** Folder holding the logo files. */
  srcBase?: string;
  /** Milliseconds between steps. */
  interval?: number;
  logos?: ClientLogo[];
  className?: string;
};

export function ClientLogoCarousel({
  heading = "Trusted by leading pharmaceutical and life-science companies",
  srcBase = "/logos/",
  interval = 1000,
  logos = CLIENT_LOGOS,
  className,
}: ClientLogoCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const count = logos.length;

  useEffect(() => {
    const track = trackRef.current;
    if (
      !track ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let index = 0;
    const setIndex = (next: number) => {
      index = next;
      track.style.setProperty("--clc-i", String(next));
    };

    setIndex(0);
    const timer = setInterval(() => {
      if (index >= count) {
        // The clones now on screen look exactly like the start of the strip,
        // so jump back to it without animating, then carry on.
        track.style.transition = "none";
        setIndex(0);
        void track.offsetWidth;
        track.style.transition = "";
      }
      setIndex(index + 1);
    }, interval);

    return () => clearInterval(timer);
  }, [count, interval]);

  const items = [...logos, ...logos.slice(0, MAX_PER_VIEW)];

  return (
    <section
      className={className ? `clc-section ${className}` : "clc-section"}
    >
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="clc-inner">
        <h2 className="clc-heading">{heading}</h2>
        <div
          className="clc-viewport"
          role="region"
          aria-roledescription="carousel"
          aria-label="Client logos"
        >
          <div ref={trackRef} className="clc-track">
            {items.map((logo, n) => {
              const isClone = n >= count;
              return (
                <div
                  key={`${logo.file}-${n}`}
                  className="clc-item"
                  {...(isClone
                    ? { "aria-hidden": true }
                    : { role: "group", "aria-roledescription": "slide" })}
                >
                  <div className="clc-card">
                    <img
                      src={srcBase + logo.file}
                      alt={isClone ? "" : logo.name}
                      decoding="async"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClientLogoCarousel;

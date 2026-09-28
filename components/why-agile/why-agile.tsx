"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import styles from "./why-agile.module.css";
import { icons, REASONS } from "./content";

/**
 * WHY AGILE: four reasons as a bento of different-sized tiles on white.
 * The large tile carries the years in service; the others each carry one
 * reason with a thin line icon. Every fact here is from the current
 * agilescitech.in site. Tiles rise in, one after another, on first view.
 */


export function WhyAgile() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    grid.dataset.ready = "true";
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        grid.dataset.shown = "true";
        io.disconnect();
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(grid);
    return () => io.disconnect();
  }, []);

  return (
    <section id="why-agile" aria-labelledby="why-title" className={styles.section}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Why Agile</p>
        <h2 id="why-title" className={styles.title}>
          <span className={styles.titleLine}>One partner, from</span>
          <span className={styles.titleLine}>selection to support.</span>
        </h2>
      </header>

      <div ref={gridRef} className={styles.grid}>
        <article className={`${styles.tile} ${styles.feature}`} style={{ "--i": 0 } as CSSProperties}>
          <p className={styles.figure}>
            12<span className={styles.unit}>years</span>
          </p>
          <p className={styles.featureText}>
            Serving pharma and biotech labs from Ahmedabad since 2013.
          </p>
        </article>

        {REASONS.map((r, i) => (
          <article
            key={r.title}
            className={styles.tile}
            data-size={i === 0 ? "wide" : undefined}
            style={{ "--i": i + 1 } as CSSProperties}
          >
            <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
              {icons[r.icon]}
            </svg>
            <div className={styles.copy}>
              <h3 className={styles.reason}>{r.title}</h3>
              <p className={styles.body}>{r.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

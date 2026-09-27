"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { intro, products, type Product } from "./content";
import styles from "./featured-products.module.css";

/**
 * FEATURED PRODUCTS: a teaser for the products page. One product sits in a
 * large spotlight; the others wait as small cards beside it. Choosing a
 * card (click, tap or arrow keys) wipes it into the spotlight. On its own
 * the spotlight moves to the next product every few seconds, pausing while
 * the pointer or keyboard focus is on the section, while it is off screen,
 * and entirely for people who prefer reduced motion.
 */

// How long each product holds the spotlight before the next one takes over.
const HOLD_MS = 2000;

// A partner's mark, small; the wordmark if the partner has no separate mark.
function Mark({ product, className }: { product: Product; className: string }) {
  const src = product.icon ?? product.logo;
  return (
    <span className={className} data-kind={product.icon ? "icon" : "wordmark"}>
      <Image src={src} alt={product.partner} fill sizes="96px" />
    </span>
  );
}

function Shot({ product, sizes }: { product: Product; sizes: string }) {
  return product.image ? (
    <Image src={product.image} alt={product.alt ?? ""} fill sizes={sizes} />
  ) : (
    <span className={styles.placeholder} aria-hidden="true" />
  );
}

export function FeaturedProducts() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const running = visible && !hovered && !focused && !reduced;

  // Only advance while the section is on screen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = () => setReduced(mq.matches);
    onMq();
    mq.addEventListener("change", onMq);
    return () => {
      io.disconnect();
      mq.removeEventListener("change", onMq);
    };
  }, []);

  // Each change of product (manual or automatic) restarts the clock.
  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => setActive((i) => (i + 1) % products.length), HOLD_MS);
    return () => window.clearTimeout(t);
  }, [active, running]);

  // On phones the cards are a sideways row; keep the chosen one in view
  // (the row scrolls, the page does not).
  useEffect(() => {
    const tab = tabs.current[active];
    const row = tab?.parentElement;
    if (!tab || !row || row.scrollWidth <= row.clientWidth) return;
    row.scrollTo({ left: tab.offsetLeft - row.offsetLeft, behavior: reduced ? "auto" : "smooth" });
  }, [active, reduced]);

  const current = products[active];

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = products.length - 1;
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight" ? (i === last ? 0 : i + 1)
      : e.key === "ArrowUp" || e.key === "ArrowLeft" ? (i === 0 ? last : i - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section
      ref={sectionRef}
      id="products"
      aria-labelledby="products-title"
      className={styles.section}
      data-running={running || undefined}
      style={{ "--hold": `${HOLD_MS}ms` } as CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>{intro.eyebrow}</p>
          <h2 id="products-title" className={styles.title}>
            <span className={styles.titleLine}>{intro.title[0]}</span>
            <span className={styles.titleLine}>{intro.title[1]}</span>
          </h2>
        </div>
        <a className={styles.all} href={intro.allHref}>
          {intro.allLabel}
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M2 8h11M9 3.5 13.5 8 9 12.5" />
          </svg>
        </a>
      </header>

      <div className={styles.showcase}>
        {/* The spotlight. Keyed by product so each change replays the wipe. */}
        <div
          key={current.id}
          id="product-spotlight"
          className={styles.spotlight}
          role="tabpanel"
          aria-labelledby={`product-tab-${current.id}`}
        >
          <div className={styles.stage}>
            <Shot product={current} sizes="(min-width: 1024px) 55vw, 90vw" />
          </div>
          <div className={styles.foot}>
            <div className={styles.nameRow}>
              <Mark product={current} className={styles.mark} />
              <h3 className={styles.name}>{current.name}</h3>
            </div>
            <a className={styles.view} href={`/products#${current.id}`}>
              View product
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M2 8h11M9 3.5 13.5 8 9 12.5" />
              </svg>
            </a>
          </div>
        </div>

        <div className={styles.thumbs} role="tablist" aria-label="Featured products">
          {products.map((p, i) => (
            <button
              key={p.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              id={`product-tab-${p.id}`}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-controls="product-spotlight"
              tabIndex={i === active ? 0 : -1}
              className={styles.thumb}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              <span className={styles.thumbShot}>
                <Shot product={p} sizes="160px" />
              </span>
              {/* Fills while this product holds the spotlight; restarts on resume, like the clock. */}
              {i === active && (
                <span key={`${active}-${running}`} className={styles.timer} aria-hidden="true" />
              )}
              <span className={styles.thumbText}>
                <span className={styles.thumbName}>{p.name}</span>
                <Mark product={p} className={styles.thumbMark} />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import { capabilities, chapters, intro, type Media } from "./content";
import styles from "./what-we-do.module.css";

/**
 * WHAT WE DO: a short intro, three same-size chapter cards that stack as you
 * scroll, and the capabilities as small glass cards. Each card sticks in the middle of the
 * screen; the next one rises over it while it sinks back and dims. Scroll
 * position drives every movement, so scrolling back plays it in reverse.
 */

// How far a card has risen (0 at the bottom of the screen, 1 docked) when
// its text arrives.
const TEXT_IN = 0.65;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

function Picture({ media }: { media: Media }) {
  return (
    <div className={styles.picture} aria-hidden={media.src ? undefined : true}>
      <div className={styles.media}>
        {media.src ? (
          <Image
            src={media.src}
            alt={media.alt ?? ""}
            fill
            sizes="(min-width: 768px) 55vw, 90vw"
            style={media.focus ? { objectPosition: media.focus } : undefined}
          />
        ) : (
          <span className={styles.placeholder} />
        )}
      </div>
    </div>
  );
}

// Each word rises out of its own mask; --w staggers them across lines.
function Words({ lines }: { lines: string[] }) {
  let w = 0;
  return lines.map((line, i) => (
    <span key={i} className={styles.titleLine}>
      {line.split(" ").map((word, j) => (
        <span key={j}>
          {j > 0 && " "}
          <span className={styles.word} style={{ "--w": w++ } as CSSProperties}>
            <span className={styles.wordInner}>{word}</span>
          </span>
        </span>
      ))}
    </span>
  ));
}

export function WhatWeDo() {
  const sectionRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stack = stackRef.current;
    if (!section || !stack) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cards = [...stack.querySelectorAll<HTMLElement>("[data-card]")];
    const introEl = section.querySelector<HTMLElement>("[data-intro]");

    let vh = 1;
    let stackTop = 0;
    let cardH = 1;
    let step = 1;
    let dock = 0;
    let y = Number.NaN;
    let frame = 0;

    // Layout offsets, not getBoundingClientRect: the cards are sticky, so
    // their rects move with scroll while these stay put.
    const pageTop = (el: HTMLElement) => {
      let top = 0;
      for (let n: HTMLElement | null = el; n; n = n.offsetParent as HTMLElement | null) top += n.offsetTop;
      return top;
    };

    const measure = () => {
      vh = window.innerHeight;
      stackTop = pageTop(stack);
      cardH = cards[0].offsetHeight || 1;
      step = cardH + (parseFloat(getComputedStyle(cards[0]).marginBottom) || 0);
      // Where each card docks: its sticky top.
      dock = parseFloat(getComputedStyle(cards[0]).top) || 0;
    };

    // 0 when card i's top enters at the bottom of the screen, 1 once docked.
    const riseAt = (pos: number, i: number) =>
      clamp01((pos - (stackTop + i * step - vh)) / Math.max(1, vh - dock));

    // How many cards lie over card i: each later card counts from the moment
    // its top meets card i's bottom until it covers it fully.
    const depthAt = (pos: number, i: number) => {
      let depth = 0;
      for (let j = i + 1; j < cards.length; j++) {
        depth += clamp01((pos - (stackTop + j * step - dock - cardH)) / cardH);
      }
      return depth;
    };

    // Transforms follow a smoothed scroll position, for a little weight.
    const render = () => {
      frame = 0;
      const target = window.scrollY;
      y = Number.isNaN(y) || reduceMotion.matches ? target : y + (target - y) * 0.16;
      if (Math.abs(target - y) < 0.5) y = target;
      cards.forEach((card, i) => {
        card.style.setProperty("--rise", riseAt(y, i).toFixed(4));
        card.style.setProperty("--depth", depthAt(y, i).toFixed(4));
      });
      if (y !== target) frame = requestAnimationFrame(render);
    };

    // Text state follows the real scroll position, so it is never late.
    const update = () => {
      const s = window.scrollY;
      cards.forEach((card, i) => {
        card.dataset.state = riseAt(s, i) >= TEXT_IN ? "in" : "out";
      });
      if (!frame) frame = requestAnimationFrame(render);
    };

    const onResize = () => {
      measure();
      y = Number.NaN;
      update();
    };

    measure();
    update();
    section.dataset.ready = "true";

    const ro = new ResizeObserver(onResize);
    ro.observe(section);
    window.addEventListener("scroll", update, { passive: true });
    reduceMotion.addEventListener("change", onResize);

    // The intro's words rise once, the first time the intro comes into view.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        introEl?.setAttribute("data-shown", "true");
        io.disconnect();
      },
      { rootMargin: "0px 0px -20% 0px" },
    );
    if (introEl) io.observe(introEl);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("scroll", update);
      reduceMotion.removeEventListener("change", onResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="what-we-do"
      aria-labelledby="what-we-do-title"
      className={styles.section}
    >
      <header className={styles.intro} data-intro>
        <p className={styles.eyebrow}>{intro.eyebrow}</p>
        <h2 id="what-we-do-title" className={styles.introTitle}>
          <Words lines={intro.title} />
        </h2>
        <p className={styles.introBody}>{intro.body}</p>
      </header>

      <div ref={stackRef} className={styles.stack}>
        {chapters.map((c) => (
          <article key={c.number} className={styles.card} data-card>
            <div className={styles.cardInner}>
              <Picture media={c.media} />
              <div className={styles.text}>
                <h3 className={styles.title}>
                  <Words lines={c.title} />
                </h3>
                <p className={styles.body}>{c.body}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.index}>
        <h3 className={styles.indexTitle}>Capabilities</h3>
        <ul className={styles.glassGrid}>
          {capabilities.map((c) => (
            <li key={c.name} className={styles.glass}>
              <p className={styles.glassName}>{c.name}</p>
              <p className={styles.glassLine}>{c.line}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

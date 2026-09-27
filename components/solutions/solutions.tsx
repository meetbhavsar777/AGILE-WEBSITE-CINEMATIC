"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import { intro, solutions } from "./content";
import styles from "./solutions.module.css";

/**
 * SOLUTIONS: a header, then a pinned sideways gallery. While the stage is
 * pinned, scrolling down glides six tall photo cards to the left; each
 * picture drifts inside its frame as it passes. Scroll position drives it,
 * so scrolling back plays it in reverse.
 */

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

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

export function Solutions() {
  const headerRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const story = storyRef.current;
    const track = trackRef.current;
    if (!header || !story || !track) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cards = [...track.querySelectorAll<HTMLElement>("[data-card]")];
    let top = 0;
    let distance = 0;
    let vw = 1;
    let x = Number.NaN;
    let frame = 0;

    const pageTop = (el: HTMLElement) => {
      let t = 0;
      for (let n: HTMLElement | null = el; n; n = n.offsetParent as HTMLElement | null) t += n.offsetTop;
      return t;
    };

    // The runway is exactly as long as the track has to travel.
    const measure = () => {
      vw = window.innerWidth;
      distance = Math.max(0, track.scrollWidth - vw);
      story.style.height = `${window.innerHeight + distance}px`;
      top = pageTop(story);
    };

    const render = () => {
      frame = 0;
      const target = -clamp01((window.scrollY - top) / Math.max(1, distance)) * distance;
      x = Number.isNaN(x) || reduceMotion.matches ? target : x + (target - x) * 0.14;
      if (Math.abs(target - x) < 0.3) x = target;
      track.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;
      place();
      if (x !== target) frame = requestAnimationFrame(render);
    };

    // Each card knows how far it sits from the middle of the screen.
    const place = () => {
      for (const card of cards) {
        const d = (card.offsetLeft + card.offsetWidth / 2 + x - vw / 2) / vw;
        card.style.setProperty("--d", d.toFixed(4));
      }
    };

    const update = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const onResize = () => {
      measure();
      x = Number.NaN;
      update();
    };

    measure();
    update();
    header.dataset.ready = "true";

    const ro = new ResizeObserver(onResize);
    ro.observe(track);
    ro.observe(document.body);
    window.addEventListener("scroll", update, { passive: true });

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        header.dataset.shown = "true";
        io.disconnect();
      },
      { rootMargin: "0px 0px -20% 0px" },
    );
    io.observe(header);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <section id="solutions" aria-labelledby="solutions-title" className={styles.section}>
      <header ref={headerRef} className={styles.header}>
        <p className={styles.eyebrow}>{intro.eyebrow}</p>
        <h2 id="solutions-title" className={styles.title}>
          <Words lines={intro.title} />
        </h2>
        <p className={styles.lede}>{intro.body}</p>
      </header>

      <div ref={storyRef} className={styles.story}>
        <div className={styles.stage}>
          <div ref={trackRef} className={styles.track}>
            {solutions.map((s) => (
              <article key={s.id} className={styles.card} data-card>
                <div className={styles.picture}>
                  <div className={styles.media}>
                    {s.media.src ? (
                      <Image
                        src={s.media.src}
                        alt={s.media.alt ?? ""}
                        fill
                        sizes="(min-width: 768px) 40vw, 80vw"
                        style={s.media.focus ? { objectPosition: s.media.focus } : undefined}
                      />
                    ) : (
                      <span className={styles.placeholder} aria-hidden="true" />
                    )}
                  </div>
                </div>
                <div className={styles.text}>
                  <h3 className={styles.name}>{s.name}</h3>
                  <p className={styles.body}>{s.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

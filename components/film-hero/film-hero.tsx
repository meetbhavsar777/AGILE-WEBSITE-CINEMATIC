"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { QUOTE_HREF, QUOTE_LABEL } from "@/lib/contact";
import { RollText } from "./roll-text";
import styles from "./film-hero.module.css";

const FILM = {
  poster: "/video/hero-poster.jpg",
  loop: "/video/hero-loop.mp4",
  loopAv1: "/video/hero-loop-av1.mp4",
  loopMobile: "/video/hero-loop-720.mp4",
  full: "/video/agile-film-1080.mp4",
  duration: "2:15",
};

// Figures from the current agilescitech.in home page.
const STATS = [
  { value: 1500, label: "Customers" },
  { value: 15, label: "Product categories" },
  { value: 12, label: "Years in service" },
];

const formatStat = (n: number) => `${n.toLocaleString("en-IN")}+`;

const BRAND_WORDS = ["AGILE", "SCITECH"];
// The tagline from the official logo artwork.
const TAGLINE = "Advancing Science, Delivering Excellence";

// Scroll runway: the film opens over the first stretch, holds full screen,
// then darkens while the brand statement rises over it.
const OPEN_END = 0.35;
const HOLD_END = 0.55;

// Longest intro delay + duration in film-hero.module.css.
const INTRO_MS = 2300;
// The proof row fades in at 1000ms; its figures count up over 1.1s.
const COUNT_DELAY_MS = 1000;
const COUNT_MS = 1100;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export function FilmHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLSpanElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLParagraphElement>(null);
  const loopRef = useRef<HTMLVideoElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const fullRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const slot = slotRef.current;
    const loop = loopRef.current;
    const brand = brandRef.current;
    const name = nameRef.current;
    if (!section || !stage || !slot || !loop || !brand || !name) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    // Where the letterbox slot sits inside the stage. The film layer is
    // clipped to this box at rest and opens to the full stage on scroll.
    // Layout offsets, not getBoundingClientRect: the intro slides the
    // headline lines with transforms, which must not move the slot box.
    const measure = () => {
      let left = 0;
      let top = 0;
      for (
        let node: HTMLElement | null = slot;
        node && node !== stage;
        node = node.offsetParent as HTMLElement | null
      ) {
        left += node.offsetLeft;
        top += node.offsetTop;
      }
      const w = slot.offsetWidth;
      const h = slot.offsetHeight;
      const sw = stage.clientWidth;
      const sh = stage.clientHeight;
      const set = (name: string, value: number) =>
        stage.style.setProperty(name, `${value}px`);

      set("--slot-top", top);
      set("--slot-left", left);
      set("--slot-right", sw - left - w);
      set("--slot-bottom", sh - top - h);
      set("--slot-w", w);
      set("--slot-h", h);
      set("--slot-dx", left + w / 2 - sw / 2);
      set("--slot-dy", top + h / 2 - sh / 2);
      stage.style.setProperty(
        "--slot-scale",
        Math.max(w / sw, h / sh).toFixed(4),
      );
      stage.dataset.ready = "true";
      fitName();
    };

    // Size the brand name so its widest line spans the column exactly.
    // Transforms on the letters don't affect offsetWidth.
    const fitName = () => {
      const pad = getComputedStyle(brand);
      const available =
        brand.clientWidth -
        parseFloat(pad.paddingLeft) -
        parseFloat(pad.paddingRight);
      name.style.fontSize = "100px";
      const natural = name.offsetWidth;
      if (natural > 0) {
        name.style.fontSize = `${((100 * available) / natural).toFixed(2)}px`;
      }
    };

    const update = () => {
      frame = 0;
      if (reduceMotion.matches) {
        stage.style.setProperty("--p", "0");
        stage.style.setProperty("--q", "0");
        stage.dataset.phase = "rest";
        return;
      }
      const runway = section.offsetHeight - window.innerHeight;
      const t = clamp01(-section.getBoundingClientRect().top / runway);
      const open = clamp01(t / OPEN_END);
      const fade = clamp01((t - HOLD_END) / (1 - HOLD_END));
      stage.style.setProperty("--p", easeInOut(open).toFixed(4));
      stage.style.setProperty("--q", fade.toFixed(4));
      stage.dataset.phase =
        open < 0.02
          ? "rest"
          : open < 0.8
            ? "opening"
            : fade < 0.12
              ? "open"
              : "statement";
    };

    // The load intro never holds anyone up: any scroll, key or tap
    // jumps it to its final state.
    const introEvents = ["wheel", "touchmove", "keydown", "pointerdown", "scroll"];
    // The proof figures count up once, as the row fades in. Server HTML
    // already holds the final values, so nothing depends on this running.
    const counters = Array.from(
      stage.querySelectorAll<HTMLElement>("[data-count]"),
    );
    let countFrame = 0;
    const showFinalCounts = () => {
      cancelAnimationFrame(countFrame);
      counters.forEach((el) => {
        el.textContent = formatStat(Number(el.dataset.count));
      });
    };
    const countUp = (start: number) => {
      const tick = (now: number) => {
        const t = clamp01((now - start) / COUNT_MS);
        const eased = 1 - Math.pow(1 - t, 3);
        counters.forEach((el) => {
          el.textContent = formatStat(
            Math.round(Number(el.dataset.count) * eased),
          );
        });
        if (t < 1) countFrame = requestAnimationFrame(tick);
      };
      countFrame = requestAnimationFrame(tick);
    };

    const finishIntro = () => {
      showFinalCounts();
      stage.dataset.intro = "done";
      introEvents.forEach((type) => window.removeEventListener(type, finishIntro));
    };
    const introTimer = window.setTimeout(finishIntro, INTRO_MS);
    if (window.scrollY > 0 || reduceMotion.matches) finishIntro();
    else {
      introEvents.forEach((type) =>
        window.addEventListener(type, finishIntro, { passive: true, once: true }),
      );
      countUp(performance.now() + COUNT_DELAY_MS);
    }

    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const syncPlayback = (visible: boolean) => {
      if (visible && !reduceMotion.matches) {
        loop.muted = true;
        loop.play().catch(() => {});
      } else {
        loop.pause();
      }
    };

    const resize = new ResizeObserver(() => {
      measure();
      update();
    });
    resize.observe(stage);

    const visibility = new IntersectionObserver(([entry]) =>
      syncPlayback(entry.isIntersecting),
    );
    visibility.observe(section);

    const onMotionChange = () => {
      update();
      syncPlayback(true);
    };

    document.fonts.ready.then(measure);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    reduceMotion.addEventListener("change", onMotionChange);

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(countFrame);
      window.clearTimeout(introTimer);
      introEvents.forEach((type) => window.removeEventListener(type, finishIntro));
      resize.disconnect();
      visibility.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      reduceMotion.removeEventListener("change", onMotionChange);
    };
  }, []);

  // Stop the film however the dialog closes: button, Escape or backdrop.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const stop = () => fullRef.current?.pause();
    dialog.addEventListener("close", stop);
    return () => dialog.removeEventListener("close", stop);
  }, []);

  const openFilm = () => {
    dialogRef.current?.showModal();
    fullRef.current?.play().catch(() => {});
  };

  const closeFilm = () => dialogRef.current?.close();

  return (
    <section
      ref={sectionRef}
      className={styles.hero}
      aria-labelledby="hero-title"
    >
      <div
        ref={stageRef}
        className={styles.stage}
        data-phase="rest"
        data-intro="playing"
      >
        <div className={styles.copy}>
          <div className={styles.lead}>
            <div className={styles.titleBlock}>
              <h1 id="hero-title" className={styles.title}>
                <span className={styles.line}>
                  <span className={styles.lineInner}>Scientific technology.</span>
                </span>
                <span className={styles.line}>
                  <span className={styles.lineInner}>
                    Delivered with{" "}
                    <span className={styles.mark}>
                      precision
                      <TrajectoryArc />
                    </span>
                    .
                  </span>
                </span>
              </h1>
              {/* An empty strip below the headline; the film opens inside it. */}
              <span ref={slotRef} className={styles.slot} aria-hidden="true" />
            </div>

            <div className={styles.aside}>
              <p className={styles.lede}>
                Authorised in India for Welch, Inscinstech, RainSure, FlowCam,
                Unchained Labs and Bio-Techne. Serving pharma and biotech labs
                since 2013.
              </p>
              <div className={styles.actions}>
                <a className={styles.primary} href={QUOTE_HREF}>
                  <RollText>{QUOTE_LABEL}</RollText>
                </a>
                <button
                  type="button"
                  className={styles.secondary}
                  onClick={openFilm}
                  aria-haspopup="dialog"
                >
                  <PlayGlyph />
                  <RollText>{`Watch the film (${FILM.duration})`}</RollText>
                </button>
              </div>
            </div>
          </div>

          <div className={styles.proof}>
            <dl className={styles.stats}>
              {STATS.map((stat) => (
                <div key={stat.label} className={styles.stat}>
                  <dt>{stat.label}</dt>
                  <dd
                    data-count={stat.value}
                    data-final={formatStat(stat.value)}
                  >
                    {formatStat(stat.value)}
                  </dd>
                </div>
              ))}
            </dl>
            <p className={styles.place}>Based in Ahmedabad, Gujarat</p>
          </div>
        </div>

        <div className={styles.film} aria-hidden="true">
          <video
            ref={loopRef}
            className={styles.loop}
            poster={FILM.poster}
            muted
            loop
            playsInline
            preload="auto"
            tabIndex={-1}
          >
            <source
              src={FILM.loopMobile}
              media="(max-width: 767px)"
              type="video/mp4"
            />
            <source
              src={FILM.loopAv1}
              type='video/mp4; codecs="av01.0.08M.08"'
            />
            <source src={FILM.loop} type="video/mp4" />
          </video>
          <span className={styles.nightfall} />
        </div>

        <div className={styles.filmCaption}>
          <p className={styles.filmText}>
            <span className={styles.filmLabel}>Group company film</span>
            Inside the analytical lab of our group company, Agile BioScience.
          </p>
          <button
            type="button"
            className={styles.onFilm}
            onClick={openFilm}
            aria-haspopup="dialog"
          >
            <span className={styles.playDisc}>
              <PlayGlyph />
            </span>
            <RollText>Watch the film</RollText>
            <span className={styles.duration}>{FILM.duration}</span>
          </button>
        </div>

        <div ref={brandRef} className={styles.brand}>
          <p ref={nameRef} className={styles.brandName}>
            <span className={styles.srOnly}>Agile SciTech</span>
            {BRAND_WORDS.map((word, w) => (
              <span key={word} className={styles.brandWord} aria-hidden="true">
                {Array.from(word).map((letter, i) => (
                  <span
                    key={i}
                    className={styles.letter}
                    style={
                      {
                        "--i": BRAND_WORDS.slice(0, w).join("").length + i,
                      } as CSSProperties
                    }
                  >
                    {letter}
                  </span>
                ))}
              </span>
            ))}
          </p>
          <p className={styles.signature}>
            <span className={styles.signatureText}>
              {TAGLINE}
              <SignatureArc />
            </span>
          </p>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-label="Agile BioScience corporate film"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeFilm();
        }}
      >
        <button type="button" className={styles.close} onClick={closeFilm}>
          Close
        </button>
        <video
          ref={fullRef}
          className={styles.full}
          poster={FILM.poster}
          controls
          playsInline
          preload="none"
        >
          <source src={FILM.full} type="video/mp4" />
        </video>
      </dialog>
    </section>
  );
}

/** The logo's crossbar arc and end dot, drawn once under the key word. */
function TrajectoryArc() {
  return (
    <svg
      className={styles.arc}
      viewBox="0 0 440 34"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id="hero-arc"
          x1="0"
          y1="0"
          x2="440"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" style={{ stopColor: "var(--color-accent-bright)", stopOpacity: 0 }} />
          <stop offset="0.5" style={{ stopColor: "var(--color-accent-bright)" }} />
          <stop offset="1" style={{ stopColor: "var(--color-accent)" }} />
        </linearGradient>
      </defs>
      <path
        className={styles.arcPath}
        d="M8 30C96 15 228 5 424 9"
        pathLength={1}
        fill="none"
        stroke="url(#hero-arc)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle className={styles.arcHalo} cx="426" cy="9" r="10" />
      <circle className={styles.arcDot} cx="426" cy="9" r="4.5" />
    </svg>
  );
}

/** The logo's arc again, drawn under the tagline like a pen stroke. */
function SignatureArc() {
  return (
    <svg
      className={styles.signatureArc}
      viewBox="0 0 440 34"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id="signature-arc"
          x1="0"
          y1="0"
          x2="440"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" style={{ stopColor: "var(--color-accent-bright)", stopOpacity: 0 }} />
          <stop offset="0.55" style={{ stopColor: "var(--color-accent-bright)" }} />
          <stop offset="1" style={{ stopColor: "var(--color-glow)" }} />
        </linearGradient>
      </defs>
      <path
        className={styles.sigPath}
        d="M8 30C96 15 228 5 424 9"
        pathLength={1}
        fill="none"
        stroke="url(#signature-arc)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle className={styles.sigHalo} cx="426" cy="9" r="10" />
      <circle className={styles.sigDot} cx="426" cy="9" r="4" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg
      className={styles.play}
      viewBox="0 0 10 12"
      width="10"
      height="12"
      aria-hidden="true"
    >
      <path d="M0 0v12l10-6z" fill="currentColor" />
    </svg>
  );
}

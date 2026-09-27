"use client";

import { useEffect, useRef } from "react";
import styles from "./company-film.module.css";

/**
 * COMPANY FILM: a short header, then a frame that starts small in the
 * middle of the screen and grows to nearly full width as you scroll. It
 * loops the film's first six seconds without sound; the play button opens
 * the full film, with sound, in a dialog.
 */

const FILM = {
  loop: "/video/brief-loop.mp4",
  poster: "/video/brief-poster.jpg",
  // The film cropped slightly so its burned-in captions fall outside the frame.
  full: "/video/agile-film-clean.mp4",
  duration: "2:15",
};

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

export function CompanyFilm() {
  const runwayRef = useRef<HTMLDivElement>(null);
  const loopRef = useRef<HTMLVideoElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const fullRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const runway = runwayRef.current;
    const loop = loopRef.current;
    const dialog = dialogRef.current;
    if (!runway || !loop || !dialog) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let top = 0;
    let span = 1;
    let p = Number.NaN;
    let frame = 0;

    const pageTop = (el: HTMLElement) => {
      let t = 0;
      for (let n: HTMLElement | null = el; n; n = n.offsetParent as HTMLElement | null) t += n.offsetTop;
      return t;
    };

    const measure = () => {
      top = pageTop(runway);
      span = Math.max(1, runway.offsetHeight - window.innerHeight);
    };

    // Growth runs from when the stage pins until 70% of the runway, then
    // holds at full size; smoothed a little for weight.
    const render = () => {
      frame = 0;
      const target = reduceMotion.matches ? 1 : clamp01((window.scrollY - top) / (span * 0.7));
      p = Number.isNaN(p) || reduceMotion.matches ? target : p + (target - p) * 0.16;
      if (Math.abs(target - p) < 0.001) p = target;
      runway.style.setProperty("--p", p.toFixed(4));
      if (p !== target) frame = requestAnimationFrame(render);
    };

    const update = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const onResize = () => {
      measure();
      update();
    };

    // Play the loop only while it can be seen, and never with reduced motion.
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !reduceMotion.matches) loop.play().catch(() => {});
      else loop.pause();
    });
    io.observe(loop);

    // Closing the dialog (button, Esc or backdrop) stops the film.
    const onClose = () => fullRef.current?.pause();
    dialog.addEventListener("close", onClose);

    measure();
    update();
    const ro = new ResizeObserver(onResize);
    ro.observe(document.body);
    window.addEventListener("scroll", update, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("scroll", update);
      dialog.removeEventListener("close", onClose);
    };
  }, []);

  const open = () => {
    dialogRef.current?.showModal();
    fullRef.current?.play().catch(() => {});
  };

  return (
    <section id="film" aria-labelledby="film-title" className={styles.section}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Company film</p>
        <h2 id="film-title" className={styles.title}>
          See how we work.
        </h2>
      </header>

      <div ref={runwayRef} className={styles.runway}>
        <div className={styles.stage}>
          <div className={styles.frame}>
            <video
              ref={loopRef}
              className={styles.video}
              src={FILM.loop}
              poster={FILM.poster}
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
            {/* The whole frame is the button; a play icon appears in the
                middle on hover or focus (always, on touch screens). */}
            <button
              type="button"
              className={styles.play}
              onClick={open}
              aria-haspopup="dialog"
              aria-label={`Watch the film (${FILM.duration})`}
            >
              <span className={styles.playDisc} aria-hidden="true">
                <svg viewBox="0 0 10 12" width="10" height="12">
                  <path d="M0 0v12l10-6z" fill="currentColor" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-label="Company film"
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
      >
        <video
          ref={fullRef}
          className={styles.fullVideo}
          src={FILM.full}
          poster={FILM.poster}
          controls
          playsInline
          preload="none"
        />
        <form method="dialog">
          <button type="submit" className={styles.close}>
            Close
          </button>
        </form>
      </dialog>
    </section>
  );
}

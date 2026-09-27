"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./site-cursor.module.css";

/**
 * SITE CURSOR: a round cursor that takes over from the pointer only over
 * things marked `data-cursor`, and trails the mouse with a little lag.
 * `data-cursor="play"` shows a play icon; any other value is shown as a
 * short label ("View"). Mouse and trackpad only: touch screens and people
 * who prefer reduced motion keep the normal pointer.
 */

const LAG = 0.2; // share of the remaining distance covered each frame

export function SiteCursor() {
  const ref = useRef<HTMLDivElement>(null);
  // What the disc shows; kept after it hides so it fades out unchanged.
  const [kind, setKind] = useState("");
  const [on, setOn] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || calm.matches) return;

    const root = document.documentElement;
    root.classList.add("has-cursor");

    let x = -100, y = -100, cx = -100, cy = -100;
    let frame = 0;
    let current: string | null = null;

    const place = () => {
      cx += (x - cx) * LAG;
      cy += (y - cy) * LAG;
      if (ref.current) ref.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      frame = Math.abs(x - cx) + Math.abs(y - cy) > 0.1 ? requestAnimationFrame(place) : 0;
    };

    // Which marked element, if any, is under the pointer right now.
    const check = () => {
      const hit = document.elementFromPoint(x, y);
      const target = hit?.closest<HTMLElement>("[data-cursor]") ?? null;
      const next = target?.dataset.cursor ?? null;
      if (next !== current) {
        if (!current && next) {
          // Start from the pointer, not from wherever it was last hidden.
          cx = x;
          cy = y;
        }
        current = next;
        if (next) setKind(next);
        setOn(next !== null);
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      check();
      if (!frame) frame = requestAnimationFrame(place);
    };
    const onLeave = () => {
      current = null;
      setOn(false);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", check, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", check);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={styles.cursor} aria-hidden="true">
      <span
        className={styles.disc}
        data-on={on ? "" : undefined}
        data-kind={kind === "play" ? "play" : "label"}
      >
        {kind === "play" ? (
          <svg viewBox="0 0 10 12" width="10" height="12">
            <path d="M0 0v12l10-6z" fill="currentColor" />
          </svg>
        ) : (
          <span className={styles.label}>{kind}</span>
        )}
      </span>
    </div>
  );
}

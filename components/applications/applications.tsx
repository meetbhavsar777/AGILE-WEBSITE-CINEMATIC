"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./applications.module.css";
import { APPLICATIONS } from "./content";

/**
 * APPLICATIONS: the industries Agile serves, as large names in ruled rows.
 * Pointing at a row brings its photo up beside the cursor, where it follows
 * with a little lag. Screens without hover show a small photo in each row.
 */


export function Applications() {
  const [active, setActive] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);

  // The photo eases towards the pointer, so it trails a little behind.
  useEffect(() => {
    const list = listRef.current;
    const float = floatRef.current;
    if (!list || !float) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let tx = 0;
    let ty = 0;
    let x = Number.NaN;
    let y = Number.NaN;
    let frame = 0;

    const tick = () => {
      frame = 0;
      if (Number.isNaN(x) || reduce) {
        x = tx;
        y = ty;
      } else {
        x += (tx - x) * 0.18;
        y += (ty - y) * 0.18;
      }
      float.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      if (Math.abs(tx - x) > 0.3 || Math.abs(ty - y) > 0.3) frame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = list.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      x = Number.NaN;
      setActive(null);
    };

    list.addEventListener("pointermove", onMove);
    list.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      list.removeEventListener("pointermove", onMove);
      list.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section id="applications" aria-labelledby="applications-title" className={styles.section}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Applications</p>
        <h2 id="applications-title" className={styles.title}>
          <span className={styles.titleLine}>Where our</span>
          <span className={styles.titleLine}>technologies work.</span>
        </h2>
      </header>

      <div ref={listRef} className={styles.list} data-active={active !== null || undefined}>
        <ul className={styles.rows}>
          {APPLICATIONS.map((a, i) => (
            <li
              key={a.name}
              className={styles.row}
              data-on={i === active || undefined}
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") setActive(i);
              }}
            >
              <span className={styles.thumb} aria-hidden="true">
                <Image src={a.image} alt="" fill sizes="96px" />
              </span>
              <span className={styles.name}>{a.name}</span>
            </li>
          ))}
        </ul>

        {/* The floating photo: every image is stacked here, the active one shown. */}
        <div ref={floatRef} className={styles.float} aria-hidden="true">
          <div className={styles.floatInner}>
            {APPLICATIONS.map((a, i) => (
              <Image
                key={a.name}
                src={a.image}
                alt=""
                fill
                sizes="22rem"
                className={styles.floatImage}
                data-on={i === active || undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";

/**
 * Fits the night-to-day fade to the page it sits on. The fade starts at the
 * surface's first heading, and holds one colour through every area marked
 * `data-surface-hold` (the pinned card stack and the sideways gallery), so
 * the ground does not shift while cards are moving over it. It only changes
 * in the ordinary scrolling between those areas. Until this runs, the plain
 * CSS gradient in blue-surface.module.css stands in.
 */

// The colour chain, each segment eased in and out; every stop is a token.
const SEGMENTS = [
  ["night", "navy", "accent-deep"],
  ["accent-deep", "accent", "accent-bright"],
  ["accent-bright", "glow", "day"],
];
const SAMPLES = 8; // stops per segment

const token = (name: string) => `var(--color-${name})`;
const smooth = (t: number) => t * t * (3 - 2 * t);

// The colour a share `t` of the way along a chain, eased.
function along(chain: string[], t: number) {
  const u = smooth(t) * (chain.length - 1);
  const i = Math.min(Math.floor(u), chain.length - 2);
  const f = Math.round((u - i) * 100);
  if (f <= 0) return token(chain[i]);
  if (f >= 100) return token(chain[i + 1]);
  return `color-mix(in oklch, ${token(chain[i])} ${100 - f}%, ${token(chain[i + 1])})`;
}

export function SurfaceFade() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const surface = ref.current?.parentElement;
    if (!surface) return;
    const holds = [...surface.querySelectorAll<HTMLElement>("[data-surface-hold]")];
    const start = surface.querySelector("h2");
    if (!start || holds.length !== SEGMENTS.length - 1) return;

    const build = () => {
      const top = surface.getBoundingClientRect().top;
      const y = (el: Element) => el.getBoundingClientRect().top - top;
      const end = surface.offsetHeight;

      // Ramps run between these marks; the holds sit between the ramps.
      const marks = [y(start)];
      for (const h of holds) marks.push(y(h), y(h) + h.offsetHeight);
      marks.push(end);

      const stops = [`${token("night")} 0px`];
      SEGMENTS.forEach((chain, s) => {
        const a = marks[s * 2];
        const b = marks[s * 2 + 1];
        for (let k = 0; k <= SAMPLES; k++) {
          const t = k / SAMPLES;
          stops.push(`${along(chain, t)} ${(a + (b - a) * t).toFixed(1)}px`);
        }
      });
      surface.style.background = `linear-gradient(in oklch 180deg, ${stops.join(", ")})`;
    };

    build();
    // Pinned runways size themselves in script and with the window.
    const observer = new ResizeObserver(build);
    observer.observe(surface);
    for (const h of holds) observer.observe(h);
    return () => {
      observer.disconnect();
      surface.style.background = "";
    };
  }, []);

  return <span ref={ref} hidden />;
}

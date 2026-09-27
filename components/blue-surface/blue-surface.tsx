import type { ReactNode } from "react";
import styles from "./blue-surface.module.css";
import { SurfaceFade } from "./surface-fade";

/**
 * The page below the hero film. It starts on the logo's night ground, so the
 * film's fade-out meets it without a seam, and deepens into the logo blue.
 */
export function BlueSurface({
  children,
  from = "night",
}: {
  children: ReactNode;
  // "navy" when the section above already ends on navy, so there is no seam;
  // "night-to-day" runs the whole fade, night to white, in this one surface.
  from?: "night" | "navy" | "night-to-day";
}) {
  return (
    <div className={styles.surface} data-from={from}>
      {children}
      {from === "night-to-day" && <SurfaceFade />}
    </div>
  );
}

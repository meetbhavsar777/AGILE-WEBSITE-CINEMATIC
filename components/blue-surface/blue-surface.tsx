import type { ReactNode } from "react";
import styles from "./blue-surface.module.css";

/**
 * The page below the hero film. It starts on the logo's night ground, so the
 * film's fade-out meets it without a seam, and deepens into the logo blue.
 */
export function BlueSurface({ children }: { children: ReactNode }) {
  return <div className={styles.surface}>{children}</div>;
}

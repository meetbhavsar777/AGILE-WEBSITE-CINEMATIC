import type { CSSProperties } from "react";
import styles from "./roll-text.module.css";

/**
 * Label whose letters roll up one after another when the parent link or
 * button is hovered or focused. Screen readers get the plain text once.
 */
export function RollText({ children }: { children: string }) {
  return (
    <span className={styles.roll}>
      <span className={styles.srOnly}>{children}</span>
      <span className={styles.track} aria-hidden="true">
        {Array.from(children).map((char, i) => {
          const glyph = char === " " ? " " : char;
          return (
            <span
              key={i}
              className={styles.char}
              data-char={glyph}
              style={{ "--i": i } as CSSProperties}
            >
              {glyph}
            </span>
          );
        })}
      </span>
    </span>
  );
}

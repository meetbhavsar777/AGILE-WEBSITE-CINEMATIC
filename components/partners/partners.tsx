import Image from "next/image";
import type { ReactNode } from "react";
import styles from "./partners.module.css";

/**
 * PARTNERS: the six principals as a curated 3 × 2 grid on white, split only
 * by hairlines. Each cell: the partner's logo (quiet grey until hovered),
 * a thin line icon for its field, and one line on what it makes.
 * Kept apart from the clients strip on purpose.
 */

// Thin, consistent line icons (24 × 24, 1.25 stroke), one per field.
export const ICONS: Record<string, ReactNode> = {
  // A stirred vessel: bioprocessing.
  bioreactor: (
    <>
      <path d="M8 3h8M9 3v4.5L5.5 18.5A2 2 0 0 0 7.4 21h9.2a2 2 0 0 0 1.9-2.5L15 7.5V3" />
      <path d="M12 3v10M9.5 13h5" />
    </>
  ),
  // A PCR tube: molecular diagnostics.
  tube: (
    <>
      <path d="M8 3h8M9 3v12.5a3 3 0 0 0 6 0V3" />
      <path d="M9 10h6" />
    </>
  ),
  // A capped vial: biologics analysis.
  vial: (
    <>
      <path d="M9 3h6v3H9zM8.5 6h7v13a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2z" />
      <path d="M8.5 13h7" />
    </>
  ),
  // A column with bands: chromatography.
  column: (
    <>
      <path d="M10 2h4M10.5 2v2M13.5 2v2M9 4h6v16H9zM10.5 20v2M13.5 20v2" />
      <path d="M9 9h6M9 12h6M9 15.5h6" />
    </>
  ),
  // Linked atoms: life-science research.
  molecule: (
    <>
      <circle cx="6" cy="7" r="2" />
      <circle cx="18" cy="7" r="2" />
      <circle cx="12" cy="17" r="2.5" />
      <path d="M7.7 8.2 10.4 15M16.3 8.2 13.6 15M8 7h8" />
    </>
  ),
  // Particles in a field: flow imaging.
  particles: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="9" cy="10" r="1.5" />
      <circle cx="14.5" cy="9" r="1" />
      <circle cx="13" cy="15" r="2" />
      <circle cx="8.5" cy="15" r="0.75" />
    </>
  ),
};

export const PARTNERS = [
  {
    name: "Inscinstech",
    logo: "/images/partners/inscinstech-logo.png",
    icon: "bioreactor",
    line: "Automated bioprocessing and analytical systems.",
  },
  {
    name: "RainSure Scientific",
    logo: "/images/partners/rainsure-logo.png",
    icon: "tube",
    line: "Molecular diagnostics and precision life-science instruments.",
  },
  {
    name: "Unchained Labs",
    logo: "/images/partners/unchained-labs-logo.png",
    icon: "vial",
    line: "Analytical tools for biologics and gene therapy.",
  },
  {
    name: "Welch Materials",
    logo: "/images/partners/welch-logo.png",
    icon: "column",
    line: "Chromatography and separation technologies.",
  },
  {
    name: "Bio-Techne",
    logo: "/images/partners/biotechne-logo.png",
    icon: "molecule",
    line: "Life-science research, analytical and diagnostic technologies.",
  },
  {
    name: "FlowCam",
    logo: "/images/partners/flowcam-logo.png",
    icon: "particles",
    line: "Flow-imaging particle analysis.",
  },
];

export function Partners() {
  return (
    <section id="partners" aria-labelledby="partners-title" className={styles.section}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Partners</p>
        <h2 id="partners-title" className={styles.title}>
          <span className={styles.titleLine}>Global technologies.</span>
          <span className={styles.titleLine}>Local expertise.</span>
        </h2>
      </header>

      <ul className={styles.grid}>
        {PARTNERS.map((p) => (
          <li key={p.name} className={styles.cell}>
            <span className={styles.logo}>
              <Image src={p.logo} alt={p.name} fill sizes="(min-width: 1024px) 14rem, 45vw" />
            </span>
            <span className={styles.meta}>
              <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
                {ICONS[p.icon]}
              </svg>
              <span className={styles.line}>{p.line}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

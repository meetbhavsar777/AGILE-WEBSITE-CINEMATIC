import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { QUOTE_HREF, QUOTE_LABEL } from "@/lib/contact";
import { RollText } from "@/components/film-hero/roll-text";
import styles from "./site-nav.module.css";

// Section anchors are placeholders until those pages exist.
const LINKS = [
  { label: "Products", href: "#products" },
  { label: "Applications", href: "#applications" },
  { label: "Partners", href: "#partners" },
  { label: "About", href: "#about" },
];

export function SiteNav() {
  return (
    <header className={styles.wrap}>
      <nav className={styles.pill} aria-label="Primary">
        <Link className={styles.home} href="/" aria-label="Agile SciTech home">
          <Logo id="nav-logo" className={styles.logo} />
        </Link>
        <ul className={styles.links}>
          {LINKS.map((link) => (
            <li key={link.href}>
              <a className={styles.link} href={link.href}>
                <RollText>{link.label}</RollText>
              </a>
            </li>
          ))}
        </ul>
        <a
          className={styles.cta}
          href={QUOTE_HREF}
        >
          <RollText>{QUOTE_LABEL}</RollText>
        </a>
      </nav>
    </header>
  );
}

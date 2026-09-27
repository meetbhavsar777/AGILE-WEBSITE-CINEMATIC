import Link from "next/link";
import Image from "next/image";
import { OFFICE } from "@/lib/contact";
import styles from "./site-footer.module.css";

// The same destinations as the navigation bar.
const LINKS = [
  { label: "Products", href: "#products" },
  { label: "Solutions", href: "#solutions" },
  { label: "Partners", href: "#partners" },
  { label: "Contact", href: "#contact" },
];

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <Link href="/" className={styles.home} aria-label="Agile SciTech home">
          <Image
            className={styles.logo}
            src="/brand/agile-scitech-logo.png"
            alt="Agile SciTech"
            width={544}
            height={288}
          />
        </Link>
        <nav aria-label="Footer">
          <ul className={styles.links}>
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} Agile SciTech. Ahmedabad, Gujarat.</p>
        <p>
          <a href={OFFICE.sales.href}>{OFFICE.sales.label}</a>
        </p>
      </div>
    </footer>
  );
}

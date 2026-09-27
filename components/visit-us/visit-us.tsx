import { OFFICE, QUOTE_HREF, QUOTE_LABEL } from "@/lib/contact";
import styles from "./visit-us.module.css";

/**
 * CONTACT: the closing invitation on white. Heading, the office's real
 * details and two actions on the left; a quiet map of the Ahmedabad office
 * on the right. The map loads only when it nears the screen.
 */
export function VisitUs() {
  return (
    <section id="contact" aria-labelledby="contact-title" className={styles.section}>
      <div className={styles.text}>
        <p className={styles.eyebrow}>Contact us</p>
        <h2 id="contact-title" className={styles.title}>
          <span className={styles.titleLine}>Talk to our team</span>
          <span className={styles.titleLine}>in Ahmedabad.</span>
        </h2>

        <dl className={styles.details}>
          <div className={styles.detail}>
            <dt>Office</dt>
            <dd>
              <address>
                {OFFICE.lines.map((line) => (
                  <span key={line} className={styles.addressLine}>
                    {line}
                  </span>
                ))}
              </address>
            </dd>
          </div>
          <div className={styles.detail}>
            <dt>Phone</dt>
            <dd>
              <a href={OFFICE.phone.href}>{OFFICE.phone.label}</a>
            </dd>
          </div>
          <div className={styles.detail}>
            <dt>Email</dt>
            <dd className={styles.stack}>
              <a href={OFFICE.sales.href}>{OFFICE.sales.label}</a>
              <a href={OFFICE.info.href}>{OFFICE.info.label}</a>
            </dd>
          </div>
        </dl>

        <div className={styles.actions}>
          <a className={styles.primary} href={QUOTE_HREF}>
            {QUOTE_LABEL}
          </a>
          <a className={styles.secondary} href={OFFICE.directions} target="_blank" rel="noopener noreferrer">
            Get directions
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M5 11 11 5M6 5h5v5" />
            </svg>
          </a>
        </div>
      </div>

      <div className={styles.map}>
        <iframe
          className={styles.mapFrame}
          src={OFFICE.mapEmbed}
          title="Map of the Agile SciTech office in Gota, Ahmedabad"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </section>
  );
}

import styles from "./wireframe-sections.module.css";

/**
 * Structure-only wireframe of the page below the clients strip. Every shape
 * is an empty placeholder; content arrives section by section later. Each
 * section carries an accessible name and an anchor id so the nav can link to
 * it once the content exists.
 */

function Box({ className = "" }: { className?: string }) {
  return <div className={`${styles.box} ${className}`} aria-hidden="true" />;
}

function Bar({ className = "" }: { className?: string }) {
  return <div className={`${styles.bar} ${className}`} aria-hidden="true" />;
}

function Head() {
  return (
    <div className={styles.head} aria-hidden="true">
      <Bar className={styles.headline} />
      <Bar className={styles.subline} />
    </div>
  );
}

// `withWhatWeDo={false}` / `withSolutions={false}` leave out a wireframe when
// the real section is shown instead.
export function WireframeSections({
  withWhatWeDo = true,
  withSolutions = true,
  withProducts = true,
  withFilm = true,
  withApplications = true,
  withPartners = true,
  withWhy = true,
  light = false,
}: {
  withWhatWeDo?: boolean;
  withSolutions?: boolean;
  withProducts?: boolean;
  withFilm?: boolean;
  withApplications?: boolean;
  withPartners?: boolean;
  withWhy?: boolean;
  // On a white ground: every wireframe draws in ink.
  light?: boolean;
}) {
  const tone = (t: string) => (light ? "day" : t);
  return (
    <>
      {/* What we do: statement beside a short supporting column */}
      {withWhatWeDo && <section id="what-we-do" aria-label="What we do" className={styles.section} data-tone={tone("night")}>
        <div className={styles.split}>
          <Box className={styles.statement} />
          <div className={styles.stack}>
            <Bar />
            <Bar />
            <Bar className={styles.short} />
          </div>
        </div>
      </section>}

      {/* Solutions: ruled rows, name left and detail right */}
      {withSolutions && <section id="solutions" aria-label="Solutions" className={styles.section} data-tone={tone("night")}>
        <Head />
        <div className={styles.rows}>
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className={styles.row} aria-hidden="true">
              <Bar className={styles.rowName} />
              <Bar className={styles.rowMeta} />
            </div>
          ))}
        </div>
      </section>}

      {/* Featured products: one lead product and two supporting */}
      {withProducts && <section id="products" aria-label="Featured products" className={styles.section} data-tone={tone("night")}>
        <Head />
        <div className={styles.products}>
          <Box className={styles.productLead} />
          <Box />
          <Box />
        </div>
      </section>}

      {/* Applications: a tab strip over one panel */}
      {withApplications && <section id="applications" aria-label="Applications" className={styles.section} data-tone={tone("dusk")}>
        <Head />
        <div className={styles.tabs} aria-hidden="true">
          {Array.from({ length: 5 }, (_, i) => (
            <Bar key={i} className={styles.tab} />
          ))}
        </div>
        <div className={styles.panel}>
          <Box className={styles.panelMedia} />
          <div className={styles.stack}>
            <Bar />
            <Bar />
            <Bar />
            <Bar className={styles.short} />
          </div>
        </div>
      </section>}

      {/* Company brief video: one wide frame */}
      {withFilm && <section id="film" aria-label="Company brief video" className={styles.section} data-tone={tone("dusk")}>
        <Head />
        <Box className={styles.video} />
      </section>}

      {/* Partners: the six authorised brands */}
      {withPartners && <section id="partners" aria-label="Partners" className={styles.section} data-tone={tone("day")}>
        <Head />
        <div className={styles.partners}>
          {Array.from({ length: 6 }, (_, i) => (
            <Box key={i} className={styles.partner} />
          ))}
        </div>
      </section>}

      {/* Why Agile: statement left, reasons as ruled rows right */}
      {withWhy && <section id="why-agile" aria-label="Why Agile" className={styles.section} data-tone={tone("day")}>
        <div className={styles.split}>
          <Box className={styles.statement} />
          <div className={styles.rows}>
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className={styles.row} aria-hidden="true">
                <Bar className={styles.rowName} />
              </div>
            ))}
          </div>
        </div>
      </section>}
    </>
  );
}

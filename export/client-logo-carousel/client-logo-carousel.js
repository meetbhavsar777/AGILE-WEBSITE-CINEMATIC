/*!
 * <client-logo-carousel>: auto-scrolling client logo strip.
 * No dependencies. Works on any site: plain HTML, WordPress, PHP, React, Vue...
 *
 * 1. Copy this file and the `logos/` folder into your project.
 * 2. Load the script once, anywhere in the page:
 *      <script src="client-logo-carousel.js" defer></script>
 * 3. Put the tag where the section should appear:
 *      <client-logo-carousel></client-logo-carousel>
 *
 * Attributes (all optional):
 *   heading   Section title.
 *   src-base  Folder holding the logo files, relative to the page. Default "logos/".
 *   interval  Milliseconds between steps. Default 1000.
 *
 * Styling hooks (set on the tag or any parent element):
 *   --clc-card-bg    Logo card background. Default #f5f5f5.
 *   --clc-radius     Card corner radius. Default 0.5rem.
 *   --clc-gap        Space between cards. Default 1rem.
 *   --clc-max-width  Content width. Default 1280px.
 *   client-logo-carousel::part(heading) and ::part(card) for anything else.
 * The heading inherits the page's font and text colour.
 */
(() => {
  const DEFAULT_HEADING =
    "Trusted by leading pharmaceutical and life-science companies";

  const LOGOS = [
    ["Lupin", "lupin.webp"],
    ["Premas Biotech", "premas-biotech.webp"],
    ["Abbott", "abbott.webp"],
    ["Alkem", "alkem.webp"],
    ["Amneal", "amneal.webp"],
    ["Apothecon Pharmaceuticals", "apothecon.webp"],
    ["Aurobindo", "aurobindo.webp"],
    ["Biocon", "biocon.webp"],
    ["Cipla", "cipla.webp"],
    ["Mankind", "mankind.webp"],
    ["GSK", "gsk.webp"],
    ["Cadila Pharmaceuticals", "cadila.webp"],
    ["Sanofi", "sanofi.webp"],
    ["Glenmark", "glenmark.webp"],
    ["Divi's", "divis.webp"],
    ["Dr. Reddy's", "dr-reddys.webp"],
    ["Alembic", "alembic.webp"],
    ["Sai Life Sciences", "sai-life-sciences.webp"],
    ["Jubilant Life Sciences", "jubilant-life-sciences.webp"],
    ["Intas Pharmaceuticals", "intas.webp"],
    ["SimSon Pharma", "simson-pharma.webp"],
    ["Sun Pharma", "sun-pharma.webp"],
    ["Neuland", "neuland.webp"],
    ["Natco", "natco.webp"],
    ["Sumar Biotech", "sumar-biotech.webp"],
    ["Torrent Pharma", "torrent-pharma.webp"],
    ["Apicore", "apicore.webp"],
    ["Zydus", "zydus.webp"],
  ];

  // Largest number of cards visible at once (desktop). The strip ends with
  // this many copies of the first logos so it can wrap without a rewind.
  const MAX_PER_VIEW = 6;

  const CSS = `
    :host { display: block; }
    .section { padding: 5rem 1rem; }
    .inner {
      max-width: var(--clc-max-width, 1280px);
      margin-inline: auto;
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
    }
    h2 {
      margin: 0;
      font-size: 1.25rem;
      line-height: 1.75rem;
      font-weight: 400;
      letter-spacing: -0.05em;
      text-align: left;
    }
    .viewport { overflow: hidden; }
    .track {
      --per-view: 2;
      display: flex;
      margin-left: calc(var(--clc-gap, 1rem) * -1);
      transform: translateX(calc(var(--i, 0) * -100% / var(--per-view)));
      transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .item {
      flex: 0 0 calc(100% / var(--per-view));
      min-width: 0;
      padding-left: var(--clc-gap, 1rem);
      box-sizing: border-box;
    }
    .card {
      position: relative;
      aspect-ratio: 3 / 2;
      background: var(--clc-card-bg, #f5f5f5);
      border-radius: var(--clc-radius, 0.5rem);
    }
    .card img {
      position: absolute;
      inset: 1rem;
      width: calc(100% - 2rem);
      height: calc(100% - 2rem);
      object-fit: contain;
    }
    @media (min-width: 640px) {
      .track { --per-view: 3; }
    }
    @media (min-width: 768px) {
      h2 { font-size: 1.875rem; line-height: 2.25rem; }
      .track { --per-view: 4; }
    }
    @media (min-width: 1024px) {
      .section { padding-block: 10rem; }
      h2 { font-size: 3rem; line-height: 1; max-width: 36rem; }
      .track { --per-view: 6; }
    }
  `;

  class ClientLogoCarousel extends HTMLElement {
    connectedCallback() {
      if (!this.shadowRoot) {
        this.render();
      }
      this.start();
    }

    disconnectedCallback() {
      clearInterval(this.timer);
    }

    render() {
      const root = this.attachShadow({ mode: "open" });
      const base = this.getAttribute("src-base") ?? "logos/";

      root.innerHTML = `
        <style>${CSS}</style>
        <section class="section">
          <div class="inner">
            <h2 part="heading"></h2>
            <div class="viewport" role="region" aria-roledescription="carousel" aria-label="Client logos">
              <div class="track"></div>
            </div>
          </div>
        </section>`;
      root.querySelector("h2").textContent =
        this.getAttribute("heading") ?? DEFAULT_HEADING;
      this.track = root.querySelector(".track");

      const items = [...LOGOS, ...LOGOS.slice(0, MAX_PER_VIEW)];
      items.forEach(([name, file], n) => {
        const isClone = n >= LOGOS.length;
        const item = document.createElement("div");
        item.className = "item";
        if (isClone) {
          item.setAttribute("aria-hidden", "true");
        } else {
          item.setAttribute("role", "group");
          item.setAttribute("aria-roledescription", "slide");
        }

        const card = document.createElement("div");
        card.className = "card";
        card.setAttribute("part", "card");

        const img = document.createElement("img");
        img.src = base + file;
        img.alt = isClone ? "" : name;
        img.decoding = "async";

        card.append(img);
        item.append(card);
        this.track.append(item);
      });

      this.index = 0;
    }

    start() {
      clearInterval(this.timer);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }
      const interval = Number(this.getAttribute("interval")) || 1000;
      this.timer = setInterval(() => this.next(), interval);
    }

    next() {
      if (this.index >= LOGOS.length) {
        // The clones now on screen look exactly like the start of the strip,
        // so jump back to it without animating, then carry on.
        this.track.style.transition = "none";
        this.setIndex(0);
        void this.track.offsetWidth;
        this.track.style.transition = "";
      }
      this.setIndex(this.index + 1);
    }

    setIndex(index) {
      this.index = index;
      this.track.style.setProperty("--i", String(index));
    }
  }

  if (!customElements.get("client-logo-carousel")) {
    customElements.define("client-logo-carousel", ClientLogoCarousel);
  }
})();

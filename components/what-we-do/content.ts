// Copy for WHAT WE DO, kept apart from the animation logic.
// All wording is from the Agile SciTech brief; nothing here is invented.

// A media slot. `ratio` is width / height. Leave `src` empty to show the
// placeholder; add a path under /public and alt text to show a real image.
export type Media = {
  ratio: number;
  src?: string;
  alt?: string;
  // CSS object-position, when the subject is not centred.
  focus?: string;
};

export type Chapter = {
  number: string;
  label: string;
  title: [string, string];
  body: string;
  cta: { label: string; href: string };
  // The chapter's picture. All three share one size.
  media: Media;
};

export const intro = {
  eyebrow: "What we do",
  title: ["From technology", "to application."] as [string, string],
  body: "We connect global scientific technologies with application expertise, engineering, and technical support to build solutions around real workflows.",
};

// CTA targets are homepage sections until dedicated pages exist.
export const chapters: Chapter[] = [
  {
    number: "01",
    label: "Technology",
    title: ["Global scientific", "technologies."],
    body: "Access specialized scientific technologies across chromatography, analytical systems, bioprocessing, life sciences, imaging, molecular workflows, and sample preparation.",
    cta: { label: "Explore technologies", href: "/#products" },
    media: { ratio: 16 / 10, src: "/images/what-we-do/technology.jpg", alt: "An engineer in a lab coat and blue gloves using the touchscreen of a Wyatt DAWN light-scattering detector." },
  },
  {
    number: "02",
    label: "Engineering",
    title: ["From process", "to complete solutions."],
    body: "From technology selection and system configuration to integration and turnkey execution, we build around process, facility, and application requirements.",
    cta: { label: "Explore engineering", href: "/#solutions" },
    media: { ratio: 16 / 10, src: "/images/what-we-do/engineering.jpg", alt: "An analytical lab bench with spectrometers, a nitrogen generator and workstations." },
  },
  {
    number: "03",
    label: "Support",
    title: ["Performance", "beyond installation."],
    body: "Technical support, maintenance, qualification assistance, and lifecycle service keep critical systems performing reliably.",
    cta: { label: "Explore support", href: "/#why-agile" },
    media: { ratio: 16 / 10, src: "/images/what-we-do/support.jpg", alt: "The Agile team seated around a meeting-room table.", focus: "45% 65%" },
  },
];

// Each capability with one plain sentence, shown when its line is lit.
// Drawn from the brief's own wording; no claims beyond it.
export const capabilities = [
  {
    name: "Process & technology engineering",
    line: "Choosing and configuring the right instruments and systems around the way your process runs.",
  },
  {
    name: "Facility planning & turnkey execution",
    line: "Planning the lab or process space, then delivering the complete setup, ready to use.",
  },
  {
    name: "Maintenance & technical support",
    line: "Servicing, repairs and technical help that keep critical systems running reliably.",
  },
  {
    name: "Compliance & qualification",
    line: "Qualification assistance and documentation, so your systems are ready for regulated work.",
  },
  {
    name: "Custom instrumentation & system engineering",
    line: "Instruments and systems built or adapted for applications that standard products don't cover.",
  },
];

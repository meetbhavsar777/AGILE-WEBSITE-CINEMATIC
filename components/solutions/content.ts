// Copy for SOLUTIONS, from the Agile SciTech brief. Nothing here is invented.

import type { Media } from "@/components/what-we-do/content";

export type Solution = {
  id: string;
  name: string;
  body: string;
  // Leave `src` empty to show the placeholder frame.
  media: Media;
  // Description colour, picked from the photo (a --color-tint-* token).
  tint: "amber" | "ice" | "lavender" | "pink" | "coral" | "teal";
  // A pale photo; darkens the shade behind the text so it stays readable.
  light?: boolean;
};

export const intro = {
  eyebrow: "Solutions",
  title: ["Built around", "the workflow."] as [string, string],
  body: "From individual technologies to integrated systems, we bring together instruments, engineering and application expertise around the way your process actually works.",
};

export const solutions: Solution[] = [
  {
    id: "chromatography",
    tint: "amber",
    name: "Chromatography",
    body: "Separation technologies and systems for analytical, preparative and process workflows.",
    media: { ratio: 4 / 3, src: "/images/solutions/chromatography.webp", alt: "An autosampler tray loaded with capped sample vials.", focus: "50% 60%" },
  },
  {
    id: "bioprocessing",
    tint: "ice",
    name: "Bioprocessing",
    body: "Integrated technologies for upstream, downstream and bioprocess applications.",
    media: { ratio: 4 / 3, src: "/images/solutions/bioprocessing.webp", alt: "A glowing blue DNA double helix on a dark background.", focus: "50% 40%" },
  },
  {
    id: "life-science",
    tint: "lavender",
    name: "Life science",
    body: "Advanced technologies supporting research, analysis and laboratory workflows.",
    media: { ratio: 4 / 3, src: "/images/solutions/life-science.webp", alt: "An illustration of glowing neurons connected in a network.", focus: "50% 45%" },
  },
  {
    id: "molecular-imaging",
    tint: "pink",
    name: "Molecular & imaging",
    body: "Tools and systems for molecular analysis, imaging and advanced biological workflows.",
    media: { ratio: 4 / 3, src: "/images/solutions/molecular-imaging.webp", alt: "An illustration of cells with pink nuclei floating in blue.", focus: "45% 50%" },
  },
  {
    id: "sample-preparation",
    tint: "coral",
    name: "Sample preparation",
    body: "Reliable preparation technologies designed for accurate and reproducible analysis.",
    media: { ratio: 4 / 3, src: "/images/solutions/sample-preparation.webp", alt: "Gloved hands placing a tube of red sample into a rack of test tubes." },
    light: true,
  },
  {
    id: "custom-solutions",
    tint: "teal",
    name: "Custom solutions",
    body: "Engineered systems, integration and specialized configurations built around specific application requirements.",
    media: { ratio: 4 / 3, src: "/images/solutions/custom-solutions.webp", alt: "A white laboratory microscope on a bench.", focus: "50% 55%" },
    light: true,
  },
];

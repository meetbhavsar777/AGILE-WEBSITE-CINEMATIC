// Copy for SOLUTIONS, from the Agile SciTech brief. Nothing here is invented.

import type { Media } from "@/components/what-we-do/content";

export type Solution = {
  id: string;
  name: string;
  body: string;
  // Leave `src` empty to show the placeholder frame.
  media: Media;
};

export const intro = {
  eyebrow: "Solutions",
  title: ["Built around", "the workflow."] as [string, string],
  body: "From individual technologies to integrated systems, we bring together instruments, engineering and application expertise around the way your process actually works.",
};

export const solutions: Solution[] = [
  {
    id: "chromatography",
    name: "Chromatography",
    body: "Separation technologies and systems for analytical, preparative and process workflows.",
    media: { ratio: 4 / 3 },
  },
  {
    id: "bioprocessing",
    name: "Bioprocessing",
    body: "Integrated technologies for upstream, downstream and bioprocess applications.",
    media: { ratio: 4 / 3 },
  },
  {
    id: "life-science",
    name: "Life science",
    body: "Advanced technologies supporting research, analysis and laboratory workflows.",
    media: { ratio: 4 / 3 },
  },
  {
    id: "molecular-imaging",
    name: "Molecular & imaging",
    body: "Tools and systems for molecular analysis, imaging and advanced biological workflows.",
    media: { ratio: 4 / 3 },
  },
  {
    id: "sample-preparation",
    name: "Sample preparation",
    body: "Reliable preparation technologies designed for accurate and reproducible analysis.",
    media: { ratio: 4 / 3 },
  },
  {
    id: "custom-solutions",
    name: "Custom solutions",
    body: "Engineered systems, integration and specialized configurations built around specific application requirements.",
    media: { ratio: 4 / 3 },
  },
];

// Featured products for the home page: one flagship per partner. The full
// range lives on the products page (/products).
// Product names are as the current agilescitech.in site gives them.

export type Product = {
  id: string;
  partner: string;
  // Partner logo (a wide lockup, about 4:1).
  logo: string;
  // The partner's mark on its own, square. Partners without a separate
  // mark (RainSure, Bio-Techne) fall back to a small wordmark.
  icon?: string;
  name: string;
  // Leave empty to show the placeholder frame.
  image?: string;
  alt?: string;
};

export const intro = {
  eyebrow: "Featured products",
  title: ["Trusted global partners.", "Advanced technologies."] as [string, string],
  allLabel: "View all products",
  allHref: "/products",
};

export const products: Product[] = [
  {
    id: "welch-hplc-columns",
    partner: "Welch Materials",
    logo: "/images/partners/welch-logo.png",
    icon: "/images/partners/welch-icon.png",
    name: "HPLC columns",
    image: "/images/products/welch-hplc-columns.png",
    alt: "Welch Ultimate and Xtimate HPLC columns.",
  },
  {
    id: "inscinstech-fplc",
    partner: "Inscinstech",
    logo: "/images/partners/inscinstech-logo.png",
    icon: "/images/partners/inscinstech-icon.png",
    name: "Protein purification system (FPLC)",
    image: "/images/products/inscinstech-fplc.png",
    alt: "Inscinstech protein purification system.",
  },
  {
    id: "rainsure-fast16",
    partner: "RainSure Scientific",
    logo: "/images/partners/rainsure-logo.png",
    name: "Fast 16 qPCR system",
    image: "/images/products/rainsure-fast16-qpcr.png",
    alt: "RainSure Fast 16 real-time PCR system.",
  },
  {
    id: "flowcam",
    partner: "FlowCam",
    logo: "/images/partners/flowcam-logo.png",
    icon: "/images/partners/flowcam-icon.png",
    name: "FlowCam flow imaging microscope",
    image: "/images/products/flowcam.jpg",
    alt: "FlowCam instrument beside a monitor showing particle images.",
  },
  {
    id: "unchained-lunatic",
    partner: "Unchained Labs",
    logo: "/images/partners/unchained-labs-logo.png",
    icon: "/images/partners/unchained-labs-icon.png",
    name: "Lunatic",
    image: "/images/products/unchained-lunatic.png",
    alt: "Unchained Labs Lunatic instrument.",
  },
  {
    id: "biotechne",
    partner: "Bio-Techne",
    logo: "/images/partners/biotechne-logo.png",
    name: "Product to confirm",
  },
];

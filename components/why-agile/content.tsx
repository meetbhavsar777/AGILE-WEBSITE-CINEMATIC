import type { ReactNode } from "react";

// Reasons to choose Agile; every fact is from the current agilescitech.in site.

// Thin line icons, 24 × 24, matching the partner grid.
export const icons: Record<string, ReactNode> = {
  // Six points joined to one: many brands, one team.
  network: (
    <>
      <circle cx="12" cy="12" r="2.5" />
      <circle cx="4.5" cy="6" r="1.5" />
      <circle cx="19.5" cy="6" r="1.5" />
      <circle cx="4.5" cy="18" r="1.5" />
      <circle cx="19.5" cy="18" r="1.5" />
      <circle cx="12" cy="3" r="1.5" />
      <circle cx="12" cy="21" r="1.5" />
      <path d="M5.8 6.8 10 10.6M18.2 6.8 14 10.6M5.8 17.2 10 13.4M18.2 17.2 14 13.4M12 4.5v5M12 14.5v5" />
    </>
  ),
  // A wrench: maintenance and service.
  service: (
    <path d="M15 4.2a5 5 0 0 0-6.4 6.4l-5.2 5.2a2 2 0 0 0 2.8 2.8l5.2-5.2a5 5 0 0 0 6.4-6.4l-3 3-2.7-.5-.5-2.7Z" />
  ),
  // A document with a tick: compliance and qualification.
  qualify: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
      <path d="M14 3v5h5M9 14l2 2 4-4.5" />
    </>
  ),
};

export const REASONS = [
  {
    icon: "network",
    title: "Authorised for six global brands",
    body: "Welch, Inscinstech, RainSure, FlowCam, Unchained Labs and Bio-Techne, supplied and supported by one team.",
  },
  {
    icon: "service",
    title: "Maintenance and technical support",
    body: "Annual maintenance and service that keep critical systems performing.",
  },
  {
    icon: "qualify",
    title: "Compliance and qualification",
    body: "Documentation and qualification support for regulated labs.",
  },
];


import type { CSSProperties } from "react";

type LogoProps = {
  /** Unique per page — keeps the gradient ids from colliding. */
  id: string;
  /** "night" is the master artwork (light type on the dark ground). */
  tone?: "night" | "paper";
  className?: string;
};

// Brand artwork: the mark's colours are fixed brand values, not UI tokens.
const TONES = {
  night: { word: "#eef2f8", sub: "#9fb0c8", tip: "#9ae6ff", dot: "#d6f5ff", trail: "#c9f1ff" },
  paper: { word: "#04060a", sub: "#5a6a82", tip: "#3d9bff", dot: "#2560f0", trail: "#2560f0" },
};

export function Logo({ id, tone = "night", className }: LogoProps) {
  const c = TONES[tone];
  const wordmark: CSSProperties = { fontFamily: "var(--font-logo)" };

  return (
    <svg
      className={className}
      viewBox="0 0 236 60"
      role="img"
      aria-label="Agile SciTech"
    >
      <defs>
        <linearGradient id={`${id}-l`} x1="30" y1="2" x2="6" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={c.tip} />
          <stop offset=".55" stopColor="#3d9bff" />
          <stop offset="1" stopColor="#2560f0" />
        </linearGradient>
        <linearGradient id={`${id}-r`} x1="40" y1="10" x2="60" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2f78ff" />
          <stop offset="1" stopColor="#1340b5" />
        </linearGradient>
        <linearGradient id={`${id}-t`} x1="20" y1="0" x2="64" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3d9bff" stopOpacity="0" />
          <stop offset=".5" stopColor="#7cc4ff" />
          <stop offset="1" stopColor={c.trail} />
        </linearGradient>
      </defs>
      {/* The A's crossbar, redrawn as a trajectory arc behind the right leg */}
      <path
        d="M19 45.5C29 39.8 44 36.6 62.5 37.4"
        fill="none"
        stroke={`url(#${id}-t)`}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M30 2h7L15.2 58H2z" fill={`url(#${id}-l)`} />
      <path d="M40.6 10.2 62 58h-8.8L36.9 21.4z" fill={`url(#${id}-r)`} />
      <circle cx="62.6" cy="37.4" r="1.7" fill={c.dot} />
      <text x="80" y="33" fill={c.word} fontWeight="600" fontSize="27" letterSpacing="1.6" style={wordmark}>
        AGILE
      </text>
      <text x="81" y="49" fill={c.sub} fontWeight="300" fontSize="10.5" letterSpacing="6.1" style={wordmark}>
        SCITECH
      </text>
    </svg>
  );
}

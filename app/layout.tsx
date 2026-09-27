import type { Metadata } from "next";
import { Host_Grotesk, Newsreader, Sora } from "next/font/google";
import "./globals.css";

const hostGrotesk = Host_Grotesk({
  variable: "--font-host-grotesk",
  subsets: ["latin"],
});

// An upright book serif for section intros.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal"],
  axes: ["opsz"],
});

// The logo wordmark is set in Sora; used only inside <Logo>.
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "600"],
});

export const metadata: Metadata = {
  title: "Agile SciTech — Scientific technology, delivered with precision",
  description:
    "Authorised in India for Welch, Inscinstech, RainSure, FlowCam, Unchained Labs and Bio-Techne. Serving pharma and biotech labs from Ahmedabad since 2013.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${hostGrotesk.variable} ${newsreader.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

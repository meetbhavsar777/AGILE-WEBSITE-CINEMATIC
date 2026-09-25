import type { Metadata } from "next";
import { Host_Grotesk, Sora } from "next/font/google";
import "./globals.css";

const hostGrotesk = Host_Grotesk({
  variable: "--font-host-grotesk",
  subsets: ["latin"],
});

// The logo wordmark is set in Sora; used only inside <Logo>.
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "600"],
});

export const metadata: Metadata = {
  title: "Agile SciTech — Laboratory instruments, supported in India",
  description:
    "Authorised partner in India for Welch, Inscinstech, RainSure, FlowCam, Unchained Labs and Bio-Techne. Supplied, installed and serviced from Ahmedabad since 2013.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${hostGrotesk.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Anton, Caveat_Brush, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const caveat = Caveat_Brush({ subsets: ["latin"], weight: "400", variable: "--font-caveat" });

export const metadata: Metadata = {
  title: "Paras Kumar — Embedded Systems & VLSI Engineer",
  description: "Portfolio of Paras Kumar: CMOS design in Cadence Virtuoso, multi-layer PCBs in KiCad, and embedded firmware.",
};
export const viewport: Viewport = { themeColor: "#09090b" };

// Runs before first paint so nothing flashes before the cursors start.
const bootScript = `(function(){try{var q=new URLSearchParams(location.search).get("agents");var rm=matchMedia("(prefers-reduced-motion: reduce)").matches;var ls=null;try{ls=localStorage.getItem("agents")}catch(e){}var on=q==="on"||(q!=="off"&&!rm&&ls!=="off");if(on)document.documentElement.classList.add("build-mode")}catch(e){document.documentElement.classList.add("build-mode")}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${anton.variable} ${geist.variable} ${geistMono.variable} ${caveat.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <noscript><style>{`[data-build]{visibility:visible!important}`}</style></noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}

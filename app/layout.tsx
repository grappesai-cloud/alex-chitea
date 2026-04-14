import type { Metadata } from "next";
import { Bodoni_Moda, EB_Garamond, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import CustomCursor from "./components/CustomCursor";
import ScrollMarker from "./components/ScrollMarker";

const display = Bodoni_Moda({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const serif = EB_Garamond({
  variable: "--font-serif",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const italic = Instrument_Serif({
  variable: "--font-italic",
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Alexandru Chițea — Portfolio",
  description:
    "Alexandru Chițea — Romanian model based in Bucharest. Editorial, commercial, runway. Represented by Attitude Models.",
  openGraph: {
    title: "Alexandru Chițea — Portfolio",
    description: "Editorial · Commercial · Runway",
    images: ["/media/gallery/001.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${serif.variable} ${italic.variable} ${mono.variable} antialiased`}
    >
      <body>
        <SmoothScroll />
        <CustomCursor />
        <ScrollMarker />
        {children}
      </body>
    </html>
  );
}

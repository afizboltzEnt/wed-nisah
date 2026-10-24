import type { Metadata } from "next";
import {
  Playfair_Display,
  Cormorant_Garamond,
  Great_Vibes,
  Libre_Baskerville,
  Amiri,
} from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const baskerville = Libre_Baskerville({
  variable: "--font-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Walimatul Urus — Dani & Anisaq",
  description:
    "Dengan penuh kesyukuran, kami menjemput Dato'/Datin, Tuan/Puan, Encik/Cik untuk meraikan hari bahagia perkahwinan Muhammad Dani Firdaus & Nurul Anisaq — 26 Disember 2026.",
  openGraph: {
    title: "Jemputan Kahwin — Dani & Anisaq",
    description:
      "26 Disember 2026 — Sireh Junjung Banquet Hall, Encorp Strand Mall, Kota Damansara.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="ms"
      className={`${playfair.variable} ${cormorant.variable} ${greatVibes.variable} ${baskerville.variable} ${amiri.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
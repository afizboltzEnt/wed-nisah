import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Walimatul Urus — Dani & Anisah",
  description:
    "Dengan penuh kesyukuran, kami menjemput Dato'/Datin, Tuan/Puan, Encik/Cik untuk meraikan hari bahagia perkahwinan Muhammad Dani Firdaus & Nurul Anisaq — 27 Disember 2026.",
  openGraph: {
    title: "Jemputan Kahwin — Dani & Anisah",
    description:
      "27 Disember 2026 — Sireh Junjung Banquet Hall, Encorp Strand Mall, Kota Damansara.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="ms"
      className={`${playfair.variable} ${cormorant.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
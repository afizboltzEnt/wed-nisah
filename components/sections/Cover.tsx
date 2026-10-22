"use client";

import { motion } from "motion/react";
import { StaggerItem } from "../Stagger";
import { WEDDING } from "@/lib/constants";
import { Leaf, Fern, CornerFloral } from "../floral/Flowers";
import { Monogram } from "../Monogram";
import { drawLine, scaleIn, staggerContainer } from "@/lib/motion";

type Props = {
  /** Cover is always mounted (for SSR content + hero image preload), but its
   * reveal is gated on the envelope having opened rather than on scroll —
   * it's the very first thing on the page, so whileInView would fire the
   * instant it mounts, i.e. behind the still-opaque gate. */
  opened: boolean;
};

function EdgeStrip({ side }: { side: "top" | "bottom" }) {
  const flip = side === "bottom";
  return (
    <div
      className={`pointer-events-none absolute left-[150px] right-[150px] flex items-center justify-center gap-3 opacity-50 sm:left-[190px] sm:right-[190px] sm:gap-6 ${
        side === "top" ? "top-3" : "bottom-3"
      }`}
      aria-hidden
    >
      <Fern size={20} flip={!flip} />
      <Leaf size={16} flip={flip} />
      <Fern size={20} flip={flip} />
    </div>
  );
}

export default function Cover({ opened }: Props) {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 py-16 text-center">
      {/* hero-scale gold pinstripe — the single full-fidelity moment matching the PDF card */}
      <div
        className="pointer-events-none absolute inset-3 rounded-[28px] border border-gold/70 sm:inset-5"
        style={{
          clipPath:
            "polygon(18px 0, calc(100% - 18px) 0, 100% 18px, 100% calc(100% - 18px), calc(100% - 18px) 100%, 18px 100%, 0 calc(100% - 18px), 0 18px)",
        }}
      />
      <div className="pointer-events-none absolute inset-[26px] rounded-[18px] border border-gold/40 sm:inset-10" />

      {/* dense corners, all 4 edges framed — rose/peony SVG cluster instead of the PDF-specific raster set */}
      <CornerFloral
        corner="tl"
        className="pointer-events-none absolute left-0 top-0 h-auto w-[150px] sm:w-[190px]"
      />
      <CornerFloral
        corner="tr"
        className="pointer-events-none absolute right-0 top-0 h-auto w-[150px] sm:w-[190px]"
      />
      <CornerFloral
        corner="bl"
        className="pointer-events-none absolute bottom-0 left-0 h-auto w-[150px] sm:w-[190px]"
      />
      <CornerFloral
        corner="br"
        className="pointer-events-none absolute bottom-0 right-0 h-auto w-[150px] sm:w-[190px]"
      />
      <EdgeStrip side="top" />
      <EdgeStrip side="bottom" />

      <motion.div
        className="relative z-10 flex flex-col items-center"
        variants={staggerContainer(0.18)}
        initial="hidden"
        animate={opened ? "show" : "hidden"}
      >
        <StaggerItem variants={scaleIn}>
          <div className="animate-float">
            <Monogram size={110} />
          </div>
        </StaggerItem>

        <StaggerItem>
          <p className="mt-4 font-serif text-[0.7rem] uppercase tracking-[0.4em] text-sage">
            Jemputan Majlis Perkahwinan
          </p>
        </StaggerItem>

        <StaggerItem>
          <h1 className="mt-5 font-serif text-3xl leading-tight tracking-[0.1em] text-burgundy-deep sm:text-4xl">
            {WEDDING.groom.shortName.toUpperCase()}
          </h1>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-2 flex items-center gap-3">
            <motion.span
              variants={drawLine}
              style={{ transformOrigin: "center" }}
              className="h-px w-10 bg-gold/80"
            />
            <span className="font-serif italic text-xl text-rose">&amp;</span>
            <motion.span
              variants={drawLine}
              style={{ transformOrigin: "center" }}
              className="h-px w-10 bg-gold/80"
            />
          </div>
        </StaggerItem>

        <StaggerItem>
          <h1 className="mt-2 font-serif text-3xl leading-tight tracking-[0.1em] text-burgundy-deep sm:text-4xl">
            {WEDDING.bride.shortName.toUpperCase()}
          </h1>
        </StaggerItem>

        <StaggerItem>
          <p className="mt-6 font-serif text-sm uppercase tracking-[0.25em] text-gold-deep">
            {WEDDING.dayShort} | {WEDDING.dateNum}
          </p>
        </StaggerItem>

        <StaggerItem>
          <p className="mt-4 font-serif italic text-sm text-sage">
            Sireh Junjung Banquet Hall, Encorp Strand Mall, Kota Damansara
          </p>
        </StaggerItem>
      </motion.div>
    </section>
  );
}

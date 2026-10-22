"use client";

import { motion } from "motion/react";
import { StaggerItem } from "../Stagger";
import { WEDDING } from "@/lib/constants";
import { Leaf, RoseBloom, CornerFloral } from "../floral/Flowers";
import { drawLine, scaleIn, staggerContainer } from "@/lib/motion";

function SideRoses({ side }: { side: "left" | "right" }) {
  const flip = side === "right";
  return (
    <div
      className={`pointer-events-none absolute top-10 flex flex-col items-center gap-3 opacity-80 ${
        side === "left" ? "left-1 sm:left-4" : "right-1 sm:right-4"
      } ${flip ? "scale-x-[-1]" : ""}`}
      aria-hidden
    >
      <RoseBloom size={44} className="animate-float" />
      <Leaf size={22} />
      <RoseBloom size={30} style={{ animationDelay: "1.2s" }} className="animate-float" />
      <Leaf size={18} flip />
    </div>
  );
}

type Props = {
  /** Cover is always mounted (for SSR content + hero image preload), but its
   * reveal is gated on the envelope having opened rather than on scroll —
   * it's the very first thing on the page, so whileInView would fire the
   * instant it mounts, i.e. behind the still-opaque gate. */
  opened: boolean;
};

export default function Cover({ opened }: Props) {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
      <CornerFloral
        corner="tl"
        className="pointer-events-none absolute left-0 top-0 h-auto w-[130px] opacity-80 sm:w-[170px]"
      />
      <CornerFloral
        corner="br"
        className="pointer-events-none absolute bottom-0 right-0 h-auto w-[130px] opacity-80 sm:w-[170px]"
      />
      <SideRoses side="left" />
      <SideRoses side="right" />

      {/* Ivory arch panel */}
      <motion.div
        className="relative z-10 flex w-full max-w-sm flex-col items-center bg-paper/80 px-8 pb-10 pt-16 shadow-card backdrop-blur-[2px]"
        style={{ borderRadius: "999px 999px 24px 24px" }}
        variants={staggerContainer(0.18)}
        initial="hidden"
        animate={opened ? "show" : "hidden"}
      >
        <StaggerItem>
          <p className="font-script text-5xl text-burgundy sm:text-6xl">
            Save the Date
          </p>
        </StaggerItem>

        <StaggerItem>
          <h1 className="mt-6 font-serif text-2xl tracking-[0.15em] text-burgundy-deep sm:text-3xl">
            {WEDDING.groom.shortName.toUpperCase()}
          </h1>
        </StaggerItem>

        <StaggerItem>
          <div className="my-2 flex items-center gap-3">
            <motion.span
              variants={drawLine}
              style={{ transformOrigin: "center" }}
              className="h-px w-10 bg-gold/80"
            />
            <span className="font-script text-3xl text-burgundy">&amp;</span>
            <motion.span
              variants={drawLine}
              style={{ transformOrigin: "center" }}
              className="h-px w-10 bg-gold/80"
            />
          </div>
        </StaggerItem>

        <StaggerItem>
          <h1 className="font-serif text-2xl tracking-[0.15em] text-burgundy-deep sm:text-3xl">
            {WEDDING.bride.shortName.toUpperCase()}
          </h1>
        </StaggerItem>

        <StaggerItem variants={scaleIn}>
          <p className="mt-6 font-script text-2xl text-sage">
            We&rsquo;re getting married!
          </p>
        </StaggerItem>

        <StaggerItem>
          <p className="mt-5 font-display text-sm uppercase tracking-[0.3em] text-gold-deep">
            {WEDDING.dayShort} &middot; {WEDDING.dateNum}
          </p>
        </StaggerItem>

        <StaggerItem>
          <a
            href="#rsvp"
            className="mt-8 font-display text-sm italic text-burgundy underline-offset-4 hover:underline"
          >
            RSVP &darr;
          </a>
        </StaggerItem>
      </motion.div>
    </section>
  );
}

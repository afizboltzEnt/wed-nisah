"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { WEDDING } from "@/lib/constants";
import { fadeUp, scaleIn, staggerContainer } from "@/lib/motion";

type Props = {
  /** Cover is always mounted (for SSR content + hero image preload), but its
   * reveal is gated on the envelope having opened rather than on scroll —
   * it's the very first thing on the page, so whileInView would fire the
   * instant it mounts, i.e. behind the still-opaque gate. */
  opened: boolean;
};

const heroVenueLine = `${WEDDING.venue}, Encorp Strand Mall, Kota Damansara`;

export default function Cover({ opened }: Props) {
  return (
    <section className="hero" aria-label="Kad jemputan">
      <div className="inv">
        <Image
          src="/invitation/frame.webp"
          alt=""
          fill
          priority
          sizes="(min-width: 560px) 400px, 100vw"
          className="pointer-events-none select-none object-cover"
        />
        <motion.div
          className="inv-text"
          variants={staggerContainer(0.15)}
          initial="hidden"
          animate={opened ? "show" : "hidden"}
        >
          <motion.p variants={fadeUp} className="kicker">
            Jemputan
            <br />
            Majlis Perkahwinan
          </motion.p>
          <motion.div variants={scaleIn}>
            <Image
              src="/invitation/monogram.webp"
              alt={`Monogram ${WEDDING.groom.initials}${WEDDING.bride.initials}`}
              width={202}
              height={224}
              className="mono"
            />
          </motion.div>
          <motion.h1 variants={fadeUp} className="nm first">
            {WEDDING.groom.shortName.toUpperCase()}
          </motion.h1>
          <motion.div variants={fadeUp} className="amp-row" aria-hidden="true">
            <span className="amp">&amp;</span>
          </motion.div>
          <motion.p variants={fadeUp} className="nm">
            {WEDDING.bride.shortName.toUpperCase()}
          </motion.p>
          <motion.p variants={fadeUp} className="date">
            {WEDDING.dayShort.toUpperCase()} | {WEDDING.dateNum}
          </motion.p>
          <motion.p variants={fadeUp} className="venue">
            {heroVenueLine}
          </motion.p>
        </motion.div>
      </div>
      <a className="cue" href="#jemputan">
        Buka jemputan
      </a>
    </section>
  );
}

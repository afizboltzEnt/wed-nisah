"use client";

import { motion } from "framer-motion";
import { Monogram } from "../Monogram";
import Reveal from "../Reveal";
import { WEDDING } from "@/lib/constants";

export default function Cover() {
  return (
    <section className="flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Monogram size={104} className="animate-float" />
      </motion.div>

      <Reveal delay={0.1}>
        <p className="mt-4 font-display text-[0.7rem] font-light uppercase tracking-[0.4em] text-sage">
          Walimatul Urus
        </p>
      </Reveal>

      <Reveal delay={0.2}>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-burgundy-deep sm:text-[2.6rem]">
          Dani <span className="italic text-rose">&amp;</span> Anisah
        </h1>
      </Reveal>

      <Reveal delay={0.3}>
        <p className="mt-4 font-display text-xs font-light uppercase leading-relaxed tracking-[0.18em] text-sage-light">
          Dengan penuh kesyukuran, kami menjemput
          <br />
          Tuan/Puan, Encik/Cik &amp; ahli keluarga
        </p>
      </Reveal>

      <Reveal delay={0.4}>
        <div className="mt-6 flex items-center gap-3">
          <span className="h-px w-14 bg-gradient-to-r from-transparent to-gold/80" />
          <span className="text-gold">✦</span>
          <span className="h-px w-14 bg-gradient-to-l from-transparent to-gold/80" />
        </div>
      </Reveal>

      <Reveal delay={0.5}>
        <p className="mt-5 font-serif text-[2rem] tracking-[0.3em] text-gold-deep">
          {WEDDING.dateNum}
        </p>
      </Reveal>

      <Reveal delay={0.6}>
        <p className="mt-2 font-display text-[0.65rem] font-light uppercase tracking-[0.3em] text-burgundy/70">
          {WEDDING.time}
        </p>
      </Reveal>

      <Reveal delay={0.7}>
        <p className="mt-6 font-display text-xs font-light uppercase leading-loose tracking-[0.2em] text-sage">
          Sireh Junjung Banquet Hall
          <br />
          Encorp Strand Mall, Kota Damansara
        </p>
      </Reveal>
    </section>
  );
}
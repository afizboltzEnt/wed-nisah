"use client";

import Image from "next/image";
import Reveal from "../Reveal";
import { WEDDING } from "@/lib/constants";

export default function Cover() {
  return (
    <section className="flex flex-col items-center text-center">
      <Reveal y={16}>
        <Image
          src="/flowers/monogram.webp"
          alt={`${WEDDING.groom.shortName} & ${WEDDING.bride.shortName}`}
          width={363}
          height={409}
          className="w-[110px] h-auto animate-float"
          priority
        />
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-4 font-serif text-[0.7rem] uppercase tracking-[0.4em] text-sage">
          Jemputan Majlis Perkahwinan
        </p>
      </Reveal>

      <Reveal delay={0.2}>
        <h1 className="mt-5 font-serif text-3xl leading-tight tracking-[0.1em] text-burgundy-deep sm:text-4xl">
          {WEDDING.groom.shortName.toUpperCase()}
        </h1>
      </Reveal>

      <Reveal delay={0.3}>
        <div className="mt-2 flex items-center gap-3">
          <span className="h-px w-10 bg-gold/80" />
          <span className="font-serif italic text-xl text-rose">&amp;</span>
          <span className="h-px w-10 bg-gold/80" />
        </div>
      </Reveal>

      <Reveal delay={0.4}>
        <h1 className="mt-2 font-serif text-3xl leading-tight tracking-[0.1em] text-burgundy-deep sm:text-4xl">
          {WEDDING.bride.shortName.toUpperCase()}
        </h1>
      </Reveal>

      <Reveal delay={0.5}>
        <p className="mt-6 font-serif text-sm uppercase tracking-[0.25em] text-gold-deep">
          {WEDDING.dayShort} | {WEDDING.dateNum}
        </p>
      </Reveal>

      <Reveal delay={0.6}>
        <p className="mt-4 font-serif italic text-sm text-sage">
          Sireh Junjung Banquet Hall, Encorp Strand Mall, Kota Damansara
        </p>
      </Reveal>
    </section>
  );
}
"use client";

import { useEffect, useState } from "react";
import { StaggerGroup, StaggerItem } from "../Stagger";
import { WEDDING } from "@/lib/constants";
import { fadeUp, scaleIn } from "@/lib/motion";

type Remaining = { days: number; hours: number; minutes: number; seconds: number };

function timeLeft(): Remaining {
  const diff = Math.max(
    0,
    new Date(WEDDING.targetDateISO).getTime() - Date.now()
  );
  const seconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  };
}

function Tile({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex h-20 w-16 flex-col items-center justify-center rounded-xl border border-gold/40 bg-paper/80 shadow-sm sm:h-24 sm:w-20">
      <span className="font-serif text-2xl text-burgundy-deep sm:text-3xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 font-display text-[0.6rem] uppercase tracking-[0.2em] text-sage">
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    const id = setInterval(() => setRemaining(timeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="flex flex-col items-center py-10 text-center">
      <StaggerGroup className="flex flex-col items-center">
        <StaggerItem variants={fadeUp}>
          <p className="font-script text-4xl text-burgundy">
            Until the big day
          </p>
        </StaggerItem>
        <StaggerItem variants={scaleIn} className="mt-6 flex gap-3">
          <Tile value={remaining?.days ?? 0} label="Days" />
          <Tile value={remaining?.hours ?? 0} label="Hours" />
          <Tile value={remaining?.minutes ?? 0} label="Minutes" />
          <Tile value={remaining?.seconds ?? 0} label="Seconds" />
        </StaggerItem>
      </StaggerGroup>
    </section>
  );
}

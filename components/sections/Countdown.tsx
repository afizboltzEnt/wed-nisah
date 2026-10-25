"use client";

import { useEffect, useState } from "react";
import { StaggerGroup, StaggerItem } from "../Stagger";
import SectionDivider from "../floral/SectionDivider";
import { WEDDING } from "@/lib/constants";

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

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="unit">
      <b>{String(value).padStart(2, "0")}</b>
      <span>{label}</span>
    </div>
  );
}

const heading =
  "font-caps text-[0.95rem] font-normal uppercase tracking-[0.3em] text-ink";

export default function Countdown() {
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    const id = setInterval(() => setRemaining(timeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="kira"
      className="flex flex-col items-center gap-5 text-center"
      aria-labelledby="kira-heading"
    >
      <h2 id="kira-heading" className={heading}>
        Menghitung Hari
      </h2>
      <SectionDivider />
      <StaggerGroup className="flex w-full flex-col items-center">
        <StaggerItem className="countdown">
          <Unit value={remaining?.days ?? 0} label="Hari" />
          <Unit value={remaining?.hours ?? 0} label="Jam" />
          <Unit value={remaining?.minutes ?? 0} label="Minit" />
          <Unit value={remaining?.seconds ?? 0} label="Saat" />
        </StaggerItem>
      </StaggerGroup>
    </section>
  );
}

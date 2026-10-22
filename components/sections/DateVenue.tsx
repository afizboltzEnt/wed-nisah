"use client";

import { StaggerGroup, StaggerItem } from "../Stagger";
import { WEDDING } from "@/lib/constants";
import { downloadICS } from "@/lib/ics";
import { RoseBloom } from "../floral/Flowers";

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function DateVenue() {
  return (
    <section className="relative flex flex-col items-center py-10 text-center" id="schedule">
      <StaggerGroup className="flex w-full flex-col items-center">
        <StaggerItem>
          <p className="font-script text-4xl text-burgundy">
            Wedding Celebration
          </p>
          <p className="mt-1 font-display text-sm italic text-sage">
            An afternoon of love in Kota Damansara
          </p>
        </StaggerItem>

        <StaggerItem className="relative mt-8 w-full max-w-sm">
          <RoseBloom
            size={44}
            className="pointer-events-none absolute -right-3 -top-3 opacity-80"
          />
          <div className="relative rounded-2xl border border-gold/40 bg-paper/80 p-6 text-left shadow-card">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-rose text-burgundy-deep">
              <CalendarIcon />
            </div>
            <p className="mt-4 font-display text-xs uppercase tracking-[0.2em] text-gold-deep">
              {WEDDING.dateLong}
            </p>
            <h3 className="mt-1 font-serif text-xl text-burgundy-deep">
              Walimatul Urus &amp; Persandingan
            </h3>
            <p className="mt-2 font-display text-sm leading-relaxed text-sage">
              {WEDDING.venue}
              <br />
              {WEDDING.address}
            </p>
            <div className="mt-3 flex items-center gap-1.5 font-display text-sm text-burgundy">
              <ClockIcon />
              {WEDDING.timeStart} — {WEDDING.time}
            </div>

            <div className="mt-5 flex gap-3">
              <a
                href={WEDDING.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-full border border-burgundy px-4 py-2.5 text-center font-display text-xs font-medium uppercase tracking-[0.1em] text-burgundy transition hover:bg-burgundy hover:text-cream"
              >
                View on Maps
              </a>
              <button
                type="button"
                onClick={() =>
                  downloadICS({
                    title: "Walimatul Urus Dani & Anisaq",
                    description: `Majlis Perkahwinan — ${WEDDING.venue}`,
                    location: WEDDING.address,
                    startISO: WEDDING.targetDateISO,
                    durationHours: 4,
                  })
                }
                className="flex-1 rounded-full border border-burgundy px-4 py-2.5 text-center font-display text-xs font-medium uppercase tracking-[0.1em] text-burgundy transition hover:bg-burgundy hover:text-cream"
              >
                Add to Calendar
              </button>
            </div>
          </div>
        </StaggerItem>
      </StaggerGroup>
    </section>
  );
}

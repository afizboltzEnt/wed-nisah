"use client";

import { StaggerGroup, StaggerItem } from "../Stagger";
import SectionDivider from "../floral/SectionDivider";
import { WEDDING } from "@/lib/constants";
import { downloadICS } from "@/lib/ics";

const heading =
  "font-caps text-[0.95rem] font-normal uppercase tracking-[0.3em] text-ink";

export default function DateVenue() {
  return (
    <section
      className="flex flex-col items-center gap-5 text-center"
      id="majlis"
      aria-labelledby="majlis-heading"
    >
      <h2 id="majlis-heading" className={heading}>
        Majlis
      </h2>
      <SectionDivider />
      <StaggerGroup className="flex w-full flex-col items-center">
        <StaggerItem className="event w-full">
          <div>
            <p className="ev-date">{WEDDING.dateLong}</p>
            <p className="ev-time">
              {WEDDING.timeStart} &ndash; {WEDDING.time}
            </p>
          </div>
          <div>
            <p className="ev-venue">{WEDDING.venue}</p>
            <p className="addr">{WEDDING.address}</p>
          </div>
          <div className="relative flex flex-wrap justify-center gap-2.5">
            <a
              className="btn"
              target="_blank"
              rel="noopener noreferrer"
              href={WEDDING.wazeUrl}
            >
              Waze
            </a>
            <a
              className="btn"
              target="_blank"
              rel="noopener noreferrer"
              href={WEDDING.mapsUrl}
            >
              Google Maps
            </a>
            <button
              type="button"
              className="btn"
              onClick={() =>
                downloadICS({
                  title: "Walimatul Urus Dani & Anisaq",
                  description: `Majlis Perkahwinan — ${WEDDING.venue}`,
                  location: WEDDING.address,
                  startISO: WEDDING.targetDateISO,
                  durationHours: 4,
                })
              }
            >
              Kalendar
            </button>
          </div>
        </StaggerItem>
      </StaggerGroup>
    </section>
  );
}

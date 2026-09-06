import Reveal from "../Reveal";
import { WEDDING } from "@/lib/constants";

function MapLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-1 items-center justify-center gap-2 rounded-full border border-gold bg-cream/80 px-5 py-3 font-display text-sm tracking-wide text-gold-deep shadow-sm transition hover:bg-gold hover:text-cream active:scale-95"
    >
      {icon}
      {label}
    </a>
  );
}

export default function DateVenue() {
  return (
    <section className="flex flex-col items-center py-10 text-center">
      <Reveal>
        <p className="font-serif text-2xl text-burgundy">Tarikh &amp; Masa</p>
      </Reveal>

      <Reveal delay={0.1} className="mt-6 w-full rounded-lg border border-gold/50 bg-cream/70 px-6 py-6 shadow-sm">
        <p className="font-serif text-[2.2rem] leading-none text-gold-foil">
          {WEDDING.dateNum}
        </p>
        <p className="mt-2 font-serif text-xl text-burgundy">
          {WEDDING.dateLong}
        </p>
        <p className="mt-1 font-display text-base text-sage-light">
          {WEDDING.timeStart}
        </p>
      </Reveal>

      <Reveal delay={0.2} className="mt-8">
        <p className="font-serif text-xl text-burgundy">Majlis</p>
        <p className="mt-2 font-display text-lg text-sage">
          Walimatul Urus &amp; Persandingan
        </p>
      </Reveal>

      <Reveal delay={0.3} className="mt-4 w-full rounded-lg border border-gold/50 bg-cream/70 px-6 py-6 shadow-sm">
        <p className="font-serif text-xl text-burgundy">
          {WEDDING.venue}
        </p>
        <p className="mx-auto mt-2 max-w-xs font-display text-base leading-relaxed text-sage">
          {WEDDING.address}
        </p>
      </Reveal>

      <Reveal delay={0.4} className="mt-6 flex w-full gap-3">
        <MapLink
          href={WEDDING.mapsUrl}
          label="Google Maps"
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5Z" />
            </svg>
          }
        />
        <MapLink
          href={WEDDING.wazeUrl}
          label="Waze"
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a10 10 0 0 0-9.6 7.1c-.3 1 0 2.2.7 3l8.4 8.4a1 1 0 0 0 1.4 0l.6-.6c1.6-1.7 3.3-3.4 3.9-5.9h2.3a1.6 1.6 0 0 0 1.6-2c-.4-1.6-1-3-2-4.4A10 10 0 0 0 12 2Zm-2.5 8.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm5 3.5a1 1 0 0 1-.7-.3l-5-5a1 1 0 0 1 1.4-1.4l5 5a1 1 0 0 1 0 1.4.9.9 0 0 1-.7.3Z" />
            </svg>
          }
        />
      </Reveal>
    </section>
  );
}
import Reveal from "../Reveal";
import { WEDDING } from "@/lib/constants";
import { FloralDivider } from "../floral/Flowers";

function Person({
  initials,
  name,
  short,
}: {
  initials: string;
  name: string;
  short: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-gold/60 shadow-lg" style={{ background: "radial-gradient(circle at 35% 30%, #fdf8f0, #efe2c8)" }}>
        <div className="absolute inset-2 rounded-full border border-gold/40" />
        <span className="font-serif text-3xl text-gold-foil">{initials}</span>
      </div>
      <h3 className="mt-4 font-serif text-xl leading-snug text-burgundy-deep">
        {name}
      </h3>
      <p className="mt-1 font-cormorant text-base italic text-sage">{short}</p>
    </div>
  );
}

export default function Couple() {
  return (
    <section className="flex flex-col items-center py-10">
      <Reveal>
        <p className="font-serif text-2xl text-burgundy-deep">
          Pasangan Yang Bakal Dinikahkan
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-2 font-cormorant text-lg italic text-sage-light">
          &ldquo;The Wedding of&rdquo;
        </p>
      </Reveal>

      <Reveal delay={0.2} className="mt-8 w-full">
        <Person
          initials="D"
          name={WEDDING.groom.name}
          short={WEDDING.groom.fullName}
        />
      </Reveal>

      <Reveal delay={0.2} className="my-6 flex items-center gap-4">
        <span className="h-px flex-1 bg-gold/50" />
        <span className="font-serif text-2xl italic text-gold-deep">&amp;</span>
        <span className="h-px flex-1 bg-gold/50" />
      </Reveal>

      <Reveal delay={0.3} className="w-full">
        <Person
          initials="A"
          name={WEDDING.bride.name}
          short={WEDDING.bride.fullName}
        />
      </Reveal>

      <Reveal delay={0.4} className="mt-8 text-center">
        <p className="font-display text-sm font-light uppercase leading-relaxed tracking-[0.18em] text-sage">
          Anakanda kepada kedua-dua pasangan yang dihormati:
        </p>
      </Reveal>
      <Reveal delay={0.5} className="mt-4">
        <FloralDivider size={190} />
      </Reveal>
    </section>
  );
}
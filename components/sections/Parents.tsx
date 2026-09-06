import Reveal from "../Reveal";
import { WEDDING } from "@/lib/constants";
import { Leaf } from "../floral/Flowers";

function Family({
  title,
  couple,
  father,
  mother,
  contacts,
}: {
  title: string;
  couple: string;
  father: string;
  mother: string;
  contacts: readonly { name: string; phone: string }[];
}) {
  return (
    <div className="text-center">
      <p className="font-semibold uppercase tracking-[0.25em] text-burgundy/70">
        {title}
      </p>
      <h3 className="mt-3 font-serif text-xl text-burgundy-deep">{couple}</h3>
      <p className="mt-4 font-display text-sm font-light leading-relaxed text-sage">
        <strong className="font-normal text-burgundy-deep">Ayahanda:</strong>
        <br />
        {father}
      </p>
      <p className="mt-3 font-display text-sm font-light leading-relaxed text-sage">
        <strong className="font-normal text-burgundy-deep">Bonda:</strong>
        <br />
        {mother}
      </p>
      <div className="mt-4 space-y-1">
        <p className="font-display text-[0.7rem] font-light uppercase tracking-[0.25em] text-gold-deep">
          Untuk Dihubungi:
        </p>
        {contacts.map((c) => (
          <a
            key={c.name}
            href={`tel:${c.phone.replace(/[- ]/g, "")}`}
            className="block font-display text-sm font-normal text-burgundy underline-offset-4 hover:underline"
          >
            {c.name} — {c.phone}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Parents() {
  return (
    <section className="flex flex-col items-center py-10">
      <Reveal>
        <p className="font-serif text-2xl text-burgundy-deep">Ahli Keluarga</p>
      </Reveal>

      <Reveal delay={0.1} className="mt-8 w-full">
        <Family
          title="Pihak Lelaki"
          couple={`${WEDDING.groom.name} & Keluarga`}
          father={WEDDING.groom.father}
          mother={WEDDING.groom.mother}
          contacts={WEDDING.groom.contact}
        />
      </Reveal>

      <Reveal delay={0.2} className="my-8 flex items-center">
        <Leaf size={22} flip />
        <span className="mx-3 text-gold">✦</span>
        <Leaf size={22} />
      </Reveal>

      <Reveal delay={0.3} className="w-full">
        <Family
          title="Pihak Perempuan"
          couple={`${WEDDING.bride.name} & Keluarga`}
          father={WEDDING.bride.father}
          mother={WEDDING.bride.mother}
          contacts={WEDDING.bride.contact}
        />
      </Reveal>
    </section>
  );
}
import Reveal from "../Reveal";
import { Monogram } from "../Monogram";
import { WEDDING } from "@/lib/constants";

export default function Closing() {
  return (
    <section className="flex flex-col items-center pt-10 text-center">
      <Reveal delay={0.2}>
        <div className="-mt-2">
          <Monogram size={80} />
        </div>
      </Reveal>
      <Reveal delay={0.3}>
        <p className="mt-2 font-serif text-2xl text-burgundy">
          Sekian, terima kasih
        </p>
      </Reveal>
      <Reveal delay={0.4}>
        <p className="mx-auto mt-3 max-w-xs font-display text-base italic leading-relaxed text-sage">
          Kehadiran dan doa anda adalah sinar kebahagiaan buat kami berdua.
        </p>
      </Reveal>
      <Reveal delay={0.5}>
        <p className="mt-6 font-serif text-3xl italic text-gold-foil">
          {WEDDING.groom.name} <span className="text-rose">&amp;</span>{" "}
          {WEDDING.bride.name}
        </p>
      </Reveal>
      <Reveal delay={0.6}>
        <p className="mt-3 font-display text-sm tracking-[0.2em] text-sage-light">
          MUHAMMAD DANI FIRDAUS &amp; NURUL ANISAQ
        </p>
      </Reveal>
      <Reveal delay={0.7}>
        <p className="mt-8 text-xs text-sage-light/60">
          Dibuat dengan ♥ untuk majlis walimatul urus kami
        </p>
      </Reveal>
    </section>
  );
}
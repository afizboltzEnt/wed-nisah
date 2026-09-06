import Reveal from "../Reveal";
import { WEDDING } from "@/lib/constants";

export default function InvitationMessage() {
  return (
    <section className="flex flex-col items-center py-10 text-center">
      <Reveal>
        <p className="font-serif text-xl text-burgundy">Assalamualaikum wbt</p>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-5 font-display text-lg leading-relaxed text-sage">
          Dengan penuh kesyukuran ke hadrat Ilahi, kami ingin
          memaklumkan bahawa kami akan melangsungkan perkahwinan pada:
        </p>
      </Reveal>
      <Reveal delay={0.2}>
        <div className="mt-6 rounded-lg border border-gold/40 bg-cream/60 px-6 py-4">
          <p className="font-serif text-xl text-burgundy">
            {WEDDING.dateLong}
          </p>
          <p className="mt-1 font-display text-base text-gold-deep">
            {WEDDING.time}
          </p>
        </div>
      </Reveal>
      <Reveal delay={0.3}>
        <p className="mt-6 font-display text-lg leading-relaxed text-sage">
          Kehadiran serta doa restu daripada
          <br />
          <span className="italic text-burgundy">
            Dato&rsquo;/Datin, Tuan/Puan, Encik/Cik dan ahli keluarga
          </span>
          <br />
          amatlah kami hargai.
        </p>
      </Reveal>
    </section>
  );
}
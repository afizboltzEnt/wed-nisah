import Reveal from "../Reveal";

export default function Doa() {
  return (
    <section className="flex flex-col items-center py-10 text-center">
      <Reveal>
        <p className="font-serif text-2xl text-burgundy-deep">Doa &amp; Kesyukuran</p>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mx-auto mt-5 max-w-sm font-cormorant text-lg leading-relaxed text-sage">
          &ldquo;Semoga Allah memberkati perkahwinan ini dengan kasih
          sayang, mengurniakan zuriat yang soleh, dan mengikat kedua-duanya
          dalam ketenangan hati.&rdquo;
        </p>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="mt-5 font-display text-[0.7rem] font-light uppercase tracking-[0.3em] text-gold-deep">
          — Doa restu anda adalah hadiah yang paling bermakna —
        </p>
      </Reveal>
      <Reveal delay={0.3}>
        <div className="mt-6 rounded-lg border border-dashed border-gold/50 bg-cream/50 px-6 py-4">
          <p className="font-display text-[0.7rem] font-light uppercase tracking-[0.25em] text-sage">
            Hadiah bolehlah dihulurkan menerusi:
          </p>
          <p className="mt-3 font-display text-sm text-sage">
            <span className="font-medium text-sage">CIMB</span><br />
            <span className="font-serif text-xl tracking-[0.2em] text-burgundy-deep">8800 4766 5599</span><br />
            <span className="text-xs text-sage-light">Nurul Anisaq Binti Kamaruzaini</span>
          </p>
          <p className="mt-2 font-display text-[0.65rem] font-light italic leading-relaxed text-sage-light">
            (Maklumkan setelah menghantar agar kami dapat mengesahkan)
          </p>
        </div>
      </Reveal>
    </section>
  );
}
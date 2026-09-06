import Reveal from "../Reveal";

export default function Bismillah() {
  return (
    <section className="flex flex-col items-center py-14 text-center">
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-burgundy/50" />
          <span className="text-burgundy/50">◆</span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-burgundy/50" />
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-6 font-serif text-2xl text-burgundy">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="mt-3 font-display text-lg italic text-sage-light">
          &ldquo;Bismillahirrahmanirrahim&rdquo;
        </p>
      </Reveal>
      <Reveal delay={0.3}>
        <p className="mx-auto mt-4 max-w-xs font-display text-base leading-relaxed text-sage">
          Ya Tuhan, dengan rahmat dan kasih sayang-Mu, sempurnakanlah
          majlis ini dengan keberkatan yang tidak berkesudahan.
        </p>
      </Reveal>
    </section>
  );
}
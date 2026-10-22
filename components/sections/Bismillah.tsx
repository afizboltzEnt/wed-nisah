import { StaggerGroup, StaggerItem } from "../Stagger";
import BorderFrame from "../floral/BorderFrame";
import { scaleIn } from "@/lib/motion";

export default function Bismillah() {
  return (
    <section className="relative flex flex-col items-center py-14 text-center">
      <BorderFrame corners={["tl"]} />
      <StaggerGroup className="relative z-10 flex flex-col items-center">
        <StaggerItem>
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-burgundy/50" />
            <span className="text-burgundy/50">◆</span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-burgundy/50" />
          </div>
        </StaggerItem>
        <StaggerItem variants={scaleIn}>
          <p className="mt-6 font-serif text-[1.7rem] text-burgundy-deep">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
        </StaggerItem>
        <StaggerItem>
          <p className="mt-3 font-cormorant text-lg italic text-sage-light">
            &ldquo;Bismillahirrahmanirrahim&rdquo;
          </p>
        </StaggerItem>
        <StaggerItem>
          <p className="mx-auto mt-4 max-w-xs font-display text-sm font-light leading-relaxed tracking-[0.06em] text-sage">
            Ya Tuhan, dengan rahmat dan kasih sayang-Mu, sempurnakanlah
            majlis ini dengan keberkatan yang tidak berkesudahan.
          </p>
        </StaggerItem>
      </StaggerGroup>
    </section>
  );
}

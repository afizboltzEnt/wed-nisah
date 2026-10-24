import { StaggerGroup, StaggerItem } from "../Stagger";
import { fadeIn, scaleIn } from "@/lib/motion";

export default function Doa() {
  return (
    <section className="flex flex-col items-center gap-0 text-center">
      <StaggerGroup className="flex flex-col items-center gap-4" stagger={0.25}>
        <StaggerItem variants={fadeIn}>
          <p className="doa mx-auto max-w-[40ch] italic text-ink-2">
            &ldquo;Semoga Allah memberkati perkahwinan ini dengan kasih
            sayang, mengurniakan zuriat yang soleh, dan mengikat kedua-duanya
            dalam ketenangan hati.&rdquo;
          </p>
        </StaggerItem>
        <StaggerItem variants={fadeIn}>
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-stationery-gold">
            — Doa restu anda adalah hadiah yang paling bermakna —
          </p>
        </StaggerItem>
        <StaggerItem
          variants={scaleIn}
          className="event mt-2 w-full max-w-xs"
        >
          <p className="text-[0.7rem] uppercase tracking-[0.25em] text-ink-2">
            Hadiah bolehlah dihulurkan menerusi:
          </p>
          <p className="text-sm text-ink-2">
            <span className="font-medium">CIMB</span>
            <br />
            <span className="font-display-italic text-xl tracking-[0.2em] text-ink">
              8800 4766 5599
            </span>
            <br />
            <span className="text-xs text-ink-2/70">
              Nurul Anisaq Binti Kamaruzaini
            </span>
          </p>
          <p className="text-[0.65rem] italic leading-relaxed text-ink-2/70">
            (Maklumkan setelah menghantar agar kami dapat mengesahkan)
          </p>
        </StaggerItem>
      </StaggerGroup>
    </section>
  );
}

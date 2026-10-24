import Image from "next/image";
import { StaggerGroup, StaggerItem } from "../Stagger";
import SectionDivider from "../floral/SectionDivider";
import { WEDDING } from "@/lib/constants";

export default function Closing() {
  return (
    <section className="flex flex-col items-center gap-0 text-center">
      <StaggerGroup className="flex flex-col items-center gap-3" stagger={0.15}>
        <StaggerItem>
          <p className="font-caps text-[0.95rem] font-normal uppercase tracking-[0.3em] text-ink">
            Sekian, terima kasih
          </p>
        </StaggerItem>
        <StaggerItem>
          <p className="mx-auto max-w-xs font-display-italic italic leading-relaxed text-ink-2">
            Kehadiran dan doa anda adalah sinar kebahagiaan buat kami berdua.
          </p>
        </StaggerItem>
        <StaggerItem className="mt-2">
          <SectionDivider />
        </StaggerItem>
        <StaggerItem>
          <p className="closing-sign">
            {WEDDING.groom.shortName} &amp; {WEDDING.bride.shortName}
          </p>
        </StaggerItem>
        <StaggerItem>
          <p className="text-[0.65rem] uppercase tracking-[0.35em] text-ink-2">
            {WEDDING.groom.name.toUpperCase()} &amp; {WEDDING.bride.name.toUpperCase()}
          </p>
        </StaggerItem>
        <StaggerItem>
          <p className="mt-4 text-[0.65rem] tracking-[0.15em] text-ink-2/70">
            Dibuat dengan ♥ untuk majlis walimatul urus kami
          </p>
        </StaggerItem>
      </StaggerGroup>
      <div
        className="relative mt-8 aspect-[1050/455] w-[calc(100%+32px)] -mx-4"
        aria-hidden="true"
      >
        <Image
          src="/invitation/frame-bottom.webp"
          alt=""
          fill
          className="object-cover object-bottom"
        />
      </div>
    </section>
  );
}

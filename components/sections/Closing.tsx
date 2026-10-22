import Image from "next/image";
import { StaggerGroup, StaggerItem } from "../Stagger";
import { WEDDING } from "@/lib/constants";
import { scaleIn } from "@/lib/motion";

export default function Closing() {
  return (
    <section className="flex flex-col items-center pt-10 text-center">
      <StaggerGroup className="flex flex-col items-center" stagger={0.15}>
        <StaggerItem variants={scaleIn}>
          <Image
            src="/flowers/monogram.webp"
            alt={`${WEDDING.groom.shortName} & ${WEDDING.bride.shortName}`}
            width={363}
            height={409}
            className="-mt-2 h-auto w-[72px]"
          />
        </StaggerItem>
        <StaggerItem>
          <p className="mt-2 font-serif text-2xl text-burgundy-deep">
            Sekian, terima kasih
          </p>
        </StaggerItem>
        <StaggerItem>
          <p className="mx-auto mt-3 max-w-xs font-cormorant text-base italic leading-relaxed text-sage">
            Kehadiran dan doa anda adalah sinar kebahagiaan buat kami berdua.
          </p>
        </StaggerItem>
        <StaggerItem>
          <p className="mt-6 font-serif text-3xl italic text-gold-foil">
            {WEDDING.groom.name} <span className="text-rose">&amp;</span>{" "}
            {WEDDING.bride.name}
          </p>
        </StaggerItem>
        <StaggerItem>
          <p className="mt-3 font-display text-[0.65rem] font-light uppercase tracking-[0.35em] text-sage-light">
            MUHAMMAD DANI FIRDAUS &amp; NURUL ANISAQ
          </p>
        </StaggerItem>
        <StaggerItem>
          <p className="mt-8 font-display text-[0.65rem] font-light tracking-[0.15em] text-sage-light/70">
            Dibuat dengan ♥ untuk majlis walimatul urus kami
          </p>
        </StaggerItem>
      </StaggerGroup>
    </section>
  );
}

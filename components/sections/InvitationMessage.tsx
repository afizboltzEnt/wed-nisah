import { StaggerGroup, StaggerItem } from "../Stagger";
import { WEDDING } from "@/lib/constants";
import { scaleIn } from "@/lib/motion";

export default function InvitationMessage() {
  return (
    <section className="flex flex-col items-center py-10 text-center">
      <StaggerGroup className="flex flex-col items-center">
        <StaggerItem>
          <p className="font-serif text-xl text-burgundy">Assalamualaikum wbt</p>
        </StaggerItem>
        <StaggerItem>
          <p className="mt-5 max-w-xs font-display text-sm font-light leading-relaxed tracking-[0.06em] text-sage">
            Dengan penuh kesyukuran ke hadrat Ilahi, kami ingin
            memaklumkan bahawa kami akan melangsungkan perkahwinan pada:
          </p>
        </StaggerItem>
        <StaggerItem
          variants={scaleIn}
          className="mt-6 rounded-lg border border-gold/50 bg-cream/60 px-6 py-4"
        >
          <p className="font-serif text-xl text-burgundy-deep">
            {WEDDING.dateLong}
          </p>
          <p className="mt-1 font-display text-[0.7rem] font-light uppercase tracking-[0.3em] text-gold-deep">
            {WEDDING.time}
          </p>
        </StaggerItem>
        <StaggerItem>
          <p className="mt-6 max-w-xs font-display text-sm font-light leading-relaxed tracking-[0.06em] text-sage">
            Kehadiran serta doa restu daripada
            <br />
            <span className="font-normal text-burgundy-deep">
              Dato&rsquo;/Datin, Tuan/Puan, Encik/Cik dan ahli keluarga
            </span>
            <br />
            amatlah kami hargai.
          </p>
        </StaggerItem>
      </StaggerGroup>
    </section>
  );
}

import SectionDivider from "../floral/SectionDivider";
import { StaggerGroup, StaggerItem } from "../Stagger";
import { WEDDING } from "@/lib/constants";

const heading =
  "font-caps text-[0.95rem] font-normal uppercase tracking-[0.3em] text-ink";

function ParentsColumn({
  label,
  father,
  mother,
}: {
  label: string;
  father: string;
  mother: string;
}) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-0.5 text-sm">
      <span className="mb-1.5 block text-[0.68rem] uppercase tracking-[0.24em] text-stationery-gold">
        {label}
      </span>
      <span>{father}</span>
      <span className="italic text-stationery-gold">&amp;</span>
      <span>{mother}</span>
    </div>
  );
}

export default function Jemputan() {
  return (
    <section
      id="jemputan"
      className="flex flex-col items-center gap-5 text-center"
      aria-labelledby="jemputan-heading"
    >
      <StaggerGroup className="flex w-full flex-col items-center gap-5">
        <StaggerItem>
          <p
            className="font-arabic text-[1.7rem] leading-relaxed text-stationery-gold"
            lang="ar"
            dir="rtl"
          >
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>
        </StaggerItem>
        <StaggerItem className="flex flex-col items-center gap-5">
          <h2 id="jemputan-heading" className={heading}>
            Jemputan
          </h2>
          <SectionDivider />
        </StaggerItem>
        <StaggerItem className="grid w-full grid-cols-1 gap-7 sm:grid-cols-2">
          <ParentsColumn
            label="Pihak Lelaki"
            father={WEDDING.groom.father}
            mother={WEDDING.groom.mother}
          />
          <ParentsColumn
            label="Pihak Perempuan"
            father={WEDDING.bride.father}
            mother={WEDDING.bride.mother}
          />
        </StaggerItem>
        <StaggerItem>
          <p className="max-w-[42ch] font-display-italic text-[0.95rem] italic text-ink-2">
            Dengan penuh rasa kesyukuran ke hadrat Ilahi, kami sekeluarga
            dengan segala hormatnya menjemput Dato&rsquo; / Datin / Tuan /
            Puan / Encik / Cik serta seisi keluarga ke majlis perkahwinan
            putera dan puteri kami
          </p>
        </StaggerItem>
        <StaggerItem className="flex flex-col items-center gap-2">
          <span className="font-display-italic text-[1.45rem] leading-tight text-wine">
            {WEDDING.groom.fullName}
          </span>
          <span className="font-display-italic text-[1.3rem] italic text-stationery-gold">
            &amp;
          </span>
          <span className="font-display-italic text-[1.45rem] leading-tight text-wine">
            {WEDDING.bride.fullName}
          </span>
        </StaggerItem>
      </StaggerGroup>
    </section>
  );
}

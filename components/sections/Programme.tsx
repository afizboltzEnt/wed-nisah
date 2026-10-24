import { StaggerGroup, StaggerItem } from "../Stagger";

// Placeholder — confirm the real running order with the couple before launch.
const PROGRAMME_PLACEHOLDER = [
  { time: "11:00 pagi", label: "Ketibaan tetamu & jamuan dibuka" },
  { time: "12:30 tgh hari", label: "Ketibaan pengantin" },
  { time: "1:00 petang", label: "Makan beradab" },
  { time: "4:00 petang", label: "Majlis bersurai" },
] as const;

const heading =
  "font-caps text-[0.95rem] font-normal uppercase tracking-[0.3em] text-ink";

export default function Programme() {
  return (
    <section
      id="aturcara"
      className="flex flex-col items-center gap-5 text-center"
      aria-labelledby="aturcara-heading"
    >
      <h2 id="aturcara-heading" className={heading}>
        Aturcara
      </h2>
      <span className="tag">Tentatif</span>
      <StaggerGroup className="w-full flex justify-center">
        <StaggerItem>
          <ol className="prog">
            {PROGRAMME_PLACEHOLDER.map((item) => (
              <li key={item.time}>
                <time>{item.time}</time>
                <span>{item.label}</span>
              </li>
            ))}
          </ol>
        </StaggerItem>
      </StaggerGroup>
    </section>
  );
}

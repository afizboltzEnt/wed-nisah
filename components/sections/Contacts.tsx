"use client";

import { StaggerGroup, StaggerItem } from "../Stagger";
import SectionDivider from "../floral/SectionDivider";
import { WEDDING } from "@/lib/constants";

type Contact = { name: string; phone: string };

const heading =
  "font-caps text-[0.95rem] font-normal uppercase tracking-[0.3em] text-ink";

function waNumber(phone: string) {
  return "6" + phone.replace(/\D/g, "");
}

function Person({ name, phone }: Contact) {
  return (
    <div className="person">
      <span className="who">{name}</span>
      <span className="num">{phone}</span>
      <div className="row">
        <a
          className="btn btn-sm"
          href={`https://wa.me/${waNumber(phone)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>
        <a className="btn btn-sm" href={`tel:${phone.replace(/\D/g, "")}`}>
          Hubungi
        </a>
      </div>
    </div>
  );
}

function ContactSide({
  label,
  people,
}: {
  label: string;
  people: readonly Contact[];
}) {
  return (
    <div className="side">
      <span className="text-[0.68rem] uppercase tracking-[0.24em] text-stationery-gold">
        {label}
      </span>
      {people.map((p) => (
        <Person key={p.name} {...p} />
      ))}
    </div>
  );
}

export default function Contacts() {
  return (
    <section
      id="hubungi"
      className="flex flex-col items-center gap-5 text-center"
      aria-labelledby="hubungi-heading"
    >
      <h2 id="hubungi-heading" className={heading}>
        Hubungi
      </h2>
      <SectionDivider />
      <StaggerGroup className="w-full">
        <StaggerItem className="contacts">
          <ContactSide label="Pihak Lelaki" people={WEDDING.groom.contact} />
          <ContactSide label="Pihak Perempuan" people={WEDDING.bride.contact} />
        </StaggerItem>
      </StaggerGroup>
    </section>
  );
}

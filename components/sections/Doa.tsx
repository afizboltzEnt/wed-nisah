"use client";

import { useState } from "react";
import Image from "next/image";
import { StaggerGroup, StaggerItem } from "../Stagger";
import { fadeIn, scaleIn } from "@/lib/motion";

const ACCOUNT_NAME = "Nurul Anisaq Binti Kamaruzaini";
const ACCOUNT_NO = "8888 0138 6668 6";
const QR_SRC = "/gift/duitnow-qr.png";

type Tab = "qr" | "bank";

const TABS: { id: Tab; label: string }[] = [
  { id: "qr", label: "Imbas QR" },
  { id: "bank", label: "Pindahan Bank" },
];

function QrPanel() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="gift-qr">
        <Image
          src={QR_SRC}
          alt={`Kod DuitNow QR untuk ${ACCOUNT_NAME}`}
          width={519}
          height={519}
          unoptimized
          className="h-auto w-full"
        />
      </div>
      <span className="text-xs text-ink-2/70">{ACCOUNT_NAME}</span>
      <a
        className="btn btn-sm"
        href={QR_SRC}
        download="DuitNow-QR-Nurul-Anisaq.png"
      >
        Simpan Kod QR
      </a>
      <p className="max-w-[30ch] text-[0.65rem] leading-relaxed text-ink-2/70">
        Simpan, kemudian muat naik dalam aplikasi bank anda (DuitNow QR). Atau
        tekan lama pada kod untuk simpan ke Galeri.
      </p>
    </div>
  );
}

function BankPanel() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(ACCOUNT_NO.replace(/\s/g, ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (e.g. non-secure context) — number stays selectable.
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm text-ink-2">
        <span className="font-medium">GXBank</span>
        <br />
        <span className="select-all font-display-italic text-xl tracking-[0.2em] text-ink">
          {ACCOUNT_NO}
        </span>
        <br />
        <span className="text-xs text-ink-2/70">{ACCOUNT_NAME}</span>
      </p>
      <button type="button" className="btn btn-sm" onClick={copy}>
        <span aria-live="polite">
          {copied ? "Disalin ✓" : "Salin No. Akaun"}
        </span>
      </button>
    </div>
  );
}

export default function Doa() {
  const [tab, setTab] = useState<Tab>("qr");

  return (
    <section className="flex flex-col items-center gap-0 text-center">
      <StaggerGroup className="flex flex-col items-center gap-4" stagger={0.25}>
        <StaggerItem variants={fadeIn}>
          <p className="doa mx-auto max-w-[40ch] italic text-ink-2">
            &ldquo;Semoga Allah memberkati perkahwinan ini dengan kasih sayang,
            mengurniakan zuriat yang soleh, dan mengikat kedua-duanya dalam
            ketenangan hati.&rdquo;
          </p>
        </StaggerItem>
        <StaggerItem variants={fadeIn}>
          <p className="text-[0.7rem] uppercase tracking-[0.3em] text-stationery-gold">
            — Doa restu anda adalah hadiah yang paling bermakna —
          </p>
        </StaggerItem>
        <StaggerItem variants={scaleIn} className="event mt-2 w-full max-w-xs">
          <p className="text-[0.7rem] uppercase tracking-[0.25em] text-ink-2">
            Hadiah bolehlah dihulurkan menerusi:
          </p>
          <div role="tablist" aria-label="Kaedah hadiah" className="gift-tabs">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                id={`gift-tab-${t.id}`}
                aria-selected={tab === t.id}
                aria-controls="gift-panel"
                className="btn btn-sm"
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div
            id="gift-panel"
            role="tabpanel"
            aria-labelledby={`gift-tab-${tab}`}
          >
            {tab === "qr" ? <QrPanel /> : <BankPanel />}
          </div>
        </StaggerItem>
      </StaggerGroup>
    </section>
  );
}

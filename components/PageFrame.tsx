import type { ReactNode } from "react";
import Reveal from "./Reveal";
import { CornerFloral } from "./floral/Flowers";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function PageFrame({ children }: Props) {
  return (
    <main className="relative z-10 flex min-h-screen flex-col items-center px-4 pb-16 pt-10 sm:px-6">
      <div className="relative w-full max-w-[480px]">
        {/* decorative double frame — outer pinstripe (recessed corners) */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[26px] border border-gold/70"
          style={{
            clipPath:
              "polygon(14px 0, calc(100% - 14px) 0, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0 calc(100% - 14px), 0 14px)",
          }}
        />
        {/* inner gold line ~20px inset (mockup framing) */}
        <div className="pointer-events-none absolute inset-[20px] rounded-[14px] border border-gold/40" />

        {/* lush corner florals — top-left + bottom-right symmetric cascade */}
        <div className="pointer-events-none absolute -left-10 -top-14 z-0">
          <CornerFloral size={235} />
        </div>
        <div className="pointer-events-none absolute -bottom-16 -right-10 z-0">
          <CornerFloral size={235} flip />
        </div>

        <Reveal y={20}>
          <div className="relative overflow-hidden rounded-[20px] bg-paper/70 shadow-card backdrop-blur-[2px]">
            <div className="px-6 py-10 sm:px-9 sm:py-12">{children}</div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
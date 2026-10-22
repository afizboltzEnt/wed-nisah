import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function PageFrame({ children }: Props) {
  return (
    <main className="relative z-10 flex flex-col items-center px-4 pb-16 pt-10 sm:px-6">
      <div className="relative w-full max-w-[480px]">
        {/* thin pinstripe only — body sections carry their own light floral motif (BorderFrame/SectionDivider) */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[26px] border border-gold/50"
          style={{
            clipPath:
              "polygon(14px 0, calc(100% - 14px) 0, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0 calc(100% - 14px), 0 14px)",
          }}
        />

        {/* No outer entrance animation here: each section below already animates
            itself on scroll. A card this tall can never cross a whileInView
            threshold as a single unit (see ledger — this used to ship invisible). */}
        <div className="relative overflow-hidden rounded-[20px] bg-paper/70 shadow-card backdrop-blur-[2px]">
          <div className="relative z-10 px-6 py-10 sm:px-9 sm:py-12">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}

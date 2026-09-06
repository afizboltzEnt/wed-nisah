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
        {/* decorative double frame */}
        <div className="pointer-events-none absolute inset-1 rounded-[26px] border border-gold/40" />
        <div className="pointer-events-none absolute inset-3 rounded-[20px] border border-gold/25" />

        {/* corner florals */}
        <div className="pointer-events-none absolute -left-6 -top-8 z-0">
          <CornerFloral size={150} />
        </div>
        <div className="pointer-events-none absolute -right-6 -top-8 z-0">
          <CornerFloral size={150} flip />
        </div>
        <div className="pointer-events-none absolute -bottom-10 -left-6 z-0">
          <CornerFloral size={150} />
        </div>
        <div className="pointer-events-none absolute -bottom-10 -right-6 z-0">
          <CornerFloral size={150} flip />
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
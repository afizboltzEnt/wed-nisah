import type { ReactNode } from "react";
import Image from "next/image";
import Reveal from "./Reveal";

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

        <Reveal y={20}>
          <div className="relative overflow-hidden rounded-[20px] bg-paper/70 shadow-card backdrop-blur-[2px]">
            {/* corner florals on the card layer, behind the text */}
            <Image
              src="/flowers/corner-tl.webp"
              alt=""
              width={580}
              height={620}
              className="pointer-events-none absolute left-0 top-0 w-[180px] sm:w-[210px] h-auto"
            />
            <Image
              src="/flowers/corner-tr.webp"
              alt=""
              width={539}
              height={480}
              className="pointer-events-none absolute right-0 top-0 w-[180px] sm:w-[210px] h-auto"
            />
            <Image
              src="/flowers/corner-bl.webp"
              alt=""
              width={560}
              height={620}
              className="pointer-events-none absolute bottom-0 left-0 w-[180px] sm:w-[210px] h-auto"
            />
            <Image
              src="/flowers/corner-br.webp"
              alt=""
              width={540}
              height={620}
              className="pointer-events-none absolute bottom-0 right-0 w-[180px] sm:w-[210px] h-auto"
            />
            <div className="relative z-10 px-6 py-10 sm:px-9 sm:py-12">
              {children}
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { playMusic } from "@/lib/audio";
import { Monogram } from "./Monogram";
import { CornerFloral } from "./floral/Flowers";
import { softSpring, easeInOut, easeOut } from "@/lib/motion";

type Props = {
  onOpen: () => void;
};

type Stage = "idle" | "opening" | "opened";

export default function EnvelopeOpener({ onOpen }: Props) {
  const [stage, setStage] = useState<Stage>("idle");

  const handleOpen = () => {
    if (stage !== "idle") return;
    void playMusic();
    setStage("opening");
  };

  return (
    <motion.div
      className="bg-invite-gradient fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-6"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: easeInOut }}
    >
      {/* corner florals previewing the frame the guest is about to enter */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-60" aria-hidden>
        <CornerFloral corner="tl" className="absolute left-0 top-0 h-auto w-[130px] sm:w-[170px]" />
        <CornerFloral corner="br" className="absolute bottom-0 right-0 h-auto w-[130px] sm:w-[170px]" />
      </div>

      <motion.p
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: easeOut }}
        className="font-display text-[0.7rem] font-light uppercase tracking-[0.4em] text-burgundy/80"
      >
        Jemputan Perkahwinan
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.8, ease: easeOut }}
        className="mt-2 font-serif text-3xl text-burgundy-deep"
      >
        Dani <span className="text-gold">&amp;</span> Anisaq
      </motion.h1>

      {/* Envelope — perspective lives on this wrapper so the flap's 3D flip actually reads as depth */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.9, ease: easeOut }}
        className="relative mt-10 w-full max-w-[340px]"
        style={{ perspective: 1000 }}
      >
        {/* Flap — opens back on a soft spring, timed by the animation itself */}
        <motion.div
          className="absolute left-0 top-0 z-10 h-0 w-full origin-top"
          initial={false}
          animate={stage === "idle" ? { rotateX: 0 } : { rotateX: 178 }}
          transition={softSpring}
          style={{ transformStyle: "preserve-3d" }}
          onAnimationComplete={() => {
            if (stage === "opening") setStage("opened");
          }}
        >
          <div
            className="absolute left-1/2 top-0 -translate-x-1/2"
            style={{
              width: 0,
              height: 0,
              borderLeft: "170px solid transparent",
              borderRight: "170px solid transparent",
              borderTop: "130px solid #cfb385",
              backfaceVisibility: "hidden",
            }}
          />
        </motion.div>

        {/* Envelope body */}
        <div
          className="relative h-[240px] w-full overflow-hidden rounded-lg shadow-card"
          style={{
            background: "linear-gradient(#fdf8f0, #f5e9d8)",
            border: "1px solid #e3d3b8",
          }}
        >
          {/* pocket shading */}
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            <div
              className="absolute -bottom-1 left-0 h-1/2 w-full"
              style={{
                background:
                  "linear-gradient(to top right, transparent 0%, transparent 50%, #e7d6b8 50%, #f7eedc 50.5%)",
              }}
            />
            <div
              className="absolute top-0 left-0 h-1/2 w-full"
              style={{
                background:
                  "linear-gradient(to bottom right, rgba(212,175,55,0.06) 0%, transparent 50%)",
              }}
            />
          </div>
          <p className="absolute inset-0 flex items-center justify-center gap-1 font-display text-sm font-light tracking-[0.15em] text-sage/70">
            Diajukan kepada&nbsp;
            <span className="font-cormorant text-base italic text-burgundy">
              Yang Dikasihi
            </span>
          </p>
        </div>

        {/* Wax seal */}
        <motion.button
          type="button"
          onClick={handleOpen}
          aria-label="Buka jemputan"
          className="absolute left-1/2 top-1/2 z-20 -ml-[42px] -mt-[42px] flex h-[84px] w-[84px] items-center justify-center rounded-full shadow-xl"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, #8b2a3a 0%, #6b1d2f 55%, #4a1020 100%)",
            boxShadow: "0 8px 24px rgba(107,29,47,0.45), inset 0 2px 6px rgba(255,240,241,0.25)",
          }}
          initial={false}
          animate={stage === "idle" ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={softSpring}
          whileHover={stage === "idle" ? { scale: 1.08 } : undefined}
          whileTap={stage === "idle" ? { scale: 0.92 } : undefined}
        >
          <Monogram size={58} />
        </motion.button>

        {/* Heart burst — its own completion is what hands control back to the parent, no guessed delay */}
        <AnimatePresence>
          {stage === "opened" && (
            <motion.div
              className="absolute left-1/2 top-1/2 z-30 -ml-8 -mt-8"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{ duration: 0.8, ease: easeOut }}
              onAnimationComplete={onOpen}
            >
              <svg width="64" height="64" viewBox="0 0 24 24" fill="#d4af37">
                <path d="M12 21s-6.7-4.35-9.33-8.11C.55 10.05 1.62 6.5 4.5 6.5c1.8 0 3.42 1.1 4.1 2.4l1.4-2.4C10.2 4.4 10.6 4 12 4c1.4 0 1.8.4 2 .5" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.button
        type="button"
        onClick={handleOpen}
        initial={{ opacity: 0 }}
        animate={{ opacity: stage === "idle" ? 1 : 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="mt-10 rounded-full border border-gold px-6 py-2.5 font-display text-xs font-medium uppercase tracking-[0.25em] text-gold-deep shadow-sm transition hover:bg-gold hover:text-cream"
      >
        Tekan Setem Untuk Membuka
      </motion.button>

      {stage === "idle" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ repeat: Infinity, duration: 2.4 }}
          className="mt-4 text-xs tracking-[0.2em] text-burgundy/70"
        >
          ✦ &nbsp;&nbsp;Buka jemputan untuk memulakan muzik&nbsp;&nbsp; ✦
        </motion.div>
      )}
    </motion.div>
  );
}

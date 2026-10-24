"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { playMusic } from "@/lib/audio";
import { easeInOut, easeOut } from "@/lib/motion";

type Props = {
  onOpen: () => void;
};

type Stage = "idle" | "opening" | "opened";

// Matches the mockup's own cubic-bezier exactly — close enough to lib/motion's
// easeInOut isn't close enough for this signature beat.
const DOOR_EASE: [number, number, number, number] = [0.65, 0, 0.25, 1];
const DOOR_TRANSITION = { duration: 1.7, ease: DOOR_EASE };

export default function OpeningGate({ onOpen }: Props) {
  const [stage, setStage] = useState<Stage>("idle");

  const handleOpen = () => {
    if (stage !== "idle") return;
    void playMusic();
    setStage("opening");
  };

  // Backstop: the real sequencing is animation-driven (onAnimationComplete
  // below), but a guest must never be stuck behind a half-open gate if a
  // callback is ever missed.
  useEffect(() => {
    if (stage !== "opening") return;
    const t = setTimeout(
      () => setStage((s) => (s === "opening" ? "opened" : s)),
      1900,
    );
    return () => clearTimeout(t);
  }, [stage]);

  useEffect(() => {
    if (stage === "opened") onOpen();
  }, [stage, onOpen]);

  const open = stage !== "idle";

  return (
    <motion.button
      type="button"
      onClick={handleOpen}
      aria-label="Buka jemputan"
      className="gate fixed inset-0 z-[100]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: easeInOut }}
    >
      <motion.div
        className="door l"
        animate={{ rotateY: open ? -108 : 0 }}
        transition={DOOR_TRANSITION}
        onAnimationComplete={() => {
          if (stage === "opening") setStage("opened");
        }}
      />
      <motion.div
        className="door r"
        animate={{ rotateY: open ? 108 : 0 }}
        transition={DOOR_TRANSITION}
      />
      <motion.div
        className="gate-face"
        animate={open ? { opacity: 0, scale: 0.92 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: easeOut }}
      >
        <p className="k">Walimatul Urus</p>
        <p className="n">Dani &amp; Anisaq</p>
        <div className="seal" aria-hidden="true">
          <Image
            src="/invitation/monogram.webp"
            alt=""
            width={64}
            height={71}
            priority
          />
        </div>
        <p className="tap">Tekan untuk buka</p>
      </motion.div>
    </motion.button>
  );
}

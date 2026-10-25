"use client";

import { motion } from "motion/react";
import { drawLine, VIEWPORT_ONCE } from "@/lib/motion";

type Props = {
  className?: string;
};

/** The shared minimal sprig motif between sections — draws in from the center as it scrolls into view. */
export default function SectionDivider({
  className = "sprig",
}: Props) {
  return (
    <motion.div
      className={className}
      variants={drawLine}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT_ONCE}
      style={{ transformOrigin: "center" }}
      aria-hidden="true"
    />
  );
}

"use client";

import { motion } from "motion/react";
import { FloralDivider } from "./Flowers";
import { drawLine, VIEWPORT_ONCE } from "@/lib/motion";

type Props = {
  size?: number;
  className?: string;
};

/** The shared floral motif between sections — draws in from the center as it scrolls into view. */
export default function SectionDivider({
  size = 190,
  className = "relative z-10 flex justify-center py-2",
}: Props) {
  return (
    <motion.div
      className={className}
      variants={drawLine}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT_ONCE}
      style={{ transformOrigin: "center" }}
    >
      <FloralDivider size={size} />
    </motion.div>
  );
}

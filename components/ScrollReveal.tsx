"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { VIEWPORT_ONCE, easeOut } from "@/lib/motion";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  variants?: Variants;
  className?: string;
};

export default function ScrollReveal({
  children,
  delay = 0,
  y = 28,
  variants,
  className,
}: Props) {
  const resolvedVariants: Variants =
    variants ?? {
      hidden: { opacity: 0, y },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay, ease: easeOut },
      },
    };

  return (
    <motion.div
      className={className}
      variants={resolvedVariants}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT_ONCE}
    >
      {children}
    </motion.div>
  );
}

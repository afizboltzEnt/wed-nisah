"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { fadeUp, staggerContainer, VIEWPORT_ONCE } from "@/lib/motion";

type GroupProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
};

/** Scroll-triggered parent — children stagger in together instead of each carrying its own hand-tuned delay. */
export function StaggerGroup({
  children,
  className,
  stagger,
  delayChildren,
}: GroupProps) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer(stagger, delayChildren)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT_ONCE}
    >
      {children}
    </motion.div>
  );
}

type ItemProps = {
  children: ReactNode;
  className?: string;
  variants?: Variants;
};

export function StaggerItem({ children, className, variants = fadeUp }: ItemProps) {
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}

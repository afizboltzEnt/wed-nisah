import type { TargetAndTransition, Transition, Variants } from "motion/react";

export const easeOut: Transition["ease"] = [0.22, 1, 0.36, 1];
export const easeInOut: Transition["ease"] = [0.65, 0, 0.35, 1];

export const softSpring: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 18,
};

export const DUR = {
  fast: 0.35,
  base: 0.7,
  slow: 1.1,
} as const;

/**
 * Shared `whileInView` viewport config — trigger once, as soon as a sliver is in.
 *
 * `amount` is forwarded verbatim as the IntersectionObserver threshold, and the
 * ratio an element can reach is capped at `viewportHeight / elementHeight`. A
 * tall section on a short (landscape) viewport can therefore never satisfy a
 * large threshold and would stay stuck in its `hidden` state, so keep this low.
 */
export const VIEWPORT_ONCE = { once: true, amount: 0.15 } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: easeOut } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DUR.slow, ease: easeOut } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: DUR.base, ease: easeOut } },
};

export function slideFrom(x: number): Variants {
  return {
    hidden: { opacity: 0, x },
    show: { opacity: 1, x: 0, transition: { duration: DUR.base, ease: easeOut } },
  };
}

/** A rule/divider that widens in from its center — set `transformOrigin: "center"` via className/style on the target. */
export const drawLine: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  show: { scaleX: 1, opacity: 1, transition: { duration: DUR.slow, ease: easeInOut } },
};

export function staggerContainer(stagger = 0.12, delayChildren = 0): Variants {
  return {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren } },
  };
}

/**
 * Turn an ordinary variant into one that also staggers its variant children,
 * so a single element can both animate itself and sequence what's inside it
 * without a second wrapper that controls its own variants (which would detach
 * the subtree from the scroll-triggered parent).
 */
export function withStagger(
  base: Variants,
  stagger = 0.08,
  delayChildren = 0
): Variants {
  const show = (base.show ?? {}) as TargetAndTransition;
  return {
    hidden: base.hidden,
    show: {
      ...show,
      transition: {
        ...(show.transition ?? {}),
        staggerChildren: stagger,
        delayChildren,
      },
    },
  };
}

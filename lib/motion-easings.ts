import type { Transition } from "motion/react";

export const ease = {
  outExpo: [0.16, 1, 0.3, 1] as const,
  soft: [0.33, 1, 0.68, 1] as const,
};

/** Springs for anything a user opens, presses, or hovers. */
export const spring = {
  default: { type: "spring", bounce: 0, duration: 0.4 } satisfies Transition,
  snappy: { type: "spring", bounce: 0, duration: 0.3 } satisfies Transition,
  momentum: { type: "spring", bounce: 0.2, duration: 0.4 } satisfies Transition,
};

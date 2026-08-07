"use client";

import { useEffect, useState } from "react";

/** Respect OS reduced-motion preference for Framer Motion / CSS. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

export function motionSafe(
  reduced: boolean,
  animate: Record<string, unknown>,
  instant: Record<string, unknown> = { opacity: 1 },
) {
  return reduced ? instant : animate;
}

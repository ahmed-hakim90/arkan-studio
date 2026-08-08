"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";
import {
  SPLASH_PENDING_ATTR,
  SPLASH_PENDING_VALUE,
  SPLASH_STORAGE_KEY,
} from "@/lib/splash";

/** Keep short — Creative Bible forbids long splash screens. */
const SPLASH_MS = 700;

type Props = {
  onDone?: () => void;
};

function clearSplashPending() {
  try {
    document.documentElement.removeAttribute(SPLASH_PENDING_ATTR);
  } catch {
    /* ignore */
  }
}

function isSplashPending() {
  try {
    return (
      document.documentElement.getAttribute(SPLASH_PENDING_ATTR) ===
      SPLASH_PENDING_VALUE
    );
  } catch {
    return false;
  }
}

export function SplashScreen({ onDone }: Props) {
  const t = useTranslations("Splash");
  const reduced = usePrefersReducedMotion();
  const doneRef = useRef(false);
  // SSR + first client render stay false (hydration-safe).
  // Pre-paint CSS cover (html[data-splash=pending]) hides home until handoff.
  const [visible, setVisible] = useState(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    try {
      sessionStorage.setItem(SPLASH_STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    clearSplashPending();
    setVisible(false);
    onDone?.();
  };

  useLayoutEffect(() => {
    if (!isSplashPending()) {
      clearSplashPending();
      doneRef.current = true;
      onDone?.();
      return;
    }
    // Take over from the blank CSS cover before the browser paints again.
    setVisible(true);
  }, [onDone]);

  useEffect(() => {
    if (!visible) return;

    // React splash is opaque — drop the blank CSS cover so brand content shows.
    clearSplashPending();

    const duration = reduced ? 160 : SPLASH_MS;
    const timer = window.setTimeout(finish, duration);
    return () => window.clearTimeout(timer);
    // finish is stable enough via doneRef; avoid re-running on every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, reduced]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--navy)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0.12 : 0.28 }}
          role="status"
          aria-live="polite"
          aria-label={t("aria")}
        >
          <div className="relative flex w-full max-w-md flex-col items-center gap-5 px-6 text-center">
            <motion.p
              className="font-display text-5xl tracking-tight text-white md:text-6xl"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              ARKAN/
            </motion.p>
            <motion.p
              className="tech-label text-[11px] text-white/55"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.08, duration: 0.3 }}
            >
              {t("initializing")}
            </motion.p>
            <div className="relative h-px w-full max-w-[220px] bg-white/15">
              <motion.span
                className="absolute top-1/2 size-2 -translate-y-1/2 rounded-full bg-[var(--signal)]"
                initial={reduced ? false : { left: "0%" }}
                animate={{ left: "72%" }}
                transition={{
                  duration: reduced ? 0 : 0.6,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

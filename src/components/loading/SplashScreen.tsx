"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

const SPLASH_KEY = "arkan_splash_seen";
const SPLASH_MS = 1000;

type Props = {
  onDone?: () => void;
};

export function SplashScreen({ onDone }: Props) {
  const t = useTranslations("Splash");
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SPLASH_KEY) === "1") {
        onDone?.();
        return;
      }
    } catch {
      // private mode
    }

    setVisible(true);
    const duration = reduced ? 200 : SPLASH_MS;
    const timer = window.setTimeout(() => {
      try {
        sessionStorage.setItem(SPLASH_KEY, "1");
      } catch {
        /* ignore */
      }
      setVisible(false);
      onDone?.();
    }, duration);

    return () => window.clearTimeout(timer);
  }, [onDone, reduced]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--navy)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0.15 : 0.35 }}
          role="status"
          aria-live="polite"
          aria-label={t("aria")}
        >
          <div className="relative flex w-full max-w-md flex-col items-center gap-5 px-6 text-center">
            <motion.p
              className="font-display text-5xl tracking-tight text-white md:text-6xl"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              ARKAN/
            </motion.p>
            <motion.p
              className="tech-label text-[11px] text-white/55"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.35 }}
            >
              {t("initializing")}
            </motion.p>
            <div className="relative h-px w-full max-w-[220px] bg-white/15">
              <motion.span
                className="absolute top-1/2 size-2 -translate-y-1/2 rounded-full bg-[var(--signal)]"
                initial={reduced ? false : { left: "0%" }}
                animate={{ left: "72%" }}
                transition={{ duration: reduced ? 0 : 0.85, ease: [0.2, 0.8, 0.2, 1] }}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

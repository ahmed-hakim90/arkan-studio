"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { usePrefersReducedMotion } from "@/lib/motion";

export function Hero() {
  const t = useTranslations("Hero");
  const locale = useLocale();
  const reduced = usePrefersReducedMotion();
  const brand = locale === "ar" ? "أركان" : "ARKAN";

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[var(--navy)] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--navy)] to-transparent"
      />

      <div className="section-pad relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center py-24">
        <motion.p
          className="tech-label text-[11px] text-white/45"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45 }}
        >
          SYSTEMS, EXPOSED.
        </motion.p>

        <motion.h1
          className="font-display mt-6 text-[clamp(3.5rem,14vw,9rem)] leading-[0.9] tracking-tight"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {brand}
        </motion.h1>

        <motion.p
          className="mt-6 max-w-2xl text-2xl text-white/90 md:text-3xl"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.55 }}
        >
          {t("tagline")}
        </motion.p>

        <motion.p
          className="mt-4 max-w-xl text-base text-white/60 md:text-lg"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.28, duration: 0.5 }}
        >
          {t("supporting")}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap gap-3"
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.45 }}
        >
          <Link href="/work" className="btn-primary">
            {t("ctaPrimary")}
          </Link>
          <Link href="/start" className="btn-ghost">
            {t("ctaSecondary")}
          </Link>
        </motion.div>

        <div className="relative mt-16 h-px w-full max-w-xl bg-white/15" aria-hidden>
          <motion.span
            className="absolute top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-[var(--signal)] shadow-[0_0_0_6px_rgba(215,4,42,0.2)]"
            initial={reduced ? false : { insetInlineStart: "0%" }}
            animate={{ insetInlineStart: "78%" }}
            transition={{
              delay: 0.7,
              duration: 1.1,
              ease: [0.2, 0.8, 0.2, 1],
            }}
          />
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { usePrefersReducedMotion } from "@/lib/motion";

/** Chapter 03 — thesis punch only. Hands off immediately to OperatingFlow. */
export function BrandStatement() {
  const t = useTranslations("Home.brandStatement");
  const reduced = usePrefersReducedMotion();

  return (
    <section className="border-y border-[var(--line)] bg-[var(--surface)]">
      <div className="section-pad canvas py-16 md:py-24">
        <motion.h2
          className="type-brand-statement max-w-[16ch] text-[var(--ink)]"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {t("headline")}
        </motion.h2>
        <motion.p
          className="mt-5 max-w-[40ch] text-lg text-[var(--muted)] md:text-xl"
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: reduced ? 0 : 0.12, duration: 0.35 }}
        >
          {t("support")}
        </motion.p>
        <motion.p
          className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--muted)] md:text-lg"
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: reduced ? 0 : 0.18, duration: 0.35 }}
        >
          {t("body")}
        </motion.p>
        <motion.p
          className="mt-6 max-w-xl text-sm font-semibold text-[var(--ink)] md:text-base"
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: reduced ? 0 : 0.22, duration: 0.35 }}
        >
          {t("footer")}
        </motion.p>
      </div>
    </section>
  );
}

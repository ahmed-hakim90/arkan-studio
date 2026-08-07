"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { usePrefersReducedMotion } from "@/lib/motion";

const spectrum = [
  "idea",
  "strategy",
  "ux",
  "designSystem",
  "frontend",
  "backend",
  "data",
  "infrastructure",
  "integrations",
  "ai",
  "deployment",
  "operations",
  "growth",
] as const;

export function CapabilitySpectrum() {
  const t = useTranslations("Home.spectrum");
  const reduced = usePrefersReducedMotion();

  return (
    <section className="section-pad border-y border-[var(--line)] bg-[var(--navy)] py-20 text-white md:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-4xl md:text-6xl">{t("title")}</h2>
        <div className="relative mt-12">
          <div className="h-px w-full bg-white/15" />
          <motion.div
            aria-hidden
            className="absolute top-0 h-px bg-[var(--signal)]"
            initial={reduced ? false : { width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: reduced ? 0 : 1.4, ease: [0.2, 0.8, 0.2, 1] }}
          />
          <div className="mt-6 flex flex-wrap gap-2">
            {spectrum.map((item, index) => (
              <motion.span
                key={item}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: reduced ? 0 : index * 0.04, duration: 0.3 }}
                className="tech-label rounded-[var(--radius-xs)] border border-white/15 px-2.5 py-1.5 text-[10px] text-white/75"
              >
                {t(`items.${item}`)}
              </motion.span>
            ))}
          </div>
        </div>
        <div className="mt-14 max-w-2xl">
          <p className="font-display text-3xl md:text-4xl">{t("claim")}</p>
          <p className="mt-3 text-lg text-white/65">{t("claimSub")}</p>
        </div>
      </div>
    </section>
  );
}

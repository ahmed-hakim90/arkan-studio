"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { usePrefersReducedMotion } from "@/lib/motion";

export function OneTeam() {
  const t = useTranslations("Home.oneTeam");
  const reduced = usePrefersReducedMotion();
  const lines = t.raw("lines") as string[];

  return (
    <section className="section-pad py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="space-y-4">
          {lines.map((line, index) => (
            <motion.p
              key={line}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: reduced ? 0 : index * 0.08, duration: 0.4 }}
              className="font-display text-2xl text-[var(--muted)] md:text-4xl"
            >
              {line}
            </motion.p>
          ))}
        </div>
        <motion.h2
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: reduced ? 0 : 0.35, duration: 0.45 }}
          className="font-display mt-12 text-4xl text-[var(--navy)] md:text-6xl"
        >
          {t("final")}
        </motion.h2>
      </div>
    </section>
  );
}

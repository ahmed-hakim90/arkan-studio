"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { usePrefersReducedMotion } from "@/lib/motion";

const spine = ["Product", "UX", "Engineering", "Operations", "Growth"] as const;

export function OneTeam() {
  const t = useTranslations("Home.oneTeam");
  const reduced = usePrefersReducedMotion();

  return (
    <section className="section-pad bg-[var(--surface)] py-24 md:py-32">
      <div className="canvas grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <h2 className="font-display type-h2 tracking-[-0.025em] text-[var(--carbon)] lg:text-6xl">
            {t("title")}
          </h2>
          <p className="mt-6 max-w-md text-lg font-medium text-[var(--foreground)] md:text-xl">
            {t("support")}
          </p>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-[var(--muted)]">
            {t("body")}
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="mb-8 flex flex-wrap gap-2">
            {["Vendor A", "Vendor B", "Vendor C", "Vendor D", "Vendor E", "Vendor F"].map(
              (vendor, index) => (
                <motion.span
                  key={vendor}
                  initial={reduced ? false : { opacity: 0.9 }}
                  whileInView={{ opacity: 0.35 }}
                  viewport={{ once: true }}
                  transition={{ delay: reduced ? 0 : index * 0.05, duration: 0.5 }}
                  className="rounded-[var(--radius-xs)] border border-[var(--line)] px-3 py-1.5 text-xs text-[var(--muted)]"
                >
                  {vendor}
                </motion.span>
              ),
            )}
          </div>

          <div className="relative flex flex-col gap-3 border-s-2 border-[var(--oxide)] ps-5 md:flex-row md:flex-wrap md:items-center md:gap-0 md:border-s-0 md:border-t-2 md:ps-0 md:pt-5">
            {spine.map((node, index) => (
              <div key={node} className="flex items-center gap-3 md:gap-0">
                <motion.span
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: reduced ? 0 : 0.2 + index * 0.08,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="rounded-[var(--radius-xs)] bg-[var(--carbon)] px-3 py-2 tech-label text-[10px] text-white"
                >
                  {node}
                </motion.span>
                {index < spine.length - 1 ? (
                  <motion.span
                    aria-hidden
                    className="hidden h-px w-8 bg-[var(--oxide)] md:mx-2 md:block"
                    initial={reduced ? false : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: reduced ? 0 : 0.3 + index * 0.08 }}
                  />
                ) : null}
              </div>
            ))}
          </div>
          <p className="tech-label mt-4 text-[10px] text-[var(--oxide)]">
            ARKAN SPINE
          </p>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

const STEPS = ["business", "people", "process", "data", "system"] as const;

/** Chapter 04 — compact visual operating chain. */
export function OperatingFlow() {
  const t = useTranslations("Home.operatingFlow");
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);

  return (
    <section
      className="border-t border-[var(--line)] bg-[var(--paper-soft)]"
      aria-label={t("aria")}
    >
      <div className="section-pad canvas py-12 md:py-16">
        <p className="tech-label text-[11px] text-[var(--muted)]">
          {t("eyebrow")}
        </p>

        <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step, index) => {
            const on = active === index;
            return (
              <li key={step} className="min-w-0 [perspective:900px]">
                <motion.button
                  type="button"
                  onClick={() => setActive(index)}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  whileHover={reduced ? undefined : { y: -4, rotateX: 4 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex h-full w-full flex-col border bg-[var(--surface)] p-4 text-start transition-[border-color,box-shadow] duration-300 md:p-5 ${
                    on
                      ? "border-[var(--oxide)] shadow-[0_12px_28px_-18px_rgba(18,20,23,0.45)]"
                      : "border-[var(--line)] hover:border-[var(--line-strong)]"
                  }`}
                  style={{ transformStyle: "preserve-3d" }}
                  aria-current={on ? "step" : undefined}
                >
                  <span className="tech-label text-[10px] text-[var(--muted)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display mt-3 text-xl tracking-tight text-[var(--carbon)] md:text-2xl">
                    {t(`steps.${step}`)}
                  </span>
                  <span
                    aria-hidden
                    className={`mt-6 block h-0.5 bg-[var(--oxide)] transition-all duration-300 ${
                      on ? "w-10 opacity-100" : "w-0 opacity-0"
                    }`}
                  />
                </motion.button>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { pillarOrder } from "@/content/team";
import { usePrefersReducedMotion } from "@/lib/motion";

export function SixArkan() {
  const t = useTranslations("Home.six");
  const tPillars = useTranslations("Pillars");
  const [active, setActive] = useState(pillarOrder[0]);
  const reduced = usePrefersReducedMotion();

  return (
    <section className="section-pad border-y border-[var(--line)] bg-[var(--surface)] py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="tech-label text-[11px] text-[var(--signal)]">
          {t("eyebrow")}
        </p>
        <h2 className="font-display mt-3 text-4xl md:text-5xl">{t("title")}</h2>
        <p className="mt-3 max-w-2xl text-[var(--muted)]">{t("subtitle")}</p>

        <div className="mt-14">
          <p className="font-display text-center text-5xl tracking-tight text-[var(--navy)] md:text-7xl">
            ARKAN
          </p>
          <div className="mt-8 grid grid-cols-2 gap-px bg-[var(--line)] md:grid-cols-6">
            {pillarOrder.map((pillar, index) => {
              const on = active === pillar;
              return (
                <button
                  key={pillar}
                  type="button"
                  onMouseEnter={() => setActive(pillar)}
                  onFocus={() => setActive(pillar)}
                  className={`bg-[var(--surface)] px-3 py-8 text-center transition ${
                    on ? "bg-[color-mix(in_oklab,var(--signal-soft)_55%,white)]" : ""
                  }`}
                >
                  <span className="tech-label block text-[10px] text-[var(--muted)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`mt-2 block font-display text-lg ${
                      on ? "text-[var(--signal)]" : "text-[var(--foreground)]"
                    }`}
                  >
                    {tPillars(pillar)}
                  </span>
                  <motion.span
                    aria-hidden
                    className="mx-auto mt-4 block h-16 w-px bg-[var(--navy)]"
                    animate={{
                      backgroundColor: on ? "var(--signal)" : "var(--navy)",
                      scaleY: on ? 1.15 : 1,
                    }}
                    transition={{ duration: reduced ? 0 : 0.25 }}
                  />
                </button>
              );
            })}
          </div>
          <p className="mt-8 max-w-2xl text-[var(--muted)]">
            {tPillars(`${active}Desc`)}
          </p>
        </div>
      </div>
    </section>
  );
}

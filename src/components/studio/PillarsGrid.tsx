"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { pillarOrder } from "@/content/team";
import type { PillarId } from "@/content/types";
import { usePrefersReducedMotion } from "@/lib/motion";

type Props = {
  active?: PillarId[];
  compact?: boolean;
};

export function PillarsGrid({ active, compact = false }: Props) {
  const t = useTranslations("Pillars");
  const reduced = usePrefersReducedMotion();
  const activeSet = new Set(active ?? pillarOrder);
  const [hover, setHover] = useState<PillarId | null>(null);

  return (
    <div className="grid grid-cols-2 gap-px bg-[var(--line)] md:grid-cols-3 lg:grid-cols-6">
      {pillarOrder.map((pillar, index) => {
        const on = activeSet.has(pillar);
        const focused = hover === pillar || (!hover && on);
        return (
          <motion.button
            key={pillar}
            type="button"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: reduced ? 0 : 0.35,
              delay: reduced ? 0 : index * 0.04,
            }}
            onMouseEnter={() => setHover(pillar)}
            onFocus={() => setHover(pillar)}
            onMouseLeave={() => setHover(null)}
            className={`bg-[var(--surface)] px-4 py-8 text-start transition ${
              focused
                ? "bg-[color-mix(in_oklab,var(--signal-soft)_45%,white)]"
                : "opacity-70"
            }`}
          >
            <span className="tech-label text-[10px] text-[var(--muted)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3
              className={`font-display mt-3 text-xl ${
                focused ? "text-[var(--signal)]" : "text-[var(--foreground)]"
              }`}
            >
              {t(pillar)}
            </h3>
            {!compact ? (
              <p className="mt-2 text-sm text-[var(--muted)]">
                {t(`${pillar}Desc`)}
              </p>
            ) : null}
            <span
              aria-hidden
              className={`mt-6 block h-20 w-px ${
                focused ? "bg-[var(--signal)]" : "bg-[var(--navy)]"
              }`}
            />
          </motion.button>
        );
      })}
    </div>
  );
}

"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";

const layers = [
  "interface",
  "workflow",
  "application",
  "data",
  "automation",
  "integrations",
  "infrastructure",
] as const;

function LayerRow({
  layer,
  index,
  label,
  progress,
}: {
  layer: string;
  index: number;
  label: string;
  progress: MotionValue<number>;
}) {
  const start = 0.15 + index * 0.08;
  const opacity = useTransform(progress, [start, start + 0.08], [0.35, 1]);
  const color = useTransform(
    progress,
    [start, start + 0.08],
    ["#5A6475", "#D7042A"],
  );

  return (
    <motion.div
      style={{ opacity, color }}
      className="flex items-center justify-between border-b border-[var(--line)] py-5 last:border-b-0"
    >
      <span className="font-display text-2xl md:text-3xl">{label}</span>
      <span className="tech-label text-[10px]">
        {String(index + 1).padStart(2, "0")}
      </span>
    </motion.div>
  );
}

export function InvisibleLayer() {
  const t = useTranslations("Home.invisible");
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={ref} className="section-pad py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display max-w-3xl text-4xl md:text-6xl">
          {t("title")}
        </h2>
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-[var(--muted)] md:text-xl">
          {t("body")}
        </p>

        <div className="mt-16 space-y-0 border-y border-[var(--line)]">
          {layers.map((layer, index) => (
            <LayerRow
              key={layer}
              layer={layer}
              index={index}
              label={t(`layers.${layer}`)}
              progress={scrollYProgress}
            />
          ))}
        </div>

        <p className="font-display mt-12 text-2xl text-[var(--navy)] md:text-3xl">
          {t("footer")}
        </p>
      </div>
    </section>
  );
}

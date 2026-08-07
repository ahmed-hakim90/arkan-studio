"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

export function CategoryReframe() {
  const t = useTranslations("Home.reframe");
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const a = useTransform(scrollYProgress, [0.1, 0.28], [0.25, 1]);
  const b = useTransform(scrollYProgress, [0.28, 0.46], [0.25, 1]);
  const c = useTransform(scrollYProgress, [0.46, 0.64], [0.25, 1]);
  const final = useTransform(scrollYProgress, [0.64, 0.85], [0, 1]);

  const words = [
    { key: "a", opacity: a },
    { key: "b", opacity: b },
    { key: "c", opacity: c },
  ] as const;

  return (
    <section
      ref={ref}
      className="section-pad relative min-h-[160vh] bg-[var(--background)]"
    >
      <div className="sticky top-[20vh] mx-auto flex min-h-[60vh] max-w-6xl flex-col justify-center py-16">
        <div className="space-y-6">
          {words.map((item) => (
            <motion.p
              key={item.key}
              style={reduced ? undefined : { opacity: item.opacity }}
              className="font-display text-[clamp(2.5rem,8vw,5.5rem)] leading-none tracking-tight text-[var(--foreground)]"
            >
              {t(item.key)}
            </motion.p>
          ))}
        </div>
        <motion.h2
          style={reduced ? undefined : { opacity: final }}
          className="font-display mt-14 max-w-4xl text-3xl text-[var(--navy)] md:text-5xl"
        >
          {t("final")}
        </motion.h2>
      </div>
    </section>
  );
}

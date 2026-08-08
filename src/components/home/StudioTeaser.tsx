"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { usePrefersReducedMotion } from "@/lib/motion";

const NODES = [
  "product",
  "experience",
  "frontend",
  "backend",
  "operations",
  "growth",
] as const;

/** Chapter 16 — operating model weight, not a thin filler. */
export function StudioTeaser() {
  const t = useTranslations("Home.studio");
  const tSix = useTranslations("Home.six.items");
  const reduced = usePrefersReducedMotion();

  return (
    <section className="bg-[var(--paper-soft)]">
      <div className="section-pad canvas py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="tech-label text-[11px] text-[var(--muted)]">
              {t("eyebrow")}
            </p>
            <h2 className="font-display mt-3 text-4xl tracking-[-0.025em] text-[var(--carbon)] md:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-5 max-w-[36ch] text-lg text-[var(--muted)]">
              {t("support")}
            </p>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-[var(--muted)]">
              {t("body")}
            </p>
            <Link href="/studio" className="btn-primary mt-8 inline-flex">
              {t("cta")}
            </Link>
          </div>

          <div className="relative lg:col-span-7">
            <div
              className="absolute start-1/2 top-4 bottom-4 w-px -translate-x-px bg-[var(--line-strong)]"
              aria-hidden
            />
            <ul className="relative grid gap-3 sm:grid-cols-2">
              {NODES.map((id, index) => (
                <motion.li
                  key={id}
                  initial={reduced ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: reduced ? 0 : index * 0.05,
                    duration: 0.35,
                  }}
                  className="border border-[var(--line)] bg-[var(--surface)] p-4"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`size-1.5 ${
                        index === 0 ? "bg-[var(--oxide)]" : "bg-[var(--carbon)]"
                      }`}
                    />
                    <span className="tech-label text-[10px] text-[var(--muted)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="font-display mt-3 text-xl tracking-tight">
                    {tSix(`${id}.title`)}
                  </p>
                  <p className="mt-2 text-sm text-[var(--muted)]">
                    {tSix(`${id}.line`)}
                  </p>
                </motion.li>
              ))}
            </ul>
            <p className="mt-6 tech-label text-[10px] text-[var(--muted)]">
              {t("modelLabel")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

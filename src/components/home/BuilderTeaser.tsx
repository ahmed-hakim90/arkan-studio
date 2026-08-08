"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { usePrefersReducedMotion } from "@/lib/motion";

const chips = [
  { id: "operations", type: "operations" },
  { id: "commerce", type: "commerce" },
  { id: "platform", type: "platform" },
] as const;

const nodes = ["USERS", "WORKFLOWS", "INTEGRATIONS", "BLUEPRINT"] as const;

export function BuilderTeaser() {
  const t = useTranslations("Home.builder");
  const reduced = usePrefersReducedMotion();

  return (
    <section className="section-pad bg-[var(--surface)] py-20 md:py-28">
      <div className="canvas grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <p className="tech-label text-[11px] text-[var(--muted)]">
            PROJECT BUILDER
          </p>
          <h2 className="font-display mt-3 text-4xl tracking-[-0.025em] text-[var(--carbon)] md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-md text-lg text-[var(--muted)]">
            {t("support")}
          </p>
          <p className="mt-3 max-w-lg text-base leading-relaxed text-[var(--muted)]">
            {t("body")}
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <Link
                key={chip.id}
                href={`/start?type=${chip.type}`}
                className="inline-flex min-h-11 items-center border border-[var(--line-strong)] bg-[var(--paper-soft)] px-4 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--volt)]"
              >
                {t(`options.${chip.id}`)}
              </Link>
            ))}
          </div>
          <Link href="/start" className="btn-primary mt-10 inline-flex">
            {t("cta")}
          </Link>
        </div>

        <div className="border border-[var(--line)] bg-[var(--paper-soft)] p-6 lg:col-span-6 lg:min-h-[260px]">
          <p className="tech-label text-[10px] text-[var(--muted)]">
            LIVE BLUEPRINT
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {nodes.map((node, index) => (
              <motion.div
                key={node}
                initial={reduced ? false : { opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: reduced ? 0 : index * 0.08,
                  duration: 0.35,
                }}
                className={`border px-3 py-3 tech-label text-[10px] ${
                  index === nodes.length - 1
                    ? "border-[var(--oxide)] text-[var(--carbon)]"
                    : "border-[var(--line)] text-[var(--muted)]"
                }`}
              >
                <span className="flex items-center gap-2">
                  {index === nodes.length - 1 ? (
                    <span className="size-1.5 bg-[var(--oxide)]" />
                  ) : (
                    <span className="size-1.5 bg-[var(--carbon)]/30" />
                  )}
                  {node}
                </span>
              </motion.div>
            ))}
          </div>
          <p className="mt-6 text-sm text-[var(--muted)]">{t("hint")}</p>
        </div>
      </div>
    </section>
  );
}

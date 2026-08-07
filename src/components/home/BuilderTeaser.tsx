"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import { usePrefersReducedMotion } from "@/lib/motion";

const options = [
  "business",
  "platform",
  "commerce",
  "operations",
  "ai",
  "experience",
] as const;

export function BuilderTeaser() {
  const t = useTranslations("Home.builder");
  const [selected, setSelected] = useState<(typeof options)[number] | null>(
    null,
  );
  const reduced = usePrefersReducedMotion();

  const nodes = useMemo(() => {
    if (!selected) return ["CORE"];
    const map: Record<(typeof options)[number], string[]> = {
      business: ["USERS", "MODULES", "DATA", "REPORTS"],
      platform: ["TENANTS", "ROLES", "APIS", "BILLING"],
      commerce: ["CATALOG", "CHECKOUT", "PAYMENTS", "FULFILL"],
      operations: ["INTAKE", "DISPATCH", "FIELD", "CONTROL"],
      ai: ["INTAKE", "MODELS", "WORKFLOWS", "HUMAN"],
      experience: ["CONTENT", "INTERFACE", "JOURNEY", "ANALYTICS"],
    };
    return map[selected];
  }, [selected]);

  return (
    <section className="section-pad py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="tech-label text-[11px] text-[var(--signal)]">
            {t("eyebrow")}
          </p>
          <h2 className="font-display mt-3 text-4xl md:text-5xl">
            {t("title")}
          </h2>
          <div className="mt-8 flex flex-wrap gap-2">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setSelected(option)}
                className={`rounded-[var(--radius-sm)] border px-3 py-2 text-sm font-medium transition ${
                  selected === option
                    ? "border-[var(--signal)] bg-[var(--signal)] text-white"
                    : "border-[var(--line)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--signal)]"
                }`}
              >
                {t(`options.${option}`)}
              </button>
            ))}
          </div>
          <Link href="/start" className="btn-primary mt-10">
            {t("cta")}
          </Link>
        </div>

        <div className="border border-[var(--line)] bg-[var(--surface)] p-6">
          <p className="tech-label text-[10px] text-[var(--muted)]">
            LIVE BLUEPRINT
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {nodes.map((node, index) => (
              <motion.div
                key={`${selected ?? "none"}-${node}`}
                initial={reduced ? false : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: reduced ? 0 : index * 0.05 }}
                className="flex items-center gap-3"
              >
                <span className="rounded-[var(--radius-xs)] border border-[var(--line-signal)] bg-[color-mix(in_oklab,var(--signal-soft)_40%,white)] px-3 py-2 tech-label text-[10px] text-[var(--signal)]">
                  {node}
                </span>
                {index < nodes.length - 1 ? (
                  <span className="h-px w-4 bg-[var(--signal)]" aria-hidden />
                ) : null}
              </motion.div>
            ))}
          </div>
          <p className="mt-6 text-sm text-[var(--muted)]">{t("hint")}</p>
        </div>
      </div>
    </section>
  );
}

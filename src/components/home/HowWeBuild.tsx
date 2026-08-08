"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link } from "@/i18n/navigation";

const stages = [
  "discover",
  "map",
  "architect",
  "prototype",
  "design",
  "build",
  "integrate",
  "validate",
  "launch",
  "evolve",
] as const;

export function HowWeBuild() {
  const t = useTranslations("Home.how");
  const [active, setActive] = useState<(typeof stages)[number]>("architect");
  const activeIndex = stages.indexOf(active);

  return (
    <section className="section-pad bg-[var(--paper)] py-20 md:py-28">
      <div className="canvas">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="tech-label text-[11px] text-[var(--muted)]">
              {t("eyebrow")}
            </p>
            <h2 className="font-display mt-3 text-4xl text-[var(--carbon)] md:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)]">
              {t("support")}
            </p>
          </div>
          <Link
            href="/approach"
            className="text-sm font-semibold text-[var(--oxide)] underline-offset-4 hover:underline"
          >
            {t("fullApproach")}
          </Link>
        </div>

        {/* Desktop rail */}
        <div className="relative mt-14 hidden lg:block">
          <div className="absolute inset-x-0 top-2 h-px bg-[var(--line)]" />
          <div
            aria-hidden
            className="absolute top-2 h-px bg-[var(--oxide)] transition-[width] duration-300"
            style={{
              width: `${(activeIndex / Math.max(1, stages.length - 1)) * 100}%`,
            }}
          />
          <div className="grid grid-cols-10 gap-1">
            {stages.map((stage, index) => {
              const on = active === stage;
              return (
                <button
                  key={stage}
                  type="button"
                  onMouseEnter={() => setActive(stage)}
                  onFocus={() => setActive(stage)}
                  onClick={() => setActive(stage)}
                  className="group relative pt-0 text-start"
                >
                  <span
                    className={`relative z-10 mb-3 block size-2 rounded-full transition-transform duration-300 group-hover:scale-150 ${
                      on || index <= activeIndex
                        ? "bg-[var(--oxide)]"
                        : "bg-[var(--steel)] group-hover:bg-[var(--oxide)]"
                    }`}
                  />
                  <span
                    className={`tech-label text-[9px] leading-tight transition-colors duration-300 ${
                      on
                        ? "text-[var(--oxide)]"
                        : "text-[var(--muted)] group-hover:text-[var(--carbon)]"
                    }`}
                  >
                    {t(`stages.${stage}.title`)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile stepper */}
        <div className="mt-10 space-y-2 lg:hidden">
          {stages.map((stage) => {
            const on = active === stage;
            return (
              <button
                key={stage}
                type="button"
                onClick={() => setActive(stage)}
                className={`flex min-h-11 w-full items-center gap-3 border-s-2 px-3 py-3 text-start ${
                  on
                    ? "border-[var(--oxide)] bg-[var(--surface)]"
                    : "border-transparent"
                }`}
              >
                <span className="tech-label text-[10px] text-[var(--muted)]">
                  {t(`stages.${stage}.title`)}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-10 max-w-2xl border border-[var(--line)] bg-[var(--surface)] p-6">
          <h3 className="font-display text-2xl">
            {t(`stages.${active}.title`)}
          </h3>
          <dl className="mt-5 space-y-3 text-sm">
            <div>
              <dt className="tech-label text-[10px] text-[var(--muted)]">
                {t("input")}
              </dt>
              <dd className="mt-1 text-[var(--foreground)]">
                {t(`stages.${active}.input`)}
              </dd>
            </div>
            <div>
              <dt className="tech-label text-[10px] text-[var(--muted)]">
                {t("activity")}
              </dt>
              <dd className="mt-1 text-[var(--foreground)]">
                {t(`stages.${active}.activity`)}
              </dd>
            </div>
            <div>
              <dt className="tech-label text-[10px] text-[var(--muted)]">
                {t("output")}
              </dt>
              <dd className="mt-1 text-[var(--foreground)]">
                {t(`stages.${active}.output`)}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

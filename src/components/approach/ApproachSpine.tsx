"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { usePrefersReducedMotion } from "@/lib/motion";

const stages = [
  "discover",
  "map",
  "design",
  "build",
  "integrate",
  "launch",
  "evolve",
] as const;

type StageId = (typeof stages)[number];

const fieldKeys = ["input", "activity", "output", "gate"] as const;

export function ApproachSpine() {
  const t = useTranslations("Approach");
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState<StageId>("discover");

  useEffect(() => {
    const nodes = stages
      .map((stage) => document.getElementById(`approach-${stage}`))
      .filter((node): node is HTMLElement => Boolean(node));

    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
          );
        const id = visible[0]?.target.id.replace(
          "approach-",
          "",
        ) as StageId | undefined;
        if (id && stages.includes(id)) setActive(id);
      },
      {
        rootMargin: "-28% 0px -48% 0px",
        threshold: [0.15, 0.35, 0.6],
      },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const scrollToStage = (stage: StageId) => {
    setActive(stage);
    const el = document.getElementById(`approach-${stage}`);
    el?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <div className="mt-12">
      <nav
        aria-label={t("eyebrow")}
        className="sticky top-[calc(var(--header-offset,5rem)+0.5rem)] z-20 -mx-1 mb-10 border border-[var(--line)] bg-[color-mix(in_oklab,var(--paper)_92%,white)]/95 backdrop-blur-xl"
      >
        <ol className="flex gap-1 overflow-x-auto p-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {stages.map((stage, index) => {
            const isActive = active === stage;
            return (
              <li key={stage} className="min-w-[9.5rem] flex-1">
                <button
                  type="button"
                  onClick={() => scrollToStage(stage)}
                  className={`flex w-full flex-col gap-1 rounded-[var(--radius-xs)] px-3 py-3 text-start transition ${
                    isActive
                      ? "bg-[var(--ink)] text-white shadow-[0_10px_24px_rgba(11,18,32,0.18)]"
                      : "bg-transparent text-[var(--ink)] hover:bg-[var(--volt-soft)]"
                  }`}
                  aria-current={isActive ? "step" : undefined}
                >
                  <span
                    className={`tech-label text-[10px] ${
                      isActive ? "text-[var(--volt-hot)]" : "text-[var(--muted)]"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-sm leading-tight md:text-base">
                    {t(`stages.${stage}.title`)}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="space-y-8">
        {stages.map((stage, index) => {
          const odd = index % 2 === 1;
          return (
            <article
              key={stage}
              id={`approach-${stage}`}
              className={`scroll-mt-[calc(var(--header-offset,5rem)+6.5rem)] overflow-hidden border border-[var(--line)] ${
                odd
                  ? "bg-[var(--ink)] text-white"
                  : "bg-[var(--surface)] text-[var(--ink)]"
              }`}
              aria-labelledby={`approach-${stage}-title`}
            >
              <div className="grid gap-0 lg:grid-cols-12">
                <div
                  className={`flex flex-col justify-between border-[var(--line)] p-6 md:p-8 lg:col-span-4 lg:border-e ${
                    odd ? "border-white/10" : ""
                  }`}
                >
                  <div>
                    <p
                      className={`tech-label text-[11px] ${
                        odd ? "text-[var(--volt-hot)]" : "text-[var(--volt)]"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")} /{" "}
                      {String(stages.length).padStart(2, "0")}
                    </p>
                    <h2
                      id={`approach-${stage}-title`}
                      className="type-h2 mt-4"
                    >
                      {t(`stages.${stage}.title`)}
                    </h2>
                  </div>
                  <p
                    className={`mt-8 font-display text-[clamp(3.5rem,8vw,6rem)] leading-none tracking-tight ${
                      odd ? "text-white/12" : "text-[var(--ink)]/8"
                    }`}
                    aria-hidden
                  >
                    {String(index + 1).padStart(2, "0")}
                  </p>
                </div>

                <div className="p-6 md:p-8 lg:col-span-8">
                  <p
                    className={`max-w-2xl text-base font-semibold md:text-lg ${
                      odd ? "text-white" : "text-[var(--ink)]"
                    }`}
                  >
                    {t(`stages.${stage}.lead`)}
                  </p>
                  <p
                    className={`mt-3 max-w-2xl text-base leading-relaxed ${
                      odd ? "text-white/65" : "text-[var(--muted)]"
                    }`}
                  >
                    {t(`stages.${stage}.body`)}
                  </p>
                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    {fieldKeys.map((key) => (
                      <div
                        key={key}
                        className={`border p-4 ${
                          odd
                            ? "border-white/12 bg-white/[0.04]"
                            : "border-[var(--line)] bg-[var(--paper)]"
                        }`}
                      >
                        <p
                          className={`tech-label text-[10px] ${
                            odd ? "text-[var(--volt-hot)]" : "text-[var(--volt)]"
                          }`}
                        >
                          {t(key)}
                        </p>
                        <p
                          className={`mt-2 text-sm leading-relaxed ${
                            odd ? "text-white/70" : "text-[var(--muted)]"
                          }`}
                        >
                          {t(`stages.${stage}.${key}`)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-12 flex flex-col items-start gap-5 border border-[var(--line)] bg-[var(--ink)] p-6 text-white md:flex-row md:items-center md:justify-between md:p-8">
        <div>
          <p className="tech-label text-[10px] text-[var(--volt-hot)]">
            {t("eyebrow")}
          </p>
          <p className="mt-2 max-w-xl font-display text-2xl tracking-tight md:text-3xl">
            {t("lead")}
          </p>
        </div>
        <Link href="/start" className="btn-primary shrink-0">
          {t("cta")}
        </Link>
      </div>
    </div>
  );
}

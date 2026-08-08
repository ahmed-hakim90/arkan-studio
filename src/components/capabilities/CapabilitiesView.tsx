"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import type { Project, SystemType } from "@/content/types";
import { Link } from "@/i18n/navigation";
import type { LocaleKey } from "@/lib/site";

const keys = [
  "business",
  "operations",
  "platforms",
  "commerce",
  "ai",
  "experiences",
] as const;

type CapKey = (typeof keys)[number];

const systemTypeMap: Record<CapKey, SystemType> = {
  business: "erp",
  operations: "operations",
  platforms: "platform",
  commerce: "commerce",
  ai: "ai",
  experiences: "experience",
};

type Props = {
  projects: Project[];
  locale: LocaleKey;
};

export function CapabilitiesView({ projects, locale }: Props) {
  const t = useTranslations("Capabilities");
  const tAtlas = useTranslations("Atlas");
  const [active, setActive] = useState<CapKey>("business");

  useEffect(() => {
    const nodes = keys
      .map((id) => document.getElementById(`cap-${id}`))
      .filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const id = visible?.target.id.replace("cap-", "") as CapKey | undefined;
        if (id && keys.includes(id)) setActive(id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.15, 0.4] },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  function relatedFor(key: CapKey) {
    const type = systemTypeMap[key];
    return projects.filter((p) => p.systemType === type).slice(0, 4);
  }

  return (
    <div>
      <div className="grid gap-8 border-b border-[var(--line)] pb-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="tech-label text-[11px] text-[var(--volt)]">
            {t("index")}
          </p>
          <h1 className="type-h1 mt-3 max-w-[14ch]">{t("title")}</h1>
        </div>
        <div className="lg:col-span-5">
          <p className="type-body-l text-[var(--muted)]">{t("subtitle")}</p>
          <p className="mt-4 text-base font-semibold text-[var(--ink)]">
            {t("lead")}
          </p>
          <p className="mt-3 text-base leading-relaxed text-[var(--muted)]">
            {t("body")}
          </p>
        </div>
      </div>

      <nav
        aria-label={t("index")}
        className="sticky top-[calc(var(--header-offset,5rem)+0.5rem)] z-20 mt-8 border border-[var(--line)] bg-[color-mix(in_oklab,var(--paper)_92%,white)]/95 backdrop-blur-xl"
      >
        <ol className="flex gap-1 overflow-x-auto p-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {keys.map((key, index) => {
            const on = active === key;
            return (
              <li key={key} className="min-w-[9rem] flex-1">
                <a
                  href={`#cap-${key}`}
                  onClick={() => setActive(key)}
                  className={`flex w-full flex-col gap-1 rounded-[var(--radius-xs)] px-3 py-3 transition ${
                    on
                      ? "bg-[var(--ink)] text-white shadow-[0_10px_24px_rgba(11,18,32,0.18)]"
                      : "text-[var(--ink)] hover:bg-[var(--volt-soft)]"
                  }`}
                >
                  <span
                    className={`tech-label text-[10px] ${
                      on ? "text-[var(--volt-hot)]" : "text-[var(--muted)]"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-sm leading-tight md:text-base">
                    {t(`items.${key}.title`)}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="mt-8 space-y-6">
        {keys.map((key, index) => {
          const related = relatedFor(key);
          const odd = index % 2 === 1;
          return (
            <article
              key={key}
              id={`cap-${key}`}
              className={`scroll-mt-[calc(var(--header-offset,5rem)+6.5rem)] overflow-hidden border border-[var(--line)] ${
                odd
                  ? "bg-[var(--ink)] text-white"
                  : "bg-[var(--surface)] text-[var(--ink)]"
              }`}
            >
              <div className="grid gap-0 lg:grid-cols-12">
                <div
                  className={`border-[var(--line)] p-6 md:p-8 lg:col-span-4 lg:border-e ${
                    odd ? "border-white/10" : ""
                  }`}
                >
                  <p
                    className={`tech-label text-[11px] ${
                      odd ? "text-[var(--volt-hot)]" : "text-[var(--volt)]"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {String(keys.length).padStart(2, "0")}
                  </p>
                  <h2 className="type-h2 mt-4">{t(`items.${key}.title`)}</h2>
                  <p
                    className={`mt-8 font-display text-[clamp(3.5rem,8vw,5.5rem)] leading-none ${
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
                    {t(`items.${key}.lead`)}
                  </p>
                  <p
                    className={`mt-3 max-w-3xl text-base leading-relaxed ${
                      odd ? "text-white/65" : "text-[var(--muted)]"
                    }`}
                  >
                    {t(`items.${key}.body`)}
                  </p>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <AnatomyBlock
                      label={t("whatSolves")}
                      body={t(`items.${key}.solves`)}
                      invert={odd}
                    />
                    <AnatomyBlock
                      label={t("whatWeBuild")}
                      body={t(`items.${key}.builds`)}
                      invert={odd}
                    />
                    <AnatomyBlock
                      label={t("whoUses")}
                      body={t(`items.${key}.users`)}
                      invert={odd}
                    />
                    <div
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
                        {t("commonModules")}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                        {(t.raw(`items.${key}.modules`) as string[]).map((m) => (
                          <span
                            key={m}
                            className={`tech-label text-[10px] ${
                              odd ? "text-white/55" : "text-[var(--muted)]"
                            }`}
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`mt-4 border p-4 ${
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
                      {t("commonIntegrations")}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                      {(t.raw(`items.${key}.integrations`) as string[]).map(
                        (m) => (
                          <span
                            key={m}
                            className={`tech-label text-[10px] ${
                              odd ? "text-white/55" : "text-[var(--muted)]"
                            }`}
                          >
                            {m}
                          </span>
                        ),
                      )}
                    </div>
                  </div>

                  {related.length ? (
                    <div className="mt-8">
                      <p
                        className={`tech-label text-[10px] ${
                          odd ? "text-[var(--volt-hot)]" : "text-[var(--volt)]"
                        }`}
                      >
                        {t("related")}
                      </p>
                      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                        {related.map((project) => (
                          <li key={project.slug}>
                            <Link
                              href={`/work/${project.slug}`}
                              className={`flex items-center justify-between gap-3 border px-3 py-3 transition ${
                                odd
                                  ? "border-white/12 hover:border-[var(--volt-hot)]"
                                  : "border-[var(--line)] hover:border-[var(--volt)]"
                              }`}
                            >
                              <span className="font-display text-lg">
                                {project.title[locale]}
                              </span>
                              <span
                                className={`tech-label text-[10px] ${
                                  odd
                                    ? "text-[var(--volt-hot)]"
                                    : "text-[var(--volt)]"
                                }`}
                              >
                                {tAtlas(`statuses.${project.status}`)}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  <div className="mt-8 flex flex-wrap gap-4 text-sm font-semibold">
                    <Link
                      href="/work"
                      className={
                        odd
                          ? "text-[var(--volt-hot)] hover:underline"
                          : "text-[var(--volt)] hover:underline"
                      }
                    >
                      {t("exploreWork")}
                    </Link>
                    <Link
                      href="/start"
                      className={
                        odd ? "text-white hover:underline" : "text-[var(--ink)] hover:underline"
                      }
                    >
                      {t("startWith")}
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-12 flex flex-col items-start gap-5 border border-[var(--line)] bg-[var(--ink)] p-6 text-white md:flex-row md:items-center md:justify-between md:p-8">
        <p className="max-w-xl font-display text-2xl tracking-tight md:text-3xl">
          {t("ctaBlueprint")}
        </p>
        <Link href="/start" className="btn-primary shrink-0">
          {t("ctaBlueprint")}
        </Link>
      </div>
    </div>
  );
}

function AnatomyBlock({
  label,
  body,
  invert,
}: {
  label: string;
  body: string;
  invert?: boolean;
}) {
  return (
    <div
      className={`border p-4 ${
        invert
          ? "border-white/12 bg-white/[0.04]"
          : "border-[var(--line)] bg-[var(--paper)]"
      }`}
    >
      <p
        className={`tech-label text-[10px] ${
          invert ? "text-[var(--volt-hot)]" : "text-[var(--volt)]"
        }`}
      >
        {label}
      </p>
      <p
        className={`mt-2 text-sm leading-relaxed ${
          invert ? "text-white/70" : "text-[var(--muted)]"
        }`}
      >
        {body}
      </p>
    </div>
  );
}

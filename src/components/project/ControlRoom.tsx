"use client";

import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import type { Project } from "@/content/types";
import { Link } from "@/i18n/navigation";

type Props = {
  project: Project;
  nextProject?: Project;
};

const xrayLayers = [
  "INTERFACE",
  "WORKFLOW",
  "SERVICES",
  "DATA",
  "AUTOMATION",
  "INTEGRATIONS",
] as const;

export function ControlRoom({ project, nextProject }: Props) {
  const t = useTranslations("ControlRoom");
  const tAtlas = useTranslations("Atlas");
  const locale = useLocale() as "ar" | "en";
  const [mode, setMode] = useState<"experience" | "system">("experience");
  const [roleId, setRoleId] = useState(project.roles[0]?.id ?? "");
  const next = nextProject;

  const activeRole = useMemo(
    () => project.roles.find((r) => r.id === roleId),
    [project.roles, roleId],
  );

  const highlightedModules = new Set(activeRole?.modules ?? []);
  const highlightedWorkflows = new Set(activeRole?.workflows ?? []);

  return (
    <article>
      <header className="section-pad border-b border-[var(--line)] bg-[var(--navy)] py-16 text-white md:py-20">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/work"
            className="tech-label text-[11px] text-white/50 hover:text-white"
          >
            ← {t("backToAtlas")}
          </Link>
          <p className="tech-label mt-6 text-[11px] text-[var(--signal-hot)]">
            SYSTEM / {project.id}
          </p>
          <h1 className="font-display mt-3 text-5xl md:text-7xl">
            {project.title[locale]}
          </h1>
          <p className="mt-3 text-xl text-white/65">
            {project.descriptor[locale]}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 tech-label text-[10px] text-white/55">
            <span>STATUS / {tAtlas(`statuses.${project.status}`)}</span>
            <span>SECTOR / {tAtlas(`sectors.${project.sector}`)}</span>
            {project.region?.length ? (
              <span>REGION / {project.region.join(" · ")}</span>
            ) : null}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              className={mode === "experience" ? "btn-primary" : "btn-ghost"}
              onClick={() => setMode("experience")}
            >
              {t("viewExperience")}
            </button>
            <button
              type="button"
              className={mode === "system" ? "btn-primary" : "btn-ghost"}
              onClick={() => setMode("system")}
            >
              {t("viewSystem")}
            </button>
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                {t("liveDemo")}
              </a>
            ) : null}
          </div>
        </div>
      </header>

      <div className="section-pad mx-auto max-w-6xl space-y-20 py-16 md:py-24">
        <Chapter title={t("overview")}>
          <p className="max-w-3xl text-lg text-[var(--muted)]">
            {project.summary[locale]}
          </p>
        </Chapter>

        <Chapter title={t("context")}>
          <p className="max-w-3xl text-[var(--muted)]">{project.context[locale]}</p>
        </Chapter>

        <Chapter title={t("challenge")}>
          <p className="max-w-3xl text-[var(--muted)]">
            {project.challenge[locale]}
          </p>
          {project.workflows[0] ? (
            <ol className="mt-8 max-w-md space-y-2 border-s border-[var(--line)] ps-5">
              {project.workflows[0].steps.map((step) => (
                <li key={step.en} className="tech-label text-[11px] text-[var(--muted)]">
                  {step[locale]}
                </li>
              ))}
            </ol>
          ) : null}
        </Chapter>

        <Chapter title={t("architecture")}>
          <p className="max-w-3xl text-[var(--muted)]">{project.solution[locale]}</p>
          <div className="mt-10 overflow-x-auto border border-[var(--line)] bg-[var(--surface)] p-6 md:p-8">
            <div className="mx-auto flex min-w-[280px] max-w-xl flex-col items-center gap-3">
              {project.roles.slice(0, 1).map((role) => (
                <ArchNode key={role.id} label={role.name[locale]} signal />
              ))}
              <ArchLine />
              {project.modules.slice(0, 1).map((module) => (
                <ArchNode key={module.id} label={module.name[locale]} />
              ))}
              <ArchLine />
              <div className="flex w-full flex-wrap items-start justify-center gap-3">
                {project.modules.slice(1, 4).map((module) => (
                  <ArchNode key={module.id} label={module.name[locale]} />
                ))}
              </div>
              <ArchLine />
              <div className="flex w-full flex-wrap items-start justify-center gap-3">
                {project.integrations.slice(0, 3).map((integration) => (
                  <ArchNode
                    key={integration.id}
                    label={`${integration.category[locale]} · ${integration.system}`}
                  />
                ))}
              </div>
              <ArchLine />
              {project.modules.slice(-1).map((module) => (
                <ArchNode key={module.id} label={module.name[locale]} signal />
              ))}
            </div>
          </div>
        </Chapter>

        <Chapter title={t("experience")}>
          <p className="max-w-3xl text-[var(--muted)]">{project.summary[locale]}</p>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {project.modules.slice(0, 3).map((module) => (
              <div
                key={`exp-${module.id}`}
                className="border border-[var(--line)] bg-[linear-gradient(160deg,var(--navy),var(--navy-soft))] px-4 py-10 text-white"
              >
                <p className="tech-label text-[10px] text-white/45">SURFACE</p>
                <p className="font-display mt-3 text-2xl">{module.name[locale]}</p>
              </div>
            ))}
          </div>
        </Chapter>

        <Chapter title={t("xray")}>
          <div className="inline-flex rounded-[var(--radius-sm)] border border-[var(--line)] p-1">
            <button
              type="button"
              onClick={() => setMode("experience")}
              className={`rounded-[var(--radius-xs)] px-4 py-2 tech-label text-[10px] ${
                mode === "experience"
                  ? "bg-[var(--signal)] text-white"
                  : "text-[var(--muted)]"
              }`}
            >
              {t("experienceMode")}
            </button>
            <button
              type="button"
              onClick={() => setMode("system")}
              className={`rounded-[var(--radius-xs)] px-4 py-2 tech-label text-[10px] ${
                mode === "system"
                  ? "bg-[var(--signal)] text-white"
                  : "text-[var(--muted)]"
              }`}
            >
              {t("systemMode")}
            </button>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div
              className={`border border-[var(--line)] bg-[var(--surface)] p-6 transition ${
                mode === "system" ? "opacity-40" : "opacity-100"
              }`}
            >
              <p className="tech-label text-[10px] text-[var(--muted)]">
                {t("surfaces")}
              </p>
              <div className="mt-4 grid gap-3">
                {project.modules.slice(0, 3).map((module) => (
                  <div
                    key={module.id}
                    className="border border-[var(--line)] bg-[linear-gradient(135deg,var(--surface-2),white)] px-4 py-8"
                  >
                    <p className="font-display text-xl">{module.name[locale]}</p>
                    <p className="mt-2 text-sm text-[var(--muted)]">
                      {module.description[locale]}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`border border-[var(--line)] bg-[var(--navy)] p-6 text-white transition ${
                mode === "experience" ? "opacity-40" : "opacity-100"
              }`}
            >
              <p className="tech-label text-[10px] text-[var(--signal-hot)]">
                SYSTEM MODE
              </p>
              <div className="mt-6 space-y-4">
                {xrayLayers.map((layer, index) => (
                  <div key={layer} className="flex items-center gap-3">
                    <span className="size-2 rounded-full bg-[var(--signal)]" />
                    <span className="tech-label text-[11px]">{layer}</span>
                    {index < xrayLayers.length - 1 ? (
                      <span className="ms-1 h-6 w-px bg-white/20" aria-hidden />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Chapter>

        <Chapter title={t("modules")}>
          <div className="space-y-0">
            {project.modules.map((module, index) => (
              <div
                key={module.id}
                className={`grid gap-4 border-t border-[var(--line)] py-8 md:grid-cols-[6rem_1fr] ${
                  highlightedModules.has(module.id)
                    ? "bg-[color-mix(in_oklab,var(--signal-soft)_40%,transparent)]"
                    : ""
                }`}
              >
                <p className="tech-label text-[10px] text-[var(--muted)]">
                  MODULE / {String(index + 1).padStart(2, "0")}
                </p>
                <div>
                  <h3 className="font-display text-3xl">{module.name[locale]}</h3>
                  <p className="mt-2 max-w-2xl text-[var(--muted)]">
                    {module.description[locale]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Chapter>

        <Chapter title={t("roles")}>
          <div className="flex flex-wrap gap-2">
            {project.roles.map((role) => (
              <button
                key={role.id}
                type="button"
                onClick={() => setRoleId(role.id)}
                className="pill"
                data-active={roleId === role.id}
              >
                {role.name[locale]}
              </button>
            ))}
          </div>
          {activeRole ? (
            <p className="mt-6 text-sm text-[var(--muted)]">
              {activeRole.name[locale]} → modules{" "}
              {(activeRole.modules ?? []).join(", ") || "—"} · workflows{" "}
              {(activeRole.workflows ?? []).join(", ") || "—"}
            </p>
          ) : null}
        </Chapter>

        <Chapter title={t("workflows")}>
          <div className="space-y-8">
            {project.workflows.map((workflow) => (
              <div
                key={workflow.id}
                className={
                  highlightedWorkflows.has(workflow.id)
                    ? "rounded-[var(--radius-sm)] bg-[color-mix(in_oklab,var(--signal-soft)_35%,transparent)] p-4"
                    : ""
                }
              >
                <p className="tech-label text-[10px] text-[var(--signal)]">
                  {workflow.name[locale]}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {workflow.steps.map((step, index) => (
                    <div key={step.en} className="flex items-center gap-2">
                      <span className="rounded-[var(--radius-xs)] border border-[var(--line)] px-3 py-2 text-sm">
                        {step[locale]}
                      </span>
                      {index < workflow.steps.length - 1 ? (
                        <span className="text-[var(--signal)]">→</span>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Chapter>

        <Chapter title={t("integrations")}>
          <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {project.integrations.map((integration) => (
              <div key={integration.id} className="grid gap-2 py-5 md:grid-cols-[10rem_8rem_1fr]">
                <p className="tech-label text-[10px] text-[var(--muted)]">
                  {integration.category[locale]}
                </p>
                <p className="font-semibold">{integration.system}</p>
                <p className="text-[var(--muted)]">
                  → {integration.purpose[locale]}
                </p>
              </div>
            ))}
          </div>
        </Chapter>

        <Chapter title={t("technology")}>
          <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {project.stack.map((layer) => (
              <div key={layer.layer} className="grid gap-2 py-4 md:grid-cols-[10rem_1fr]">
                <p className="tech-label text-[10px] text-[var(--muted)]">
                  {layer.layer.toUpperCase()}
                </p>
                <p>{layer.items.join(" / ")}</p>
              </div>
            ))}
          </div>
        </Chapter>

        <Chapter title={t("systemMass")}>
          <dl className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {Object.entries(project.mass).map(([key, value]) =>
              value == null ? null : (
                <div
                  key={key}
                  className="border border-[var(--line)] px-4 py-5"
                >
                  <dt className="tech-label text-[10px] text-[var(--muted)]">
                    {key.toUpperCase()}
                  </dt>
                  <dd className="mt-2 font-display text-3xl">{value}</dd>
                </div>
              ),
            )}
          </dl>
        </Chapter>

        <Chapter title={t("outcomes")}>
          <div className="space-y-3">
            {project.outcomes.map((outcome) => (
              <p key={outcome.from.en} className="tech-label text-sm">
                <span className="text-[var(--muted)]">{outcome.from[locale]}</span>
                <span className="mx-3 text-[var(--signal)]">→</span>
                <span className="text-[var(--foreground)]">{outcome.to[locale]}</span>
              </p>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-[var(--muted)]">
            {project.impact[locale]}
          </p>
        </Chapter>

        <Chapter title={t("scope")}>
          <div className="flex flex-wrap gap-2">
            {project.arkanScope.map((item) => (
              <span
                key={item.en}
                className="rounded-[var(--radius-xs)] border border-[var(--line)] px-3 py-2 tech-label text-[10px]"
              >
                {item[locale]}
              </span>
            ))}
          </div>
          <Link href="/start" className="btn-primary mt-8">
            {t("buildSimilar")}
          </Link>
        </Chapter>

        {next ? (
          <section className="border border-[var(--line)] bg-[var(--navy)] px-6 py-10 text-white md:px-10">
            <p className="tech-label text-[11px] text-[var(--signal-hot)]">
              {t("next")}
            </p>
            <h2 className="font-display mt-3 text-4xl">{next.title[locale]}</h2>
            <p className="mt-2 text-white/65">{next.descriptor[locale]}</p>
            <Link href={`/work/${next.slug}`} className="btn-primary mt-8">
              {t("enter")}
            </Link>
          </section>
        ) : null}
      </div>
    </article>
  );
}

function Chapter({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-3xl md:text-4xl">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function ArchNode({
  label,
  signal,
}: {
  label: string;
  signal?: boolean;
}) {
  return (
    <div
      className={`min-w-28 max-w-[14rem] border px-3 py-2 text-center tech-label text-[10px] ${
        signal
          ? "border-[var(--signal)] text-[var(--signal)]"
          : "border-[var(--line)] text-[var(--muted)]"
      }`}
    >
      {label}
    </div>
  );
}

function ArchLine() {
  return <span className="h-6 w-px bg-[var(--signal)]" aria-hidden />;
}

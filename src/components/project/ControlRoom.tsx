"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import type { Project, TechRationale } from "@/content/types";
import { FingerprintMark } from "@/components/system/FingerprintMark";
import { MassPanel } from "@/components/system/MassPanel";
import { SystemMapSection } from "@/components/project/SystemMapSection";
import { Link } from "@/i18n/navigation";

type Props = {
  project: Project;
  nextProject?: Project;
};

type ChapterId =
  | "overview"
  | "context"
  | "challenge"
  | "systemMap"
  | "architecture"
  | "xray"
  | "modules"
  | "roles"
  | "workflows"
  | "integrations"
  | "technology"
  | "mass"
  | "outcomes"
  | "scope"
  | "next";

function splitChallengeSteps(text: string): string[] {
  const byLine = text
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (byLine.length > 1) return byLine;

  const emDash = text.match(/^(.+?)[—–-]\s*(.+?)\s*[—–-]\s*(.+)$/);
  if (emDash) {
    const lead = emDash[1].trim();
    const mid = emDash[2]
      .split(/[,،]/)
      .map((s) => s.trim())
      .filter(Boolean);
    const tail = emDash[3].trim();
    if (mid.length >= 2) {
      return [lead, ...mid, tail].filter(Boolean);
    }
  }

  const sentences = text
    .split(/(?<=[.!?؟。])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (sentences.length > 1) return sentences;

  const clauses = text
    .split(/[;؛·]/)
    .map((s) => s.trim())
    .filter(Boolean);
  return clauses.length > 1 ? clauses : [text];
}

export function ControlRoom({ project, nextProject }: Props) {
  const t = useTranslations("ControlRoom");
  const tAtlas = useTranslations("Atlas");
  const locale = useLocale() as "ar" | "en";
  const [mode, setMode] = useState<"experience" | "system">("experience");
  const [roleId, setRoleId] = useState(project.roles[0]?.id ?? "");
  const [moduleId, setModuleId] = useState(project.modules[0]?.id ?? "");
  const [workflowId, setWorkflowId] = useState(project.workflows[0]?.id ?? "");
  const [activeChapter, setActiveChapter] = useState<ChapterId>("systemMap");

  const chapters = useMemo(() => {
    const label = (key: string, fallbackEn: string, fallbackAr: string) => {
      if (t.has(key as "overview")) return t(key as "overview");
      return locale === "ar" ? fallbackAr : fallbackEn;
    };

    const list: { id: ChapterId; label: string }[] = [
      { id: "systemMap", label: label("systemMap", "System map", "خريطة النظام") },
      { id: "overview", label: t("overview") },
      { id: "context", label: t("context") },
      { id: "challenge", label: t("challenge") },
      { id: "architecture", label: t("architecture") },
      { id: "xray", label: t("xray") },
      { id: "modules", label: t("modules") },
      { id: "roles", label: t("roles") },
      { id: "workflows", label: t("workflows") },
      { id: "integrations", label: t("integrations") },
      { id: "technology", label: t("technology") },
      { id: "mass", label: t("systemMass") },
      { id: "outcomes", label: t("outcomes") },
      { id: "scope", label: t("scope") },
    ];
    if (nextProject) list.push({ id: "next", label: t("next") });
    return list;
  }, [locale, nextProject, t]);

  useEffect(() => {
    const nodes = chapters
      .map((c) => document.getElementById(`chapter-${c.id}`))
      .filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const id = visible[0]?.target.id.replace("chapter-", "") as ChapterId;
        if (id) setActiveChapter(id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.4, 0.7] },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [chapters]);

  const activeRole = useMemo(
    () => project.roles.find((r) => r.id === roleId),
    [project.roles, roleId],
  );
  const activeModule = useMemo(
    () => project.modules.find((m) => m.id === moduleId) ?? project.modules[0],
    [project.modules, moduleId],
  );
  const highlightedModules = new Set(activeRole?.modules ?? []);
  const highlightedWorkflows = new Set(activeRole?.workflows ?? []);
  const techItems: TechRationale[] =
    project.techRationale.length > 0
      ? project.techRationale
      : project.stack.map((layer) => ({
          why: { ar: layer.layer, en: layer.layer.toUpperCase() },
          tech: layer.items,
        }));

  const chapterIndex = Math.max(
    0,
    chapters.findIndex((c) => c.id === activeChapter),
  );

  const challengeSteps = useMemo(
    () => splitChallengeSteps(project.challenge[locale]),
    [project.challenge, locale],
  );

  const scrollToXray = () => {
    document
      .getElementById("chapter-xray")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const xrayWorkflows = project.workflows.slice(0, 3);
  const xrayIntegrations = project.integrations.slice(0, 4);
  const xrayModules = project.modules.slice(0, 4);

  return (
    <article>
      <header className="relative overflow-hidden section-pad border-b border-[var(--line)] bg-[var(--ink)] py-16 text-white md:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(900px 380px at 15% 20%, rgba(21,94,239,0.35), transparent 60%), radial-gradient(700px 320px at 90% 80%, rgba(15,118,110,0.18), transparent 55%)",
          }}
        />
        <div className="canvas relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <Link
              href="/work"
              className="tech-label text-[11px] text-white/50 hover:text-white"
            >
              ← {t("backToAtlas")}
            </Link>
            <div className="mt-6 flex items-center gap-3">
              <FingerprintMark project={project} size={36} light />
              <p className="tech-label text-[11px] text-[var(--volt-hot)]">
                SYSTEM / {project.id}
              </p>
            </div>
            <h1 className="font-display type-h1 mt-3 md:text-6xl lg:text-7xl">
              {project.title[locale]}
            </h1>
            <p className="mt-3 max-w-3xl text-xl text-white/65">
              {project.descriptor[locale]}
            </p>
            <div className="mt-6 flex flex-wrap gap-3 tech-label text-[10px] text-white/55">
              <span>STATUS / {tAtlas(`statuses.${project.status}`)}</span>
              <span>SECTOR / {tAtlas(`sectors.${project.sector}`)}</span>
              {project.region?.length ? (
                <span>REGION / {project.region.join(" · ")}</span>
              ) : null}
            </div>
            <div className="mt-8 inline-flex w-full max-w-lg flex-col gap-2 sm:w-auto sm:flex-row sm:rounded-[var(--radius-sm)] sm:border sm:border-white/20 sm:p-1">
              <button
                type="button"
                className={`min-h-11 rounded-[var(--radius-xs)] px-4 tech-label text-[10px] ${
                  mode === "experience"
                    ? "bg-[var(--signal)] text-white"
                    : "text-white/70"
                }`}
                onClick={() => {
                  setMode("experience");
                  scrollToXray();
                }}
              >
                {t("viewExperience")}
              </button>
              <button
                type="button"
                className={`min-h-11 rounded-[var(--radius-xs)] px-4 tech-label text-[10px] ${
                  mode === "system"
                    ? "bg-[var(--signal)] text-white"
                    : "text-white/70"
                }`}
                onClick={() => {
                  setMode("system");
                  scrollToXray();
                }}
              >
                {t("viewSystem")}
              </button>
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius-xs)] px-4 text-center tech-label text-[10px] text-white/70 hover:text-white"
                >
                  {t("liveDemo")}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      <SystemMapSection project={project} />

      {/* Command strip — horizontal chapter rail for all breakpoints */}
      <div className="sticky top-[var(--header-offset,5rem)] z-30 border-b border-[var(--line)] bg-[color-mix(in_oklab,var(--paper)_92%,transparent)] backdrop-blur-md">
        <div className="section-pad">
          <div className="canvas flex flex-col gap-2 py-2.5">
            <p className="tech-label truncate text-[10px] text-[var(--muted)]">
              ARKAN / {project.title.en.toUpperCase()} /{" "}
              {chapters[chapterIndex]?.label.toUpperCase()} /{" "}
              {String(chapterIndex + 1).padStart(2, "0")} OF{" "}
              {String(chapters.length).padStart(2, "0")}
            </p>
            <nav
              aria-label="Chapters"
              className="-mx-1 overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <ul className="flex min-w-max gap-1 px-1">
                {chapters.map((chapter, index) => {
                  const on = activeChapter === chapter.id;
                  return (
                    <li key={chapter.id}>
                      <a
                        href={`#chapter-${chapter.id}`}
                        className={`inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-xs)] border px-3 text-sm whitespace-nowrap transition ${
                          on
                            ? "border-[var(--ink)] bg-[var(--ink)] text-white"
                            : "border-[var(--line)] text-[var(--muted)] hover:border-[var(--volt)] hover:text-[var(--ink)]"
                        }`}
                      >
                        <span
                          className={`tech-label text-[9px] tabular-nums ${
                            on ? "text-[var(--volt-hot)]" : ""
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {chapter.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <div className="section-pad py-16 md:py-24">
        <div className="canvas">
          <div className="min-w-0 space-y-16 md:space-y-20">
            <Chapter id="overview" title={t("overview")}>
              <p className="tech-label text-[10px] text-[var(--muted)]">
                SYSTEM BRIEF
              </p>
              <p className="mt-4 max-w-[62ch] text-lg leading-relaxed text-[var(--muted)]">
                {project.solution[locale]}
              </p>
              <p className="font-display mt-6 max-w-[28ch] text-2xl text-[var(--navy)] md:text-3xl">
                {project.impact[locale]}
              </p>
            </Chapter>

            <Chapter id="context" title={t("context")}>
              <p className="max-w-[62ch] text-[var(--muted)]">
                {project.context[locale]}
              </p>
            </Chapter>

            <Chapter id="challenge" title={t("challenge")}>
              <ol className="relative ms-3 max-w-[42rem] border-s border-[var(--line)] ps-8">
                {challengeSteps.map((step, index) => (
                  <li
                    key={`${index}-${step.slice(0, 24)}`}
                    className="relative pb-8 last:pb-0"
                  >
                    <span
                      aria-hidden
                      className="absolute -start-[calc(0.5rem+1px)] top-1.5 size-2 rounded-full bg-[var(--muted)]"
                    />
                    <p className="tech-label text-[10px] tabular-nums text-[var(--muted)]">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-1 text-[var(--foreground)]">{step}</p>
                  </li>
                ))}
              </ol>
            </Chapter>

            <Chapter id="architecture" title={t("architecture")}>
              <p className="max-w-[62ch] text-[var(--muted)]">
                {project.thinking[locale]}
              </p>
              <div className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)]">
                {project.stack.map((layer) => (
                  <div
                    key={layer.layer}
                    className="grid gap-2 py-4 md:grid-cols-[10rem_1fr]"
                  >
                    <p className="tech-label text-[10px] text-[var(--muted)]">
                      {layer.layer.toUpperCase()}
                    </p>
                    <p className="text-sm">{layer.items.join(" · ")}</p>
                  </div>
                ))}
              </div>
            </Chapter>

            <Chapter id="xray" title={t("xray")}>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="tech-label text-[10px] text-[var(--muted)]">
                  {t("surfaceAction")} / {t("behindInterface")}
                </p>
                <div
                  className="inline-flex rounded-[var(--radius-sm)] border border-[var(--line)] p-1"
                  role="group"
                  aria-label="X-Ray mode"
                >
                  <button
                    type="button"
                    onClick={() => setMode("experience")}
                    className={`rounded-[var(--radius-xs)] px-4 py-2 tech-label text-[10px] transition-colors duration-[600ms] ${
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
                    className={`rounded-[var(--radius-xs)] px-4 py-2 tech-label text-[10px] transition-colors duration-[600ms] ${
                      mode === "system"
                        ? "bg-[var(--signal)] text-white"
                        : "text-[var(--muted)]"
                    }`}
                  >
                    {t("systemMode")}
                  </button>
                </div>
              </div>

              {/* Shared plane: experience base + system overlay */}
              <div className="relative mt-8 min-h-[28rem] overflow-hidden bg-[var(--carbon)] text-white md:min-h-[32rem]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(193,18,31,0.12),transparent_55%)]" />

                <div className="relative z-10 flex h-full min-h-[28rem] flex-col justify-between p-6 md:min-h-[32rem] md:p-10">
                  <div>
                    <p className="tech-label text-[10px] text-white/45">
                      {t("surfaceAction")}
                    </p>
                    <p className="font-display mt-3 text-3xl md:text-5xl">
                      {project.behindInterface.surfaceAction[locale]}
                    </p>
                    <p className="mt-4 max-w-[40ch] text-white/60">
                      {project.summary[locale]}
                    </p>
                  </div>

                  <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {xrayModules.map((module) => (
                      <button
                        key={module.id}
                        type="button"
                        onClick={() => {
                          setModuleId(module.id);
                          setMode("system");
                        }}
                        className="border border-white/15 bg-white/[0.04] p-4 text-start transition-[border-color,background] duration-[600ms] hover:border-white/35"
                      >
                        <p className="tech-label text-[9px] text-white/40">
                          {module.id.toUpperCase()}
                        </p>
                        <p className="font-display mt-2 text-lg">
                          {module.name[locale]}
                        </p>
                        <p className="mt-2 line-clamp-2 text-sm text-white/55">
                          {module.description[locale]}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div
                  className={`pointer-events-none absolute inset-0 z-20 bg-[color-mix(in_oklab,var(--carbon)_92%,black)] transition-[opacity,transform] duration-[600ms] ease-[var(--ease-out-system)] motion-reduce:transition-none ${
                    mode === "system"
                      ? "opacity-100"
                      : "opacity-0 translate-y-2"
                  }`}
                  aria-hidden={mode !== "system"}
                >
                  <div
                    className={`flex h-full min-h-[28rem] flex-col justify-between p-6 md:min-h-[32rem] md:p-10 ${
                      mode === "system" ? "pointer-events-auto" : ""
                    }`}
                  >
                    <div>
                      <p className="tech-label text-[10px] text-[var(--volt)]">
                        SYSTEM OVERLAY
                      </p>
                      <p className="mt-4 max-w-[40ch] text-sm leading-relaxed text-white/50">
                        {project.behindInterface.punchline[locale]}
                      </p>
                    </div>

                    <div className="mt-auto space-y-5 pt-10">
                      {xrayWorkflows.length > 0 ? (
                        <div className="flex flex-wrap gap-x-5 gap-y-2">
                          {xrayWorkflows.map((wf) => {
                            const on = wf.id === workflowId;
                            return (
                              <button
                                key={wf.id}
                                type="button"
                                onClick={() => setWorkflowId(wf.id)}
                                className={`tech-label pb-1 text-[11px] tracking-[0.08em] transition-colors duration-[600ms] ${
                                  on
                                    ? "border-b border-[var(--volt)] text-white"
                                    : "border-b border-transparent text-white/45 hover:text-white/75"
                                }`}
                              >
                                {wf.name[locale].toUpperCase()}
                              </button>
                            );
                          })}
                        </div>
                      ) : null}

                      {xrayIntegrations.length > 0 ? (
                        <div className="flex flex-wrap gap-x-4 gap-y-2">
                          {xrayIntegrations.map((integ) => (
                            <span
                              key={integ.id}
                              className="tech-label text-[10px] tracking-[0.06em] text-white/40"
                            >
                              {integ.system.toUpperCase()}
                            </span>
                          ))}
                        </div>
                      ) : null}

                      {xrayModules.length > 0 ? (
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                          {xrayModules.map((module) => {
                            const on = module.id === moduleId;
                            return (
                              <button
                                key={`sys-${module.id}`}
                                type="button"
                                onClick={() => setModuleId(module.id)}
                                className={`border-s-2 ps-3 text-start transition-colors duration-[600ms] ${
                                  on
                                    ? "border-[var(--volt)]"
                                    : "border-[var(--volt)]/55"
                                }`}
                              >
                                <p
                                  className={`tech-label text-[11px] tracking-[0.08em] ${
                                    on ? "text-white" : "text-white/55"
                                  }`}
                                >
                                  {module.id.replace(/[-_]/g, " ").toUpperCase()}
                                </p>
                              </button>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </Chapter>

            <Chapter id="modules" title={t("modules")}>
              <div className="grid gap-8 lg:grid-cols-[minmax(12rem,16rem)_minmax(0,1fr)]">
                <ul className="space-y-0 border-s border-[var(--line)]">
                  {project.modules.map((module, index) => {
                    const on = module.id === activeModule?.id;
                    const roleHit = highlightedModules.has(module.id);
                    return (
                      <li key={module.id}>
                        <button
                          type="button"
                          onClick={() => setModuleId(module.id)}
                          className={`flex w-full items-center gap-3 border-s-2 py-3 ps-3 text-start transition-[color,border-color,background] duration-[var(--duration-ui)] ${
                            on
                              ? "border-[var(--signal)] text-[var(--foreground)]"
                              : "border-transparent text-[var(--muted)] hover:text-[var(--foreground)]"
                          } ${
                            roleHit && !on
                              ? "bg-[color-mix(in_oklab,var(--signal-soft)_35%,transparent)]"
                              : ""
                          }`}
                        >
                          <span className="tech-label text-[9px] tabular-nums">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="text-sm">{module.name[locale]}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>

                {activeModule ? (
                  <div className="min-w-0">
                    <p className="tech-label text-[10px] text-[var(--muted)]">
                      {activeModule.id.toUpperCase()}
                    </p>
                    <h3 className="font-display mt-2 text-4xl md:text-5xl">
                      {activeModule.name[locale]}
                    </h3>
                    <p className="mt-4 max-w-[56ch] text-lg text-[var(--muted)]">
                      {activeModule.description[locale]}
                    </p>
                    <dl className="mt-10 space-y-6 border-t border-[var(--line)] pt-8">
                      <div>
                        <dt className="tech-label text-[10px] text-[var(--signal)]">
                          {t("moduleSolves")}
                        </dt>
                        <dd className="mt-2 max-w-[56ch] text-[var(--muted)]">
                          {activeModule.solves[locale]}
                        </dd>
                      </div>
                      <div>
                        <dt className="tech-label text-[10px] text-[var(--signal)]">
                          {t("moduleHow")}
                        </dt>
                        <dd className="mt-2 max-w-[56ch] text-[var(--muted)]">
                          {activeModule.how[locale]}
                        </dd>
                      </div>
                      <div>
                        <dt className="tech-label text-[10px] text-[var(--signal)]">
                          {t("moduleConnects")}
                        </dt>
                        <dd className="mt-2 max-w-[56ch] text-[var(--muted)]">
                          {activeModule.connects[locale]}
                        </dd>
                      </div>
                    </dl>
                  </div>
                ) : null}
              </div>
            </Chapter>

            <Chapter id="roles" title={t("roles")}>
              <div className="grid gap-10 lg:grid-cols-[minmax(12rem,18rem)_minmax(0,1fr)]">
                <ul className="space-y-1">
                  {project.roles.map((role, index) => {
                    const on = roleId === role.id;
                    return (
                      <li key={role.id}>
                        <button
                          type="button"
                          onClick={() => setRoleId(role.id)}
                          className={`flex w-full items-center gap-3 border-s-2 py-2.5 ps-3 text-start transition-[color,border-color] duration-[var(--duration-ui)] ${
                            on
                              ? "border-[var(--signal)] text-[var(--foreground)]"
                              : "border-transparent text-[var(--muted)] hover:text-[var(--foreground)]"
                          }`}
                        >
                          <span className="tech-label text-[9px] tabular-nums">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="text-sm">{role.name[locale]}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>

                {activeRole ? (
                  <div>
                    <h3 className="font-display text-3xl md:text-4xl">
                      {activeRole.name[locale]}
                    </h3>
                    <div className="mt-8 space-y-6 border-t border-[var(--line)] pt-6">
                      <RoleFacet
                        label={t("roleNeeds")}
                        value={activeRole.needs[locale]}
                      />
                      <RoleFacet
                        label={t("roleSees")}
                        value={activeRole.sees[locale]}
                      />
                      <RoleFacet
                        label={t("roleCan")}
                        value={activeRole.can[locale]}
                      />
                    </div>

                    {(highlightedModules.size > 0 ||
                      highlightedWorkflows.size > 0) && (
                      <div className="mt-10 grid gap-8 sm:grid-cols-2">
                        {highlightedModules.size > 0 ? (
                          <div>
                            <p className="tech-label text-[10px] text-[var(--muted)]">
                              {t("modules")}
                            </p>
                            <ul className="mt-3 space-y-2">
                              {project.modules
                                .filter((m) => highlightedModules.has(m.id))
                                .map((m) => (
                                  <li key={m.id}>
                                    <button
                                      type="button"
                                      onClick={() => setModuleId(m.id)}
                                      className="border-s-2 border-[var(--signal)] ps-3 text-start text-sm hover:text-[var(--signal)]"
                                    >
                                      {m.name[locale]}
                                    </button>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        ) : null}
                        {highlightedWorkflows.size > 0 ? (
                          <div>
                            <p className="tech-label text-[10px] text-[var(--muted)]">
                              {t("workflows")}
                            </p>
                            <ul className="mt-3 space-y-2">
                              {project.workflows
                                .filter((w) => highlightedWorkflows.has(w.id))
                                .map((w) => (
                                  <li
                                    key={w.id}
                                    className="border-s-2 border-[var(--signal)] ps-3 text-sm"
                                  >
                                    {w.name[locale]}
                                  </li>
                                ))}
                            </ul>
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </Chapter>

            <Chapter id="workflows" title={t("workflows")}>
              <div className="space-y-12">
                {project.workflows.map((workflow) => {
                  const hit = highlightedWorkflows.has(workflow.id);
                  return (
                    <div
                      key={workflow.id}
                      className={
                        hit
                          ? "border-s-2 border-[var(--signal)] ps-5"
                          : "border-s-2 border-transparent ps-5"
                      }
                    >
                      <p className="tech-label text-[10px] text-[var(--signal)]">
                        {workflow.name[locale]}
                      </p>
                      <ol className="mt-5 flex flex-wrap items-center gap-2">
                        {workflow.steps.map((step, index) => (
                          <li
                            key={`${workflow.id}-${step.en}`}
                            className="flex items-center gap-2"
                          >
                            <span className="tech-label text-[9px] text-[var(--muted)]">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="text-sm">{step[locale]}</span>
                            {index < workflow.steps.length - 1 ? (
                              <span
                                className="ms-1 text-[var(--signal)]"
                                aria-hidden
                              >
                                →
                              </span>
                            ) : null}
                          </li>
                        ))}
                      </ol>
                    </div>
                  );
                })}
              </div>
            </Chapter>

            {project.integrations.length ? (
              <Chapter id="integrations" title={t("integrations")}>
                <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
                  {project.integrations.map((integration) => (
                    <div
                      key={integration.id}
                      className="grid gap-2 py-5 md:grid-cols-[10rem_8rem_1fr]"
                    >
                      <p className="tech-label text-[10px] text-[var(--muted)]">
                        {integration.category[locale]}
                      </p>
                      <p className="font-semibold">{integration.system}</p>
                      <p className="text-[var(--muted)]">
                        {integration.purpose[locale]}
                      </p>
                    </div>
                  ))}
                </div>
              </Chapter>
            ) : null}

            <Chapter id="technology" title={t("technology")}>
              <p className="mb-6 max-w-2xl text-sm text-[var(--muted)]">
                {t("technologyWhy")}
              </p>
              <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
                {techItems.map((item) => (
                  <div
                    key={item.why.en}
                    className="grid gap-2 py-5 md:grid-cols-[1fr_auto]"
                  >
                    <div>
                      <p className="font-medium">{item.why[locale]}</p>
                      {item.detail ? (
                        <p className="mt-2 text-sm text-[var(--muted)]">
                          {item.detail[locale]}
                        </p>
                      ) : null}
                    </div>
                    {item.tech?.length ? (
                      <p className="tech-label text-[10px] text-[var(--muted)] md:text-end">
                        {item.tech.join(" · ")}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            </Chapter>

            <Chapter id="mass" title={t("systemMass")}>
              <MassPanel mass={project.mass} />
            </Chapter>

            <Chapter id="outcomes" title={t("outcomes")}>
              <p className="max-w-2xl text-[var(--muted)]">
                {project.impact[locale]}
              </p>
              <div className="mt-8 space-y-4">
                {project.outcomes.map((outcome) => (
                  <p
                    key={outcome.from.en}
                    className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm"
                  >
                    <span className="text-[var(--muted)]">
                      {outcome.from[locale]}
                    </span>
                    <span className="text-[var(--signal)]" aria-hidden>
                      →
                    </span>
                    <span className="text-[var(--foreground)]">
                      {outcome.to[locale]}
                    </span>
                  </p>
                ))}
              </div>
            </Chapter>

            <Chapter id="scope" title={t("scope")}>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {project.arkanScope.map((item) => (
                  <span
                    key={item.en}
                    className="border-b border-[var(--line)] pb-1 tech-label text-[10px]"
                  >
                    {item[locale]}
                  </span>
                ))}
              </div>
              <Link href="/start" className="btn-primary mt-8">
                {t("buildSimilar")}
              </Link>
            </Chapter>

            {nextProject ? (
              <section
                id="chapter-next"
                className="scroll-mt-[calc(var(--header-offset,5rem)+6rem)] bg-[var(--ink)] px-6 py-10 text-white md:px-10"
              >
                <p className="tech-label text-[11px] text-[var(--volt-hot)]">
                  {t("next")}
                </p>
                <div className="mt-4 flex items-start gap-4">
                  <FingerprintMark project={nextProject} size={40} light />
                  <div>
                    <h2 className="font-display text-4xl">
                      {nextProject.title[locale]}
                    </h2>
                    <p className="mt-2 text-white/65">
                      {nextProject.descriptor[locale]}
                    </p>
                    <Link
                      href={`/work/${nextProject.slug}`}
                      className="btn-primary mt-8"
                    >
                      {t("enter")}
                    </Link>
                  </div>
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

function RoleFacet({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="tech-label text-[10px] text-[var(--signal)]">{label}</p>
      <p className="mt-2 max-w-[52ch] text-sm text-[var(--muted)]">{value}</p>
    </div>
  );
}

function Chapter({
  id,
  title,
  children,
}: {
  id: ChapterId;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={`chapter-${id}`}
      className="scroll-mt-[calc(var(--header-offset,5rem)+6rem)] border border-[var(--line)] bg-[var(--surface)] p-6 md:p-8"
    >
      <h2 className="font-display text-3xl md:text-4xl">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

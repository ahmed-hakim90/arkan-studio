"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  useCallback,
  useMemo,
  useState,
  type KeyboardEvent,
} from "react";
import {
  CAPABILITIES,
  SECTORS,
  STATUSES,
  SYSTEM_TYPES,
  massTotal,
} from "@/content/projects";
import type {
  CapabilityId,
  Project,
  ProjectStatus,
  Sector,
  SystemType,
} from "@/content/types";
import { FingerprintMark } from "@/components/system/FingerprintMark";
import { MassPanel } from "@/components/system/MassPanel";
import { Link } from "@/i18n/navigation";
import { nodeRadius } from "@/lib/scale";

type Props = {
  preview?: boolean;
  projects: Project[];
};

function massDots(project: Project) {
  const filled = Math.min(5, Math.max(1, project.scale.complexity));
  return Array.from({ length: 5 }, (_, i) => i < filled);
}

function readEnum<T extends string>(
  value: string | null,
  allowed: readonly T[],
): T | "all" {
  if (value && (allowed as readonly string[]).includes(value)) {
    return value as T;
  }
  return "all";
}

export function SystemsAtlas({ preview = false, projects }: Props) {
  const t = useTranslations("Atlas");
  const locale = useLocale() as "ar" | "en";
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sector = preview
    ? ("all" as const)
    : readEnum(searchParams.get("sector"), SECTORS);
  const systemType = preview
    ? ("all" as const)
    : readEnum(searchParams.get("type"), SYSTEM_TYPES);
  const status = preview
    ? ("all" as const)
    : readEnum(searchParams.get("status"), STATUSES);
  const capability = preview
    ? ("all" as const)
    : readEnum(searchParams.get("capability"), CAPABILITIES);

  const [focusedSlug, setFocusedSlug] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<"list" | "map">("list");

  const syncUrl = useCallback(
    (next: {
      sector: Sector | "all";
      type: SystemType | "all";
      status: ProjectStatus | "all";
      capability: CapabilityId | "all";
    }) => {
      if (preview) return;
      const params = new URLSearchParams();
      if (next.sector !== "all") params.set("sector", next.sector);
      if (next.type !== "all") params.set("type", next.type);
      if (next.status !== "all") params.set("status", next.status);
      if (next.capability !== "all") params.set("capability", next.capability);
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, preview, router],
  );

  const setFilter = (
    key: "sector" | "type" | "status" | "capability",
    value: string,
  ) => {
    const next = {
      sector: sector as Sector | "all",
      type: systemType as SystemType | "all",
      status: status as ProjectStatus | "all",
      capability: capability as CapabilityId | "all",
    };
    if (key === "sector") next.sector = value as Sector | "all";
    if (key === "type") next.type = value as SystemType | "all";
    if (key === "status") next.status = value as ProjectStatus | "all";
    if (key === "capability") next.capability = value as CapabilityId | "all";
    syncUrl(next);
  };

  const matches = useCallback(
    (project: Project) => {
      if (sector !== "all" && project.sector !== sector) return false;
      if (systemType !== "all" && project.systemType !== systemType) return false;
      if (status !== "all" && project.status !== status) return false;
      if (capability !== "all" && !project.capabilities.includes(capability))
        return false;
      return true;
    },
    [sector, systemType, status, capability],
  );

  const ranked = useMemo(() => {
    const list = [...projects].sort((a, b) => massTotal(b) - massTotal(a));
    return preview ? list.slice(0, 4) : list;
  }, [projects, preview]);

  const visible = useMemo(
    () => ranked.filter((p) => matches(p)),
    [ranked, matches],
  );

  const focused =
    visible.find((p) => p.slug === focusedSlug) ?? visible[0] ?? null;

  const reset = () => {
    syncUrl({
      sector: "all",
      type: "all",
      status: "all",
      capability: "all",
    });
  };

  const onNodeKeyDown = (event: KeyboardEvent, index: number) => {
    if (!visible.length) return;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      const next = visible[(index + 1) % visible.length];
      setFocusedSlug(next.slug);
      document.getElementById(`atlas-node-${next.slug}`)?.focus();
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      const next = visible[(index - 1 + visible.length) % visible.length];
      setFocusedSlug(next.slug);
      document.getElementById(`atlas-node-${next.slug}`)?.focus();
    }
  };

  return (
    <div>
      {!preview ? (
        <div className="mb-6 space-y-4 border-b border-[var(--line)] pb-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="tech-label text-[11px] text-[var(--muted)]">
              {t("showing")}{" "}
              <span className="text-[var(--foreground)]">
                {String(visible.length).padStart(2, "0")}
              </span>{" "}
              {t("of")}{" "}
              <span className="text-[var(--foreground)]">
                {String(ranked.length).padStart(2, "0")}
              </span>
            </p>
            <div className="flex gap-2 md:hidden">
              <button
                type="button"
                className="pill"
                data-active={mobileView === "list"}
                onClick={() => setMobileView("list")}
              >
                {t("listView")}
              </button>
              <button
                type="button"
                className="pill"
                data-active={mobileView === "map"}
                onClick={() => setMobileView("map")}
              >
                {t("mapView")}
              </button>
            </div>
          </div>
          <FilterRow
            label={t("filters.sector")}
            value={sector}
            onChange={(v) => setFilter("sector", v)}
            options={SECTORS.map((s) => ({
              value: s,
              label: t(`sectors.${s}`),
            }))}
            allLabel={t("filterAll")}
          />
          <FilterRow
            label={t("filters.type")}
            value={systemType}
            onChange={(v) => setFilter("type", v)}
            options={SYSTEM_TYPES.map((s) => ({
              value: s,
              label: t(`types.${s}`),
            }))}
            allLabel={t("filterAll")}
          />
          <FilterRow
            label={t("filters.status")}
            value={status}
            onChange={(v) => setFilter("status", v)}
            options={STATUSES.map((s) => ({
              value: s,
              label: t(`statuses.${s}`),
            }))}
            allLabel={t("filterAll")}
          />
          <FilterRow
            label={t("filters.capability")}
            value={capability}
            onChange={(v) => setFilter("capability", v)}
            options={CAPABILITIES.map((s) => ({
              value: s,
              label: t(`capabilities.${s}`),
            }))}
            allLabel={t("filterAll")}
          />
        </div>
      ) : null}

      {visible.length === 0 ? (
        <div className="border border-[var(--line)] bg-[var(--surface)] px-6 py-16 text-center">
          <p className="tech-label text-[11px] text-[var(--muted)]">
            {t("empty")}
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-4 text-sm font-semibold text-[var(--volt)] hover:underline"
          >
            {t("reset")} →
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {!preview ? (
            <div
              className={`relative h-[42vh] min-h-[260px] overflow-hidden border border-[var(--line)] bg-[var(--ink)] md:h-[460px] ${
                mobileView === "map" ? "block" : "hidden"
              } md:block`}
              role="img"
              aria-label={t("mapView")}
            >
              <div
                aria-hidden
                className="absolute inset-0 opacity-40"
                style={{
                  background:
                    "radial-gradient(700px 280px at 20% 30%, rgba(21,94,239,0.35), transparent 60%), radial-gradient(circle at 1px 1px, rgba(255,255,255,0.14) 1px, transparent 0)",
                  backgroundSize: "auto, 28px 28px",
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--volt),transparent)]"
              />
              <svg
                aria-hidden
                className="pointer-events-none absolute inset-0 h-full w-full"
              >
                {ranked.map((a, i) =>
                  ranked.slice(i + 1, i + 2).map((b) => (
                    <line
                      key={`${a.slug}-${b.slug}`}
                      x1={`${a.atlas.x}%`}
                      y1={`${a.atlas.y}%`}
                      x2={`${b.atlas.x}%`}
                      y2={`${b.atlas.y}%`}
                      stroke="var(--volt)"
                      strokeOpacity={matches(a) && matches(b) ? 0.55 : 0.12}
                      strokeWidth="1"
                    />
                  )),
                )}
              </svg>
              {ranked.map((project, index) => {
                const on = matches(project);
                const size = nodeRadius(project);
                const active = focused?.slug === project.slug;
                return (
                  <Link
                    key={project.slug}
                    id={`atlas-node-${project.slug}`}
                    href={`/work/${project.slug}`}
                    tabIndex={on ? 0 : -1}
                    onFocus={() => setFocusedSlug(project.slug)}
                    onMouseEnter={() => setFocusedSlug(project.slug)}
                    onKeyDown={(e) => onNodeKeyDown(e, index)}
                    className="absolute -translate-x-1/2 -translate-y-1/2 rounded-[var(--radius-xs)] border bg-[color-mix(in_oklab,var(--ink)_70%,white)] text-center transition duration-[240ms] focus-visible:outline-none"
                    style={{
                      left: `${project.atlas.x}%`,
                      top: `${project.atlas.y}%`,
                      width: size,
                      height: size,
                      opacity: on ? 1 : 0.14,
                      borderColor: active ? "var(--volt)" : "rgba(255,255,255,0.18)",
                      boxShadow: active
                        ? "0 0 0 1px var(--volt), 0 12px 28px rgba(21,94,239,0.35)"
                        : undefined,
                      pointerEvents: on ? "auto" : "none",
                    }}
                    title={project.title[locale]}
                  >
                    <span className="flex h-full flex-col items-center justify-center gap-0.5 px-1">
                      <FingerprintMark project={project} size={18} light />
                      <span className="tech-label text-[8px] leading-tight text-white/80">
                        {project.id}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          ) : null}

          {!preview && focused ? (
            <div className="grid gap-0 border border-[var(--line)] bg-[var(--surface)] lg:grid-cols-12">
              <div className="flex items-start gap-4 border-[var(--line)] p-5 lg:col-span-5 lg:border-e md:p-6">
                <FingerprintMark project={focused} size={48} />
                <div className="min-w-0 flex-1">
                  <p className="tech-label text-[10px] text-[var(--volt)]">
                    SYSTEM / {focused.id}
                  </p>
                  <p className="font-display mt-2 text-2xl md:text-3xl">
                    {focused.title[locale]}
                  </p>
                  <p className="mt-1 tech-label text-[10px] text-[var(--muted)]">
                    {t(`sectors.${focused.sector}`)} ·{" "}
                    {t(`statuses.${focused.status}`)}
                  </p>
                  <Link
                    href={`/work/${focused.slug}`}
                    className="btn-primary mt-5 inline-flex"
                  >
                    {t("openRoom")}
                  </Link>
                </div>
              </div>
              <div className="p-5 lg:col-span-7 md:p-6">
                <MassPanel mass={focused.mass} compact />
              </div>
            </div>
          ) : null}

          <ul
            className={`grid gap-3 sm:grid-cols-2 ${
              mobileView === "list" ? "grid" : "hidden"
            } md:grid`}
          >
            {visible.map((project, index) => {
              const active = focused?.slug === project.slug;
              return (
                <li key={project.slug}>
                  <Link
                    href={`/work/${project.slug}`}
                    onMouseEnter={() => setFocusedSlug(project.slug)}
                    onFocus={() => setFocusedSlug(project.slug)}
                    className={`group flex min-h-[96px] flex-col justify-between border p-4 transition md:p-5 ${
                      active
                        ? "border-[var(--volt)] bg-[var(--volt-soft)]"
                        : "border-[var(--line)] bg-[var(--surface)] hover:border-[var(--volt)]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <FingerprintMark project={project} size={28} />
                        <div>
                          <p className="tech-label text-[10px] text-[var(--muted)]">
                            {String(index + 1).padStart(2, "0")} · {project.id}
                          </p>
                          <h3 className="font-display mt-1 text-xl tracking-tight md:text-2xl">
                            {project.title[locale]}
                          </h3>
                        </div>
                      </div>
                      <span className="flex gap-1" aria-hidden>
                        {massDots(project).map((onDot, i) => (
                          <span
                            key={i}
                            className={`size-1.5 rounded-full ${
                              onDot
                                ? "bg-[var(--volt)]"
                                : "bg-[var(--line-strong)]"
                            }`}
                          />
                        ))}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <p className="tech-label text-[10px] text-[var(--muted)]">
                        {t(`sectors.${project.sector}`)} ·{" "}
                        {t(`statuses.${project.status}`)}
                      </p>
                      <span className="text-sm font-semibold text-[var(--volt)]">
                        {t("openRoom")} →
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

function FilterRow({
  label,
  value,
  onChange,
  options,
  allLabel,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  allLabel: string;
}) {
  return (
    <div>
      <p className="tech-label mb-2 text-[10px] text-[var(--muted)]">{label}</p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="filter-chip"
          data-active={value === "all"}
          onClick={() => onChange("all")}
        >
          {allLabel}
        </button>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className="filter-chip"
            data-active={value === option.value}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

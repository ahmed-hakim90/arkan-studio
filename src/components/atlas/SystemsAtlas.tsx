"use client";

import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
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
import { Link } from "@/i18n/navigation";

type Props = {
  preview?: boolean;
  projects: Project[];
};

export function SystemsAtlas({ preview = false, projects }: Props) {
  const t = useTranslations("Atlas");
  const locale = useLocale() as "ar" | "en";
  const [sector, setSector] = useState<Sector | "all">("all");
  const [systemType, setSystemType] = useState<SystemType | "all">("all");
  const [status, setStatus] = useState<ProjectStatus | "all">("all");
  const [capability, setCapability] = useState<CapabilityId | "all">("all");

  const visible = useMemo(() => {
    let list = [...projects];
    if (sector !== "all") list = list.filter((p) => p.sector === sector);
    if (systemType !== "all")
      list = list.filter((p) => p.systemType === systemType);
    if (status !== "all") list = list.filter((p) => p.status === status);
    if (capability !== "all")
      list = list.filter((p) => p.capabilities.includes(capability));
    list.sort((a, b) => massTotal(b) - massTotal(a));
    return preview ? list.slice(0, 4) : list;
  }, [projects, sector, systemType, status, capability, preview]);

  const reset = () => {
    setSector("all");
    setSystemType("all");
    setStatus("all");
    setCapability("all");
  };

  return (
    <div>
      {!preview ? (
        <div className="mb-8 space-y-4">
          <FilterRow
            label={t("filters.sector")}
            value={sector}
            onChange={(v) => setSector(v as Sector | "all")}
            options={SECTORS.map((s) => ({
              value: s,
              label: t(`sectors.${s}`),
            }))}
            allLabel={t("filterAll")}
          />
          <FilterRow
            label={t("filters.type")}
            value={systemType}
            onChange={(v) => setSystemType(v as SystemType | "all")}
            options={SYSTEM_TYPES.map((s) => ({
              value: s,
              label: t(`types.${s}`),
            }))}
            allLabel={t("filterAll")}
          />
          <FilterRow
            label={t("filters.status")}
            value={status}
            onChange={(v) => setStatus(v as ProjectStatus | "all")}
            options={STATUSES.map((s) => ({
              value: s,
              label: t(`statuses.${s}`),
            }))}
            allLabel={t("filterAll")}
          />
          <FilterRow
            label={t("filters.capability")}
            value={capability}
            onChange={(v) => setCapability(v as CapabilityId | "all")}
            options={CAPABILITIES.map((s) => ({
              value: s,
              label: t(`capabilities.${s}`),
            }))}
            allLabel={t("filterAll")}
          />
        </div>
      ) : null}

      {visible.length === 0 ? (
        <div className="border border-[var(--line)] px-6 py-16 text-center">
          <p className="tech-label text-[11px] text-[var(--muted)]">
            {t("empty")}
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-4 text-sm font-semibold text-[var(--signal)] hover:underline"
          >
            {t("reset")} →
          </button>
        </div>
      ) : (
        <div className="relative">
          {!preview ? (
            <div className="relative mb-10 hidden h-[420px] border border-[var(--line)] bg-[var(--surface)] md:block">
              <div
                aria-hidden
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                }}
              />
              {visible.map((project) => {
                const size = 48 + Math.min(massTotal(project), 40);
                return (
                  <Link
                    key={project.slug}
                    href={`/work/${project.slug}`}
                    className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--line)] bg-[var(--background)] text-center shadow-sm transition hover:border-[var(--signal)] hover:shadow-[var(--focus-ring)]"
                    style={{
                      left: `${project.atlas.x}%`,
                      top: `${project.atlas.y}%`,
                      width: size,
                      height: size,
                    }}
                    title={project.title[locale]}
                  >
                    <span className="flex h-full items-center justify-center px-1 tech-label text-[9px] leading-tight text-[var(--navy)]">
                      {project.id}
                    </span>
                  </Link>
                );
              })}
            </div>
          ) : null}

          <ul className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {visible.map((project) => (
              <li key={project.slug}>
                <Link
                  href={`/work/${project.slug}`}
                  className="grid gap-3 py-5 transition hover:bg-[color-mix(in_oklab,var(--signal-soft)_28%,transparent)] md:grid-cols-[7rem_1fr_auto] md:items-center"
                >
                  <span className="tech-label text-[10px] text-[var(--muted)]">
                    {project.id}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-3">
                      <h3 className="font-display text-2xl">
                        {project.title[locale]}
                      </h3>
                      <span className="pill" data-active="false">
                        {t(`statuses.${project.status}`)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-[var(--muted)]">
                      {project.descriptor[locale]}
                    </p>
                    <p className="mt-2 tech-label text-[10px] text-[var(--muted)]">
                      {t(`sectors.${project.sector}`)} ·{" "}
                      {t(`types.${project.systemType}`)}
                      {project.mass.modules
                        ? ` · ${project.mass.modules} ${t("modules")}`
                        : ""}
                      {project.mass.roles
                        ? ` · ${project.mass.roles} ${t("roles")}`
                        : ""}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-[var(--signal)]">
                    {t("openRoom")} →
                  </span>
                </Link>
              </li>
            ))}
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
          className="pill"
          data-active={value === "all"}
          onClick={() => onChange("all")}
        >
          {allLabel}
        </button>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className="pill"
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

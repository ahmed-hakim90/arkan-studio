"use client";

import { useTranslations } from "next-intl";
import type { SystemMass } from "@/content/types";

type Props = {
  mass: SystemMass;
  compact?: boolean;
};

const rows: { key: keyof SystemMass; label: string }[] = [
  { key: "modules", label: "modules" },
  { key: "roles", label: "roles" },
  { key: "workflows", label: "workflows" },
  { key: "interfaces", label: "interfaces" },
  { key: "integrations", label: "integrations" },
  { key: "automations", label: "automations" },
  { key: "locations", label: "locations" },
];

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export function MassPanel({ mass, compact = false }: Props) {
  const t = useTranslations("Atlas");

  const entries = rows
    .map(({ key, label }) => {
      const value = mass[key];
      if (value == null) return null;
      return { key, label, value };
    })
    .filter(Boolean) as { key: keyof SystemMass; label: string; value: number }[];

  if (compact) {
    return (
      <div className="px-1 py-1">
        <p className="tech-label text-[10px] text-[var(--signal)]">
          {t("systemMass")}
        </p>
        <dl className="mt-2 space-y-1.5">
          {entries.map(({ key, label, value }) => (
            <div
              key={key}
              className="flex items-baseline justify-between gap-4 border-b border-[var(--line)] py-1.5 text-sm last:border-b-0"
            >
              <dt className="tech-label text-[10px] text-[var(--muted)]">
                {t(label)}
              </dt>
              <dd className="font-semibold tabular-nums">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    );
  }

  return (
    <div>
      <p className="tech-label text-[11px] text-[var(--signal)]">
        {t("systemMass")}
      </p>
      <p className="font-display mt-6 text-3xl leading-[1.25] tracking-[-0.03em] text-[var(--navy)] md:text-5xl md:leading-[1.2]">
        {entries.map(({ label, value }, i) => (
          <span key={label}>
            <span className="tabular-nums">{pad2(value)}</span>{" "}
            <span className="tech-label text-[0.45em] tracking-[0.08em] text-[var(--muted)] md:text-[0.35em]">
              {t(label).toUpperCase()}
            </span>
            {i < entries.length - 1 ? (
              <span className="mx-2 text-[var(--muted)]/40 md:mx-3" aria-hidden>
                ·
              </span>
            ) : null}
          </span>
        ))}
      </p>
    </div>
  );
}

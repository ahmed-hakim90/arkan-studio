import { getTranslations } from "next-intl/server";
import type { SystemMass } from "@/content/types";

type Props = {
  mass: SystemMass;
};

function Row({ label, value }: { label: string; value?: number }) {
  if (value == null) return null;
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-[var(--line)] py-3 text-sm">
      <span className="tech-label text-[10px] text-[var(--muted)]">{label}</span>
      <span className="font-semibold tabular-nums text-[var(--foreground)]">
        {value}
      </span>
    </div>
  );
}

export async function ScaleMeter({ mass }: Props) {
  const t = await getTranslations("Atlas");

  return (
    <div className="border border-[var(--line)] bg-[var(--surface)] px-5 py-4">
      <p className="tech-label text-[10px] text-[var(--signal)]">
        {t("systemMass")}
      </p>
      <div className="mt-2">
        <Row label={t("modules")} value={mass.modules} />
        <Row label={t("roles")} value={mass.roles} />
        <Row label={t("workflows")} value={mass.workflows} />
        <Row label={t("interfaces")} value={mass.interfaces} />
        <Row label={t("integrations")} value={mass.integrations} />
        <Row label={t("automations")} value={mass.automations} />
      </div>
    </div>
  );
}

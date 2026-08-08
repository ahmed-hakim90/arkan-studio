import { getTranslations } from "next-intl/server";

const KEYS = [
  "productSystems",
  "operations",
  "commerce",
  "platforms",
  "ai",
  "experiences",
] as const;

export async function SectorStrip() {
  const t = await getTranslations("Home.sectorStrip");

  return (
    <section
      className="border-y border-white/10 bg-[var(--gunmetal)] text-white"
      aria-label={t("aria")}
    >
      <div className="section-pad canvas">
        <ul className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-4 md:py-5">
          {KEYS.map((key, i) => (
            <li key={key} className="flex items-center gap-6">
              <span className="tech-label text-[10px] tracking-[0.14em] text-white/75 md:text-[11px]">
                {t(`items.${key}`)}
              </span>
              {i < KEYS.length - 1 ? (
                <span
                  aria-hidden
                  className="hidden h-3 w-px bg-white/20 sm:block"
                />
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

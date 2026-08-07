"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";

type Props = {
  light?: boolean;
};

export function LocaleSwitcher({ light = false }: Props) {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();
  const nextLocale: AppLocale = locale === "ar" ? "en" : "ar";

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: nextLocale })}
      className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition ${
        light
          ? "border border-white/25 text-white/80 hover:border-white hover:text-white"
          : "border border-[var(--line)] text-[var(--muted)] hover:border-[var(--signal)] hover:text-[var(--fg)]"
      }`}
      aria-label={nextLocale === "ar" ? "Switch to Arabic" : "Switch to English"}
    >
      {nextLocale === "ar" ? "ع" : "EN"}
    </button>
  );
}

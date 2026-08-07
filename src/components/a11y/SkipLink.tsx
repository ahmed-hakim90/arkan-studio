"use client";

import { useTranslations } from "next-intl";

export function SkipLink() {
  const t = useTranslations("A11y");

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[110] focus:rounded-sm focus:bg-[var(--bronze)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[var(--ink)]"
    >
      {t("skipToContent")}
    </a>
  );
}

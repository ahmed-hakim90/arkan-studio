"use client";

import { useTranslations } from "next-intl";
import { openCookiePreferences } from "./CookieConsent";

export function CookieSettingsButton() {
  const t = useTranslations("Cookies");

  return (
    <button
      type="button"
      onClick={openCookiePreferences}
      className="font-semibold text-[var(--signal)] underline-offset-2 hover:underline"
    >
      {t("manage")}
    </button>
  );
}

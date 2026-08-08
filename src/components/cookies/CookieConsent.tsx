"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useId, useState } from "react";
import { Link } from "@/i18n/navigation";
import {
  type CookieConsent as Consent,
  defaultConsent,
  readConsentFromDocument,
  writeConsentCookie,
} from "@/lib/cookies";

type Props = {
  onConsentChange?: (consent: Consent) => void;
};

export function CookieConsentBanner({ onConsentChange }: Props) {
  const t = useTranslations("Cookies");
  const panelId = useId();
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const existing = readConsentFromDocument();
    if (existing) {
      setPreferences(existing.preferences);
      setAnalytics(existing.analytics);
      onConsentChange?.(existing);
      setOpen(false);
    } else {
      setOpen(true);
    }
    setReady(true);

    const openPrefs = () => {
      const current = readConsentFromDocument() ?? defaultConsent;
      setPreferences(current.preferences);
      setAnalytics(current.analytics);
      setShowDetails(true);
      setOpen(true);
    };
    window.addEventListener("arkan:open-cookie-preferences", openPrefs);
    return () =>
      window.removeEventListener("arkan:open-cookie-preferences", openPrefs);
  }, [onConsentChange]);

  const persist = useCallback(
    (next: Consent) => {
      writeConsentCookie(next);
      onConsentChange?.(next);
      setOpen(false);
      setShowDetails(false);
    },
    [onConsentChange],
  );

  const acceptAll = () => {
    persist({
      version: 1,
      essential: true,
      preferences: true,
      analytics: true,
      updatedAt: new Date().toISOString(),
    });
  };

  const rejectNonEssential = () => {
    persist({
      version: 1,
      essential: true,
      preferences: false,
      analytics: false,
      updatedAt: new Date().toISOString(),
    });
  };

  const saveCustom = () => {
    persist({
      version: 1,
      essential: true,
      preferences,
      analytics,
      updatedAt: new Date().toISOString(),
    });
  };

  if (!ready || !open) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[90] section-pad pb-[max(1rem,env(safe-area-inset-bottom))] pt-3"
      role="dialog"
      aria-modal="false"
      aria-labelledby={panelId}
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4 shadow-[0_-16px_50px_rgba(11,31,58,0.12)] md:p-5">
        <p
          id={panelId}
          className="font-display text-lg font-semibold text-[var(--fg)]"
        >
          {t("title")}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
          {t("body")}{" "}
          <Link
            href="/cookies"
            className="text-[var(--signal)] underline-offset-2 hover:underline"
          >
            {t("privacyLink")}
          </Link>
        </p>

        {showDetails ? (
          <fieldset className="mt-4 space-y-3 border-t border-[var(--line)] pt-4">
            <legend className="sr-only">{t("customize")}</legend>
            <label className="flex items-start gap-3 text-sm text-[var(--fg)]">
              <input
                type="checkbox"
                checked
                disabled
                className="mt-1 accent-[var(--signal)]"
              />
              <span>
                <span className="font-medium">{t("essential")}</span>
                <span className="mt-0.5 block text-[var(--muted)]">
                  {t("essentialDesc")}
                </span>
              </span>
            </label>
            <label className="flex items-start gap-3 text-sm text-[var(--fg)]">
              <input
                type="checkbox"
                checked={preferences}
                onChange={(e) => setPreferences(e.target.checked)}
                className="mt-1 accent-[var(--signal)]"
              />
              <span>
                <span className="font-medium">{t("preferences")}</span>
                <span className="mt-0.5 block text-[var(--muted)]">
                  {t("preferencesDesc")}
                </span>
              </span>
            </label>
            <label className="flex items-start gap-3 text-sm text-[var(--fg)]">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="mt-1 accent-[var(--signal)]"
              />
              <span>
                <span className="font-medium">{t("analytics")}</span>
                <span className="mt-0.5 block text-[var(--muted)]">
                  {t("analyticsDesc")}
                </span>
              </span>
            </label>
          </fieldset>
        ) : null}

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={acceptAll}
            className="inline-flex min-h-11 items-center rounded-full bg-[var(--signal)] px-4 text-sm font-semibold text-white transition hover:bg-[var(--signal-hot)]"
          >
            {t("acceptAll")}
          </button>
          <button
            type="button"
            onClick={rejectNonEssential}
            className="inline-flex min-h-11 items-center rounded-full border border-[var(--line)] px-4 text-sm text-[var(--fg)] transition hover:border-[var(--signal)]"
          >
            {t("reject")}
          </button>
          {showDetails ? (
            <button
              type="button"
              onClick={saveCustom}
              className="inline-flex min-h-11 items-center rounded-full border border-[var(--signal)] px-4 text-sm text-[var(--signal)] transition"
            >
              {t("save")}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowDetails(true)}
              className="inline-flex min-h-11 items-center rounded-full px-4 text-sm text-[var(--muted)] underline-offset-2 hover:text-[var(--fg)] hover:underline"
            >
              {t("customize")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function openCookiePreferences() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("arkan:open-cookie-preferences"));
  }
}

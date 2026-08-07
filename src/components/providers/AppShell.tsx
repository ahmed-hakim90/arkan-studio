"use client";

import { useCallback, useState } from "react";
import { CookieConsentBanner } from "@/components/cookies/CookieConsent";
import { SplashScreen } from "@/components/loading/SplashScreen";
import type { CookieConsent } from "@/lib/cookies";

type Props = {
  children: React.ReactNode;
};

/**
 * Client shell for splash + cookie consent.
 * Analytics scripts should only mount when consent.analytics === true.
 */
export function AppShell({ children }: Props) {
  const [consent, setConsent] = useState<CookieConsent | null>(null);

  const onConsentChange = useCallback((next: CookieConsent) => {
    setConsent(next);
    // Hook for future analytics — never load trackers without explicit consent.
    if (next.analytics) {
      // e.g. loadAnalytics()
    }
  }, []);

  return (
    <>
      <SplashScreen />
      {children}
      <CookieConsentBanner onConsentChange={onConsentChange} />
      {/* Reserved: consent-gated analytics mount point */}
      {consent?.analytics ? null : null}
    </>
  );
}

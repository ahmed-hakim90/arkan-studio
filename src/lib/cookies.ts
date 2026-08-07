export const COOKIE_CONSENT_KEY = "arkan_cookie_consent";
export const COOKIE_CONSENT_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export type CookieCategory = "essential" | "preferences" | "analytics";

export type CookieConsent = {
  version: 1;
  essential: true;
  preferences: boolean;
  analytics: boolean;
  updatedAt: string;
};

export const defaultConsent: CookieConsent = {
  version: 1,
  essential: true,
  preferences: false,
  analytics: false,
  updatedAt: "",
};

export function parseConsent(raw: string | null | undefined): CookieConsent | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as Partial<CookieConsent>;
    if (data.version !== 1) return null;
    return {
      version: 1,
      essential: true,
      preferences: Boolean(data.preferences),
      analytics: Boolean(data.analytics),
      updatedAt: typeof data.updatedAt === "string" ? data.updatedAt : "",
    };
  } catch {
    return null;
  }
}

export function serializeConsent(consent: CookieConsent): string {
  return JSON.stringify(consent);
}

export function readConsentFromDocument(): CookieConsent | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_CONSENT_KEY}=`));
  if (!match) return null;
  return parseConsent(decodeURIComponent(match.split("=").slice(1).join("=")));
}

export function writeConsentCookie(consent: CookieConsent): void {
  if (typeof document === "undefined") return;
  const value = encodeURIComponent(serializeConsent(consent));
  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:"
      ? "; Secure"
      : "";
  document.cookie = `${COOKIE_CONSENT_KEY}=${value}; Path=/; Max-Age=${COOKIE_CONSENT_MAX_AGE}; SameSite=Lax${secure}`;
}

export function clearConsentCookie(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${COOKIE_CONSENT_KEY}=; Path=/; Max-Age=0; SameSite=Lax`;
}

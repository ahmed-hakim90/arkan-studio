import { siteConfig } from "@/lib/site";

function parseOrigin(value: string | null): string | null {
  if (!value) return null;
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

/** Allow contact API only from same site (or localhost in development). */
export function isAllowedContactOrigin(request: Request): boolean {
  const origin = parseOrigin(request.headers.get("origin"));
  const referer = parseOrigin(request.headers.get("referer"));
  const siteOrigin = parseOrigin(siteConfig.url);

  const allowed = new Set<string>();
  if (siteOrigin) allowed.add(siteOrigin);
  if (process.env.NODE_ENV !== "production") {
    allowed.add("http://localhost:3000");
    allowed.add("http://127.0.0.1:3000");
  }

  // Same-origin fetch may omit Origin; require Referer from allowlist instead.
  if (!origin && !referer) {
    return process.env.NODE_ENV !== "production";
  }

  if (origin && allowed.has(origin)) return true;
  if (referer && allowed.has(referer)) return true;
  return false;
}

/** Block private / metadata hosts for webhook SSRF hygiene. */
export function isSafeWebhookUrl(raw: string): boolean {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return false;
  }

  if (url.protocol !== "https:" && process.env.NODE_ENV === "production") {
    return false;
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return false;

  const host = url.hostname.toLowerCase();
  if (
    host === "localhost" ||
    host.endsWith(".local") ||
    host === "0.0.0.0" ||
    host === "::1" ||
    host === "metadata.google.internal"
  ) {
    return false;
  }

  if (
    /^(10\.|127\.|169\.254\.|192\.168\.|172\.(1[6-9]|2\d|3[0-1])\.)/.test(host)
  ) {
    return false;
  }

  return true;
}

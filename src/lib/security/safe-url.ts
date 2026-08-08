const ALLOWED_PROTOCOLS = new Set(["https:"]);

/** Rejects javascript:, data:, and non-https public profile URLs. */
export function sanitizePublicUrl(raw: unknown): string | undefined {
  if (typeof raw !== "string") return undefined;
  const value = raw.trim();
  if (!value) return undefined;

  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    return undefined;
  }

  if (!ALLOWED_PROTOCOLS.has(parsed.protocol)) return undefined;
  if (parsed.username || parsed.password) return undefined;

  const host = parsed.hostname.toLowerCase();
  if (
    host === "localhost" ||
    host.endsWith(".local") ||
    host === "0.0.0.0" ||
    host === "::1" ||
    /^\d+\.\d+\.\d+\.\d+$/.test(host)
  ) {
    return undefined;
  }

  return parsed.toString();
}

export function sanitizeTeamLinks(input: {
  linkedin?: unknown;
  github?: unknown;
  x?: unknown;
  website?: unknown;
}) {
  return {
    linkedin: sanitizePublicUrl(input.linkedin),
    github: sanitizePublicUrl(input.github),
    x: sanitizePublicUrl(input.x),
    website: sanitizePublicUrl(input.website),
  };
}

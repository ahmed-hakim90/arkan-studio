import { unstable_noStore as noStore } from "next/cache";
import { siteConfig as fileSiteConfig, type LocaleKey } from "@/lib/site";
import { hasSupabaseConfig } from "@/lib/supabase/env";
import { createAnonClient } from "@/lib/supabase/server";
import type { SiteSettingsRow } from "./types";

export type SiteConfig = {
  name: { ar: string; en: string };
  legalName: string;
  tagline: { ar: string; en: string };
  description: { ar: string; en: string };
  url: string;
  email: string;
  phone: string;
  whatsapp: string;
  location: { ar: string; en: string };
  social: {
    github: string;
    linkedin: string;
    x: string;
  };
};

export type { LocaleKey };

function fromFile(): SiteConfig {
  return {
    name: { ...fileSiteConfig.name },
    legalName: fileSiteConfig.legalName,
    tagline: { ...fileSiteConfig.tagline },
    description: { ...fileSiteConfig.description },
    url: fileSiteConfig.url,
    email: fileSiteConfig.email,
    phone: fileSiteConfig.phone,
    whatsapp: fileSiteConfig.whatsapp,
    location: { ...fileSiteConfig.location },
    social: { ...fileSiteConfig.social },
  };
}

export async function getSiteConfig(): Promise<SiteConfig> {
  noStore();
  const fallback = fromFile();
  if (!hasSupabaseConfig()) return fallback;

  try {
    const supabase = createAnonClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle();

    if (error || !data) return fallback;
    const row = data as SiteSettingsRow;
    return {
      name: row.name ?? fallback.name,
      legalName: row.legal_name || fallback.legalName,
      tagline: row.tagline ?? fallback.tagline,
      description: row.description ?? fallback.description,
      url: process.env.NEXT_PUBLIC_SITE_URL ?? fallback.url,
      email: row.email || fallback.email,
      phone: row.phone || fallback.phone,
      whatsapp: row.whatsapp || fallback.whatsapp,
      location: row.location ?? fallback.location,
      social: {
        github: row.social?.github ?? fallback.social.github,
        linkedin: row.social?.linkedin ?? fallback.social.linkedin,
        x: row.social?.x ?? fallback.social.x,
      },
    };
  } catch {
    return fallback;
  }
}

/** Sync fallback for modules that cannot be async (security origin, etc.). */
export const siteConfig = fileSiteConfig;

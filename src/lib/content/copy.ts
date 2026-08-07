import { unstable_noStore as noStore } from "next/cache";
import { hasSupabaseConfig } from "@/lib/supabase/env";
import { createAnonClient } from "@/lib/supabase/server";

type Nested = Record<string, unknown>;

function setPath(target: Nested, path: string, value: string) {
  const parts = path.split(".");
  let cursor: Nested = target;
  for (let i = 0; i < parts.length - 1; i += 1) {
    const part = parts[i]!;
    const next = cursor[part];
    if (!next || typeof next !== "object" || Array.isArray(next)) {
      cursor[part] = {};
    }
    cursor = cursor[part] as Nested;
  }
  cursor[parts[parts.length - 1]!] = value;
}

export async function getCopyOverrides(
  locale: "ar" | "en",
): Promise<Nested | null> {
  noStore();
  if (!hasSupabaseConfig()) return null;

  try {
    const supabase = createAnonClient();
    const { data, error } = await supabase
      .from("site_copy")
      .select("namespace, path, value_ar, value_en");

    if (error || !data?.length) return null;

    const root: Nested = {};
    for (const row of data) {
      const value = locale === "ar" ? row.value_ar : row.value_en;
      if (typeof value !== "string" || !value) continue;
      if (!root[row.namespace] || typeof root[row.namespace] !== "object") {
        root[row.namespace] = {};
      }
      setPath(root[row.namespace] as Nested, row.path, value);
    }
    return root;
  } catch {
    return null;
  }
}

function deepMerge(base: Nested, override: Nested): Nested {
  const out: Nested = { ...base };
  for (const [key, value] of Object.entries(override)) {
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      base[key] &&
      typeof base[key] === "object" &&
      !Array.isArray(base[key])
    ) {
      out[key] = deepMerge(base[key] as Nested, value as Nested);
    } else {
      out[key] = value;
    }
  }
  return out;
}

export async function mergeMessages(
  locale: "ar" | "en",
  base: Nested,
): Promise<Nested> {
  const overrides = await getCopyOverrides(locale);
  if (!overrides) return base;
  return deepMerge(base, overrides);
}

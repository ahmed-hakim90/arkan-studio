import { mergeMessages } from "@/lib/content/copy";
import type { LocaleKey } from "@/lib/site";

type MessageTree = Record<string, unknown>;

async function loadMergedMessages(locale: LocaleKey): Promise<MessageTree> {
  const base = (
    await import(`../../messages/${locale}.json`)
  ).default as MessageTree;
  return mergeMessages(locale, base);
}

function readString(tree: MessageTree | undefined, key: string): string | null {
  if (!tree || typeof tree !== "object") return null;
  const value = tree[key];
  return typeof value === "string" && value.trim() ? value : null;
}

/**
 * Reliable SEO copy loader for generateMetadata.
 * Bypasses next-intl translator cache quirks during Turbopack HMR.
 */
export async function getSeoCopy(
  locale: string,
  namespace: string,
  keys?: { title?: string[]; description?: string[] },
): Promise<{ title: string; description: string }> {
  const loc: LocaleKey = locale === "en" ? "en" : "ar";
  const merged = await loadMergedMessages(loc);
  const ns = merged[namespace] as MessageTree | undefined;

  const titleKeys = keys?.title ?? ["seoTitle", "title"];
  const descriptionKeys = keys?.description ?? [
    "seoDescription",
    "description",
    "subtitle",
  ];

  let title: string | null = null;
  for (const key of titleKeys) {
    title = readString(ns, key);
    if (title) break;
  }

  let description = "";
  for (const key of descriptionKeys) {
    const value = readString(ns, key);
    if (value) {
      description = value;
      break;
    }
  }

  return {
    title: title || (loc === "ar" ? "أركان" : "Arkan"),
    description,
  };
}

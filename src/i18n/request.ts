import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { mergeMessages } from "@/lib/content/copy";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const base = (await import(`../../messages/${locale}.json`)).default as Record<
    string,
    unknown
  >;
  const messages = await mergeMessages(locale, base);

  return {
    locale,
    messages,
  };
});

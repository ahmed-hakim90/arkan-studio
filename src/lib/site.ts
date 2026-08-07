export const siteConfig = {
  name: {
    ar: "أركان",
    en: "Arkan",
  },
  legalName: "Arkan Studio",
  tagline: {
    ar: "نبني أنظمة تشغّل شغلك",
    en: "We build systems that run the business",
  },
  description: {
    ar: "استوديو أنظمة رقمية يبني منصات ERP وPOS وتشغيل وتجارة إلكترونية بفريق متكامل.",
    en: "A digital systems studio building ERP, POS, operations, and commerce platforms with a full team.",
  },
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://arkan.studio",
  email: "ahmedabdulhakim90@gmail.com",
  phone: "+201069005019",
  whatsapp: "https://wa.me/201069005019",
  location: {
    ar: "القاهرة، مصر",
    en: "Cairo, Egypt",
  },
  social: {
    github: "https://github.com/ahmed-hakim90",
    linkedin: "https://www.linkedin.com/in/ahmed-abdulhakim-sayed-471752174/",
    x: "https://x.com/ahmed_hakim900",
  },
} as const;

export type LocaleKey = "ar" | "en";

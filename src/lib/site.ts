export const siteConfig = {
  name: {
    ar: "أركان",
    en: "Arkan",
  },
  legalName: "Arkan Studio",
  tagline: {
    ar: "من الفكرة إلى نظام يعمل",
    en: "From idea to a working system",
  },
  description: {
    ar: "أركان استوديو لبناء الأنظمة والمنتجات الرقمية — نحوّل الأفكار والعمليات المعقدة إلى أنظمة واضحة ومترابطة وقابلة للنمو.",
    en: "Arkan is a studio for building digital systems and products — turning complex ideas and operations into clear, connected, scalable systems.",
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

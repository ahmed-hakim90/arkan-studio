import type { PillarId, TeamMember } from "./types";

export const team: TeamMember[] = [
  {
    id: "ahmed-abdulhakim",
    name: { ar: "أحمد عبد الحكيم", en: "Ahmed Abdulhakim" },
    role: {
      ar: "المؤسس · قائد الأنظمة",
      en: "Founder · Systems Lead",
    },
    pillar: "product",
    bio: {
      ar: "يبني أركان حول فهم العمل قبل التقنية — من اكتشاف العملية إلى تصميم النظام وتشغيله.",
      en: "Builds Arkan around understanding the work before the tech — from process discovery to system design and operations.",
    },
    focus: {
      ar: "هيكل المنتج، نطاق النظام، القرارات المعمارية، ومسار التسليم من الفكرة إلى التشغيل.",
      en: "Product structure, system scope, architectural calls, and the path from idea to operating delivery.",
    },
    links: {
      linkedin:
        "https://www.linkedin.com/in/ahmed-abdulhakim-sayed-471752174/",
      github: "https://github.com/ahmed-hakim90",
      x: "https://x.com/ahmed_hakim900",
    },
  },
];

export const pillarOrder: PillarId[] = [
  "product",
  "experience",
  "frontend",
  "backend",
  "operations",
  "growth",
];

export function pillarsForSector(sector: string): PillarId[] {
  switch (sector) {
    case "erp":
    case "services":
      return ["product", "experience", "frontend", "backend", "operations", "growth"];
    case "commerce":
      return ["product", "experience", "frontend", "backend", "growth"];
    case "ops":
    case "operations":
    case "mobility":
      return ["product", "experience", "frontend", "backend", "operations"];
    case "ai":
    case "ventures":
      return ["product", "backend", "frontend", "operations"];
    default:
      return ["product", "experience", "frontend", "backend"];
  }
}

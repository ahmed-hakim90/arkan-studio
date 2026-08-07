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
  },
  {
    id: "ahmed-shoaib",
    name: { ar: "أحمد شعيب", en: "Ahmed Shoaib" },
    role: {
      ar: "هندسة الواجهات",
      en: "Frontend Engineering",
    },
    pillar: "frontend",
  },
  {
    id: "kaila-mohamed",
    name: { ar: "كيلا محمد", en: "Kaila Mohamed" },
    role: {
      ar: "تجربة المنتج",
      en: "Product Experience",
    },
    pillar: "experience",
  },
  {
    id: "mohamed-adel",
    name: { ar: "محمد عادل", en: "Mohamed Adel" },
    role: {
      ar: "هندسة الخلفية والتشغيل",
      en: "Backend & Operations",
    },
    pillar: "backend",
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

import type { CapabilityId, Project } from "./types";
import { cairoQuarantine } from "./systems/cairo-quarantine";
import { hakimoProduction } from "./systems/hakimo-production";
import { masarValet } from "./systems/masar-valet";
import { nexoraErp } from "./systems/nexora-erp";
import { noxusWhatsappAi } from "./systems/noxus-whatsapp-ai";
import { qrMenu } from "./systems/qr-menu";
import { rentara } from "./systems/rentara";
import { sokanyCommerce } from "./systems/sokany-commerce";
import { souqna } from "./systems/souqna";
import { veloraPos } from "./systems/velora-pos";

export const projects: Project[] = [
  masarValet,
  nexoraErp,
  souqna,
  veloraPos,
  rentara,
  qrMenu,
  hakimoProduction,
  sokanyCommerce,
  cairoQuarantine,
  noxusWhatsappAi,
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getProjectsBySector(sector?: string): Project[] {
  if (!sector || sector === "all") return projects;
  return projects.filter((project) => project.sector === sector);
}

export function getNextProject(slug: string): Project | undefined {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index < 0) return undefined;
  return projects[(index + 1) % projects.length];
}

/** Prefer raw mass totals for ranking — not a fake score. */
export function massTotal(project: Project): number {
  const m = project.mass;
  return (
    (m.modules ?? 0) +
    (m.roles ?? 0) +
    (m.workflows ?? 0) +
    (m.interfaces ?? 0) +
    (m.integrations ?? 0) +
    (m.automations ?? 0)
  );
}

/** @deprecated use massTotal */
export function scaleScore(project: Project): number {
  return massTotal(project);
}

export function matchProjectsBySector(sector: string, limit = 3): Project[] {
  const primary = projects.filter((project) => project.sector === sector);
  const rest = projects.filter((project) => project.sector !== sector);
  return [...primary, ...rest].slice(0, limit);
}

export function matchProjectsByBrief(
  input: {
    projectTypes?: string[];
    workflows?: string[];
    integrations?: string[];
    roles?: string[];
  },
  limit = 3,
): Project[] {
  const tokens = new Set(
    [
      ...(input.projectTypes ?? []),
      ...(input.workflows ?? []),
      ...(input.integrations ?? []),
      ...(input.roles ?? []),
    ].map((t) => t.toLowerCase()),
  );

  const scored = projects.map((project) => {
    let score = 0;
    if (tokens.has(project.systemType)) score += 3;
    if (tokens.has(project.sector)) score += 2;
    for (const d of project.dna) if (tokens.has(d)) score += 2;
    for (const c of project.capabilities) if (tokens.has(c)) score += 1;
    for (const w of project.workflows) {
      if (
        [...tokens].some(
          (t) => w.id.includes(t) || w.name.en.toLowerCase().includes(t),
        )
      )
        score += 1;
    }
    // Map builder types → system types
    if (tokens.has("business") && project.systemType === "erp") score += 3;
    if (tokens.has("operations") && project.systemType === "operations")
      score += 3;
    if (tokens.has("platform") && project.systemType === "platform") score += 3;
    if (tokens.has("commerce") && project.systemType === "commerce") score += 3;
    if (tokens.has("ai") && project.systemType === "ai") score += 3;
    if (tokens.has("experience") && project.systemType === "experience")
      score += 3;
    if (tokens.has("mobile") && project.dna.includes("pwa")) score += 2;
    return { project, score };
  });

  return scored
    .sort(
      (a, b) =>
        b.score - a.score || massTotal(b.project) - massTotal(a.project),
    )
    .slice(0, limit)
    .map((s) => s.project);
}

export const SECTORS: Sector[] = [
  "mobility",
  "healthcare",
  "commerce",
  "operations",
  "services",
  "ventures",
  "other",
];

export const SYSTEM_TYPES: import("./types").SystemType[] = [
  "erp",
  "operations",
  "platform",
  "commerce",
  "ai",
  "experience",
];

export const STATUSES: import("./types").ProjectStatus[] = [
  "operating",
  "deployed",
  "evolving",
  "building",
  "venture",
  "concept",
];

export const CAPABILITIES: CapabilityId[] = [
  "product",
  "ux",
  "frontend",
  "backend",
  "data",
  "ai",
  "integrations",
  "operations",
];

type Sector = import("./types").Sector;

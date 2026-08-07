import { massTotal } from "@/content/projects";
import type { Project } from "@/content/types";

export function matchProjectsByBriefFromList(
  list: Project[],
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

  const scored = list.map((project) => {
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
      ) {
        score += 1;
      }
    }
    return { project, score };
  });

  return scored
    .sort(
      (a, b) => b.score - a.score || massTotal(b.project) - massTotal(a.project),
    )
    .slice(0, limit)
    .map((s) => s.project);
}

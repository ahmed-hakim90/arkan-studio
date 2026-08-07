import { unstable_noStore as noStore } from "next/cache";
import {
  projects as fileProjects,
  CAPABILITIES,
  SECTORS,
  STATUSES,
  SYSTEM_TYPES,
  massTotal,
  matchProjectsByBrief as matchBriefFile,
  matchProjectsBySector as matchSectorFile,
} from "@/content/projects";
import type { Project } from "@/content/types";
import { hasSupabaseConfig } from "@/lib/supabase/env";
import { createAnonClient } from "@/lib/supabase/server";
import { rowToProject, type ProjectRow } from "./types";

export { CAPABILITIES, SECTORS, STATUSES, SYSTEM_TYPES, massTotal };

async function fetchProjects(includeUnpublished = false): Promise<Project[] | null> {
  if (!hasSupabaseConfig()) return null;
  try {
    const supabase = createAnonClient();
    let query = supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true });

    if (!includeUnpublished) {
      query = query.eq("published", true);
    }

    const { data, error } = await query;
    if (error || !data?.length) return null;
    return (data as ProjectRow[]).map(rowToProject);
  } catch {
    return null;
  }
}

export async function getProjects(): Promise<Project[]> {
  noStore();
  return (await fetchProjects(false)) ?? fileProjects;
}

export async function getAllProjectsAdmin(): Promise<Project[]> {
  noStore();
  // Admin uses authenticated client separately; this is fallback helper.
  return (await fetchProjects(true)) ?? fileProjects;
}

export async function getProject(slug: string): Promise<Project | undefined> {
  noStore();
  if (hasSupabaseConfig()) {
    try {
      const supabase = createAnonClient();
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      if (!error && data) return rowToProject(data as ProjectRow);
    } catch {
      // fallback
    }
  }
  return fileProjects.find((p) => p.slug === slug);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const list = await getProjects();
  return list.filter((p) => p.featured);
}

export async function getNextProject(slug: string): Promise<Project | undefined> {
  const list = await getProjects();
  const index = list.findIndex((p) => p.slug === slug);
  if (index < 0) return undefined;
  return list[(index + 1) % list.length];
}

export async function matchProjectsBySector(
  sector: string,
  limit = 3,
): Promise<Project[]> {
  const list = await getProjects();
  if (!list.length) return matchSectorFile(sector, limit);
  const primary = list.filter((project) => project.sector === sector);
  const rest = list.filter((project) => project.sector !== sector);
  return [...primary, ...rest].slice(0, limit);
}

export async function matchProjectsByBrief(
  input: {
    projectTypes?: string[];
    workflows?: string[];
    integrations?: string[];
    roles?: string[];
  },
  limit = 3,
): Promise<Project[]> {
  const list = await getProjects();
  if (!list.length) return matchBriefFile(input, limit);

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

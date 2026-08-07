import type { Project } from "@/content/types";
import { massTotal } from "@/content/projects";

export function nodeRadius(project: Project): number {
  return 28 + Math.min(massTotal(project), 50) * 0.9;
}

export function scaleLabel(value: number, max = 5): string {
  return `${value}/${max}`;
}

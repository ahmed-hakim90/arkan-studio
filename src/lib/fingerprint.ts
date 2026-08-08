import type { Project } from "@/content/types";
import { massTotal } from "@/content/projects";

/** Deterministic visual seed from verified project traits (Bible fingerprint). */
export function fingerprintParams(project: Project): {
  bars: number[];
  rings: number;
  accent: number;
} {
  const seed = hash(
    [
      project.id,
      project.sector,
      project.systemType,
      project.status,
      ...project.capabilities,
      String(massTotal(project)),
    ].join("|"),
  );

  const bars = Array.from({ length: 8 }, (_, i) => {
    const n = ((seed >> (i * 3)) & 7) / 7;
    return 0.25 + n * 0.75;
  });

  return {
    bars,
    rings: 2 + (seed % 3),
    accent: (seed % 100) / 100,
  };
}

function hash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

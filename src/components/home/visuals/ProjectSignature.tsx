"use client";

import { useLocale } from "next-intl";
import type { Project } from "@/content/types";

type Props = {
  project: Project;
  tone?: "dark" | "light";
};

/** Compact unique diagram fingerprint per project — orthogonal, not decorative. */
export function ProjectSignature({ project, tone = "light" }: Props) {
  const locale = useLocale() as "ar" | "en";
  const modules = project.modules.slice(0, 5);
  const line = tone === "dark" ? "border-white/20" : "border-[var(--line)]";
  const ink = tone === "dark" ? "text-white/70" : "text-[var(--muted)]";
  const fill = tone === "dark" ? "bg-white/[0.04]" : "bg-[var(--surface)]";
  const active = tone === "dark" ? "bg-[var(--oxide)]" : "bg-[var(--oxide)]";

  return (
    <div
      className={`relative h-full min-h-[88px] border ${line} ${fill} p-3 transition-[transform,border-color] duration-300 group-hover:-translate-y-0.5`}
      aria-hidden
    >
      <div className="flex items-center justify-between gap-2">
        <span className={`tech-label text-[9px] ${ink}`}>
          SIG / {project.id}
        </span>
        <span className={`tech-label text-[9px] ${ink}`}>
          {project.systemType.toUpperCase()}
        </span>
      </div>
      <div className="mt-3 flex items-end gap-1">
        {modules.map((m, i) => {
          const h = 28 + ((i * 13 + project.atlas.x) % 36);
          return (
            <div key={m.id} className="flex min-w-0 flex-1 flex-col items-center gap-1">
              <div
                className={`w-full border ${line} transition-[height,background] duration-500 group-hover:bg-[color-mix(in_oklab,var(--oxide)_8%,transparent)]`}
                style={{ height: h }}
              >
                {i === Math.min(1, modules.length - 1) ? (
                  <div className={`h-0.5 w-full ${active}`} />
                ) : (
                  <div
                    className={`h-0.5 w-0 ${active} transition-all duration-500 group-hover:w-full`}
                  />
                )}
              </div>
              <span className={`tech-label w-full truncate text-center text-[8px] ${ink}`}>
                {m.name[locale].slice(0, 8)}
              </span>
            </div>
          );
        })}
      </div>
      <div className={`mt-2 h-px w-full ${tone === "dark" ? "bg-white/15" : "bg-[var(--line)]"}`} />
      <div className="mt-2 flex gap-2">
        {(project.workflows ?? []).slice(0, 3).map((w) => (
          <span key={w.id} className={`tech-label text-[8px] ${ink}`}>
            {w.id.toUpperCase()}
          </span>
        ))}
      </div>
    </div>
  );
}

"use client";

import { Suspense } from "react";
import type { Project } from "@/content/types";
import { SystemsAtlas } from "./SystemsAtlas";

type Props = {
  preview?: boolean;
  projects: Project[];
};

export function SystemsAtlasLazy(props: Props) {
  return (
    <Suspense
      fallback={
        <div className="h-64 animate-pulse border border-[var(--line)] bg-[var(--surface)]" />
      }
    >
      <SystemsAtlas {...props} />
    </Suspense>
  );
}

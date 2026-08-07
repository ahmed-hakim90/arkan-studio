"use client";

import dynamic from "next/dynamic";
import { PageSkeleton } from "@/components/loading/Skeleton";

export const SystemsAtlasLazy = dynamic(
  () =>
    import("@/components/atlas/SystemsAtlas").then((mod) => mod.SystemsAtlas),
  {
    loading: () => <PageSkeleton />,
    ssr: true,
  },
);

"use client";

import type { SignalStoryItem } from "./types";
import { ArchitectureVisual } from "./visuals/ArchitectureVisual";
import { FlowVisual } from "./visuals/FlowVisual";
import { LayersVisual } from "./visuals/LayersVisual";
import { NodesVisual } from "./visuals/NodesVisual";
import { RolesVisual } from "./visuals/RolesVisual";
import { ThinkingVisual } from "./visuals/ThinkingVisual";

type Props = {
  item: SignalStoryItem;
  invert?: boolean;
  reduced?: boolean;
  localProgress?: number;
  frameLabel?: string;
};

export function SignalStoryVisual({
  item,
  invert,
  reduced,
  localProgress = 0.4,
  frameLabel,
}: Props) {
  const visual = item.visual;
  if (!visual || visual.type === "text") {
    return (
      <div
        className={`flex h-full min-h-[200px] items-center justify-center border ${
          invert
            ? "border-white/15 bg-[var(--carbon)]"
            : "border-[var(--line)] bg-[var(--surface)]"
        }`}
      >
        <p
          className={`tech-label text-[11px] ${
            invert ? "text-white/40" : "text-[var(--muted)]"
          }`}
        >
          {item.eyebrow ?? item.id}
        </p>
      </div>
    );
  }

  switch (visual.type) {
    case "flow":
      return (
        <FlowVisual
          data={visual.data}
          invert={invert}
          reduced={reduced}
          localProgress={localProgress}
          frameLabel={frameLabel}
        />
      );
    case "roles":
      return (
        <RolesVisual
          data={visual.data}
          invert={invert}
          reduced={reduced}
          frameLabel={frameLabel}
        />
      );
    case "nodes":
      return (
        <NodesVisual
          data={visual.data}
          invert={invert}
          reduced={reduced}
          frameLabel={frameLabel}
        />
      );
    case "layers":
      return (
        <LayersVisual
          data={visual.data}
          invert={invert}
          reduced={reduced}
          activeIndex={Math.floor(localProgress * visual.data.layers.length)}
          frameLabel={frameLabel}
        />
      );
    case "architecture":
      return (
        <ArchitectureVisual
          data={visual.data}
          invert={invert}
          reduced={reduced}
          frameLabel={frameLabel}
        />
      );
    case "thinking":
      return (
        <ThinkingVisual
          data={visual.data}
          invert={invert}
          reduced={reduced}
          localProgress={localProgress}
          frameLabel={frameLabel}
        />
      );
    case "project":
      return (
        <div
          className={`flex h-full min-h-[200px] items-center justify-center border ${
            invert
              ? "border-white/15 bg-[var(--carbon)]"
              : "border-[var(--line)] bg-[var(--surface)]"
          }`}
        >
          <p
            className={`tech-label text-[11px] ${
              invert ? "text-white/45" : "text-[var(--muted)]"
            }`}
          >
            SYSTEM / {visual.projectId}
          </p>
        </div>
      );
    default:
      return null;
  }
}

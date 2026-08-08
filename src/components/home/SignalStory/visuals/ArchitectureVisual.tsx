"use client";

import type { ArchitectureVisualData } from "../types";
import { DiagramEdge, DiagramFrame, DiagramNode } from "./DiagramPrimitives";

type Props = {
  data: ArchitectureVisualData;
  invert?: boolean;
  reduced?: boolean;
  frameLabel?: string;
};

export function ArchitectureVisual({
  data,
  invert,
  reduced,
  frameLabel,
}: Props) {
  const layers = data.layers.slice(0, 4);
  const core = data.coreLabel ?? "SYSTEM";
  const positions = [
    { x: 22, y: 28 },
    { x: 78, y: 28 },
    { x: 22, y: 72 },
    { x: 78, y: 72 },
  ];

  return (
    <DiagramFrame invert={invert} label={frameLabel}>
      {layers.map((layer, i) => {
        const p = positions[i] ?? { x: 50, y: 50 };
        return (
          <DiagramEdge
            key={`e-${layer.id}`}
            x1={p.x}
            y1={p.y}
            x2={50}
            y2={50}
            active={i === 0}
          />
        );
      })}
      <DiagramNode
        x={50}
        y={50}
        label={core}
        active
        width={30}
        height={12}
        layoutId="signal-system"
        reduced={reduced}
      />
      {layers.map((layer, i) => {
        const p = positions[i] ?? { x: 50, y: 50 };
        return (
          <DiagramNode
            key={layer.id}
            x={p.x}
            y={p.y}
            label={layer.label}
            active={i === layers.length - 1}
            width={26}
            height={10}
            layoutId={`signal-arch-${layer.id}`}
            reduced={reduced}
          />
        );
      })}
    </DiagramFrame>
  );
}

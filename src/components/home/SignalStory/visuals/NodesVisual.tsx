"use client";

import type { NodesVisualData } from "../types";
import { DiagramEdge, DiagramFrame, DiagramNode } from "./DiagramPrimitives";

type Props = {
  data: NodesVisualData;
  invert?: boolean;
  reduced?: boolean;
  frameLabel?: string;
};

/** Compact entity relationship map — intentional links only. */
const DEFAULT_POS: Record<string, { x: number; y: number }> = {
  user: { x: 22, y: 28 },
  request: { x: 50, y: 22 },
  status: { x: 78, y: 32 },
  transaction: { x: 38, y: 58 },
  location: { x: 72, y: 62 },
  system: { x: 50, y: 78 },
};

export function NodesVisual({ data, invert, reduced, frameLabel }: Props) {
  const entities = data.entities.slice(0, 6);
  const pos = (id: string, index: number) =>
    DEFAULT_POS[id] ?? {
      x: 20 + (index % 3) * 30,
      y: 28 + Math.floor(index / 3) * 30,
    };

  return (
    <DiagramFrame invert={invert} label={frameLabel}>
      {data.links.map((link) => {
        const fromIdx = entities.findIndex((e) => e.id === link.from);
        const toIdx = entities.findIndex((e) => e.id === link.to);
        if (fromIdx < 0 || toIdx < 0) return null;
        const a = pos(link.from, fromIdx);
        const b = pos(link.to, toIdx);
        return (
          <DiagramEdge
            key={`${link.from}-${link.to}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            active={link.from === "request" || link.to === "status"}
          />
        );
      })}
      {entities.map((entity, i) => {
        const p = pos(entity.id, i);
        const hot = entity.id === "request" || entity.id === "status";
        return (
          <DiagramNode
            key={entity.id}
            x={p.x}
            y={p.y}
            label={entity.label}
            active={hot}
            width={24}
            height={9}
            layoutId={`signal-entity-${entity.id}`}
            reduced={reduced}
          />
        );
      })}
    </DiagramFrame>
  );
}

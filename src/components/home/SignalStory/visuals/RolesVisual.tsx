"use client";

import type { RolesVisualData } from "../types";
import { DiagramEdge, DiagramFrame, DiagramNode } from "./DiagramPrimitives";

type Props = {
  data: RolesVisualData;
  invert?: boolean;
  reduced?: boolean;
  frameLabel?: string;
};

const ROLE_SLOTS: Array<{ x: number; y: number }> = [
  { x: 18, y: 22 },
  { x: 18, y: 42 },
  { x: 18, y: 62 },
  { x: 18, y: 82 },
  { x: 82, y: 32 },
  { x: 82, y: 58 },
  { x: 82, y: 78 },
];

export function RolesVisual({ data, invert, reduced, frameLabel }: Props) {
  const roles = data.roles.slice(0, 7);
  const cx = 52;
  const cy = 50;

  return (
    <DiagramFrame invert={invert} label={frameLabel}>
      {roles.map((role, i) => {
        const slot = ROLE_SLOTS[i] ?? { x: 18, y: 50 };
        return (
          <DiagramEdge
            key={`e-${role.id}`}
            x1={slot.x + (slot.x < cx ? 11 : -11)}
            y1={slot.y}
            x2={cx + (slot.x < cx ? -14 : 14)}
            y2={cy}
            active={i === 0}
          />
        );
      })}
      <DiagramNode
        x={cx}
        y={cy}
        label={data.systemLabel}
        active
        width={28}
        height={12}
        layoutId="signal-system"
        reduced={reduced}
      />
      {roles.map((role, i) => {
        const slot = ROLE_SLOTS[i] ?? { x: 18, y: 50 };
        return (
          <DiagramNode
            key={role.id}
            x={slot.x}
            y={slot.y}
            label={role.label}
            active={i === 0}
            width={24}
            height={9}
            layoutId={`signal-role-${role.id}`}
            reduced={reduced}
          />
        );
      })}
    </DiagramFrame>
  );
}

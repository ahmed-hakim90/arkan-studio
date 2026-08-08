"use client";

import type { FlowVisualData } from "../types";
import {
  DiagramEdge,
  DiagramFrame,
  DiagramNode,
  FlowSignal,
} from "./DiagramPrimitives";

type Props = {
  data: FlowVisualData;
  invert?: boolean;
  reduced?: boolean;
  localProgress?: number;
  frameLabel?: string;
};

export function FlowVisual({
  data,
  invert,
  reduced,
  localProgress = 0.5,
  frameLabel,
}: Props) {
  const steps = data.steps.slice(0, 6);
  const n = Math.max(steps.length, 1);
  const gap = 70 / Math.max(n - 1, 1);
  const y0 = 15;
  const active =
    data.activeIndex ??
    Math.min(n - 1, Math.floor(localProgress * n));

  return (
    <DiagramFrame invert={invert} label={frameLabel}>
      {steps.map((step, i) => {
        if (i === 0) return null;
        const yA = y0 + (i - 1) * gap;
        const yB = y0 + i * gap;
        return (
          <DiagramEdge
            key={`e-${step.id}`}
            x1={50}
            y1={yA + 5}
            x2={50}
            y2={yB - 5}
            active={i <= active}
          />
        );
      })}
      {steps.map((step, i) => (
        <DiagramNode
          key={step.id}
          x={50}
          y={y0 + i * gap}
          label={step.label}
          active={i === active}
          width={28}
          height={9}
          reduced={reduced}
        />
      ))}
      <FlowSignal
        x={50}
        yTop={y0}
        yBottom={y0 + (n - 1) * gap}
        progress={reduced ? 0.5 : (active + localProgress) / n}
        reduced={reduced}
      />
    </DiagramFrame>
  );
}

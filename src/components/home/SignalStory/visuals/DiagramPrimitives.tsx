"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function DiagramNode({
  x,
  y,
  label,
  active = false,
  width = 22,
  height = 10,
  layoutId,
  reduced,
  invert = false,
}: {
  x: number;
  y: number;
  label: string;
  active?: boolean;
  width?: number;
  height?: number;
  layoutId?: string;
  reduced?: boolean;
  invert?: boolean;
}) {
  const halfW = width / 2;
  const halfH = height / 2;
  const idleFill = invert ? "rgba(255,255,255,0.04)" : "var(--surface)";
  const idleStroke = invert ? "rgba(255,255,255,0.45)" : "var(--carbon)";
  const idleText = invert ? "rgba(255,255,255,0.82)" : "var(--carbon)";
  return (
    <motion.g
      layoutId={layoutId}
      initial={false}
      animate={{ x, y, opacity: 1 }}
      transition={{ duration: reduced ? 0 : 0.45, ease: EASE }}
    >
      <rect
        x={-halfW}
        y={-halfH}
        width={width}
        height={height}
        rx={0.9}
        fill={active ? "var(--oxide-soft)" : idleFill}
        stroke={active ? "var(--oxide)" : idleStroke}
        strokeOpacity={active ? 0.95 : invert ? 0.7 : 0.45}
        strokeWidth={active ? 0.55 : 0.35}
      />
      {active ? (
        <circle cx={-halfW + 2.2} cy={0} r={0.7} fill="var(--oxide)" />
      ) : null}
      <text
        textAnchor="middle"
        dominantBaseline="middle"
        fill={active ? "var(--oxide)" : idleText}
        style={{
          fontSize: Math.min(3.1, 28 / Math.max(label.length, 6)),
          fontFamily: "var(--font-tech)",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </text>
    </motion.g>
  );
}

export function DiagramEdge({
  x1,
  y1,
  x2,
  y2,
  active = false,
  dashed = false,
  invert = false,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  active?: boolean;
  dashed?: boolean;
  invert?: boolean;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={active ? "var(--oxide)" : invert ? "rgba(255,255,255,0.7)" : "var(--carbon)"}
      strokeOpacity={active ? 0.75 : invert ? 0.28 : 0.22}
      strokeWidth={active ? 0.45 : 0.28}
      strokeDasharray={dashed ? "1.2 1.2" : undefined}
    />
  );
}

/** Traveling oxide signal along a vertical workflow. */
export function FlowSignal({
  x,
  yTop,
  yBottom,
  progress,
  reduced,
}: {
  x: number;
  yTop: number;
  yBottom: number;
  progress: number;
  reduced?: boolean;
}) {
  if (reduced) {
    return (
      <circle cx={x} cy={(yTop + yBottom) / 2} r={1.1} fill="var(--oxide)" />
    );
  }
  const y = yTop + (yBottom - yTop) * progress;
  return (
    <motion.circle
      cx={x}
      cy={y}
      r={1.15}
      fill="var(--oxide)"
      initial={false}
      animate={{ cy: y }}
      transition={{ duration: 0.2, ease: "linear" }}
    />
  );
}

export function DiagramFrame({
  children,
  invert,
  label,
}: {
  children: ReactNode;
  invert?: boolean;
  label?: string;
}) {
  return (
    <div
      className={`relative h-full min-h-[220px] w-full overflow-hidden border ${
        invert
          ? "border-white/15 bg-[var(--carbon)]"
          : "border-[var(--line)] bg-[var(--surface)]"
      }`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage: invert
            ? "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)"
            : "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {label ? (
        <p
          className={`tech-label absolute start-3 top-3 z-[1] text-[9px] ${
            invert ? "text-white/40" : "text-[var(--muted)]"
          }`}
        >
          {label}
        </p>
      ) : null}
      <svg
        viewBox="0 0 100 100"
        className="relative h-full w-full min-h-[240px] md:min-h-0"
        role="presentation"
        focusable="false"
      >
        {children}
      </svg>
    </div>
  );
}

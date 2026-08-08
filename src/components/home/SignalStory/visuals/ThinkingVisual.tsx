"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import type { ThinkingStage, ThinkingVisualData } from "../types";
import {
  DiagramEdge,
  DiagramFrame,
  DiagramNode,
  FlowSignal,
} from "./DiagramPrimitives";

type Props = {
  data: ThinkingVisualData;
  invert?: boolean;
  reduced?: boolean;
  localProgress?: number;
  frameLabel?: string;
};

type Pt = { x: number; y: number };

type SceneNode = {
  id: string;
  label: string;
  pos: Pt;
  active?: boolean;
  w?: number;
  h?: number;
};

type SceneEdge = {
  id: string;
  from: string;
  to: string;
  active?: boolean;
};

const EASE = [0.22, 1, 0.36, 1] as const;

function buildScene(
  stage: ThinkingStage,
  L: ThinkingVisualData["labels"],
  localProgress: number,
): { nodes: SceneNode[]; edges: SceneEdge[]; flowSignal?: number } {
  switch (stage) {
    case "business":
      return {
        nodes: [
          { id: "goal", label: L.goal, pos: { x: 50, y: 16 }, active: true, w: 24 },
          { id: "problem", label: L.problem, pos: { x: 50, y: 42 }, active: true, w: 26 },
          { id: "constraint", label: L.constraint, pos: { x: 80, y: 42 }, w: 26 },
          { id: "operation", label: L.operation, pos: { x: 50, y: 78 }, w: 34 },
        ],
        edges: [
          { id: "e1", from: "goal", to: "problem", active: true },
          { id: "e2", from: "problem", to: "constraint", active: true },
          { id: "e3", from: "problem", to: "operation" },
        ],
      };
    case "people":
      return {
        nodes: [
          { id: "customer", label: L.customer, pos: { x: 16, y: 22 }, active: true, w: 24 },
          { id: "staff", label: L.staff, pos: { x: 16, y: 42 }, w: 22 },
          { id: "manager", label: L.manager, pos: { x: 16, y: 62 }, w: 24 },
          { id: "operator", label: L.operator, pos: { x: 84, y: 32 }, w: 24 },
          { id: "partner", label: L.partner, pos: { x: 84, y: 58 }, w: 22 },
          { id: "system", label: L.system, pos: { x: 50, y: 50 }, active: true, w: 28, h: 12 },
        ],
        edges: [
          { id: "e1", from: "customer", to: "system", active: true },
          { id: "e2", from: "staff", to: "system" },
          { id: "e3", from: "manager", to: "system" },
          { id: "e4", from: "operator", to: "system" },
          { id: "e5", from: "partner", to: "system" },
        ],
      };
    case "process": {
      const steps = [
        { id: "request", label: L.request },
        { id: "validate", label: L.validate },
        { id: "process", label: L.process },
        { id: "decision", label: L.decision },
        { id: "complete", label: L.complete },
      ] as const;
      const active = Math.min(
        steps.length - 1,
        Math.floor(localProgress * steps.length),
      );
      return {
        nodes: steps.map((s, i) => ({
          id: s.id,
          label: s.label,
          pos: { x: 50, y: 12 + i * 19 },
          active: i === active,
          w: 28,
        })),
        edges: steps.slice(1).map((s, i) => ({
          id: `e${i}`,
          from: steps[i].id,
          to: s.id,
          active: i < active,
        })),
        flowSignal: 0.12 + localProgress * 0.76,
      };
    }
    case "data":
      return {
        nodes: [
          { id: "user", label: L.user, pos: { x: 20, y: 26 }, w: 22 },
          { id: "request", label: L.request, pos: { x: 50, y: 18 }, active: true, w: 24 },
          { id: "status", label: L.status, pos: { x: 80, y: 30 }, active: true, w: 22 },
          { id: "transaction", label: L.transaction, pos: { x: 36, y: 56 }, w: 28 },
          { id: "location", label: L.location, pos: { x: 74, y: 60 }, w: 24 },
          { id: "system", label: L.system, pos: { x: 50, y: 84 }, active: true, w: 26 },
        ],
        edges: [
          { id: "e1", from: "user", to: "request", active: true },
          { id: "e2", from: "request", to: "status", active: true },
          { id: "e3", from: "request", to: "transaction" },
          { id: "e4", from: "status", to: "location" },
          { id: "e5", from: "transaction", to: "location" },
          { id: "e6", from: "transaction", to: "system", active: true },
          { id: "e7", from: "location", to: "system" },
        ],
      };
    case "system":
    default:
      return {
        nodes: [
          { id: "business", label: L.business, pos: { x: 20, y: 24 }, w: 26, h: 10 },
          { id: "people", label: L.people, pos: { x: 80, y: 24 }, w: 24, h: 10 },
          { id: "process", label: L.processLayer, pos: { x: 20, y: 76 }, w: 26, h: 10 },
          { id: "data", label: L.data, pos: { x: 80, y: 76 }, active: true, w: 22, h: 10 },
          { id: "system", label: L.system, pos: { x: 50, y: 50 }, active: true, w: 30, h: 12 },
        ],
        edges: [
          { id: "e1", from: "business", to: "system", active: true },
          { id: "e2", from: "people", to: "system" },
          { id: "e3", from: "process", to: "system" },
          { id: "e4", from: "data", to: "system", active: true },
        ],
      };
  }
}

/**
 * Continuous systems-thinking scene.
 * Shared node ids keep layoutId morphs across stages — system assembling, not slides.
 */
export function ThinkingVisual({
  data,
  invert,
  reduced,
  localProgress = 0.4,
  frameLabel,
}: Props) {
  const scene = useMemo(
    () => buildScene(data.stage, data.labels, localProgress),
    [data.stage, data.labels, localProgress],
  );

  const byId = useMemo(() => {
    const map = new Map(scene.nodes.map((n) => [n.id, n]));
    return map;
  }, [scene.nodes]);

  return (
    <DiagramFrame invert={invert} label={frameLabel}>
      {scene.edges.map((edge) => {
        const from = byId.get(edge.from);
        const to = byId.get(edge.to);
        if (!from || !to) return null;
        return (
          <DiagramEdge
            key={edge.id}
            x1={from.pos.x}
            y1={from.pos.y}
            x2={to.pos.x}
            y2={to.pos.y}
            active={edge.active}
            invert={invert}
          />
        );
      })}

      {scene.nodes.map((node) => (
        <DiagramNode
          key={node.id}
          x={node.pos.x}
          y={node.pos.y}
          label={node.label}
          active={node.active}
          width={node.w}
          height={node.h}
          layoutId={`tv-${node.id}`}
          invert={invert}
          reduced={reduced}
        />
      ))}

      {scene.flowSignal != null ? (
        <FlowSignal
          x={50}
          yTop={12}
          yBottom={88}
          progress={reduced ? 0.45 : scene.flowSignal}
          reduced={reduced}
        />
      ) : null}

      {data.stage === "system" && !reduced ? (
        <motion.circle
          cx={50}
          cy={50}
          r={20}
          fill="none"
          stroke="var(--oxide)"
          strokeOpacity={0.3}
          strokeWidth={0.35}
          initial={{ scale: 0.75, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.55, ease: EASE }}
          style={{ transformOrigin: "50px 50px" }}
        />
      ) : null}
    </DiagramFrame>
  );
}

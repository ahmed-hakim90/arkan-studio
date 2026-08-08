import type { ReactNode } from "react";

export type SignalStoryMeta = {
  label: string;
  value: string;
};

export type FlowStep = {
  id: string;
  label: string;
};

export type FlowVisualData = {
  steps: FlowStep[];
  /** Index of the oxide-active step; defaults to midpoint / scroll-local. */
  activeIndex?: number;
};

export type RoleNode = {
  id: string;
  label: string;
};

export type RolesVisualData = {
  systemLabel: string;
  roles: RoleNode[];
};

export type DataEntity = {
  id: string;
  label: string;
};

export type DataLink = {
  from: string;
  to: string;
};

export type NodesVisualData = {
  entities: DataEntity[];
  links: DataLink[];
};

export type LayerBand = {
  id: string;
  label: string;
};

export type LayersVisualData = {
  layers: LayerBand[];
};

export type ArchitectureLayer = {
  id: string;
  label: string;
  detail?: string;
};

export type ArchitectureVisualData = {
  layers: ArchitectureLayer[];
  coreLabel?: string;
};

/** Continuous morph scene for Arkan systems-thinking (and similar). */
export type ThinkingStage =
  | "business"
  | "people"
  | "process"
  | "data"
  | "system";

export type ThinkingVisualData = {
  stage: ThinkingStage;
  labels: {
    goal: string;
    problem: string;
    constraint: string;
    operation: string;
    system: string;
    customer: string;
    staff: string;
    manager: string;
    operator: string;
    partner: string;
    request: string;
    validate: string;
    process: string;
    decision: string;
    complete: string;
    user: string;
    status: string;
    transaction: string;
    location: string;
    business: string;
    people: string;
    processLayer: string;
    data: string;
  };
};

export type SignalStoryVisual =
  | { type: "flow"; data: FlowVisualData }
  | { type: "roles"; data: RolesVisualData }
  | { type: "nodes"; data: NodesVisualData }
  | { type: "layers"; data: LayersVisualData }
  | { type: "architecture"; data: ArchitectureVisualData }
  | { type: "thinking"; data: ThinkingVisualData }
  | { type: "project"; projectId: string }
  | { type: "text" };

export type SignalStoryItem = {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  meta?: SignalStoryMeta[];
  visual?: SignalStoryVisual;
  accent?: boolean;
};

export type SignalStoryTheme =
  | "bone"
  | "bone-soft"
  | "surface"
  | "gunmetal"
  | "carbon";

export type SignalStoryVariant = "split" | "centered" | "layers" | "project";

export type SignalStoryProps = {
  items: SignalStoryItem[];
  theme?: SignalStoryTheme;
  visualPosition?: "start" | "end";
  showProgress?: boolean;
  variant?: SignalStoryVariant;
  className?: string;
  /** Accessible name for the section. */
  ariaLabel?: string;
  /** Optional section eyebrow above the sticky scene. */
  sectionEyebrow?: string;
  /** Override visual rendering (advanced). */
  renderVisual?: (ctx: {
    item: SignalStoryItem;
    index: number;
    localProgress: number;
  }) => ReactNode;
};

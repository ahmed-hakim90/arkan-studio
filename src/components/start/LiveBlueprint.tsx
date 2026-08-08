"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

export type BlueprintMutation =
  | "type"
  | "stage"
  | "roles"
  | "workflows"
  | "integrations"
  | "intelligence"
  | "scale"
  | "priorities"
  | "problem"
  | "delivery"
  | "contact"
  | null;

export type BlueprintSnapshot = {
  projectTypes: string[];
  stage: string;
  roles: string[];
  workflows: string[];
  integrations: string[];
  intelligence: string[];
  priorities: string[];
  complexityLabel: string;
  ready?: boolean;
};

type Props = {
  snapshot: BlueprintSnapshot;
  lastMutation?: BlueprintMutation;
  labels: {
    live: string;
    project: string;
    users: string;
    flows: string;
    integrations: string;
    intelligence: string;
    priority: string;
    complexity: string;
    empty: string;
    ready?: string;
  };
  mode?: "full" | "peek";
};

type Layer = {
  id: BlueprintMutation;
  title: string;
  items: string[];
  accent?: boolean;
};

function LayerNode({
  label,
  hot,
  accent,
  reduced,
  index,
}: {
  label: string;
  hot: boolean;
  accent?: boolean;
  reduced: boolean;
  index: number;
}) {
  return (
    <motion.span
      layout={!reduced}
      initial={reduced ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0, y: -4 }}
      transition={{ duration: reduced ? 0 : 0.22, delay: reduced ? 0 : index * 0.03 }}
      className={`inline-flex min-h-9 max-w-full items-center border px-3 py-1.5 text-start text-[12px] font-medium leading-snug tracking-[-0.01em] ${
        hot
          ? "border-[var(--signal)] bg-[var(--signal-soft)] text-[var(--signal)]"
          : accent
            ? "border-[var(--navy)] bg-[var(--carbon)] text-white"
            : "border-[var(--navy)]/35 bg-[var(--surface)] text-[var(--carbon)]"
      }`}
    >
      <span className="line-clamp-2">{label}</span>
    </motion.span>
  );
}

function LayerRail({
  layer,
  hot,
  reduced,
}: {
  layer: Layer;
  hot: boolean;
  reduced: boolean;
}) {
  return (
    <div
      className={`relative grid gap-3 border-s-2 ps-4 transition-colors duration-[240ms] md:grid-cols-[7.5rem_minmax(0,1fr)] ${
        hot ? "border-[var(--signal)]" : "border-[var(--line-strong)]"
      }`}
    >
      <div className="flex items-start gap-2 md:block">
        <span
          aria-hidden
          className={`mt-1.5 size-2 shrink-0 md:absolute md:-start-[5px] md:top-2 ${
            hot ? "bg-[var(--signal)]" : "bg-[var(--navy)]"
          }`}
        />
        <p
          className={`tech-label text-[10px] ${
            hot ? "text-[var(--signal)]" : "text-[var(--muted)]"
          }`}
        >
          {layer.title}
        </p>
        <p className="tech-label text-[9px] text-[var(--muted)] md:mt-1">
          {String(layer.items.length).padStart(2, "0")}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <AnimatePresence initial={false} mode="popLayout">
          {layer.items.map((item, index) => (
            <LayerNode
              key={`${layer.id}-${item}`}
              label={item}
              hot={hot}
              accent={layer.accent && index === 0}
              reduced={reduced}
              index={index}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function LiveBlueprint({
  snapshot,
  lastMutation = null,
  labels,
  mode = "full",
}: Props) {
  const reduced = usePrefersReducedMotion();

  const layers = useMemo(() => {
    const next: Layer[] = [];

    const projectItems = [
      ...(snapshot.projectTypes[0] ? [snapshot.projectTypes[0]] : []),
      ...(snapshot.stage ? [snapshot.stage] : []),
    ];
    if (projectItems.length) {
      next.push({
        id: "type",
        title: labels.project,
        items: projectItems,
        accent: true,
      });
    }

    if (snapshot.roles.length) {
      next.push({
        id: "roles",
        title: labels.users,
        items: snapshot.roles,
      });
    }

    if (snapshot.workflows.length) {
      next.push({
        id: "workflows",
        title: labels.flows,
        items: snapshot.workflows,
      });
    }

    if (snapshot.integrations.length) {
      next.push({
        id: "integrations",
        title: labels.integrations,
        items: snapshot.integrations,
      });
    }

    if (snapshot.intelligence.length) {
      next.push({
        id: "intelligence",
        title: labels.intelligence,
        items: snapshot.intelligence,
      });
    }

    return next;
  }, [labels, snapshot]);

  if (mode === "peek") {
    return (
      <div className="flex min-w-0 flex-1 items-center gap-4 px-4">
        <div className="min-w-0 flex-1">
          <p className="tech-label text-[10px] text-[var(--muted)]">
            {labels.live}
          </p>
          <p className="mt-1 truncate text-sm font-medium">
            {snapshot.projectTypes[0] || labels.empty}
            {snapshot.roles.length
              ? ` · ${snapshot.roles.length} ${labels.users}`
              : ""}
            {snapshot.workflows.length
              ? ` · ${snapshot.workflows.length} ${labels.flows}`
              : ""}
          </p>
        </div>
        <span
          aria-hidden
          className={`h-8 w-0.5 shrink-0 transition-colors duration-[240ms] ${
            lastMutation ? "bg-[var(--signal)]" : "bg-[var(--navy)]"
          }`}
        />
      </div>
    );
  }

  const empty = layers.length === 0;

  return (
    <div className="relative flex h-full min-h-0 flex-col">
      <div className="flex items-baseline justify-between gap-3 border-b border-[var(--line)] pb-3">
        <div>
          <p className="tech-label text-[10px] text-[var(--muted)]">
            {labels.live}
          </p>
          <p className="mt-1 text-sm font-medium text-[var(--carbon)]">
            {snapshot.projectTypes[0] || labels.empty}
            {snapshot.stage ? ` · ${snapshot.stage}` : ""}
          </p>
        </div>
        <p
          className={`shrink-0 tech-label text-[10px] transition-colors duration-[240ms] ${
            lastMutation === "priorities" || lastMutation === "scale"
              ? "text-[var(--signal)]"
              : "text-[var(--navy)]"
          }`}
        >
          {labels.complexity}: {snapshot.complexityLabel}
        </p>
      </div>

      {snapshot.priorities.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="tech-label self-center text-[9px] text-[var(--muted)]">
            {labels.priority}
          </span>
          <AnimatePresence initial={false}>
            {snapshot.priorities.slice(0, 4).map((tag) => (
              <motion.span
                key={tag}
                layout={!reduced}
                initial={reduced ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.2 }}
                className={`border px-2 py-1 tech-label text-[9px] ${
                  lastMutation === "priorities"
                    ? "border-[var(--signal)] text-[var(--signal)]"
                    : "border-[var(--line)] text-[var(--muted)]"
                }`}
              >
                {tag}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
      ) : null}

      <div className="relative mt-4 flex-1 overflow-hidden border border-[var(--line)] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--volt-soft)_55%,white),var(--surface))]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(11,18,32,0.12) 1px, transparent 0)",
            backgroundSize: "22px 22px",
            maskImage:
              "linear-gradient(180deg, black 0%, transparent 92%)",
          }}
        />

        <div className="relative space-y-5 p-4 md:p-5">
          {empty ? (
            <p className="text-sm text-[var(--muted)]">{labels.empty}</p>
          ) : (
            layers.map((layer, index) => {
              const hot =
                lastMutation === layer.id ||
                (layer.id === "type" &&
                  (lastMutation === "type" || lastMutation === "stage"));
              return (
                <div key={layer.id}>
                  <LayerRail layer={layer} hot={Boolean(hot)} reduced={reduced} />
                  {index < layers.length - 1 ? (
                    <div
                      aria-hidden
                      className="ms-[3px] mt-3 h-4 w-px bg-[var(--line-strong)] md:ms-0"
                    />
                  ) : null}
                </div>
              );
            })
          )}
        </div>
      </div>

      <dl className="mt-3 grid gap-2 border-t border-[var(--line)] pt-3 sm:grid-cols-2">
        {(
          [
            ["project", snapshot.projectTypes.join(" · ") || labels.empty, "type"],
            ["users", snapshot.roles.join(" · ") || labels.empty, "roles"],
            ["flows", snapshot.workflows.join(" · ") || labels.empty, "workflows"],
            [
              "integrations",
              snapshot.integrations.join(" · ") || labels.empty,
              "integrations",
            ],
          ] as const
        ).map(([key, value, kind]) => (
          <div key={key} className="min-w-0">
            <dt
              className={`tech-label text-[9px] ${
                lastMutation === kind
                  ? "text-[var(--signal)]"
                  : "text-[var(--muted)]"
              }`}
            >
              {labels[key]}
            </dt>
            <dd className="mt-0.5 text-[12px] font-medium leading-snug text-[var(--foreground)]">
              {value}
            </dd>
          </div>
        ))}
      </dl>

      {snapshot.ready && labels.ready ? (
        <p className="tech-label mt-3 text-[10px] text-[var(--signal)]">
          {labels.ready}
        </p>
      ) : null}
    </div>
  );
}

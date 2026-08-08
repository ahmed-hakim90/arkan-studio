"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  LiveBlueprint,
  type BlueprintSnapshot,
} from "@/components/start/LiveBlueprint";
import { usePrefersReducedMotion } from "@/lib/motion";

export type BuildStepId =
  | "frame"
  | "users"
  | "flows"
  | "integrations"
  | "intelligence"
  | "markdown"
  | "seal";

const BUILD_STEPS: BuildStepId[] = [
  "frame",
  "users",
  "flows",
  "integrations",
  "intelligence",
  "markdown",
  "seal",
];

type Labels = {
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

type Props = {
  blueprintId: string;
  snapshot: BlueprintSnapshot;
  markdown: string;
  labels: Labels;
  copy: {
    eyebrow: string;
    title: string;
    support: string;
    fileLabel: string;
    writing: string;
    done: string;
    waiting: string;
    steps: Record<BuildStepId, string>;
  };
  onComplete: () => void;
};

function sliceSnapshot(
  snapshot: BlueprintSnapshot,
  step: BuildStepId,
): BlueprintSnapshot {
  const index = BUILD_STEPS.indexOf(step);
  return {
    projectTypes: index >= 0 ? snapshot.projectTypes : [],
    stage: index >= 0 ? snapshot.stage : "",
    roles: index >= 1 ? snapshot.roles : [],
    workflows: index >= 2 ? snapshot.workflows : [],
    integrations: index >= 3 ? snapshot.integrations : [],
    intelligence: index >= 4 ? snapshot.intelligence : [],
    priorities: index >= 5 ? snapshot.priorities : [],
    complexityLabel: snapshot.complexityLabel,
    ready: index >= 6,
  };
}

function mutationFor(step: BuildStepId) {
  switch (step) {
    case "frame":
      return "type" as const;
    case "users":
      return "roles" as const;
    case "flows":
      return "workflows" as const;
    case "integrations":
      return "integrations" as const;
    case "intelligence":
      return "intelligence" as const;
    case "markdown":
      return "priorities" as const;
    case "seal":
      return "contact" as const;
    default:
      return null;
  }
}

export function BlueprintBuildSequence({
  blueprintId,
  snapshot,
  markdown,
  labels,
  copy,
  onComplete,
}: Props) {
  const reduced = usePrefersReducedMotion();
  const [stepIndex, setStepIndex] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const step = BUILD_STEPS[stepIndex] ?? "seal";
  const revealed = useMemo(() => sliceSnapshot(snapshot, step), [snapshot, step]);

  useEffect(() => {
    if (reduced) {
      setStepIndex(BUILD_STEPS.length - 1);
      setTypedChars(markdown.length);
      const done = window.setTimeout(onComplete, 480);
      return () => window.clearTimeout(done);
    }

    const durations = [520, 560, 560, 520, 520, 900, 640];
    let cancelled = false;
    let timer = 0;

    const advance = (index: number) => {
      if (cancelled) return;
      setStepIndex(index);
      if (index >= BUILD_STEPS.length - 1) {
        timer = window.setTimeout(onComplete, durations[index] ?? 600);
        return;
      }
      timer = window.setTimeout(() => advance(index + 1), durations[index] ?? 520);
    };

    advance(0);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [markdown.length, onComplete, reduced]);

  useEffect(() => {
    if (reduced) return;
    if (step !== "markdown" && step !== "seal") {
      setTypedChars(0);
      return;
    }

    if (step === "seal") {
      setTypedChars(markdown.length);
      return;
    }

    setTypedChars(0);
    const total = markdown.length;
    const tickMs = Math.max(8, Math.min(18, Math.floor(900 / Math.max(total / 24, 1))));
    let shown = 0;
    const timer = window.setInterval(() => {
      shown = Math.min(total, shown + Math.max(3, Math.floor(total / 40)));
      setTypedChars(shown);
      if (shown >= total) window.clearInterval(timer);
    }, tickMs);
    return () => window.clearInterval(timer);
  }, [markdown, reduced, step]);

  const visibleMarkdown =
    step === "markdown" || step === "seal"
      ? markdown.slice(0, typedChars)
      : "";

  const progress = ((stepIndex + 1) / BUILD_STEPS.length) * 100;

  return (
    <div
      className="relative overflow-hidden border border-[var(--line)] bg-[var(--surface)]"
      role="status"
      aria-live="polite"
      aria-busy={step !== "seal"}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 75%)",
        }}
      />

      <div className="relative border-b border-[var(--line)] px-5 py-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="tech-label text-[11px] text-[var(--signal)]">
              {copy.eyebrow}
            </p>
            <h2 className="font-display mt-2 text-3xl tracking-[-0.02em] text-[var(--carbon)] md:text-4xl">
              {copy.title}
            </h2>
            <p className="mt-2 max-w-xl text-sm text-[var(--muted)]">
              {copy.support}
            </p>
          </div>
          <p className="tech-label text-[10px] text-[var(--muted)]">
            PROJECT / {blueprintId}
          </p>
        </div>
        <div className="mt-5 h-1 overflow-hidden bg-[var(--surface-2)]">
          <motion.div
            className="h-full bg-[var(--signal)]"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: reduced ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      <div className="relative grid gap-0 lg:grid-cols-[0.9fr_1.1fr_0.95fr]">
        <ol className="space-y-0 border-b border-[var(--line)] p-5 md:p-6 lg:border-b-0 lg:border-e">
          {BUILD_STEPS.map((id, index) => {
            const status =
              index < stepIndex ? "done" : index === stepIndex ? "active" : "pending";
            return (
              <li
                key={id}
                className="flex items-start gap-3 border-b border-[var(--line)] py-3 last:border-b-0"
              >
                <span
                  aria-hidden
                  className={`mt-0.5 flex size-5 shrink-0 items-center justify-center tech-label text-[9px] ${
                    status === "done"
                      ? "bg-[var(--signal)] text-white"
                      : status === "active"
                        ? "border border-[var(--signal)] text-[var(--signal)]"
                        : "border border-[var(--line)] text-[var(--muted)]"
                  }`}
                >
                  {status === "done" ? "✓" : String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-sm font-medium ${
                      status === "pending"
                        ? "text-[var(--muted)]"
                        : "text-[var(--foreground)]"
                    }`}
                  >
                    {copy.steps[id]}
                  </p>
                  {status === "active" && !reduced ? (
                    <motion.span
                      className="mt-1 block h-0.5 w-16 bg-[var(--signal)]"
                      initial={{ scaleX: 0, originX: 0 }}
                      animate={{ scaleX: [0, 1, 0.35, 1] }}
                      transition={{ duration: 1.1, repeat: Infinity }}
                    />
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>

        <div className="min-h-[320px] border-b border-[var(--line)] p-5 md:p-6 lg:border-b-0 lg:border-e lg:max-h-[520px] lg:overflow-y-auto">
          <LiveBlueprint
            snapshot={revealed}
            lastMutation={mutationFor(step)}
            labels={labels}
          />
        </div>

        <div className="flex min-h-[320px] flex-col p-5 md:p-6">
          <div className="flex items-center justify-between gap-3 border border-[var(--line)] bg-[var(--paper-soft)] px-3 py-2">
            <div className="flex min-w-0 items-center gap-2">
              <span aria-hidden className="flex gap-1">
                <span className="size-2 rounded-full bg-[var(--line-strong)]" />
                <span className="size-2 rounded-full bg-[var(--line-strong)]" />
                <span className="size-2 rounded-full bg-[var(--volt)]" />
              </span>
              <p className="truncate tech-label text-[10px] text-[var(--ink)]">
                {copy.fileLabel}
              </p>
            </div>
            <p className="shrink-0 tech-label text-[9px] text-[var(--signal)]">
              {step === "seal" || typedChars >= markdown.length
                ? copy.done
                : copy.writing}
            </p>
          </div>

          <div className="relative mt-0 flex-1 overflow-hidden border border-t-0 border-[var(--line)] bg-[color-mix(in_oklab,var(--carbon)_96%,black)]">
            <pre
              className="h-full max-h-[320px] overflow-hidden p-4 font-mono text-[11px] leading-relaxed text-[color-mix(in_oklab,white_78%,transparent)] md:max-h-[380px]"
              dir="auto"
            >
              <AnimatePresence mode="popLayout">
                <motion.code
                  key={`${step}-${typedChars > 0 ? "typing" : "idle"}`}
                  initial={false}
                  animate={{ opacity: 1 }}
                >
                  {visibleMarkdown || (
                    <span className="text-[color-mix(in_oklab,white_35%,transparent)]">
                      {stepIndex < BUILD_STEPS.indexOf("markdown")
                        ? copy.waiting
                        : ""}
                    </span>
                  )}
                  {(step === "markdown" ||
                    (step === "seal" && typedChars < markdown.length)) &&
                  !reduced ? (
                    <motion.span
                      aria-hidden
                      className="ms-0.5 inline-block h-3 w-1.5 translate-y-0.5 bg-[var(--signal)]"
                      animate={{ opacity: [1, 0.15, 1] }}
                      transition={{ duration: 0.7, repeat: Infinity }}
                    />
                  ) : null}
                </motion.code>
              </AnimatePresence>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

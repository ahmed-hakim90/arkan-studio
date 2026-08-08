"use client";

import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Project } from "@/content/types";
import { BlueprintBuildSequence } from "@/components/start/BlueprintBuildSequence";
import {
  LiveBlueprint,
  type BlueprintMutation,
} from "@/components/start/LiveBlueprint";
import { Link } from "@/i18n/navigation";
import {
  buildBlueprintMarkdown,
  downloadMarkdownFile,
} from "@/lib/blueprint-markdown";
import { matchProjectsByBriefFromList } from "@/lib/content/match";
import { usePrefersReducedMotion } from "@/lib/motion";
import type { LocaleKey } from "@/lib/site";

const STORAGE_KEY = "arkan_project_brief_v3";

const STEP_IDS = [
  "type",
  "stage",
  "roles",
  "workflows",
  "integrations",
  "intelligence",
  "scale",
  "priorities",
  "problem",
  "delivery",
  "contact",
] as const;

const TYPE_DEEP_LINKS = [
  "operations",
  "commerce",
  "platform",
  "business",
  "ai",
  "experience",
  "mobile",
] as const;

type StepId = (typeof STEP_IDS)[number];

type BriefState = {
  projectTypes: string[];
  stage: string;
  roles: string[];
  workflows: string[];
  integrations: string[];
  intelligence: string[];
  scale: {
    users: string;
    locations: string;
    languages: string;
  };
  priorities: string[];
  problemNarrative: string;
  targetLaunch: string;
  budget: string;
  existingTeam: string;
  existingSoftware: string;
  hasDoc: boolean;
  docNote: string;
  customRole: string;
  consent: boolean;
  contact: {
    name: string;
    company: string;
    email: string;
    phone: string;
    country: string;
    preferredChannel: string;
    notes: string;
  };
};

const initialState: BriefState = {
  projectTypes: [],
  stage: "",
  roles: [],
  workflows: [],
  integrations: [],
  intelligence: [],
  scale: { users: "", locations: "", languages: "both" },
  priorities: [],
  problemNarrative: "",
  targetLaunch: "",
  budget: "tbd",
  existingTeam: "",
  existingSoftware: "",
  hasDoc: false,
  docNote: "",
  customRole: "",
  consent: false,
  contact: {
    name: "",
    company: "",
    email: "",
    phone: "",
    country: "",
    preferredChannel: "either",
    notes: "",
  },
};

function toggle(list: string[], value: string): string[] {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

function complexityOf(state: BriefState): "low" | "medium" | "high" {
  const score =
    state.roles.length +
    state.workflows.length +
    state.integrations.filter((i) => i !== "unsure").length +
    state.intelligence.filter((i) => i !== "unsure").length +
    (state.scale.locations === "multiCountry"
      ? 2
      : state.scale.locations === "multi"
        ? 1
        : 0);
  if (score >= 12) return "high";
  if (score >= 6) return "medium";
  return "low";
}

function readingKey(state: BriefState): string {
  const primary = state.projectTypes[0] ?? "default";
  if (
    ["operations", "business", "platform", "commerce", "ai", "experience"].includes(
      primary,
    )
  ) {
    return primary;
  }
  if (primary === "mobile") return "platform";
  return "default";
}

function contactReady(state: BriefState): boolean {
  return (
    state.consent &&
    state.contact.name.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.contact.email)
  );
}

function bootstrapBrief(searchParams: URLSearchParams): {
  state: BriefState;
  stepIndex: number;
} {
  let nextState = { ...initialState };
  let nextStep = 0;
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as {
          state?: BriefState;
          stepIndex?: number;
        };
        if (parsed.state) nextState = { ...initialState, ...parsed.state };
        if (typeof parsed.stepIndex === "number") {
          nextStep = Math.min(
            Math.max(0, parsed.stepIndex),
            STEP_IDS.length - 1,
          );
        }
      }
    } catch {
      /* ignore */
    }
  }

  const typeParam = searchParams.get("type");
  if (
    typeParam &&
    (TYPE_DEEP_LINKS as readonly string[]).includes(typeParam)
  ) {
    nextState = { ...nextState, projectTypes: [typeParam] };
    nextStep = 0;
  }

  return { state: nextState, stepIndex: nextStep };
}


type OptionGridProps = {
  step: StepId;
  options: string[];
  values: string[];
  onToggle: (value: string) => void;
  single?: boolean;
  descriptions?: boolean;
  labelFor: (option: string) => string;
  descriptionFor?: (option: string) => string;
};

function OptionGrid({
  options,
  values,
  onToggle,
  descriptions,
  labelFor,
  descriptionFor,
}: OptionGridProps) {
  return (
    <div className={descriptions ? "grid gap-3" : "flex flex-wrap gap-2"}>
      {options.map((option) => {
        const active = values.includes(option);
        return (
          <button
            key={option}
            type="button"
            onClick={() => onToggle(option)}
            className={
              descriptions
                ? `structural-row group flex min-h-11 w-full gap-3 px-4 py-3 text-start transition ${
                    active
                      ? "bg-[color-mix(in_oklab,var(--signal-soft)_45%,transparent)]"
                      : "bg-transparent hover:bg-[var(--surface)]"
                  }`
                : "filter-chip text-sm"
            }
            data-active={active ? "true" : "false"}
          >
            {descriptions ? (
              <span
                aria-hidden
                className={`mt-1 h-8 w-0.5 shrink-0 ${
                  active ? "bg-[var(--signal)]" : "bg-transparent"
                }`}
              />
            ) : null}
            <span className="min-w-0 flex-1">
              <span className={descriptions ? "block font-medium" : undefined}>
                {labelFor(option)}
              </span>
              {descriptions && descriptionFor ? (
                <span className="mt-1 block text-sm text-[var(--muted)]">
                  {descriptionFor(option)}
                </span>
              ) : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}

type Props = {
  projects: Project[];
  whatsapp: string;
  contactEmail: string;
};

export function BriefIntake({
  projects,
  whatsapp,
}: Props) {
  const t = useTranslations("Start");
  const locale = useLocale() as LocaleKey;
  const baseId = useId();
  const searchParams = useSearchParams();
  const [boot] = useState(() => bootstrapBrief(searchParams));
  const [stepIndex, setStepIndex] = useState(boot.stepIndex);
  const [state, setState] = useState<BriefState>(boot.state);
  const [honeypot, setHoneypot] = useState("");
  const [phase, setPhase] = useState<"form" | "architecting" | "blueprint" | "done">(
    "form",
  );
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [blueprintId, setBlueprintId] = useState("");
  const [blueprintOpen, setBlueprintOpen] = useState(false);
  const [lastMutation, setLastMutation] = useState<BlueprintMutation>(null);
  const prevState = useRef<BriefState | null>(null);
  const persistReady = useRef(false);
  const reduced = usePrefersReducedMotion();

  const step = STEP_IDS[stepIndex];

  useEffect(() => {
    persistReady.current = true;
  }, []);

  useEffect(() => {
    if (!persistReady.current) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ state, stepIndex }),
      );
    } catch {
      /* ignore */
    }
  }, [state, stepIndex]);

  useEffect(() => {
    const prev = prevState.current;
    prevState.current = state;
    if (!prev) return;

    const checks: [BlueprintMutation, boolean][] = [
      ["type", prev.projectTypes.join() !== state.projectTypes.join()],
      ["stage", prev.stage !== state.stage],
      ["roles", prev.roles.join() !== state.roles.join()],
      ["workflows", prev.workflows.join() !== state.workflows.join()],
      ["integrations", prev.integrations.join() !== state.integrations.join()],
      ["intelligence", prev.intelligence.join() !== state.intelligence.join()],
      [
        "scale",
        prev.scale.users !== state.scale.users ||
          prev.scale.locations !== state.scale.locations ||
          prev.scale.languages !== state.scale.languages,
      ],
      ["priorities", prev.priorities.join() !== state.priorities.join()],
      ["problem", prev.problemNarrative !== state.problemNarrative],
      [
        "delivery",
        prev.targetLaunch !== state.targetLaunch ||
          prev.budget !== state.budget ||
          prev.existingTeam !== state.existingTeam ||
          prev.existingSoftware !== state.existingSoftware ||
          prev.hasDoc !== state.hasDoc,
      ],
      [
        "contact",
        prev.contact.name !== state.contact.name ||
          prev.contact.email !== state.contact.email,
      ],
    ];
    const hit = checks.find(([, changed]) => changed)?.[0] ?? null;
    if (hit) setLastMutation(hit);
  }, [state]);

  const matched = useMemo(
    () =>
      matchProjectsByBriefFromList(
        projects,
        {
          projectTypes: state.projectTypes,
          workflows: state.workflows,
          integrations: state.integrations,
          roles: state.roles,
        },
        2,
      ),
    [projects, state],
  );

  const complexity = complexityOf(state);
  const readKey = readingKey(state);

  const blueprintLabels = useMemo(
    () => ({
      live: t("liveBlueprint"),
      project: t("blueprint.project"),
      users: t("blueprint.users"),
      flows: t("blueprint.flows"),
      integrations: t("blueprint.integrations"),
      intelligence: t("blueprint.intelligence"),
      priority: t("blueprint.priority"),
      complexity: t("blueprint.complexity"),
      empty: "—",
      ready: t("briefReady"),
    }),
    [t],
  );

  const blueprintSnapshot = useMemo(() => {
    const translateList = (
      stepKey:
        | "type"
        | "roles"
        | "workflows"
        | "integrations"
        | "intelligence"
        | "priorities",
      values: string[],
    ) =>
      values.map((value) => {
        try {
          return t(`steps.${stepKey}.options.${value}` as never);
        } catch {
          return value;
        }
      });

    return {
      projectTypes: translateList("type", state.projectTypes),
      stage: state.stage
        ? t(`steps.stage.options.${state.stage}` as never)
        : "",
      roles: translateList("roles", state.roles),
      workflows: translateList("workflows", state.workflows),
      integrations: translateList(
        "integrations",
        state.integrations.filter((i) => i !== "unsure"),
      ),
      intelligence: translateList(
        "intelligence",
        state.intelligence.filter((i) => i !== "unsure"),
      ),
      priorities: translateList("priorities", state.priorities),
      complexityLabel: t(`complexityLevels.${complexity}`),
      ready: step === "contact" && contactReady(state),
    };
  }, [state, complexity, step, t]);

  function canAdvance(): boolean {
    if (step === "type") return state.projectTypes.length > 0;
    if (step === "stage") return Boolean(state.stage);
    if (step === "roles") return state.roles.length > 0;
    if (step === "workflows") return state.workflows.length > 0;
    if (step === "priorities") return state.priorities.length > 0;
    if (step === "problem") return state.problemNarrative.trim().length >= 20;
    if (step === "contact") return contactReady(state);
    return true;
  }

  function showBlueprint() {
    if (!contactReady(state)) {
      setStatus("error");
      return;
    }
    if (state.problemNarrative.trim().length < 20) {
      setStatus("error");
      return;
    }
    setStatus("idle");
    const id = `ARK-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    setBlueprintId(id);
    setPhase("architecting");
  }

  const blueprintMarkdown = useMemo(() => {
    if (!blueprintId) return "";
    return buildBlueprintMarkdown({
      id: blueprintId,
      locale: locale === "ar" ? "ar" : "en",
      projectTypes: blueprintSnapshot.projectTypes,
      stage: blueprintSnapshot.stage,
      roles: blueprintSnapshot.roles,
      workflows: blueprintSnapshot.workflows,
      integrations: blueprintSnapshot.integrations,
      intelligence: blueprintSnapshot.intelligence,
      priorities: blueprintSnapshot.priorities,
      complexityLabel: blueprintSnapshot.complexityLabel,
      scale: {
        users: state.scale.users
          ? t(`steps.scale.usersOptions.${state.scale.users}` as never)
          : "",
        locations: state.scale.locations
          ? t(`steps.scale.locationsOptions.${state.scale.locations}` as never)
          : "",
        languages: state.scale.languages
          ? t(`steps.scale.languagesOptions.${state.scale.languages}` as never)
          : "",
      },
      problemNarrative: state.problemNarrative,
      interpretation: t(`interpretations.${readKey}` as never),
      recommendation: t(`recommendations.${readKey}` as never),
      contact: {
        name: state.contact.name,
        company: state.contact.company,
        email: state.contact.email,
      },
    });
  }, [
    blueprintId,
    blueprintSnapshot,
    locale,
    readKey,
    state.contact.company,
    state.contact.email,
    state.contact.name,
    state.problemNarrative,
    state.scale.languages,
    state.scale.locations,
    state.scale.users,
    t,
  ]);

  const buildCopy = useMemo(
    () => ({
      eyebrow: t("buildEyebrow"),
      title: t("buildTitle"),
      support: t("buildSupport"),
      fileLabel: t("buildFileLabel", { id: blueprintId || "ARK" }),
      writing: t("buildWriting"),
      done: t("buildDone"),
      waiting: t("buildWaiting"),
      steps: {
        frame: t("buildStepFrame"),
        users: t("buildStepUsers"),
        flows: t("buildStepFlows"),
        integrations: t("buildStepIntegrations"),
        intelligence: t("buildStepIntelligence"),
        markdown: t("buildStepMarkdown"),
        seal: t("buildStepSeal"),
      },
    }),
    [blueprintId, t],
  );

  const finishArchitecting = useCallback(() => {
    setPhase("blueprint");
  }, []);

  async function submitBlueprint() {
    setStatus("sending");

    const briefMessage = [
      blueprintMarkdown.slice(0, 11000),
      "",
      "---",
      `Phone: ${state.contact.phone}`,
      `Country: ${state.contact.country}`,
      `Channel: ${state.contact.preferredChannel}`,
      `Launch: ${state.targetLaunch}; budget=${state.budget}`,
      `Existing team: ${state.existingTeam}; software: ${state.existingSoftware}`,
      state.hasDoc ? `Has document: yes; note=${state.docNote}` : "Has document: no",
      state.contact.notes ? `Notes: ${state.contact.notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const systemTypeMap: Record<
      string,
      "erp" | "pos" | "ops" | "commerce" | "ai" | "other"
    > = {
      business: "erp",
      operations: "ops",
      platform: "ops",
      commerce: "commerce",
      mobile: "other",
      ai: "ai",
      experience: "other",
      unsure: "other",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: state.contact.name,
          email: state.contact.email,
          message: briefMessage,
          systemType:
            systemTypeMap[state.projectTypes[0] ?? "unsure"] ?? "other",
          market: "egypt",
          scale:
            complexity === "high"
              ? "enterprise"
              : complexity === "medium"
                ? "growth"
                : "mvp",
          language:
            state.scale.languages === "ar" || state.scale.languages === "en"
              ? state.scale.languages
              : "both",
          website: honeypot,
          brief: state,
        }),
      });

      if (!res.ok) throw new Error("fail");
      setPhase("done");
      setStatus("idle");
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
    } catch {
      setStatus("error");
    }
  }

  if (phase === "architecting") {
    return (
      <BlueprintBuildSequence
        blueprintId={blueprintId}
        snapshot={blueprintSnapshot}
        markdown={blueprintMarkdown}
        labels={blueprintLabels}
        copy={buildCopy}
        onComplete={finishArchitecting}
      />
    );
  }

  if (phase === "blueprint" || phase === "done") {
    const renderSubmitControls = (placement: "top" | "bottom") =>
      phase === "blueprint" ? (
        <div
          key={placement}
          className="border border-[var(--signal)] bg-[color-mix(in_oklab,var(--signal-soft)_55%,var(--surface))] px-5 py-5"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 tech-label text-[10px] text-[var(--signal)]">
              <span
                aria-hidden
                className="size-1.5 animate-pulse bg-[var(--signal)]"
              />
              {t("pendingBadge")}
            </span>
          </div>
          <h3 className="font-display mt-3 text-2xl md:text-3xl">
            {t("convertTitle")}
          </h3>
          <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">
            {t("pendingHint")}
          </p>
          <p className="mt-1 max-w-2xl text-sm text-[var(--muted)]">
            {t("convertBody")}
          </p>
          <button
            type="button"
            className="btn-primary mt-5 min-h-12 px-6"
            disabled={status === "sending"}
            onClick={submitBlueprint}
          >
            {status === "sending" ? t("sending") : `${t("submit")} →`}
          </button>
          {status === "error" && placement === "top" ? (
            <p className="mt-3 text-sm text-[var(--danger)]" role="alert">
              {t("error")}
            </p>
          ) : null}
        </div>
      ) : placement === "top" ? (
        <div className="border border-[var(--ok)]/30 bg-[color-mix(in_oklab,var(--ok)_8%,white)] px-5 py-4">
          <p className="font-semibold text-[var(--ok)]">{t("successTitle")}</p>
          <p className="mt-1 text-sm text-[var(--muted)]">{t("successBody")}</p>
          <p className="mt-3 tech-label text-[10px] text-[var(--muted)]">
            PROJECT / {blueprintId}
          </p>
        </div>
      ) : null;

    return (
      <div
        className={`grid gap-10 lg:grid-cols-[1.1fr_0.9fr] ${
          phase === "blueprint" ? "pb-28" : ""
        }`}
      >
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <p className="tech-label text-[11px] text-[var(--signal)]">
              PROJECT / {blueprintId}
            </p>
            {phase === "blueprint" ? (
              <span className="tech-label text-[10px] text-[var(--muted)]">
                {t("pendingBadge")}
              </span>
            ) : null}
          </div>
          <h2 className="font-display mt-3 text-4xl">{t("blueprintTitle")}</h2>
          <p className="mt-3 max-w-2xl text-[var(--muted)]">{t("blueprintLead")}</p>

          <div className="mt-8">{renderSubmitControls("top")}</div>

          <div className="mt-8 border border-[var(--line)] bg-[var(--surface)] p-5 md:p-6">
            <LiveBlueprint
              snapshot={{ ...blueprintSnapshot, ready: true }}
              lastMutation="contact"
              labels={blueprintLabels}
            />
          </div>

          <dl className="mt-8 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {(
              [
                ["project", blueprintSnapshot.projectTypes.join(" / ")],
                ["users", blueprintSnapshot.roles.join(" / ")],
                ["flows", blueprintSnapshot.workflows.join(" / ")],
                [
                  "integrations",
                  blueprintSnapshot.integrations.join(" / ") || "—",
                ],
                ["priority", blueprintSnapshot.priorities.join(" + ")],
                ["complexity", t(`complexityLevels.${complexity}`)],
              ] as const
            ).map(([key, value]) => (
              <div key={key} className="grid gap-1 py-4 md:grid-cols-[10rem_1fr]">
                <dt className="tech-label text-[10px] text-[var(--muted)]">
                  {t(`blueprint.${key}`)}
                </dt>
                <dd className="font-medium">{value || "—"}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 overflow-hidden border border-[var(--line)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] bg-[var(--paper-soft)] px-4 py-3">
              <div>
                <p className="tech-label text-[10px] text-[var(--signal)]">
                  {t("buildMdTitle")}
                </p>
                <p className="mt-1 tech-label text-[10px] text-[var(--muted)]">
                  {t("buildFileLabel", { id: blueprintId })}
                </p>
              </div>
              <button
                type="button"
                className="btn-ghost-dark"
                onClick={() =>
                  downloadMarkdownFile(
                    `arkan-blueprint-${blueprintId}.md`,
                    blueprintMarkdown,
                  )
                }
              >
                {t("buildDownload")}
              </button>
            </div>
            <pre
              className="max-h-[280px] overflow-auto bg-[color-mix(in_oklab,var(--carbon)_96%,black)] p-4 font-mono text-[11px] leading-relaxed text-[color-mix(in_oklab,white_78%,transparent)]"
              dir="auto"
            >
              <code>{blueprintMarkdown}</code>
            </pre>
          </div>

          <div className="mt-10 border border-[var(--line)] bg-[var(--surface)] px-5 py-6">
            <p className="tech-label text-[10px] text-[var(--signal)]">
              {t("interpretationTitle")}
            </p>
            <p className="mt-3 text-[var(--muted)]">
              {t(`interpretations.${readKey}` as never)}
            </p>
          </div>

          <div className="mt-6 border border-[var(--line)] px-5 py-6">
            <p className="tech-label text-[10px] text-[var(--signal)]">
              {t("recommendationTitle")}
            </p>
            <p className="mt-3 text-[var(--muted)]">
              {t(`recommendations.${readKey}` as never)}
            </p>
          </div>

          {phase === "blueprint" ? (
            <div className="mt-10">{renderSubmitControls("bottom")}</div>
          ) : null}
        </div>

        <aside className="border border-[var(--line)] bg-[var(--surface)] p-6 lg:sticky lg:top-[calc(var(--header-offset,5rem)+1rem)] lg:self-start">
          {phase === "blueprint" ? (
            <div className="mb-6 border border-[var(--signal)] bg-[color-mix(in_oklab,var(--signal-soft)_45%,var(--surface))] px-4 py-4">
              <p className="tech-label text-[10px] text-[var(--signal)]">
                {t("pendingBadge")}
              </p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                {t("stickySubmitHint")}
              </p>
              <button
                type="button"
                className="btn-primary mt-4 w-full min-h-12"
                disabled={status === "sending"}
                onClick={submitBlueprint}
              >
                {status === "sending" ? t("sending") : `${t("submit")} →`}
              </button>
            </div>
          ) : null}
          <p className="tech-label text-[10px] text-[var(--muted)]">
            {t("matched")}
          </p>
          <div className="mt-4 space-y-4">
            {matched.map((project) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="block border-b border-[var(--line)] pb-4"
              >
                <p className="font-display text-2xl">{project.title[locale]}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {project.descriptor[locale]}
                </p>
                <p className="mt-2 text-sm font-semibold text-[var(--signal)]">
                  {t("exploreRelated")}
                </p>
              </Link>
            ))}
          </div>
          <a
            href={whatsapp}
            className="btn-ghost-dark mt-6 w-full"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
        </aside>

        {phase === "blueprint" ? (
          <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--signal)] bg-[var(--background)]/95 backdrop-blur-md lg:hidden">
            <div className="flex items-center gap-3 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              <div className="min-w-0 flex-1">
                <p className="tech-label text-[9px] text-[var(--signal)]">
                  {t("pendingBadge")}
                </p>
                <p className="truncate text-xs text-[var(--muted)]">
                  {t("stickySubmitHint")}
                </p>
              </div>
              <button
                type="button"
                className="btn-primary shrink-0 min-h-11 px-4"
                disabled={status === "sending"}
                onClick={submitBlueprint}
              >
                {status === "sending" ? t("sending") : t("submit")}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }


  const optionLabel = (option: string) =>
    t(`steps.${step}.options.${option}` as never);
  const stageDescription = (option: string) =>
    t(`steps.stage.descriptions.${option}` as never);

  const navButtons = (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        className="btn-ghost-dark"
        disabled={stepIndex === 0}
        onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
      >
        {t("back")}
      </button>
      {step !== "contact" &&
      ["integrations", "intelligence", "delivery"].includes(step) ? (
        <button
          type="button"
          className="btn-ghost-dark"
          onClick={() =>
            setStepIndex((i) => Math.min(STEP_IDS.length - 1, i + 1))
          }
        >
          {t("skip")}
        </button>
      ) : null}
      {step === "contact" ? (
        <button type="button" className="btn-primary" onClick={showBlueprint}>
          {t("next")}
        </button>
      ) : (
        <button
          type="button"
          className="btn-primary"
          disabled={!canAdvance()}
          onClick={() =>
            setStepIndex((i) => Math.min(STEP_IDS.length - 1, i + 1))
          }
        >
          {t("next")}
        </button>
      )}
    </div>
  );

  return (
    <div className="relative lg:grid lg:grid-cols-[minmax(0,54fr)_minmax(0,46fr)] lg:items-start">
      <div className="min-w-0 border-[var(--line)] pb-[var(--builder-chrome)] lg:border-e lg:pe-10 lg:pb-0">
        <p className="tech-label text-[11px] text-[var(--muted)]">
          {t("progress", { current: stepIndex + 1, total: STEP_IDS.length })}
          <span className="ms-3 text-[var(--signal)]">
            {t(`steps.${step}.title`)}
          </span>
        </p>
        <div className="mt-3 h-1 overflow-hidden bg-[var(--surface-2)]">
          <div
            className="h-full bg-[var(--signal)] transition-all duration-[240ms]"
            style={{
              width: `${((stepIndex + 1) / STEP_IDS.length) * 100}%`,
            }}
          />
        </div>

        <h2 className="font-display mt-8 text-3xl md:text-4xl">
          {t(`steps.${step}.title`)}
        </h2>
        {["type", "roles", "scale", "problem"].includes(step) ? (
          <p className="mt-3 max-w-2xl text-sm text-[var(--muted)]">
            {t(`steps.${step}.helper` as never)}
          </p>
        ) : null}

        <div className="mt-8">
          {step === "type" ? (
            <OptionGrid
              step={step}
              options={[
                "business",
                "operations",
                "platform",
                "commerce",
                "mobile",
                "ai",
                "experience",
                "unsure",
              ]}
              values={state.projectTypes}
              single
              labelFor={optionLabel}
              onToggle={(value) =>
                setState((s) => ({
                  ...s,
                  projectTypes: [value],
                }))
              }
            />
          ) : null}

          {step === "stage" ? (
            <OptionGrid
              step={step}
              options={[
                "idea",
                "newBusiness",
                "existing",
                "system",
                "replace",
                "scale",
              ]}
              values={state.stage ? [state.stage] : []}
              single
              descriptions
              labelFor={optionLabel}
              descriptionFor={stageDescription}
              onToggle={(value) => setState((s) => ({ ...s, stage: value }))}
            />
          ) : null}

          {step === "roles" ? (
            <div className="space-y-4">
              <OptionGrid
                step={step}
                options={[
                  "customers",
                  "employees",
                  "managers",
                  "field",
                  "partners",
                  "vendors",
                  "finance",
                  "admins",
                  "custom",
                ]}
                values={state.roles}
                labelFor={optionLabel}
                onToggle={(value) =>
                  setState((s) => ({ ...s, roles: toggle(s.roles, value) }))
                }
              />
              {state.roles.includes("custom") ? (
                <label className="block text-sm">
                  <span className="mb-1.5 block font-medium">
                    {t("steps.roles.customLabel")}
                  </span>
                  <input
                    className="field-input"
                    value={state.customRole}
                    maxLength={40}
                    onChange={(e) =>
                      setState((s) => ({
                        ...s,
                        customRole: e.target.value.slice(0, 40),
                      }))
                    }
                  />
                </label>
              ) : null}
            </div>
          ) : null}

          {step === "workflows" ? (
            <OptionGrid
              step={step}
              labelFor={optionLabel}
              options={[
                "orders",
                "payments",
                "bookings",
                "inventory",
                "approvals",
                "tracking",
                "field",
                "accounting",
                "reporting",
                "crm",
                "documents",
                "notifications",
                "scheduling",
                "support",
                "custom",
              ]}
              values={state.workflows}
              onToggle={(value) =>
                setState((s) => ({
                  ...s,
                  workflows: toggle(s.workflows, value),
                }))
              }
            />
          ) : null}

          {step === "integrations" ? (
            <div>
              <p className="mb-4 text-sm text-[var(--muted)]">
                {t("steps.integrations.hint")}
              </p>
              {!state.integrations.length ? (
                <p className="mb-4 tech-label text-[10px] text-[var(--muted)]">
                  {t("steps.integrations.empty")}
                </p>
              ) : null}
              <OptionGrid
                step={step}
                labelFor={optionLabel}
                options={[
                  "erp",
                  "odoo",
                  "sap",
                  "pos",
                  "payments",
                  "whatsapp",
                  "google",
                  "logistics",
                  "apis",
                  "gov",
                  "other",
                  "unsure",
                ]}
                values={state.integrations}
                onToggle={(value) =>
                  setState((s) => ({
                    ...s,
                    integrations: toggle(s.integrations, value),
                  }))
                }
              />
            </div>
          ) : null}

          {step === "intelligence" ? (
            <OptionGrid
              step={step}
              labelFor={optionLabel}
              options={[
                "documents",
                "images",
                "extract",
                "support",
                "automate",
                "search",
                "decide",
                "forecast",
                "unsure",
              ]}
              values={state.intelligence}
              onToggle={(value) =>
                setState((s) => ({
                  ...s,
                  intelligence: toggle(s.intelligence, value),
                }))
              }
            />
          ) : null}

          {step === "scale" ? (
            <div className="space-y-6">
              {(
                [
                  ["users", ["lt50", "50to500", "500to5k", "5kplus"]],
                  ["locations", ["one", "multi", "multiCountry"]],
                  ["languages", ["ar", "en", "both"]],
                ] as const
              ).map(([field, options]) => (
                <div key={field}>
                  <p className="mb-2 text-sm font-medium">
                    {t(`steps.scale.${field}`)}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {options.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          setState((s) => ({
                            ...s,
                            scale: { ...s.scale, [field]: option },
                          }))
                        }
                        className={`inline-flex min-h-11 items-center rounded-[var(--radius-sm)] border px-3 text-sm ${
                          state.scale[field] === option
                            ? "border-[var(--signal)] bg-[var(--signal)] text-white"
                            : "border-[var(--line)] bg-[var(--surface)]"
                        }`}
                      >
                        {t(`steps.scale.${field}Options.${option}`)}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {step === "priorities" ? (
            <OptionGrid
              step={step}
              labelFor={optionLabel}
              options={[
                "lessTime",
                "fewerErrors",
                "control",
                "cx",
                "scale",
                "sales",
                "cost",
                "launch",
              ]}
              values={state.priorities}
              onToggle={(value) =>
                setState((s) => ({
                  ...s,
                  priorities: toggle(s.priorities, value),
                }))
              }
            />
          ) : null}

          {step === "problem" ? (
            <label className="block text-sm">
              <textarea
                className="field-input min-h-40"
                value={state.problemNarrative}
                placeholder={t("steps.problem.placeholder")}
                onChange={(e) =>
                  setState((s) => ({
                    ...s,
                    problemNarrative: e.target.value.slice(0, 4000),
                  }))
                }
                maxLength={4000}
              />
            </label>
          ) : null}

          {step === "delivery" ? (
            <div className="space-y-6">
              {(
                [
                  ["targetLaunch", "launch", ["asap", "3m", "6m", "explore"]],
                  ["budget", "budget", ["tbd", "starter", "growth", "enterprise"]],
                  [
                    "existingTeam",
                    "existingTeam",
                    ["none", "partial", "full"],
                  ],
                  [
                    "existingSoftware",
                    "existingSoftware",
                    ["none", "partial", "system"],
                  ],
                ] as const
              ).map(([field, labelKey, options]) => (
                <div key={field}>
                  <p className="mb-2 text-sm font-medium">
                    {t(`steps.delivery.${labelKey}`)}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {options.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          setState((s) => ({ ...s, [field]: option }))
                        }
                        className={`inline-flex min-h-11 items-center rounded-[var(--radius-sm)] border px-3 text-sm ${
                          state[field] === option
                            ? "border-[var(--signal)] bg-[var(--signal)] text-white"
                            : "border-[var(--line)] bg-[var(--surface)]"
                        }`}
                      >
                        {t(`steps.delivery.${labelKey}Options.${option}`)}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <label className="flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={state.hasDoc}
                  onChange={(e) =>
                    setState((s) => ({ ...s, hasDoc: e.target.checked }))
                  }
                />
                <span>{t("steps.delivery.hasDoc")}</span>
              </label>
              {state.hasDoc ? (
                <label className="block text-sm">
                  <span className="mb-1.5 block font-medium">
                    {t("steps.delivery.docNote")}
                  </span>
                  <input
                    className="field-input"
                    value={state.docNote}
                    onChange={(e) =>
                      setState((s) => ({
                        ...s,
                        docNote: e.target.value.slice(0, 500),
                      }))
                    }
                    maxLength={500}
                  />
                </label>
              ) : null}
            </div>
          ) : null}

          {step === "contact" ? (
            <div className="grid gap-4 md:grid-cols-2">
              {(
                [
                  ["name", "name", true],
                  ["company", "company", false],
                  ["email", "email", true],
                  ["phone", "phone", true],
                  ["country", "country", false],
                ] as const
              ).map(([field, label, required]) => (
                <label key={field} className="block text-sm md:col-span-1">
                  <span className="mb-1.5 block font-medium">
                    {t(`steps.contact.${label}`)}
                    {required ? " *" : ""}
                  </span>
                  <input
                    className="field-input"
                    required={required}
                    value={state.contact[field]}
                    onChange={(e) =>
                      setState((s) => ({
                        ...s,
                        contact: { ...s.contact, [field]: e.target.value },
                      }))
                    }
                    autoComplete={field === "email" ? "email" : "on"}
                    type={field === "email" ? "email" : "text"}
                  />
                </label>
              ))}
              <label className="block text-sm md:col-span-2">
                <span className="mb-1.5 block font-medium">
                  {t("steps.contact.channel")}
                </span>
                <div className="flex flex-wrap gap-2">
                  {(["email", "whatsapp", "either"] as const).map((channel) => (
                    <button
                      key={channel}
                      type="button"
                      onClick={() =>
                        setState((s) => ({
                          ...s,
                          contact: { ...s.contact, preferredChannel: channel },
                        }))
                      }
                      className={`inline-flex min-h-11 items-center rounded-[var(--radius-sm)] border px-3 text-sm ${
                        state.contact.preferredChannel === channel
                          ? "border-[var(--signal)] bg-[var(--signal)] text-white"
                          : "border-[var(--line)] bg-[var(--surface)]"
                      }`}
                    >
                      {t(`steps.contact.channels.${channel}`)}
                    </button>
                  ))}
                </div>
              </label>
              <label className="block text-sm md:col-span-2">
                <span className="mb-1.5 block font-medium">
                  {t("steps.contact.notes")}
                </span>
                <textarea
                  className="field-input min-h-28"
                  value={state.contact.notes}
                  onChange={(e) =>
                    setState((s) => ({
                      ...s,
                      contact: { ...s.contact, notes: e.target.value },
                    }))
                  }
                />
              </label>
              <label className="flex items-start gap-3 text-sm md:col-span-2">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={state.consent}
                  onChange={(e) =>
                    setState((s) => ({ ...s, consent: e.target.checked }))
                  }
                />
                <span>{t("steps.contact.consent")}</span>
              </label>
              <input
                id={`${baseId}-hp`}
                className="sr-only"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                aria-hidden
              />
            </div>
          ) : null}
        </div>

        {status === "error" ? (
          <p className="mt-4 text-sm text-[var(--danger)]" role="alert">
            {t("error")}
          </p>
        ) : null}

        <p className="mt-6 text-xs text-[var(--muted)]">{t("privacy")}</p>

        <div className="mt-8 hidden lg:block">{navButtons}</div>
      </div>

      <aside className="relative hidden min-h-[28rem] border-s border-[var(--line)] ps-8 lg:block">
        <div className="sticky top-[calc(var(--header-offset,5rem)+1rem)] max-h-[calc(100svh-var(--header-offset,5rem)-2rem)] overflow-y-auto py-1">
          <LiveBlueprint
            snapshot={blueprintSnapshot}
            lastMutation={lastMutation}
            labels={blueprintLabels}
          />
        </div>
      </aside>

      <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
        <div
          className={`border-t border-[var(--line)] bg-[var(--surface)] shadow-[0_-8px_32px_rgba(18,20,26,0.08)] ${
            reduced
              ? ""
              : "transition-[height] duration-[240ms] ease-[var(--ease-standard)]"
          } ${blueprintOpen ? "h-[70vh]" : "h-[88px]"}`}
        >
          <button
            type="button"
            className="flex h-[88px] w-full items-stretch text-start"
            onClick={() => setBlueprintOpen((open) => !open)}
            aria-expanded={blueprintOpen}
          >
            <LiveBlueprint
              snapshot={blueprintSnapshot}
              lastMutation={lastMutation}
              labels={blueprintLabels}
              mode="peek"
            />
            <span className="flex items-center pe-4 tech-label text-[10px] text-[var(--signal)]">
              {blueprintOpen ? t("blueprintCollapse") : t("blueprintExpand")}
            </span>
          </button>
          {blueprintOpen ? (
            <div className="h-[calc(70vh-88px)] overflow-y-auto px-4 pb-4">
              <LiveBlueprint
                snapshot={blueprintSnapshot}
                lastMutation={lastMutation}
                labels={blueprintLabels}
              />
            </div>
          ) : null}
        </div>
        <div className="border-t border-[var(--line)] bg-[var(--background)] px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          {navButtons}
        </div>
      </div>
    </div>
  );
}

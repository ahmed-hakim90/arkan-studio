"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useId, useMemo, useState } from "react";
import { matchProjectsByBrief } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import { siteConfig, type LocaleKey } from "@/lib/site";

const STORAGE_KEY = "arkan_project_brief_v1";

const STEP_IDS = [
  "type",
  "stage",
  "roles",
  "workflows",
  "integrations",
  "intelligence",
  "scale",
  "priorities",
  "delivery",
  "contact",
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
  targetLaunch: string;
  budget: string;
  decision: string;
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
  targetLaunch: "",
  budget: "tbd",
  decision: "",
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
    (state.scale.locations === "multiCountry" ? 2 : state.scale.locations === "multi" ? 1 : 0);
  if (score >= 12) return "high";
  if (score >= 6) return "medium";
  return "low";
}

export function BriefIntake() {
  const t = useTranslations("Start");
  const locale = useLocale() as LocaleKey;
  const baseId = useId();
  const [stepIndex, setStepIndex] = useState(0);
  const [state, setState] = useState<BriefState>(initialState);
  const [honeypot, setHoneypot] = useState("");
  const [phase, setPhase] = useState<"form" | "architecting" | "blueprint" | "done">(
    "form",
  );
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [blueprintId, setBlueprintId] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [blueprintOpen, setBlueprintOpen] = useState(false);

  const step = STEP_IDS[stepIndex];

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as {
          state?: BriefState;
          stepIndex?: number;
        };
        if (parsed.state) setState({ ...initialState, ...parsed.state });
        if (typeof parsed.stepIndex === "number") setStepIndex(parsed.stepIndex);
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ state, stepIndex }),
      );
    } catch {
      /* ignore */
    }
  }, [state, stepIndex, hydrated]);

  const matched = useMemo(
    () =>
      matchProjectsByBrief(
        {
          projectTypes: state.projectTypes,
          workflows: state.workflows,
          integrations: state.integrations,
          roles: state.roles,
        },
        2,
      ),
    [state],
  );

  const complexity = complexityOf(state);

  function OptionGrid({
    options,
    values,
    onToggle,
    single,
  }: {
    options: string[];
    values: string[];
    onToggle: (value: string) => void;
    single?: boolean;
  }) {
    return (
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = values.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => {
                if (single) onToggle(option);
                else onToggle(option);
              }}
              className={`rounded-[var(--radius-sm)] border px-3 py-2 text-sm font-medium transition ${
                active
                  ? "border-[var(--signal)] bg-[var(--signal)] text-white"
                  : "border-[var(--line)] bg-[var(--surface)] hover:border-[var(--signal)]"
              }`}
            >
              {t(`steps.${step}.options.${option}` as never)}
            </button>
          );
        })}
      </div>
    );
  }

  function showBlueprint() {
    if (state.contact.name.trim().length < 2) {
      setStatus("error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.contact.email)) {
      setStatus("error");
      return;
    }
    setStatus("idle");
    setPhase("architecting");
    window.setTimeout(() => {
      const id = `ARK-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
      setBlueprintId(id);
      setPhase("blueprint");
    }, 800);
  }

  async function submitBlueprint() {
    setStatus("sending");

    const briefMessage = [
      `BLUEPRINT / ${blueprintId}`,
      `Types: ${state.projectTypes.join(", ")}`,
      `Stage: ${state.stage}`,
      `Roles: ${state.roles.join(", ")}`,
      `Workflows: ${state.workflows.join(", ")}`,
      `Integrations: ${state.integrations.join(", ") || "none"}`,
      `Intelligence: ${state.intelligence.join(", ")}`,
      `Scale: users=${state.scale.users}; locations=${state.scale.locations}; languages=${state.scale.languages}`,
      `Priorities: ${state.priorities.join(", ")}`,
      `Launch: ${state.targetLaunch}; budget=${state.budget}; decision=${state.decision}`,
      `Company: ${state.contact.company}`,
      `Phone: ${state.contact.phone}`,
      `Country: ${state.contact.country}`,
      `Channel: ${state.contact.preferredChannel}`,
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
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="tech-label text-[12px] text-[var(--signal)]">
          {t("architecting")}
        </p>
      </div>
    );
  }

  if (phase === "blueprint" || phase === "done") {
    return (
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="tech-label text-[11px] text-[var(--signal)]">
            BLUEPRINT / {blueprintId}
          </p>
          <h2 className="font-display mt-3 text-4xl">{t("blueprintTitle")}</h2>
          <dl className="mt-8 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {(
              [
                ["project", state.projectTypes.join(" / ")],
                ["stage", state.stage],
                ["users", state.roles.join(" / ")],
                ["flows", state.workflows.join(" / ")],
                ["integrations", state.integrations.join(" / ") || "—"],
                ["intelligence", state.intelligence.join(" / ")],
                ["scale", state.scale.locations || state.scale.users],
                ["priority", state.priorities.join(" + ")],
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

          {phase === "blueprint" ? (
            <button
              type="button"
              className="btn-primary mt-8"
              disabled={status === "sending"}
              onClick={submitBlueprint}
            >
              {status === "sending" ? t("sending") : `${t("submit")} →`}
            </button>
          ) : (
            <div className="mt-8 border border-[var(--ok)]/30 bg-[color-mix(in_oklab,var(--ok)_8%,white)] px-5 py-4">
              <p className="font-semibold text-[var(--ok)]">{t("successTitle")}</p>
              <p className="mt-1 text-sm text-[var(--muted)]">{t("successBody")}</p>
              <p className="mt-3 tech-label text-[10px] text-[var(--muted)]">
                BLUEPRINT / {blueprintId} · RECEIVED
              </p>
            </div>
          )}
          {status === "error" ? (
            <p className="mt-4 text-sm text-[var(--danger)]" role="alert">
              {t("error")}
            </p>
          ) : null}
        </div>

        <aside className="border border-[var(--line)] bg-[var(--surface)] p-6">
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
                  {t("matchedBody")}
                </p>
                <p className="mt-2 text-sm font-semibold text-[var(--signal)]">
                  {t("exploreRelated")}
                </p>
              </Link>
            ))}
          </div>
          <a
            href={siteConfig.whatsapp}
            className="btn-ghost-dark mt-6 w-full"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("whatsapp")}
          </a>
        </aside>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
      <div>
        <p className="tech-label text-[11px] text-[var(--muted)]">
          {t("progress", { current: stepIndex + 1, total: STEP_IDS.length })}
        </p>
        <div className="mt-3 h-1 overflow-hidden bg-[var(--surface-2)]">
          <div
            className="h-full bg-[var(--signal)] transition-all duration-[var(--motion-base)]"
            style={{
              width: `${((stepIndex + 1) / STEP_IDS.length) * 100}%`,
            }}
          />
        </div>

        <h2 className="font-display mt-8 text-3xl md:text-4xl">
          {t(`steps.${step}.title`)}
        </h2>

        <div className="mt-8">
          {step === "type" ? (
            <OptionGrid
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
              onToggle={(value) =>
                setState((s) => ({
                  ...s,
                  projectTypes: toggle(s.projectTypes, value),
                }))
              }
            />
          ) : null}

          {step === "stage" ? (
            <OptionGrid
              options={["idea", "new", "existing", "system", "replace", "scale"]}
              values={state.stage ? [state.stage] : []}
              single
              onToggle={(value) => setState((s) => ({ ...s, stage: value }))}
            />
          ) : null}

          {step === "roles" ? (
            <OptionGrid
              options={[
                "customers",
                "employees",
                "managers",
                "admins",
                "vendors",
                "partners",
                "field",
                "finance",
                "custom",
              ]}
              values={state.roles}
              onToggle={(value) =>
                setState((s) => ({ ...s, roles: toggle(s.roles, value) }))
              }
            />
          ) : null}

          {step === "workflows" ? (
            <OptionGrid
              options={[
                "orders",
                "payments",
                "bookings",
                "inventory",
                "approvals",
                "field",
                "tracking",
                "notifications",
                "reporting",
                "crm",
                "accounting",
                "documents",
                "support",
                "scheduling",
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
                options={[
                  "erp",
                  "odoo",
                  "sap",
                  "payments",
                  "pos",
                  "whatsapp",
                  "google",
                  "apis",
                  "gov",
                  "logistics",
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
              options={[
                "automate",
                "documents",
                "images",
                "support",
                "forecast",
                "recommend",
                "decide",
                "search",
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
                        className={`rounded-[var(--radius-sm)] border px-3 py-2 text-sm ${
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
              options={[
                "speed",
                "scalability",
                "automation",
                "control",
                "cx",
                "cost",
                "integration",
                "reliability",
                "growth",
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

          {step === "delivery" ? (
            <div className="space-y-6">
              {(
                [
                  ["targetLaunch", "launch", ["asap", "3m", "6m", "explore"]],
                  ["budget", "budget", ["tbd", "starter", "growth", "enterprise"]],
                  ["decision", "decision", ["exploring", "comparing", "ready"]],
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
                        className={`rounded-[var(--radius-sm)] border px-3 py-2 text-sm ${
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
            </div>
          ) : null}

          {step === "contact" ? (
            <div className="grid gap-4 md:grid-cols-2">
              {(
                [
                  ["name", "name", true],
                  ["company", "company", false],
                  ["email", "email", true],
                  ["phone", "phone", false],
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
                      className={`rounded-[var(--radius-sm)] border px-3 py-2 text-sm ${
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

        <div className="mt-8 flex flex-wrap gap-3">
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
            <button
              type="button"
              className="btn-primary"
              onClick={showBlueprint}
            >
              {t("next")}
            </button>
          ) : (
            <button
              type="button"
              className="btn-primary"
              onClick={() =>
                setStepIndex((i) => Math.min(STEP_IDS.length - 1, i + 1))
              }
            >
              {t("next")}
            </button>
          )}
        </div>
      </div>

      <aside className="h-fit border border-[var(--line)] bg-[var(--surface)] lg:sticky lg:top-24">
        <button
          type="button"
          className="flex w-full items-center justify-between px-6 py-4 text-start lg:pointer-events-none"
          onClick={() => setBlueprintOpen((open) => !open)}
          aria-expanded={blueprintOpen}
        >
          <span className="tech-label text-[10px] text-[var(--muted)]">
            {t("liveBlueprint")}
          </span>
          <span className="tech-label text-[10px] text-[var(--signal)] lg:hidden">
            {blueprintOpen ? "−" : "+"}
          </span>
        </button>
        <div
          className={`px-6 pb-6 ${
            blueprintOpen ? "block" : "hidden lg:block"
          }`}
        >
          <div className="space-y-3">
            <BlueprintNode
              label={t("blueprint.project")}
              value={state.projectTypes.join(" · ") || "—"}
            />
            <BlueprintNode
              label={t("blueprint.users")}
              value={state.roles.join(" · ") || "—"}
            />
            <BlueprintNode
              label={t("blueprint.flows")}
              value={state.workflows.join(" · ") || "—"}
            />
            <BlueprintNode
              label={t("blueprint.integrations")}
              value={state.integrations.join(" · ") || "—"}
            />
            <BlueprintNode
              label={t("blueprint.intelligence")}
              value={state.intelligence.join(" · ") || "—"}
            />
            <BlueprintNode
              label={t("blueprint.complexity")}
              value={t(`complexityLevels.${complexity}`)}
              signal
            />
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {state.roles.slice(0, 6).map((role) => (
              <span
                key={role}
                className="rounded-[var(--radius-xs)] border border-[var(--line-signal)] px-2 py-1 tech-label text-[9px] text-[var(--signal)]"
              >
                {role.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}

function BlueprintNode({
  label,
  value,
  signal,
}: {
  label: string;
  value: string;
  signal?: boolean;
}) {
  return (
    <div className="border-b border-[var(--line)] pb-3">
      <p className="tech-label text-[9px] text-[var(--muted)]">{label}</p>
      <p
        className={`mt-1 text-sm font-medium ${
          signal ? "text-[var(--signal)]" : "text-[var(--foreground)]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import type { Project } from "@/content/types";
import { usePrefersReducedMotion } from "@/lib/motion";
import { useTilt3D } from "@/lib/useTilt3D";

type Props = {
  project?: Project | null;
  className?: string;
  /** `compact` keeps the same composition with tighter padding for Control Room. */
  density?: "default" | "compact";
};

function categoryLabel(id: string): string {
  const token = id.split(/[-_/]/).filter(Boolean).pop() ?? id;
  return token.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 10) || "MOD";
}

/** Architectural system map — same grid order everywhere; denser cards on small screens. */
export function LivingSystemCanvas({
  project,
  className = "",
  density = "default",
}: Props) {
  const locale = useLocale() as "ar" | "en";
  const reduced = usePrefersReducedMotion();
  const compact = density === "compact";
  const tilt = useTilt3D({ maxDeg: compact ? 4 : 7, disabled: reduced });
  const modules = (project?.modules ?? []).slice(0, 6);
  const labels =
    modules.length > 0
      ? modules.map((m) => ({
          id: categoryLabel(m.id),
          name: m.name[locale],
        }))
      : [
          { id: "INTAKE", name: locale === "ar" ? "استقبال" : "Intake" },
          { id: "TICKET", name: locale === "ar" ? "تذكرة" : "Ticket" },
          { id: "PARKING", name: locale === "ar" ? "مواقف" : "Parking" },
          { id: "DISPATCH", name: locale === "ar" ? "توجيه" : "Dispatch" },
          { id: "PAYMENT", name: locale === "ar" ? "دفع" : "Payment" },
          { id: "OPS", name: locale === "ar" ? "تشغيل" : "Ops" },
        ];

  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [pulseIndex, setPulseIndex] = useState(0);
  const activeIndex = hoverIndex ?? pulseIndex;
  const systemId = project?.id ?? "SYS-00";

  useEffect(() => {
    if (reduced || hoverIndex !== null) return;
    const id = window.setInterval(() => {
      setPulseIndex((i) => (i + 1) % labels.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, [reduced, hoverIndex, labels.length]);

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${compact ? "" : "min-h-[280px]"} ${className}`}
      aria-hidden
      {...tilt.handlers}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
          backgroundSize: compact ? "36px 36px" : "48px 48px",
          transform: "translateZ(-40px)",
        }}
      />
      <div
        className="pointer-events-none absolute -inset-[20%] opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(193,18,31,0.18), transparent 55%)",
        }}
      />

      <div
        className={
          compact
            ? "absolute inset-2 flex flex-col sm:inset-3"
            : "absolute inset-2.5 flex flex-col sm:inset-4 md:inset-6 lg:inset-8"
        }
        style={tilt.style}
      >
        <div className="flex items-start justify-between gap-2 sm:gap-3">
          <p
            className={`tech-label text-white/40 ${compact ? "text-[8px]" : "text-[9px] sm:text-[10px]"}`}
          >
            SYSTEM MAP / {systemId}
          </p>
          <p
            className={`tech-label shrink-0 text-white/30 ${compact ? "text-[8px]" : "text-[9px] sm:text-[10px]"}`}
          >
            X:12 · Y:04 · L:03
            <span className="ms-1.5 text-[var(--oxide)] sm:ms-2">
              · LIVE / {String(activeIndex + 1).padStart(2, "0")}
            </span>
          </p>
        </div>

        <div
          className={`relative flex min-h-0 flex-1 flex-col justify-center [transform-style:preserve-3d] ${compact ? "mt-2" : "mt-3 sm:mt-6"}`}
        >
          <div className="absolute start-1/2 top-2 bottom-2 w-px -translate-x-px bg-white/15" />

          <motion.div
            className={`relative z-[2] mx-auto inline-flex w-fit items-center border border-white/20 bg-[var(--carbon)]/85 ${
              compact
                ? "mb-1.5 gap-1.5 px-2 py-1"
                : "mb-2 gap-1.5 px-2 py-1 sm:mb-4 sm:gap-2 sm:px-3 sm:py-2"
            }`}
            style={{ transform: "translateZ(28px)" }}
            animate={
              reduced
                ? undefined
                : {
                    boxShadow: [
                      "0 0 0 0 rgba(193,18,31,0)",
                      "0 0 0 1px rgba(193,18,31,0.35)",
                      "0 0 0 0 rgba(193,18,31,0)",
                    ],
                  }
            }
            transition={
              reduced
                ? undefined
                : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <span className={`bg-[var(--oxide)] ${compact ? "size-1" : "size-1 sm:size-1.5"}`} />
            <span
              className={`tech-label text-white/80 ${compact ? "text-[8px]" : "text-[8px] sm:text-[10px]"}`}
            >
              CORE / RUNTIME
            </span>
          </motion.div>

          <div
            className={`relative z-[2] grid grid-cols-3 ${compact ? "gap-1" : "gap-1 sm:gap-2"}`}
            style={{ transform: "translateZ(18px)" }}
          >
            {labels.map((mod, index) => {
              const on = activeIndex === index;
              const depth = on ? 36 : 12 + (index % 3) * 6;
              return (
                <motion.button
                  key={mod.id}
                  type="button"
                  tabIndex={-1}
                  onPointerEnter={() => setHoverIndex(index)}
                  onPointerLeave={() => setHoverIndex(null)}
                  onFocus={() => setHoverIndex(index)}
                  onBlur={() => setHoverIndex(null)}
                  className={`relative border text-start transition-[border-color,background,transform] duration-300 ${
                    compact ? "px-1.5 py-1.5" : "px-1.5 py-1.5 sm:px-3 sm:py-3"
                  } ${
                    on
                      ? "border-[var(--oxide)]/80 bg-white/[0.09]"
                      : "border-white/15 bg-white/[0.03] hover:border-white/35"
                  }`}
                  style={{
                    transform: `translateZ(${depth}px)`,
                    transformStyle: "preserve-3d",
                  }}
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: reduced ? 0 : 0.12 + index * 0.05,
                    duration: 0.35,
                  }}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className={`tech-label text-white/45 ${compact ? "text-[7px]" : "text-[7px] sm:text-[9px]"}`}
                    >
                      MOD / {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`tech-label truncate ${compact ? "text-[7px]" : "text-[7px] sm:text-[9px]"} ${
                        on ? "text-[var(--oxide)]" : "text-white/30"
                      }`}
                    >
                      {mod.id}
                    </span>
                  </div>
                  <p
                    className={`truncate font-medium leading-tight text-white/88 ${
                      compact
                        ? "mt-0.5 text-[10px]"
                        : "mt-1 text-[11px] sm:mt-2 sm:text-sm"
                    }`}
                  >
                    {mod.name}
                  </p>
                  <span
                    aria-hidden
                    className={`block h-px origin-left bg-[var(--oxide)] transition-all duration-300 ${
                      compact ? "mt-1" : "mt-1.5 sm:mt-3"
                    } ${on ? "w-full opacity-100" : "w-0 opacity-0"}`}
                  />
                  {on && !reduced ? (
                    <motion.span
                      className="pointer-events-none absolute inset-0 border border-[var(--oxide)]/40"
                      initial={{ opacity: 0.6 }}
                      animate={{ opacity: [0.15, 0.55, 0.15] }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ) : null}
                </motion.button>
              );
            })}
          </div>

          <svg
            className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M50 8 L50 22 L18 22 L18 42 L50 42 L50 62 L82 62 L82 82"
              fill="none"
              stroke="var(--oxide)"
              strokeWidth="0.35"
              strokeOpacity="0.7"
              initial={reduced ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.35 }
              }
            />
            {!reduced ? (
              <motion.circle
                r="1.2"
                fill="var(--oxide)"
                animate={{
                  cx: [50, 50, 18, 18, 50, 50, 82, 82],
                  cy: [8, 22, 22, 42, 42, 62, 62, 82],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ) : null}
          </svg>
        </div>

        <div
          className={`flex flex-wrap gap-x-3 gap-y-1 border-t border-white/10 ${
            compact
              ? "mt-1.5 pt-1.5"
              : "mt-2.5 pt-2 sm:mt-4 sm:gap-x-4 sm:pt-3"
          }`}
          style={{ transform: "translateZ(10px)" }}
        >
          <span
            className={`tech-label text-white/35 ${compact ? "text-[8px]" : "text-[8px] sm:text-[9px]"}`}
          >
            ROLES / {project?.mass.roles ?? "—"}
          </span>
          <span
            className={`tech-label text-white/35 ${compact ? "text-[8px]" : "text-[8px] sm:text-[9px]"}`}
          >
            MODULES / {project?.mass.modules ?? "—"}
          </span>
          <span
            className={`tech-label text-white/35 ${compact ? "text-[8px]" : "text-[8px] sm:text-[9px]"}`}
          >
            INTEGRATIONS / {project?.mass.integrations ?? "—"}
          </span>
        </div>
      </div>
    </div>
  );
}

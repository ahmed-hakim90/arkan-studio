"use client";

import { motion } from "framer-motion";
import type { LayersVisualData } from "../types";

type Props = {
  data: LayersVisualData;
  invert?: boolean;
  reduced?: boolean;
  activeIndex?: number;
  frameLabel?: string;
};

export function LayersVisual({
  data,
  invert,
  reduced,
  activeIndex = 0,
  frameLabel,
}: Props) {
  const layers = data.layers.slice(0, 6);

  return (
    <div
      className={`relative flex h-full min-h-[220px] w-full flex-col justify-center gap-2 overflow-hidden border p-4 md:p-6 ${
        invert
          ? "border-white/15 bg-[var(--carbon)]"
          : "border-[var(--line)] bg-[var(--surface)]"
      }`}
    >
      {frameLabel ? (
        <p
          className={`tech-label mb-2 text-[9px] ${
            invert ? "text-white/40" : "text-[var(--muted)]"
          }`}
        >
          {frameLabel}
        </p>
      ) : null}
      {layers.map((layer, i) => {
        const on = i === activeIndex;
        return (
          <motion.div
            key={layer.id}
            layout={!reduced}
            className={`flex items-center gap-3 border px-3 py-3 ${
              on
                ? "border-[var(--oxide)] bg-[color-mix(in_oklab,var(--oxide)_10%,transparent)]"
                : invert
                  ? "border-white/15 bg-white/[0.03]"
                  : "border-[var(--line)] bg-[var(--bone-soft)]"
            }`}
            transition={{ duration: reduced ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className={`tech-label text-[9px] ${
                on ? "text-[var(--oxide)]" : invert ? "text-white/40" : "text-[var(--muted)]"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className={`tech-label text-[11px] ${
                on
                  ? "text-[var(--oxide)]"
                  : invert
                    ? "text-white/80"
                    : "text-[var(--carbon)]"
              }`}
            >
              {layer.label}
            </span>
            {on ? (
              <span className="ms-auto size-1.5 bg-[var(--oxide)]" aria-hidden />
            ) : null}
          </motion.div>
        );
      })}
    </div>
  );
}

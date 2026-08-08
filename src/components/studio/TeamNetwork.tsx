"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";

const nodes = [
  "client",
  "product",
  "ux",
  "engineering",
  "operations",
  "delivery",
] as const;

type NodeId = (typeof nodes)[number];

const pathOrder: NodeId[] = [
  "client",
  "product",
  "ux",
  "engineering",
  "operations",
  "delivery",
];

export function TeamNetwork() {
  const t = useTranslations("Studio");
  const reduced = usePrefersReducedMotion();
  const [hover, setHover] = useState<NodeId | null>(null);

  function dim(id: NodeId) {
    if (!hover) return false;
    if (hover === id) return false;
    // Keep signal path Client→Delivery related nodes lit when hovering mid
    const hoverIdx = pathOrder.indexOf(hover);
    const idIdx = pathOrder.indexOf(id);
    if (hover === "client" || hover === "delivery") {
      return id !== "client" && id !== "delivery" && id !== "product";
    }
    return Math.abs(hoverIdx - idIdx) > 1 && id !== "client" && id !== "delivery";
  }

  return (
    <div>
      <p className="mb-8 max-w-xl text-sm text-[var(--muted)]">
        {t("networkLead")}
      </p>

      <div className="flex flex-col items-center gap-3 text-center">
        <NetworkNode
          label={t("network.client")}
          active={!dim("client")}
          signal
          onHover={() => setHover("client")}
          onLeave={() => setHover(null)}
        />
        <SignalLine reduced={reduced} />
        <NetworkNode
          label={t("network.product")}
          active={!dim("product")}
          signal
          onHover={() => setHover("product")}
          onLeave={() => setHover(null)}
        />
        <SignalLine reduced={reduced} />
        <div className="flex flex-wrap items-start justify-center gap-6">
          {(
            [
              ["ux", t("network.ux")],
              ["engineering", t("network.engineering")],
              ["operations", t("network.operations")],
            ] as const
          ).map(([id, label]) => (
            <NetworkNode
              key={id}
              label={label}
              active={!dim(id)}
              onHover={() => setHover(id)}
              onLeave={() => setHover(null)}
            />
          ))}
        </div>
        <SignalLine reduced={reduced} />
        <NetworkNode
          label={t("network.delivery")}
          active={!dim("delivery")}
          signal
          onHover={() => setHover("delivery")}
          onLeave={() => setHover(null)}
        />
      </div>
    </div>
  );
}

function SignalLine({ reduced }: { reduced: boolean }) {
  return (
    <motion.span
      aria-hidden
      className="h-8 w-px origin-top bg-[var(--signal)]"
      initial={reduced ? false : { scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

function NetworkNode({
  label,
  active,
  signal,
  onHover,
  onLeave,
}: {
  label: string;
  active: boolean;
  signal?: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <button
      type="button"
      onMouseEnter={onHover}
      onFocus={onHover}
      onMouseLeave={onLeave}
      onBlur={onLeave}
      className={`min-w-36 border px-4 py-3 tech-label text-[11px] transition duration-[240ms] ${
        active
          ? signal
            ? "border-[var(--signal)] text-[var(--signal)]"
            : "border-[var(--navy)] text-[var(--navy)]"
          : "border-[var(--line)] text-[var(--muted)] opacity-35"
      }`}
    >
      {label}
    </button>
  );
}

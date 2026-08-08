"use client";

type Props = {
  index: number;
  total: number;
  /** 0–1 progress within the active step. */
  localProgress: number;
};

/**
 * Thin structural progress — oxide only at the current position.
 * Index readout + rail; not a carousel.
 */
export function SignalStoryProgress({
  index,
  total,
  localProgress,
}: Props) {
  const current = String(index + 1).padStart(2, "0");
  const count = String(total).padStart(2, "0");
  const fill = Math.min(1, Math.max(0, (index + localProgress) / total));

  return (
    <div className="mt-8 w-full max-w-sm" aria-hidden>
      <p className="tech-label text-[11px] text-[var(--muted)]" dir="ltr">
        <span className="text-[var(--oxide)]">{current}</span>
        <span className="mx-1.5 text-[var(--line-strong)]">/</span>
        <span>{count}</span>
      </p>
      <div className="relative mt-3 h-px w-full bg-[var(--line)]">
        <span
          className="absolute inset-y-0 start-0 bg-[var(--oxide)] transition-[width] duration-150 ease-out"
          style={{ width: `${fill * 100}%` }}
        />
        <span
          className="absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-[var(--oxide)]"
          style={{ insetInlineStart: `calc(${fill * 100}% - 3px)` }}
        />
      </div>
    </div>
  );
}

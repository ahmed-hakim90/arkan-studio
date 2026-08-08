import { PageSkeleton } from "@/components/loading/Skeleton";

/**
 * Route transition under [locale].
 * Keep this light — a full hero skeleton after leaving home feels like a second splash.
 */
export default function LocaleLoading() {
  return (
    <div className="border-b border-[var(--line)] bg-[var(--paper)]">
      <div
        className="section-pad canvas flex items-center gap-3 py-4"
        role="status"
        aria-busy="true"
        aria-live="polite"
      >
        <span
          className="size-2 shrink-0 animate-pulse rounded-full bg-[var(--volt)]"
          aria-hidden
        />
        <span className="sr-only">Loading</span>
      </div>
      <PageSkeleton />
    </div>
  );
}

type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={`skeleton-pulse rounded-sm bg-[color-mix(in_oklab,var(--steel)_55%,transparent)] ${className}`}
    />
  );
}

export function PageSkeleton() {
  return (
    <div
      className="section-pad mx-auto w-full max-w-6xl py-12 md:py-16"
      role="status"
      aria-busy="true"
      aria-live="polite"
    >
      <Skeleton className="h-3 w-24" />
      <Skeleton className="mt-5 h-12 w-[min(100%,28rem)]" />
      <Skeleton className="mt-4 h-5 w-[min(100%,36rem)]" />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
      </div>
      <span className="sr-only">Loading</span>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div
      className="section-pad mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl flex-col justify-end pb-16 pt-20"
      role="status"
      aria-busy="true"
    >
      <Skeleton className="h-[clamp(4.5rem,14vw,9.5rem)] w-[min(100%,20rem)]" />
      <Skeleton className="mt-6 h-6 w-[min(100%,24rem)]" />
      <div className="mt-10 flex gap-3">
        <Skeleton className="h-11 w-40" />
        <Skeleton className="h-11 w-36" />
      </div>
      <span className="sr-only">Loading</span>
    </div>
  );
}

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
      className="section-pad canvas w-full py-12 md:py-16"
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
      className="section-pad canvas flex min-h-[100svh] w-full flex-col justify-center bg-[var(--navy)] pb-28 pt-24 md:pt-[18vh]"
      role="status"
      aria-busy="true"
    >
      <Skeleton className="h-12 w-[min(100%,14rem)] bg-white/10 md:h-[5.5rem] md:w-[20rem]" />
      <Skeleton className="mt-6 h-8 w-[min(100%,22rem)] bg-white/10 md:h-10" />
      <Skeleton className="mt-5 h-4 w-[min(100%,36rem)] bg-white/10" />
      <div className="mt-10 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row">
        <Skeleton className="h-11 w-full bg-white/10 sm:w-40" />
        <Skeleton className="h-11 w-full bg-white/10 sm:w-36" />
      </div>
      <span className="sr-only">Loading</span>
    </div>
  );
}

import { Skeleton } from "@/components/loading/Skeleton";

export default function ProjectLoading() {
  return (
    <div role="status" aria-busy="true">
      <div className="bg-[var(--navy)]">
        <div className="section-pad py-12 md:py-16">
          <div className="canvas space-y-4">
            <Skeleton className="h-4 w-28 bg-white/10" />
            <Skeleton className="h-14 w-[min(100%,28rem)] bg-white/15" />
            <Skeleton className="h-5 w-[min(100%,36rem)] bg-white/10" />
            <div className="flex gap-3 pt-4">
              <Skeleton className="h-11 w-40 rounded-full bg-white/15" />
              <Skeleton className="h-11 w-32 rounded-full bg-white/10" />
            </div>
          </div>
        </div>
      </div>
      <div className="section-pad py-12">
        <div className="canvas grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="space-y-4">
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-48" />
            <Skeleton className="h-36" />
          </div>
        </div>
      </div>
      <span className="sr-only">Loading</span>
    </div>
  );
}

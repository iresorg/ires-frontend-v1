"use client";

type PlanCardSkeletonProps = {
  className?: string;
};

export function PlanCardSkeleton({ className = "" }: PlanCardSkeletonProps) {
  return (
    <div
      className={`relative flex w-full max-w-[340px] flex-col rounded-2xl brand-border ${className}`}
    >
      <div className="flex flex-1 flex-col justify-between space-y-3 rounded-2xl bg-[#1C1B2B] p-5">
        <div className="flex items-center gap-2 rounded-full bg-[#141327] px-4 py-2 animate-pulse">
          <div className="h-5 w-5 rounded bg-white/10" />
          <div className="h-4 w-28 rounded bg-white/10" />
        </div>
        <div className="mt-2 space-y-2">
          <div className="h-7 w-36 animate-pulse rounded bg-white/10" />
          <div className="h-3 w-48 animate-pulse rounded bg-white/10" />
          <div className="h-3 w-24 animate-pulse rounded bg-white/10" />
        </div>
        <ul className="mt-4 space-y-2.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <li key={i} className="flex items-start gap-2">
              <div className="mt-0.5 h-3.5 w-3.5 animate-pulse rounded bg-white/10" />
              <div className="h-4 flex-1 animate-pulse rounded bg-white/10" />
            </li>
          ))}
        </ul>
        <div className="mt-6 h-10 w-full animate-pulse rounded-md bg-white/10" />
      </div>
    </div>
  );
}

export function PlansGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="flex flex-wrap items-stretch justify-center gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <PlanCardSkeleton key={i} />
      ))}
    </div>
  );
}

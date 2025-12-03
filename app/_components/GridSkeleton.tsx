"use client";

export default function GridSkeleton({ count = 24 }: { count?: number }) {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse overflow-hidden rounded-lg border border-slate-200 bg-white"
          >
            <div className="h-48 w-full bg-slate-200" />
            <div className="space-y-2 p-3">
              <div className="h-4 w-3/4 rounded bg-slate-200" />
              <div className="h-3 w-1/2 rounded bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

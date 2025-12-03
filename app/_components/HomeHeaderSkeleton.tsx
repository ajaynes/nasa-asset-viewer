"use client";

export default function HomeHeaderSkeleton() {
  return (
    <div className="mb-20 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between animate-pulse">
      <div className="h-11 w-full rounded-md bg-slate-200" />
      <div className="h-11 w-20 rounded-md bg-slate-200" />
      <div className="flex">
        <div className="h-11 w-40 rounded-md bg-slate-200" />
      </div>
    </div>
  );
}

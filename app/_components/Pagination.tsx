"use client";

type PaginationProps = {
  page: number;
  totalPages?: number | null;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  page,
  totalPages,
  hasPrevPage,
  hasNextPage,
  onPageChange,
}: PaginationProps) {
  const goPrev = () => {
    if (!hasPrevPage) return;
    onPageChange(page - 1);
  };

  const goNext = () => {
    if (!hasNextPage) return;
    onPageChange(page + 1);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={goPrev}
        disabled={!hasPrevPage}
        className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm enabled:hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
      >
        Previous
      </button>

      <span className="text-xs font-medium text-slate-300">
        Page {page}
        {totalPages ? ` of ${totalPages}` : null}
      </span>

      <button
        type="button"
        onClick={goNext}
        disabled={!hasNextPage}
        className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm enabled:hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
      >
        Next
      </button>
    </div>
  );
}

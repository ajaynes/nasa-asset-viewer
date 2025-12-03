"use client";

import type { ChangeEvent } from "react";

type FiltersProps = {
  mediaType: "all" | "image" | "video";
  onMediaTypeChange: (value: "all" | "image" | "video") => void;
};

export default function Filters({ mediaType, onMediaTypeChange }: FiltersProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onMediaTypeChange(event.target.value as "all" | "image" | "video");
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="inline-flex rounded-full border border-slate-300 bg-white px-4 py-2 shadow-sm">
        <label className="relative inline-flex cursor-pointer select-none items-center">
          <input
            type="radio"
            name="media"
            value="all"
            checked={mediaType === "all"}
            onChange={handleChange}
            className="peer sr-only"
          />
          <span className="rounded-full px-3 py-1.5 text-xs font-medium text-slate-700 transition peer-checked:bg-indigo-600 peer-checked:text-white">
            All
          </span>
        </label>
        <label className="relative inline-flex cursor-pointer select-none items-center">
          <input
            type="radio"
            name="media"
            value="image"
            checked={mediaType === "image"}
            onChange={handleChange}
            className="peer sr-only"
          />
          <span className="rounded-full px-3 py-1.5 text-xs font-medium text-slate-700 transition peer-checked:bg-indigo-600 peer-checked:text-white">
            Images
          </span>
        </label>
        <label className="relative inline-flex cursor-pointer select-none items-center">
          <input
            type="radio"
            name="media"
            value="video"
            checked={mediaType === "video"}
            onChange={handleChange}
            className="peer sr-only"
          />
          <span className="rounded-full px-3 py-1.5 text-xs font-medium text-slate-700 transition peer-checked:bg-indigo-600 peer-checked:text-white">
            Video
          </span>
        </label>
      </div>
    </div>
  );
}

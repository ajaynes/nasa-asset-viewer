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
    <>
      <label>
        <input
          type="radio"
          name="media"
          value="all"
          checked={mediaType === "all"}
          onChange={handleChange}
        />
        All
      </label>
      <label>
        <input
          type="radio"
          name="media"
          value="image"
          checked={mediaType === "image"}
          onChange={handleChange}
        />
        Image
      </label>
      <label>
        <input
          type="radio"
          name="media"
          value="video"
          checked={mediaType === "video"}
          onChange={handleChange}
        />
        Video
      </label>
    </>
  );
}

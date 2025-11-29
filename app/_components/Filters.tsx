"use client";

import { useState } from 'react';

export default function Filters() {
  const [mediaType, setMediaType] = useState('all');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMediaType(event.target.value);
  };

  return (
    <>
      <div>Type: {mediaType}</div>
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

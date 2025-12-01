'use client';

import Image from "next/image";
import type { NasaItem } from "@/app/_types/nasa";

type DetailViewProps = {
  item: NasaItem;
};

export default function DetailView({ item }: DetailViewProps) {
  const firstLink = item.links?.[0];
    const imageLink =
    item.links?.find(link => link.rel === "canonical") ??
    firstLink ??
    null;

  const imageThumb =
    item.links?.find(link => link.rel === "preview") ??
    firstLink ??
    null;

  return (
    <div>
      <h1>Title: {item.data[0]?.title}</h1>
      <p>Description: {item.data[0]?.description}</p>
      {imageThumb?.href && (
        <Image
          src={imageThumb.href}
          alt={item.data[0]?.title ?? "NASA image"}
          width={400}
          height={400}
        />
      )}
      {imageLink?.href && (
        <a href={imageLink.href}>Download Image</a>
      )}
    </div>
  );
}

'use client';

import Image from "next/image";
import type { NasaItem } from "@/app/_types/nasa";

type DetailViewProps = {
  item: NasaItem;
};

export default function DetailView({ item }: DetailViewProps) {
  // TODO: fix - broken for videos
  const firstLink = item.links?.[0];
    const imageLink =
    item.links?.find(link => link.rel === "canonical") ??
    firstLink ??
    null;

  const imageThumb =
    item.links?.find(link => link.rel === "preview") ??
    firstLink ??
    null;

    console.log(item)

  return (
    <div>
      <h1>Title: {item.data[0]?.title}</h1>
      <p>Description: {item.data[0]?.description}</p>
      <p>Location: {item.data[0]?.location}</p>
      <p>Photographer: {item.data[0]?.photographer}</p>
      <p>Date: {item.data[0]?.date_created}</p>
      <div>{item.data[0]?.keywords?.map(key => (
        <p key={`${key}-${item.data[0]?.nasa_id}`}>{key}</p>
      ))}</div>
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

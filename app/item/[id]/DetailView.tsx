"use client";

import { useState } from "react";
import type { NasaItem } from "@/app/_types/nasa";
import DetailImage from "@/app/_components/DetailImage";
import Lightbox from "@/app/_components/Lightbox";
import DetailInfo from "@/app/_components/DetailInfo";

type DetailViewProps = {
  item: NasaItem;
};

type MediaKind = "image" | "video" | "other";

export default function DetailView({ item }: DetailViewProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const meta = item.data[0];
  if (!meta) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 text-sm text-slate-600">
        No data found for this item.
      </div>
    );
  }

  const rawMediaType = meta.media_type?.toLowerCase();
  const firstLink = item.links?.[0];

  const previewLink =
    item.links?.find((link) => link.rel === "preview") ?? firstLink ?? null;

  const canonicalLink =
    item.links?.find((link) => link.rel === "canonical") ?? firstLink ?? null;

  const mainMediaUrl = previewLink?.href ?? "";
  const downloadUrl = canonicalLink?.href ?? mainMediaUrl;

  let mediaKind: MediaKind = "other";

  if (rawMediaType === "image") {
    mediaKind = "image";
  } else if (rawMediaType === "video") {
    mediaKind = "video";
  } else if (/\.(png|jpe?g|gif|webp|tif?f)$/i.test(mainMediaUrl)) {
    mediaKind = "image";
  } else if (/\.(mp4|mov|webm|m4v|ogv)$/i.test(mainMediaUrl)) {
    mediaKind = "video";
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <DetailImage
          title={meta.title}
          mediaUrl={mainMediaUrl}
          mediaKind={mediaKind}
          downloadUrl={downloadUrl}
          onOpenLightbox={() => setLightboxOpen(true)}
        />

        <DetailInfo
          title={meta.title}
          description={meta.description}
          location={meta.location}
          dateCreated={meta.date_created}
          photographer={meta.photographer}
          keywords={meta.keywords}
          mediaType={meta.media_type}
        />
      </div>

      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        title={meta.title}
        mediaUrl={mainMediaUrl}
        mediaKind={mediaKind}
      />
    </div>
  );
}

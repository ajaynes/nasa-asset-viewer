"use client";

import { useState } from "react";
import type { NasaItem } from "@/app/_types/nasa";
import DetailImage from "@/app/_components/DetailImage";
import Lightbox from "@/app/_components/Lightbox";
import DetailInfo from "@/app/_components/DetailInfo";

type MediaType = "image" | "video" | "other";

type DetailViewProps = {
  item: NasaItem;
  explicitMediaUrl?: string | null;
  posterUrl?: string | null;
  captionsUrl?: string | null;
};

export default function DetailView({
  item,
  explicitMediaUrl,
  posterUrl,
  captionsUrl,
}: DetailViewProps) {
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

  const fallbackImageUrl = previewLink?.href ?? "";
  const fallbackDownloadUrl = canonicalLink?.href ?? fallbackImageUrl;

  let mediaType: MediaType = "other";

  if (rawMediaType === "image") {
    mediaType = "image";
  } else if (rawMediaType === "video") {
    mediaType = "video";
  } else if (/\.(png|jpe?g|gif|webp|tif?f)$/i.test(fallbackImageUrl)) {
    mediaType = "image";
  } else if (/\.(mp4|mov|webm|m4v|ogv)$/i.test(fallbackImageUrl)) {
    mediaType = "video";
  }

  const mainMediaUrl =
    mediaType === "video" && explicitMediaUrl
      ? explicitMediaUrl
      : explicitMediaUrl || fallbackImageUrl;

  const downloadUrl =
    mediaType === "video" && explicitMediaUrl
      ? explicitMediaUrl
      : fallbackDownloadUrl;

  const poster = posterUrl || (mediaType === "image" ? mainMediaUrl : null);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <DetailImage
          title={meta.title}
          mediaUrl={mainMediaUrl}
          mediaType={mediaType}
          downloadUrl={downloadUrl}
          posterUrl={poster}
          captionsUrl={captionsUrl}
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
        mediaType={mediaType}
        posterUrl={poster}
        captionsUrl={captionsUrl}
      />
    </div>
  );
}

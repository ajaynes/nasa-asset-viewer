"use client";

import Image from "next/image";
import Link from "next/link";

type MediaType = "image" | "video" | "other";

type DetailImageProps = {
  title: string;
  mediaUrl: string;
  mediaType: MediaType;
  downloadUrl?: string;
  posterUrl?: string | null;
  captionsUrl?: string | null;
  onOpenLightbox: () => void;
};

export default function DetailImage({
  title,
  mediaUrl,
  mediaType,
  downloadUrl,
  posterUrl,
  captionsUrl,
  onOpenLightbox,
}: DetailImageProps) {
  if (!mediaUrl) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-slate-100 text-sm text-slate-600">
        No media available.
      </div>
    );
  }

  const resolvedDownloadUrl = downloadUrl || mediaUrl;

  return (
    <div className="space-y-4">
      <div className="overflow-hidden border border-slate-200 rounded-md bg-slate-900">
        {mediaType === "video" ? (
          <video
            className="h-auto max-h-104 w-full object-contain"
            controls
            poster={posterUrl || undefined}
          >
            <source src={mediaUrl} />
            {captionsUrl && (
              <track
                kind="subtitles"
                src={captionsUrl}
                srcLang="en"
                label="English"
                default
              />
            )}
            Your browser does not support videos.
          </video>
        ) : (
          <button
            type="button"
            onClick={onOpenLightbox}
            className="block w-full"
          >
            <div className="relative mx-auto aspect-video max-h-160 min-h-140 w-full">
              <Image
                src={mediaUrl}
                alt={title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          type="button"
          onClick={onOpenLightbox}
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-800 cursor-pointer"
        >

          <Image
          className="dark:invert"
          src="/fullscreen.svg"
          alt="fullscreen icon"
          width={15}
          height={20}
          style={{marginRight: 15}}
          priority
        />
        {mediaType === "video" ? "View Fullscreen" : "View Full Image"}
        </button>

        <div>
          <Link
            href={resolvedDownloadUrl}
            download
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-800"
          >
            <Image
            className="dark:invert"
            src="/download.svg"
            alt="download icon"
            width={25}
            height={20}
            style={{marginRight: 15}}
            priority
          />
            Download {mediaType === "video" ? "Video" : "Image"}
          </Link>
          </div>
        </div>
      </div>
  );
}

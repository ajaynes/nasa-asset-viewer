"use client";

import Image from "next/image";

type MediaKind = "image" | "video" | "other";

type DetailImageProps = {
  title?: string;
  mediaUrl: string;
  mediaKind: MediaKind;
  downloadUrl?: string;
  onOpenLightbox: () => void;
};

export default function DetailImage({
  title,
  mediaUrl,
  mediaKind,
  downloadUrl,
  onOpenLightbox,
}: DetailImageProps) {
  if (!mediaUrl) {
    return (
      <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
        No preview available
      </div>
    );
  }

  const isImage = mediaKind === "image";
  const isVideo = mediaKind === "video";

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={onOpenLightbox}
        className="group relative block w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-900 shadow-sm cursor-pointer"
      >
        {isImage && (
          <div className="relative aspect-4/3 w-full">
            <Image
              src={mediaUrl}
              alt={title ?? "NASA media"}
              fill
              className="object-contain transition-transform group-hover:scale-[1.02]"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        )}

        {isVideo && (
          <div className="relative aspect-video w-full">
            <video
              src={mediaUrl}
              controls
              className="h-full w-full rounded-xl bg-black"
            />
          </div>
        )}

        {!isImage && !isVideo && (
          <div className="flex aspect-4/3 items-center justify-center bg-slate-800 text-sm text-slate-200">
            Preview not available
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
        <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white shadow-sm">
          Click to enlarge
        </span>
      </button>

      {downloadUrl && (
        <a
          href={downloadUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
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
        Download {isVideo ? "video" : "image"}
        </a>
      )}
    </div>
  );
}

"use client";

import Image from "next/image";

type MediaKind = "image" | "video" | "other";

type LightboxProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  mediaUrl: string;
  mediaKind: MediaKind;
};

export default function Lightbox({
  isOpen,
  onClose,
  title,
  mediaUrl,
  mediaKind,
}: LightboxProps) {
  if (!isOpen || !mediaUrl) return null;

  const isImage = mediaKind === "image";
  const isVideo = mediaKind === "video";

  const handleBackdropClick = () => {
    onClose();
  };

  const handleInnerClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={handleBackdropClick}
    >
      <button
        type="button"
        className="absolute right-4 top-4 rounded-full bg-black/70 px-3 py-1 text-sm font-medium text-white hover:bg-black cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        ✕ Close
      </button>

      {isImage && (
        <div
          className="relative h-[80vh] w-full max-w-5xl"
          onClick={handleInnerClick}
        >
          <Image
            src={mediaUrl}
            alt={title ?? "NASA media"}
            fill
            className="object-contain"
            sizes="100vw"
          />
        </div>
      )}

      {isVideo && (
        <div
          className="w-full max-w-5xl"
          onClick={handleInnerClick}
        >
          <video
            src={mediaUrl}
            controls
            autoPlay
            className="max-h-[80vh] w-full rounded-xl bg-black"
          />
        </div>
      )}

      {!isImage && !isVideo && (
        <div
          className="flex w-full max-w-md items-center justify-center rounded-xl bg-slate-900 p-6 text-sm text-slate-100"
          onClick={handleInnerClick}
        >
          No preview available
        </div>
      )}
    </div>
  );
}

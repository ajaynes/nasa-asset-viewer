"use client";

import { useEffect } from "react";
import Image from "next/image";

type MediaType = "image" | "video" | "other";

type LightboxProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  mediaUrl: string;
  mediaType: MediaType;
  posterUrl?: string | null;
  captionsUrl?: string | null;
};

export default function Lightbox({
  isOpen,
  onClose,
  title,
  mediaUrl,
  mediaType,
  posterUrl,
  captionsUrl,
}: LightboxProps) {
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <button
        type="button"
        onClick={onClose}
        className="fixed right-4 top-4 z-60 py-1 text-md font-medium text-slate-100 shadow cursor-pointer"
      >
        X Close
      </button>

      <div className="relative z-55 flex h-full w-full items-center justify-center p-4">
        <div className="flex h-full w-full max-h-[95vh] max-w-[95vw] flex-col rounded-lg p-4 shadow-2xl">
          <div className="flex flex-1 items-center justify-center overflow-hidden rounded-md">
            {mediaType === "video" ? (
              <video
                className="max-h-[90vh] max-w-[95vw]"
                controls
                autoPlay
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
              <div className="relative h-[80vh] w-[95vw] max-w-384">
                <Image
                  src={mediaUrl}
                  alt={title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

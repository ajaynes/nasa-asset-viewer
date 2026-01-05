import {
  fetchItemById,
  fetchAssetManifest,
  getBestVideoUrlFromManifest,
  getBestPosterFromManifest,
  getCaptionsFromManifest,
} from "@/app/_utils/fetch";
import DetailView from "@/app/_components/DetailView";
import type { NasaItem } from "@/app/_types/nasa";

export default async function ItemDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const data = await fetchItemById(id);
  const item: NasaItem | undefined = data.collection.items[0];

  if (!item) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 text-sm text-slate-600">
        No item found for id: {id}
      </div>
    );
  }

  // get the media type, preview link, and captions link
  const meta = item.data?.[0];
  const mediaType = meta?.media_type?.toLowerCase();

  const previewLink =
    item.links?.find((link) => link.rel === "preview") ??
    item.links?.find((link) => link.render === "image") ??
    item.links?.[0];

  const captionsLink = item.links?.find((link) => link.rel === "captions");

  let explicitMediaUrl: string | null = null;
  let posterUrl: string | null = previewLink?.href ?? null;
  let captionsUrl: string | null = captionsLink?.href ?? null;

  // if the media is a video, get the manifest then the best quality video, poster, and captions. else use image url
  if (mediaType === "video") {
    const manifest = await fetchAssetManifest(meta.nasa_id);

    const bestVideo = getBestVideoUrlFromManifest(manifest);
    if (bestVideo) {
      explicitMediaUrl = bestVideo;
    }

    if (!posterUrl) {
      const bestPoster = getBestPosterFromManifest(manifest);
      if (bestPoster) posterUrl = bestPoster;
    }

    if (!captionsUrl) {
      const manifestCaptions = getCaptionsFromManifest(manifest);
      if (manifestCaptions) captionsUrl = manifestCaptions;
    }
  } else if (mediaType === "image") {
    explicitMediaUrl = previewLink?.href ?? null;
  }

  return (
    <DetailView
      item={item}
      explicitMediaUrl={explicitMediaUrl}
      posterUrl={posterUrl}
      captionsUrl={captionsUrl}
    />
  );
}

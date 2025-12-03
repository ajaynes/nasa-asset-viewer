import type { NasaSearchResponse } from "@/app/_types/nasa";

const API_ROOT = "https://images-api.nasa.gov";
const SEARCH_URL = `${API_ROOT}/search`;

export async function fetchDataAsync(
  query: string,
  mediaType: "all" | "image" | "video" = "all",
  page: number = 1
): Promise<NasaSearchResponse> {
  const params = new URLSearchParams({
    q: query,
    page_size: "24",
    page: String(page),
  });

  if (mediaType === "image" || mediaType === "video") {
    params.set("media_type", mediaType);
  } else {
    params.set("media_type", "image,video");
  }

  const response = await fetch(`${SEARCH_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Error fetching NASA data: ${response.status}`);
  }

  const data: NasaSearchResponse = await response.json();
  return data;
}

export async function fetchItemById(
  nasaId: string
): Promise<NasaSearchResponse> {
  const cleanId = decodeURIComponent(nasaId);

  const params = new URLSearchParams({
    nasa_id: cleanId,
  });

  const response = await fetch(`${SEARCH_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Error fetching NASA item: ${response.status}`);
  }

  const data: NasaSearchResponse = await response.json();
  return data;
}

export type NasaAssetManifest = {
  collection: {
    items: { href: string }[];
  };
};

export async function fetchAssetManifest(
  nasaId: string
): Promise<NasaAssetManifest> {
  const response = await fetch(
    `${API_ROOT}/asset/${encodeURIComponent(nasaId)}`
  );

  if (!response.ok) {
    throw new Error(`Error fetching NASA asset manifest: ${response.status}`);
  }

  return response.json();
}

function filterByExt(hrefs: string[], exts: string[]): string[] {
  const regex = new RegExp(`\\.(${exts.join("|")})$`, "i");
  return hrefs.filter((href) => regex.test(href));
}

export function getBestVideoUrlFromManifest(
  manifest: NasaAssetManifest
): string | null {
  const hrefs = manifest.collection.items?.map((i) => i.href) ?? [];
  const videos = filterByExt(hrefs, ["mp4", "webm", "mov", "m4v", "ogv"]);
  if (!videos.length) return null;

  const preferredOrder = ["~orig", "~large", "~medium", "~small"];

  for (const tag of preferredOrder) {
    const match = videos.find((href) => href.includes(tag));
    if (match) return match;
  }

  return videos[0];
}

export function getBestPosterFromManifest(
  manifest: NasaAssetManifest
): string | null {
  const hrefs = manifest.collection.items?.map((i) => i.href) ?? [];
  const images = filterByExt(hrefs, [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "webp",
    "tif",
    "tiff",
  ]);

  if (!images.length) return null;

  const preferredOrder = ["~large", "~medium", "~small", "~thumb"];

  for (const tag of preferredOrder) {
    const match = images.find((href) => href.includes(tag));
    if (match) return match;
  }

  return images[0];
}

export function getCaptionsFromManifest(
  manifest: NasaAssetManifest
): string | null {
  const hrefs = manifest.collection.items?.map((i) => i.href) ?? [];
  const captions = filterByExt(hrefs, ["vtt", "srt"]);
  return captions[0] ?? null;
}

import type { NasaSearchResponse } from "@/app/_types/nasa";

const baseUrl = "https://images-api.nasa.gov/search";

// TODO: infinite scroll or pagination?
// ?page_size=24&page=2

export async function fetchDataAsync(
  query: string,
  mediaType: "all" | "image" | "video" = "all"
): Promise<NasaSearchResponse> {
  const params = new URLSearchParams({
    q: query,
    page_size: "24",
  });

  if (mediaType !== "all") {
    params.set("media_type", mediaType);
  }

  const response = await fetch(`${baseUrl}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Error fetching NASA data: ${response.status}`);
  }

  const data: NasaSearchResponse = await response.json();
  return data;
}

import type { NasaSearchResponse } from '@/app/_types/nasa';
const baseUrl = "https://images-api.nasa.gov/search?q=";

// TODO: infinite scroll of pagination?
// ?page_size=24&page=2

export async function fetchDataAsync(query: string): Promise<NasaSearchResponse> {
  const response = await fetch(`${baseUrl + encodeURIComponent(query)}&page_size=24`);

  if (!response.ok) {
    throw new Error(`Error fetching NASA data: ${response.status}`);
  }

  const data: NasaSearchResponse = await response.json();
  return data;
}

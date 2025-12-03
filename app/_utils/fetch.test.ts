/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchDataAsync } from "@/app/_utils/fetch";
import type { NasaSearchResponse } from "@/app/_types/nasa";

const mockResponse: NasaSearchResponse = {
  collection: {
    version: "1.0",
    href: "https://images-api.nasa.gov/search",
    items: [] as any,
    metadata: {
      total_hits: 1,
    } as any,
    links: [] as any,
  },
} as NasaSearchResponse;

const originalFetch = global.fetch;

beforeEach(() => {
  global.fetch = jest.fn() as unknown as typeof fetch;
});

afterEach(() => {
  jest.resetAllMocks();
  global.fetch = originalFetch;
});

describe("fetchDataAsync", () => {
  it('calls fetch with media_type=image,video when mediaType is "all"', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as any);

    await fetchDataAsync("mars", "all", 2);

    expect(global.fetch).toHaveBeenCalledTimes(1);

    const calledUrl = (global.fetch as jest.Mock).mock.calls[0][0] as string;

    expect(calledUrl).toContain("q=mars");
    expect(calledUrl).toContain("page_size=24");
    expect(calledUrl).toContain("page=2");
    expect(calledUrl).toContain("media_type=image%2Cvideo");
  });

  it('calls fetch with media_type=image when mediaType is "image"', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as any);

    await fetchDataAsync("jupiter", "image", 3);

    const calledUrl = (global.fetch as jest.Mock).mock.calls[0][0] as string;

    expect(calledUrl).toContain("q=jupiter");
    expect(calledUrl).toContain("page=3");
    expect(calledUrl).toContain("media_type=image");
    expect(calledUrl).not.toContain("image%2Cvideo");
  });

  it('calls fetch with media_type=video when mediaType is "video"', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as any);

    await fetchDataAsync("saturn", "video", 1);

    const calledUrl = (global.fetch as jest.Mock).mock.calls[0][0] as string;

    expect(calledUrl).toContain("q=saturn");
    expect(calledUrl).toContain("page=1");
    expect(calledUrl).toContain("media_type=video");
  });

  it("returns parsed response data on success", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as any);

    const data = await fetchDataAsync("mars", "all", 1);

    expect(data).toEqual(mockResponse);
    expect(data.collection.metadata?.total_hits).toBe(1);
  });

  it("throws error on failed respose", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({}),
    } as any);

    await expect(fetchDataAsync("mars", "all", 1)).rejects.toThrow("Error fetching NASA data: 500");

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});

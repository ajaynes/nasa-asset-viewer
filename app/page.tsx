"use client";

import { useState, useEffect } from "react";
import { fetchDataAsync } from "@/app/_utils/fetch";
import type { NasaItem, NasaSearchResponse } from "@/app/_types/nasa";
import Card from "@/app/_components/Card";
import SearchBar from "@/app/_components/SearchBar";
import Filters from "@/app/_components/Filters";
import Pagination from "@/app/_components/Pagination";
import GridSkeleton from "@/app/_components/GridSkeleton";
import HomeHeaderSkeleton from "@/app/_components/HomeHeaderSkeleton";

const pageSize = 24;

export default function Home() {
  const [searchResults, setSearchResults] = useState<NasaItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("mars");
  const [mediaType, setMediaType] = useState<"all" | "image" | "video">("all");
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);

  async function loadMedia(
    term: string,
    type: "all" | "image" | "video",
    pageNum: number
  ) {
    try {
      setLoading(true);
      setError(null);

      const data: NasaSearchResponse = await fetchDataAsync(
        term,
        type,
        pageNum
      );

      setSearchResults(data.collection.items);
      const hits = data.collection.metadata?.total_hits ?? 0;
      setTotalHits(hits);
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMedia(searchTerm, mediaType, page);
  }, [searchTerm, mediaType, page]);

  const totalPages =
    totalHits && pageSize ? Math.ceil(totalHits / pageSize) : null;

  const hasPrevPage = page > 1;
  const hasNextPage =
    totalPages !== null ? page < totalPages : searchResults.length === pageSize;

  if (loading && !searchResults.length) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <HomeHeaderSkeleton />
      <GridSkeleton />
    </section>
  );
}

  if (error) return <div>{error}</div>;

  return (
    <main>
      <div className="mx-auto w-full max-w-7xl px-4 py-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SearchBar
            onSearch={(term) => {
              setPage(1);
              setSearchTerm(term);
            }}
          />
          <Filters
            mediaType={mediaType}
            onMediaTypeChange={(type) => {
              setPage(1);
              setMediaType(type);
            }}
          />
        </div>
      </div>

      <section className="mx-auto w-full max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {searchResults.map((result) => {
            const meta = result.data[0];
            const thumb =
              result.links?.find((link) => link.rel === "preview") ??
              result.links?.[0];

            return (
              <Card
                key={meta.nasa_id}
                title={meta.title}
                thumbnailUrl={thumb?.href}
                keywords={meta.keywords}
                mediaType={meta.media_type}
                id={meta.nasa_id}
              />
            );
          })}
        </div>

        {totalHits > pageSize && (
          <div className="mt-8 flex justify-center">
            <Pagination
              page={page}
              totalPages={totalPages}
              hasPrevPage={hasPrevPage}
              hasNextPage={hasNextPage}
              onPageChange={setPage}
            />
          </div>
        )}
      </section>
    </main>
  );
}

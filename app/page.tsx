"use client";

import { useState, useEffect } from "react";
import { fetchDataAsync } from "@/app/_utils/fetch";
import type { NasaItem } from "@/app/_types/nasa";
import Card from "@/app/_components/Card";
import SearchBar from "@/app/_components/SearchBar";
import Filters from "@/app/_components/Filters";

export default function Home() {
  const [searchResults, setSearchResults] = useState<NasaItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("mars");
  const [mediaType, setMediaType] = useState<"all" | "image" | "video">("all");

  async function loadMedia(term: string, type: "all" | "image" | "video") {
    try {
      setLoading(true);
      const data = await fetchDataAsync(term, type);
      setSearchResults(data.collection.items);
    } catch (err) {
      setError("Something went wrong");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    loadMedia(searchTerm, mediaType);
  }, [searchTerm, mediaType]);

  if (loading) return <div>Loading</div>;
  if (error) return <div>{error}</div>;

  return (
    <main>
      <div className="mx-auto w-full max-w-7xl px-4 py-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SearchBar onSearch={setSearchTerm} />
          <Filters mediaType={mediaType} onMediaTypeChange={setMediaType} />
        </div>
      </div>
      <section className="mx-auto w-full max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {searchResults.map(result => {
          const meta = result.data[0];
          const thumb =
          result.links?.find(link => link.rel === "preview") ??
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
      </section>
    </main>
  );
}

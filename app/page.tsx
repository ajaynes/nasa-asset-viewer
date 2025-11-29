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
  const [searchTerm, setSearchTerm] = useState('mars');
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

  console.log(searchResults)

  if (loading) return <div>Loading</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="w-full">
          <div>{searchTerm}, {mediaType}</div>
          <SearchBar onSearch={setSearchTerm} />
          <Filters mediaType={mediaType} onMediaTypeChange={setMediaType} />
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
      </main>
    </div>
  );
}

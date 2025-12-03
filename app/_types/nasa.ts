export interface NasaSearchResponse {
  collection: NasaCollection;
}

export type NasaMetadata = {
  total_hits: number;
};

export interface NasaCollection {
  metadata?: NasaMetadata;
  version: string;
  href: string;
  items: NasaItem[];
}

export interface NasaItem {
  href: string;
  data: NasaItemData[];
  links?: NasaItemLink[];
}

export interface NasaItemData {
  center?: string;
  date_created: string;
  description?: string;
  keywords?: string[];
  location?: string;
  media_type: "image" | "video" | "audio";
  nasa_id: string;
  photographer?: string;
  title: string;
}

export interface NasaItemLink {
  href: string;
  rel: string;
  render?: string;
  width?: number;
  height?: number;
  size?: number;
}

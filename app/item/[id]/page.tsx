import { fetchItemById } from "@/app/_utils/fetch";
import DetailView from "./DetailView";

export default async function ItemDetailPage({params}: { params: Promise<{ id: string }>;}) {
  const { id } = await params;

  const data = await fetchItemById(id);
  const item = data.collection.items[0];

  return <DetailView item={item} />;
}


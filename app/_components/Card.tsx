import Image from "next/image";
import Link from "next/link";

type CardProps = {
  title: string;
  thumbnailUrl?: string;
  keywords?: string[];
  mediaType: string | undefined;
  id: string;
};

export default function Card({ title, thumbnailUrl, keywords = [], mediaType, id }: CardProps) {
  const cleanKeywords: string[] = [];

  if (keywords.length > 0) {
    if (keywords[0].includes(',')) {
      cleanKeywords.push(...keywords[0].split(','));
    } else {
      cleanKeywords.push(...keywords);
    }
  }

  return (
    <Link href={`/item/${id}`}>
      <article className="flex h-full flex-col overflow-hidden rounded-md border bg-white shadow-md border-white hover:shadow-lg hover:shadow-gray-950 hover:border-blue-500">
        <div className="relative w-full overflow-hidden bg-slate-100">
          <div className="relative aspect-video">
            {thumbnailUrl && (
              <Image
                src={thumbnailUrl}
                fill={true}
                alt={title}
                className="object-cover"
                sizes="(min-width: 768px) 400px, 100vw"
              />
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-4">
          <h1 className="line-clamp-2 text-lg font-semibold text-slate-900">{title}</h1>

          {cleanKeywords?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {cleanKeywords.splice(0, 4).map((keyword, i) => (
                <span
                  key={`${keyword}-${i}`}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700"
                >
                  {keyword}
                </span>
              ))}
            </div>
          )}

          <div className="mt-auto flex items-center justify-between pt-2 text-xs text-slate-900">
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 font-medium uppercase tracking-wide">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {mediaType}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

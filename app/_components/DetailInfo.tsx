"use client";

type DetailInfoProps = {
  title?: string;
  description?: string;
  location?: string;
  dateCreated?: string;
  photographer?: string;
  keywords?: string[];
  mediaType?: string;
};

export default function DetailInfo({
  title,
  description,
  location,
  dateCreated,
  photographer,
  keywords,
  mediaType,
}: DetailInfoProps) {
  return (
    <div className="space-y-4">
      <header className="space-y-2">
        {mediaType && (
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-50">
            {mediaType}
          </p>
        )}
        <h1 className="text-2xl font-semibold text-slate-50 md:text-3xl">
          {title}
        </h1>
      </header>

      {description && (
        <p className="whitespace-pre-line text-sm leading-relaxed text-slate-300">
          {description}
        </p>
      )}

      <dl className="grid gap-4 text-sm text-slate-50">
        {location && (
          <div className="flex flex-col gap-1">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-300">
              Location
            </dt>
            <dd>{location}</dd>
          </div>
        )}

        {dateCreated && (
          <div className="flex flex-col gap-1 text-slate-50">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-300">
              Date
            </dt>
            <dd>
              {new Date(dateCreated).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </dd>
          </div>
        )}

        {photographer && (
          <div className="flex flex-col gap-1 text-slate-50">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-300">
              Photographer
            </dt>
            <dd>{photographer}</dd>
          </div>
        )}
      </dl>

      {keywords && keywords.length > 0 && (
        <div className="space-y-2 text-slate-50">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-300">
            Keywords
          </h2>
          <div className="flex flex-wrap gap-2">
            {keywords.map((key) => (
              <span
                key={key}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700"
              >
                {key}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

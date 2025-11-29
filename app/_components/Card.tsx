import Image from "next/image";

type CardProps = {
  title: string;
  thumbnailUrl?: string;
  keywords?: string[];
  mediaType: string | undefined;
  id: string;
};

export default function Card({ title, thumbnailUrl, keywords = [], mediaType, id }: CardProps) {
  return (
    <div>
      {thumbnailUrl && (
        <div style={{ position: 'relative', height: 300}}>
          <Image
            src={thumbnailUrl}
            fill={true}
            alt={title}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}

      <h2>{title}</h2>

      <div>
        Media type: {mediaType}
      </div>

      {keywords.length > 0 && (
        <div>
          {keywords.map((keyword) => (
            <span
              key={`${keyword}-${id}`}
            >
              {keyword}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

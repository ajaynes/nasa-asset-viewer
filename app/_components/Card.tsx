import Image from "next/image";

type CardProps = {
  title: string;
  thumbnailUrl?: string;
  keywords?: string[];
  mediaType: string | undefined;
};

export default function Card({ title, thumbnailUrl, keywords = [], mediaType }: CardProps) {
  return (
    <div>
      {thumbnailUrl && (
        <div>
          <Image
            src={thumbnailUrl}
            width={300}
            height={300}
            alt={title}
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
              key={keyword}
            >
              {keyword}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

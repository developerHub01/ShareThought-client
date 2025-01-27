import React from "react";
import ImageUploadCanvas from "@/components/editor/components/ImageUploadCanvas";
import { useParams } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
interface ImageProps {
  id: string;
  alt?: string;
  caption?: string;
  [key: string]: unknown;
}

const Image = ({ id, alt = "", caption = "", ...props }: ImageProps) => {
  const { id: blogId } = useParams() as { id: string };

  const {
    metaData: { imgLinks, styles },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId as string]);

  if (!blogId) return null;

  const imageSrc = imgLinks && imgLinks[id];
  if (!imageSrc) return <ImageUploadCanvas id={id} blogId={blogId} />;

  const imageStyles = styles[id];

  const formattedStyles: Record<string, unknown> = {
    ...imageStyles,
  };

  const formattedFigureStyles: Record<string, unknown> = {};

  for (const key in imageStyles) {
    if (key.startsWith("padding")) {
      formattedFigureStyles[key] = imageStyles[key];
      delete formattedStyles[key];
    }
  }

  if (Array.isArray(imageStyles?.border))
    formattedStyles.border = `${imageStyles.border[0]}px ${imageStyles.border[1]} ${imageStyles.border[2]}`;
  if (Array.isArray(imageStyles?.borderTop))
    formattedStyles.borderTop = `${imageStyles.borderTop[0]}px ${imageStyles.borderTop[1]} ${imageStyles.borderTop[2]}`;
  if (Array.isArray(imageStyles?.borderBottom))
    formattedStyles.borderBottom = `${imageStyles.borderBottom[0]}px ${imageStyles.borderBottom[1]} ${imageStyles.borderBottom[2]}`;
  if (Array.isArray(imageStyles?.borderLeft))
    formattedStyles.borderLeft = `${imageStyles.borderLeft[0]}px ${imageStyles.borderLeft[1]} ${imageStyles.borderLeft[2]}`;
  if (Array.isArray(imageStyles?.borderRight))
    formattedStyles.borderRight = `${imageStyles.borderRight[0]}px ${imageStyles.borderRight[1]} ${imageStyles.borderRight[2]}`;

  return (
    <figure
      style={{
        ...formattedFigureStyles,
      }}
    >
      <img
        src={imageSrc}
        alt={alt}
        style={{
          ...formattedStyles,
        }}
      />
      {caption && <figcaption className="mt-1">{caption}</figcaption>}
    </figure>
  );
};

export default Image;

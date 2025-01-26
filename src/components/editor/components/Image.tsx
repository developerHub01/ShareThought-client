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

  return (
    <figure>
      <img
        src={imageSrc}
        alt={alt}
        style={{
          ...imageStyles,
        }}
      />
      {caption && <figcaption className="mt-1">{caption}</figcaption>}
    </figure>
  );
};

export default Image;

import React from "react";
import ImageUploadCanvas from "@/components/editor/components/ImageUploadCanvas";
import { useParams } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import useWrapperContentStyleSeparator from "@/hooks/editor/use-wrapper-content-style-separator";
import useHandleBorderStyle from "@/hooks/editor/use-handle-border-style";
import { StyleType } from "@/redux/features/builders/blogBuilderSlice";
import useHandleFilterStyle from "@/hooks/editor/use-handle-filter-style";
interface ImageProps {
  id: string;
  alt?: string;
  caption?: string;
  [key: string]: unknown;
}

const Image = ({
  id,
  alt = "",
  caption = "",
  redirect,
  ...props
}: ImageProps) => {
  const { id: blogId } = useParams() as { id: string };

  const {
    metaData: { imgLinks, styles },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId as string]);

  if (!blogId) return null;

  const imageSrc = imgLinks && imgLinks[id];
  if (!imageSrc) return <ImageUploadCanvas id={id} blogId={blogId} />;

  const imageStyles: StyleType = styles[id];

  let { contentStyles, wrapperStyles } =
    useWrapperContentStyleSeparator(imageStyles);

  const filteredBorder = useHandleBorderStyle(imageStyles);

  contentStyles = { ...contentStyles, ...filteredBorder };

  const filterStyles = useHandleFilterStyle(imageStyles);

  contentStyles = { ...contentStyles, ...filterStyles };

  const Comp = () => {
    return (
      <figure
        className="flex"
        style={{
          ...wrapperStyles,
        }}
      >
        <img
          src={imageSrc}
          alt={alt}
          style={{
            ...contentStyles,
          }}
        />
        {caption && <figcaption className="mt-1">{caption}</figcaption>}
      </figure>
    );
  };

  if (!redirect) return <Comp />;

  return (
    <a
      target="_blank"
      href={redirect as string}
      aria-label={alt || "Image link"}
      title={alt || "Image link"}
    >
      <Comp />
    </a>
  );
};

export default Image;

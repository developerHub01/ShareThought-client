"use client";

import React from "react";
import ImageUploadCanvas from "@/components/editor/components/ImageUploadCanvas";
import { useParams } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { StyleType } from "@/redux/features/builders/blogBuilderSlice";
import handleHandleFilterStyle from "@/utils/editor/handleHandleFilterStyle";
import handleBorderStyle from "@/utils/editor/handleBorderStyle";
import handleWrapperContentStyleSeparator from "@/utils/editor/handleWrapperContentStyleSeparator";
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
  const { id: blogId } = useParams<{ id: string }>();

  const {
    metaData: { imgLinks, styles },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

  if (!blogId) return null;

  const imageSrc = imgLinks && imgLinks[id];
  if (!imageSrc) return <ImageUploadCanvas id={id} blogId={blogId} />;

  const imageStyles: StyleType = styles[id];

  let { contentStyles, wrapperStyles } =
    handleWrapperContentStyleSeparator(imageStyles);

  const filteredBorder = handleBorderStyle(imageStyles);

  contentStyles = { ...contentStyles, ...filteredBorder };

  const filterStyles = handleHandleFilterStyle(imageStyles);

  contentStyles = { ...contentStyles, ...filterStyles };

  if (typeof contentStyles.width === "number")
    contentStyles.width = `${contentStyles.width}%`;

  const figureStyle: Record<string, string | number> = {};

  if (typeof contentStyles.width === "string") {
    figureStyle["width"] = contentStyles.width;
    delete contentStyles.width;
  }

  const Comp = () => {
    return (
      <div
        className="flex"
        style={{
          ...wrapperStyles,
        }}
      >
        <figure
          style={{
            ...figureStyle,
          }}
        >
          <img
            style={{
              ...contentStyles,
            }}
            className="w-full"
            src={imageSrc}
            alt={alt}
          />
          {caption && <figcaption className="mt-1">{caption}</figcaption>}
        </figure>
      </div>
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

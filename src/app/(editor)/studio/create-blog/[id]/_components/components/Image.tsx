"use client";

import React, { memo } from "react";
import ImageUploadCanvas from "@/app/(editor)/studio/create-blog/[id]/_components/components/ImageUploadCanvas";
import { useParams } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { StyleType } from "@/redux/features/builders/blogBuilderSlice";
import handleHandleFilterStyle from "@/utils/editor/handleHandleFilterStyle";
import handleBorderStyle from "@/utils/editor/handleBorderStyle";
import handleWrapperContentStyleSeparator from "@/utils/editor/handleWrapperContentStyleSeparator";
import {
  selectBlogComponentById,
  selectBlogImgLinkById,
  selectBlogScreenType,
  selectBlogStylesById,
} from "@/redux/features/builders/selectors";
interface ImageProps {
  id: string;
  parentId?: string;
  alt?: string;
  caption?: string;
  [key: string]: unknown;
}

const Image = memo(({ id, parentId, ...props }: ImageProps) => {
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const styles = useAppSelector((state) =>
    selectBlogStylesById(state, blogId, id)
  );
  const {
    alt = "",
    caption = "",
    redirect,
    type,
  } = useAppSelector((state) => selectBlogComponentById(state, blogId, id));
  const imageSrc = useAppSelector((state) =>
    selectBlogImgLinkById(state, blogId, id)
  );

  if (!imageSrc) return <ImageUploadCanvas id={id} blogId={blogId} />;

  let { contentStyles, wrapperStyles } =
    handleWrapperContentStyleSeparator(styles);

  const filteredBorder = handleBorderStyle(styles);

  contentStyles = { ...contentStyles, ...filteredBorder };

  const filterStyles = handleHandleFilterStyle(styles);

  contentStyles = { ...contentStyles, ...filterStyles };

  if (typeof contentStyles.width === "number")
    contentStyles.width = `${contentStyles.width}%`;
  if (typeof contentStyles.height === "number")
    contentStyles.height = `${contentStyles.height}%`;

  const figureStyle: Record<string, string | number> = {};

  if (typeof contentStyles.width === "string") {
    figureStyle["width"] = contentStyles.width;
    delete contentStyles.width;
  }
  if (typeof contentStyles.height === "string") {
    figureStyle["height"] = contentStyles.height;
    delete contentStyles.height;
  }

  const Comp = () => {
    return (
      <div
        className="flex w-full h-full overflow-hidden"
        style={{
          ...wrapperStyles,
        }}
        {...(!redirect
          ? {
              "data-component-type": type,
              "data-component-id": id,
            }
          : {})}
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
            className="w-full h-full"
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
      data-component-type={type}
      data-component-id={id}
    >
      <Comp />
    </a>
  );
});

export default Image;

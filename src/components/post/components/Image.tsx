import React from "react";
import {
  BlogComponentsDataInterface,
  BlogContentType,
  BlogMetaDataInterface,
  StyleType,
} from "@/redux/features/builders/blogBuilderSlice";
import handleBorderStyle from "@/utils/editor/handleBorderStyle";
import handleWrapperContentStyleSeparator from "@/utils/editor/handleWrapperContentStyleSeparator";
import handleHandleFilterStyle from "@/utils/editor/handleHandleFilterStyle";

interface ImageProps {
  id: string;
  content: BlogContentType;
  components: BlogComponentsDataInterface;
  metaData: BlogMetaDataInterface;
}

const Image = ({ id, components, metaData }: ImageProps) => {
  if (!components || !components[id]) return null;

  const { alt, caption, redirect, type } = components[id];

  if (!metaData?.imgLinks?.[id]) return null;

  const imageSrc = metaData.imgLinks[id];

  const imageStyles: StyleType = metaData.styles[id];

  let { contentStyles, wrapperStyles } =
    handleWrapperContentStyleSeparator(imageStyles);

  const filteredBorder = handleBorderStyle(imageStyles);

  contentStyles = { ...contentStyles, ...filteredBorder };

  const filterStyles = handleHandleFilterStyle(imageStyles);

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
      aria-label={alt ?? "Image link"}
      title={alt ?? "Image link"}
      data-component-type={type}
    >
      <Comp />
    </a>
  );
};

export default Image;

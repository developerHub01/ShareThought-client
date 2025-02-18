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
  const component = components[id];

  if (!component) return null;

  const { alt, caption, redirect } = component;

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
      aria-label={alt ?? "Image link"}
      title={alt ?? "Image link"}
    >
      <Comp />
    </a>
  );
};

export default Image;

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
          alt={component.alt}
          style={{
            ...contentStyles,
          }}
        />
        {component.caption && (
          <figcaption className="mt-1">{component.caption}</figcaption>
        )}
      </figure>
    );
  };

  if (!component.redirect) return <Comp />;

  return (
    <a
      target="_blank"
      href={component.redirect as string}
      aria-label={component.alt ?? "Image link"}
      title={component.alt ?? "Image link"}
    >
      <Comp />
    </a>
  );
};

export default Image;

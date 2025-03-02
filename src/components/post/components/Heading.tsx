import { TYPOGRAPHY_LIST } from "@/constant";
import {
  BlogComponentsDataInterface,
  BlogContentType,
  BlogMetaDataInterface,
} from "@/redux/features/builders/blogBuilderSlice";
import { CSSProperties } from "react";

interface HeadingProps {
  id: string;
  content: BlogContentType;
  components: BlogComponentsDataInterface;
  metaData: BlogMetaDataInterface;
}

const Heading = ({ id, components, metaData }: HeadingProps) => {
  if (!components || !components[id]) return null;

  const { type, text } = components[id];

  const componentStyle = (metaData.styles[id] || {}) as CSSProperties;

  const { tag: Tag, className: defaultClassName } =
    TYPOGRAPHY_LIST[type] || TYPOGRAPHY_LIST.h1;

  return (
    <Tag
      className={defaultClassName}
      style={{
        ...componentStyle,
      }}
      data-component-type={type}
      data-component-id={id}
    >
      {text}
    </Tag>
  );
};

export default Heading;

import {
  BlogComponentsDataInterface,
  BlogContentType,
  BlogMetaDataInterface,
} from "@/redux/features/builders/blogBuilderSlice";
import { CSSProperties } from "react";
import { typographyList } from "@/components/editor/constant";

interface HeadingProps {
  id: string;
  content: BlogContentType;
  components: BlogComponentsDataInterface;
  metaData: BlogMetaDataInterface;
}

const Heading = ({ id, components, metaData }: HeadingProps) => {
  const component = components[id];

  if (!component) return null;

  const { type, text } = component;

  const componentStyle = (metaData.styles[id] || {}) as CSSProperties;

  const { tag: Tag, className: defaultClassName } =
    typographyList[type] || typographyList.h1;

  return (
    <Tag
      className={defaultClassName}
      style={{
        ...componentStyle,
      }}
    >
      {text}
    </Tag>
  );
};

export default Heading;

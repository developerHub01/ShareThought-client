import BlockDecision from "@/components/post/components/BlockDecision";
import {
  BlogComponentsDataInterface,
  BlogContentType,
  BlogMetaDataInterface,
  StyleType,
} from "@/redux/features/builders/blogBuilderSlice";
import handleBorderStyle from "@/utils/editor/handleBorderStyle";
import handleBoxShadow from "@/utils/editor/handleBoxShadow";
import React, { CSSProperties } from "react";

interface RowProps {
  id: string;
  content: BlogContentType;
  components: BlogComponentsDataInterface;
  metaData: BlogMetaDataInterface;
}

const Column = (props: RowProps) => {
  const { id, ...restProps } = props;

  const {
    components,
    metaData: { styles = {} },
  } = restProps;

  if (!components || !components[id]) return null;

  const { children, type } = components[id];

  let componentStyles: StyleType = styles[id] || {};

  componentStyles = {
    ...componentStyles,
    ...handleBorderStyle(componentStyles),
  };
  componentStyles = {
    ...componentStyles,
    ...handleBoxShadow(componentStyles),
  };

  return (
    <section
      className="w-full h-full flex flex-col"
      style={{
        ...(componentStyles as CSSProperties),
      }}
      data-component-type={type}
      data-component-id={id}
    >
      {Array.isArray(children) && (
        <>
          {children.map((id) => (
            <BlockDecision key={id} {...restProps} id={id} />
          ))}
        </>
      )}
    </section>
  );
};

export default Column;

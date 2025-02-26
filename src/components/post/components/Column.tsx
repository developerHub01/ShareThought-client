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

  if (!components) return null;

  const component = components[id];

  if (!component) return null;

  const { children } = component;

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
      className="w-full flex flex-col"
      style={{
        ...(componentStyles as CSSProperties),
      }}
    >
      {Array.isArray(children) && (
        <>
          {children.map((id) => (
            <div key={id} className="group">
              <BlockDecision {...restProps} id={id} />
            </div>
          ))}
        </>
      )}
    </section>
  );
};

export default Column;

import BlockDecision from "@/components/post/components/BlockDecision";
import {
  BlogComponentsDataInterface,
  BlogContentType,
  BlogMetaDataInterface,
} from "@/redux/features/builders/blogBuilderSlice";
import React from "react";

interface RowProps {
  id: string;
  content: BlogContentType;
  components: BlogComponentsDataInterface;
  metaData: BlogMetaDataInterface;
}

const Column = (props: RowProps) => {
  const { id, ...restProps } = props;

  const { components } = restProps;

  const component = components[id];

  if (!component) return null;

  const { children } = component;

  return (
    <section className="w-full flex flex-col">
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

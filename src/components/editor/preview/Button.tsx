import React from "react";

import {
  BlogComponentsDataInterface,
  BlogContentType,
  BlogMetaDataInterface,
  StyleType,
} from "@/redux/features/builders/blogBuilderSlice";
import handleWrapperContentStyleSeparator from "@/utils/editor/handleWrapperContentStyleSeparator";
import handleBorderStyle from "@/utils/editor/handleBorderStyle";
import Link from "next/link";

interface ButtonProps {
  id: string;
  content: BlogContentType;
  components: BlogComponentsDataInterface;
  metaData: BlogMetaDataInterface;
}

const Button = ({ id, metaData, components }: ButtonProps) => {
  const buttonStyles: StyleType = metaData.styles[id];

  const component = components[id];

  if (!component) return null;

  const { text, redirect } = component;

  let { contentStyles, wrapperStyles } =
    handleWrapperContentStyleSeparator(buttonStyles);

  const filteredBorder = handleBorderStyle(buttonStyles);

  contentStyles = { ...contentStyles, ...filteredBorder };

  const Comp = () => (
    <button
      type="button"
      className="text-base px-4 py-2 bg-primary text-primary-foreground cursor-pointer"
      style={{
        ...contentStyles,
      }}
    >
      {text}
    </button>
  );

  return (
    <div
      className="flex"
      style={{
        ...wrapperStyles,
      }}
    >
      {redirect ? (
        <Link href={redirect} target="_blank">
          <Comp />
        </Link>
      ) : (
        <Comp />
      )}
    </div>
  );
};

export default Button;

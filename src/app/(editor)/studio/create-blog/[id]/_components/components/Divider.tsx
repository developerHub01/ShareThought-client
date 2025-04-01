"use client";

import useCombinedResponsiveSettingStyles from "@/hooks/editor/use-combined-responsive-setting-styles";
import { StyleType } from "@/redux/features/builders/blogBuilderSlice";
import {
  selectBlogMobileStylesById,
  selectBlogScreenType,
  selectBlogStylesById,
} from "@/redux/features/builders/selectors";
import { useAppSelector } from "@/redux/hooks";
import handleBorderStyle from "@/utils/editor/handleBorderStyle";
import handleWrapperContentStyleSeparator from "@/utils/editor/handleWrapperContentStyleSeparator";
import { useParams } from "next/navigation";
import React, { memo } from "react";

interface DividerProps {
  id: string;
  parentId?: string;
}

const Divider = memo(({ id, parentId, ...props }: DividerProps) => {
  const { id: blogId } = useParams<{ id: string }>();

  const screenType = useAppSelector((state) =>
    selectBlogScreenType(state, blogId)
  );
  const styles = useAppSelector((state) =>
    selectBlogStylesById(state, blogId, id)
  );
  const mobileStyles = useAppSelector((state) =>
    selectBlogMobileStylesById(state, blogId, id)
  );
  if (!blogId) return null;

  const combinedStyles = useCombinedResponsiveSettingStyles({
    type: "divider",
    screenType,
    styles,
    mobileStyles,
  });

  let { contentStyles, wrapperStyles } =
    handleWrapperContentStyleSeparator(combinedStyles);

  contentStyles = {
    ...contentStyles,
    ...handleBorderStyle(contentStyles as StyleType),
  };

  if (contentStyles.width) contentStyles.width = `${contentStyles.width}%`;

  return (
    <div
      className={"flex"}
      style={{
        ...(wrapperStyles as Record<string, string | number>),
      }}
      data-component-type={"divider"}
      data-component-id={id}
    >
      <div
        style={{
          ...contentStyles,
        }}
      ></div>
    </div>
  );
});

export default Divider;

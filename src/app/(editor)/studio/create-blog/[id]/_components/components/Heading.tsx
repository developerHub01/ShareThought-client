"use client";

import { updateComponentText } from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import React, { CSSProperties, FocusEvent, memo } from "react";
import { TYPOGRAPHY_LIST } from "@/constant";
import {
  selectBlogComponentById,
  selectBlogGlobalStyle,
  selectBlogMobileStylesById,
  selectBlogScreenType,
  selectBlogStylesById,
} from "@/redux/features/builders/selectors";
import useCombinedResponsiveSettingStyles from "@/hooks/editor/use-combined-responsive-setting-styles";
import { useTheme } from "next-themes";
import { toggleColorModeBaseOnMode } from "@/utils/color";

interface HeadingProps {
  id: string;
  parentId?: string;
}

const Heading = memo(({ id, parentId, ...props }: HeadingProps) => {
  const { id: blogId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme as "light" | "dark";

  const screenType = useAppSelector((state) =>
    selectBlogScreenType(state, blogId)
  );
  const globalStyles = useAppSelector((state) =>
    selectBlogGlobalStyle(state, blogId)
  );
  const styles = useAppSelector((state) =>
    selectBlogStylesById(state, blogId, id)
  );
  const mobileStyles = useAppSelector((state) =>
    selectBlogMobileStylesById(state, blogId, id)
  );
  const component = useAppSelector((state) =>
    selectBlogComponentById(state, blogId, id)
  );

  if (!blogId || !component) return null;

  const { type, text } = component;

  let combinedStyles = useCombinedResponsiveSettingStyles({
    type,
    screenType,
    styles,
    mobileStyles,
    globalStyles,
  }) as CSSProperties;

  const handleBlur = (
    e: FocusEvent<HTMLHeadElement | HTMLParagraphElement>
  ) => {
    dispatch(
      updateComponentText({
        blogId,
        id,
        text: e.target.innerText ?? "",
      })
    );
  };

  console.log({ theme });
  console.log("before ===== ", combinedStyles);
  if (combinedStyles.color) {
    const color = toggleColorModeBaseOnMode(combinedStyles.color, theme);
    console.log({ color });
    // combinedStyles.color = color;
    combinedStyles = {
      ...combinedStyles,
      color,
    };
  }
  console.log("after ===== ", combinedStyles);

  const { tag: Tag, className: defaultClassName } =
    TYPOGRAPHY_LIST[type] || TYPOGRAPHY_LIST.h1;

  return (
    <Tag
      contentEditable
      suppressContentEditableWarning
      data-component-type={type}
      data-component-id={id}
      onBlur={handleBlur}
      className={defaultClassName}
      style={{
        ...combinedStyles,
      }}
    >
      {text}
    </Tag>
  );
});

export default Heading;

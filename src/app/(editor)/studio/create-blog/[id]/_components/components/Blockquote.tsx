"use client";

import { BlockquoteInterface } from "@/redux/features/builders/blogBuilderSlice";
import {
  selectBlogComponentById,
  selectBlogStylesById,
} from "@/redux/features/builders/selectors";
import { useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import BlockquoteComponent from "@/components/ui/blockquote";
import React, { CSSProperties } from "react";
import useCombinedResponsiveSettingStyles from "@/hooks/editor/use-combined-responsive-setting-styles";

interface BlockquoteProps {
  id: string;
  parentId?: string;
}

const Blockquote = ({ id, parentId, ...props }: BlockquoteProps) => {
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const component = useAppSelector((state) =>
    selectBlogComponentById(state, blogId, id)
  );
  const styles = useAppSelector((state) =>
    selectBlogStylesById(state, blogId, id)
  );

  const combinedStyles = useCombinedResponsiveSettingStyles({
    type: "blockquote",
    screenType: "desktop",
    styles,
  }) as CSSProperties;

  if (!component || component.type !== "blockquote" || !component?.children)
    return null;

  const blockquoteData = component.children as BlockquoteInterface;

  return <BlockquoteComponent {...blockquoteData} styles={combinedStyles} />;
};

export default Blockquote;

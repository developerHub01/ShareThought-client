"use client";

import React, { memo } from "react";
import TextAlignBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/TextAlignBlock";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  LucideIcon,
} from "@/lib/icons";
import {
  AlignType,
  addStyle,
} from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import useActiveStylePropertyTab from "@/hooks/editor/use-active-style-property-tab";
import {
  selectBlogActiveBlock,
  selectBlogComponentById,
  selectBlogMobileStylesById,
  selectBlogScreenType,
  selectBlogStylesById,
} from "@/redux/features/builders/selectors";

const alignList: Array<{
  id: AlignType;
  label: string;
  Icon: LucideIcon;
}> = [
  {
    id: "left",
    label: "Align Left",
    Icon: AlignLeft,
  },
  {
    id: "center",
    label: "Align Center",
    Icon: AlignCenter,
  },
  {
    id: "right",
    label: "Align Right",
    Icon: AlignRight,
  },
  {
    id: "justify",
    label: "Align Justify",
    Icon: AlignJustify,
  },
];

const TextAlignProperty = memo(() => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const activeBlock = useAppSelector((state) =>
    selectBlogActiveBlock(state, blogId)
  );
  const screenType = useAppSelector((state) =>
    selectBlogScreenType(state, blogId)
  );
  const styles =
    useAppSelector((state) =>
      selectBlogStylesById(state, blogId, activeBlock)
    ) ?? {};
  const mobileStyles =
    useAppSelector((state) =>
      selectBlogMobileStylesById(state, blogId, activeBlock)
    ) ?? {};
  const component = useAppSelector((state) =>
    selectBlogComponentById(state, blogId, activeBlock)
  );

  if (!blogId || !activeBlock || !component || !component.type) return null;

  const { type } = component;

  console.log("Re-run textAlign property===========");

  const activeStyle = useActiveStylePropertyTab({
    type,
    styles,
    mobileStyles,
    screenType,
    propertyName: "textAlign",
  });

  const handleChangeAlign = (value: string) => {
    dispatch(
      addStyle({
        blogId,
        activeBlockId: activeBlock,
        styles: {
          textAlign: value as AlignType,
        },
      })
    );
  };

  return (
    <TextAlignBlock
      title="Align"
      activeAlign={String(activeStyle?.textAlign ?? alignList[0].id)}
      handleChange={handleChangeAlign}
      alignList={alignList}
    />
  );
});

export default TextAlignProperty;

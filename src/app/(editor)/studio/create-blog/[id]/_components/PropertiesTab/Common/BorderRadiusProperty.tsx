"use client";

import React, { useEffect } from "react";
import BorderRadiusBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/BorderRadiusBlock";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import {
  BorderRadiusType,
  createActiveBlockStyle,
  toggleBorderRadiusAll,
  updateBorderRadiusStyle,
} from "@/redux/features/builders/blogBuilderSlice";

const BorderRadiusProperty = () => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const {
    activeBlock,
    metaData: { styles },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId as string]);

  const borderRadius: Record<string, number> = {};

  useEffect(() => {
    if (activeBlock && !styles[activeBlock])
      dispatch(
        createActiveBlockStyle({
          blogId,
          activeBlockId: activeBlock,
        })
      );
  }, [activeBlock, styles]);

  if (!activeBlock) return null;

  if (!styles[activeBlock]) return null;

  if (styles[activeBlock].borderRadius !== undefined)
    borderRadius["borderRadius"] = styles[activeBlock].borderRadius as number;

  if (styles[activeBlock].borderTopLeftRadius !== undefined)
    borderRadius["borderTopLeftRadius"] = styles[activeBlock]
      .borderTopLeftRadius as number;

  if (styles[activeBlock].borderTopRightRadius !== undefined)
    borderRadius["borderTopRightRadius"] = styles[activeBlock]
      .borderTopRightRadius as number;

  if (styles[activeBlock].borderBottomLeftRadius !== undefined)
    borderRadius["borderBottomLeftRadius"] = styles[activeBlock]
      .borderBottomLeftRadius as number;

  if (styles[activeBlock].borderBottomRightRadius !== undefined)
    borderRadius["borderBottomRightRadius"] = styles[activeBlock]
      .borderBottomRightRadius as number;

  const handleChangeBorderRadius = (
    borderRadius: Partial<Record<BorderRadiusType, number | "inc" | "dec">>
  ) => {
    dispatch(
      updateBorderRadiusStyle({
        blogId,
        activeBlockId: activeBlock,
        borderRadius,
      })
    );
  };

  const handleToggleMore = () => {
    dispatch(
      toggleBorderRadiusAll({
        blogId,
        activeBlockId: activeBlock,
      })
    );
  };

  return (
    <BorderRadiusBlock
      borderRadius={borderRadius}
      handleChange={handleChangeBorderRadius}
      handleToggleMore={handleToggleMore}
    />
  );
};

export default BorderRadiusProperty;

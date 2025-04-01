"use client";

import React from "react";
import TextAlignBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/TextAlignBlock";
import {
  AlignCenterHorizontal,
  AlignEndHorizontal,
  AlignStartHorizontal,
  AlignVerticalDistributeCenter,
  AlignVerticalSpaceAround,
  AlignVerticalSpaceBetween,
} from "@/lib/icons";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectBlogActiveBlock,
  selectBlogStylesById,
} from "@/redux/features/builders/selectors";
import { addStyle } from "@/redux/features/builders/blogBuilderSlice";

const alignList = [
  {
    id: "flex-start",
    label: "Top",
    Icon: AlignStartHorizontal,
  },
  {
    id: "center",
    label: "Center",
    Icon: AlignCenterHorizontal,
  },
  {
    id: "flex-end",
    label: "Bottom",
    Icon: AlignEndHorizontal,
  },
  {
    id: "space-between",
    label: "Space Between",
    Icon: AlignVerticalSpaceBetween,
  },
  {
    id: "space-around",
    label: "Space Around",
    Icon: AlignVerticalSpaceAround,
  },
  {
    id: "space-evenly",
    label: "Space Evenly",
    Icon: AlignVerticalDistributeCenter,
  },
];

const VerticleAlign = () => {
  const { id: blogId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  if (!blogId) return null;

  const activeBlock = useAppSelector((state) =>
    selectBlogActiveBlock(state, blogId)
  );
  const styles = useAppSelector((state) =>
    selectBlogStylesById(state, blogId, activeBlock)
  );

  if (!activeBlock) return null;

  const handlejustifyContent = (value: string) => {
    dispatch(
      addStyle({
        blogId,
        activeBlockId: activeBlock,
        styles: {
          //   display: "flex",
          justifyContent: value as string,
        },
      })
    );
  };

  return (
    <TextAlignBlock
      title="Horizontal Align"
      activeAlign={(styles.justifyContent || alignList[0].id) as string}
      alignList={alignList}
      handleChange={handlejustifyContent}
    />
  );
};

export default VerticleAlign;

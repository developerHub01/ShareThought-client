"use client";

import React, { CSSProperties, memo } from "react";
import SelectBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/SelectBlock";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import { addStyle } from "@/redux/features/builders/blogBuilderSlice";
import {
  selectBlogActiveBlock,
  selectBlogStylesById,
} from "@/redux/features/builders/selectors";

const objectFitList = [
  {
    id: "fill",
    label: "Fill (Default)",
  },
  {
    id: "contain",
    label: "Contain",
  },
  {
    id: "cover",
    label: "Cover",
  },
  {
    id: "scale-down",
    label: "Scale Down",
  },
  {
    id: "none",
    label: "None",
  },
];

const ImageObjectFit = memo(() => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const activeBlock = useAppSelector((state) =>
    selectBlogActiveBlock(state, blogId)
  );
  const styles = useAppSelector((state) =>
    selectBlogStylesById(state, blogId, activeBlock)
  ) as CSSProperties;

  if (!activeBlock) return null;

  const handleChange = (value: string) => {
    dispatch(
      addStyle({
        blogId,
        activeBlockId: activeBlock,
        styles: {
          objectFit: value,
        },
      })
    );
  };

  return (
    <SelectBlock
      label="Object Fit"
      activeValue={String(styles?.objectFit || objectFitList[0].id)}
      itemList={objectFitList}
      handleChange={handleChange}
    />
  );
});

export default ImageObjectFit;

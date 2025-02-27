"use client";

import React, { CSSProperties } from "react";
import SelectBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/SelectBlock";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import { addStyle } from "@/redux/features/builders/blogBuilderSlice";

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

const ImageObjectFit = () => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const {
    activeBlock,
    metaData: { styles },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

  if (!activeBlock) return null;

  const activeStyle = styles[activeBlock] as CSSProperties;

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
      activeValue={String(activeStyle?.objectFit || objectFitList[0].id)}
      itemList={objectFitList}
      handleChange={handleChange}
    />
  );
};

export default ImageObjectFit;

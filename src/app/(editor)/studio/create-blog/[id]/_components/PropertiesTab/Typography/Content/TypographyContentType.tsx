"use client";

import React from "react";
import SelectBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/SelectBlock";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import {
  changeType,
  TypographyType,
} from "@/redux/features/builders/blogBuilderSlice";
import { typographyTypeList } from "@/constant";

const TypographyContentType = () => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const { activeBlock, components } = useAppSelector(
    (state) => state.blogBuilder.blogs[blogId]
  );

  if (!activeBlock) return null;

  const typographyType = components[activeBlock].type;

  const handleChangeTypographyType = (value: TypographyType) => {
    dispatch(
      changeType({
        blogId,
        activeBlockId: activeBlock,
        type: value,
      })
    );
  };

  return (
    <SelectBlock
      label="Type"
      activeValue={typographyType || typographyTypeList[0].id}
      itemList={typographyTypeList}
      handleChange={(value) =>
        handleChangeTypographyType(value as TypographyType)
      }
    />
  );
};

export default TypographyContentType;

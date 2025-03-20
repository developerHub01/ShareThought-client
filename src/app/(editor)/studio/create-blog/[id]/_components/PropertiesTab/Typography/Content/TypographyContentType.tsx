"use client";

import React, { memo } from "react";
import SelectBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/SelectBlock";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import {
  changeType,
  TypographyType,
} from "@/redux/features/builders/blogBuilderSlice";
import { typographyTypeList } from "@/constant";
import {
  selectBlogActiveBlock,
  selectBlogComponentById,
} from "@/redux/features/builders/selectors";

const TypographyContentType = memo(() => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const activeBlock = useAppSelector((state) =>
    selectBlogActiveBlock(state, blogId)
  );
  const component = useAppSelector((state) =>
    selectBlogComponentById(state, blogId, activeBlock)
  );

  if (!activeBlock || !component) return null;

  const { type } = component;

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
      activeValue={type || typographyTypeList[0].id}
      itemList={typographyTypeList}
      handleChange={(value) =>
        handleChangeTypographyType(value as TypographyType)
      }
    />
  );
});

export default TypographyContentType;

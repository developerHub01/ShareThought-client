"use client";

import React from "react";
import SelectBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/SelectBlock";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import {
  BlockTypes,
  changeType,
} from "@/redux/features/builders/blogBuilderSlice";

type TypographyType = Extract<
  BlockTypes,
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p"
>;

const typographyTypeList: Array<{
  id: TypographyType;
  label: string;
}> = [
  {
    id: "h1",
    label: "Heading 1",
  },
  {
    id: "h2",
    label: "Heading 2",
  },
  {
    id: "h3",
    label: "Heading 3",
  },
  {
    id: "h4",
    label: "Heading 4",
  },
  {
    id: "h5",
    label: "Heading 5",
  },
  {
    id: "h6",
    label: "Heading 6",
  },
  {
    id: "p",
    label: "Paragraph",
  },
];

const TypographyContentType = () => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const {
    activeBlock,
    components,
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

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

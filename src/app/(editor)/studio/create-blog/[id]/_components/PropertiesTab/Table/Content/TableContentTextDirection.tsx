"use client";

import React, { memo } from "react";
import TextAlignBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/TextAlignBlock";
import { LRTIcon, RTLIcon } from "@/lib/icons";
import {
  changeTableContentStyle,
  TableInterface,
  TextDirectionType,
} from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import {
  selectBlogActiveBlock,
  selectBlogComponentById,
} from "@/redux/features/builders/selectors";

const alignList = [
  {
    id: "ltr",
    label: "Left to Right",
    Icon: LRTIcon,
  },
  {
    id: "rtl",
    label: "Right to Left",
    Icon: RTLIcon,
  },
];

const TableContentTextDirection = memo(() => {
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

  const tableData = component?.children as TableInterface;

  const tableContent = tableData.content;

  const handleChangeAlign = (value: string) => {
    dispatch(
      changeTableContentStyle({
        blogId,
        id: activeBlock,
        textDirection: value as TextDirectionType,
      })
    );
  };

  return (
    <TextAlignBlock
      title="Text Direction"
      activeAlign={tableContent?.align || alignList[0].id}
      handleChange={handleChangeAlign}
      alignList={alignList}
    />
  );
});

export default TableContentTextDirection;

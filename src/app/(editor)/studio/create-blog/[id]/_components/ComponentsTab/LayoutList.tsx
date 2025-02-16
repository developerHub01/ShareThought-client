"use client";

import React, { useMemo } from "react";
import { useEditor } from "@/app/(editor)/studio/create-blog/[id]/_components/EditorProvider";
import { useAppDispatch } from "@/redux/hooks";
import {
  addComponent,
  BlockTypes,
} from "@/redux/features/builders/blogBuilderSlice";
import { useParams } from "next/navigation";
import { layoutItemList } from "@/app/(editor)/studio/create-blog/[id]/_constant";
import ComponentItemList from "@/app/(editor)/studio/create-blog/[id]/_components/ComponentsTab/ComponentItemList";
import LayoutButton from "@/app/(editor)/studio/create-blog/[id]/_components/LayoutButton";

const LayoutList = () => {
  const { id: blogId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { setIsComponentDialogOpen, selectedIndex } = useEditor();
  const modifiedLayoutList = useMemo(() => {
    return layoutItemList.map((item) => ({
      id: `row_${item}`,
      sizes: item.split("/").map((colSize) => Number(colSize)),
    }));
  }, []);

  const handleClick = (blockId: string) => {
    const [type, gridSize] = blockId?.split("_")?.map((item, index) => {
      if (!index) return item;

      return item?.split("/")?.map(Number);
    }) as [BlockTypes, Array<number>];

    setIsComponentDialogOpen(false);
    dispatch(
      addComponent({
        id: blogId,
        type,
        gridSize,
        index: selectedIndex,
      })
    );
  };

  return (
    <ComponentItemList.Wrapper className="flex flex-col gap-3">
      <ComponentItemList.Title>Layouts</ComponentItemList.Title>
      <div className="w-full flex flex-col gap-3 sm:gap-5 p-2">
        {modifiedLayoutList.map(({ id, sizes }) => (
          <LayoutButton
            key={id}
            className="cursor-grabbing"
            sizes={sizes}
            onClick={() => handleClick(id)}
          />
        ))}
      </div>
    </ComponentItemList.Wrapper>
  );
};

export default LayoutList;

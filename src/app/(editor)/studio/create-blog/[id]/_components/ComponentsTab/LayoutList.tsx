"use client";

import React, { useMemo } from "react";
import { BlockTypes } from "@/redux/features/builders/blogBuilderSlice";
import { layoutItemList } from "@/app/(editor)/studio/create-blog/[id]/_constant";
import ComponentItemList from "@/app/(editor)/studio/create-blog/[id]/_components/ComponentsTab/ComponentItemList";
import LayoutButton from "@/app/(editor)/studio/create-blog/[id]/_components/LayoutButton";

const LayoutList = () => {
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
            onClick={() => {}}
          />
        ))}
      </div>
    </ComponentItemList.Wrapper>
  );
};

export default LayoutList;

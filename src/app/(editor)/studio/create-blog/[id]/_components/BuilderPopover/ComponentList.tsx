"use client";

import React from "react";
import { useEditor } from "@/app/(editor)/studio/create-blog/[id]/_context/EditorProvider";
import { useAppDispatch } from "@/redux/hooks";
import {
  addComponent,
  BlockTypes,
} from "@/redux/features/builders/blogBuilderSlice";
import { useParams } from "next/navigation";
import ComponentButton from "@/app/(editor)/studio/create-blog/[id]/_components/ComponentButton";
import { componentItemList } from "@/app/(editor)/studio/create-blog/[id]/_constant";

const ComponentList = () => {
  const { id: blogId } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();

  const { setIsComponentDialogOpen, selectedIndex, selectedParentId } =
    useEditor();

  const handleClick = (blockId: BlockTypes) => {
    setIsComponentDialogOpen(false);

    dispatch(
      addComponent({
        id: blogId,
        type: blockId,
        index: selectedIndex,
        parentId: selectedParentId,
      })
    );
  };

  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 p-2">
      {componentItemList.map(({ id, label, Icon }) => (
        <ComponentButton
          key={id}
          label={label}
          Icon={Icon}
          onClick={() => handleClick(id)}
        />
      ))}
    </div>
  );
};

export default ComponentList;

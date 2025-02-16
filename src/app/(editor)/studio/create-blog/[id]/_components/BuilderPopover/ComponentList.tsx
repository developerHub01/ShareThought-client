"use client";

import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEditor } from "@/app/(editor)/studio/create-blog/[id]/_components/EditorProvider";
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
      <TooltipProvider>
        {componentItemList.map(({ id, label, Icon }) => (
          <Tooltip key={id}>
            <TooltipTrigger asChild>
              <ComponentButton
                label={label}
                Icon={Icon}
                onClick={() => handleClick(id)}
              />
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={10}>
              <p>{label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
};

export default ComponentList;

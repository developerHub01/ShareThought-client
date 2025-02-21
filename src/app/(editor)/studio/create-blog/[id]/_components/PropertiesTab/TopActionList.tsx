"use client";

import React, { useMemo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  Trash as DeleteIcon,
  Copy as DuplicateIcon,
  X as ClearIcon,
} from "lucide-react";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  changeActiveBlock,
  removeComponent,
  duplicateComponent,
} from "@/redux/features/builders/blogBuilderSlice";
import { useParams } from "next/navigation";

const TopActionList = () => {
  const { id: blogId } = useParams<{
    id: string;
  }>();

  const dispatch = useAppDispatch();
  const { activeBlock } = useAppSelector(
    (state) => state.blogBuilder.blogs[blogId]
  );

  const actionList = useMemo(
    () => [
      {
        id: "delete",
        Icon: DeleteIcon,
        label: "Delete",
        onClick: () => {
          if (!activeBlock) return null;

          dispatch(
            removeComponent({
              blogId,
              id: activeBlock,
            })
          );
        },
      },
      {
        id: "duplicate",
        Icon: DuplicateIcon,
        label: "Duplicate",
        onClick: () => {
          if (!activeBlock) return null;

          dispatch(
            duplicateComponent({
              blogId,
              id: activeBlock,
            })
          );
        },
      },
      {
        id: "clear",
        Icon: ClearIcon,
        label: "Clear Selection",
        onClick: () => dispatch(changeActiveBlock({ blogId })),
      },
    ],
    [blogId, activeBlock]
  );

  if (!activeBlock) return null;

  return (
    <div className="flex items-center justify-between gap-2">
      <p className="py-1.5 pl-3">Actions</p>
      <div className="flex items-center">
        <TooltipProvider>
          {actionList.map(({ id, Icon, label, onClick }, index, arr) => (
            <Tooltip key={id}>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onClick}
                  className={clsx("", {
                    "rounded-r-none": index === 0,
                    "rounded-l-none": index === arr.length - 1,
                    "rounded-none": index && index < arr.length - 1,
                  })}
                >
                  <Icon size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </div>
  );
};

export default TopActionList;

"use client";

import React, { useCallback, useMemo } from "react";
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
  MoveLeft as MovePrevIcon,
  MoveRight as MoveNextIcon,
} from "lucide-react";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  changeActiveBlock,
  gotoPreviousNextComponent,
  removeComponent,
  duplicateComponent,
} from "@/redux/features/builders/blogBuilderSlice";
import { useParams } from "next/navigation";
import {
  selectBlogActiveBlock,
  selectBlogComponentById,
} from "@/redux/features/builders/selectors";

const TopActionList = () => {
  const { id: blogId } = useParams<{
    id: string;
  }>();

  const dispatch = useAppDispatch();
  const activeBlock = useAppSelector((state) =>
    selectBlogActiveBlock(state, blogId)
  );

  const activeComponent = useAppSelector((state) =>
    selectBlogComponentById(state, blogId, activeBlock)
  );

  const actionList = useMemo(
    () => [
      {
        id: "prev",
        Icon: MovePrevIcon,
        label: "Goto Previous Layer",
        onClick: () => {
          if (!activeBlock) return null;

          dispatch(
            gotoPreviousNextComponent({
              blogId,
              type: "prev",
            })
          );
        },
      },
      {
        id: "next",
        Icon: MoveNextIcon,
        label: "Goto Next Layer",
        onClick: () => {
          if (!activeBlock) return null;

          dispatch(
            gotoPreviousNextComponent({
              blogId,
              type: "next",
            })
          );
        },
      },
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

  if (!activeBlock || !activeComponent) return null;

  return (
    <div>
      <p>{activeBlock}</p>
      <div className="flex items-center justify-between gap-2">
        <p className="py-1.5 pl-3 select-none">
          {typeof activeComponent?.type === "string"
            ? `${activeComponent.type.toCapitalCase()} / `
            : ""}
          Actions
        </p>
        <div className="flex items-center">
          <TooltipProvider>
            {actionList.map(({ id, Icon, label, onClick }, index, arr) => {
              /* if no parentId exist for goto parent component */
              if (!activeComponent.parentId && id === "up") return;
              if (
                (!Array.isArray(activeComponent.children) ||
                  !activeComponent.children.length) &&
                id === "down"
              )
                return;

              return (
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
              );
            })}
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default TopActionList;

"use client";

import { SelectIcon, DuplicateIcon, TrashIcon, LucideIcon } from "@/lib/icons";
import {
  changeActiveBlock,
  duplicateComponent,
  removeComponent,
} from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch } from "@/redux/hooks";
import { memo, useCallback } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ComponentActionsProps {
  blogId: string;
  id: string;
  activeBlock: string;
}

const ComponentActions = memo(
  ({ blogId, id, activeBlock }: ComponentActionsProps) => {
    const dispatch = useAppDispatch();
    const activateBlock = useCallback(
      () => dispatch(changeActiveBlock({ blogId, activeBlockId: id })),
      [dispatch, blogId, id]
    );

    const duplicateBlock = useCallback(
      () => dispatch(duplicateComponent({ blogId, id })),
      [dispatch, blogId, id]
    );

    const removeBlock = useCallback(
      () => dispatch(removeComponent({ blogId, id })),
      [dispatch, blogId, id]
    );

    return (
      <TooltipProvider>
        {activeBlock !== id && (
          <Button
            onClick={activateBlock}
            label="Select Component"
            Icon={SelectIcon}
            shortCut="Enter"
          />
        )}
        <Button
          onClick={duplicateBlock}
          label="Duplicate Component"
          Icon={DuplicateIcon}
          shortCut="Shift + Alt + D"
        />
        <Button
          onClick={removeBlock}
          label="Delete Component"
          Icon={TrashIcon}
          shortCut="Delete"
        />
      </TooltipProvider>
    );
  }
);

interface ButtonProps {
  onClick: () => void;
  Icon: LucideIcon;
  label: string;
  shortCut?: string;
}

const Button = ({ onClick, Icon, label, shortCut }: ButtonProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={onClick}
          type="button"
          className="hidden group-hover:block bg-primary-foreground text-primary rounded-full p-1"
          title={label}
          tabIndex={-1}
        >
          <Icon size={16} />
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{shortCut}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default ComponentActions;

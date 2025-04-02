"use client";

interface ComponentActionsProps {
  blogId: string;
  id: string;
  activeBlock: string;
}

import { SelectIcon, DuplicateIcon, TrashIcon } from "@/lib/icons";
import {
  changeActiveBlock,
  duplicateComponent,
  removeComponent,
} from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch } from "@/redux/hooks";
import { memo, MouseEvent, useCallback } from "react";

const ComponentActions = memo(
  ({ blogId, id, activeBlock }: ComponentActionsProps) => {
    const dispatch = useAppDispatch();
    const activateBlock = useCallback(
      (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        dispatch(changeActiveBlock({ blogId, activeBlockId: id }));
      },
      [dispatch, blogId, id]
    );

    const duplicateBlock = useCallback(
      (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        dispatch(duplicateComponent({ blogId, id }));
      },
      [dispatch, blogId, id]
    );

    const removeBlock = useCallback(
      (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        dispatch(removeComponent({ blogId, id }));
      },
      [dispatch, blogId, id]
    );

    return (
      <>
        {activeBlock !== id && (
          <button
            onClick={activateBlock}
            type="button"
            className="hidden group-hover:block bg-primary-foreground text-primary rounded-full p-1"
            title="Select component"
          >
            <SelectIcon size={16} />
          </button>
        )}
        <button
          onClick={duplicateBlock}
          type="button"
          className="hidden group-hover:block bg-primary-foreground text-primary rounded-full p-1"
          title="Duplicate component"
        >
          <DuplicateIcon size={16} />
        </button>
        <button
          onClick={removeBlock}
          type="button"
          className="hidden group-hover:block bg-primary-foreground text-primary rounded-full p-1"
          title="Delete component"
        >
          <TrashIcon size={16} />
        </button>
      </>
    );
  }
);

export default ComponentActions;

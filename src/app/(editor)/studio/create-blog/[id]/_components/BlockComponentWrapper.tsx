"use client";

import React, { memo, MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  changeActiveBlock,
  changeHoveringComponentId,
} from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useDroppable } from "@dnd-kit/core";
import { useParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  selectBlogActiveBlock,
  selectBlogComponentById,
  selectBlogScreenType,
} from "@/redux/features/builders/selectors";
import { GripIcon, LucideIcon } from "@/lib/icons";

interface BlockComponentWrapperProps {
  id: string;
  className?: string;
  lavel?: number;
  children: React.ReactNode;
}

const BlockComponentWrapper = memo(
  ({
    id,
    lavel,
    children,
    className = "",
    ...props
  }: BlockComponentWrapperProps) => {
    const { id: blogId } = useParams<{ id: string }>();

    const screenType = useAppSelector((state) =>
      selectBlogScreenType(state, blogId)
    );

    const isHovering =
      useAppSelector((state) => state.blogBuilder.hoveringComponentId) === id;

    const component = useAppSelector((state) =>
      selectBlogComponentById(state, blogId, id)
    );

    const { isOver, setNodeRef } = useDroppable({
      id: "droppable",
    });
    const style = {
      color: isOver ? "green" : undefined,
    };

    const dispatch = useAppDispatch();

    if (!blogId || !component) return null;

    const activeBlock = useAppSelector((state) =>
      selectBlogActiveBlock(state, blogId)
    );

    const toggleActiveBlock = (e: MouseEvent<HTMLDivElement>) => {
      /* so that only that element will active not parent element */
      e.stopPropagation();

      dispatch(
        changeActiveBlock({
          blogId,
          activeBlockId: id,
        })
      );
    };

    const handleMouseHover = (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (isHovering) return null;

      dispatch(changeHoveringComponentId(id));
    };

    const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      dispatch(changeHoveringComponentId(null));
    };

    return (
      <div
        className={cn(
          "flex w-full justify-center gap-3 ring-2 ring-transparent relative",
          className,
          {
            "ring-primary": id === activeBlock || isHovering,
            "px-16": lavel === 1,
            "h-full": ["image", "column"].includes(component.type),
          }
        )}
        onClick={toggleActiveBlock}
        ref={setNodeRef}
        style={style}
        onMouseMove={handleMouseHover}
        onMouseLeave={handleMouseLeave}
      >
        <AnimatePresence>
          {(isHovering || id === activeBlock) && (
            <ActionButton
              key={"grip"}
              id="grip"
              Icon={GripIcon}
              onClick={() => {}}
            />
          )}
        </AnimatePresence>
        <div
          className={cn(
            "w-full max-w-3xl rounded-sm",

            {
              "max-w-3xl": screenType === "desktop",
              "max-w-md": screenType === "mobile",
            }
          )}
        >
          {children}
        </div>
      </div>
    );
  }
);

interface ActionButtonProps {
  id: string;
  Icon: LucideIcon;
  className?: string;
  onClick: () => void;
}

const ActionButton = ({ id, Icon, onClick, className }: ActionButtonProps) => {
  return (
    <motion.span
      className="absolute top-1/2 left-0 -translate-y-1/2 cursor-grab"
      exit={{ opacity: 0 }}
    >
      <Button
        key={id}
        onClick={onClick}
        size="smIcon"
        type="button"
        variant="default"
        className={cn("rounded-l-none", className)}
      >
        <Icon size={16} />
      </Button>
    </motion.span>
  );
};

export default BlockComponentWrapper;

"use client";

import React, { MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  changeActiveBlock,
  changeHoveringComponentId,
} from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useDroppable } from "@dnd-kit/core";
import { GripHorizontal as GripIcon, LucideIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEditor } from "@/app/(editor)/studio/create-blog/[id]/_context/EditorProvider";

interface BlockComponentWrapperProps {
  id: string;
  className?: string;
  lavel?: number;
  children: React.ReactNode;
}

const BlockComponentWrapper = ({
  id,
  lavel,
  children,
  className = "",
  ...props
}: BlockComponentWrapperProps) => {
  const { id: blogId } = useParams<{ id: string }>();
  const { responsiveFrameMode } = useEditor();

  const isHovering =
    useAppSelector((state) => state.blogBuilder.hoveringComponentId) === id;

  const { components } = useAppSelector(
    (state) => state.blogBuilder.blogs[blogId]
  );

  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  const dispatch = useAppDispatch();

  if (!blogId) return null;

  const { activeBlock } =
    useAppSelector((state) => state?.blogBuilder?.blogs[blogId]) || {};

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

  const component = components[id];

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
            "max-w-3xl": responsiveFrameMode === "desktop",
            "max-w-md": responsiveFrameMode === "mobile",
          }
        )}
      >
        {children}
      </div>
    </div>
  );
};

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

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
  className,
  ...props
}: BlockComponentWrapperProps) => {
  const { id: blogId } = useParams<{ id: string }>();
  const isHovering =
    useAppSelector((state) => state.blogBuilder.hoveringComponentId) === id;

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

  const handleHovering = (e: MouseEvent<HTMLDivElement>, value: boolean) => {
    e.stopPropagation();

    dispatch(changeHoveringComponentId(value ? id : null));
  };

  return (
    <div
      className={cn(
        "flex w-full justify-center gap-3 p-2 px-2 ring-2 ring-transparent relative",
        {
          "bg-accent/80 ring-primary": id === activeBlock || isHovering,
          "px-16": lavel === 1,
        }
      )}
      onClick={toggleActiveBlock}
      ref={setNodeRef}
      style={style}
      onMouseEnter={(e) => handleHovering(e, true)}
      onMouseLeave={(e) => handleHovering(e, false)}
    >
      {(isHovering || id === activeBlock) && (
        <ActionButton
          key={"grip"}
          id="grip"
          Icon={GripIcon}
          onClick={() => {}}
        />
      )}
      <div className="w-full max-w-3xl rounded-sm">{children}</div>
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
    <Button
      key={id}
      onClick={onClick}
      size="smIcon"
      type="button"
      variant="default"
      className={cn(
        "absolute top-1/2 left-0 -translate-y-1/2 rounded-l-none",
        {
          "cursor-grab": id === "grip",
        },
        className
      )}
    >
      <Icon size={16} />
    </Button>
  );
};

export default BlockComponentWrapper;

"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  BlockInterface,
  changeActiveBlock,
} from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useDroppable } from "@dnd-kit/core";
import { GripHorizontal as GripIcon, LucideIcon } from "lucide-react";
import { useParams } from "next/navigation";
import React, { MouseEvent } from "react";

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

  return (
    <div
      className={cn(
        "flex w-full group-hover:bg-accent/80 justify-center gap-3 p-2 px-2 ring-2 ring-transparent relative hover:ring-primary",
        {
          "bg-accent/80 ring-primary": id === activeBlock,
          "px-16": lavel === 1,
        }
      )}
      onClick={toggleActiveBlock}
      ref={setNodeRef}
      style={style}
    >
      <span className="group-hover:opacity-100 group-hover:pointer-events-auto opacity-0 pointer-events-none">
        <ActionButton
          key={"grip"}
          id="grip"
          Icon={GripIcon}
          onClick={() => {}}
        />
      </span>
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

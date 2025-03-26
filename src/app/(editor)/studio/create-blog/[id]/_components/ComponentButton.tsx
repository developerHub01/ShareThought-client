"use client";

import React from "react";

import { LucideIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface ComponentButtonProps {
  id?: string;
  className?: string;
  label: string;
  onClick?: () => void;
  Icon: LucideIcon | React.ComponentType<unknown>;
}

const ComponentButton = ({
  id,
  className = "",
  label,
  onClick,
  Icon,
}: ComponentButtonProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id ?? "empty",
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <button
      type="button"
      className={cn(
        "flex flex-col bg-accent rounded-sm p-2 justify-center items-center gap-2 aspect-square ring-2 ring-transparent hover:ring-primary/50 duration-150 shadow-md hover:shadow-2xl",
        className
      )}
      {...(onClick
        ? { onClick }
        : {
            ref: setNodeRef,
            style: style,
            ...listeners,
            ...attributes,
          })}
    >
      <Icon size={35} />
      <span className="capitalize">{label}</span>
    </button>
  );
};

export default ComponentButton;

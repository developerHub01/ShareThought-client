"use client";

import React from "react";
import { useEditor } from "@/app/(editor)/studio/create-blog/[id]/_context/EditorProvider";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { Plus as AddIcon } from "lucide-react";
import Container from "@/app/(editor)/studio/create-blog/[id]/_components/Container";

interface AddComponentSectionProps {
  lavel?: number;
  className?: string;
  index?: number;
  parentId?: string;
  [key: string]: unknown;
}

const AddComponentSection = ({
  lavel,
  className,
  parentId = "",
  index = -1,
  ...props
}: AddComponentSectionProps) => {
  return (
    <Container
      className={clsx(
        "flex justify-center items-center relative before:content-[''] before:absolute before:w-full before:h-[2px] before:bg-primary/20 before:rounded-md before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:pointer-events-none",
        className
      )}
      {...props}
    >
      <AddComponentButton lavel={lavel} index={index} parentId={parentId} />
    </Container>
  );
};

interface AddComponentButtonProps {
  lavel?: number;
  className?: string;
  index?: number;
  parentId?: string;
  [key: string]: unknown;
}

const AddComponentButton = ({
  lavel,
  className,
  index = -1,
  parentId = "",
  ...props
}: AddComponentButtonProps) => {
  const {
    setIsComponentDialogOpen,
    setSelectedIndex,
    setSelectedParentId,
    setShowLayoutTab,
  } = useEditor();

  const handleClick = () => {
    setIsComponentDialogOpen(true);
    setSelectedIndex(index);
    setSelectedParentId(parentId);
    setShowLayoutTab(lavel === 0);
  };

  return (
    <Button
      variant="default"
      size={"icon"}
      className={clsx(
        "rounded-full size-6 border border-white absolute z-40",
        className
      )}
      {...props}
      onClick={handleClick}
      type="button"
    >
      <AddIcon size={20} />
    </Button>
  );
};

export default AddComponentSection;

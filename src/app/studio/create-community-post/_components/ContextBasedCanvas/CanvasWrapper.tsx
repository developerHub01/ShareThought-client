"use client";

import React, { memo } from "react";
import { Button } from "@/components/ui/button";
import { CloseIcon } from "@/lib/icons";
import { changePostType } from "@/redux/features/create-community-post/createCommunityPostSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useImagePost } from "@/app/studio/create-community-post/_context/ImagePostProvider";
import { cn } from "@/lib/utils";

interface CanvasWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const CanvasWrapper = memo(({ children, className }: CanvasWrapperProps) => {
  const { setSelectedId } = useImagePost();
  const dispatch = useAppDispatch();

  const handleRemoveImageType = () => {
    dispatch(
      changePostType({
        type: "TEXT",
      })
    );
    setSelectedId("");
  };

  return (
    <div className={cn("w-full border rounded-sm relative", className)}>
      <Button
        size={"smIcon"}
        variant={"outline"}
        className="rounded-full absolute top-0 right-0 -translate-y-1/2 translate-x-1/2"
        onClick={handleRemoveImageType}
      >
        <CloseIcon size={18} />
      </Button>
      {children}
    </div>
  );
});

export default CanvasWrapper;

"use client";

import React, { memo } from "react";
import { Button } from "@/components/ui/button";
import { CloseIcon } from "@/lib/icons";
import { changePostType } from "@/redux/features/create-community-post/createCommunityPostSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useImagePost } from "@/app/studio/create-community-post/_context/ImagePostProvider";

interface ImageCanvasWrapperProps {
  children: React.ReactNode;
}

const ImageCanvasWrapper = memo(({ children }: ImageCanvasWrapperProps) => {
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
    <div className="w-full border rounded-sm relative">
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

export default ImageCanvasWrapper;

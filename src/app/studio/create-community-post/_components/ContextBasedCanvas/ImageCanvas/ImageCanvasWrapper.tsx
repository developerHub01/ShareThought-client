"use client";

import { Button } from "@/components/ui/button";
import { CloseIcon } from "@/lib/icons";
import { changePostType } from "@/redux/features/create-community-post/createCommunityPostSlice";
import { useAppDispatch } from "@/redux/hooks";
import React from "react";

interface ImageCanvasWrapperProps {
  children: React.ReactNode;
}

const ImageCanvasWrapper = ({ children }: ImageCanvasWrapperProps) => {
  const dispatch = useAppDispatch();

  const handleRemoveImageType = () => dispatch(changePostType("TEXT"));

  return (
    <div className="w-full border rounded-sm relative">
      <Button
        size={"smIcon"}
        className="rounded-full absolute top-0 right-0 -translate-y-1/2 translate-x-1/2"
        onClick={handleRemoveImageType}
      >
        <CloseIcon />
      </Button>
      {children}
    </div>
  );
};

export default ImageCanvasWrapper;

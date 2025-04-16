"use client";

import React from "react";
import { useImagePost } from "@/app/studio/create-community-post/_context/ImagePostProvider";
import ImageEditor from "@/app/studio/create-community-post/_components/ContextBasedCanvas/ImageCanvas/ImageEditor";
import ImagePreview from "@/app/studio/create-community-post/_components/ContextBasedCanvas/ImageCanvas/ImagePreview";
import ImageMainActions from "@/app/studio/create-community-post/_components/ContextBasedCanvas/ImageCanvas/ImageMainActions";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectCommunityPostImages } from "@/redux/features/create-community-post/selectors";

const ImageMain = () => {
  const { isEditorMode, selectedId } = useImagePost();

  return (
    <div className="w-full p-2.5 flex flex-col gap-2">
      {selectedId ? (
        <>
          <div className="w-full h-full flex-1 max-h-[500px]">
            {isEditorMode ? <ImageEditor /> : <ImagePreview />}
          </div>
          <Separator />
          <ImageMainActions />
        </>
      ) : (
        <Fallback />
      )}
    </div>
  );
};

const Fallback = () => {
  const images =
    useAppSelector((state) => selectCommunityPostImages(state)) ?? [];
  const { setSelectedId } = useImagePost();

  const handleSelect = () => {
    if (!images.length) return;
    setSelectedId(images[Math.round(Math.random() * (images.length - 1))].id);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-center">
      <div className="max-w-44">
        <p>Please select an image</p>
        <p>or</p>
        <Button onClick={handleSelect}>Select Randomly</Button>
      </div>
    </div>
  );
};

export default ImageMain;

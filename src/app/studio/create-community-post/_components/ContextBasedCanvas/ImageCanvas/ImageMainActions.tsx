"use client";

import React from "react";
import { useImagePost } from "@/app/studio/create-community-post/_context/ImagePostProvider";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/app/studio/create-community-post/_components/ContextBasedCanvas/ImageCanvas/ImageUploader";
import { changePostImage } from "@/redux/features/create-community-post/createCommunityPostSlice";

const ImageMainActions = () => {
  const { isEditorMode, selectedId } = useImagePost();

  const handleChangeImage = (images: Array<string>) =>
    changePostImage({
      id: selectedId,
      image: images[0],
    });

  return (
    <div className="flex justify-center items-center gap-2">
      {isEditorMode ? (
        <>
          <Button variant={"ghost"}>Cancel</Button>
          <Button variant={"outline"}>Save Preview</Button>
        </>
      ) : (
        <>
          <ImageUploader
            id="changePostImage"
            multiple={false}
            handleChangeInState={handleChangeImage}
          >
            <Button variant={"secondary"} className="pointer-events-none">
              Change
            </Button>
          </ImageUploader>
          <Button variant={"outline"}>Edit Preview</Button>
        </>
      )}
    </div>
  );
};

export default ImageMainActions;

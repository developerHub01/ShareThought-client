"use client";

import React, { memo, useCallback } from "react";
import { useImagePost } from "@/app/studio/create-community-post/_context/ImagePostProvider";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/app/studio/create-community-post/_components/ContextBasedCanvas/ImageCanvas/ImageUploader";
import { changePostImage } from "@/redux/features/create-community-post/createCommunityPostSlice";

const ImageMainActions = memo(() => {
  const {
    isEditorMode,
    setIsEditorMode,
    selectedId,
    saveImageFlag,
    setSaveImageFlag,
  } = useImagePost();

  const handleChangeImage = useCallback(
    (images: Array<string>) =>
      changePostImage({
        id: selectedId,
        image: images[0],
      }),
    [selectedId]
  );

  const handleSavePreview = useCallback(() => {
    if (saveImageFlag) return;

    setSaveImageFlag(true);
  }, [saveImageFlag]);

  const handleCancel = useCallback(() => setIsEditorMode(false), []);
  const handleActiveEditMode = useCallback(() => setIsEditorMode(true), []);

  return (
    <div className="flex justify-center items-center gap-2">
      {isEditorMode ? (
        <>
          <Button variant={"ghost"} onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant={"outline"} onClick={handleSavePreview}>
            Save Preview
          </Button>
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
          <Button variant={"outline"} onClick={handleActiveEditMode}>
            Edit Preview
          </Button>
        </>
      )}
    </div>
  );
});

export default ImageMainActions;

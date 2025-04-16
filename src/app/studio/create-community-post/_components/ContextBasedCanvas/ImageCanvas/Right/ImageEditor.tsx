"use client";

import React, { memo, useCallback, useEffect, useRef } from "react";
import { Cropper, CropperRef } from "react-advanced-cropper";
import { useImagePost } from "@/app/studio/create-community-post/_context/ImagePostProvider";
import { useToast } from "@/hooks/use-toast";
import "react-advanced-cropper/dist/style.css";
import "react-advanced-cropper/dist/themes/compact.css";

const ImageEditor = memo(() => {
  const cropperRef = useRef<CropperRef>(null);
  const { toast } = useToast();
  const {
    isEditorMode,
    selectedImageBlob,
    saveImageFlag,
    setSaveImageFlag,
    handleSaveEditedImage,
  } = useImagePost();

  const handleSaveCroppedImage = useCallback(() => {
    const cropper = cropperRef.current;
    if (!cropper) return;

    const canvas = cropper.getCanvas();
    if (!canvas) {
      return toast({
        title: "Oops! Something went wrong!",
        description:
          "We couldn't generate the cropped image. Please try again.",
      });
    }

    canvas.toBlob((blob) => {
      if (!blob)
        return toast({
          title: "Oops! Something went wrong!",
          description: "Failed to crop image",
        });

      handleSaveEditedImage(URL.createObjectURL(blob));
    }, "image/png");
  }, []);

  useEffect(() => {
    console.log({ saveImageFlag });
    if (!saveImageFlag || !isEditorMode || !selectedImageBlob) return;
    handleSaveCroppedImage();
    setSaveImageFlag(false);
  }, [saveImageFlag, handleSaveCroppedImage]);

  if (!isEditorMode || !selectedImageBlob) return null;

  return (
    <div className="w-full h-full grid place-items-center p-2">
      <div className="w-full h-full max-w-[420px] aspect-square grid place-items-center overflow-hidden">
        <Cropper
          ref={cropperRef}
          src={selectedImageBlob}
          stencilProps={{
            aspectRatio: 1,
            grid: true,
          }}
          className={"cropper w-full h-full object-cover"}
        />
      </div>
    </div>
  );
});

export default ImageEditor;

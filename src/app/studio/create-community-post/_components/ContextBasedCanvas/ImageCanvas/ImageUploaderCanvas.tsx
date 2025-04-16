"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { DragEvent, memo, useCallback, useState } from "react";
import ImageUploader from "@/app/studio/create-community-post/_components/ContextBasedCanvas/ImageCanvas/ImageUploader";
import useUploadCommunityPostImage from "@/hooks/community-post/use-upload-community-post-image";

const ImageUploaderCanvas = memo(() => {
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const processImageFiles = useUploadCommunityPostImage();

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const imageFiles = e.dataTransfer?.files;

      if (imageFiles) processImageFiles(imageFiles);
      setIsDragging(false);
    },
    [processImageFiles]
  );

  const handleDragOver = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!isDragging) setIsDragging(true);
    },
    [isDragging]
  );

  const handleDragLeave = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (isDragging) setIsDragging(false);
    },
    [isDragging]
  );

  return (
    <div
      className={cn(
        "w-full h-full flex justify-center items-center flex-col text-center gap-2 p-5 min-h-64 hover:bg-accent/80 duration-100 ease-in-out select-none",
        {
          "bg-transparent ring-0": !isDragging,
          "bg-accent ring-2 ring-primary rounded-sm": isDragging,
        }
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <h3 className="text-lg md:text-2xl font-semibold">
        Select upto 5 images/gifs
      </h3>
      <p className="text-foreground/60 text-xs md:text-sm pb-3">
        Select from computer or drag and drop images here
      </p>

      <ImageUploader id="uploadPostImage">
        <Button size={"sm"} className="pointer-events-none">
          Select from computer
        </Button>
      </ImageUploader>
    </div>
  );
});

export default ImageUploaderCanvas;

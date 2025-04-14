"use client";

import { Button } from "@/components/ui/button";
import { COMMUNITY_POST_IMAGE_MAX_COUNT } from "@/constant";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { addPostImages } from "@/redux/features/create-community-post/createCommunityPostSlice";
import { useAppDispatch } from "@/redux/hooks";
import { processFiles } from "@/utils";
import React, { DragEvent, useCallback, useState } from "react";

const ImageUploaderCanvas = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const processImageFiles = useCallback(
    (files: FileList) => {
      const imagesList = processFiles({
        files,
        type: "image/",
        limit: COMMUNITY_POST_IMAGE_MAX_COUNT,
      });

      if (!imagesList)
        return toast({
          title: "Oops! That's not image!",
          description: "Please upload valid image files. 😊",
        });

      dispatch(
        addPostImages({
          images: imagesList,
        })
      );
    },
    [dispatch, toast]
  );

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
      <h3 className="text-xl font-semibold">Select upto 5 images/gifs</h3>
      <p className="text-sm pb-2">
        Select from computer or drag and drop images here
      </p>
      <input id="postImage" type="file" accept="image/*,.gif" multiple hidden />
      <label htmlFor="postImage" className="cursor-pointer">
        <Button size={"sm"} className="pointer-events-none">
          Select from computer
        </Button>
      </label>
    </div>
  );
};

export default ImageUploaderCanvas;

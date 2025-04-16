"use client";

import React, { ChangeEvent, memo, useCallback } from "react";
import useUploadCommunityPostImage from "@/hooks/community-post/use-upload-community-post-image";

interface ImageUploaderProps {
  id: string;
  accept?: string;
  multiple?: boolean;
  handleChangeInState?: (images: Array<string>) => void;
  children: React.ReactNode;
}

const ImageUploader = memo(
  ({
    id,
    accept = "image/*,.gif",
    multiple = true,
    handleChangeInState,
    children,
  }: ImageUploaderProps) => {
    const processImageFiles = useUploadCommunityPostImage();

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const imageFiles = e.target.files;

        if (imageFiles) processImageFiles(imageFiles, handleChangeInState);
      },
      [processImageFiles]
    );

    return (
      <>
        <input
          id={id}
          type="file"
          accept={accept}
          multiple={multiple}
          hidden
          onChange={handleChange}
        />
        <label htmlFor={id} className="cursor-pointer">
          {children}
        </label>
      </>
    );
  }
);

export default ImageUploader;

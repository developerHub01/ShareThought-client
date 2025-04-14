"use client";

import React, { ChangeEvent, useCallback } from "react";
import useUploadCommunityPostImage from "@/hooks/community-post/use-upload-community-post-image";

interface ImageUploaderProps {
  id: string;
  accept?: string;
  multiple?: boolean;
  children: React.ReactNode;
}

const ImageUploader = ({
  id,
  accept = "image/*,.gif",
  multiple = true,
  children,
}: ImageUploaderProps) => {
  const processImageFiles = useUploadCommunityPostImage();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const imageFiles = e.target.files;

      if (imageFiles) processImageFiles(imageFiles);
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
};

export default ImageUploader;

"use client";

import React from "react";
import Image from "next/image";
import { useImagePost } from "@/app/studio/create-community-post/_context/ImagePostProvider";
import { useAppSelector } from "@/redux/hooks";
import { selectCommunityPostImageById } from "@/redux/features/create-community-post/selectors";

const ImagePreview = () => {
  const { selectedId } = useImagePost();
  const image = useAppSelector((state) =>
    selectCommunityPostImageById(state, selectedId)
  );

  if (!image) return null;

  const { url } = image;

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Image
        src={url}
        width={400}
        height={400}
        alt="Community Post Image Preview"
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default ImagePreview;

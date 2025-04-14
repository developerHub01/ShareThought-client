"use client";

import React, { memo } from "react";
import { Button } from "@/components/ui/button";
import { COMMUNITY_POST_IMAGE_MAX_COUNT } from "@/constant";
import { AddIcon } from "@/lib/icons";
import { selectCommunityPostImages } from "@/redux/features/create-community-post/selectors";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import ImageUploader from "@/app/studio/create-community-post/_components/ContextBasedCanvas/ImageCanvas/ImageUploader";

const ImageList = memo(() => {
  const images = useAppSelector((state) => selectCommunityPostImages(state));

  if (!images) return null;

  return (
    <div className="h-full w-16 sm:w-20 md:w-24 overflow-hidden flex-grow-0 flex-shrink-0">
      <div className="w-full flex flex-col gap-2 p-2">
        {images.length < COMMUNITY_POST_IMAGE_MAX_COUNT && (
          <ImageUploader id="addPostImage" multiple={false}>
            <Button
              variant={"outline"}
              className="w-full h-full aspect-square pointer-events-none"
            >
              <AddIcon size={20} />
            </Button>
          </ImageUploader>
        )}
        {images.map((image) => (
          <div
            key={image}
            className="w-full aspect-square overflow-hidden rounded-sm"
          >
            <Image
              src={image}
              alt="community post image"
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
});

export default ImageList;

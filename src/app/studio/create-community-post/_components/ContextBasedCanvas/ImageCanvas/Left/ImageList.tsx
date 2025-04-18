"use client";

import React, { memo, useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { COMMUNITY_POST_IMAGE_MAX_COUNT } from "@/constant";
import { AddIcon, SaveIcon } from "@/lib/icons";
import { selectCommunityPostImages } from "@/redux/features/create-community-post/selectors";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import ImageUploader from "@/app/studio/create-community-post/_components/ImageUploader";
import { Reorder } from "framer-motion";
import ImageThumbnailBox from "./ImageThumbnailBox";
import { Separator } from "@/components/ui/separator";
import {
  deletePostImage,
  replaceAllPostImages,
  PostImageInterface,
} from "@/redux/features/create-community-post/createCommunityPostSlice";

const ImageList = memo(() => {
  const mainImages =
    useAppSelector((state) => selectCommunityPostImages(state)) ?? [];

  const [images, setImages] = useState<Array<PostImageInterface>>(mainImages);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setImages(mainImages);
  }, [mainImages]);

  if (!mainImages) return null;

  const handleReorder = useCallback((newOrder: Array<PostImageInterface>) => {
    setImages(newOrder);
  }, []);

  const handleSaveOrder = useCallback(() => {
    dispatch(
      replaceAllPostImages({
        images,
      })
    );
  }, [images]);

  const handleDeleteImage = useCallback((id: string) => {
    dispatch(
      deletePostImage({
        id,
      })
    );
  }, []);

  const haveOrderChanged =
    JSON.stringify(mainImages) !== JSON.stringify(images);

  return (
    <div className="w-16 sm:w-20 md:w-24 bg-accent border-r flex justify-center items-start">
      <div className="w-full flex flex-col gap-3 md:gap-2 p-2.5">
        {images.length < COMMUNITY_POST_IMAGE_MAX_COUNT && (
          <>
            <ImageUploader id="addPostImage" multiple={false}>
              <Button
                variant={"outline"}
                className="w-full h-full aspect-square pointer-events-none"
              >
                <AddIcon size={22} />
              </Button>
            </ImageUploader>
            <Separator orientation="horizontal" />
          </>
        )}
        <Reorder.Group
          axis="y"
          values={images}
          onReorder={handleReorder}
          className="flex flex-col gap-3 md:gap-2"
        >
          {images.map((image) => (
            <ImageThumbnailBox
              key={image.id}
              image={image}
              onDelete={() => handleDeleteImage(image.id)}
            />
          ))}
        </Reorder.Group>

        {haveOrderChanged && (
          <>
            <Separator orientation="horizontal" />
            <Button
              variant={"outline"}
              className="w-full h-full aspect-square"
              onClick={handleSaveOrder}
            >
              <SaveIcon size={22} />
            </Button>
          </>
        )}
      </div>
    </div>
  );
});

export default ImageList;

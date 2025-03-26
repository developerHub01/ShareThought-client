"use client";

import React, { ChangeEvent, useCallback, useRef, memo } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { updateImageContent } from "@/redux/features/builders/blogBuilderSlice";
import PropertyWrapper_v1 from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertyWrapper_v1";
import { useToast } from "@/hooks/use-toast";
import useActiveImage from "@/hooks/editor/use-active-image";
import useModifyQueryParams from "@/hooks/use-modify-query-params";
import { LabelButton } from "@/components/ui/label-button";
import { Button } from "@/components/ui/button";
import { CropIcon } from "@/lib/icons";

const ImageActions = memo(() => {
  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const { url: imageUrl, activeBlock, blogId } = useActiveImage();
  const { buildFullPath, modifyParams } = useModifyQueryParams();

  if (!blogId || !imageUrl || !activeBlock) return null;

  const processImageFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) {
        return toast({
          title: "Oops! That's not an image!",
          description:
            "Please upload a valid image file to set your avatar. 😊",
        });
      }

      const imageURL = URL.createObjectURL(file);

      dispatch(
        updateImageContent({
          blogId,
          id: activeBlock,
          url: imageURL,
        })
      );
    },
    [dispatch, toast]
  );

  const handleImageChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const image = e.target.files?.[0];
      if (image) processImageFile(image);
    },
    [processImageFile]
  );

  const handleEdit = () => {
    return router.push(buildFullPath(modifyParams("append", "edit", imageUrl)));
  };

  return (
    <PropertyWrapper_v1>
      <div className="w-full flex items-center gap-4">
        <input
          type="file"
          name="imageUploader"
          accept="image/*"
          id="imageUploader"
          ref={imageInputRef}
          onChange={handleImageChange}
          hidden
        />
        <LabelButton size={"sm"} htmlFor="imageUploader" className="w-full">
          {imageUrl ? "Change" : "Upload"}
        </LabelButton>
        {imageUrl && (
          <Button size={"sm"} onClick={handleEdit} className="w-full">
            Edit <CropIcon size={18} />
          </Button>
        )}
      </div>
    </PropertyWrapper_v1>
  );
});

export default ImageActions;

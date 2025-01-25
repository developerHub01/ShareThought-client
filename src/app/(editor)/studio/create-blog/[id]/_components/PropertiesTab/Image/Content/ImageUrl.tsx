"use client";

import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useToast } from "@/hooks/use-toast";
import InputWithAttachLebel from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/InputWithAttachLebel";
import useActiveImage from "@/hooks/editor/use-active-image";
import { updateImageContent } from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch } from "@/redux/hooks";
import { isBlobURL, isValidURL } from "@/utils/index";
import PropertyWrapper_v1 from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertyWrapper_v1";

const ImageUrl = () => {
  const [url, setUrl] = useState("");
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const { url: imageUrl, activeBlock, blogId } = useActiveImage();

  const isBlob = isBlobURL(imageUrl);

  useEffect(() => {
    if (imageUrl) setUrl(isBlob ? "" : imageUrl);
  }, [activeBlock, imageUrl, isBlob]);

  if (!blogId) return null;

  const handleChange = (value: string) => setUrl(value.trim());

  const handleBlur = (value: string) => {
    if (!value) return;

    if (!isValidURL(value)) return setUrl("");

    dispatch(
      updateImageContent({
        blogId,
        id: activeBlock,
        url: value,
      })
    );
  };

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

  return (
    <PropertyWrapper_v1>
      <>
        <input
          type="file"
          name="imageUploader"
          accept="image/*"
          id="imageUploader"
          ref={imageInputRef}
          onChange={handleImageChange}
          hidden
        />
        <label
          htmlFor="imageUploader"
          className="cursor-pointer bg-primary hover:bg-primary/80 text-primary-foreground px-4 py-1.5 rounded-sm"
        >
          Upload
        </label>
      </>

      <InputWithAttachLebel
        label="Url"
        value={url}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </PropertyWrapper_v1>
  );
};

export default ImageUrl;

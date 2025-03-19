"use client";

import React, { useEffect, useState } from "react";
import InputWithAttachLebel from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/InputWithAttachLebel";
import useActiveImage from "@/hooks/editor/use-active-image";
import { updateImageContent } from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch } from "@/redux/hooks";
import { isBlobURL, isValidURL } from "@/utils/index";
import PropertyWrapper_v1 from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertyWrapper_v1";

const ImageUrl = () => {
  const [url, setUrl] = useState("");
  const dispatch = useAppDispatch();
  const { url: imageUrl, activeBlock, blogId } = useActiveImage();

  const isBlob = isBlobURL(imageUrl ?? "");

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

  return (
    <PropertyWrapper_v1>
      <InputWithAttachLebel
        label="Url"
        placeholder="Add image throught external url"
        value={url}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </PropertyWrapper_v1>
  );
};

export default ImageUrl;

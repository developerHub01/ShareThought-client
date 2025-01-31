"use client";

import React, { useEffect, useState } from "react";
import InputWithAttachLebel from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/InputWithAttachLebel";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateImageContent } from "@/redux/features/builders/blogBuilderSlice";
import PropertyWrapper_v1 from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertyWrapper_v1";

const ImageCaption = () => {
  const [caption, setCaption] = useState("");
  const { id: blogId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  if (!blogId) return null;

  const { activeBlock, components } = useAppSelector(
    (state) => state.blogBuilder.blogs[blogId as string]
  );

  if (!activeBlock) return null;

  const imageAlt = components[activeBlock]?.caption || "";

  useEffect(() => {
    setCaption(imageAlt);
  }, [activeBlock, imageAlt]);

  const handleChange = (value: string) => {
    setCaption(value);
  };

  const handleBlur = (value: string) => {
    dispatch(
      updateImageContent({
        blogId,
        id: activeBlock,
        caption: value,
      })
    );
  };

  return (
    <PropertyWrapper_v1>
      <InputWithAttachLebel
        label="Caption"
        placeholder="Image caption"
        value={caption}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </PropertyWrapper_v1>
  );
};

export default ImageCaption;

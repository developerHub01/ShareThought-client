"use client";

import React, { useEffect, useState, memo } from "react";
import InputWithAttachLebel from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/InputWithAttachLebel";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateImageContent } from "@/redux/features/builders/blogBuilderSlice";
import PropertyWrapper_v1 from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertyWrapper_v1";
import {
  selectBlogActiveBlock,
  selectBlogComponentById,
} from "@/redux/features/builders/selectors";

const ImageCaption = memo(() => {
  const [caption, setCaption] = useState("");
  const { id: blogId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  if (!blogId) return null;

  const activeBlock = useAppSelector((state) =>
    selectBlogActiveBlock(state, blogId)
  );
  const activeComponent = useAppSelector((state) =>
    selectBlogComponentById(state, blogId, activeBlock)
  );

  const imageAlt = activeComponent?.caption || "";

  useEffect(() => {
    if (!activeBlock) return;

    setCaption(imageAlt);
  }, [activeBlock, imageAlt]);

  if (!activeBlock) return null;

  const handleChange = (value: string) => setCaption(value);

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
});

export default ImageCaption;

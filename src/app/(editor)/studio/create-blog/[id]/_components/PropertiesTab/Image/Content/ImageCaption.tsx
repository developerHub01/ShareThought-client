"use client";

import React, { useEffect, useState } from "react";
import InputWithAttachLebel from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/InputWithAttachLebel";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateImageContent } from "@/redux/features/builders/blogBuilderSlice";

const ImageCaption = () => {
  const [caption, setCaption] = useState("");
  const { id: blogId } = useParams() as { id: string };
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
    <div>
      <InputWithAttachLebel
        label="Caption"
        value={caption}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default ImageCaption;

"use client";

import React, { useEffect, useState } from "react";
import InputWithAttachLebel from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/InputWithAttachLebel";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateComponentText } from "@/redux/features/builders/blogBuilderSlice";
import PropertyWrapper_v1 from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertyWrapper_v1";

const ButtonContentText = () => {
  const [buttonContent, setButtonContent] = useState("");
  const { id: blogId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  if (!blogId) return null;

  const { activeBlock, components } = useAppSelector(
    (state) => state.blogBuilder.blogs[blogId]
  );

  if (!activeBlock) return null;

  const buttonText = components[activeBlock]?.text || "";

  useEffect(() => {
    setButtonContent(buttonText);
  }, [activeBlock, buttonText]);

  const handleChange = (value: string) => {
    setButtonContent(value);
  };

  const handleBlur = (value: string) => {
    dispatch(
      updateComponentText({
        blogId,
        id: activeBlock,
        text: value,
      })
    );
  };

  return (
    <PropertyWrapper_v1>
      <InputWithAttachLebel
        label="Button content"
        placeholder="Button content"
        value={buttonContent}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </PropertyWrapper_v1>
  );
};

export default ButtonContentText;

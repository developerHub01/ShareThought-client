"use client";

import React, { useEffect, useState } from "react";
import InputWithAttachLebel from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/InputWithAttachLebel";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateComponentText } from "@/redux/features/builders/blogBuilderSlice";
import PropertyWrapper_v1 from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertyWrapper_v1";
import {
  selectBlogActiveBlock,
  selectBlogComponentById,
} from "@/redux/features/builders/selectors";

const ButtonContentText = () => {
  const [buttonContent, setButtonContent] = useState("");
  const { id: blogId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  if (!blogId) return null;

  const activeBlock = useAppSelector((state) =>
    selectBlogActiveBlock(state, blogId)
  );
  const activeComponent = useAppSelector((state) =>
    selectBlogComponentById(state, blogId, activeBlock)
  );

  const buttonText = activeComponent?.text ?? "";

  useEffect(() => {
    if (!activeBlock) return;

    setButtonContent(buttonText);
  }, [activeBlock, buttonText]);

  if (!activeBlock) return null;

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

"use client";

import { updateComponentText } from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import React, { CSSProperties, FocusEvent } from "react";
import { TYPOGRAPHY_LIST } from "@/constant";

interface HeadingProps {
  id: string;
  parentId?: string;
}

const Heading = ({ id, parentId, ...props }: HeadingProps) => {
  const { id: blogId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const {
    metaData: { styles },
    components,
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

  if (!blogId) return null;

  const { type, text } = components[id];

  const typographyStyles = styles[id] as CSSProperties;

  const handleBlur = (
    e: FocusEvent<HTMLHeadElement | HTMLParagraphElement>
  ) => {
    dispatch(
      updateComponentText({
        blogId,
        id,
        text: e.target.innerText ?? "",
      })
    );
  };

  const { tag: Tag, className: defaultClassName } =
    TYPOGRAPHY_LIST[type] || TYPOGRAPHY_LIST.h1;

  return (
    <>
      <style></style>
      <Tag
        contentEditable
        suppressContentEditableWarning
        data-component-type={type}
        data-component-id={id}
        onBlur={handleBlur}
        className={defaultClassName}
        style={{
          ...typographyStyles,
        }}
      >
        {text}
      </Tag>
    </>
  );
};

export default Heading;

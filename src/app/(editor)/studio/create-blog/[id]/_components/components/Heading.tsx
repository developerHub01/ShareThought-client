"use client";

import { updateComponentText } from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import React, { FocusEvent } from "react";
import { TYPOGRAPHY_LIST } from "@/constant";
import {
  selectBlogComponentById,
  selectBlogStylesById,
} from "@/redux/features/builders/selectors";

interface HeadingProps {
  id: string;
  parentId?: string;
}

const Heading = ({ id, parentId, ...props }: HeadingProps) => {
  const { id: blogId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const styles = useAppSelector((state) =>
    selectBlogStylesById(state, blogId, id)
  );
  const component = useAppSelector((state) =>
    selectBlogComponentById(state, blogId, id)
  );

  if (!blogId || !component) return null;

  const { type, text } = component;

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
          ...styles,
        }}
      >
        {text}
      </Tag>
    </>
  );
};

export default Heading;

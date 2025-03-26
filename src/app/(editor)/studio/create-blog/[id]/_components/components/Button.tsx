"use client";

import {
  StyleType,
  updateComponentText,
} from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import React, { FocusEvent } from "react";
import handleWrapperContentStyleSeparator from "@/utils/editor/handleWrapperContentStyleSeparator";
import handleBorderStyle from "@/utils/editor/handleBorderStyle";
import Link from "next/link";
import { cn } from "@/lib/utils";
import handlePaddingExtractor from "@/utils/editor/handlePaddingExtractor";
import handleSpecificStyleRemover from "@/utils/editor/handleSpecificStyleRemover";
import handleBoxShadowExtractor from "@/utils/editor/handleBoxShadowExtractor";
import {
  selectBlogActiveBlock,
  selectBlogComponentById,
  selectBlogStylesById,
} from "@/redux/features/builders/selectors";

interface ButtonProps {
  id: string;
  parentId?: string;
}

const Button = ({ id, parentId, ...props }: ButtonProps) => {
  const { id: blogId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const component = useAppSelector((state) =>
    selectBlogComponentById(state, blogId, id)
  );
  const styles = useAppSelector((state) =>
    selectBlogStylesById(state, blogId, id)
  );
  const activeBlock = useAppSelector((state) =>
    selectBlogActiveBlock(state, blogId)
  );

  if (!blogId || !component) return null;

  const { text, redirect, type } = component;

  let { contentStyles, wrapperStyles } =
    handleWrapperContentStyleSeparator(styles);

  const filteredBorder = handleBorderStyle(styles);

  contentStyles = { ...contentStyles, ...filteredBorder };

  contentStyles = {
    ...contentStyles,
    ...handlePaddingExtractor(wrapperStyles as StyleType),
  };

  contentStyles = {
    ...contentStyles,
    ...handleBoxShadowExtractor(wrapperStyles as StyleType),
  };

  wrapperStyles = {
    ...handleSpecificStyleRemover(wrapperStyles as StyleType, "padding"),
  };
  wrapperStyles = {
    ...handleSpecificStyleRemover(wrapperStyles as StyleType, "boxShadow"),
  };

  if (typeof contentStyles.width === "number")
    contentStyles.width = `${contentStyles.width}%`;

  const handleBlur = (e: FocusEvent<HTMLButtonElement>) => {
    dispatch(
      updateComponentText({
        blogId,
        id,
        text: e.target.innerText ?? "",
      })
    );
  };

  const Comp = () => (
    <button
      type="button"
      contentEditable
      suppressContentEditableWarning
      className={cn("text-base px-4 py-2 bg-primary text-primary-foreground", {
        "cursor-auto": id === activeBlock,
        "cursor-pointer": id !== activeBlock,
      })}
      style={{
        ...contentStyles,
      }}
      onBlur={handleBlur}
    >
      {text}
    </button>
  );

  return (
    <div
      className="flex"
      style={{
        ...wrapperStyles,
      }}
      data-component-type={type}
      data-component-id={id}
    >
      {/* id === activeBlock so that user can edit text without that redirect issue */}
      {redirect && id !== activeBlock ? (
        <Link href={redirect} target="_blank">
          <Comp />
        </Link>
      ) : (
        <Comp />
      )}
    </div>
  );
};

export default Button;

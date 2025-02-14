"use client";

import React, { ChangeEvent, CSSProperties } from "react";
import CountBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/CountBlock";
import { addStyle } from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";

const TypographyContentFontSize = () => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const {
    activeBlock,
    metaData: { styles },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

  if (!activeBlock) return null;

  const activeStyle = styles[activeBlock] as CSSProperties;

  const handleFontSizeIncrement = () => {
    // dispatch(
    //   addStyle({
    //     blogId,
    //     activeBlockId: activeBlock,
    //     styles: {
    //       fontSize: "inc",
    //     },
    //   })
    // );
  };

  const handleFontSizeDecrement = () => {
    // dispatch(
    //   addStyle({
    //     blogId,
    //     activeBlockId: activeBlock,
    //     styles: {
    //       fontSize: "dec",
    //     },
    //   })
    // );
  };

  const handleFontSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const fontSize = value < 8 ? 8 : value > 40 ? 40 : value;

    dispatch(
      addStyle({
        blogId,
        activeBlockId: activeBlock,
        styles: {
          fontSize,
        },
      })
    );
  };

  return (
    <CountBlock
      label="Font Size"
      value={Number(activeStyle?.fontSize) || 16}
      handleIncrement={handleFontSizeIncrement}
      handleDecrement={handleFontSizeDecrement}
      handleChange={handleFontSizeChange}
      min={8}
      max={40}
    />
  );
};

export default TypographyContentFontSize;

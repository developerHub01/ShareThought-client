"use client";

import React, {
  ChangeEvent,
  FocusEvent,
  useEffect,
  useState,
  CSSProperties,
} from "react";
import { ColorResult } from "react-color";
import { isValidHexColor } from "@/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addStyle,
  TypographyType,
} from "@/redux/features/builders/blogBuilderSlice";
import { useParams } from "next/navigation";
import ColorBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/ColorBlock";
import { EDITOR_TYPOGRAPHY_SIZE } from "@/constant";

const TypographyStyleTextColor = () => {
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const {
    activeBlock,
    components,
    metaData: { styles },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

  if (!activeBlock) return null;

  const activeStyle = styles[activeBlock] as CSSProperties;

  const typographyType = components[activeBlock].type as TypographyType;

  const textColor =
    activeStyle?.color || EDITOR_TYPOGRAPHY_SIZE.COLOR.DEFAULT[typographyType];

  const dispatch = useAppDispatch();
  const [textColorState, setTextColorState] = useState<string>(textColor);
  const [lastValidColor, setLastValidColor] = useState(textColor);

  useEffect(() => {
    if (activeBlock && textColor) setTextColorState(textColor);
  }, [activeBlock, textColor]);

  const handleColorPicker = (color: ColorResult, e: ChangeEvent) => {
    const newColor = color.hex;
    if (isValidHexColor(newColor)) setLastValidColor(newColor);

    setTextColorState(newColor);

    dispatch(
      addStyle({
        blogId,
        activeBlockId: activeBlock,
        styles: {
          color: newColor,
        },
      })
    );
  };

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;

    if (isValidHexColor(color)) setLastValidColor(color);

    setTextColorState(color);

    dispatch(
      addStyle({
        blogId,
        activeBlockId: activeBlock,
        styles: {
          color,
        },
      })
    );
  };

  const handleColorBlur = (e: FocusEvent<HTMLInputElement>) => {
    let color = e.target.value;

    const dispatchData = {
      blogId,
      activeBlockId: activeBlock,
      styles: {
        color,
      },
    };

    if (!isValidHexColor(color)) {
      dispatch(
        addStyle({
          ...dispatchData,
          styles: {
            color: lastValidColor,
          },
        })
      );

      return setTextColorState(lastValidColor);
    }

    setTextColorState(color);

    dispatch(addStyle(dispatchData));
  };

  return (
    <ColorBlock
      label="Text Color"
      colorState={textColorState}
      handleColorPicker={handleColorPicker}
      handleColorChange={handleColorChange}
      handleColorBlur={handleColorBlur}
    />
  );
};

export default TypographyStyleTextColor;

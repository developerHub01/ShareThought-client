"use client";

import React, { ChangeEvent, FocusEvent, useState } from "react";
import ColorPicker from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/ColorPicker";
import PropertyWrapper_v1 from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertyWrapper_v1";
import { ColorResult } from "react-color";
import { isValidHexColor } from "@/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addTableBackgroundStyle,
  addTableBorderStyle,
} from "@/redux/features/builders/blogBuilderSlice";
import { useParams } from "next/navigation";
import { EDITOR_TABLE_SIZE } from "@/constant";

const BackgroundColor = () => {
  const { id: blogId } = useParams() as { id: string };

  if (!blogId) return null;

  const { activeBlock, content, components } = useAppSelector(
    (state) => state.blogBuilder.blogs[blogId as string]
  );

  if (!activeBlock) return null;

  const dispatch = useAppDispatch();
  const [backgroundState, setBackgroundState] = useState<string>(
    EDITOR_TABLE_SIZE.DEFAULT_BACKGROUND_COLOR
  );
  const [lastValidColor, setLastValidColor] = useState(
    EDITOR_TABLE_SIZE.DEFAULT_BACKGROUND_COLOR
  );

  const handleColorPicker = (color: ColorResult, e: ChangeEvent) => {
    const newColor = color.hex;
    if (isValidHexColor(newColor)) setLastValidColor(newColor);

    setBackgroundState(newColor);

    dispatch(
      addTableBackgroundStyle({
        blogId,
        id: activeBlock,
        backgroundColor: newColor,
      })
    );
  };

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;

    if (isValidHexColor(color)) setLastValidColor(color);

    setBackgroundState(color);

    dispatch(
      addTableBackgroundStyle({
        blogId,
        id: activeBlock,
        backgroundColor: color,
      })
    );
  };

  const handleColorBlur = (e: FocusEvent<HTMLInputElement>) => {
    let color = e.target.value;

    const dispatchData = {
      blogId,
      id: activeBlock,
      backgroundColor: color,
    };

    if (!isValidHexColor(color)) {
      dispatch(
        addTableBackgroundStyle({
          ...dispatchData,
          backgroundColor: lastValidColor,
        })
      );

      return setBackgroundState(lastValidColor);
    }

    setBackgroundState(color);

    dispatch(addTableBackgroundStyle(dispatchData));
  };

  return (
    <PropertyWrapper_v1>
      <p className="text-sm">Background Color</p>
      <div className="flex items-center gap-1.5 ml-auto">
        <ColorPicker
          color={backgroundState}
          handleColorPicker={handleColorPicker}
          handleColorChange={handleColorChange}
          handleColorBlur={handleColorBlur}
        />
      </div>
    </PropertyWrapper_v1>
  );
};

export default BackgroundColor;

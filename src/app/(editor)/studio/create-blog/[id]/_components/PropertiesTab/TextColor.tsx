"use client";

import React, { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import ColorPicker from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/ColorPicker";
import PropertyWrapper_v1 from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertyWrapper_v1";
import { ColorResult } from "react-color";
import { isValidHexColor } from "@/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addTableBackgroundStyle,
  addTableTextStyle,
  TableInterface,
} from "@/redux/features/builders/blogBuilderSlice";
import { useParams } from "next/navigation";
import { EDITOR_TABLE_SIZE } from "@/constant";

const TextColor = () => {
  const { id: blogId } = useParams() as { id: string };

  if (!blogId) return null;

  const { activeBlock, content, components } = useAppSelector(
    (state) => state.blogBuilder.blogs[blogId as string]
  );

  if (!activeBlock) return null;

  const tableData = components[activeBlock as string]
    ?.children as TableInterface;
  const tableTextColor = tableData.textColor;

  const dispatch = useAppDispatch();
  const [textColorState, setTextColorState] = useState<string>(
    tableTextColor || EDITOR_TABLE_SIZE.DEFAULT_TEXT_COLOR
  );
  const [lastValidColor, setLastValidColor] = useState(
    tableTextColor || EDITOR_TABLE_SIZE.DEFAULT_TEXT_COLOR
  );

  useEffect(() => {
    if (activeBlock && tableTextColor) setTextColorState(tableTextColor);
  }, [activeBlock, tableTextColor]);

  const handleColorPicker = (color: ColorResult, e: ChangeEvent) => {
    const newColor = color.hex;
    if (isValidHexColor(newColor)) setLastValidColor(newColor);

    setTextColorState(newColor);

    dispatch(
      addTableTextStyle({
        blogId,
        id: activeBlock,
        textColor: newColor,
      })
    );
  };

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;

    if (isValidHexColor(color)) setLastValidColor(color);

    setTextColorState(color);

    dispatch(
      addTableTextStyle({
        blogId,
        id: activeBlock,
        textColor: color,
      })
    );
  };

  const handleColorBlur = (e: FocusEvent<HTMLInputElement>) => {
    let color = e.target.value;

    const dispatchData = {
      blogId,
      id: activeBlock,
      textColor: color,
    };

    if (!isValidHexColor(color)) {
      dispatch(
        addTableTextStyle({
          ...dispatchData,
          textColor: lastValidColor,
        })
      );

      return setTextColorState(lastValidColor);
    }

    setTextColorState(color);

    dispatch(addTableTextStyle(dispatchData));
  };

  return (
    <PropertyWrapper_v1>
      <p className="text-sm">Text Color</p>
      <div className="flex items-center gap-1.5 ml-auto">
        <ColorPicker
          color={textColorState}
          handleColorPicker={handleColorPicker}
          handleColorChange={handleColorChange}
          handleColorBlur={handleColorBlur}
        />
      </div>
    </PropertyWrapper_v1>
  );
};

export default TextColor;

"use client";

import React, { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import { ColorResult } from "react-color";
import { isValidHexColor } from "@/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  changeTableHeaderStyle,
  TableInterface,
} from "@/redux/features/builders/blogBuilderSlice";
import { useParams } from "next/navigation";
import { EDITOR_TABLE_SIZE } from "@/constant";
import ColorBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/ColorBlock";

const TableHeaderBackground = () => {
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const { activeBlock, components } = useAppSelector(
    (state) => state.blogBuilder.blogs[blogId]
  );

  if (!activeBlock) return null;

  const tableData = components[activeBlock as string]
    ?.children as TableInterface;
  const tableHeaderBackgroundColor = tableData.header?.backgroundColor;

  const dispatch = useAppDispatch();
  const [backgroundState, setBackgroundState] = useState<string>(
    tableHeaderBackgroundColor ||
      EDITOR_TABLE_SIZE.DEFAULT_HEADER_BACKGROUND_COLOR
  );
  const [lastValidColor, setLastValidColor] = useState(
    tableHeaderBackgroundColor ||
      EDITOR_TABLE_SIZE.DEFAULT_HEADER_BACKGROUND_COLOR
  );

  useEffect(() => {
    if (activeBlock && tableHeaderBackgroundColor)
      setBackgroundState(tableHeaderBackgroundColor);
  }, [activeBlock, tableHeaderBackgroundColor]);

  const handleColorPicker = (color: ColorResult, e: ChangeEvent) => {
    const newColor = color.hex;
    if (isValidHexColor(newColor)) setLastValidColor(newColor);

    setBackgroundState(newColor);

    dispatch(
      changeTableHeaderStyle({
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
      changeTableHeaderStyle({
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
        changeTableHeaderStyle({
          ...dispatchData,
          backgroundColor: lastValidColor,
        })
      );

      return setBackgroundState(lastValidColor);
    }

    setBackgroundState(color);

    dispatch(changeTableHeaderStyle(dispatchData));
  };

  return (
    <ColorBlock
      title="Background Color"
      colorState={backgroundState}
      handleColorPicker={handleColorPicker}
      handleColorChange={handleColorChange}
      handleColorBlur={handleColorBlur}
    />
  );
};

export default TableHeaderBackground;

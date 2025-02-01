"use client";

import React, { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import { ColorResult } from "react-color";
import { isValidHexColor } from "@/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  changeTableContentStyle,
  TableInterface,
} from "@/redux/features/builders/blogBuilderSlice";
import { useParams } from "next/navigation";
import { EDITOR_TABLE_SIZE } from "@/constant";
import ColorBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/ColorBlock";

const TableContentTextColor = () => {
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const { activeBlock, components } = useAppSelector(
    (state) => state.blogBuilder.blogs[blogId]
  );

  if (!activeBlock) return null;

  const tableData = components[activeBlock as string]
    ?.children as TableInterface;
  const tableContentTextColor = tableData.content?.textColor;

  const dispatch = useAppDispatch();
  const [textColorState, setTextColorState] = useState<string>(
    tableContentTextColor || EDITOR_TABLE_SIZE.DEFAULT_CONTENT_TEXT_COLOR
  );
  const [lastValidColor, setLastValidColor] = useState(
    tableContentTextColor || EDITOR_TABLE_SIZE.DEFAULT_CONTENT_TEXT_COLOR
  );

  useEffect(() => {
    if (activeBlock && tableContentTextColor)
      setTextColorState(tableContentTextColor);
  }, [activeBlock, tableContentTextColor]);

  const handleColorPicker = (color: ColorResult, e: ChangeEvent) => {
    const newColor = color.hex;
    if (isValidHexColor(newColor)) setLastValidColor(newColor);

    setTextColorState(newColor);

    dispatch(
      changeTableContentStyle({
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
      changeTableContentStyle({
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
        changeTableContentStyle({
          ...dispatchData,
          textColor: lastValidColor,
        })
      );

      return setTextColorState(lastValidColor);
    }

    setTextColorState(color);

    dispatch(changeTableContentStyle(dispatchData));
  };

  return (
    <ColorBlock
      title="Text Color"
      colorState={textColorState}
      handleColorPicker={handleColorPicker}
      handleColorChange={handleColorChange}
      handleColorBlur={handleColorBlur}
    />
  );
};

export default TableContentTextColor;

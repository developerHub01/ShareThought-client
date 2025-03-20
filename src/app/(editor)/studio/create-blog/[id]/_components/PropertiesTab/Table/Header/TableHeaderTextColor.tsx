"use client";

import React, {
  ChangeEvent,
  FocusEvent,
  useEffect,
  useState,
  memo,
} from "react";
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
import {
  selectBlogActiveBlock,
  selectBlogComponentById,
} from "@/redux/features/builders/selectors";

const TableHeaderTextColor = memo(() => {
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const activeBlock = useAppSelector((state) =>
    selectBlogActiveBlock(state, blogId)
  );
  const component = useAppSelector((state) =>
    selectBlogComponentById(state, blogId, activeBlock)
  );

  if (!activeBlock || !component) return null;

  const tableData = component?.children as TableInterface;
  const tableHeaderTextColor = tableData.header?.textColor;

  const dispatch = useAppDispatch();
  const [textColorState, setTextColorState] = useState<string>(
    tableHeaderTextColor || EDITOR_TABLE_SIZE.DEFAULT_HEADER_TEXT_COLOR
  );
  const [lastValidColor, setLastValidColor] = useState(
    tableHeaderTextColor || EDITOR_TABLE_SIZE.DEFAULT_HEADER_TEXT_COLOR
  );

  useEffect(() => {
    if (activeBlock && tableHeaderTextColor)
      setTextColorState(tableHeaderTextColor);
  }, [activeBlock, tableHeaderTextColor]);

  const handleColorPicker = (color: ColorResult, e: ChangeEvent) => {
    const newColor = color.hex;
    if (isValidHexColor(newColor)) setLastValidColor(newColor);

    setTextColorState(newColor);

    dispatch(
      changeTableHeaderStyle({
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
      changeTableHeaderStyle({
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
        changeTableHeaderStyle({
          ...dispatchData,
          textColor: lastValidColor,
        })
      );

      return setTextColorState(lastValidColor);
    }

    setTextColorState(color);

    dispatch(changeTableHeaderStyle(dispatchData));
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
});

export default TableHeaderTextColor;

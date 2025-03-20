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
  addTableBackgroundStyle,
  TableInterface,
} from "@/redux/features/builders/blogBuilderSlice";
import { useParams } from "next/navigation";
import { EDITOR_TABLE_SIZE } from "@/constant";
import ColorBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/ColorBlock";
import {
  selectBlogActiveBlock,
  selectBlogComponentById,
} from "@/redux/features/builders/selectors";

const TableBackground = memo(() => {
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
  const tableBackgroundColor = tableData.backgroundColor;

  const dispatch = useAppDispatch();
  const [backgroundState, setBackgroundState] = useState<string>(
    tableBackgroundColor || EDITOR_TABLE_SIZE.DEFAULT_BACKGROUND_COLOR
  );
  const [lastValidColor, setLastValidColor] = useState(
    tableBackgroundColor || EDITOR_TABLE_SIZE.DEFAULT_BACKGROUND_COLOR
  );

  useEffect(() => {
    if (activeBlock && tableBackgroundColor)
      setBackgroundState(tableBackgroundColor);
  }, [activeBlock, tableBackgroundColor]);

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
    <ColorBlock
      label="Background Color"
      colorState={backgroundState}
      handleColorPicker={handleColorPicker}
      handleColorChange={handleColorChange}
      handleColorBlur={handleColorBlur}
    />
  );
});

export default TableBackground;

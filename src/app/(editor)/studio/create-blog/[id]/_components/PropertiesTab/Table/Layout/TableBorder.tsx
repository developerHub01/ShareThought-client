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
import { useParams } from "next/navigation";
import {
  addTableBorderStyle,
  BorderStyleType,
  TableInterface,
} from "@/redux/features/builders/blogBuilderSlice";
import { EDITOR_TABLE_SIZE } from "@/constant";
import BorderBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/BorderBlock";
import {
  selectBlogActiveBlock,
  selectBlogComponentById,
} from "@/redux/features/builders/selectors";

const TableBorder = memo(() => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const activeBlock = useAppSelector((state) =>
    selectBlogActiveBlock(state, blogId)
  );
  const component = useAppSelector((state) =>
    selectBlogComponentById(state, blogId, activeBlock)
  );

  if (!activeBlock || !component) return null;

  if (!activeBlock) return null;

  const tableData = component?.children as TableInterface;

  const tableBorderStyle = tableData?.border;

  const [lastValidColor, setLastValidColor] = useState("#343434");
  const [borderState, setBorderState] = useState({
    style: tableBorderStyle?.style || "solid",
    color: tableBorderStyle?.color || EDITOR_TABLE_SIZE.DEFAULT_BORDER_COLOR,
    size: tableBorderStyle?.size || EDITOR_TABLE_SIZE.DEFAULT_BORDER_SIZE,
  });

  useEffect(() => {
    if (activeBlock)
      setBorderState((prev) => ({
        ...prev,
        ...tableBorderStyle,
      }));
  }, [activeBlock]);

  const handleColorPicker = (color: ColorResult, e: ChangeEvent) => {
    const newColor = color.hex;
    if (isValidHexColor(newColor)) setLastValidColor(newColor);

    setBorderState((prev) => ({
      ...prev,
      color: newColor,
    }));

    dispatch(
      addTableBorderStyle({
        blogId,
        id: activeBlock,
        color: newColor,
      })
    );
  };

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;

    if (isValidHexColor(color)) setLastValidColor(color);

    setBorderState((prev) => ({
      ...prev,
      color,
    }));

    dispatch(
      addTableBorderStyle({
        blogId,
        id: activeBlock,
        color,
      })
    );
  };

  const handleColorBlur = (e: FocusEvent<HTMLInputElement>) => {
    let color = e.target.value;

    const dispatchData = {
      blogId,
      id: activeBlock,
      color,
    };

    if (!isValidHexColor(color)) {
      dispatch(
        addTableBorderStyle({
          ...dispatchData,
          color: lastValidColor,
        })
      );

      return setBorderState((prev) => ({
        ...prev,
        color: lastValidColor,
      }));
    }

    setBorderState((prev) => ({
      ...prev,
      color,
    }));

    dispatch(addTableBorderStyle(dispatchData));
  };

  const handleBorderSizeIncrease = () => {
    if (borderState.size >= EDITOR_TABLE_SIZE.MAX_BORDER_SIZE) return;

    setBorderState((prev) => ({
      ...prev,
      size: prev.size + 1,
    }));

    dispatch(
      addTableBorderStyle({
        blogId,
        id: activeBlock,
        size: "increase",
      })
    );
  };

  const handleBorderSizeDecrease = () => {
    if (borderState.size <= EDITOR_TABLE_SIZE.MIN_BORDER_SIZE) return;

    setBorderState((prev) => ({
      ...prev,
      size: prev.size - 1,
    }));

    dispatch(
      addTableBorderStyle({
        blogId,
        id: activeBlock,
        size: "decrease",
      })
    );
  };

  const handleBorderSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    const size =
      value <= EDITOR_TABLE_SIZE.MIN_BORDER_SIZE
        ? EDITOR_TABLE_SIZE.MIN_BORDER_SIZE
        : value >= EDITOR_TABLE_SIZE.MAX_BORDER_SIZE
        ? EDITOR_TABLE_SIZE.MAX_BORDER_SIZE
        : value;

    setBorderState((prev) => ({
      ...prev,
      size,
    }));

    dispatch(
      addTableBorderStyle({
        blogId,
        id: activeBlock,
        size,
      })
    );
  };

  const handleChangeStyle = (style: BorderStyleType) => {
    setBorderState((prev) => ({
      ...prev,
      style,
    }));

    dispatch(
      addTableBorderStyle({
        blogId,
        id: activeBlock,
        style,
      })
    );
  };

  return (
    <BorderBlock
      label="border"
      borderState={borderState}
      onChangeStyle={handleChangeStyle}
      onChangeSize={handleBorderSizeChange}
      onIncreaseSize={handleBorderSizeIncrease}
      onDecreaseSize={handleBorderSizeDecrease}
      onBlurColor={handleColorBlur}
      onChangeColor={handleColorChange}
      onColorPick={handleColorPicker}
      minSize={EDITOR_TABLE_SIZE.MIN_BORDER_SIZE}
      maxSize={EDITOR_TABLE_SIZE.MAX_BORDER_SIZE}
    />
  );
});

export default TableBorder;

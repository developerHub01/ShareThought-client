"use client";

import React, { useEffect, useState } from "react";
import { ColorResult } from "react-color";
import { isValidHexColor } from "@/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import {
  addBorderStyle,
  BorderStyleType,
  BorderType,
  toggleBorderAll,
} from "@/redux/features/builders/blogBuilderSlice";
import BorderAllSideBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/BorderAllSideBlock";

type BorderComboType = Partial<{
  [key in BorderType]: [number, string, string];
}>;

const BorderProperty = () => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const {
    activeBlock,
    metaData: { styles = {} },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId as string]);

  if (!activeBlock) return null;

  const componentStyles = styles[activeBlock] || {};

  const [lastValidColor, setLastValidColor] = useState("#343434");
  const [borderState, setBorderState] = useState<BorderComboType>({});

  useEffect(() => {
    if (activeBlock && componentStyles) {
      const borders: BorderComboType = {};

      if (componentStyles["border"]) borders.border = componentStyles["border"];
      if (componentStyles["borderLeft"])
        borders.borderLeft = componentStyles["borderLeft"];
      if (componentStyles["borderRight"])
        borders.borderRight = componentStyles["borderRight"];
      if (componentStyles["borderTop"])
        borders.borderTop = componentStyles["borderTop"];
      if (componentStyles["borderBottom"])
        borders.borderBottom = componentStyles["borderBottom"];

      setBorderState((_) => ({
        ...borders,
      }));
    }
  }, [activeBlock, componentStyles]);

  const handleColorPicker = (borderType: BorderType, color: ColorResult) => {
    const newColor = color.hex;

    if (isValidHexColor(newColor)) setLastValidColor(newColor);
    setBorderState((prev) => ({
      ...prev,
      color: newColor,
    }));

    dispatch(
      addBorderStyle({
        blogId,
        activeBlockId: activeBlock,
        border: {
          [borderType as BorderType]: {
            color: newColor,
          },
        },
      })
    );
  };

  const handleColorChange = (borderType: BorderType, color: string) => {
    if (isValidHexColor(color)) setLastValidColor(color);

    setBorderState((prev) => ({
      ...prev,
      color,
    }));

    dispatch(
      addBorderStyle({
        blogId,
        activeBlockId: activeBlock,
        border: {
          [borderType as BorderType]: {
            color,
          },
        },
      })
    );
  };

  const handleColorBlur = (borderType: BorderType, color: string) => {
    const dispatchData = {
      blogId,
      activeBlockId: activeBlock,
      border: {
        [borderType as BorderType]: {
          color,
        },
      },
    };

    if (!isValidHexColor(color)) {
      return setBorderState((prev) => ({
        ...prev,
        color: lastValidColor,
      }));
    }

    setBorderState((prev) => ({
      ...prev,
      color,
    }));
    dispatch(addBorderStyle(dispatchData));
  };

  const handleBorderSizeIncrease = (borderType: BorderType) => {
    setBorderState((prev: BorderComboType) => ({
      ...prev,
      [borderType]: [
        prev[borderType] && prev[borderType][0] + 1,
        prev[borderType] && prev[borderType][1],
        prev[borderType] && prev[borderType][2],
      ],
    }));

    if (!borderState[borderType]) return;

    dispatch(
      addBorderStyle({
        blogId,
        activeBlockId: activeBlock,
        border: {
          [borderType as BorderType]: {
            size: "inc",
          },
        },
      })
    );
  };

  const handleBorderSizeDecrease = (borderType: BorderType) => {
    if (borderState[borderType] && borderState[borderType][0] <= 0) return;

    setBorderState((prev) => ({
      ...prev,
      [borderType]: [
        prev[borderType] && prev[borderType][0] - 1,
        prev[borderType] && prev[borderType][1],
        prev[borderType] && prev[borderType][2],
      ],
    }));

    if (!borderState[borderType] && typeof borderState[borderType] !== "number")
      return;

    dispatch(
      addBorderStyle({
        blogId,
        activeBlockId: activeBlock,
        border: {
          [borderType as BorderType]: {
            size: "dec",
          },
        },
      })
    );
  };

  const handleBorderSizeChange = (borderType: BorderType, value: number) => {
    const size = value <= 0 ? 0 : value;

    setBorderState((prev) => ({
      ...prev,
      [borderType]: [
        size,
        prev[borderType] && prev[borderType][1],
        prev[borderType] && prev[borderType][2],
      ],
    }));

    if (!borderState[borderType] && typeof borderState[borderType] !== "number")
      return;

    dispatch(
      addBorderStyle({
        blogId,
        activeBlockId: activeBlock,
        border: {
          [borderType as BorderType]: {
            size,
          },
        },
      })
    );
  };

  const handleChangeStyle = (
    borderType: BorderType,
    style: BorderStyleType
  ) => {
    setBorderState((prev) => ({
      ...prev,
      [borderType]: [
        prev[borderType] && prev[borderType][0],
        style,
        prev[borderType] && prev[borderType][2],
      ],
    }));

    dispatch(
      addBorderStyle({
        blogId,
        activeBlockId: activeBlock,
        border: {
          [borderType as BorderType]: {
            style,
          },
        },
      })
    );
  };

  const handleToggleMore = () => {
    dispatch(
      toggleBorderAll({
        blogId,
        activeBlockId: activeBlock,
      })
    );
  };

  return (
    <BorderAllSideBlock
      borderState={borderState}
      onChangeStyle={handleChangeStyle}
      onChangeSize={handleBorderSizeChange}
      onIncreaseSize={handleBorderSizeIncrease}
      onDecreaseSize={handleBorderSizeDecrease}
      onBlurColor={handleColorBlur}
      onChangeColor={handleColorChange}
      onColorPick={handleColorPicker}
      onToggleMore={handleToggleMore}
    />
  );
};

export default BorderProperty;

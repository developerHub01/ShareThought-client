"use client";

import React, { useEffect, useState, useCallback, memo } from "react";
import BorderBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/BorderBlock";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import { isValidHexColor } from "@/utils";
import {
  addBorderStyle,
  BorderStyleType,
} from "@/redux/features/builders/blogBuilderSlice";
import { ColorResult } from "react-color";
import {
  selectBlogActiveBlock,
  selectBlogStylesById,
} from "@/redux/features/builders/selectors";

const DividerLine = memo(() => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const activeBlock = useAppSelector((state) =>
    selectBlogActiveBlock(state, blogId)
  );
  const styles = useAppSelector((state) =>
    selectBlogStylesById(state, blogId, activeBlock)
  );

  const activeBlockLine = styles.borderTop ?? [1, "solid", "#dddddd"];

  const [borderState, setBorderState] = useState<{
    style: BorderStyleType;
    color: string;
    size: number;
  }>({
    style: activeBlockLine[1] as BorderStyleType,
    color: activeBlockLine[2],
    size: activeBlockLine[0],
  });

  const [lastValidColor, setLastValidColor] = useState(activeBlockLine[2]);

  useEffect(() => {
    if (!activeBlock) return;

    setBorderState({
      style: activeBlockLine[1] as BorderStyleType,
      color: activeBlockLine[2],
      size: activeBlockLine[0],
    });
  }, [activeBlock, activeBlockLine]);

  const updateBorderStyle = useCallback(
    (updatedProps: Partial<typeof borderState>) => {
      if (!activeBlock) return;

      setBorderState((prev) => ({ ...prev, ...updatedProps }));
      dispatch(
        addBorderStyle({
          blogId,
          activeBlockId: activeBlock,
          border: { borderTop: updatedProps },
        })
      );
    },
    [blogId, activeBlock, dispatch]
  );

  if (!activeBlock) return null;

  const handleColorChange = (color: string) => {
    if (isValidHexColor(color) || color === "transparent") {
      setLastValidColor(color);
      updateBorderStyle({ color });
    }
  };

  const handleColorBlur = () => {
    updateBorderStyle({ color: lastValidColor });
  };

  return (
    <BorderBlock
      label="Line"
      borderState={borderState}
      onChangeStyle={(style) => updateBorderStyle({ style })}
      onChangeSize={(e) =>
        updateBorderStyle({ size: Math.max(Number(e.target.value), 0) })
      }
      onIncreaseSize={() => updateBorderStyle({ size: borderState.size + 1 })}
      onDecreaseSize={() =>
        borderState.size > 0 &&
        updateBorderStyle({ size: borderState.size - 1 })
      }
      onBlurColor={handleColorBlur}
      onChangeColor={(e) => handleColorChange(e.target.value)}
      onColorPick={(color: ColorResult) => handleColorChange(color.hex)}
      minSize={0}
      maxSize={100}
    />
  );
});

export default DividerLine;

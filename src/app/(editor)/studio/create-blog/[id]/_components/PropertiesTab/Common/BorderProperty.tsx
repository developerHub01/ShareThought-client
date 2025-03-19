"use client";

import React, { useEffect, useState, memo } from "react";
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
import {
  selectBlogActiveBlock,
  selectBlogComponentById,
  selectBlogGlobalStyle,
  selectBlogMobileStylesById,
  selectBlogScreenType,
  selectBlogStylesById,
} from "@/redux/features/builders/selectors";

type BorderComboType = Partial<Record<BorderType, [number, string, string]>>;

const BorderProperty = memo(() => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const activeBlock = useAppSelector((state) =>
    selectBlogActiveBlock(state, blogId)
  );
  const activeComponent = useAppSelector((state) =>
    selectBlogComponentById(state, blogId, activeBlock)
  );
  const styles = useAppSelector((state) =>
    selectBlogStylesById(state, blogId, activeBlock)
  );

  const [lastValidColor, setLastValidColor] = useState("#343434");
  const [borderState, setBorderState] = useState<BorderComboType>({});

  useEffect(() => {
    if (!activeBlock) return;

    setBorderState({
      border: styles["border"],
      borderLeft: styles["borderLeft"],
      borderRight: styles["borderRight"],
      borderTop: styles["borderTop"],
      borderBottom: styles["borderBottom"],
    });
  }, [activeBlock, styles]);

  if (!activeBlock || !activeComponent) return null;

  const updateBorder = (
    borderType: BorderType,
    update: Partial<Record<string, any>>
  ) => {
    dispatch(
      addBorderStyle({
        blogId,
        activeBlockId: activeBlock,
        border: { [borderType]: update },
      })
    );
  };

  const handleColorUpdate = (borderType: BorderType, color: string) => {
    if (isValidHexColor(color)) setLastValidColor(color);

    setBorderState((prev) => ({
      ...prev,
      [borderType]: [
        prev[borderType]?.[0] || 0,
        prev[borderType]?.[1] || "solid",
        color,
      ],
    }));

    updateBorder(borderType, { color });
  };

  const handleBorderSizeUpdate = (borderType: BorderType, size: number) => {
    const newSize = Math.max(0, size);

    setBorderState((prev) => ({
      ...prev,
      [borderType]: [
        newSize,
        prev[borderType]?.[1] || "solid",
        prev[borderType]?.[2] || lastValidColor,
      ],
    }));

    updateBorder(borderType, { size: newSize });
  };

  const handleBorderStyleChange = (
    borderType: BorderType,
    style: BorderStyleType
  ) => {
    setBorderState((prev) => ({
      ...prev,
      [borderType]: [
        prev[borderType]?.[0] || 0,
        style,
        prev[borderType]?.[2] || lastValidColor,
      ],
    }));

    updateBorder(borderType, { style });
  };

  return (
    <BorderAllSideBlock
      borderState={borderState}
      onChangeStyle={handleBorderStyleChange}
      onChangeSize={handleBorderSizeUpdate}
      onIncreaseSize={(borderType) =>
        handleBorderSizeUpdate(
          borderType,
          (borderState[borderType]?.[0] || 0) + 1
        )
      }
      onDecreaseSize={(borderType) =>
        handleBorderSizeUpdate(
          borderType,
          (borderState[borderType]?.[0] || 0) - 1
        )
      }
      onBlurColor={(borderType, color) =>
        handleColorUpdate(
          borderType,
          isValidHexColor(color) ? color : lastValidColor
        )
      }
      onChangeColor={handleColorUpdate}
      onColorPick={(borderType, color) =>
        handleColorUpdate(borderType, color.hex)
      }
      onToggleMore={() =>
        dispatch(toggleBorderAll({ blogId, activeBlockId: activeBlock }))
      }
    />
  );
});

export default BorderProperty;

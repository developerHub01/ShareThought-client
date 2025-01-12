"use client";

import React, { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import PropertyWrapper_v1 from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertyWrapper_v1";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColorResult } from "react-color";
import { isValidHexColor } from "@/utils";
import ColorPicker from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/ColorPicker";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import ValueCounter from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/ValueCounter";
import {
  addTableBorderStyle,
  BorderStyleType,
  TableInterface,
} from "@/redux/features/builders/blogBuilderSlice";
import { EDITOR_TABLE_SIZE } from "@/constant";

const Border = () => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams() as { id: string };

  if (!blogId) return null;

  const { activeBlock, content, components } = useAppSelector(
    (state) => state.blogBuilder.blogs[blogId as string]
  );

  if (!activeBlock) return null;

  const tableData = components[activeBlock as string]
    ?.children as TableInterface;

  const tableBorderStyle = tableData?.border;

  const [lastValidColor, setLastValidColor] = useState("#343434");
  const [borderState, setBorderState] = useState({
    style: tableBorderStyle?.style || "solid",
    color: tableBorderStyle?.color || EDITOR_TABLE_SIZE.DEFAULT_BORDER_COLOR,
    size: tableBorderStyle?.size || EDITOR_TABLE_SIZE.DEFAULT_BORDER_SIZE,
  });

  useEffect(() => {
    console.log(components);

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

    setBorderState((prev) => {
      const updatedSize = prev.size + 1;
      dispatch(
        addTableBorderStyle({
          blogId,
          id: activeBlock,
          size: updatedSize,
        })
      );
      return {
        ...prev,
        size: updatedSize,
      };
    });
  };

  const handleBorderSizeDecrease = () => {
    if (borderState.size <= EDITOR_TABLE_SIZE.MIN_BORDER_SIZE) return;

    setBorderState((prev) => {
      const updatedSize = prev.size - 1;
      dispatch(
        addTableBorderStyle({
          blogId,
          id: activeBlock,
          size: updatedSize,
        })
      );

      return {
        ...prev,
        size: updatedSize,
      };
    });
  };

  const handleBorderSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    const size =
      value <= EDITOR_TABLE_SIZE.MIN_BORDER_SIZE
        ? EDITOR_TABLE_SIZE.MIN_BORDER_SIZE
        : value >= EDITOR_TABLE_SIZE.MAX_BORDER_SIZE
        ? EDITOR_TABLE_SIZE.MAX_BORDER_SIZE
        : value;

    console.log({ size });

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
    <PropertyWrapper_v1>
      <p className="text-sm">Border</p>
      <div className="flex items-center gap-1.5 ml-auto">
        <Select defaultValue="solid" onValueChange={handleChangeStyle}>
          <SelectTrigger className="max-w-28">
            <SelectValue placeholder="Border style" />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectGroup>
              <SelectItem value="solid">Solid</SelectItem>
              <SelectItem value="dotted">Dotted</SelectItem>
              <SelectItem value="dashed">Dashed</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <ValueCounter
          value={borderState.size}
          handleChange={handleBorderSizeChange}
          handleIncrement={handleBorderSizeIncrease}
          handleDecrement={handleBorderSizeDecrease}
          min={EDITOR_TABLE_SIZE.MIN_BORDER_SIZE}
          max={EDITOR_TABLE_SIZE.MAX_BORDER_SIZE}
          separate={false}
        />
        <ColorPicker
          color={borderState.color}
          handleColorPicker={handleColorPicker}
          handleColorChange={handleColorChange}
          handleColorBlur={handleColorBlur}
        />
      </div>
    </PropertyWrapper_v1>
  );
};

export default Border;

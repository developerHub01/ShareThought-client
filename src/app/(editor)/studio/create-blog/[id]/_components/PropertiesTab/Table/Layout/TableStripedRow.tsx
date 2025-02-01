"use client";

import React, { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import PropertyWrapper_v1 from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertyWrapper_v1";
import ColorPicker from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/ColorPicker";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addTableBackgroundStyle,
  addTableStripedRow,
  changeTableStripedTypeRow,
  clearTableStripedRow,
  StripedType,
  TableInterface,
} from "@/redux/features/builders/blogBuilderSlice";
import { EDITOR_TABLE_SIZE } from "@/constant";
import { ColorResult } from "react-color";
import { isValidHexColor } from "@/utils";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TableStripedRow = () => {
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const { activeBlock, content, components } = useAppSelector(
    (state) => state.blogBuilder.blogs[blogId]
  );

  if (!activeBlock) return null;

  const tableData = components[activeBlock as string]
    ?.children as TableInterface;
  const tableStripeBackgroundColor = tableData.stripedRow?.backgroundColor;

  const dispatch = useAppDispatch();
  const [backgroundState, setBackgroundState] = useState<string>(
    tableStripeBackgroundColor || ""
  );
  const [lastValidColor, setLastValidColor] = useState(
    tableStripeBackgroundColor ||
      EDITOR_TABLE_SIZE.STRIPED_ROW_DEFAULT_BACKGROUND_COLOR
  );

  useEffect(() => {
    if (activeBlock) setBackgroundState(tableStripeBackgroundColor || "");
  }, [activeBlock, tableData, tableStripeBackgroundColor]);

  const handleColorPicker = (color: ColorResult, e: ChangeEvent) => {
    const newColor = color.hex;
    if (isValidHexColor(newColor)) setLastValidColor(newColor);

    dispatch(
      addTableStripedRow({
        blogId,
        id: activeBlock,
        backgroundColor: newColor,
      })
    );
  };

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;

    if (isValidHexColor(color)) setLastValidColor(color);

    dispatch(
      addTableStripedRow({
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

    if (!isValidHexColor(color))
      dispatch(
        addTableStripedRow({
          ...dispatchData,
          backgroundColor: lastValidColor,
        })
      );

    dispatch(addTableStripedRow(dispatchData));
  };

  const handleStripedBackgroundChange = (value: boolean) => {
    const stripedPayload = {
      blogId,
      id: activeBlock,
    };

    if (!value) return dispatch(clearTableStripedRow(stripedPayload));

    return dispatch(addTableStripedRow(stripedPayload));
  };

  const handleChangeStripeType = (value: StripedType) => {
    dispatch(
      changeTableStripedTypeRow({
        blogId,
        id: activeBlock,
        type: value,
      })
    );
  };

  return (
    <PropertyWrapper_v1 className="flex-col">
      <div className="w-full flex justify-between items-center gap-3">
        <label htmlFor="striped_row" className="text-sm">
          Striped Row
        </label>
        <Switch
          id="striped_row"
          checked={Boolean(backgroundState)}
          onCheckedChange={handleStripedBackgroundChange}
        />
      </div>
      {backgroundState && (
        <>
          <div className="w-full flex items-center justify-between gap-1.5">
            <p className="text-sm">Background Color</p>
            <ColorPicker
              color={backgroundState}
              handleColorPicker={handleColorPicker}
              handleColorChange={handleColorChange}
              handleColorBlur={handleColorBlur}
            />
          </div>
          <div className="w-full flex items-center justify-between gap-1.5">
            <p className="text-sm">Stripe Type</p>
            <Select defaultValue="even" onValueChange={handleChangeStripeType}>
              <SelectTrigger className="max-w-28">
                <SelectValue placeholder="Border style" />
              </SelectTrigger>
              <SelectContent align="end">
                <SelectGroup>
                  <SelectItem value="even">Even</SelectItem>
                  <SelectItem value="odd">Odd</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </>
      )}
    </PropertyWrapper_v1>
  );
};

export default TableStripedRow;

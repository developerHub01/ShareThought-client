"use client";

import React, { ChangeEvent, useEffect, useState, memo } from "react";
import {
  addStyle,
  removeStyle,
} from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import SliderBlockWithLabel from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/SliderBlockWithLabel";
import PropertyWrapper_v1 from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertyWrapper_v1";
import ColorBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/ColorBlock";
import { ColorResult } from "react-color";
import SelectBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/SelectBlock";
import ResetBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/ResetBlock";
import {
  selectBlogActiveBlock,
  selectBlogStylesById,
} from "@/redux/features/builders/selectors";

type boxShadowType = [number, number, number, number, string, string];

const defaultBoxShadow: boxShadowType = [0, 0, 0, 0, "transparent", ""];

const shadowTypeList = [
  {
    id: "outset",
    label: "Outset",
  },
  {
    id: "inset",
    label: "Inset",
  },
];

const BoxShadowProperty = memo(() => {
  const { id: blogId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  if (!blogId) return null;

  const activeBlock = useAppSelector((state) =>
    selectBlogActiveBlock(state, blogId)
  );
  const styles = useAppSelector((state) =>
    selectBlogStylesById(state, blogId, activeBlock)
  );

  const activeBoxShadow = (styles?.boxShadow ??
    defaultBoxShadow) as boxShadowType;

  const [boxShadowState, setBoxShadowState] =
    useState<boxShadowType>(activeBoxShadow);

  useEffect(() => {
    if (!activeBlock) return;
    setBoxShadowState(activeBoxShadow);
  }, [activeBlock, activeBoxShadow]);

  if (!activeBlock) return null;

  const handleChange = (index: number, value: number | string) => {
    const newBoxShadowState: boxShadowType = [...boxShadowState];
    newBoxShadowState[index] = value === "outset" ? "" : value;
    setBoxShadowState(newBoxShadowState);
    dispatch(
      addStyle({
        blogId,
        activeBlockId: activeBlock,
        styles: {
          boxShadow: newBoxShadowState,
        },
      })
    );
  };

  const handleResetFilters = () => {
    dispatch(
      removeStyle({
        blogId,
        activeBlockId: activeBlock,
        properyName: "boxShadow",
      })
    );
  };

  return (
    <PropertyWrapper_v1 className="flex-col gap-0 items-stretch">
      <p className="text-sm">Box Shadow</p>
      <SliderBlockWithLabel
        onChange={(value: number) => handleChange(0, value)}
        label="Offset X"
        min={-50}
        max={50}
        value={boxShadowState[0]}
        unit="px"
        defaultValue={0}
      />
      <SliderBlockWithLabel
        onChange={(value: number) => handleChange(1, value)}
        label="Offset Y"
        min={-50}
        max={50}
        value={boxShadowState[1]}
        unit="px"
        defaultValue={0}
      />
      <SliderBlockWithLabel
        onChange={(value: number) => handleChange(2, value)}
        label="Blur"
        min={0}
        max={100}
        value={boxShadowState[2]}
        unit="px"
        defaultValue={0}
      />
      <SliderBlockWithLabel
        onChange={(value: number) => handleChange(3, value)}
        label="Spread"
        min={-50}
        max={50}
        value={boxShadowState[3]}
        unit="px"
        defaultValue={0}
      />
      <ColorBlock
        label="Color"
        colorState={boxShadowState[4]}
        handleColorPicker={(color: ColorResult, e: ChangeEvent<Element>) =>
          handleChange(4, color.hex)
        }
        handleColorChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChange(4, e.target.value)
        }
      />
      <SelectBlock
        activeValue={boxShadowState[5] ?? shadowTypeList[0].id}
        label="Type"
        itemList={shadowTypeList}
        handleChange={(value: string) => handleChange(5, value)}
        placeholder="Type"
      />
      <ResetBlock
        lable="Reset shadow"
        tooltip="Reset box shadow"
        handleResetFilters={handleResetFilters}
      />
    </PropertyWrapper_v1>
  );
});

export default BoxShadowProperty;

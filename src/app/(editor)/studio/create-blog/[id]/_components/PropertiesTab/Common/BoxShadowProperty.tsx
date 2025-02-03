"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { addStyle } from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import SliderBlockWithLabel from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/SliderBlockWithLabel";
import PropertyWrapper_v1 from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertyWrapper_v1";
import ColorBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/ColorBlock";
import { ColorResult } from "react-color";
import SelectBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/SelectBlock";

type boxShadowType = [number, number, number, number, string, string];

const defaultBoxShadow: boxShadowType = [0, 0, 0, 0, "#121212", ""];

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

const BoxShadowProperty = () => {
  const { id: blogId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  if (!blogId) return null;

  const {
    activeBlock,
    metaData: { styles },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

  if (!activeBlock) return null;

  const activeBoxShadow = (styles?.[activeBlock]?.boxShadow ??
    defaultBoxShadow) as boxShadowType;

  const [boxShadowState, setBoxShadowState] =
    useState<boxShadowType>(activeBoxShadow);

  useEffect(() => {
    if (!activeBlock) return;
    setBoxShadowState(activeBoxShadow);
  }, [activeBlock, activeBoxShadow]);

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

  return (
    <PropertyWrapper_v1 className="flex-col items-stretch">
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
    </PropertyWrapper_v1>
  );
};

export default BoxShadowProperty;

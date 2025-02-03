"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import {
  addImageFilter,
} from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import SliderBlockWithLabel from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/SliderBlockWithLabel";
import PropertyWrapper_v1 from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertyWrapper_v1";
import ColorBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/ColorBlock";
import { ColorResult } from "react-color";

type dropShadowType = [number, number, number, string];

const defaultDropShadow: dropShadowType = [0, 0, 0, "transparent"];

const ImageDropShadow = () => {
  const { id: blogId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  if (!blogId) return null;

  const {
    activeBlock,
    metaData: { styles },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

  if (!activeBlock) return null;

  const activeFilter =
    styles?.[activeBlock]?.filter?.["drop-shadow"] ?? defaultDropShadow;

  const [dropShadowState, setDropShadowState] =
    useState<dropShadowType>(activeFilter);

  useEffect(() => {
    if (!activeBlock) return;
    setDropShadowState(activeFilter);
  }, [activeBlock, activeFilter]);

  const handleChange = (index: number, value: number | string) => {
    const newDropShadowState: dropShadowType = [...dropShadowState];
    newDropShadowState[index] = value;
    setDropShadowState(newDropShadowState);
    dispatch(
      addImageFilter({
        blogId,
        id: activeBlock,
        filter: {
          "drop-shadow": dropShadowState,
        },
      })
    );
  };

  return (
    <PropertyWrapper_v1 className="flex-col gap-0 items-stretch">
      <p className="text-sm">Drop Shadow</p>
      <SliderBlockWithLabel
        onChange={(value: number) => handleChange(0, value)}
        label="Offset X"
        min={-50}
        max={50}
        value={dropShadowState[0]}
        unit="px"
        defaultValue={0}
      />
      <SliderBlockWithLabel
        onChange={(value: number) => handleChange(1, value)}
        label="Offset Y"
        min={-50}
        max={50}
        value={dropShadowState[1]}
        unit="px"
        defaultValue={0}
      />
      <SliderBlockWithLabel
        onChange={(value: number) => handleChange(2, value)}
        label="Blur"
        min={0}
        max={100}
        value={dropShadowState[2]}
        unit="px"
        defaultValue={0}
      />
      <ColorBlock
        label="Color"
        colorState={dropShadowState[3]}
        handleColorPicker={(color: ColorResult, e: ChangeEvent<Element>) =>
          handleChange(3, color.hex)
        }
        handleColorChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleChange(3, e.target.value)
        }
      />
    </PropertyWrapper_v1>
  );
};

export default ImageDropShadow;

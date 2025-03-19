"use client";

import React, { memo } from "react";
import PropertyWrapper_v1 from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertyWrapper_v1";
import { Switch } from "@/components/ui/switch";
import SliderBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/SliderBlockWithLabel";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addStyle } from "@/redux/features/builders/blogBuilderSlice";
import {
  selectBlogActiveBlock,
  selectBlogStylesById,
} from "@/redux/features/builders/selectors";

const ImageWidth = memo(() => {
  const { id: blogId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  if (!blogId) return null;

  const activeBlock = useAppSelector((state) =>
    selectBlogActiveBlock(state, blogId)
  );
  const styles = useAppSelector((state) =>
    selectBlogStylesById(state, blogId, activeBlock)
  );

  const imageWidth = styles?.width;

  if (!activeBlock) return null;

  const handleChange = (value: number) => {
    dispatch(
      addStyle({
        blogId,
        activeBlockId: activeBlock,
        styles: {
          width: value,
        },
      })
    );
  };

  const handleCheck = (checked: boolean) => {
    dispatch(
      addStyle({
        blogId,
        activeBlockId: activeBlock,
        styles: {
          width: checked ? "auto" : Math.round(10 + Math.random() * (100 - 10)),
        },
      })
    );
  };

  return (
    <PropertyWrapper_v1 className="flex-col gap-3">
      <div className="w-full flex justify-between items-center">
        <p className="text-sm">Width auto</p>
        <Switch
          id="width_auto"
          checked={typeof imageWidth !== "number"}
          onCheckedChange={handleCheck}
        />
      </div>
      {typeof imageWidth === "number" && (
        <div className="w-full">
          <SliderBlock
            onChange={handleChange}
            min={10}
            unit="%"
            defaultValue={50}
            value={imageWidth}
            max={100}
          />
        </div>
      )}
    </PropertyWrapper_v1>
  );
});

export default ImageWidth;

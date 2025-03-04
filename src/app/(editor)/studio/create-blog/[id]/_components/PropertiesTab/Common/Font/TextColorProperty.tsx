"use client";

import React, {
  ChangeEvent,
  FocusEvent,
  useEffect,
  useState,
  useCallback,
} from "react";
import { ColorResult } from "react-color";
import { isValidHexColor } from "@/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addStyle } from "@/redux/features/builders/blogBuilderSlice";
import { useParams } from "next/navigation";
import ColorBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/ColorBlock";
import { EDITOR_DEFAULT_VALUES } from "@/constant";
import useActiveStylePropertyTab from "@/hooks/editor/use-active-style-property-tab";

const TextColorProperty = () => {
  const { id: blogId } = useParams<{ id: string }>();
  if (!blogId) return null;

  const {
    activeBlock,
    components,
    metaData: { styles, globalStyles },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

  if (!activeBlock) return null;

  const { type } = components[activeBlock];

  const { color } = useActiveStylePropertyTab({
    activeBlock,
    propertyName: "color",
    styles,
    globalStyles,
    type,
  });

  const textColor =
    (color as string) ??
    EDITOR_DEFAULT_VALUES.COLOR[type] ??
    EDITOR_DEFAULT_VALUES.COLOR.default;

  const dispatch = useAppDispatch();
  const [textColorState, setTextColorState] = useState<string>(textColor);
  const [lastValidColor, setLastValidColor] = useState<string>(textColor);

  useEffect(() => {
    if (activeBlock && textColor) setTextColorState(textColor);
  }, [activeBlock, textColor]);

  const handleColorDispatch = useCallback(
    (color: string) => {
      dispatch(
        addStyle({
          blogId,
          activeBlockId: activeBlock,
          styles: {
            color,
          },
        })
      );
    },
    [blogId, activeBlock]
  );

  const handleColorPicker = (color: ColorResult, e: ChangeEvent) => {
    const newColor = color.hex;
    if (isValidHexColor(newColor)) setLastValidColor(newColor);

    setTextColorState(newColor);

    handleColorDispatch(newColor);
  };

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;

    if (isValidHexColor(color)) setLastValidColor(color);

    setTextColorState(color);

    handleColorDispatch(color);
  };

  const handleColorBlur = (e: FocusEvent<HTMLInputElement>) => {
    let color = e.target.value;

    if (!isValidHexColor(color)) {
      handleColorDispatch(lastValidColor);

      return setTextColorState(lastValidColor);
    }

    setTextColorState(color);

    handleColorDispatch(color);
  };

  return (
    <ColorBlock
      label="Text Color"
      colorState={textColorState}
      handleColorPicker={handleColorPicker}
      handleColorChange={handleColorChange}
      handleColorBlur={handleColorBlur}
    />
  );
};

export default TextColorProperty;

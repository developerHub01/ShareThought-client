"use client";

import React, {
  ChangeEvent,
  FocusEvent,
  useEffect,
  useState,
  CSSProperties,
  useCallback,
} from "react";
import { ColorResult } from "react-color";
import { isValidHexColor } from "@/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addStyle } from "@/redux/features/builders/blogBuilderSlice";
import { useParams } from "next/navigation";
import ColorBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/ColorBlock";

const BackgroundColorProperty = () => {
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const {
    activeBlock,
    metaData: { styles },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

  if (!activeBlock) return null;

  const activeStyle = styles[activeBlock] as CSSProperties;

  const backgroundColor = activeStyle?.backgroundColor || "transparent";

  const dispatch = useAppDispatch();
  const [backgroundColorState, setBackgroundColorState] =
    useState<string>(backgroundColor);
  const [lastValidColor, setLastValidColor] = useState<string>(backgroundColor);

  useEffect(() => {
    if (activeBlock && backgroundColor)
      setBackgroundColorState(backgroundColor);
  }, [activeBlock, backgroundColor]);

  const handleColorDispatch = useCallback(
    (backgroundColor: string) => {
      dispatch(
        addStyle({
          blogId,
          activeBlockId: activeBlock,
          styles: {
            backgroundColor,
          },
        })
      );
    },
    [blogId, activeBlock]
  );

  const handleColorPicker = (color: ColorResult, e: ChangeEvent) => {
    const newColor = color.hex;
    if (isValidHexColor(newColor)) setLastValidColor(newColor);

    setBackgroundColorState(newColor);

    handleColorDispatch(newColor);
  };

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;

    if (isValidHexColor(color)) setLastValidColor(color);

    setBackgroundColorState(color);

    handleColorDispatch(color);
  };

  const handleColorBlur = (e: FocusEvent<HTMLInputElement>) => {
    let color = e.target.value;

    if (!isValidHexColor(color)) {
      handleColorDispatch(lastValidColor);

      return setBackgroundColorState(lastValidColor);
    }

    setBackgroundColorState(color);

    handleColorDispatch(color);
  };

  return (
    <ColorBlock
      label="Background Color"
      colorState={backgroundColorState}
      handleColorPicker={handleColorPicker}
      handleColorChange={handleColorChange}
      handleColorBlur={handleColorBlur}
    />
  );
};

export default BackgroundColorProperty;

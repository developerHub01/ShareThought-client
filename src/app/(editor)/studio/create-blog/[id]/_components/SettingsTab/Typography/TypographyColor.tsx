"use client";

import React, {
  ChangeEvent,
  FocusEvent,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { ColorResult } from "react-color";
import { isValidHexColor } from "@/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addGlobalStyle } from "@/redux/features/builders/blogBuilderSlice";
import { useParams } from "next/navigation";
import ColorBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/ColorBlock";
import { EDITOR_DEFAULT_VALUES } from "@/constant";
import { useSettingTypography } from "@/app/(editor)/studio/create-blog/[id]/_context/SettingTab/SettingTypographyProvider";

const TypographyColor = () => {
  const { id: blogId } = useParams<{ id: string }>();
  const { selectedTypography: type } = useSettingTypography();

  if (!blogId || !type) return null;

  const {
    screenType = "desktop",
    metaData: { globalStyles },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

  const activeStyle = useMemo(
    () => globalStyles[screenType][type],
    [type, screenType, globalStyles]
  );

  const textColor = String(
    activeStyle?.color ??
      EDITOR_DEFAULT_VALUES.COLOR[
        type as keyof typeof EDITOR_DEFAULT_VALUES.COLOR
      ] ??
      EDITOR_DEFAULT_VALUES.COLOR.default
  );

  const dispatch = useAppDispatch();
  const [textColorState, setTextColorState] = useState<string>(textColor);
  const [lastValidColor, setLastValidColor] = useState<string>(textColor);

  useEffect(() => {
    if (type && textColor) setTextColorState(textColor);
  }, [type, textColor]);

  const handleColorDispatch = useCallback(
    (color: string) => {
      dispatch(
        addGlobalStyle({
          blogId,
          type,
          styles: {
            color,
          },
        })
      );
    },
    [blogId, type]
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

export default TypographyColor;

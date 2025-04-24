"use client";

import React, {
  ChangeEvent,
  FocusEvent,
  useEffect,
  useState,
  useCallback,
  useMemo,
  memo,
} from "react";
import { ColorResult } from "react-color";
import { isValidHexColor } from "@/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addGlobalStyle } from "@/redux/features/builders/blogBuilderSlice";
import { useParams } from "next/navigation";
import ColorBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/ColorBlock";
import { EDITOR_DEFAULT_VALUES } from "@/constant";
import { useSettingTypography } from "@/app/(editor)/studio/create-blog/[id]/_context/SettingTab/SettingTypographyProvider";
import {
  selectBlogGlobalStyle,
  selectBlogScreenType,
} from "@/redux/features/builders/selectors";
import Color from "color";
import { useTheme } from "next-themes";

/* 
in light mode -> dark
======================
if color is dark then make it a light
if color is light make a little bit darkar

in dark mode -> light
======================
if color is light then make it dark
if color is dark make it little bit ligter

*/

const toggleColorMode = (color: string) => {
  const newColor = Color(color).hsl().array();
  newColor[2] = 100 - newColor[2];
  return Color.hsl(newColor).hex();
};

const TypographyColor = memo(() => {
  const { id: blogId } = useParams<{ id: string }>();
  const { selectedTypography: type } = useSettingTypography();
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme as "light" | "dark";
  const dispatch = useAppDispatch();

  if (!blogId || !type) return null;

  const screenType = useAppSelector((state) =>
    selectBlogScreenType(state, blogId)
  );
  const globalStyles = useAppSelector((state) =>
    selectBlogGlobalStyle(state, blogId)
  );

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

  const adjustedColor = useMemo(
    () => (theme === "light" ? textColor : toggleColorMode(textColor)),
    [theme, textColor]
  );

  const [textColorState, setTextColorState] = useState<string>(adjustedColor);
  const [lastValidColor, setLastValidColor] = useState<string>(adjustedColor);

  useEffect(() => {
    if (type && adjustedColor) setTextColorState(adjustedColor);
  }, [type, adjustedColor]);

  const handleColorDispatch = useCallback(
    (color: string) => {
      color = theme === "light" ? color : toggleColorMode(color);

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
    [blogId, type, theme]
  );

  const handleColorPicker = useCallback(
    (color: ColorResult, e: ChangeEvent) => {
      const newColor = color.hex;
      if (isValidHexColor(newColor)) setLastValidColor(newColor);

      setTextColorState(newColor);

      handleColorDispatch(newColor);
    },
    [handleColorDispatch]
  );

  const handleColorChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;

    if (isValidHexColor(color)) setLastValidColor(color);

    setTextColorState(color);

    handleColorDispatch(color);
  }, [handleColorDispatch]);

  const handleColorBlur = useCallback((e: FocusEvent<HTMLInputElement>) => {
    const color = e.target.value;

    if (!isValidHexColor(color)) {
      handleColorDispatch(lastValidColor);

      return setTextColorState(lastValidColor);
    }

    setTextColorState(color);

    handleColorDispatch(color);
  }, [handleColorDispatch]);

  return (
    <ColorBlock
      label="Text Color"
      colorState={textColorState}
      handleColorPicker={handleColorPicker}
      handleColorChange={handleColorChange}
      handleColorBlur={handleColorBlur}
    />
  );
});

export default TypographyColor;

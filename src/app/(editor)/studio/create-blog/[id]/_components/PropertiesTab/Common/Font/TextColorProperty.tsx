"use client";

import React, {
  ChangeEvent,
  FocusEvent,
  useEffect,
  useState,
  useCallback,
  memo,
  useMemo,
} from "react";
import { ColorResult } from "react-color";
import { isValidHexColor } from "@/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addStyle } from "@/redux/features/builders/blogBuilderSlice";
import { useParams } from "next/navigation";
import ColorBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/ColorBlock";
import { EDITOR_DEFAULT_VALUES } from "@/constant";
import useActiveStylePropertyTab from "@/hooks/editor/use-active-style-property-tab";
import {
  selectBlogActiveBlock,
  selectBlogComponentById,
  selectBlogGlobalStyle,
  selectBlogStylesById,
} from "@/redux/features/builders/selectors";
import ResetToGlobalStyle from "../../../Blocks/ResetToGlobalStyle";
import useRemoveStyle from "@/hooks/editor/use-remove-style";

const TextColorProperty = memo(() => {
  const { id: blogId } = useParams<{ id: string }>();
  const handleReset = useRemoveStyle();
  if (!blogId) return null;

  const activeBlock = useAppSelector((state) =>
    selectBlogActiveBlock(state, blogId)
  );
  const globalStyles = useAppSelector((state) =>
    selectBlogGlobalStyle(state, blogId)
  );
  const styles =
    useAppSelector((state) =>
      selectBlogStylesById(state, blogId, activeBlock)
    ) ?? {};
  const component = useAppSelector((state) =>
    selectBlogComponentById(state, blogId, activeBlock)
  );

  if (!blogId || !activeBlock || !component || !component.type) return null;

  const { type } = component;

  console.log("Re-run TextColor property===========");

  const { color } = useActiveStylePropertyTab({
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

  const haveCustomStyle = useMemo(() => "color" in styles, [styles]);

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
      AfterComponent={() => (
        <ResetToGlobalStyle
          disabled={!haveCustomStyle}
          handleReset={() => handleReset("color")}
        />
      )}
    />
  );
});

export default TextColorProperty;

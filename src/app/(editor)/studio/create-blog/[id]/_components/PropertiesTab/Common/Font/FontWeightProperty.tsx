"use client";

import React, { memo, useMemo } from "react";
import SelectBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/SelectBlock";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import { addStyle } from "@/redux/features/builders/blogBuilderSlice";
import useActiveStylePropertyTab from "@/hooks/editor/use-active-style-property-tab";
import ResetToGlobalStyle from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/ResetToGlobalStyle";
import useRemoveStyle from "@/hooks/editor/use-remove-style";
import {
  selectBlogActiveBlock,
  selectBlogComponentById,
  selectBlogGlobalStyle,
  selectBlogMobileStylesById,
  selectBlogScreenType,
  selectBlogStylesById,
} from "@/redux/features/builders/selectors";

const fontWeightList = [
  {
    id: "normal",
    label: "Normal",
  },
  {
    id: "bold",
    label: "Bold",
  },
];

const FontWeightProperty = memo(() => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();
  const handleReset = useRemoveStyle();

  if (!blogId) return null;

  const activeBlock = useAppSelector((state) =>
    selectBlogActiveBlock(state, blogId)
  );
  const screenType = useAppSelector((state) =>
    selectBlogScreenType(state, blogId)
  );
  const globalStyles = useAppSelector((state) =>
    selectBlogGlobalStyle(state, blogId)
  );

  if (!activeBlock) return null;

  const styles = useAppSelector((state) =>
    selectBlogStylesById(state, blogId, activeBlock)
  );
  const mobileStyles = useAppSelector((state) =>
    selectBlogMobileStylesById(state, blogId, activeBlock)
  );
  const { type } = useAppSelector((state) =>
    selectBlogComponentById(state, blogId, activeBlock)
  );

  console.log("Re-run fontWeight property===========");

  const haveCustomStyle = useMemo(() => "fontWeight" in styles, [styles]);

  const activeStyle = useActiveStylePropertyTab({
    type,
    globalStyles,
    styles,
    mobileStyles,
    screenType,
    propertyName: "fontWeight",
  });

  const handleChangeFontWeight = (value: string) => {
    dispatch(
      addStyle({
        blogId,
        activeBlockId: activeBlock,
        styles: {
          fontWeight: value,
        },
      })
    );
  };

  return (
    <SelectBlock
      label="Font Weight"
      activeValue={String(activeStyle?.fontWeight ?? fontWeightList[0].id)}
      itemList={fontWeightList}
      handleChange={handleChangeFontWeight}
      AfterComponent={() => (
        <ResetToGlobalStyle
          disabled={!haveCustomStyle}
          handleReset={() => handleReset("fontWeight")}
        />
      )}
    />
  );
});

export default FontWeightProperty;

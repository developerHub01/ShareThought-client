"use client";

import React, { memo, useMemo } from "react";
import SelectBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/SelectBlock";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import {
  addStyle,
  LineHeightType,
} from "@/redux/features/builders/blogBuilderSlice";
import useActiveStylePropertyTab from "@/hooks/editor/use-active-style-property-tab";
import { EDITOR_DEFAULT_VALUES } from "@/constant";
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

const lineHeightList = [
  {
    id: "1.2",
    label: "1.2",
  },
  {
    id: "1.5",
    label: "1.5",
  },
  {
    id: "1.8",
    label: "1.8",
  },
  {
    id: "2",
    label: "2.0",
  },
];

const LineHeightProperty = memo(() => {
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

  console.log("Re-run lineHeight property===========");

  const haveCustomStyle = useMemo(() => "lineHeight" in styles, [styles]);

  const activeStyle = useActiveStylePropertyTab({
    type,
    globalStyles,
    styles,
    mobileStyles,
    screenType,
    propertyName: "lineHeight",
  });

  const handleChangeLineHeight = (value: string) => {
    dispatch(
      addStyle({
        blogId,
        activeBlockId: activeBlock,
        styles: {
          lineHeight: Number(value) as LineHeightType,
        },
      })
    );
  };

  return (
    <SelectBlock
      label="Line Height"
      activeValue={String(
        activeStyle?.lineHeight ??
          EDITOR_DEFAULT_VALUES.LINE_HEIGHT.DEFAULT[type]
      )}
      itemList={lineHeightList}
      handleChange={handleChangeLineHeight}
      AfterComponent={() => (
        <ResetToGlobalStyle
          disabled={!haveCustomStyle}
          handleReset={() => handleReset("lineHeight")}
        />
      )}
    />
  );
});

export default LineHeightProperty;

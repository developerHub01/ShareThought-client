"use client";

import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import {
  addStyle,
  createActiveBlockStyle,
  MarginType,
} from "@/redux/features/builders/blogBuilderSlice";
import MarginBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/MarginBlock";

interface MarginPropertyProps {
  label?: string;
}

const MarginProperty = ({ label }: MarginPropertyProps) => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const {
    activeBlock,
    metaData: { styles = {} },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

  if (!activeBlock) return null;

  useEffect(() => {
    if (activeBlock && !styles[activeBlock])
      dispatch(
        createActiveBlockStyle({
          blogId,
          activeBlockId: activeBlock,
        })
      );
  }, [activeBlock, dispatch, blogId, styles]);

  const margin = useMemo(() => {
    const activeStyles = styles[activeBlock] ?? {};
    return Object.fromEntries(
      Object.entries(activeStyles).filter(
        ([key, value]) => key.includes("margin") && value !== undefined
      )
    ) as Record<string, number>;
  }, [styles, activeBlock]);

  const handleChange = (
    margin: Partial<Record<MarginType, number | "inc" | "dec">>
  ) => {
    dispatch(
      addStyle({
        blogId,
        activeBlockId: activeBlock,
        styles: margin,
      })
    );
  };

  return (
    <MarginBlock label={label} margin={margin} handleChange={handleChange} />
  );
};

export default MarginProperty;

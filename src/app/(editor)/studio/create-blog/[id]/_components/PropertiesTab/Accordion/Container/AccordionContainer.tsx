"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import React, { ChangeEvent } from "react";
import CountBlock from "@/app/(editor)/studio/create-blog/[id]/_components/Blocks/CountBlock";
import {
  AccordionInterface,
  changeAccordionCount,
} from "@/redux/features/builders/blogBuilderSlice";

const AccordionContainer = () => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const { activeBlock, components } = useAppSelector(
    (state) => state.blogBuilder.blogs[blogId]
  );

  if (!activeBlock) return null;

  const activeComponent = (
    components[activeBlock]?.children as AccordionInterface
  )?.data;

  if (!activeComponent) return null;

  const updateCount = (count: number | "inc" | "dec") => {
    dispatch(
      changeAccordionCount({
        blogId,
        id: activeBlock,
        count,
      })
    );
  };

  return (
    <CountBlock
      value={activeComponent.length ?? 1}
      label="Count"
      handleChange={(e: ChangeEvent<HTMLInputElement>) =>
        updateCount(Math.max(Number(e.target.value), 1))
      }
      handleIncrement={() => updateCount("inc")}
      handleDecrement={() => updateCount("dec")}
    />
  );
};

export default AccordionContainer;

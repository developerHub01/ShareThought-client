"use client";

import React, { useEffect } from "react";
import PaddingBlock from "../../Blocks/PaddingBlock";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import {
  createActiveBlockStyle,
  PaddingType,
  togglePaddingAll,
  updatePaddingStyle,
} from "@/redux/features/builders/blogBuilderSlice";

const PaddingProperties = () => {
  const dispatch = useAppDispatch();
  const { id: blogId } = useParams() as { id: string };

  if (!blogId) return null;

  const {
    activeBlock,
    metaData: { styles },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId as string]);

  const padding: Record<string, number> = {};

  useEffect(() => {
    if (activeBlock && !styles[activeBlock])
      dispatch(
        createActiveBlockStyle({
          blogId,
          activeBlockId: activeBlock,
        })
      );
  }, [activeBlock, styles]);

  if (!activeBlock) return null;

  if (!styles[activeBlock]) return null;

  console.log("styles[activeBlock]==============");
  console.log(styles[activeBlock]);
  
  

  if (styles[activeBlock].padding !== undefined)
    padding["padding"] = styles[activeBlock].padding as number;
  if (styles[activeBlock].paddingTop !== undefined)
    padding["paddingTop"] = styles[activeBlock].paddingTop as number;
  if (styles[activeBlock].paddingBottom !== undefined)
    padding["paddingBottom"] = styles[activeBlock].paddingBottom as number;
  if (styles[activeBlock].paddingLeft !== undefined){
    console.log("styles[activeBlock].paddingLeft===========");
    console.log(styles[activeBlock].paddingLeft);
    padding["paddingLeft"] = styles[activeBlock].paddingLeft as number;

  }
  if (styles[activeBlock].paddingRight !== undefined)
    padding["paddingRight"] = styles[activeBlock].paddingRight as number;

  const handleChangePadding = (
    padding: Partial<Record<PaddingType, number | "inc" | "dec">>
  ) => {
    dispatch(
      updatePaddingStyle({
        blogId,
        activeBlockId: activeBlock,
        padding,
      })
    );
  };

  const handleToggleMore = () => {
    dispatch(
      togglePaddingAll({
        blogId,
        activeBlockId: activeBlock,
      })
    );
  };

  return (
    <PaddingBlock
      padding={padding}
      handleChange={handleChangePadding}
      handleToggleMore={handleToggleMore}
    />
  );
};

export default PaddingProperties;

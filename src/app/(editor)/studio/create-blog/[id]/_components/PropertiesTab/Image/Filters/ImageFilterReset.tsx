"use client";

import { Button } from "@/components/ui/button";
import { RotateCcw as ResetIcon } from "lucide-react";
import React from "react";
import PropertyWrapper_v1 from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertyWrapper_v1";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { resetImageFilter } from "@/redux/features/builders/blogBuilderSlice";
import { useParams } from "next/navigation";

const ImageFilterReset = () => {
  const { id: blogId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  if (!blogId) return null;

  const {
    activeBlock,
    metaData: { styles },
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

  if (!activeBlock) return null;

  const activeStyles = styles[activeBlock];

  const handleResetFilters = () => {
    dispatch(
      resetImageFilter({
        blogId,
        id: activeBlock,
      })
    );
  };

  return (
    <PropertyWrapper_v1>
      <p className="text-sm">Reset filters</p>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <Button
                size={"smIcon"}
                variant={"ghost"}
                className="rounded-full"
                onClick={handleResetFilters}
                disabled={!activeStyles || !activeStyles.filter}
              >
                <ResetIcon size={20} />
              </Button>
            </span>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={5}>
            <p>Reset all filters</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </PropertyWrapper_v1>
  );
};

export default ImageFilterReset;

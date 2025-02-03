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

interface ResetBlockProps {
  handleResetFilters: () => void;
  lable?: string;
  disabled?: boolean;
  tooltip?: string;
}

const ResetBlock = ({
  handleResetFilters,
  lable,
  disabled,
  tooltip,
}: ResetBlockProps) => {
  return (
    <PropertyWrapper_v1>
      {lable && <p className="text-sm">{lable}</p>}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <Button
                size={"smIcon"}
                variant={"ghost"}
                className="rounded-full"
                onClick={handleResetFilters}
                disabled={disabled}
              >
                <ResetIcon size={20} />
              </Button>
            </span>
          </TooltipTrigger>
          {tooltip && (
            <TooltipContent side="bottom" sideOffset={5}>
              <p>{tooltip}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </PropertyWrapper_v1>
  );
};

export default ResetBlock;

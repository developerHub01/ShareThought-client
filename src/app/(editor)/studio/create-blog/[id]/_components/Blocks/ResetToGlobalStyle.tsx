"use client";

import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ResetIcon } from "@/lib/icons";

interface ResetToGlobalStyleProps {
  disabled?: boolean;
  handleReset: () => void;
}

const ResetToGlobalStyle = ({
  disabled = false,
  handleReset,
}: ResetToGlobalStyleProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size={"smIcon"}
            variant={"ghost"}
            className="rounded-full flex-shrink-0"
            onClick={handleReset}
            disabled={disabled}
          >
            <ResetIcon size={18} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" align="end" sideOffset={5}>
          <p>Reset To Default</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ResetToGlobalStyle;

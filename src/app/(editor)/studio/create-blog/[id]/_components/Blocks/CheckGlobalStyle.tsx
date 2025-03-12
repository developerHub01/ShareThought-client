"use client";

import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { RotateCcw as ResetIcon } from "lucide-react";

interface CheckGlobalStyleProps {
  disabled?: boolean;
  handleReset: () => void;
}

const CheckGlobalStyle = ({
  disabled = false,
  handleReset,
}: CheckGlobalStyleProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size={"smIcon"}
            variant={"ghost"}
            className="rounded-full"
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

export default CheckGlobalStyle;

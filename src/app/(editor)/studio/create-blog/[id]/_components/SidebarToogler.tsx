"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RightIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

interface SidebarTooglerProps {
  state: boolean;
  toggleState: () => void;
}

const SidebarToogler = ({ state, toggleState }: SidebarTooglerProps) => {
  return (
    <div
      className="w-6 h-full flex-shrink-0 flex-grow-0 relative bg-accent border border-l-2 cursor-pointer"
      onClick={toggleState}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className={cn(
                "absolute z-10 top-3 left-0 -translate-x-1/2 rounded-full border border-primary shadow-2xl cursor-pointer transition-transform duration-100 ease-in-out",
                {
                  "rotate-0": state,
                  "rotate-180": !state,
                }
              )}
              aria-label={state ? "Hide sidebar" : "Show sidebar"}
              size="smIcon"
              variant={"secondary"}
            >
              <RightIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={10}>
            <p>{state ? "Hide sidebar" : "Show sidebar"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default SidebarToogler;

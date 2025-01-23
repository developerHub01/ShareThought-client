import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import clsx from "clsx";
import { ChevronRight as RightIcon } from "lucide-react";

interface SidebarTooglerProps {
  state: boolean;
  toggleState: () => void;
}
const SidebarToogler = ({ state, toggleState }: SidebarTooglerProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className={clsx(
              "absolute z-10 top-3 left-0 -translate-x-1/2 rounded-full border border-primary shadow-2xl cursor-pointer transition-transform duration-100 ease-in-out",
              {
                "rotate-0": state,
                "rotate-180": !state,
              }
            )}
            size="smIcon"
            variant={"secondary"}
            onClick={toggleState}
          >
            <RightIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={10}>
          <p>{state ? "Hide sidebar" : "Show sidebar"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SidebarToogler;

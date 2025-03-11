"use client";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import React from "react";

interface ToggleListProps {
  handleChange: (value: string) => void;
  toggleList: Array<{
    id: string;
    label: string;
    Icon: LucideIcon;
  }>;
  activeItem: string;
  className?: string;
  orientation?: "vertical" | "horizontal";
  size?: "default" | "sm";
}

const ToggleList = ({
  toggleList,
  handleChange,
  activeItem,
  className,
  orientation = "horizontal",
  size = "default",
}: ToggleListProps) => {
  return (
    <TooltipProvider>
      <ToggleGroup
        type="single"
        variant={"outline"}
        value={activeItem}
        onValueChange={handleChange}
        className={cn("gap-0", className)}
      >
        {toggleList.map(({ id, label, Icon }, index) => (
          <Tooltip key={id}>
            <TooltipTrigger asChild>
              <span>
                <ToggleGroupItem
                  value={id}
                  aria-label={label}
                  size={size}
                  className={clsx(
                    "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground",
                    {
                      "rounded-r-none":
                        index === 0 && orientation === "horizontal",
                      "rounded-b-none":
                        index === 0 && orientation === "vertical",
                      "rounded-l-none":
                        index === toggleList.length - 1 &&
                        orientation === "horizontal",
                      "rounded-t-none":
                        index === toggleList.length - 1 &&
                        orientation === "vertical",
                      "rounded-none":
                        index > 0 && index < toggleList.length - 1,
                    }
                  )}
                >
                  <Icon size={18} />
                </ToggleGroupItem>
              </span>
            </TooltipTrigger>
            <TooltipContent
              side={orientation === "horizontal" ? "top" : "left"}
            >
              <p>{label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </ToggleGroup>
    </TooltipProvider>
  );
};

export default ToggleList;

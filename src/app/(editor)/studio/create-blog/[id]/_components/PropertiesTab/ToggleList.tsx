"use client";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
}

const ToggleList = ({
  toggleList,
  handleChange,
  activeItem,
}: ToggleListProps) => {
  return (
    <TooltipProvider>
      <ToggleGroup
        type="single"
        variant={"outline"}
        value={activeItem}
        onValueChange={handleChange}
        className="gap-0"
      >
        {toggleList.map(({ id, label, Icon }, index) => (
          <Tooltip key={id}>
            <TooltipTrigger asChild>
              <span>
                <ToggleGroupItem
                  value={id}
                  aria-label={label}
                  className={clsx(
                    "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground",
                    {
                      "rounded-r-none": index === 0,
                      "rounded-s-none": index === toggleList.length - 1,
                      "rounded-none":
                        index > 0 && index < toggleList.length - 1,
                    }
                  )}
                >
                  <Icon size={18} />
                </ToggleGroupItem>
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </ToggleGroup>
    </TooltipProvider>
  );
};

export default ToggleList;

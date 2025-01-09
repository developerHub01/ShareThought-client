"use client";

import React, { useMemo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  Trash as DeleteIcon,
  Copy as DuplicateIcon,
  X as ClearIcon,
} from "lucide-react";
import clsx from "clsx";

const TopActionList = () => {
  const actionList = useMemo(
    () => [
      {
        id: "delete",
        Icon: DeleteIcon,
        label: "Delete",
        onClick: () => console.log("delete"),
      },
      {
        id: "duplicate",
        Icon: DuplicateIcon,
        label: "Duplicate",
        onClick: () => console.log("duplicate"),
      },
      {
        id: "clear",
        Icon: ClearIcon,
        label: "Clear Selection",
        onClick: () => console.log("clear"),
      },
    ],
    []
  );

  return (
    <div className="flex items-center justify-between gap-2">
      <p className="py-1.5 pl-3">Actions</p>
      <div className="flex items-center">
        <TooltipProvider>
          {actionList.map(({ id, Icon, label, onClick }, index, arr) => (
            <Tooltip key={id}>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onClick}
                  className={clsx("", {
                    "rounded-r-none": index === 0,
                    "rounded-l-none": index === arr.length - 1,
                    "rounded-none": index && index < arr.length - 1,
                  })}
                >
                  <Icon size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </div>
  );
};

export default TopActionList;

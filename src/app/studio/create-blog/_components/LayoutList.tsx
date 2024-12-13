import React, { useMemo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const layoutItemList = [
  "12",
  "6/6",
  "8/4",
  "4/8",
  "4/4/4",
  "3/3/6",
  "6/3/3",
  "3/6/3",
  "3/3/3/3",
  "2/2/2/2/2/2",
];

const LayoutList = () => {
  const modifiedLayoutList = useMemo(() => {
    return layoutItemList.map((item) => ({
      id: item,
      sizes: item.split("/").map((colSize) => Number(colSize)),
    }));
  }, []);

  return (
    <div className="w-full flex flex-col gap-3 sm:gap-5 p-2">
      <TooltipProvider>
        {modifiedLayoutList.map(({ id, sizes }) => (
          <Tooltip key={id}>
            <TooltipTrigger asChild>
              <button className="w-full h-20 flex items-center border rounded-sm p-2 gap-2 ring-2 ring-transparent hover:ring-primary/50 duration-150 hover:shadow-xl">
                {sizes.map((size, index) => (
                  <div
                    key={index}
                    className="h-full bg-accent rounded-sm grid place-items-center text-base"
                    style={{
                      width: `${(size / 12) * 100}%`,
                    }}
                  >
                    {size}
                  </div>
                ))}
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{id}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
};

export default LayoutList;

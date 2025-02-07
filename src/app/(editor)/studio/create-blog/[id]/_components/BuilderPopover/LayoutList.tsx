import React, { useMemo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAppDispatch } from "@/redux/hooks";
import { useEditor } from "@/app/(editor)/studio/create-blog/[id]/_components/EditorProvider";
import {
  addComponent,
  BlockTypes,
} from "@/redux/features/builders/blogBuilderSlice";
import { useParams } from "next/navigation";

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
  // "2/2/2/2/2/2",
];

const LayoutList = () => {
  const { id: blogId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { setIsComponentDialogOpen, selectedIndex } = useEditor();
  const modifiedLayoutList = useMemo(() => {
    return layoutItemList.map((item) => ({
      id: `row_${item}`,
      sizes: item.split("/").map((colSize) => Number(colSize)),
    }));
  }, []);

  const handleClick = (blockId: string) => () => {
    const [type, gridSize] = blockId?.split("_")?.map((item, index) => {
      if (!index) return item;

      return item?.split("/")?.map(Number);
    }) as [BlockTypes, Array<number>];

    setIsComponentDialogOpen(false);
    dispatch(
      addComponent({
        id: blogId,
        type,
        gridSize,
        index: selectedIndex,
      })
    );
  };

  return (
    <div className="w-full flex flex-col gap-3 sm:gap-5 p-2">
      <TooltipProvider>
        {modifiedLayoutList.map(({ id, sizes }) => (
          <Tooltip key={id}>
            <TooltipTrigger asChild>
              <button
                className="w-full h-20 flex items-center border rounded-sm p-2 gap-2 ring-2 ring-transparent hover:ring-primary/50 duration-150 hover:shadow-xl"
                onClick={handleClick(id)}
              >
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

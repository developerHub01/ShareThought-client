"use client";

import React, { Fragment, MouseEvent, useMemo, useState, memo } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Trash as DeleteIcon,
  Plus as AddIcon,
  GripVertical as ResizeIcon,
} from "lucide-react";
import PropertyWrapper_v1 from "@/app/(editor)/studio/create-blog/[id]/_components/PropertiesTab/PropertyWrapper_v1";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  selectBlogActiveBlock,
  selectBlogComponentById,
} from "@/redux/features/builders/selectors";

const RowLayoutColumnSize = memo(() => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const activeBlock = useAppSelector((state) =>
    selectBlogActiveBlock(state, blogId)
  );
  const component = useAppSelector((state) =>
    selectBlogComponentById(state, blogId, activeBlock)
  );

  if (
    !activeBlock ||
    !component ||
    !component.gridSize
  )
    return null;

  const { gridSize } = component

  const remainingSize = useMemo(
    () => 12 - gridSize.reduce((acc, curr) => acc + curr, 0),
    [gridSize]
  );

  return (
    <PropertyWrapper_v1>
      <div className="w-full flex gap-1">
        {gridSize.map((size, index) => (
          <Fragment key={index}>
            <div
              onClick={() =>
                setSelectedIndex((prev) => (prev === index ? -1 : index))
              }
              className={cn(
                "w-full flex flex-col justify-center items-center border-2 p-1 gap-2 rounded-sm hover:border-primary transition-colors duration-75",
                {
                  "border-primary": index === selectedIndex,
                }
              )}
              style={{
                flex: `${size}`,
              }}
            >
              <Input
                defaultValue={size}
                className="w-8 text-center p-1"
                onClick={(e: MouseEvent) => e.stopPropagation()}
              />
            </div>
            {index < gridSize.length - 1 && (
              <div className="grid place-items-center cursor-col-resize">
                <ResizeIcon size={16} />
              </div>
            )}
          </Fragment>
        ))}
        <div
          style={{
            flex: `${remainingSize}`,
          }}
        ></div>
      </div>

      <div className="w-full flex gap-2">
        <Button type="button" className="w-full" size={"sm"}>
          <AddIcon size={18} /> Add Column
        </Button>
        {selectedIndex >= 0 && (
          <Button type="button" className="w-full" size={"sm"}>
            <DeleteIcon size={18} /> Remove Column
          </Button>
        )}
      </div>
    </PropertyWrapper_v1>
  );
});

export default RowLayoutColumnSize;

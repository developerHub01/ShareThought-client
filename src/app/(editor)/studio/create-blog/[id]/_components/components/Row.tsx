"use client";

import { useAppSelector } from "@/redux/hooks";
import React from "react";
import Column from "@/app/(editor)/studio/create-blog/[id]/_components/components/Column";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";

interface RowProps {
  id: string;
  parentId?: string
}

const getColSpan = (column: number) => {
  const colSpanMap: Record<number, string> = {
    1: "md:col-span-1",
    2: "md:col-span-2",
    3: "md:col-span-3",
    4: "md:col-span-4",
    6: "md:col-span-6",
    8: "md:col-span-8",
    12: "md:col-span-12",
  };

  return colSpanMap[column] || "md:col-span-12"; // Fallback to col-span-12
};

const Row = ({ id, parentId }: RowProps) => {
  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const { components } =
    useAppSelector((state) => state?.blogBuilder?.blogs[blogId]) || {};

  const { children, gridSize } = components[id];

  return (
    <section className="grid grid-cols-12 gap-1">
      {Array.isArray(children) &&
        children.map((id, index) => (
          <div
            key={id}
            className={cn(
              "w-full col-span-12",
              getColSpan(gridSize?.[index] ?? 12)
            )}
          >
            <Column id={id} parentId={id} />
          </div>
        ))}
    </section>
  );
};

export default Row;

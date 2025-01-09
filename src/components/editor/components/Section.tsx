import BlockComponent from "@/app/(editor)/studio/create-blog/[id]/_components/BlockComponent";
import { Button } from "@/components/buttons/Button";
import { BlockInterface } from "@/redux/features/builders/blogBuilderSlice";
import { MotionDivProps } from "@/types";
import clsx from "clsx";
import { Plus as AddIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React from "react";

interface SectionProps extends BlockInterface {
  className?: string;
}

const getColSpan = (column: number) => {
  const colSpanMap: Record<number, string> = {
    1: "col-span-1",
    2: "col-span-2",
    3: "col-span-3",
    4: "col-span-4",
    6: "col-span-6",
    8: "col-span-8",
    12: "col-span-12",
  };

  return colSpanMap[column] || "col-span-12"; // Fallback to col-span-12
};

const Section = ({ gridSize, children, ...props }: SectionProps) => {
  console.log({ gridSize });

  return (
    <section className="grid grid-cols-12 gap-1">
      {gridSize &&
        gridSize.map((column, index: number) => {
          return (
            <div
              key={index}
              className={clsx(
                "group border rounded-sm ring",
                getColSpan(column)
              )}
            >
              {/* <BlockComponent {...children[index]} /> */}
              <Button size="icon">
                <AddIcon />
              </Button>
            </div>
          );
        })}
    </section>
  );
};

export default Section;

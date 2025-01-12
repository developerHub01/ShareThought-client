"use client";

import { TableProps } from "@/app/(editor)/studio/create-blog/[id]/_components/BlockComponent";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { EDITOR_TABLE_SIZE } from "@/constant";
import {
  addRowColumnBeforeAfterOfCurrent,
  removeTableFullColumn,
  removeTableFullRow,
} from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch } from "@/redux/hooks";
import clsx from "clsx";
import { Plus as PlusIcon, Trash as TrashIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useParams } from "next/navigation";
import React, { useMemo, useState } from "react";

const actionButtonAnim = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: ["easeIn", "easeOut"],
    },
  },
  exit: {
    scale: 0,
    opacity: 0,
  },
};

type AddRowColumnType = "before" | "after";

const Table = ({
  children: { thead, tbody, border },
  id,
  ...props
}: TableProps) => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);
  const [focusedRow, setFocusedRow] = useState<boolean>(false);
  const [focusedColumn, setFocusedColumn] = useState<boolean>(false);

  const { id: blogId } = useParams() as { id: string };

  if (!blogId) return null;

  const dispatch = useAppDispatch();

  const handleRemoveRowOrColumn = (
    rowNumber: number,
    rowOrColumn: "row" | "column"
  ) => {
    const payload = {
      blogId,
      id,
      index: rowNumber,
    };

    if (rowOrColumn === "row") return dispatch(removeTableFullRow(payload));
    return dispatch(removeTableFullColumn(payload));
  };

  const handleMouseEnter = (type: "row" | "column", index: number) => {
    if (focusedRow || focusedColumn) return;

    if (type === "row") setHoveredRow(index);
    if (type === "column") setHoveredColumn(index);
  };

  const handleMouseLeave = (type: "row" | "column") => {
    if (focusedRow || focusedColumn) return;

    if (type === "row") setHoveredRow(null);
    if (type === "column") setHoveredColumn(null);
  };

  const handleAddDropDownChange = (type: "row" | "column", value: boolean) => {
    if (type === "row") {
      setHoveredColumn(null);
      setFocusedColumn(false);
      setFocusedRow(value);
    }
    if (type === "column") {
      setHoveredRow(null);
      setFocusedRow(false);
      setFocusedColumn(value);
    }
  };

  const handleAddRowOrColumn = (
    type: "row" | "column",
    addType: AddRowColumnType,
    index: number
  ) => {
    setFocusedColumn(false);
    setFocusedRow(false);
    setHoveredRow(null);
    setHoveredColumn(null);

    dispatch(
      addRowColumnBeforeAfterOfCurrent({
        blogId,
        id,
        addType,
        type,
        index,
      })
    );
  };

  const dropdownColumnActionButtonList = useMemo(
    () => [
      {
        id: "before",
        label: "Add Before Column",
      },
      {
        id: "after",
        label: "Add After Column",
      },
    ],
    []
  );

  const dropdownRowActionButtonList = useMemo(
    () => [
      {
        id: "before",
        label: "Add Before Row",
      },
      {
        id: "after",
        label: "Add After Row",
      },
    ],
    []
  );

  const borderStyle = {
    border: `${border?.size || EDITOR_TABLE_SIZE.DEFAULT_BORDER_SIZE}px ${
      border?.style || "solid"
    } ${border?.color || EDITOR_TABLE_SIZE.DEFAULT_BORDER_COLOR}`,
  };

  return (
    <table
      className="border-collapse w-full text-sm text-left text-gray-500 dark:text-gray-400"
      style={{
        ...borderStyle,
      }}
    >
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        {thead.map((rows, rowIndex) => (
          <tr
            key={rowIndex}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            {rows.map((col, colIndex) => (
              <Th
                key={colIndex}
                className="relative"
                style={{
                  ...borderStyle,
                }}
                onMouseEnter={() => handleMouseEnter("column", colIndex)}
                onMouseLeave={() => handleMouseLeave("column")}
              >
                <AnimatePresence>
                  {(hoveredColumn === colIndex ||
                    (hoveredColumn === colIndex && focusedColumn)) && (
                    <motion.span {...actionButtonAnim}>
                      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full flex items-center z-10">
                        <TooltipProvider>
                          {rows.length > 1 && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  type="button"
                                  onClick={() =>
                                    handleRemoveRowOrColumn(rowIndex, "column")
                                  }
                                  size={"smIcon"}
                                  className="rounded-r-none"
                                >
                                  <TrashIcon size={14} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="bottom">
                                <p className="text-xs">Remove Column</p>
                              </TooltipContent>
                            </Tooltip>
                          )}

                          <Tooltip>
                            <DropdownMenu
                              onOpenChange={(value) =>
                                handleAddDropDownChange("column", value)
                              }
                            >
                              <DropdownMenuTrigger asChild>
                                <Button
                                  type="button"
                                  size={"smIcon"}
                                  className={clsx("", {
                                    "rounded-l-none": rows.length > 1,
                                  })}
                                >
                                  <PlusIcon size={14} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                {dropdownColumnActionButtonList.map(
                                  ({ id, label }) => (
                                    <DropdownMenuItem
                                      key={id}
                                      onClick={() =>
                                        handleAddRowOrColumn(
                                          "column",
                                          id as AddRowColumnType,
                                          colIndex
                                        )
                                      }
                                    >
                                      {label}
                                    </DropdownMenuItem>
                                  )
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                            <TooltipContent side="bottom">
                              <p className="text-xs">Add Column</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </motion.span>
                  )}
                </AnimatePresence>
                {col}
              </Th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {tbody.map((rows, rowIndex) => (
          <tr
            key={rowIndex}
            className="bg-white border-b dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
            onMouseEnter={() => handleMouseEnter("row", rowIndex)}
            onMouseLeave={() => handleMouseLeave("row")}
          >
            {rows.map((col, colIndex) => (
              <Td
                key={colIndex}
                className="relative"
                style={{
                  ...borderStyle,
                }}
                onMouseEnter={() => handleMouseEnter("column", colIndex)}
                onMouseLeave={() => handleMouseLeave("column")}
              >
                <AnimatePresence>
                  {colIndex === 0 &&
                    (hoveredRow === rowIndex ||
                      (hoveredRow === rowIndex && focusedRow)) && (
                      <motion.span {...actionButtonAnim}>
                        <div className="absolute left-0 top-0 -translate-x-full flex items-center">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  type="button"
                                  onClick={() =>
                                    handleRemoveRowOrColumn(rowIndex, "row")
                                  }
                                  size={"smIcon"}
                                  className="rounded-r-none"
                                >
                                  <TrashIcon size={14} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="bottom">
                                <p className="text-xs">Remove Row</p>
                              </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <DropdownMenu
                                onOpenChange={(value) =>
                                  handleAddDropDownChange("row", value)
                                }
                              >
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    type="button"
                                    size={"smIcon"}
                                    className="rounded-l-none"
                                  >
                                    <PlusIcon size={14} />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                  className="w-56"
                                  side="left"
                                >
                                  {dropdownRowActionButtonList.map(
                                    ({ id, label }) => (
                                      <DropdownMenuItem
                                        key={id}
                                        onClick={() =>
                                          handleAddRowOrColumn(
                                            "row",
                                            id as AddRowColumnType,
                                            rowIndex
                                          )
                                        }
                                      >
                                        {label}
                                      </DropdownMenuItem>
                                    )
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                              <TooltipContent side="bottom">
                                <p className="text-xs">Add Column</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </motion.span>
                    )}
                </AnimatePresence>
                {col}
              </Td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

interface TdThProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

const Td = ({ children, className, ...props }: TdThProps) => {
  return (
    <td
      contentEditable
      suppressContentEditableWarning
      {...props}
      className={clsx("p-3 min-h-8", className)}
    >
      {children}&nbsp;
    </td>
  );
};

const Th = ({ children, className, ...props }: TdThProps) => {
  return (
    <th
      contentEditable
      suppressContentEditableWarning
      {...props}
      className={clsx("p-3 min-h-8", className)}
    >
      {children}&nbsp;
    </th>
  );
};

export default Table;

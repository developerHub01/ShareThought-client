"use client";

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
import { cn } from "@/lib/utils";
import {
  addRowColumnBeforeAfterOfCurrent,
  AlignType,
  changeCellContent,
  removeTableFullColumn,
  removeTableFullRow,
  TableInterface,
  TextDirectionType,
} from "@/redux/features/builders/blogBuilderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import handleWrapperContentStyleSeparator from "@/utils/editor/handleWrapperContentStyleSeparator";
import { Plus as PlusIcon, Trash as TrashIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useParams } from "next/navigation";
import React, { FocusEvent, useMemo, useRef, useState } from "react";

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

const dropdownColumnActionButtonList = [
  {
    id: "before",
    label: "Add Before Column",
  },
  {
    id: "after",
    label: "Add After Column",
  },
];

const dropdownRowActionButtonList = [
  {
    id: "before",
    label: "Add Before Row",
  },
  {
    id: "after",
    label: "Add After Row",
  },
];

interface TableProps {
  id: string;
  parentId? :string
}

const Table = ({ id, parentId }: TableProps) => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);
  const [focusedRow, setFocusedRow] = useState<boolean>(false);
  const [focusedColumn, setFocusedColumn] = useState<boolean>(false);

  const { id: blogId } = useParams<{ id: string }>();

  if (!blogId) return null;

  const {
    metaData: { styles },
    activeBlock,
    components,
  } = useAppSelector((state) => state.blogBuilder.blogs[blogId]);

  const dispatch = useAppDispatch();

  if (!activeBlock) return null;

  const {
    thead,
    tbody,
    border,
    backgroundColor: tableBackgroundColor,
    textColor: tableTextColor,
    stripedRow,
    header,
    content,
  } = components[activeBlock].children as TableInterface;

  let activeBlockStyles = styles[id];

  const handleRemoveRowOrColumn = (
    index: number,
    rowOrColumn: "row" | "column"
  ) => {
    const payload = {
      blogId,
      id,
      index,
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

  const borderStyle = useMemo(
    () => ({
      border: `${border?.size}px ${border?.style || "solid"} ${
        border?.color || EDITOR_TABLE_SIZE.DEFAULT_BORDER_COLOR
      }`,
    }),
    [border]
  );

  const tableStyle = useMemo(
    () => ({
      letterSpacing:
        content?.letterSpacing ||
        EDITOR_TABLE_SIZE.DEFAULT_CONTENT_LETTER_SPACING,
      lineHeight:
        content?.lineHeight || EDITOR_TABLE_SIZE.DEFAULT_CONTENT_LINE_HEIGHT,
    }),
    [header, content]
  );

  const tableHeaderStyle = useMemo(
    () => ({
      backgroundColor:
        header?.backgroundColor ||
        EDITOR_TABLE_SIZE.DEFAULT_HEADER_BACKGROUND_COLOR,
      color: header?.textColor || EDITOR_TABLE_SIZE.DEFAULT_HEADER_TEXT_COLOR,
      fontSize: `${
        header?.fontSize || EDITOR_TABLE_SIZE.DEFAULT_HEADER_FONT_SIZE
      }px`,
      fontWeight:
        header?.fontWeight || EDITOR_TABLE_SIZE.DEFAULT_HEADER_FONT_WEIGHT,
      textAlign: (header?.align ||
        EDITOR_TABLE_SIZE.DEFAULT_ALIGN) as AlignType,
    }),
    [header]
  );

  const tableContentStyle = useMemo(
    () => ({
      color: content?.textColor || EDITOR_TABLE_SIZE.DEFAULT_CONTENT_TEXT_COLOR,
      fontSize: `${
        content?.fontSize || EDITOR_TABLE_SIZE.DEFAULT_CONTENT_FONT_SIZE
      }px`,
      fontWeight:
        content?.fontWeight || EDITOR_TABLE_SIZE.DEFAULT_CONTENT_FONT_WEIGHT,
      textAlign: (content?.align ||
        EDITOR_TABLE_SIZE.DEFAULT_ALIGN) as AlignType,
      direction: (content?.textDirection ||
        EDITOR_TABLE_SIZE.DEFAULT_CONTENT_TEXT_DIRECTION) as TextDirectionType,
    }),
    [content]
  );

  const handleChangeCellData = (
    type: "thead" | "tbody",
    rowIndex: number,
    colIndex: number,
    content: string
  ) => {
    dispatch(
      changeCellContent({
        blogId,
        id,
        type,
        rowIndex,
        colIndex,
        content,
      })
    );
  };

  const { contentStyles, wrapperStyles } =
    handleWrapperContentStyleSeparator(activeBlockStyles);

  return (
    <div
      className="w-full"
      style={{
        ...wrapperStyles,
      }}
    >
      <table
        className="border-collapse w-full table-fixed text-sm text-left text-gray-500 dark:text-gray-400"
        style={{
          ...(activeBlockStyles as Record<string, string | number>),
          ...borderStyle,
          ...tableStyle,
          ...contentStyles,
          backgroundColor: tableBackgroundColor,
          color: tableTextColor,
        }}
      >
        {thead && (
          <thead
            className="text-xs text-gray-700 uppercase dark:text-gray-400 font-normal"
            style={{
              ...tableHeaderStyle,
            }}
          >
            {thead.map((rows, rowIndex) => (
              <tr key={rowIndex} className="border-b dark:border-gray-700">
                {rows.map((col, colIndex) => (
                  <Th
                    key={colIndex}
                    rowIndex={rowIndex}
                    colIndex={colIndex}
                    onBlur={handleChangeCellData}
                    style={{
                      ...borderStyle,
                      fontWeight:
                        header?.fontWeight ||
                        EDITOR_TABLE_SIZE.DEFAULT_HEADER_FONT_WEIGHT,
                    }}
                    onMouseEnter={() => handleMouseEnter("column", colIndex)}
                    onMouseLeave={() => handleMouseLeave("column")}
                    actionContent={
                      <AnimatePresence>
                        {(hoveredColumn === colIndex ||
                          (hoveredColumn === colIndex && focusedColumn)) && (
                          <motion.div {...actionButtonAnim}>
                            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full flex items-center z-10">
                              <TooltipProvider>
                                {rows.length > 1 && (
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        type="button"
                                        onClick={() =>
                                          handleRemoveRowOrColumn(
                                            colIndex,
                                            "column"
                                          )
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
                                        className={cn("", {
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
                          </motion.div>
                        )}
                      </AnimatePresence>
                    }
                  >
                    {col}
                  </Th>
                ))}
              </tr>
            ))}
          </thead>
        )}
        <tbody
          style={{
            ...tableContentStyle,
          }}
        >
          {tbody.map((rows, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b"
              style={{
                ...(stripedRow?.backgroundColor &&
                ((stripedRow.stripedType === "even" && !(rowIndex % 2)) ||
                  (stripedRow.stripedType === "odd" && rowIndex % 2))
                  ? {
                      backgroundColor: stripedRow?.backgroundColor,
                    }
                  : {}),
              }}
              onMouseEnter={() => handleMouseEnter("row", rowIndex)}
              onMouseLeave={() => handleMouseLeave("row")}
            >
              {rows.map((col, colIndex) => (
                <Td
                  key={colIndex}
                  rowIndex={rowIndex}
                  colIndex={colIndex}
                  onBlur={handleChangeCellData}
                  style={{
                    ...borderStyle,
                  }}
                  onMouseEnter={() => handleMouseEnter("column", colIndex)}
                  onMouseLeave={() => handleMouseLeave("column")}
                  actionContent={
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
                  }
                >
                  {col}
                </Td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

interface TdThProps {
  children: React.ReactNode;
  className?: string;
  rowIndex: number;
  colIndex: number;
  actionContent?: React.ReactNode;
  onBlur: (
    type: "thead" | "tbody",
    rowIndex: number,
    colIndex: number,
    content: string
  ) => void;
  [key: string]: unknown;
}

const Th = ({
  children,
  className,
  rowIndex,
  colIndex,
  actionContent = <></>,
  onBlur,
  ...props
}: TdThProps) => {
  const trRef = useRef<HTMLDivElement>(null);

  return (
    <th
      {...props}
      className="break-words whitespace-normal relative align-top group focus-within:outline focus-within:outline-2 focus-within:outline-primary cursor-text"
      onClick={() => trRef.current && trRef.current.focus()}
    >
      {actionContent}
      <div
        contentEditable
        suppressContentEditableWarning
        onBlur={(e: FocusEvent<HTMLTableCellElement>) =>
          onBlur("thead", rowIndex, colIndex, e.target.innerText || "")
        }
        className={cn("p-2 min-h-8 h-full outline-none", className)}
        ref={trRef}
      >
        {children}
      </div>
    </th>
  );
};

const Td = ({
  children,
  className,
  rowIndex,
  colIndex,
  actionContent = <></>,
  onBlur,
  ...props
}: TdThProps) => {
  const tdRef = useRef<HTMLDivElement>(null);

  return (
    <td
      {...props}
      className="break-words whitespace-normal relative align-top group focus-within:outline focus-within:outline-2 focus-within:outline-primary cursor-text"
      onClick={() => tdRef.current && tdRef.current.focus()}
    >
      {actionContent}
      <div
        contentEditable
        suppressContentEditableWarning
        onBlur={(e: FocusEvent<HTMLTableCellElement>) =>
          onBlur("tbody", rowIndex, colIndex, e.target.innerText || "")
        }
        className={cn("p-2 min-h-8 h-full outline-none", className)}
        ref={tdRef}
      >
        {children}
      </div>
    </td>
  );
};

export default Table;

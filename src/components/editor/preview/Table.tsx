import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { EDITOR_TABLE_SIZE } from "@/constant";
import { cn } from "@/lib/utils";
import {
  AlignType,
  BlogComponentsDataInterface,
  BlogContentType,
  BlogMetaDataInterface,
  TableInterface,
  TextDirectionType,
} from "@/redux/features/builders/blogBuilderSlice";
import handleWrapperContentStyleSeparator from "@/utils/editor/handleWrapperContentStyleSeparator";
import React from "react";

interface TableProps {
  id: string;
  content: BlogContentType;
  components: BlogComponentsDataInterface;
  metaData: BlogMetaDataInterface;
}

const Table = ({ id, components, metaData }: TableProps) => {
  let activeBlockStyles = metaData.styles[id];
  const {
    tbody,
    thead,
    backgroundColor: tableBackgroundColor,
    border,
    content,
    header,
    stripedRow,
    textColor: tableTextColor,
  } = components[id].children as TableInterface;

  const borderStyle = {
    border: `${border?.size}px ${border?.style || "solid"} ${
      border?.color || EDITOR_TABLE_SIZE.DEFAULT_BORDER_COLOR
    }`,
  };

  const tableStyle = {
    letterSpacing:
      content?.letterSpacing ||
      EDITOR_TABLE_SIZE.DEFAULT_CONTENT_LETTER_SPACING,
    lineHeight:
      content?.lineHeight || EDITOR_TABLE_SIZE.DEFAULT_CONTENT_LINE_HEIGHT,
  };

  const tableHeaderStyle = {
    backgroundColor:
      header?.backgroundColor ||
      EDITOR_TABLE_SIZE.DEFAULT_HEADER_BACKGROUND_COLOR,
    color: header?.textColor || EDITOR_TABLE_SIZE.DEFAULT_HEADER_TEXT_COLOR,
    fontSize: `${
      header?.fontSize || EDITOR_TABLE_SIZE.DEFAULT_HEADER_FONT_SIZE
    }px`,
    fontWeight:
      header?.fontWeight || EDITOR_TABLE_SIZE.DEFAULT_HEADER_FONT_WEIGHT,
    textAlign: (header?.align || EDITOR_TABLE_SIZE.DEFAULT_ALIGN) as AlignType,
  };

  const tableContentStyle = {
    color: content?.textColor || EDITOR_TABLE_SIZE.DEFAULT_CONTENT_TEXT_COLOR,
    fontSize: `${
      content?.fontSize || EDITOR_TABLE_SIZE.DEFAULT_CONTENT_FONT_SIZE
    }px`,
    fontWeight:
      content?.fontWeight || EDITOR_TABLE_SIZE.DEFAULT_CONTENT_FONT_WEIGHT,
    textAlign: (content?.align || EDITOR_TABLE_SIZE.DEFAULT_ALIGN) as AlignType,
    direction: (content?.textDirection ||
      EDITOR_TABLE_SIZE.DEFAULT_CONTENT_TEXT_DIRECTION) as TextDirectionType,
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
                    style={{
                      ...borderStyle,
                      fontWeight:
                        header?.fontWeight ||
                        EDITOR_TABLE_SIZE.DEFAULT_HEADER_FONT_WEIGHT,
                    }}
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
            >
              {rows.map((col, colIndex) => (
                <Td
                  key={colIndex}
                  style={{
                    ...borderStyle,
                  }}
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
  [key: string]: unknown;
}

const Th = ({ children, className, ...props }: TdThProps) => {
  return (
    <th
      {...props}
      className={cn("p-3 min-h-8 break-words whitespace-normal", className)}
    >
      {children}&nbsp;
    </th>
  );
};

const Td = ({ children, className, ...props }: TdThProps) => {
  return (
    <td
      {...props}
      className={cn("p-3 min-h-8 break-words whitespace-normal", className)}
    >
      {children}&nbsp;
    </td>
  );
};

export default Table;

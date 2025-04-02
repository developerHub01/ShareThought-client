"use client";

import { EDITOR_TABLE_SIZE } from "@/constant";
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
import { useEditorPreview } from "@/app/(editor)/studio/create-blog/[id]/_context/Preview/EditorPreviewProvider";
import useCombinedResponsiveSettingStyles from "@/hooks/editor/use-combined-responsive-setting-styles";
import Td from "@/app/(editor)/studio/create-blog/[id]/_components/Preview/Components/Td";
import Th from "@/app/(editor)/studio/create-blog/[id]/_components/Preview/Components/Th";

interface TableProps {
  id: string;
  content: BlogContentType;
  components: BlogComponentsDataInterface;
  metaData: BlogMetaDataInterface;
}

const Table = ({ id, components, metaData }: TableProps) => {
  if (!components || !components[id]) return null;

  const styles = metaData.styles[id];
  const mobileStyles = metaData.mobileStyles[id];

  const { screenType } = useEditorPreview();

  const combinedStyles = useCombinedResponsiveSettingStyles({
    type: "table",
    screenType,
    styles,
    mobileStyles,
  });

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

  const { type } = components[id];

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
    handleWrapperContentStyleSeparator(combinedStyles);

  return (
    <div
      className="w-full"
      style={{
        ...wrapperStyles,
      }}
      data-component-type={type}
      data-component-id={id}
    >
      <table
        className="border-collapse w-full table-fixed text-sm text-left text-gray-500 dark:text-gray-400"
        style={{
          ...(combinedStyles as Record<string, string | number>),
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

export default Table;

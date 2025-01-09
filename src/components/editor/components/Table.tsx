import clsx from "clsx";
import React from "react";

interface TableProps {
  thead: Array<Array<string>>;
  tbody: Array<Array<string>>;
}

const Table = ({ thead, tbody }: TableProps) => {
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        {thead.map((rows, rowIndex) => (
          <tr key={rowIndex} className="p-4">
            {rows.map((cell, cellIndex) => (
              <Th key={cellIndex}>{cell}</Th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {tbody.map((rows, rowIndex) => (
          <tr
            key={rowIndex}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            {rows.map((cell, cellIndex) => (
              <Td key={cellIndex} className="px-6 py-4">
                {cell}
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
}

const Td = ({ children, className, ...props }: TdThProps) => (
  <td
    contentEditable
    suppressContentEditableWarning
    {...props}
    className={clsx("px-6 py-4", className)}
  >
    {children}
  </td>
);
interface TdProps {
  children: React.ReactNode;
  className?: string;
}

const Th = ({ children, className, ...props }: TdThProps) => (
  <th
    contentEditable
    suppressContentEditableWarning
    {...props}
    className={clsx("px-6 py-4", className)}
  >
    {children}
  </th>
);

export default Table;

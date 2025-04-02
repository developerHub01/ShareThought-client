"use client";

import { useEditorPreview } from "@/app/(editor)/studio/create-blog/[id]/_context/Preview/EditorPreviewProvider";
import { cn } from "@/lib/utils";

interface TdProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

const Td = ({ children, className, ...props }: TdProps) => {
  const { screenType } = useEditorPreview();

  return (
    <td
      {...props}
      className={cn("min-h-8 break-words whitespace-normal", className, {
        "p-3": screenType === "desktop",
        "p-1.5": screenType === "mobile",
      })}
    >
      {children}&nbsp;
    </td>
  );
};

export default Td;

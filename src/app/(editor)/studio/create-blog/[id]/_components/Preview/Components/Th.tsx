"use client";

import { cn } from "@/lib/utils";
import { useEditorPreview } from "@/app/(editor)/studio/create-blog/[id]/_context/Preview/EditorPreviewProvider";

interface ThProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

const Th = ({ children, className, ...props }: ThProps) => {
  const { screenType } = useEditorPreview();

  return (
    <th
      {...props}
      className={cn("min-h-8 break-words whitespace-normal", className, {
        "p-3": screenType === "desktop",
        "p-1.5": screenType === "mobile",
      })}
    >
      {children}&nbsp;
    </th>
  );
};

export default Th;

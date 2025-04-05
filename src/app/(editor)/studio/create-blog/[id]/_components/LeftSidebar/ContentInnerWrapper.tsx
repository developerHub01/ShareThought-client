import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ContentInnerWrapperProps {
  label?: string;
  id?: string;
  children: React.ReactNode;
}

const ContentInnerWrapper = ({
  children,
  label,
  id,
}: ContentInnerWrapperProps) => {
  return (
    <>
      <div className="p-2 text-base font-bold capitalize border-b">
        <h4>{label ?? id}</h4>
      </div>
      <ScrollArea className="flex-1 w-full h-full px-2 text-sm">
        {children}
      </ScrollArea>
      <div className="p-2 md:p-3 text-base font-bold capitalize border-t flex justify-center items-center">
        <div className="w-[90%] max-w-28 h-1.5 rounded-full bg-primary/50"></div>
      </div>
    </>
  );
};

export default ContentInnerWrapper;

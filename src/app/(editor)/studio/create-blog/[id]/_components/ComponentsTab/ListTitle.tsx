import { cn } from "@/lib/utils";
import React from "react";

interface ListTitleProps {
  className?: string;
  children: React.ReactNode;
}

const ListTitle = ({ className, children }: ListTitleProps) => {
  return (
    <h3 className={cn("text-xl font-semibold select-none", className)}>
      {children}
    </h3>
  );
};

export default ListTitle;
